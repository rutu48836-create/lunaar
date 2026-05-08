
import { useState } from "react"
import { LandingNavbar } from "./Nav.jsx"
import { useNavigate } from "react-router-dom"
import styles from "../Styles/page_temp.module.css"
import { Mail, MessageSquare, Clock } from "lucide-react"

export function Contact() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      alert("Please fill in all required fields.")
      return
    }
    setLoading(true)
    // Replace with your own email/form API if needed
    await new Promise(r => setTimeout(r, 1000))
    setSent(true)
    setLoading(false)
  }

  return (
    <div style={{ width: "100vw", minHeight: "100vh", background: "#0a0a0a", color: "#fff", display: "flex", flexDirection: "column", fontFamily: "'DM Sans', sans-serif" }}>

      {/* Beta banner */}
      <div className={styles.beta_banner}>
        <span className={styles.beta_badge}>Beta</span>
        Lunaar is currently in beta — we read every message personally.
      </div>

      <LandingNavbar />

      <main style={{ maxWidth: "780px", width: "100%", margin: "0 auto", padding: "80px 24px 120px", flex: 1, boxSizing: "border-box" }}>

        {/* Header */}
        <div className={styles.page_header}>
          <p className={styles.page_label}>Contact</p>
          <h1 className={styles.page_title}>We'd love to hear from you</h1>
          <p className={styles.page_subtitle}>
            Got a question, a bug report, or just want to share feedback?
            Drop us a message — we respond within 48 hours.
          </p>
        </div>

        {/* Info cards row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "48px" }}>
          <div style={infoCard}>
            <Mail size={16} color="#555" style={{ marginBottom: "10px" }} />
            <p style={infoLabel}>Email us</p>
            <a href="mailto:lunaaroffical@gmail.com" style={infoValue}>lunaaroffical@gmail.com</a>
          </div>
          <div style={infoCard}>
            <MessageSquare size={16} color="#555" style={{ marginBottom: "10px" }} />
            <p style={infoLabel}>What to send</p>
            <p style={{ ...infoValue, color: "#555", cursor: "default" }}>Feedback, bugs, questions</p>
          </div>
          <div style={infoCard}>
            <Clock size={16} color="#555" style={{ marginBottom: "10px" }} />
            <p style={infoLabel}>Response time</p>
            <p style={{ ...infoValue, color: "#555", cursor: "default" }}>Within 48 hours</p>
          </div>
        </div>

        {/* Form or success */}
        {sent ? (
          <div style={{ background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: "14px", padding: "48px 32px", textAlign: "center" }}>
            <p style={{ fontSize: "28px", marginBottom: "12px" }}>✉️</p>
            <h2 style={{ fontSize: "18px", fontWeight: 600, color: "#e8e8e8", margin: "0 0 10px" }}>Message sent!</h2>
            <p style={{ fontSize: "14px", color: "#555", margin: "0 0 28px", lineHeight: 1.7 }}>
              Thanks for reaching out. We'll get back to you at <strong style={{ color: "#888" }}>{form.email}</strong> within 48 hours.
            </p>
            <button onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }) }} style={btnGhost}>
              Send another message
            </button>
          </div>
        ) : (
          <div style={{ background: "rgba(255,255,255,0.02)", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: "14px", padding: "32px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
              <div style={fieldGroup}>
                <label style={labelStyle}>Name <span style={{ color: "#444" }}>*</span></label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  style={inputStyle}
                />
              </div>
              <div style={fieldGroup}>
                <label style={labelStyle}>Email <span style={{ color: "#444" }}>*</span></label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={{ ...fieldGroup, marginBottom: "14px" }}>
              <label style={labelStyle}>Subject</label>
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="What's this about?"
                style={inputStyle}
              />
            </div>

            <div style={{ ...fieldGroup, marginBottom: "24px" }}>
              <label style={labelStyle}>Message <span style={{ color: "#444" }}>*</span></label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us what's on your mind..."
                rows={6}
                style={{ ...inputStyle, resize: "vertical", height: "auto", paddingTop: "12px", paddingBottom: "12px" }}
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
              <p style={{ fontSize: "12px", color: "#444", margin: 0 }}>
                Or email directly at{" "}
                <a href="mailto:lunaaroffical@gmail.com" style={{ color: "#666", textDecoration: "none" }}>
                  lunaaroffical@gmail.com
                </a>
              </p>
              <button onClick={handleSubmit} disabled={loading} style={btnPrimary}>
                {loading ? "Sending..." : "Send message →"}
              </button>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className={styles.page_footer}>
        <span className={styles.page_footer_left}>© {new Date().getFullYear()} Lunaar Inc. — Beta</span>
        <div className={styles.page_footer_right}>
          <button className={styles.page_footer_link} onClick={() => navigate("/")}>Home</button>
          <button className={styles.page_footer_link} onClick={() => navigate("/privacy")}>Privacy</button>
          <button className={styles.page_footer_link} onClick={() => navigate("/about")}>About</button>
        </div>
      </footer>

    </div>
  )
}

/* ── Inline styles ── */
const infoCard = {
  background: "rgba(255,255,255,0.02)",
  border: "0.5px solid rgba(255,255,255,0.07)",
  borderRadius: "12px",
  padding: "20px 18px",
  display: "flex",
  flexDirection: "column",
}

const infoLabel = {
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "1.2px",
  textTransform: "uppercase",
  color: "#444",
  margin: "0 0 6px",
}

const infoValue = {
  fontSize: "13px",
  color: "#888",
  margin: 0,
  textDecoration: "none",
  wordBreak: "break-all",
}

const fieldGroup = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
}

const labelStyle = {
  fontSize: "12px",
  fontWeight: 500,
  color: "#555",
  letterSpacing: "0.2px",
}

const inputStyle = {
  width: "100%",
  height: "44px",
  padding: "0 14px",
  background: "#111",
  border: "0.5px solid rgba(255,255,255,0.09)",
  borderRadius: "10px",
  color: "#e8e8e8",
  fontSize: "14px",
  fontFamily: "'DM Sans', sans-serif",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.15s",
}

const btnPrimary = {
  fontSize: "13.5px",
  fontWeight: 500,
  color: "#000",
  background: "#fff",
  border: "none",
  padding: "10px 20px",
  borderRadius: "10px",
  cursor: "pointer",
  fontFamily: "'DM Sans', sans-serif",
  transition: "opacity 0.15s",
  flexShrink: 0,
}

const btnGhost = {
  fontSize: "13px",
  fontWeight: 500,
  color: "#666",
  background: "transparent",
  border: "0.5px solid rgba(255,255,255,0.1)",
  padding: "9px 18px",
  borderRadius: "10px",
  cursor: "pointer",
  fontFamily: "'DM Sans', sans-serif",
  transition: "color 0.15s",
}