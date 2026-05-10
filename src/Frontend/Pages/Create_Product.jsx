import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../Components/Sidebar.jsx";
import styles from "../Styles/Create_Product.module.css";
import { supabase } from "../Components/supabase.js";
import { NavBar } from "../Components/Sidebar.jsx";
import {Plus} from "lucide-react"

    function Main_Content() {

        const [name, setName] = useState('');
        const [price, setPrice] = useState(0);
        const [description, setDescription] = useState('');
        const [files, setFiles] = useState([]);
        const [previews, setPreviews] = useState([]);
        const [store,setStore] = useState(null)
        const [new_product,setNew_product] = useState(false)
        const [products,setProducts] = useState([])
        const [update,setUpdate] = useState(null)


       useEffect(() => {
  const check_store = async () => {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return

    const { data, error } = await supabase
      .from("stores")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle()

    if (error) {
      console.log(error)
      return
    }

    setStore(data)
  }

  check_store()
}, [])

        useEffect(() => {
            if (files.length === 0) {
                setPreviews([]);
                return;
            }
            const urls = files.map(f => URL.createObjectURL(f));
            setPreviews(urls);
            return () => urls.forEach(url => URL.revokeObjectURL(url));
        }, [files]);

        function handleFileChange(e) {
            const selected = Array.from(e.target.files).slice(0, 3);
setFiles(prev => {
        const merged = [...prev, ...selected];
        return merged.slice(0, 3);
    });
    e.target.value = '';
        }

        function removeImage(index) {
            setFiles(prev => prev.filter((_, i) => i !== index));
        }

        const Upload_Images = async (productId) => {
     for (const file of files) {
    const filePath = `products/${productId}/${Date.now()}-${file.name}`

  await supabase.storage.from("products").upload(filePath, file)

  const { data,error:uploadError} = supabase.storage
    .from("products")
    .getPublicUrl(filePath)

            console.log("upload result:", data, uploadError)


  await supabase.from("product_images").insert({
    product_id: productId,
    image_url: data.publicUrl
  })
        }

    }

     const Upload_Product = async () => {

    const { data: { user } } = await supabase.auth.getUser()

    if(!store){
        alert('create a store first')
        return
    }

   if(files.length === 0){
    alert('PLEASE UPLOAD IMAGES OF PRODUCT')
    return
  }

  try{

    const {data,error} = await supabase
   .from("products")
   .insert({
    store_id:store.id,
    name:name,
    description:description,
    price:price
   })
   .select()
  .single()

  if(error){
    console.log(error)
  }

   await Upload_Images(data.id);

   alert('success')

   setName(''); setPrice(0); setDescription(''); setFiles([]);

   setNew_product(false)
  
  }catch(error){
    console.log(error)
  }

     
}


useEffect(() => {

 const fetch_Products = async () => {

  if (!store?.id) return

   const { data, error } = await supabase
      .from("products")
      .select(`
        id,
        name,
        price,
        description,
        product_images (image_url)
      `)
      .eq("store_id", store.id)

    if (error) {
      console.log(error)
      return
    }

    console.log(data)

    setProducts(data)

 }

  if(store) fetch_Products();


},[store])

const Handle_Upgrade = async (product) => {
  try{

if(!product?.id) return;

   const updates = {}
   
   if (name) updates.name = name
   if (price) updates.price = price
   if (description) updates.description = description           
        
           const { data,error } = await supabase.from("products").update(updates).eq("id",product.id)
   
         if(error){
           console.log(error)
         }

         alert("product details updated")

  }catch(err){
    console.log(err)
  }
}

const deleteProduct = async (product) => {
 if (!product?.id) {
    console.error("Invalid product:", product)
    return
  }

  try {

     const images = product.product_images || []
  const imagePaths = images.map((img) => {
      const url = img.image_url
      const path = url.split("/storage/v1/object/public/products/")[1]
      return path
    })     
    if (imagePaths.length > 0) {
      await supabase.storage.from("products").remove(imagePaths)
    }

    await supabase
      .from("product_images")
      .delete()
      .eq("product_id", product.id)

    await supabase
      .from("products")
      .delete()
      .eq("id", product.id)

    alert("Product deleted ✅")

  } catch (err) {
    console.log(err)
    alert("Error deleting product")
  }
}

        return (
            <>
                <div className={styles.New_Product_Wrapper}>

                   <div className={styles.New_product_header}>
                    <div className={styles.header_cta}>
                     <h2>Products</h2>
                    <span>manage and create new products</span>
</div>
<div className={styles.header_btn_wrapper}>
    <button onClick={() => {
      
     if(products.length > 6){
      alert('you have reached limit for max products')
      return
     } 

      setNew_product(true)
      
      
      }}>new product <Plus size={20}/></button>
</div>
</div>

<div className={styles.Product_list}>

  {products.length === 0 && (

   <h3>NO PRODUCTS CREATED</h3>

  )}

    {products.map((product) => (

        <div className={styles.product_card} key={product.id}>
         <div className={styles.product_card_img_wrapper}>
            <img src={product.product_images[0]?.image_url} alt={product.name}/>
            </div>

            <div className={styles.product_info}>
               <h3>{product.name}</h3>
               <span>₹{product.price}</span>
               <small>Description : 
               <p>{product.description}</p>
</small>
               <div className={styles.btn_wrapper}>
   <button onClick={() => setUpdate(product)}>edit</button> <button onClick={() => deleteProduct(product)}>delete</button>
                </div>
                </div>

            </div>
        
    ))}

</div>
 
  
{new_product && (

<div className={styles.New_Product_form_wrapper}>
                    <div className={styles.New_Product_form}>

                        <label>Product Images <span style={{ fontWeight: 400, fontSize: '0.85em', color: '#888' }}>({files.length}/3)</span></label>
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
                                        <button
                                            type="button"
                                            className={styles.Remove_Btn}
                                            onClick={() => removeImage(i)}
                                        >
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
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Made in india, materials used - cotton,polyester and this is printed version" id="description" maxLength={300}/>

                        
                      
                      <button onClick={Upload_Product}>Upload</button>

                    </div>

  </div>
)}
                </div>

 {update && (
  <div className={styles.New_Product_form_wrapper}>
    <div className={styles.New_Product_form}>

      <label>Product Images <span style={{ fontWeight: 400, fontSize: '0.85em', color: '#888' }}>({files.length}/3)</span></label>
      <input type="file" multiple accept="image/*" onChange={handleFileChange} disabled={files.length >= 3} />

      {previews.length > 0 && (
        <div className={styles.Image_Preview_Grid}>
          {previews.map((src, i) => (
            <div key={i} className={styles.Preview_Item}>
              <img src={src} alt={`preview-${i}`} className={styles.Preview_Img} />
              <button type="button" className={styles.Remove_Btn} onClick={() => removeImage(i)}>✕</button>
            </div>
          ))}
        </div>
      )}

      <label>Product Name</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={update.name} />

      <label>Price (rs)</label>
      <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} placeholder={update.price} />

      <label>Description</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder={update.description} maxLength={300} />

      <button onClick={() => Handle_Upgrade(update)}>Save Changes</button>
      <button onClick={() => setSelectedProduct(null)}>Cancel</button>

    </div>
  </div>
)}
              
           
            </>
        );
    }


              



export function Products_Page() {

  const [active,setActive] = useState(false)

    return (
        <div className={styles.Products_Page_wrapper}>
          <NavBar active={active} setActive={setActive}/>
           <div className={styles.Product_Page_Main_content_wrapper}> <Sidebar active={active} setActive={setActive}/> <Main_Content /> </div>
        </div>
    );

}
    

