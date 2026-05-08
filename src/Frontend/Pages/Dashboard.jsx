import {useState,useEffect, useRef} from "react"
import {useNavigate} from "react-router-dom"
import {Sidebar} from "../Components/Sidebar.jsx"
import styles from "../Styles/Dashboard.module.css"
import { supabase } from "../Components/supabase.js"
import { nanoid } from "nanoid"
import { NavBar } from "../Components/Sidebar.jsx"
import {Store_Page_Content_Wrapper} from "./Store_Page.jsx"
import { useAuth } from "../Components/AuthContext.jsx"
import { DoorOpen, X, Upload, Phone, Store } from "lucide-react"
import CreateStoreForm from "../Components/Creation_form.jsx"

export function Dashboard(){

  const [store, setStore] = useState(null)
  const [active, setActive] = useState(false)
  const [update, setUpdate] = useState(false)

  const [uName, setUName] = useState("")
  const [uWhatsapp, setUWhatsapp] = useState("")
  const [uFile, setUFile] = useState(null)
  const [uBanner, setUBanner] = useState(null)
  const [uLogoPreview, setULogoPreview] = useState(null)
  const [uBannerPreview, setUBannerPreview] = useState(null)
  const [updateLoading, setUpdateLoading] = useState(false)
  const [focusedField, setFocusedField] = useState(null)
  const [theme, setTheme] = useState("default")

  const themeRef = useRef(theme)

  const navigate = useNavigate()
  const { user, loading } = useAuth()

  useEffect(() => {
    if(loading || !user) return
    const check_store = async () => {
      const { data, error } = await supabase
        .from("stores")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle()
      if(error){ console.log(error); return }
      setStore(data)
    }
    check_store()
  }, [user, loading])

  useEffect(() => {
    if(store?.theme) setTheme(store.theme)
  }, [store])

  useEffect(() => {
    themeRef.current = theme
  }, [theme])

  const openUpdate = () => {
    setUName(store?.name || "")
    setUWhatsapp(store?.whatsapp_number || "")
    setULogoPreview(store?.logo_url || null)
    setUBannerPreview(store?.banner_url || null)
    setUFile(null)
    setUBanner(null)
    setTheme(store?.theme || "default")
    setUpdate(true)
  }

  async function Handle_Creation(data) {
    if(loading || !user) return
    const token = nanoid(10)
    const slug = data.storeName.toLowerCase().replace(/\s+/g, "-")

    let logoUrl = null
    if(data.logo) {
      const filePath = `logos/${Date.now()}-${data.logo.name}`
      await supabase.storage.from("logos").upload(filePath, data.logo)
      const { data: urlData } = supabase.storage.from("logos").getPublicUrl(filePath)
      logoUrl = urlData.publicUrl
    }

    const { error } = await supabase.from("stores").insert({
      user_id: user.id,
      name: data.storeName,
      slug,
      share_token: token,
      whatsapp_number: data.whatsapp,
      logo_url: logoUrl,
      theme: themeRef.current
    })

    if(error) { alert("Error creating store"); return }
    const { data: newStore } = await supabase.from("stores").select("*").eq("user_id", user.id).maybeSingle()
    if(newStore) setStore(newStore)
  }

  const Handle_Update = async () => {
    if(!store || updateLoading) return
    setUpdateLoading(true)
    try {
      const uploadLogo = async () => {
        if(!uFile) return null
        const filePath = `logos/${Date.now()}-${uFile.name}`
        const { error } = await supabase.storage.from("logos").upload(filePath, uFile)
        if(error){ console.error(error); return null }
        const { data } = supabase.storage.from("logos").getPublicUrl(filePath)
        return data.publicUrl
      }

      const uploadBanner = async () => {
        if(!uBanner) return null
        const filePath = `Banner/${Date.now()}-${uBanner.name}`
        const { error } = await supabase.storage.from("Banner").upload(filePath, uBanner)
        if(error){ console.error(error); return null }
        const { data } = supabase.storage.from("Banner").getPublicUrl(filePath)
        return data.publicUrl
      }

      const logoUrl = await uploadLogo()
      const bannerUrl = await uploadBanner()

      const updates = {}
      if(uName) updates.name = uName
      if(uWhatsapp) updates.whatsapp_number = uWhatsapp
      if(logoUrl) updates.logo_url = logoUrl
      if(bannerUrl) updates.banner_url = bannerUrl
      updates.theme = themeRef.current

      console.log("updates being sent:", updates)

      const { error } = await supabase.from("stores").update(updates).eq("user_id", user.id)
      if(error){ console.log(error); return }

      const { data: newStore } = await supabase.from("stores").select("*").eq("user_id", user.id).maybeSingle()
      if(newStore) setStore(newStore)
      setUpdate(false)
    } catch(err) {
      console.log(err)
    } finally {
      setUpdateLoading(false)
    }
  }

  const handleFilePreview = (file, setPreview, setter) => {
    if(!file) return
    setter(file)
    const reader = new FileReader()
    reader.onload = (e) => setPreview(e.target.result)
    reader.readAsDataURL(file)
  }

  return(
    <div className={styles.Dashboard_container}>
      <NavBar active={active} setActive={setActive}/>
      <div className={styles.Dashboard_Main_content_container}>
        <Sidebar active={active} setActive={setActive}/>
        <div className={styles.Main_content_wrapper}>
          {loading && <p style={{padding:"2rem",color:"#a3a3a3",fontSize:"13px"}}>Loading...</p>}

          {!loading && !store && (
            <div className={styles.Store_creation_container}>
              <CreateStoreForm onComplete={(data) => Handle_Creation(data)} />
            </div>
          )}

          {!loading && store && (
            <div className={styles.store_content_wrapper}>
              <div className={styles.store_header}>
                <div className={styles.store_greetings}>
                  <h2>Good Morning</h2>
                  <span>See how your store is looking today</span>
                </div>
                <div className={styles.store_btns}>
                  <button onClick={() => navigate(`/store/${store.share_token}`)}>
                    View store <DoorOpen size={16}/>
                  </button>
                  <button onClick={openUpdate}>Update</button>
                </div>
              </div>
              <div className={styles.Store_page_container}>
                <Store_Page_Content_Wrapper store={store} isPreview={true} theme={theme}/>
              </div>
            </div>
          )}
        </div>
      </div>

      {update && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 9999, padding: "1rem", boxSizing: "border-box",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}>
          <div style={{
            background: "#fff", borderRadius: "20px", width: "100%", maxWidth: "460px",
            maxHeight: "90vh", overflowY: "auto", padding: "2rem",
            boxSizing: "border-box", position: "relative",
          }}>

            {/* Modal header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.8rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Store size={16} color="#171717" />
                <h2 style={{ margin: 0, fontSize: "17px", fontWeight: 600, color: "#171717" }}>
                  Update Store
                </h2>
              </div>
              <button
                onClick={() => setUpdate(false)}
                style={{ background: "#f5f5f5", border: "none", borderRadius: "50%", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
              >
                <X size={15} color="#555" />
              </button>
            </div>

            {/* Store Name */}
            <div style={{ marginBottom: "1.6rem" }}>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 500, color: "#a3a3a3", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px" }}>
                Store Name
              </label>
              <input
                value={uName}
                onChange={(e) => setUName(e.target.value)}
                placeholder={store?.name || "Store name"}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                style={{
                  width: "100%", background: "transparent", border: "none",
                  borderBottom: `1px solid ${focusedField === "name" ? "#171717" : "#e5e5e5"}`,
                  padding: "8px 0", fontSize: "14px", color: "#171717",
                  outline: "none", boxSizing: "border-box", fontFamily: "inherit",
                  transition: "border-color 0.2s",
                }}
              />
            </div>

            {/* WhatsApp */}
            <div style={{ marginBottom: "1.6rem" }}>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 500, color: "#a3a3a3", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px" }}>
                WhatsApp Number
              </label>
              <div style={{ display: "flex", alignItems: "flex-end", borderBottom: `1px solid ${focusedField === "wa" ? "#171717" : "#e5e5e5"}`, transition: "border-color 0.2s" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "5px", paddingBottom: "8px", paddingRight: "8px", flexShrink: 0 }}>
                  <Phone size={12} color="#a3a3a3" />
                  <span style={{ fontSize: "14px", color: "#a3a3a3" }}>+91</span>
                </div>
                <input
                  value={uWhatsapp}
                  onChange={(e) => setUWhatsapp(e.target.value)}
                  placeholder={store?.whatsapp_number || "98765 43210"}
                  type="tel"
                  onFocus={() => setFocusedField("wa")}
                  onBlur={() => setFocusedField(null)}
                  style={{ flex: 1, background: "transparent", border: "none", padding: "8px 0", fontSize: "14px", color: "#171717", outline: "none", fontFamily: "inherit" }}
                />
              </div>
            </div>

            <div style={{ marginBottom: "1.6rem" }}>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 500, color: "#a3a3a3", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px" }}>
                Theme
              </label>
              <div style={{ borderBottom: "1px solid #e5e5e5", paddingBottom: "8px" }}>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  style={{ background: "transparent", border: "none", fontSize: "14px", color: "#171717", outline: "none", fontFamily: "inherit", cursor: "pointer", width: "100%" }}
                >
                  <option value="default">Default</option>
                  <option value="modern">Modern</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: "1.6rem" }}>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 500, color: "#a3a3a3", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px" }}>
                Store Logo
              </label>
              <label htmlFor="update-logo" style={{
                display: "flex", alignItems: "center", gap: "12px",
                padding: "12px 14px", border: "1px dashed #e5e5e5",
                borderRadius: "10px", cursor: "pointer", transition: "border-color 0.2s",
              }}>
                {uLogoPreview
                  ? <img src={uLogoPreview} alt="logo" style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover", border: "1px solid #e5e5e5", flexShrink: 0 }} />
                  : <div style={{ width: "40px", height: "40px", borderRadius: "50%", border: "1px solid #e5e5e5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Upload size={14} color="#a3a3a3" />
                    </div>
                }
                <div>
                  <p style={{ margin: 0, fontSize: "13px", fontWeight: 500, color: "#404040" }}>
                    {uFile ? uFile.name : "Change logo"}
                  </p>
                  <p style={{ margin: "2px 0 0", fontSize: "11px", color: "#a3a3a3" }}>PNG, JPG, SVG</p>
                </div>
                <input id="update-logo" type="file" accept="image/*" style={{ display: "none" }}
                  onChange={(e) => handleFilePreview(e.target.files[0], setULogoPreview, setUFile)} />
              </label>
            </div>

            <div style={{ marginBottom: "2rem" }}>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 500, color: "#a3a3a3", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px" }}>
                Store Banner
              </label>
              <label htmlFor="banner" style={{
                display: "block", border: "1px dashed #e5e5e5", borderRadius: "10px",
                cursor: "pointer", overflow: "hidden", transition: "border-color 0.2s",
              }}>
                {uBannerPreview
                  ? <div style={{ position: "relative" }}>
                      <img src={uBannerPreview} alt="banner" style={{ width: "100%", height: "100px", objectFit: "cover", display: "block" }} />
                      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: "12px", color: "#fff", fontWeight: 500 }}>Click to change</span>
                      </div>
                    </div>
                  : <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "1.5rem", gap: "6px" }}>
                      <Upload size={16} color="#a3a3a3" />
                      <p style={{ margin: 0, fontSize: "13px", fontWeight: 500, color: "#404040" }}>Upload banner</p>
                      <p style={{ margin: 0, fontSize: "11px", color: "#a3a3a3" }}>Recommended 16:9, PNG or JPG</p>
                    </div>
                }
                <input id="banner" type="file" accept="image/*" style={{ display: "none" }}
                  onChange={(e) => handleFilePreview(e.target.files[0], setUBannerPreview, setUBanner)} />
              </label>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => setUpdate(false)}
                style={{ flex: 1, padding: "11px", borderRadius: "10px", border: "1px solid #e5e5e5", background: "#fff", fontSize: "13px", fontWeight: 500, color: "#555", cursor: "pointer", fontFamily: "inherit" }}
              >
                Cancel
              </button>
              <button
                onClick={Handle_Update}
                disabled={updateLoading}
                style={{ flex: 2, padding: "11px", borderRadius: "10px", border: "none", background: updateLoading ? "#737373" : "#171717", fontSize: "13px", fontWeight: 500, color: "#fff", cursor: updateLoading ? "not-allowed" : "pointer", fontFamily: "inherit", transition: "background 0.2s" }}
              >
                {updateLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}