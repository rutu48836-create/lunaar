import { useState, useRef } from "react"
import { Upload, Phone, Store, ArrowRight, Check } from "lucide-react"

export default function CreateStoreForm({ onComplete }) {
  const [storeName, setStoreName] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [logo, setLogo] = useState(null)
  const [logoPreview, setLogoPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [focused, setFocused] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const fileRef = useRef()

  const handleLogoChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setLogo(file)
    const reader = new FileReader()
    reader.onload = (ev) => setLogoPreview(ev.target.result)
    reader.readAsDataURL(file)
  }

  const handleSubmit = async () => {
    if (!storeName.trim() || loading) return
    setLoading(true)
    try {
      await onComplete({ storeName, whatsapp, logo })
      setSubmitted(true)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.page}>
      {/* Left accent bar */}
      <div style={styles.accentBar} />

      <div style={styles.card}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.iconWrap}>
            <Store size={18} color="#fff" strokeWidth={1.8} />
          </div>
          <div>
            <h2 style={styles.title}>Create your store</h2>
            <p style={styles.subtitle}>Set up in under a minute</p>
          </div>
        </div>

        {/* Divider */}
        <div style={styles.divider} />

        {/* Store Name */}
        <div style={styles.field}>
          <label style={styles.label}>Store Name</label>
          <input
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            placeholder="e.g. Zara's Boutique"
            onFocus={() => setFocused("name")}
            onBlur={() => setFocused(null)}
            style={{
              ...styles.input,
              borderColor: focused === "name" ? "#171717" : "#e5e5e5",
              background: focused === "name" ? "#fff" : "#fafafa",
            }}
          />
        </div>

        {/* WhatsApp */}
        <div style={styles.field}>
          <label style={styles.label}>WhatsApp Number</label>
          <div style={{
            ...styles.phoneRow,
            borderColor: focused === "wa" ? "#171717" : "#e5e5e5",
            background: focused === "wa" ? "#fff" : "#fafafa",
          }}>
            <div style={styles.phonePrefix}>
              <Phone size={12} color="#a3a3a3" />
              <span style={styles.prefixText}>+91</span>
            </div>
            <div style={styles.phoneDivider} />
            <input
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="98765 43210"
              type="tel"
              onFocus={() => setFocused("wa")}
              onBlur={() => setFocused(null)}
              style={styles.phoneInput}
            />
          </div>
          <span style={styles.hint}>Customers will contact you via WhatsApp</span>
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Store Logo</label>
          <label
            htmlFor="create-logo"
            style={{
              ...styles.uploadBox,
              borderColor: focused === "logo" ? "#171717" : "#e5e5e5",
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = "#171717"}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = "#e5e5e5"}
          >
            {logoPreview ? (
              <div style={styles.logoPreviewRow}>
                <img src={logoPreview} alt="logo" style={styles.logoThumb} />
                <div>
                  <p style={styles.uploadTitle}>{logo?.name}</p>
                  <p style={styles.uploadSub}>Click to replace</p>
                </div>
                <div style={styles.checkBadge}>
                  <Check size={12} color="#fff" strokeWidth={2.5} />
                </div>
              </div>
            ) : (
              <div style={styles.uploadEmpty}>
                <div style={styles.uploadIcon}>
                  <Upload size={15} color="#a3a3a3" />
                </div>
                <div>
                  <p style={styles.uploadTitle}>Upload your logo</p>
                  <p style={styles.uploadSub}>PNG, JPG, SVG — max 5MB</p>
                </div>
              </div>
            )}
            <input
              id="create-logo"
              ref={fileRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleLogoChange}
            />
          </label>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!storeName.trim() || loading}
          style={{
            ...styles.btn,
            background: !storeName.trim() ? "#d4d4d4" : "#171717",
            cursor: !storeName.trim() ? "not-allowed" : "pointer",
          }}
        >
          {loading ? (
            <span style={styles.btnInner}>
              <span style={styles.spinner} /> Setting up...
            </span>
          ) : (
            <span style={styles.btnInner}>
              Launch Store <ArrowRight size={15} strokeWidth={2} />
            </span>
          )}
        </button>

        <p style={styles.footerNote}>
          You can always update your store details later,you can add products later
        </p>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

const styles = {
  page: {
    width: "100%",
    minHeight: "100%",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingTop: "3rem",
    paddingBottom: "3rem",
    boxSizing: "border-box",
    position: "relative",
  },
  accentBar: {
    position: "absolute",
    top: "3rem",
    left: 0,
    width: "3px",
    height: "120px",
    background: "linear-gradient(180deg, #171717 0%, transparent 100%)",
    borderRadius: "0 4px 4px 0",
  },
  card: {
    marginTop:"0px",
    width: "100%",
    maxWidth: "420px",
    background: "#fff",
    borderRadius: "18px",
    padding: "2rem",
    boxSizing: "border-box",
    boxShadow: "0 0 0 1px rgba(0,0,0,0.07), 0 4px 24px rgba(0,0,0,0.06)",
    fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginBottom: "1.4rem",
  },
  iconWrap: {
    width: "40px",
    height: "40px",
    background: "#171717",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  title: {
    margin: 0,
    fontSize: "17px",
    fontWeight: 600,
    color: "#171717",
    letterSpacing: "-0.02em",
  },
  subtitle: {
    margin: "2px 0 0",
    fontSize: "12px",
    color: "#a3a3a3",
  },
  divider: {
    height: "1px",
    background: "#f0f0f0",
    marginBottom: "1.6rem",
  },
  field: {
    marginBottom: "1.4rem",
  },
  label: {
    display: "block",
    fontSize: "11px",
    fontWeight: 600,
    letterSpacing: "0.07em",
    textTransform: "uppercase",
    color: "#a3a3a3",
    marginBottom: "8px",
  },
  optional: {
    textTransform: "none",
    fontWeight: 400,
    letterSpacing: 0,
    fontSize: "11px",
    color: "#c0c0c0",
  },
  input: {
    width: "100%",
    padding: "10px 14px",
    border: "1px solid #e5e5e5",
    borderRadius: "10px",
    fontSize: "14px",
    color: "#171717",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
    transition: "border-color 0.18s, background 0.18s",
  },
  phoneRow: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #e5e5e5",
    borderRadius: "10px",
    overflow: "hidden",
    transition: "border-color 0.18s, background 0.18s",
  },
  phonePrefix: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    padding: "10px 12px",
    flexShrink: 0,
  },
  prefixText: {
    fontSize: "13px",
    color: "#a3a3a3",
    fontFamily: "inherit",
  },
  phoneDivider: {
    width: "1px",
    height: "20px",
    background: "#e5e5e5",
    flexShrink: 0,
  },
  phoneInput: {
    flex: 1,
    border: "none",
    background: "transparent",
    padding: "10px 12px",
    fontSize: "14px",
    color: "#171717",
    outline: "none",
    fontFamily: "inherit",
  },
  hint: {
    display: "block",
    marginTop: "6px",
    fontSize: "11px",
    color: "#c0c0c0",
  },
  uploadBox: {
    display: "block",
    border: "1px dashed #e5e5e5",
    borderRadius: "10px",
    padding: "14px",
    cursor: "pointer",
    transition: "border-color 0.18s",
    boxSizing: "border-box",
  },
  uploadEmpty: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  uploadIcon: {
    width: "38px",
    height: "38px",
    border: "1px solid #e5e5e5",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    background: "#fafafa",
  },
  uploadTitle: {
    margin: 0,
    fontSize: "13px",
    fontWeight: 500,
    color: "#404040",
  },
  uploadSub: {
    margin: "2px 0 0",
    fontSize: "11px",
    color: "#a3a3a3",
  },
  logoPreviewRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    position: "relative",
  },
  logoThumb: {
    width: "38px",
    height: "38px",
    borderRadius: "8px",
    objectFit: "cover",
    border: "1px solid #e5e5e5",
    flexShrink: 0,
  },
  checkBadge: {
    position: "absolute",
    right: 0,
    top: "50%",
    transform: "translateY(-50%)",
    width: "22px",
    height: "22px",
    background: "#171717",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    fontSize: "14px",
    fontWeight: 600,
    color: "#fff",
    fontFamily: "inherit",
    transition: "background 0.18s, transform 0.1s",
    letterSpacing: "-0.01em",
    marginTop: "0.4rem",
  },
  btnInner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
  spinner: {
    display: "inline-block",
    width: "13px",
    height: "13px",
    border: "2px solid rgba(255,255,255,0.3)",
    borderTopColor: "#fff",
    borderRadius: "50%",
    animation: "spin 0.7s linear infinite",
  },
  footerNote: {
    textAlign: "center",
    fontSize: "11px",
    color: "#c0c0c0",
    marginTop: "14px",
    marginBottom: 0,
  },
}