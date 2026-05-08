import {useState,useEffect} from 'react'
import { NavBar } from "../Components/Sidebar.jsx"
import { Sidebar } from "../Components/Sidebar.jsx"
import styles from "../Styles/Create_Page.module.css"
import { supabase } from '../Components/supabase.js'
import { useParams } from 'react-router'
import { useAuth } from '../Components/AuthContext.jsx'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Placeholder from '@tiptap/extension-placeholder'
import '../Styles/editor.css'

function MenuBar({ editor }) {
  if (!editor) return null

  const btn = (action, label, active) => (
    <button
      type="button"
      onClick={action}
      className={`${styles.toolbar_btn} ${active ? styles.toolbar_btn_active : ''}`}
    >
      {label}
    </button>
  )

  return (
    <div className={styles.toolbar}>
      <div className={styles.toolbar_group}>
        {btn(() => editor.chain().focus().toggleBold().run(), 'B', editor.isActive('bold'))}
        {btn(() => editor.chain().focus().toggleItalic().run(), 'I', editor.isActive('italic'))}
        {btn(() => editor.chain().focus().toggleUnderline().run(), 'U', editor.isActive('underline'))}
        {btn(() => editor.chain().focus().toggleStrike().run(), 'S̶', editor.isActive('strike'))}
      </div>

      <div className={styles.toolbar_divider}/>

      <div className={styles.toolbar_group}>
        {btn(() => editor.chain().focus().toggleHeading({level:1}).run(), 'H1', editor.isActive('heading',{level:1}))}
        {btn(() => editor.chain().focus().toggleHeading({level:2}).run(), 'H2', editor.isActive('heading',{level:2}))}
        {btn(() => editor.chain().focus().toggleHeading({level:3}).run(), 'H3', editor.isActive('heading',{level:3}))}
      </div>

      <div className={styles.toolbar_divider}/>

      <div className={styles.toolbar_group}>
        {btn(() => editor.chain().focus().toggleBulletList().run(), '• List', editor.isActive('bulletList'))}
        {btn(() => editor.chain().focus().toggleOrderedList().run(), '1. List', editor.isActive('orderedList'))}
        {btn(() => editor.chain().focus().toggleBlockquote().run(), '❝', editor.isActive('blockquote'))}
        {btn(() => editor.chain().focus().toggleCodeBlock().run(), '</>',  editor.isActive('codeBlock'))}
      </div>

      <div className={styles.toolbar_divider}/>

      <div className={styles.toolbar_group}>
        {btn(() => editor.chain().focus().setTextAlign('left').run(), '⬅', editor.isActive({textAlign:'left'}))}
        {btn(() => editor.chain().focus().setTextAlign('center').run(), '↔', editor.isActive({textAlign:'center'}))}
        {btn(() => editor.chain().focus().setTextAlign('right').run(), '➡', editor.isActive({textAlign:'right'}))}
      </div>

      <div className={styles.toolbar_divider}/>

      <div className={styles.toolbar_group}>
        {btn(() => editor.chain().focus().undo().run(), '↩', false)}
        {btn(() => editor.chain().focus().redo().run(), '↪', false)}
      </div>
    </div>
  )
}

export function Create_Page(){

  const {token} = useParams()
  const { user, loading } = useAuth()

  const [title, setTitle] = useState("")
  const [store, setStore] = useState(null)
  const [pages, setPages] = useState([])
  const [active, setActive] = useState(false)
  const [selected_page, setSelected_Page] = useState(null)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ['heading','paragraph'] }),
      Placeholder.configure({ placeholder: 'Start writing your page content...' })
    ],
    content: '',
  })

  function createSlug(text) {
    return text.toLowerCase().trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
  }

  function loadPage(page) {
  setSelected_Page(page)
  setTitle(page.title)
  editor.commands.setContent(page.content || '')
}

  useEffect(() => {
    if(loading || !user) return
    const check_store = async () => {
      const { data, error } = await supabase.from("stores").select("*").eq("user_id", user.id).maybeSingle()
      if(error){ console.log(error); return }
      setStore(data)
    }
    check_store()
  }, [user, loading])

  useEffect(() => {
    if(!store?.id) return
    const fetchPages = async () => {
      const { data, error } = await supabase.from("pages").select("title, slug,content,id").eq("store_id", store.id)
      if(error){ console.log(error); return }
      setPages(data)
    }
    fetchPages()
  }, [store])

  async function Handle_Creation(){
    if(!store?.id || !editor) return
    const content = editor.getHTML()
    const slug = createSlug(title)

    if(pages.length >= 7){
      alert("Limit reached, you can only create up to 7 pages")
      return
    }

    try {

      if(selected_page){
        const {error} = await supabase.from("pages").update({
          title:title,
          content:content
        }).eq("id",selected_page.id)
        if(error) {
          console.log(error)
        }

        alert("Page updated successfully")

      }


      const { error } = await supabase.from("pages").insert({
        store_id: store.id,
        title: title,
        content: content,
        slug: slug
      })
      if(error){ console.error(error); return }
      alert("Page created successfully")
      editor.commands.clearContent()
      setTitle("")
    } catch(err) {
      console.error(err)
    }
  }

  const btn_content = selected_page ? "Update" : "Create";

  return(
    <div className={styles.Create_Page_container}>
      <NavBar active={active} setActive={setActive}/>
      <div className={styles.Create_Page_Main_content_container}>
        <Sidebar active={active} setActive={setActive}/>
        <div className={styles.Create_Page_content}>
          <div className={styles.Create_Page_content_header}>
            <h2>Update Pages</h2>
            <span>edit and update the pages according to your needs</span>
          </div>

          <div className={styles.Create_Page_content_link_form_wrapper}>
            <div className={styles.links_wrapper}>
              <ul>
                <li><a href={`/s/${token}`}>Home</a></li>
                {pages.map((page) => (
                  <li key={page.slug}   key={page.slug}
    onClick={() => loadPage(page)}     style={{ background: selected_page?.slug === page.slug ? '#f0f0f0' : 'transparent' }}
>{page.title}</li>
                ))}
              </ul>
            </div>

            <div className={styles.Create_Page_content_form}>
              <label htmlFor='title'>Page title</label>
              <input type='text' id='title' value={title} onChange={(e) => setTitle(e.target.value)} className={styles.title_input}/>

              <label style={{marginTop:"24px"}}>Page Content</label>
              <div className={styles.editor_wrapper}>
                <MenuBar editor={editor}/>
                <EditorContent editor={editor} className={styles.editor_content}/>
              </div>

              <button onClick={Handle_Creation}>{btn_content}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}