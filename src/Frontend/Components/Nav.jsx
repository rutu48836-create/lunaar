
import { useState } from "react"
import { SendHorizonal, ChevronDown, Menu, X } from "lucide-react"
import styles from "../Styles/Navbar.module.css"
import {useNavigate} from "react-router-dom"

export function LandingNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()

  const navLinks = [
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
]

  return (
    <nav className={styles.wrap}>
      <div className={styles.inner}>
        <a className={styles.logo} href="/">
          <div className={styles.logoIcon}><SendHorizonal size={14} color="#fff" /></div>
          <span className={styles.logoText}>Lunaar</span>
        </a>

        <div className={styles.links}>
          <button className={styles.link} href="/About">About Us</button>
          <button className={styles.link} href="/Contact">Contact Us</button>
          <button className={styles.link} href="/policy">Policy</button>
   
        </div>

        <div className={styles.right}>
          <button className={styles.ghost} onClick={() => navigate('/Dashboard')}>Sign in</button>
          <button className={styles.primary} onClick={() => navigate('/Dashboard')}>Get started →</button>
        </div>

        <button className={styles.hamburger} onClick={() => setMobileOpen(p => !p)}>
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {mobileOpen && (
        <div className={styles.mobileMenu}>
          {navLinks.map(l => (
           <><a key={l.label} className={styles.mobileLink} href={l.href}>{l.label}</a>
                        </>

          ))}
          <div className={styles.mobileDivider} />
          <div className={styles.mobileActions}>
            <button className={styles.ghost}>Sign in</button>
            <button className={styles.primary}>Get started →</button>
          </div>
        </div>
      )}
    </nav>
  )
}
