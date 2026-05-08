import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Store, Link2, Upload, Phone, ChevronRight, ChevronLeft, Check, X } from "lucide-react"

const STEPS = ["Basic Info", "Branding", "Contact"]

const variants = {
  enter: (dir) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
}

const s = {
  page: {
    minHeight: "100vh",
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    boxSizing: "border-box",
  },
  inner: {
    width: "100%",
    maxWidth: "440px",
  },
  header: {
    marginBottom: "2.5rem",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    marginBottom: "1.5rem",
  },
  brandText: {
    fontSize: "11px",
    fontWeight: 500,
    color: "#a3a3a3",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
  },
  h1: {
    fontSize: "22px",
    fontWeight: 600,
    color: "#171717",
    letterSpacing: "-0.3px",
    margin: 0,
  },
  stepLabel: {
    fontSize: "13px",
    color: "#a3a3a3",
    marginTop: "4px",
  },
  progressTrack: {
    height: "1px",
    background: "#f0f0f0",
    marginBottom: "2.5rem",
    position: "relative",
    overflow: "hidden",
  },
  stepsRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "2.5rem",
  },
  stepItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  stepInner: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  stepDivider: {
    width: "24px",
    height: "1px",
    background: "#e5e5e5",
  },
  card: {
    borderRadius: "16px",
    border: "1px solid #f0f0f0",
    padding: "2rem",
    overflow: "hidden",
    position: "relative",
  },
  fieldGroup: {
    marginBottom: "2rem",
  },
  label: {
    display: "block",
    fontSize: "11px",
    fontWeight: 500,
    color: "#a3a3a3",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    marginBottom: "8px",
  },
  input: {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid #e5e5e5",
    padding: "8px 0",
    fontSize: "14px",
    color: "#171717",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
    transition: "border-color 0.2s",
    display:"flex",
    alignItems:"Center",
    justifyContent:"center"
  },
  prefixRow: {
    display: "flex",
    alignItems: "flex-end",
    borderBottom: "1px solid #e5e5e5",
    transition: "border-color 0.2s",
  },
  prefixText: {
    fontSize: "14px",
    color: "#a3a3a3",
    paddingBottom: "8px",
    paddingRight: "2px",
    whiteSpace: "nowrap",
    flexShrink: 0,
  },
  prefixInput: {
    flex: 1,
    background: "transparent",
    border: "none",
    padding: "8px 0",
    fontSize: "14px",
    color: "#171717",
    outline: "none",
    fontFamily: "inherit",
  },
  slugHint: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "12px",
    color: "#a3a3a3",
    marginTop: "6px",
  },
  dropzone: {
    borderRadius: "12px",
    border: "1px dashed #e5e5e5",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "3.5rem 1rem",
    gap: "12px",
    cursor: "pointer",
    transition: "border-color 0.2s, background 0.2s",
  },
  uploadCircle: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    border: "1px solid #e5e5e5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  uploadTitle: {
    fontSize: "14px",
    fontWeight: 500,
    color: "#404040",
    margin: 0,
    textAlign: "center",
  },
  uploadSub: {
    fontSize: "12px",
    color: "#a3a3a3",
    margin: "2px 0 0",
    textAlign: "center",
  },
  logoPreviewWrap: {
    position: "relative",
    display: "inline-block",
  },
  logoImg: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "1px solid #e5e5e5",
    display: "block",
  },
  removeBtn: {
    position: "absolute",
    top: "-6px",
    right: "-6px",
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    background: "#171717",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
  },
  hint: {
    fontSize: "12px",
    color: "#a3a3a3",
    marginTop: "10px",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "1.5rem",
  },
  backBtn: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    padding: "8px 14px",
    fontSize: "13px",
    fontWeight: 500,
    color: "#737373",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "color 0.15s",
  },
  nextBtn: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    padding: "10px 22px",
    fontSize: "13px",
    fontWeight: 500,
    color: "#fff",
    background: "#171717",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "background 0.15s",
  },
}

export default function CreateStoreForm({ onComplete }) {
  const [step, setStep] = useState(0)
  const [dir, setDir] = useState(1)
  const [logoPreview, setLogoPreview] = useState(null)
  const [dragging, setDragging] = useState(false)
  const [focusedField, setFocusedField] = useState(null)
  const fileRef = useRef()

  const [form, setForm] = useState({
    storeName: "",
    slug: "",
    logo: null,
    whatsapp: "",
  })

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const goNext = () => { setDir(1); setStep((s) => Math.min(s + 1, STEPS.length - 1)) }
  const goBack = () => { setDir(-1); setStep((s) => Math.max(s - 1, 0)) }

  const handleLogoFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return
    setForm((f) => ({ ...f, logo: file }))
    const reader = new FileReader()
    reader.onload = (e) => setLogoPreview(e.target.result)
    reader.readAsDataURL(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    handleLogoFile(e.dataTransfer.files[0])
  }

  const progress = ((step + 1) / STEPS.length) * 100

  return (
    <div style={s.page}>
      <div style={s.inner}>

        {/* Header */}
        <div style={s.header}>
          <div style={s.brand}>
            <Store size={15} color="#171717" />
            <span style={s.brandText}>lunaar</span>
          </div>
          <h1 style={s.h1}>Create your store</h1>
          <p style={s.stepLabel}>Step {step + 1} of {STEPS.length} — {STEPS[step]}</p>
        </div>

        {/* Progress bar */}
        <div style={s.progressTrack}>
          <motion.div
            style={{ position: "absolute", top: 0, left: 0, height: "100%", background: "#171717" }}
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        </div>

        {/* Step dots */}
        <div style={s.stepsRow}>
          {STEPS.map((label, i) => (
            <div key={i} style={s.stepItem}>
              <div style={s.stepInner}>
                <motion.div
                  animate={{ background: i <= step ? "#171717" : "#e5e5e5", scale: i === step ? 1.15 : 1 }}
                  transition={{ duration: 0.2 }}
                  style={{ width: "20px", height: "20px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
                >
                  {i < step
                    ? <Check size={10} color="#fff" strokeWidth={3} />
                    : <span style={{ fontSize: "9px", fontWeight: 600, color: i === step ? "#fff" : "#a3a3a3" }}>{i + 1}</span>
                  }
                </motion.div>
                <span style={{ fontSize: "12px", color: i === step ? "#171717" : "#a3a3a3", fontWeight: i === step ? 500 : 400 }}>
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && <div style={s.stepDivider} />}
            </div>
          ))}
        </div>

        {/* Card */}
        <div style={s.card}>
          <AnimatePresence custom={dir} mode="wait">
            <motion.div
              key={step}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: "easeInOut" }}
            >

              {/* Step 1 */}
              {step === 0 && (
                <div>
                  <div style={s.fieldGroup}>
                    <label style={s.label}>Store Name</label>
                    <input
                      style={{ ...s.input, borderBottomColor: focusedField === "storeName" ? "#171717" : "#e5e5e5" }}
                      placeholder="e.g. Mumbai Spices"
                      value={form.storeName}
                      onChange={set("storeName")}
                      onFocus={() => setFocusedField("storeName")}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>

                  <div style={s.fieldGroup}>
                    <label style={s.label}>Store URL</label>
                    <div style={{ ...s.prefixRow, borderBottomColor: focusedField === "slug" ? "#171717" : "#e5e5e5" }}>
                      <span style={s.prefixText}>lunaar.com/</span>
                      <input
                        style={s.prefixInput}
                        placeholder="your-store-name"
                        value={form.slug}
                        onChange={(e) => setForm((f) => ({
                          ...f,
                          slug: e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
                        }))}
                        onFocus={() => setFocusedField("slug")}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>
                    {form.slug && (
                      <div style={s.slugHint}>
                        <Link2 size={10} />
                        lunaar.com/{form.slug}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {step === 1 && (
                <div>
                  <label style={s.label}>Store Logo</label>
                  <div
                    onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => fileRef.current.click()}
                    style={{ ...s.dropzone, borderColor: dragging ? "#171717" : "#e5e5e5", background: dragging ? "#fafafa" : "transparent" }}
                  >
                    <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleLogoFile(e.target.files[0])} />
                    {logoPreview ? (
                      <div style={s.logoPreviewWrap}>
                        <img src={logoPreview} alt="logo" style={s.logoImg} />
                        <button
                          style={s.removeBtn}
                          onClick={(e) => { e.stopPropagation(); setLogoPreview(null); setForm((f) => ({ ...f, logo: null })) }}
                        >
                          <X size={10} color="#fff" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div style={s.uploadCircle}>
                          <Upload size={14} color="#a3a3a3" />
                        </div>
                        <div>
                          <p style={s.uploadTitle}>Drop your logo here</p>
                          <p style={s.uploadSub}>or click to browse — PNG, JPG, SVG</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {step === 2 && (
                <div>
                  <label style={s.label}>WhatsApp Number</label>
                  <div style={{ ...s.prefixRow, borderBottomColor: focusedField === "whatsapp" ? "#171717" : "",display:"flex",alignItems:"center"}}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", paddingBottom: "8px", paddingRight: "8px", flexShrink: 0,justifyContent:"center" }}>
                      <Phone size={12} color="#a3a3a3" />
                      <span style={s.prefixText}>+91</span>
                    </div>
                    <input
                      style={s.prefixInput}
                      placeholder=""
                      type="tel"
                      value={form.whatsapp}
                      onChange={set("whatsapp")}
                      onFocus={() => setFocusedField("whatsapp")}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>
                  <p style={s.hint}>Customers will contact you via WhatsApp to place orders.</p>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div style={s.nav}>
          <button
            onClick={goBack}
            style={{ ...s.backBtn, opacity: step === 0 ? 0 : 1, pointerEvents: step === 0 ? "none" : "auto" }}
          >
            <ChevronLeft size={14} />
            Back
          </button>

          {step < STEPS.length - 1 ? (
            <button onClick={goNext} style={s.nextBtn}>
              Continue
              <ChevronRight size={14} />
            </button>
          ) : (
            <button onClick={() => onComplete?.(form)} style={s.nextBtn}>
              Create Store
              <Check size={14} />
            </button>
          )}
        </div>

      </div>
    </div>
  )
}