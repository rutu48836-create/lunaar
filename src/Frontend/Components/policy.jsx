import styles from "../Styles/page_temp.module.css"
import { LandingNavbar } from "./Nav.jsx"
import { useNavigate } from "react-router-dom"
import { Check } from "lucide-react"

export function Privacy() {
  const navigate = useNavigate()

  return (
    <div className={styles.page_wrapper}>

      {/* Beta banner */}
      <div className={styles.beta_banner}>
        <span className={styles.beta_badge}>Beta</span>
        Lunaar is currently in beta — features and policies may evolve as we grow.
      </div>

      <LandingNavbar />

      <main className={styles.page_content}>

        {/* Header */}
        <div className={styles.page_header}>
          <p className={styles.page_label}>Legal</p>
          <h1 className={styles.page_title}>Privacy Policy</h1>
          <p className={styles.page_subtitle}>
            We believe privacy is a right, not a feature. Here's exactly what we
            collect, why we collect it, and what we will never do with it.
          </p>
          <div className={styles.page_meta}>
            <span>Lunaar Inc.</span>
            <span className={styles.page_meta_dot} />
            <span>Effective: May 2025</span>
            <span className={styles.page_meta_dot} />
            <span>Version 1.0 — Beta</span>
          </div>
        </div>

        {/* Beta notice */}
        <div className={styles.section}>
          <p className={styles.section_number}>Notice</p>
          <h2 className={styles.section_title}>Lunaar is in Beta</h2>
          <div className={styles.highlight_card}>
            <p>
              <strong>Lunaar is currently in beta.</strong> This means the platform
              is actively being developed and improved. While we take your data
              seriously at every stage, some features, integrations, and policies
              may change as we refine the product. We will notify users of any
              meaningful updates to this policy via email.
            </p>
          </div>
        </div>

        <div className={styles.divider} />

        {/* What we collect */}
        <div className={styles.section}>
          <p className={styles.section_number}>01 — Data Collection</p>
          <h2 className={styles.section_title}>What we collect</h2>
          <p className={styles.section_body}>
            We collect only the minimum data required to provide you with a
            working store and a personalised experience. Nothing more.
          </p>
          <ul className={styles.data_list}>
            <li>
              <span className={styles.data_list_icon}><Check size={11} /></span>
              <span>
                <strong style={{ color: "#ccc", fontWeight: 500 }}>Email address</strong> — used to create and identify your account,
                send transactional emails (such as login links and updates), and
                occasional product announcements.
              </span>
            </li>
            <li>
              <span className={styles.data_list_icon}><Check size={11} /></span>
              <span>
                <strong style={{ color: "#ccc", fontWeight: 500 }}>Display name</strong> — used to personalise your dashboard and
                your store's public-facing profile. You may choose any name.
              </span>
            </li>
            <li>
              <span className={styles.data_list_icon}><Check size={11} /></span>
              <span>
                <strong style={{ color: "#ccc", fontWeight: 500 }}>Store content</strong> — the pages, products, and content you
                create within Lunaar, stored to power your store.
              </span>
            </li>
          </ul>
        </div>

        <div className={styles.divider} />

        {/* How we use it */}
        <div className={styles.section}>
          <p className={styles.section_number}>02 — Data Usage</p>
          <h2 className={styles.section_title}>How we use your data</h2>
          <p className={styles.section_body}>
            Your email and display name are used for two purposes only:
          </p>
          <div className={styles.highlight_card}>
            <p>
              <strong>1. Building your store.</strong> Your display name populates
              your store identity. Your email is your account credential and the
              address we use to reach you about your store activity.
            </p>
          </div>
          <div className={styles.highlight_card}>
            <p>
              <strong>2. Marketing communications.</strong> We may send you
              product updates, feature announcements, and relevant Lunaar news to
              your email. Every email includes an unsubscribe link — one click
              removes you permanently from marketing lists. Transactional emails
              (login, billing, security) cannot be opted out of as they are
              essential to your account.
            </p>
          </div>
        </div>

        <div className={styles.divider} />

        {/* What we don't do */}
        <div className={styles.section}>
          <p className={styles.section_number}>03 — Our Commitment</p>
          <h2 className={styles.section_title}>What we will never do</h2>
          <p className={styles.section_body}>
            We want to be unambiguous about this.
          </p>
          <ul className={styles.data_list}>
            <li>
              <span className={styles.data_list_icon}><Check size={11} /></span>
              <span>We will <strong style={{ color: "#ccc", fontWeight: 500 }}>never sell</strong> your personal data to third parties.</span>
            </li>
            <li>
              <span className={styles.data_list_icon}><Check size={11} /></span>
              <span>We will <strong style={{ color: "#ccc", fontWeight: 500 }}>never share</strong> your email or display name with advertisers.</span>
            </li>
            <li>
              <span className={styles.data_list_icon}><Check size={11} /></span>
              <span>We will <strong style={{ color: "#ccc", fontWeight: 500 }}>never access</strong> your store content for purposes other than delivering the service.</span>
            </li>
            <li>
              <span className={styles.data_list_icon}><Check size={11} /></span>
              <span>We will <strong style={{ color: "#ccc", fontWeight: 500 }}>never use</strong> your data to train AI models or sell insights derived from your behaviour.</span>
            </li>
          </ul>
        </div>

        <div className={styles.divider} />

        {/* Third parties */}
        <div className={styles.section}>
          <p className={styles.section_number}>04 — Third Parties</p>
          <h2 className={styles.section_title}>Third-party services</h2>
          <p className={styles.section_body}>
            Lunaar uses a small number of trusted third-party providers to
            operate the platform. These include Supabase for authentication and
            database storage, and email providers for transactional delivery.
            These providers only receive the data strictly necessary to perform
            their function and are bound by their own privacy agreements.
          </p>
          <p className={styles.section_body}>
            If you sign in via Google OAuth, Google provides us only with your
            email address and display name. We do not receive or store your
            Google password or any other Google account data.
          </p>
        </div>

        <div className={styles.divider} />

        {/* Your rights */}
        <div className={styles.section}>
          <p className={styles.section_number}>05 — Your Rights</p>
          <h2 className={styles.section_title}>Your rights</h2>
          <p className={styles.section_body}>
            You have the right to access, correct, or delete your personal data
            at any time. You can request account deletion by contacting us at the
            address below. Upon deletion, your email and display name will be
            permanently removed from our systems within 30 days.
          </p>
        </div>

        <div className={styles.divider} />

        {/* Contact */}
        <div className={styles.section}>
          <p className={styles.section_number}>06 — Contact</p>
          <h2 className={styles.section_title}>Questions or concerns?</h2>
          <p className={styles.section_body}>
            If you have any questions about this policy or how your data is
            handled, reach out to us directly. We read every message.
          </p>
          <div className={styles.contact_card}>
            <p>privacy@lunaar.co — we typically respond within 48 hours.</p>
            <a href="mailto:privacy@lunaar.co">Send email →</a>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className={styles.page_footer}>
        <span className={styles.page_footer_left}>
          © {new Date().getFullYear()} Lunaar Inc. — Beta
        </span>
        <div className={styles.page_footer_right}>
          <button className={styles.page_footer_link} onClick={() => navigate("/")}>Home</button>
          <button className={styles.page_footer_link} onClick={() => navigate("/terms")}>Terms</button>
          <button className={styles.page_footer_link} onClick={() => navigate("/privacy")}>Privacy</button>
        </div>
      </footer>

    </div>
  )
}