export default function Header({ onTrial }) {
  return (
    <header className="site-header">
      <div className="wrap nav">
        <a
          className="brand"
          href="#top"
          aria-label="Cornwall Gymnastics Centre home"
        >
          <img
            className="brand-logo"
            src="/cgg-logo.png"
            alt="Cornwall Gymnastics Centre"
          />
        </a>

        <nav className="nav-links" aria-label="Main navigation">
          <a href="#classes">Classes</a>
          <a href="/timetable.html">Timetable</a>
          <a href="#faq">FAQ</a>

          <button
            className="trial"
            type="button"
            onClick={onTrial}
          >
            Book a trial
          </button>
        </nav>
      </div>
    </header>
  );
}