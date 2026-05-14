import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../Components/Sidebar.jsx";
import styles from "../Styles/Create_Product.module.css";
import { supabase } from "../Components/supabase.js";
import { NavBar } from "../Components/Sidebar.jsx";
import { Plus } from "lucide-react";
import { AuthProvider } from "../Components/AuthContext.jsx";

function Main_Content() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [store, setStore] = useState(null);
  const [new_product, setNew_product] = useState(false);
  const [products, setProducts] = useState([]);
  const [update, setUpdate] = useState(null);

  useEffect(() => {
    const check_store = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      const { data, error } = await supabase
        .from("stores")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();
      if (error) { console.log(error); return; }
      setStore(data);
    };
    check_store();
  }, []);

  useEffect(() => {
    if (files.length === 0) { setPreviews([]); return; }
    const urls = files.map((f) => URL.createObjectURL(f));
    setPreviews(urls);
    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, [files]);

  function handleFileChange(e) {
    const selected = Array.from(e.target.files).slice(0, 3);
    setFiles((prev) => {
      const merged = [...prev, ...selected];
      return merged.slice(0, 3);
    });
    e.target.value = "";
  }

  function removeImage(index) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  const Upload_Images = async (productId) => {
    for (const file of files) {
      const filePath = `products/${productId}/${Date.now()}-${file.name}`;
      await supabase.storage.from("products").upload(filePath, file);
      const { data, error: uploadError } = supabase.storage
        .from("products")
        .getPublicUrl(filePath);
      console.log("upload result:", data, uploadError);
      await supabase.from("product_images").insert({
        product_id: productId,
        image_url: data.publicUrl,
      });
    }
  };

  const Upload_Product = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!store) { alert("create a store first"); return; }
    if (files.length === 0) { alert("PLEASE UPLOAD IMAGES OF PRODUCT"); return; }
    try {
      const { data, error } = await supabase
        .from("products")
        .insert({
          store_id: store.id,
          name: name,
          description: description,
          price: price,
        })
        .select()
        .single();
      if (error) { console.log(error); }
      await Upload_Images(data.id);
      alert("success");
      setName(""); setPrice(0); setDescription(""); setFiles([]);
      setNew_product(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetch_Products = async () => {
      if (!store?.id) return;
      const { data, error } = await supabase
        .from("products")
        .select(`id, name, price, description, product_images (image_url)`)
        .eq("store_id", store.id);
      if (error) { console.log(error); return; }
      console.log(data);
      setProducts(data);
    };
    if (store) fetch_Products();
  }, [store]);

  const Handle_Upgrade = async (product) => {
    try {
      if (!product?.id) return;
      const updates = {};
      if (name) updates.name = name;
      if (price) updates.price = price;
      if (description) updates.description = description;
      const { data, error } = await supabase
        .from("products")
        .update(updates)
        .eq("id", product.id);
      if (error) { console.log(error); }
      alert("product details updated");
      setUpdate(null);
      setName(""); setPrice(0); setDescription(""); setFiles([]);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteProduct = async (product) => {
    if (!product?.id) { console.error("Invalid product:", product); return; }
    try {
      const images = product.product_images || [];
      const imagePaths = images.map((img) => {
        const url = img.image_url;
        const path = url.split("/storage/v1/object/public/products/")[1];
        return path;
      });
      if (imagePaths.length > 0) {
        await supabase.storage.from("products").remove(imagePaths);
      }
      await supabase.from("product_images").delete().eq("product_id", product.id);
      await supabase.from("products").delete().eq("id", product.id);
      alert("Product deleted ✅");
      window.location.reload();
    } catch (err) {
      console.log(err);
      alert("Error deleting product");
    }
  };

  const closeUpdate = () => {
    setUpdate(null);
    setName("");
    setPrice(0);
    setDescription("");
    setFiles([]);
  };

  return (
    <>
      <div className={styles.New_Product_Wrapper}>
        <div className={styles.New_product_header}>
          <div className={styles.header_cta}>
            <h2>Products</h2>
            <span>manage and create new products</span>
          </div>
          <div className={styles.header_btn_wrapper}>
            <button
              onClick={() => {
                if (products.length > 6) {
                  alert("you have reached limit for max products");
                  return;
                }
                setNew_product(true);
              }}
            >
              new product <Plus size={20} />
            </button>
          </div>
        </div>

        <div className={styles.Product_list}>
          {products.length === 0 && <h3>NO PRODUCTS CREATED</h3>}
          {products.map((product) => (
            <div className={styles.product_card} key={product.id}>
              <div className={styles.product_card_img_wrapper}>
                <img src={product.product_images[0]?.image_url} alt={product.name} />
              </div>
              <div className={styles.product_info}>
                <h3>{product.name}</h3>
                <span>₹{product.price}</span>
                <small>
                  Description: <p>{product.description}</p>
                </small>
                <div className={styles.btn_wrapper}>
                  <button onClick={() => setUpdate(product)}>edit</button>
                  <button onClick={() => deleteProduct(product)}>delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {new_product && (
          <div className={styles.New_Product_form_wrapper}>
            <div className={styles.New_Product_form}>
              <label>
                Product Images{" "}
                <span style={{ fontWeight: 400, fontSize: "0.85em", color: "#888" }}>
                  ({files.length}/3)
                </span>
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                disabled={files.length >= 3}
              />
              {previews.length > 0 && (
                <div className={styles.Image_Preview_Grid}>
                  {previews.map((src, i) => (
                    <div key={i} className={styles.Preview_Item}>
                      <img src={src} alt={`preview-${i}`} className={styles.Preview_Img} />
                      <button type="button" className={styles.Remove_Btn} onClick={() => removeImage(i)}>
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <label>Product Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Urban jersey" />
              <br />
              <label>Price (rs)</label>
              <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} placeholder="499" />
              <br />
              <label>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Made in india, materials used - cotton,polyester"
                id="description"
                maxLength={300}
              />
              <button onClick={Upload_Product}>Upload</button>
            </div>
          </div>
        )}
      </div>

      {/* ── REDESIGNED UPDATE MODAL ── */}
      {update != null && (
        <div className={styles.New_Product_form_wrapper}>
          <div style={{
            width: "100%",
            maxWidth: "500px",
            background: "#fff",
            borderRadius: "16px",
            overflow: "hidden",
            border: "1px solid #e8e8e8",
            boxShadow: "0 24px 60px rgba(0,0,0,0.22)",
            overflowX:"hidden",
            minHeight:0,
            height:"auto"
          }}>

            {/* Header */}
            <div style={{ padding: "28px 32px 0", borderBottom: "1px solid #f0f0f0" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "20px" }}>
                <div>
                  <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#999", margin: "0 0 6px", fontFamily: "Inter, sans-serif" }}>
                    Edit product
                  </p>
                  <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#0a0a0a", margin: 0, letterSpacing: "-0.5px", fontFamily: "Inter, sans-serif" }}>
                    {update.name}
                  </h2>
                </div>
                <button
                  onClick={closeUpdate}
                  style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1px solid #e8e8e8", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", color: "#555", flexShrink: 0, marginTop: "2px" }}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Body */}
            <div style={{ padding: "28px 32px" }} >

              {/* Name */}
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#888", marginBottom: "8px", fontFamily: "Inter, sans-serif" }}>
                  Product name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={update.name}
                  style={{ width: "100%", padding: "13px 16px", border: "1.5px solid #e8e8e8", borderRadius: "10px", fontSize: "15px", color: "#0a0a0a", background: "#fafafa", boxSizing: "border-box", outline: "none", fontFamily: "Inter, sans-serif" }}
                />
              </div>

              {/* Price */}
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#888", marginBottom: "8px", fontFamily: "Inter, sans-serif" }}>
                  Price (₹)
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  placeholder={update.price}
                  style={{ width: "100%", padding: "13px 16px", border: "1.5px solid #e8e8e8", borderRadius: "10px", fontSize: "15px", color: "#0a0a0a", background: "#fafafa", boxSizing: "border-box", outline: "none", fontFamily: "Inter, sans-serif" }}
                />
              </div>

              {/* Description */}
              <div style={{ marginBottom: "24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <label style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#888", fontFamily: "Inter, sans-serif" }}>
                    Description
                  </label>
                  <span style={{ fontSize: "11px", color: "#bbb", fontFamily: "Inter, sans-serif" }}>
                    {description.length} / 300
                  </span>
                </div>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={update.description}
                  maxLength={300}
                  style={{ width: "100%", padding: "13px 16px", border: "1.5px solid #e8e8e8", borderRadius: "10px", fontSize: "14px", color: "#0a0a0a", background: "#fafafa", boxSizing: "border-box", resize: "none", height: "88px", lineHeight: "1.55", outline: "none", fontFamily: "Inter, sans-serif" }}
                />
              </div>

              {/* Images */}
              <div style={{ marginBottom: "24px" }}>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#888", marginBottom: "8px", fontFamily: "Inter, sans-serif" }}>
                  Images ({files.length}/3)
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={files.length >= 3}
                  style={{ width: "100%", padding: "10px 12px", border: "1.5px solid #e8e8e8", borderRadius: "10px", fontSize: "12px", background: "#fafafa", boxSizing: "border-box", fontFamily: "Inter, sans-serif" }}
                />
                {previews.length > 0 && (
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "12px" }}>
                    {previews.map((src, i) => (
                      <div key={i} style={{ position: "relative", width: "68px", height: "68px" }}>
                        <img src={src} alt={`preview-${i}`} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px", border: "1px solid #e8e8e8" }} />
                        <button
                          onClick={() => removeImage(i)}
                          style={{ position: "absolute", top: "-6px", right: "-6px", width: "20px", height: "20px", borderRadius: "50%", border: "none", background: "#0a0a0a", color: "#fff", fontSize: "10px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <button
                  onClick={closeUpdate}
                  style={{ padding: "14px", background: "#fff", color: "#0a0a0a", border: "1.5px solid #e0e0e0", borderRadius: "10px", fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: "Inter, sans-serif" }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => Handle_Upgrade(update)}
                  style={{ padding: "14px", background: "#0a0a0a", color: "#fff", border: "none", borderRadius: "10px", fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: "Inter, sans-serif" }}
                >
                  Save changes
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function Products_Page() {
  const [active, setActive] = useState(false);
  return (
    <div className={styles.Products_Page_wrapper}>
      <NavBar active={active} setActive={setActive} />
      <div className={styles.Product_Page_Main_content_wrapper}>
        <Sidebar active={active} setActive={setActive} />
        <Main_Content />
      </div>
    </div>
  );
}