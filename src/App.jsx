import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const brand = {
  name: "Wake To Win",
};

const navItems = [
  { label: "Why", href: "#why" },
  { label: "Product", href: "#product" },
  { label: "Modes", href: "#modes" },
  { label: "Waitlist", href: "#waitlist" },
];

const pillars = [
  {
    title: "Passive alarms fail.",
    body: "Most alarms can be silenced while you are still half asleep. The sound stops, but the morning never starts.",
  },
  {
    title: "Wake-up friction matters.",
    body: "Wake To Win adds short cognitive effort at exactly the moment users usually snooze, swipe, and disappear back into bed.",
  },
  {
    title: "The goal is action.",
    body: "This is not a sleep-tracking dashboard. It is a wake-up habit app designed to get students and young professionals moving.",
  },
];

const featureList = [
  "Word puzzle wake-up challenge",
  "Quick math and memory modes",
  "Escalating anti-snooze difficulty",
  "Morning streaks and wake-up history",
];

const challengeModes = [
  {
    name: "Word",
    detail: "The most demo-friendly mode. Solve a short word puzzle before the alarm dismisses.",
  },
  {
    name: "Math",
    detail: "Fast arithmetic for users who need a sharper mental jolt than a swipe gesture.",
  },
  {
    name: "Memory",
    detail: "Repeat a short sequence correctly to prove you are actually awake and attentive.",
  },
  {
    name: "Logic",
    detail: "Answer a simple prompt that forces deliberate thought before the sound stops.",
  },
];

const premiumItems = [
  "Multiple challenge modes",
  "Difficulty tuning for heavy snoozers",
  "Wake-up analytics and streak history",
  "Custom morning routines after dismissal",
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
              <span className="eyebrow eyebrow-blue">Wake-up habit app</span>
              <h1>Stop silencing your alarm half asleep.</h1>
              <p className="hero-lede">
                Wake To Win helps students and young professionals stop oversleeping by
                requiring short cognitive wake-up challenges before the alarm can be
                dismissed.
              </p>

              <div className="hero-actions">
                <a className="button button-primary" href="#waitlist">
                  Get early access
                </a>
                <a className="button button-secondary" href="#product">
                  See how it works
                </a>
              </div>

              <div className="hero-footnotes">
                <span>Built for early classes, early shifts, and mornings that matter.</span>
                <span>Word puzzles are the hook. Active wake-up behavior is the product.</span>
              </div>
            </div>

            <div className="hero-visual js-hero-device">
              <div className="phone-frame phone-frame-hero">
                <div className="phone-status">
                  <span>6:45</span>
                  <span>Challenge alarm</span>
                </div>

                <div className="hero-screen">
                  <p className="screen-label">Dismiss requires a challenge</p>
                  <div className="alarm-time">6:45</div>
                  <p className="alarm-caption">Wake up enough to act.</p>

                  <div className="word-grid" aria-hidden="true">
                    <span>W</span>
                    <span>A</span>
                    <span>K</span>
                    <span>E</span>
                    <span className="word-grid-muted">_</span>
                  </div>

                  <div className="screen-card">
                    <div>
                      <strong>Current mode</strong>
                      <span>Word challenge</span>
                    </div>
                    <div>
                      <strong>Failsafe</strong>
                      <span>Escalate after 2 snoozes</span>
                    </div>
                  </div>

                  <button className="screen-cta" type="button">
                    Start challenge
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-light" id="why">
          <div className="container intro-stack">
            <div className="section-heading js-reveal">
              <span className="eyebrow">Why it matters</span>
              <h2>Alarms are everywhere. Real wake-up behavior is not.</h2>
              <p>
                The problem is not that people forget to set alarms. The problem is that
                most alarms are too easy to dismiss while the user is still cognitively
                offline.
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

        <section className="section-dark" id="product">
          <div className="container feature-split">
            <div className="section-heading section-heading-light js-reveal">
              <span className="eyebrow eyebrow-blue">Product</span>
              <h2>Wake-up friction that works before your day falls apart.</h2>
              <p>
                Wake To Win turns alarm dismissal into active engagement. Instead of a
                passive swipe, the user has to complete a short challenge that proves they
                are awake enough to move.
              </p>

              <ul className="feature-list">
                {featureList.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="product-panel js-reveal">
              <div className="phone-frame phone-frame-midnight">
                <div className="phone-status">
                  <span>7:10</span>
                  <span>Morning progress</span>
                </div>

                <div className="analytics-screen">
                  <div className="metric-card">
                    <span className="metric-label">On-time streak</span>
                    <strong>12 mornings</strong>
                  </div>

                  <div className="chart-card">
                    <span className="metric-label">Wake-up trend</span>
                    <div className="chart-bars" aria-hidden="true">
                      <span />
                      <span />
                      <span className="chart-bars-active" />
                      <span />
                      <span />
                    </div>
                  </div>

                  <div className="timeline-card">
                    <div>
                      <strong>6:45 alarm</strong>
                      <span>Dismissed after 38 seconds</span>
                    </div>
                    <div>
                      <strong>Routine</strong>
                      <span>Water, light, movement</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-light" id="modes">
          <div className="container modes-layout">
            <div className="modes-copy js-reveal">
              <span className="eyebrow">Challenge system</span>
              <h2>One memorable hook. A broader system behind it.</h2>
              <p>
                The first impression is a Wordle-style challenge. The real product is a
                flexible wake-up challenge system that can adapt to different users and
                different levels of resistance.
              </p>

              <div className="modes-grid">
                {challengeModes.map((mode) => (
                  <article className="mode-card" key={mode.name}>
                    <h3>{mode.name}</h3>
                    <p>{mode.detail}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="pricing-panel js-reveal">
              <div className="pricing-card">
                <span className="eyebrow eyebrow-blue">Freemium structure</span>
                <h3>Start free. Upgrade when mornings are expensive.</h3>
                <p>
                  The free version gets users into the habit. Premium adds more challenge
                  depth, more control, and better wake-up visibility.
                </p>

                <div className="tier-row">
                  <div className="tier-block">
                    <span className="tier-label">Free</span>
                    <strong>Alarm + one challenge mode</strong>
                  </div>
                  <div className="tier-block">
                    <span className="tier-label">Premium</span>
                    <strong>Customization, analytics, stricter anti-snooze</strong>
                  </div>
                </div>

                <ul className="premium-list">
                  {premiumItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="section-dark section-cta" id="waitlist">
          <div className="container cta-layout">
            <div className="section-heading section-heading-light js-reveal">
              <span className="eyebrow eyebrow-blue">Waitlist</span>
              <h2>Get early access before your next bad morning gets there first.</h2>
              <p>
                Join the early list for product updates, beta invites, and the first build
                of Wake To Win.
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

              <button className="button button-primary waitlist-button" disabled={isSubmitting} type="submit">
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
          <span>Wake up enough to act.</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
