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

export default defineConfig({
  plugins: [
    react(),
    {
      name: "cgc-start-here-guide",
      transformIndexHtml(html) {
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
