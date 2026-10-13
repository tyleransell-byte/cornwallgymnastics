import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const startHereGuide = `
<section id="start-here" aria-labelledby="start-here-heading" style="padding:54px 20px;background:#fff8f3;color:#26323b">
  <div style="max-width:1100px;margin:auto">
    <div class="eyebrow">Parent Portal guide</div>
    <h2 id="start-here-heading" style="font-size:clamp(2rem,4vw,3rem);margin:12px 0 14px">New to CGC online? Start here!</h2>
    <p style="max-width:700px;line-height:1.7">Follow these five simple steps to get started with online class bookings.</p>
    <ol style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;list-style:none;padding:0;margin:28px 0">
      <li style="padding:22px;border-radius:16px;background:white;border:1px solid #f0d9d0"><h3>1. Create your account</h3><p>Sign up for the Parent Portal and confirm your email.</p></li>
      <li style="padding:22px;border-radius:16px;background:white;border:1px solid #f0d9d0"><h3>2. Add your child</h3><p>Enter your child's details before making a booking.</p></li>
      <li style="padding:22px;border-radius:16px;background:white;border:1px solid #f0d9d0"><h3>3. Find a class</h3><p>Explore the timetable and choose the class that suits your family.</p></li>
      <li style="padding:22px;border-radius:16px;background:white;border:1px solid #f0d9d0"><h3>4. Follow booking instructions</h3><p>Review your selection and complete the booking steps shown on screen.</p></li>
      <li style="padding:22px;border-radius:16px;background:white;border:1px solid #f0d9d0"><h3>5. Manage your bookings</h3><p>Use your Parent Portal to view and manage your child's classes.</p></li>
    </ol>
    <a class="button" href="/parent-portal.html">Open the Parent Portal →</a>
  </div>
</section>`;


const cgcPrices = new Map([
  ["Stay and Play", "£6.50 per session"],
  ["Adult Child Structured", "£7.50 per session"],
  ["Home Education", "£10.00 per session"],
  ["Recreational Gymnastics (ages 4–7)", "£57.00 per month"],
  ["Recreational Gymnastics (ages 6–8)", "£35.00 per month"],
  ["Recreational Gymnastics (ages 6–12)", "£35.00 per month"],
  ["Recreational Gymnastics (ages 7–12)", "£35.00 per month"],
  ["Recreational Plus", "£57.50 per month"],
  ["Development WAG", "£105.00 per month"],
  ["Novice WAG Junior", "£105.00 per month"],
  ["Novice WAG Senior", "£105.00 per month"],
  ["WAG 1", "£160.00 per month"],
  ["WAG 2", "£160.00 per month"]
]);

function applyCgcPrices(html) {
  // Update only the timetable row's visible price, leaving class times,
  // session controls, booking identifiers and event handlers unchanged.
  let updated = 0;
  const result = html.replace(/(<li><div><b>([^<]+)<\/b><span>)([^<]*)(<\/span>)/g,
    (whole, prefix, className, details, suffix) => {
      const ageMatch = details.match(/Ages?\\s+(4–7|6–8|6–12|7–12)/i);
      const key = className.trim() === "Recreational Gymnastics" && ageMatch
        ? "Recreational Gymnastics (ages " + ageMatch[1] + ")"
        : className.trim();
      const price = cgcPrices.get(key);
      if (!price || !/£10 per session/.test(details)) return whole;
      updated++;
      return prefix + details.replace(/£10 per session/, price) + suffix;
    });
  if (updated < 20) throw new Error("Timetable price update matched too few rows; refusing partial publish.");
  return result.replace(
    /Trial pricing: £10 per session, with no discount for multiple sessions\. Invite-only classes require a coach’s invitation\./,
    "Class fees are shown beside each timetable entry. Some classes are charged per session and others monthly. Invite-only classes require a coach’s invitation. Stripe test checkout amounts have not yet been updated."
  );
}

export default defineConfig({
  plugins: [
    react(),
    {
      name: "cgc-start-here-guide",
      transformIndexHtml(html) {
        html = applyCgcPrices(html);
        if (html.includes('id="start-here"')) return html;
        const anchor = '<section class="classes" id="classes">';
        if (!html.includes(anchor)) {
          throw new Error("Could not locate classes section; homepage was not modified.");
        }
        return html.replace(anchor, startHereGuide + anchor);
      }
    }
  ],
  base: "/",
  build: { outDir: "dist" }
});
