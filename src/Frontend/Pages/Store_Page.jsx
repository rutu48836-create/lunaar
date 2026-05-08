import {useState,useEffect} from "react"
import {useNavigate} from "react-router-dom"
import {Sidebar} from "../Components/Sidebar.jsx"
import styles from "../Styles/Store_Page.module.css"
import { supabase } from "../Components/supabase.js"
import { useParams } from "react-router-dom"
import {Menu,Phone,X} from 'lucide-react'
import {useAuth} from "../Components/AuthContext.jsx"

export function Store_Header({store,page,setPage,pages,sidebar_active,setSidebar_active,modernTheme}){

  const {slug,token} = useParams();
  const navigate = useNavigate()

  return(
    <div className={`${styles.Store_preview_Header} ${modernTheme ? styles.Store_preview_Header_modern : ""}`}>
      <div className={styles.Store_preview_Header_info}>
        <img src={store?.logo_url} alt="Store logo" style={{width:"35px",height:"35px"}}/> <h3>{store?.name}</h3>
      </div>

      <div className={styles.store_links}>
        <ul>
          {pages?.map((page) => (
            <li key={page?.slug} onClick={() => navigate(`/page/${token}/${page?.slug}`)}>
              {page?.title}
            </li>
          ))}
        </ul>
      </div>

      
       <div className={styles.header_btn}>
         <a href={`https://wa.me/91${store?.whatsapp_number}`} target="_blank" rel="noreferrer">
           <button>Support</button>
         </a>
       </div>
    </div>



  )

}

export function Store_Footer({ store, pages }) {
  const navigate = useNavigate()

  return (
    <footer className={styles.footer}>

      <div className={styles.footer_main}>

        <div className={styles.footer_brand}>
          <div className={styles.footer_brand_info}>
            <img src={store?.logo_url} alt="logo" style={{width:"36px", height:"36px", borderRadius:"50%"}}/>
            <h3>{store?.name}</h3>
          </div>
          {store?.whatsapp_number && (
            
             <a href={`https://wa.me/91${store?.whatsapp_number}`}
              target="_blank"
              rel="noreferrer"
              className={styles.footer_whatsapp}>
              Chat on WhatsApp
            </a>
          )}
        </div>

        <div className={styles.footer_links}>
          <h4>Pages</h4>
          <ul>
            <li onClick={() => navigate('/')}>Home</li>
            {pages?.map((page) => (
              <li key={page?.slug} onClick={() => navigate(`/page/${page?.slug}`)}>
                {page?.title}
              </li>
            ))}
          </ul>
        </div>

      </div>

      <div className={styles.footer_bottom}>
        <span>Powered by <a href="https://lunaar.com" target="_blank" rel="noreferrer">Lunaar</a></span>
      </div>

    </footer>
  )
}

function Image_Slider({ images }){

  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent(i => (i === 0 ? images.length - 1 : i - 1))
  const next = () => setCurrent(i => (i === images.length - 1 ? 0 : i + 1))

  if(!images || images.length === 0) return null

  return(
    <div style={{position:"relative", width:"100%", height:"100%"}}>

      <img
        src={images[current]?.image_url}
        alt={`product-${current}`}
        style={{width:"100%", height:"100%", objectFit:"cover"}}
      />

      {images.length > 1 && (
        <>
          <button onClick={prev} style={{
            position:"absolute", left:"8px", top:"50%",
            transform:"translateY(-50%)", background:"rgba(0,0,0,0.4)",
            color:"#fff", border:"none", borderRadius:"50%",
            width:"30px", height:"30px", cursor:"pointer", fontSize:"16px",
            display:"flex", alignItems:"center", justifyContent:"center"
          }}>‹</button>

          <button onClick={next} style={{
            position:"absolute", right:"8px", top:"50%",
            transform:"translateY(-50%)", background:"rgba(0,0,0,0.4)",
            color:"#fff", border:"none", borderRadius:"50%",
            width:"30px", height:"30px", cursor:"pointer", fontSize:"16px",
            display:"flex", alignItems:"center", justifyContent:"center"
          }}>›</button>

          <div style={{
            position:"absolute", bottom:"10px", left:"50%",
            transform:"translateX(-50%)", display:"flex", gap:"6px"
          }}>
            {images.map((_, i) => (
              <div key={i} onClick={() => setCurrent(i)} style={{
                width:"7px", height:"7px", borderRadius:"50%",
                background: i === current ? "#fff" : "rgba(255,255,255,0.4)",
                cursor:"pointer"
              }}/>
            ))}
          </div>
        </>
      )}

    </div>
  )
}

export function Store_Page({setPage,store: storeProp,isPreview,store,pages,sidebar_active,setSidebar_active,products,details}){


  const { token } = useParams()
  const { user, loading } = useAuth()


  return(
    <div className={`${styles.Store_Page_container} ${isPreview ? styles.Store_Page_container_preview : styles.Store_Page_container}`}>

      <Store_Header store={store}  setPage={setPage} pages={pages} sidebar_active={sidebar_active} setSidebar_active={setSidebar_active}/>

    {store?.banner_url && (
<div className={styles.Store_Banner}>
        <img src={store?.banner_url} alt="Store Banner" className={styles.banner_img}/>
        <div className={styles.banner_overlay}>
         <h1>{store?.name}</h1>
         <p>{store?.description || "Shop our latest collection"}</p>
           <button onClick={() => document.querySelector('#products').scrollIntoView({behavior:'smooth'})}>
      Shop Now
    </button>
          </div>
      </div>
    )}  
      <div className={styles.Featured_products}/>
      <h3 id="products" className={styles.Our_products_title}>Our Products</h3>

      {products.length === 0 && (
        <>
          <div className={styles.NO_PRODUCT}>
            <h3>NO PRODUCTS TO DISPLAY :( 
              {user && (
              <a href="/Product-page">create</a>

              )}</h3>
          </div>
        </>
      )}

      

<div className={`${styles.Product_list} ${isPreview ? styles.Product_list_preview : ""}`}>
                {products.map((product) => (
<div key={product.id} className={`${styles.product_card} ${isPreview ? styles.Product_card_preview : ""}`}>
          <div key={product.id} className={`${styles.product_Img_wrapper} ${isPreview ? styles.Product_img_wrapper_preview : ""}`}>
              <img src={product.product_images[0]?.image_url} alt={product.name} className={styles.product_img}/>
            </div>
            <div className={styles.product_info}>
              <h3>{product?.name}</h3>
              <span>₹{product?.price}</span>
              <div className={styles.product_card_btn_wrapper}>
                 
<a href={`https://wa.me/91${store?.whatsapp_number}?text=${encodeURIComponent(`Hi, I'm interested in *${product?.name}* priced at ₹${product?.price}. Can you please share more details?`)}`} target="_blank" rel="noopener noreferrer">
                  <button>Order</button>
                </a>
                <button onClick={() => {
                  setProduct_Details(product_details?.id === product.id ? null : product)
                  setDetails(true)
                }}>Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>

       <Store_Footer store={store} pages={pages}/>

      {details && (
        <div className={styles.product_details_wrapper}>
          <div className={styles.product_details_card}>
            <div className={styles.product_details_head}>
              <button onClick={() => setDetails(false)}><X size={20}/></button>
            </div>

            <div className={styles.product_details_card_main_content}>
              <div className={styles.product_details_img_wrapper} style={{border:"none"}}>
                <Image_Slider images={product_details?.product_images} style={{borderRadius:"12px"}}/>
              </div>
              <div className={styles.product_details_card_info}>
                <h2>{product_details?.name}</h2>
                <h3>₹{product_details?.price}</h3>
                <span>{product_details?.description || "No description available."}</span>
                <div className={styles.product_details_btns}>
                  <button>Order Now</button>
                  <button onClick={() => setDetails(false)}>Close</button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}


function Store_Page_Modern({store,pages,setPages,sidebar_active,setSidebar_active,products,isPreview}){

     const { user, loading } = useAuth()
     const modernTheme = true; 
     const [details,setDetails] = useState(false)
     const [product_details,setProduct_Details] = useState(false)

return(
    <div className={`${styles.Store_Page_container} ${isPreview ? styles.Store_Page_container_preview : styles.Store_Page_container}`}>

      <Store_Header store={store} pages={pages} sidebar_active={sidebar_active} setSidebar_active={setSidebar_active} modernTheme={modernTheme}/>

    {store?.banner_url && (
<div className={styles.Store_Banner} style={{fontFamily:"PT Serif, serif"}}>
        <img src={store?.banner_url} alt="Store Banner" className={styles.banner_img}/>
        <div className={styles.banner_overlay}>
         <h1>{store?.name}</h1>
         <p>{store?.description || "Shop our latest collection"}</p>
           <button onClick={() => document.querySelector('#products').scrollIntoView({behavior:'smooth'})}>
      Shop Now
    </button>
          </div>
      </div>
    )}  
      <div className={styles.Featured_products}/>
      <h3 id="products" className={ ` ${styles.Our_products_title} ${modernTheme ? styles.Our_products_title_modern : ""}`}>Our Products</h3>

      {products.length === 0 && (
        <>
          <div className={styles.NO_PRODUCT}>
            <h3>NO PRODUCTS TO DISPLAY :( 
              {user && (
              <a href="/Product-page">create</a>

              )}</h3>
          </div>
        </>
      )}

      

<div className={`${styles.Products_list_modern} ${isPreview ? styles.Products_list_modern_preview : ''}`}>
                {products.map((product) => (
<div key={product.id} className={`${styles.product_card_modern} ${isPreview ? styles.product_card_modern_preview : ""}`}>
          <div key={product.id} className={`${styles.product_Img_wrapper_modern}`}>
              <img src={product.product_images[0]?.image_url} alt={product.name} className={styles.product_img}/>
            </div>
            <div className={styles.product_info}>
              <h3>{product?.name}</h3>
              <span>₹{product?.price}</span>
              <div className={styles.product_card_btn_wrapper}>
                 
<a href={`https://wa.me/91${store?.whatsapp_number}?text=${encodeURIComponent(`Hi, I'm interested in *${product?.name}* priced at ₹${product?.price}. Can you please share more details?`)}`} target="_blank" rel="noopener noreferrer">
                  <button style={{fontFamily:"Barlow Semi Condensed, sans-serif"}}>Order</button>
                </a>
                <button style={{fontFamily:"Barlow Semi Condensed, sans-serif"}} onClick={() => {
                  setProduct_Details(product_details?.id === product.id ? null : product)
                  setDetails(true)
                }}>Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>

       <Store_Footer store={store} pages={pages}/>

      {details && (
        <div className={styles.product_details_wrapper}>
          <div className={styles.product_details_card} style={{fontFamily:"Barlow Semi Condensed, sans-serif"}}>
            <div className={styles.product_details_head}>
              <button onClick={() => setDetails(false)}><X size={20}/></button>
            </div>

            <div className={styles.product_details_card_main_content}>
              <div className={styles.product_details_img_wrapper} style={{border:"none"}}>
                <Image_Slider images={product_details?.product_images} style={{borderRadius:"12px"}}/>
              </div>
              <div className={styles.product_details_card_info}>
                <h2>{product_details?.name}</h2>
                <h3>₹{product_details?.price}</h3>
                <span>{product_details?.description || "No description available."}</span>
                <div className={styles.product_details_btns}>
                  <button style={{fontFamily:"Barlow Semi Condensed, sans-serif"}}>Order Now</button>
                  <button onClick={() => setDetails(false)} style={{fontFamily:"Barlow Semi Condensed, sans-serif"}}>Close</button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  )

}


export function Store_Page_Content_Wrapper({store : storeProp,isPreview,theme}){

  const { token } = useParams()
  const [products,setProducts] = useState([])
  const [pages,setPages] = useState([])
  const navigate = useNavigate()
  const [details,setDetails] = useState(false)
  const [product_details,setProduct_Details] = useState(null)
  const [sidebar_active,setSidebar_active] = useState(false)
  const { user, loading } = useAuth()
  const [store,setStore] = useState(null)
  

useEffect(() => {

  const check_store = async () => {
    if (loading) return

    if (storeProp !== undefined && storeProp !== null) {
      setStore(storeProp)
      return
    }

    const { data, error } = await supabase
      .from("stores")
      .select("*")
      .eq("share_token", token)
      .maybeSingle()

    if (error) { console.log(error); return }
    if (!data) { navigate('/'); return }

    setStore(data)
  }

  check_store()
}, [user, loading, storeProp])

  const resolvedTheme = theme || store?.theme || "default"


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

      if (error) { console.log(error); return }
      setProducts(data)
    }
    if(store) fetch_Products();
  },[store])

  useEffect(() => {
    const fetchPages = async () => {
      if (!store?.id) return
      const { data, error } = await supabase
        .from("pages")
        .select("title, slug")
        .eq("store_id", store.id)

      if (error) { console.log(error); return }
      setPages(data)
    }
    fetchPages()
  }, [store])

  return(
    <>
      {resolvedTheme === "default" && <Store_Page store={store} isPreview={isPreview} pages={pages} setPages={setPages} sidebar_active={sidebar_active} products={products} details={details}/>}
      {resolvedTheme === "modern" && <Store_Page_Modern store={store} pages={pages} setPages={setPages} sidebar_active={sidebar_active} products={products} details={details} setDetails={setDetails} isPreview={isPreview}/>}
    </>
  )
}