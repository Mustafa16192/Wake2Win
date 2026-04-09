import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const brand = {
  name: "Wake2Win",
};

const navItems = [
  { label: "Why", href: "#why" },
  { label: "Hardware", href: "#hardware" },
  { label: "Companion", href: "#companion" },
  { label: "Waitlist", href: "#waitlist" },
];

const pillars = [
  {
    title: "Phone alarms are too easy to kill.",
    body:
      "A swipe is not a wake-up ritual. Most people can shut off a phone alarm while still half asleep and drift right back out.",
  },
  {
    title: "Physical interaction changes the moment.",
    body:
      "Wake2Win makes the user complete a short tactile challenge on the device itself before the alarm can stop.",
  },
  {
    title: "The app supports. The device decides.",
    body:
      "A companion app handles setup and preferences, but the bedside hardware remains the only place where the alarm is truly dismissed.",
  },
];

const hardwareFeatures = [
  "Built-in tactile challenge interface",
  "Escalating sound and light routine",
  "Compact footprint for dorms and small bedrooms",
  "Reliable local alarm path even if the phone is gone",
];

const companionFeatures = [
  "Wi-Fi pairing and first-time setup",
  "Recurring alarms and weekday presets",
  "Challenge difficulty and wake-up intensity controls",
  "Device status, firmware, and room-friendly preferences",
];

const wakeFlow = [
  {
    step: "01",
    title: "Set the routine in the app",
    body:
      "Pair the device, choose the alarm schedule, and tune challenge intensity without turning the phone into the product.",
  },
  {
    step: "02",
    title: "Wake on hardware",
    body:
      "At the bedside, Wake2Win uses sound, light, and a physical challenge to interrupt passive snoozing before the day falls apart.",
  },
  {
    step: "03",
    title: "Dismiss only after real interaction",
    body:
      "The alarm ends when the user completes the device challenge, not when they tap a screen while still cognitively offline.",
  },
];

function App() {
  const rootRef = useRef(null);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitState, setSubmitState] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

      heroTl
        .from(".js-nav", {
          y: -18,
          opacity: 0,
          duration: 0.6,
        })
        .from(
          ".js-hero-copy > *",
          {
            y: 28,
            opacity: 0,
            duration: 0.82,
            stagger: 0.08,
          },
          "-=0.24",
        )
        .from(
          ".js-hero-device",
          {
            y: 30,
            opacity: 0,
            scale: 0.98,
            duration: 0.9,
          },
          "-=0.42",
        );

      gsap.set(".js-reveal", { y: 22, opacity: 0 });

      gsap.utils.toArray(".js-reveal").forEach((element) => {
        gsap.to(element, {
          y: 0,
          opacity: 1,
          duration: 0.72,
          ease: "power2.out",
          overwrite: "auto",
          scrollTrigger: {
            trigger: element,
            start: "top 86%",
            once: true,
            invalidateOnRefresh: true,
          },
        });
      });

      ScrollTrigger.refresh();
    }, rootRef);

    return () => ctx.revert();
  }, []);

  function handleEmailChange(event) {
    setEmail(event.target.value);
    if (error) {
      setError("");
    }
    if (submitState.type) {
      setSubmitState({ type: "", message: "" });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextEmail = email.trim();

    if (!nextEmail) {
      setError("Enter an email address to join the waitlist.");
      setSubmitState({
        type: "error",
        message: "Please add an email before submitting.",
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nextEmail)) {
      setError("Enter a valid email address.");
      setSubmitState({
        type: "error",
        message: "Please use a valid email address.",
      });
      return;
    }

    setError("");
    setIsSubmitting(true);

    window.setTimeout(() => {
      setIsSubmitting(false);
      setSubmitState({
        type: "success",
        message:
          "You are on the early-access list in this frontend demo. Connect a backend next to store submissions for real.",
      });
      setEmail("");
    }, 650);
  }

  return (
    <div className="site-shell" ref={rootRef}>
      <header className="topbar js-nav">
        <div className="nav-wrap">
          <a className="brandmark" href="#hero">
            <span className="brandmark-orb" aria-hidden="true" />
            <span>{brand.name}</span>
          </a>

          <nav className="desktop-nav" aria-label="Primary">
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <a className="button button-primary button-small" href="#waitlist">
            Join waitlist
          </a>
        </div>
      </header>

      <main>
        <section className="hero section-dark" id="hero">
          <div className="container hero-grid">
            <div className="hero-copy js-hero-copy">
              <span className="eyebrow eyebrow-blue">Hardware wake-up device</span>
              <h1>A bedside alarm that makes waking up real.</h1>
              <p className="hero-lede">
                Wake2Win is a dorm-friendly hardware device that requires a short
                physical challenge before the alarm can shut off. A companion app
                handles setup, schedules, and control without replacing the device.
              </p>

              <div className="hero-actions">
                <a className="button button-primary" href="#waitlist">
                  Get early access
                </a>
                <a className="button button-secondary" href="#hardware">
                  See the system
                </a>
              </div>

              <div className="hero-footnotes">
                <span>Built for dorms, early classes, and mornings that matter.</span>
                <span>The device owns dismissal. The app stays secondary.</span>
              </div>
            </div>

            <div className="hero-visual js-hero-device">
              <div className="hero-hardware">
                <div className="smart-display">
                  <div className="smart-display-screen">
                    <div className="device-top">
                      <span>Wake2Win</span>
                      <span>6:45 AM alarm</span>
                    </div>

                    <div className="hero-device-main">
                      <div className="hero-device-time-block">
                        <p className="screen-label">Dismiss requires interaction</p>
                        <div className="alarm-time">6:45</div>
                        <p className="alarm-caption">Wake up before the sound stops.</p>
                      </div>

                      <div className="hero-device-panel">
                        <span className="metric-label">Challenge mode</span>
                        <strong>Memory sequence</strong>
                        <span>Escalates after failed attempts</span>
                      </div>
                    </div>

                    <div className="device-pad" aria-hidden="true">
                      <span className="device-key device-key-active" />
                      <span className="device-key" />
                      <span className="device-key" />
                      <span className="device-key" />
                    </div>

                    <button className="screen-cta" type="button">
                      Start challenge
                    </button>
                  </div>
                </div>

                <div className="smart-display-dock" aria-hidden="true">
                  <span className="smart-display-support" />
                  <span className="smart-display-base" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-light" id="why">
          <div className="container intro-stack">
            <div className="section-heading js-reveal">
              <span className="eyebrow">Why hardware</span>
              <h2>Morning discipline is a physical problem, not a better notification.</h2>
              <p>
                Wake2Win is built around one idea: students oversleep because standard
                alarms are too easy to dismiss while the user is still half asleep.
              </p>
            </div>

            <div className="pillars-grid">
              {pillars.map((item) => (
                <article className="info-card js-reveal" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-dark" id="hardware">
          <div className="container feature-split">
            <div className="section-heading section-heading-light js-reveal">
              <span className="eyebrow eyebrow-blue">Hardware first</span>
              <h2>The bedside device is the moat, not just the software behind it.</h2>
              <p>
                Wake2Win is designed as a dedicated object for the nightstand. It
                delivers the wake-up event locally, forces real interaction, and keeps
                the dismissal challenge off the phone.
              </p>

              <ul className="feature-list">
                {hardwareFeatures.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="product-panel js-reveal">
              <div className="device-card">
                <div className="device-copy">
                  <span className="metric-label">Designed for dorm rooms</span>
                  <strong>Compact, tactile, and hard to ignore.</strong>
                </div>

                <div className="device-step-grid">
                  {wakeFlow.map((item) => (
                    <article className="timeline-card" key={item.step}>
                      <span className="step-label">{item.step}</span>
                      <strong>{item.title}</strong>
                      <span>{item.body}</span>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-light" id="companion">
          <div className="container modes-layout">
            <div className="modes-copy js-reveal">
              <span className="eyebrow">Companion app</span>
              <h2>Useful before bed. Not responsible in the morning.</h2>
              <p>
                The companion app exists to provision the device, manage schedules, and
                tune wake-up behavior. It supports the system without turning Wake2Win
                back into another alarm app.
              </p>

              <div className="modes-grid">
                {companionFeatures.map((item) => (
                  <article className="mode-card" key={item}>
                    <h3>{item}</h3>
                    <p>
                      Companion functionality that improves setup and control while the
                      hardware remains fully responsible for the wake-up moment.
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div className="pricing-panel js-reveal">
              <div className="phone-frame phone-frame-hero phone-frame-companion">
                <div className="phone-status">
                  <span>11:04</span>
                  <span>Device settings</span>
                </div>

                <div className="analytics-screen">
                  <div className="metric-card">
                    <span className="metric-label">Paired device</span>
                    <strong>Dorm Room A</strong>
                  </div>

                  <div className="chart-card">
                    <span className="metric-label">Weekday alarm</span>
                    <strong className="companion-time">6:45 AM</strong>
                  </div>

                  <div className="timeline-card">
                    <div>
                      <strong>Challenge mode</strong>
                      <span>Memory sequence</span>
                    </div>
                    <div>
                      <strong>Escalation</strong>
                      <span>Sound + light after 2 failed attempts</span>
                    </div>
                    <div>
                      <strong>Connection</strong>
                      <span>Wi-Fi connected</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-dark section-cta" id="waitlist">
          <div className="container cta-layout">
            <div className="section-heading section-heading-light js-reveal">
              <span className="eyebrow eyebrow-blue">Waitlist</span>
              <h2>Join early access for the first Wake2Win hardware run.</h2>
              <p>
                Get updates on prototypes, launch timing, and the first version of the
                device plus companion app.
              </p>
            </div>

            <form className="waitlist-card js-reveal" noValidate onSubmit={handleSubmit}>
              <label className="waitlist-label" htmlFor="email">
                Email address
              </label>
              <input
                className={`waitlist-input ${error ? "waitlist-input-error" : ""}`}
                id="email"
                name="email"
                onChange={handleEmailChange}
                placeholder="you@school.edu"
                type="email"
                value={email}
              />
              {error ? <p className="field-error">{error}</p> : null}

              <button
                className="button button-primary waitlist-button"
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? "Joining..." : "Join waitlist"}
              </button>

              <p className="waitlist-note">
                Frontend demo only. This interaction is ready for a real backend integration
                next.
              </p>

              {submitState.message ? (
                <p className={`submit-message submit-message-${submitState.type}`}>
                  {submitState.message}
                </p>
              ) : null}
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-row">
          <span>{brand.name}</span>
          <span>Physical wake-up discipline for mornings that matter.</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
