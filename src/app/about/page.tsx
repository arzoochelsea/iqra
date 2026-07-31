import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About IQRA and its calm, respectful approach to Qur’an learning.",
};

const purposes = [
  ["Read with clarity", "Access the Qur’an in a clean and distraction-free reading experience."],
  ["Listen with attention", "Follow authentic recitation and engage more carefully with every ayah."],
  ["Reflect with understanding", "Explore meaning and return regularly through structured personal learning."],
];

const principles = [
  "Respect for the Qur’an",
  "Clearly identified sources",
  "Calm and accessible design",
  "Continuous learning and improvement",
];

export default function AboutPage() {
  return (
    <article className="about-page shell">
      <header className="about-hero">
        <div className="about-hero-copy">
          <p className="eyebrow">Where every journey begins</p>
          <h1>About IQRA</h1>
          <p className="about-intro">IQRA is a calm Qur’an learning companion designed to help people read, listen, understand, and reflect with greater clarity.</p>
        </div>
        <blockquote className="about-quote">
          <p>“Read in the name of your Lord who created.”</p>
          <cite>Qur’an 96:1</cite>
        </blockquote>
      </header>

      <section className="about-section about-story" aria-labelledby="why-iqra-title">
        <div className="about-heading">
          <p className="eyebrow">The first divine call</p>
          <h2 id="why-iqra-title">Why IQRA?</h2>
        </div>
        <div className="about-copy">
          <p>“Iqra” means “read” or “recite.” It was the first command revealed to Prophet Muhammad ﷺ and the opening call of the final revelation.</p>
          <p>The command was greater than simply reading written words. It was an invitation to seek knowledge, reflect on creation, recognise the Creator, and approach understanding with humility.</p>
          <p>IQRA takes its name from that beginning. The app is intended to provide a focused space where users can read the Qur’an, listen to recitation, explore meaning, and build a steady relationship with Allah’s Word.</p>
        </div>
      </section>

      <section className="about-section" aria-labelledby="purpose-title">
        <div className="about-heading">
          <h2 id="purpose-title">Our Purpose</h2>
        </div>
        <div className="purpose-grid">
          {purposes.map(([title, description], index) => (
            <article className="purpose-card" key={title}>
              <span aria-hidden="true">0{index + 1}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section about-panel" aria-labelledby="created-title">
        <div className="about-heading">
          <h2 id="created-title">Created with purpose</h2>
        </div>
        <div className="about-copy">
          <p>IQRA was created by Arzoo as a personal effort to make Qur’an reading, listening, understanding, and reflection feel more accessible and consistent.</p>
          <p>The aim is not to replace qualified Islamic scholarship. IQRA is a learning companion that brings trusted material into a clear, respectful, and focused experience.</p>
        </div>
      </section>

      <section className="about-section" aria-labelledby="principles-title">
        <div className="about-heading">
          <h2 id="principles-title">What guides IQRA</h2>
        </div>
        <ul className="principles-grid">
          {principles.map((principle) => <li key={principle}>{principle}</li>)}
        </ul>
      </section>

      <section className="about-source-note" aria-labelledby="sources-title">
        <h2 id="sources-title">A note on sources</h2>
        <p>IQRA aims to identify the sources used for Qur’anic text, translation, recitation, and supporting material wherever available. Users should consult qualified scholars for detailed religious rulings or interpretation.</p>
      </section>
    </article>
  );
}
