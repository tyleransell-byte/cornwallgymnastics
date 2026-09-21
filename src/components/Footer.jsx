import { CONTACT_EMAIL } from "../config";

export default function Footer() {
  return (
    <footer>
      <div className="wrap footer-grid">

        <div className="footer-section">
          <strong>Cornwall Gymnastics Centre</strong>
          <br />
          Units 2 and 3 Knights Business Centre
          <br />
          Palmers Way, Trenant Industrial Estate
          <br />
          Wadebridge, Cornwall PL27 6HB
        </div>

        <div className="footer-section">
          <strong>Contact</strong>
          <br />
          Open Monday to Saturday
          <br />
          <a href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
        </div>

        <div className="footer-section">
          <strong>Policies</strong>
          <br />
          <a href="/participants-code-of-conduct.html">
            Participants Code of Conduct
          </a>
        </div>

        <div className="legal">
          Cornwall Gymnastics Centre is a Community Interest Company (CIC).
          Company number 11984901.
        </div>

      </div>
    </footer>
  );
}