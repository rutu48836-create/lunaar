
import styles from "../Styles/page_temp.module.css"
import { LandingNavbar } from "./Nav.jsx"
import { useNavigate } from "react-router-dom"
import { SendHorizonal, Zap, ShieldCheck, Store, Layers, ArrowRight } from "lucide-react"

export function About() {
  const navigate = useNavigate()

  return (
    <div className={styles.page_wrapper}>

      {/* Beta banner */}
      <div className={styles.beta_banner}>
        <span className={styles.beta_badge}>Beta</span>
        Lunaar is currently in beta — we're building something great, one store at a time.
      </div>

      <LandingNavbar />

      <main className={styles.page_content}>

        {/* Header */}
        <div className={styles.page_header}>
          <p className={styles.page_label}>About</p>
          <h1 className={styles.page_title}>E-commerce should be simple. We made it that way.</h1>
          <p className={styles.page_subtitle}>
            Lunaar was built for people who want to sell — not for people who want
            to spend weeks learning a platform. No bloated dashboards, no confusing
            settings, no unnecessary complexity.
          </p>
          <div className={styles.page_meta}>
            <span>Lunaar Inc.</span>
            <span className={styles.page_meta_dot} />
            <span>Founded 2025</span>
            <span className={styles.page_meta_dot} />
            <span>Currently in Beta</span>
          </div>
        </div>

        {/* Mission */}
        <div className={styles.section}>
          <p className={styles.section_number}>Our Mission</p>
          <h2 className={styles.section_title}>Why we built Lunaar</h2>
          <p className={styles.section_body}>
            Building an online store has always been harder than it should be.
            Existing platforms are packed with features most sellers never use,
            buried behind complex interfaces that take days to figure out. You
            shouldn't need to be a developer or a designer to sell online.
          </p>
          <p className={styles.section_body}>
            Lunaar changes that. We stripped everything back to what actually
            matters — your products, your pages, and your customers. Everything
            else gets out of your way.
          </p>
        </div>

        <div className={styles.divider} />

        {/* What makes us different */}
        <div className={styles.section}>
          <p className={styles.section_number}>01 — Simplicity</p>
          <h2 className={styles.section_title}>No complex UI. Ever.</h2>
          <p className={styles.section_body}>
            Every decision we make is filtered through one question: does this
            make it simpler for a seller? If the answer is no, we don't build it.
            Lunaar's interface is clean, fast, and built around the tasks you
            actually do — adding products, building pages, and managing your store.
          </p>
          <div className={styles.highlight_card}>
            <p>
              <strong>Most e-commerce platforms are built for enterprise teams.</strong> Lunaar
              is built for individuals, small businesses, and creators who want
              to go from zero to live store in minutes — not weeks.
            </p>
          </div>
        </div>

        <div className={styles.divider} />

        {/* Features as a list */}
        <div className={styles.section}>
          <p className={styles.section_number}>02 — What you get</p>
          <h2 className={styles.section_title}>Everything you need, nothing you don't</h2>
          <p className={styles.section_body}>
            Lunaar gives you a focused set of tools that cover everything required
            to run a real online store.
          </p>
          <ul className={styles.data_list}>
            <li>
              <span className={styles.data_list_icon}><Store size={11} /></span>
              <span>
                <strong style={{ color: "#ccc", fontWeight: 500 }}>Store builder</strong> — launch a fully functional
                e-commerce store in minutes. No code, no templates to wrestle with,
                no design degree required.
              </span>
            </li>
            <li>
              <span className={styles.data_list_icon}><Layers size={11} /></span>
              <span>
                <strong style={{ color: "#ccc", fontWeight: 500 }}>Page creator</strong> — build custom pages for your
                store with a simple editor. Landing pages, product showcases,
                about pages — all yours.
              </span>
            </li>
            <li>
              <span className={styles.data_list_icon}><Zap size={11} /></span>
              <span>
                <strong style={{ color: "#ccc", fontWeight: 500 }}>Fast by default</strong> — your store loads fast
                because we keep things lean. No bloated scripts, no unnecessary
                third-party embeds slowing your customers down.
              </span>
            </li>
            <li>
              <span className={styles.data_list_icon}><ShieldCheck size={11} /></span>
              <span>
                <strong style={{ color: "#ccc", fontWeight: 500 }}>Private by design</strong> — we only collect what
                we need to run your store. Your data stays yours. Always.
              </span>
            </li>
          </ul>
        </div>

        <div className={styles.divider} />

        {/* Beta section */}
        <div className={styles.section}>
          <p className={styles.section_number}>03 — Where we are</p>
          <h2 className={styles.section_title}>We're in beta — and that's intentional</h2>
          <p className={styles.section_body}>
            Lunaar is currently in beta. That means you're getting early access to
            something we're actively building and improving based on real feedback
            from real sellers. It also means you're joining at the best possible
            time — when your input actually shapes the product.
          </p>
          <div className={styles.highlight_card}>
            <p>
              <strong>Beta doesn't mean broken.</strong> It means we're moving
              fast, listening closely, and shipping improvements every week. If
              something doesn't work the way you expect, we want to hear about it.
            </p>
          </div>
          <p className={styles.section_body}>
            As we exit beta, Lunaar will introduce more tools, integrations, and
            customisation options — always without sacrificing the simplicity that
            makes it worth using in the first place.
          </p>
        </div>

        <div className={styles.divider} />

        {/* Values */}
        <div className={styles.section}>
          <p className={styles.section_number}>04 — What we believe</p>
          <h2 className={styles.section_title}>Our values</h2>
          <ul className={styles.data_list}>
            <li>
              <span className={styles.data_list_icon} style={{ fontSize: "10px" }}>→</span>
              <span><strong style={{ color: "#ccc", fontWeight: 500 }}>Simplicity over features.</strong> A tool you actually use beats a tool that does everything badly.</span>
            </li>
            <li>
              <span className={styles.data_list_icon} style={{ fontSize: "10px" }}>→</span>
              <span><strong style={{ color: "#ccc", fontWeight: 500 }}>Honesty over hype.</strong> We tell you exactly what Lunaar is, what it isn't, and where it's going.</span>
            </li>
            <li>
              <span className={styles.data_list_icon} style={{ fontSize: "10px" }}>→</span>
              <span><strong style={{ color: "#ccc", fontWeight: 500 }}>Sellers first.</strong> Every product decision starts with "does this help someone sell more?"</span>
            </li>
            <li>
              <span className={styles.data_list_icon} style={{ fontSize: "10px" }}>→</span>
              <span><strong style={{ color: "#ccc", fontWeight: 500 }}>Privacy as a default.</strong> We collect the minimum needed and nothing more. Your data is not our product.</span>
            </li>
          </ul>
        </div>

        <div className={styles.divider} />

        {/* CTA */}
        <div className={styles.section}>
          <p className={styles.section_number}>Get started</p>
          <h2 className={styles.section_title}>Ready to build your store?</h2>
          <p className={styles.section_body}>
            It takes less than two minutes to go from signup to a live store.
            No credit card required during beta.
          </p>
          <div className={styles.contact_card}>
            <p>Join hundreds of sellers already using Lunaar in beta.</p>
            <a onClick={() => navigate("/Sign-In")} style={{ cursor: "pointer" }}>
              Start for free →
            </a>
          </div>
        </div>

        <div className={styles.divider} />

        {/* Contact */}
        <div className={styles.section}>
          <p className={styles.section_number}>Say hello</p>
          <h2 className={styles.section_title}>We'd love to hear from you</h2>
          <p className={styles.section_body}>
            Whether you have a question, a feature request, or just want to share
            how Lunaar is working for you — our inbox is always open.
          </p>
          <div className={styles.contact_card}>
            <p> — we read and reply to every message.</p>
            <a href="mailto:lunaaroffical@gamil.com">Send a message →</a>
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
          <button className={styles.page_footer_link} onClick={() => navigate("/privacy")}>Privacy</button>
          <button className={styles.page_footer_link} onClick={() => navigate("/terms")}>Terms</button>
          <button className={styles.page_footer_link} onClick={() => navigate("/about")}>About</button>
        </div>
      </footer>

    </div>
  )
}