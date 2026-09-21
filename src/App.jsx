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

        {/* HERO */}
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

        {/* CLASSES */}
        <section className="section wrap" id="classes">
          <div className="section-head">
            <p className="eyebrow">Our classes</p>

            <h2>A place for every gymnast.</h2>

            <p className="muted">
              From first steps through to advanced squad training,
              children learn safely and build confidence at their
              own pace.
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

        {/* BENEFITS */}
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

        {/* COACHING */}
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

        {/* FAQ */}
        <section className="section wrap faq" id="faq">
          <p className="eyebrow">Useful information</p>

          <h2>Frequently asked questions.</h2>

          <details>
            <summary>
              Can parents watch their child's gymnastics class?
            </summary>

            <p>
              Unfortunately, we are unable to allow anyone into
              the gym after their class start time.
            </p>

            <p>
              There is a 10-minute viewing window before your
              child's class starts so you can ensure they are
              on time.
            </p>

            <p>
              This is for the health and safety of your child
              and all participants in our care.
            </p>
          </details>

          <details>
            <summary>
              What happens if my child misses a class?
            </summary>

            <p>
              We understand that children sometimes have to
              miss a session due to illness or lateness.
            </p>

            <p>
              We allow one catch-up session per month for anyone
              who misses a class due to illness or lateness.
            </p>
          </details>

          <details>
            <summary>
              Where do I wait while my child is in their class?
            </summary>

            <p>
              Please wait with your child in the waiting area
              until a coach collects them for their session.
            </p>

            <p>
              You are welcome to wait in the waiting area and
              watch the session on the TV.
            </p>
          </details>

          <details>
            <summary>Where should I park?</summary>

            <p>
              Please park in the designated spaces outside
              the gym.
            </p>

            <p>
              If the car park is full, please park on the road
              further up the industrial estate.
            </p>

            <p>
              Please do not park between the gates or along
              the barrier by Precise Spark.
            </p>
          </details>

          <details>
            <summary>
              Is smoking or vaping allowed in the car park?
            </summary>

            <p>
              No. Smoking and vaping are not permitted in
              the car park.
            </p>
          </details>

          <details>
            <summary>
              Who should I contact if I have a welfare concern?
            </summary>

            <p>
              We hope your child has a happy and enjoyable
              experience at CGC. If you ever have any concerns,
              please contact our Welfare Officers.
            </p>

            <p>
              Email:{" "}
              <a href="mailto:welfare@cornwallgymnasticscentre.com">
                welfare@cornwallgymnasticscentre.com
              </a>
            </p>
          </details>

          <details>
            <summary>
              How do gymnastics class payments work?
            </summary>

            <p>
              We charge for 46 weeks of the year, divided into
              12 equal monthly payments.
            </p>

            <p>
              We close for two weeks over Christmas, two weeks
              at Easter and two weeks during the summer.
            </p>

            <p>
              We are open as normal on bank holidays.
            </p>
          </details>

          <details>
            <summary>What is the cancellation policy?</summary>

            <p>
              If you wish to leave CGC, we require one month's
              paid notice.
            </p>

            <p>
              Your child is welcome to continue attending their
              classes during their notice period.
            </p>
          </details>

          <details>
            <summary>
              Who can I contact at Cornwall Gymnastics Centre?
            </summary>

            <p>
              <strong>Vanessa Mitchell</strong>
              <br />
              Head Coach &amp; Owner
              <br />
              <a href="mailto:vanessa@cornwallgymnasticscentre.com">
                vanessa@cornwallgymnasticscentre.com
              </a>
            </p>

            <p>
              <strong>Ashleigh Mitchell</strong>
              <br />
              Head of Development &amp; Owner
              <br />
              <a href="mailto:ashleigh@cornwallgymnasticscentre.com">
                ashleigh@cornwallgymnasticscentre.com
              </a>
            </p>

            <p>
              <strong>General Admin</strong>
              <br />
              <a href="mailto:hello@cornwallgymnasticscentre.com">
                hello@cornwallgymnasticscentre.com
              </a>
              <br />
              <a href="tel:+441208814698">
                01208 814698
              </a>
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