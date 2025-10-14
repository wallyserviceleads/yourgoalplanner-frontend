import Image from "next/image";
import Link from "next/link";

import { FaqAccordion } from "./components/faq-accordion";
import { ReferralForm } from "./components/referral-form";
import { SiteNavigation } from "./components/site-navigation";

const navigationLinks = [
  { href: "#features", label: "Features" },
  { href: "#workflow", label: "Workflow" },
  { href: "#pricing", label: "Pricing" },
  { href: "#testimonials", label: "Stories" },
  { href: "#faq", label: "FAQ" },
];

const featureCards = [
  {
    icon: "/assets/icon-target.svg",
    title: "Goals that guide every day",
    description:
      "Capture annual revenue ambitions and break them into rituals that keep your whole team focused on the work that matters.",
  },
  {
    icon: "/assets/icon-fire.svg",
    title: "Momentum you can feel",
    description:
      "See leading indicators across teams, celebrate wins in real time, and spot when the pace starts to drift off course.",
  },
  {
    icon: "/assets/icon-chart.svg",
    title: "Insights with clear next steps",
    description:
      "Connect billing, CRM, and product data to surface at-risk revenue, confident forecasts, and coachable moments in one place.",
  },
];

const workflowSteps = [
  {
    title: "Design your ideal revenue ritual",
    copy:
      "Set the cadence for your goal reviews, assign owners, and build a ritual that keeps everyone aligned around outcomes instead of busywork.",
  },
  {
    title: "Prioritise the week with intention",
    copy:
      "Kick off each week with a shared focus view that aligns sprints, customer conversations, and experiments to the revenue plan.",
  },
  {
    title: "Celebrate progress automatically",
    copy:
      "Automated recaps recognise wins, highlight learnings, and suggest the next best move so the team keeps moving with momentum.",
  },
];

const pricingPlans = [
  {
    name: "Starter",
    price: "$29",
    term: "per seat / month",
    description: "Goal rituals, dashboards, and weekly momentum digests for small teams setting their first revenue rhythm.",
    link: "#",
  },
  {
    name: "Growth",
    price: "$79",
    term: "per seat / month",
    description:
      "Connect billing data, automate alerts, and unlock advanced forecasting for teams scaling past product-market fit.",
    link: "#",
  },
  {
    name: "Leadership",
    price: "Let’s chat",
    term: "custom pricing",
    description:
      "Strategic support, executive dashboards, and revops alignment for revenue organisations ready for the next stage.",
    link: "#",
  },
];

const testimonials = [
  {
    quote:
      "We finally have a shared rhythm between marketing, success, and product. Our revenue reviews feel human again, and we ship faster because we know why each commitment matters.",
    name: "Priya Desai",
    role: "COO, Northwind Solar",
  },
  {
    quote:
      "YourGoalPlanner turned our scattered rituals into a single practice. Forecast accuracy is up 18% and morale is night-and-day from last year.",
    name: "Lena Martinez",
    role: "Head of Revenue, Acme Analytics",
  },
];

const faqs = [
  {
    question: "How quickly can my team get started?",
    answer:
      "Most teams launch their first revenue ritual in under a week. Start with our guided template, invite your teammates, and connect billing or CRM data when you’re ready.",
  },
  {
    question: "Does YourGoalPlanner replace my project or CRM tools?",
    answer:
      "No. We integrate with the tools you already love and bring the highlights into a single revenue ritual. Think of us as the connective tissue between strategy and daily execution.",
  },
  {
    question: "Can I try the platform before committing?",
    answer:
      "Absolutely. Every plan begins with a 30-day free trial and a guided kickoff. You can cancel anytime with a single click from your account settings.",
  },
];

export default function Home() {
  return (
    <div className="site">
      <header className="site-header">
        <div className="container header-container">
          <Link href="#hero" className="brand">
            <Image
              src="/assets/logo.svg"
              alt="YourGoalPlanner"
              width={160}
              height={40}
              className="brand__logo"
              priority
            />
             <span className="brand__text">YourGoalPlanner</span>
          </Link>
          <SiteNavigation links={navigationLinks} />
          <Link href="#pricing" className="button button--ghost">
            Start free trial
          </Link>
        </div>
      </header>

      <main>
        <section className="section hero" id="hero">
          <div className="container hero__content">
            <div className="hero__text">
              <p className="eyebrow">Goal-first revenue planning</p>
              <h1>Bring clarity, focus, and celebration to every growth goal.</h1>
              <p className="lead">
                YourGoalPlanner gives subscription teams a shared ritual for turning
                ambitious revenue plans into confident weekly action.
              </p>
              <div className="hero__actions">
                <Link href="#pricing" className="button button--primary">
                  Start my 30-day trial
                </Link>
                <Link href="#workflow" className="button button--secondary">
                  Explore the workflow
                </Link>
              </div>
              <p className="hero__note">
                No credit card required. Invite your whole team and keep what you build.
              </p>
            </div>
            <div className="hero__visual">
              <Image
                src="/assets/hero-card.svg"
                alt="Goal progress dashboard"
                width={320}
                height={220}
                priority
              />
            </div>
          </div>
        </section>

        <section className="section" id="features">
          <div className="container">
            <div className="section__header">
              <p className="eyebrow">What’s inside</p>
              <h2>Purpose-built for recurring revenue teams</h2>
              <p className="section__subhead">
                Streamline planning, prioritise the work that matters, and keep your
                revenue rituals energised week after week.
              </p>
            </div>
            <div className="grid grid--three">
              {featureCards.map((feature) => (
                <article className="card feature-card" key={feature.title}>
                  <Image
                    src={feature.icon}
                    alt=""
                    width={48}
                    height={48}
                    className="card__icon"
                    aria-hidden="true"
                  />
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="workflow">
          <div className="container">
            <div className="section__header">
              <p className="eyebrow">How it works</p>
              <h2>Build a rhythm your team can rally around</h2>
            </div>
            <ol className="step-list">
              {workflowSteps.map((step, index) => (
                <li className="step" key={step.title}>
                  <span className="step__number">0{index + 1}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.copy}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section" id="pricing">
          <div className="container">
            <div className="section__header">
              <p className="eyebrow">Simple pricing</p>
              <h2>Plans that grow with your revenue ambition</h2>
            </div>
            <div className="grid grid--three pricing-grid">
              {pricingPlans.map((plan) => (
                <article key={plan.name} className="card pricing-card">
                  <h3>{plan.name}</h3>
                  <p className="pricing-card__price">
                    {plan.price}
                    <span className="pricing-card__term">{plan.term}</span>
                  </p>
                  <p className="pricing-card__alt">{plan.description}</p>
                  <Link href={plan.link} className="button button--secondary">
                    Talk to sales
                  </Link>
                </article>
              ))}
            </div>
            <p className="pricing__note">
              Annual billing saves 15%. Every plan starts with a guided onboarding.
            </p>
          </div>
        </section>

        <section className="section" id="testimonials">
          <div className="container">
            <div className="section__header">
              <p className="eyebrow">Teams in motion</p>
              <h2>Revenue leaders who trust YourGoalPlanner</h2>
            </div>
            <div className="grid">
              {testimonials.map((testimonial) => (
                <figure className="card testimonial-card" key={testimonial.name}>
                  <blockquote>“{testimonial.quote}”</blockquote>
                  <figcaption>
                    <strong>{testimonial.name}</strong>
                    <br />
                    {testimonial.role}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="referrals">
          <div className="container">
            <div className="section__header">
              <p className="eyebrow">Grow together</p>
              <h2>Invite a teammate, both earn a free month</h2>
              <p className="section__subhead">
                Share a referral code with a collaborator. When they subscribe, you both
                unlock an additional month of YourGoalPlanner at no extra cost.
              </p>
            </div>
            <ReferralForm />
          </div>
        </section>

        <section className="section" id="faq">
          <div className="container">
            <div className="section__header">
              <p className="eyebrow">FAQ</p>
              <h2>Answers for curious revenue leaders</h2>
            </div>
            <FaqAccordion items={faqs} />
          </div>
        </section>
      </main>
    
       <footer className="section site-footer">
        <div className="container footer__content">
          <div>
            <Link href="#hero" className="brand">
              <Image
                src="/assets/logo.svg"
                alt="YourGoalPlanner"
                width={160}
                height={40}
                className="brand__logo"
              />
              <span className="brand__text">YourGoalPlanner</span>
            </Link>
            <p className="section__subhead">
              YourGoalPlanner helps subscription businesses design meaningful rituals,
              deliver reliable forecasts, and celebrate progress together.
            </p>
            <ul className="footer__links">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
              <li>
                <Link href="mailto:wally@serviceleads.ai">Contact</Link>
              </li>
            </ul>
            <p className="footer__copy">© {new Date().getFullYear()} YourGoalPlanner</p>
          </div>
          <form className="contact-form">
            <h3>Request a strategy session</h3>
            <div className="form-field">
              <label htmlFor="contact-name">Name</label>
              <input id="contact-name" name="name" type="text" placeholder="Alex Morgan" />
            </div>
            <div className="form-field">
              <label htmlFor="contact-email">Work email</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                placeholder="alex@company.com"
              />
            </div>
            <div className="form-field">
              <label htmlFor="contact-message">How can we help?</label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                placeholder="Share a bit about your revenue goals."
              />
            </div>
            <button className="button button--primary" type="submit">
              Schedule my call
            </button>
          </form>
        </div>
        <p className="cookie-note">
          We use essential cookies to power secure logins and improve your experience.
          Read our <Link href="#">privacy policy</Link>.
        </p>
      </footer>
    </div>
  );
}
