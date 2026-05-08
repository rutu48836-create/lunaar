import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styles from "../Styles/Sidebar.module.css"
import { supabase } from "./supabase";
import { Store, PackageSearch, Settings, File, Menu, SendHorizonal, User, LogOut, PanelRightClose,Mail,X} from 'lucide-react';
import { useAuth } from "./AuthContext.jsx"

export function NavBar({ active, setActive }) {
    const [profile_active, setProfile_active] = useState(false)
  const navigate = useNavigate()
  const { user, loading } = useAuth()
  const name = user?.user_metadata.name

  useEffect(() => {
    if (!loading && !user) navigate("/Sign-In")
  }, [user, loading])

  return (

    <div className={styles.NavBar_wrapper}>
      <div className={styles.left_side}>
        <span><SendHorizonal size={20} />/</span>
        <h2>{name || user?.email}</h2>
      </div>
      <div className={styles.right_side}>
        <button>Upgrade</button>
        <button onClick={async () => {
          await supabase.auth.signOut()
          navigate("/Sign-In")
        }}><LogOut size={20}/></button>
        <button onClick={() => setActive(prev => !prev)}>
          <Menu size={20} />
        </button>
      </div>
    </div>

  )

}

export function Sidebar({ active, setActive }) {
  const [profile_active, setProfile_active] = useState(false)
  const navigate = useNavigate()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && !user) navigate("/Sign-In")
  }, [user, loading])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate("/Sign-In")
  }

    const name = user?.user_metadata.name
  const avatarUrl = user?.user_metadata?.avatar_url

  return (
    <div>
      <div
        className={active ? styles.active_sidebar : styles.disabled_sidebar}
        onMouseEnter={() => setActive(true)}
      >
        <div className={active ? styles.Branding_wrapper : styles.branding_wrapper_closed}>
          <div className={styles.branding}>
            <h3>Lunaar</h3> <SendHorizonal size={20} />
          </div>
          <div className={styles.menu_wrapper} onClick={() => setActive(false)}>
            <PanelRightClose size={20} />
          </div>
        </div>

        <div className={active ? styles.active_links : styles.sidebar_links}>
          <h3 className={active ? styles.section_label : styles.section_label_close}>Menu</h3>
          <ul>
            <li onClick={() => navigate('/Dashboard')}><Store size={20} strokeWidth={1.40} /> {active && <span>Store</span>}</li>
            <li onClick={() => navigate('/Create-Page')}><File size={20} strokeWidth={1.40} /> {active && <span>Pages</span>}</li>
            <li onClick={() => navigate('/Product-page')}><PackageSearch size={20} strokeWidth={1.40} /> {active && <span>Products</span>}</li>
            <li onClick={() => navigate('/Contact')}><Mail size={20} strokeWidth={1.40} /> {active && <span>Contact Us</span>}</li>

          </ul>

          <h3 className={active ? styles.section_label : styles.section_label_close}>Account</h3>
          <ul>
            <li onClick={() => setProfile_active(true)}><User size={20} strokeWidth={1.40} /> {active && <span>Profile</span>}</li>
            <li onClick={handleLogout}><LogOut size={20} strokeWidth={1.40} /> {active && <span>Log out</span>}</li>
          </ul>
        </div>

        <div className={active ? styles.user_details_wrapper : styles.user_details_wrapper_close}>
          <div className={styles.user_info}>
            <div className={styles.user_img_holder}>
              {avatarUrl
                ? <img src={avatarUrl} alt="avatar" style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />
                : <User size={16} color="black"/>
              }
            </div>
          <div className={styles.user_name}>  <span>{name || user?.email}</span>
            <small>free</small>
            </div>
          </div>
        </div>
      </div>

      {profile_active && (
        <div className={styles.profile_module_wrapper}>
          <div className={styles.profile_card}>
            <div className={styles.profile_card_head}>
              <h2>Profile</h2>
              <button onClick={() => setProfile_active(false)}><X size={20} /></button>
            </div>
            <div className={styles.profile_details_wrapper}>
              <ul>
                <li><h3>Display name</h3> <span>{user?.user_metadata?.name || user?.email}</span></li>
                <li><h3>Email</h3> <span>{user?.email}</span></li>
                <li><h3>Plan</h3> <span>Free</span></li>
                <li><h3>Manage store</h3> <span></span></li>
                <li>
                  <h3>Log out</h3>
                  <button onClick={handleLogout} style={{ background: "transparent", border: "none", color: "#aaa5a5", cursor: "pointer" }}>
                    <LogOut size={20} />
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}