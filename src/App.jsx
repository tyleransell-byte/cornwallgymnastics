import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TrialDialog from "./components/TrialDialog";
import { benefits, classes } from "./config";

export default function App() {
  const [trialOpen, setTrialOpen] = useState(false);

  return (
    <>
      <Header onTrial={() => setTrialOpen(true)} />

      <main id="top">
        <section className="hero">
          <div className="wrap">
            <p className="eyebrow">
              Gymnastics in Wadebridge, Cornwall
            </p>

            <h1>
              Big dreams
              <br />
              <span>start here.</span>
            </h1>

            <p className="lede">
              Weekly gymnastics classes for children of all ages,
              taught by experienced coaches in a friendly and
              supportive centre.
            </p>

            <div className="actions">
              <button
                className="btn"
                type="button"
                onClick={() => setTrialOpen(true)}
              >
                Book a trial
              </button>

              <a className="btn outline" href="/timetable.html">
                See the timetable
              </a>
            </div>
          </div>
        </section>

        <section className="section wrap" id="classes">
          <div className="section-head">
            <p className="eyebrow">Our classes</p>

            <h2>A place for every gymnast.</h2>

            <p className="muted">
              From first steps through to advanced squad training,
              children learn safely and build confidence at their own
              pace.
            </p>
          </div>

          <div className="cards">
            {classes.map((item) => (
              <article
                className={`card ${item.tone}`}
                key={item.title}
              >
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <a href="/timetable.html">
                  View timetable →
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="section benefits">
          <div className="wrap">
            <p className="eyebrow">Why gymnastics</p>

            <h2>More than cartwheels.</h2>

            <div className="benefit-grid">
              {benefits.map(([title, text]) => (
                <article key={title}>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section wrap coaching">
          <p className="eyebrow">Our coaching</p>

          <h2>
            Positive coaching that puts the child first.
          </h2>

          <p className="lede">
            Every class is led by experienced coaches who help
            children learn safely, enjoy movement and celebrate
            progress.
          </p>

          <button
            className="btn"
            type="button"
            onClick={() => setTrialOpen(true)}
          >
            Start with a trial
          </button>
        </section>

        <section
          className="section wrap faq"
          id="faq"
        >
          <p className="eyebrow">Questions</p>

          <h2>Frequently asked questions.</h2>

          <details>
            <summary>Can we try a class first?</summary>
            <p>
              Yes. Use the Book a trial button and our team will
              be in touch.
            </p>
          </details>

          <details>
            <summary>What should my child wear?</summary>
            <p>
              Comfortable clothes they can stretch in, with no
              zips or buttons. Gymnastics is done barefoot and
              long hair should be tied back.
            </p>
          </details>

          <details>
            <summary>How do I see class times?</summary>
            <p>
              Open the timetable to see the available days and
              sessions.
            </p>
          </details>
        </section>
      </main>

      <Footer />

      <TrialDialog
        open={trialOpen}
        onClose={() => setTrialOpen(false)}
      />
    </>
  );
}