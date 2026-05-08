
 import {useState,useEffect} from "react"
 import { useParams } from "react-router"
 import { supabase } from "../Components/supabase"
 import styles from "../Styles/Page.module.css" 
 import {Store_Header} from "./Store_Page.jsx"
 import {Store_Footer} from "./Store_Page.jsx"

 export function Page(){

      const {token,slug} = useParams()
      const [page,setPage] = useState(null)
      const [store,setStore] = useState(null)
      const [pages, setPages] = useState([])
 
useEffect(() => {

 const fetch_store = async () => {

        const { data: { user } } = await supabase.auth.getUser()


   const { data: stores, error } = await supabase
  .from("stores")
  .select("*")
  .eq("share_token", token)
  .maybeSingle()    

       if(error) console.error(error);
      setStore(stores)


 }

       fetch_store()

},[])


 useEffect(() => {
    const fetch_pages = async () => {
      if(!store?.id) return
      const { data, error } = await supabase
        .from("pages")
        .select("title, slug")
        .eq("store_id", store.id)
      if(error) console.error(error)
      setPages(data || [])
    }
    fetch_pages()
  }, [store])

 useEffect(() => {

 const fetch_page = async () => {

  if(!store?.id) return

    const { data: pages, error } = await supabase
  .from("pages")
  .select("*")
  .eq("store_id", store.id)
  .eq("slug", slug)
  .maybeSingle()    

  if(error) console.error(error) ;
  
  setPage(pages)

 }

  fetch_page()


 },[store,slug])

   return(

<>

<div className={styles.page_container}>

<Store_Header store={store} pages={pages}/>

<div className={styles.page_content_wrapper}>

 <h1>{page?.title}</h1>
 <div  className={styles.page_content}
  dangerouslySetInnerHTML={{ __html: page?.content || '' }}/>
</div>

</div>


</>


 )

}


 



