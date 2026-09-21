const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const CLUB_EMAIL = "hello@cornwallgymnastics.uk";
const FROM_EMAIL = "Cornwall Gymnastics <enquiries@cornwallgymnastics.uk>";
const ALLOWED_ORIGINS = new Set([
  "https://www.cornwallgymnastics.uk",
  "https://cornwallgymnastics.uk",
]);

function corsHeaders(origin: string | null) {
  const allowed = origin && ALLOWED_ORIGINS.has(origin) ? origin : "https://www.cornwallgymnastics.uk";
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Headers": "content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
  };
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[character]!);
}

async function sendEmail(payload: Record<string, unknown>) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    console.error("Resend error", response.status, await response.text());
    throw new Error("Email delivery failed");
  }
}

Deno.serve(async (request) => {
  const origin = request.headers.get("origin");
  const headers = { ...corsHeaders(origin), "Content-Type": "application/json" };

  if (request.method === "OPTIONS") return new Response("ok", { headers });
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers });
  }
  if (!origin || !ALLOWED_ORIGINS.has(origin)) {
    return new Response(JSON.stringify({ error: "Origin not allowed" }), { status: 403, headers });
  }
  if (!RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not configured");
    return new Response(JSON.stringify({ error: "Email service unavailable" }), { status: 500, headers });
  }

  try {
    const body = await request.json();
    const childName = String(body.child_name ?? "").trim();
    const dateOfBirth = String(body.child_date_of_birth ?? "").trim();
    const parentEmail = String(body.parent_email ?? "").trim().toLowerCase();
    const parentPhone = String(body.parent_phone ?? "").trim();
    const interested = body.interested_in_trial === true;

    if (childName.length < 2 || childName.length > 100) throw new Error("Invalid child name");
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateOfBirth) || new Date(dateOfBirth + "T00:00:00") > new Date()) {
      throw new Error("Invalid date of birth");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(parentEmail) || parentEmail.length > 254) {
      throw new Error("Invalid email");
    }
    if (parentPhone.replace(/\D/g, "").length < 10 || parentPhone.length > 40) {
      throw new Error("Invalid phone");
    }
    if (!interested) throw new Error("Trial interest not confirmed");

    const safeName = escapeHtml(childName);
    const safeDob = escapeHtml(dateOfBirth);
    const safeEmail = escapeHtml(parentEmail);
    const safePhone = escapeHtml(parentPhone);

    await sendEmail({
      from: FROM_EMAIL,
      to: [CLUB_EMAIL],
      reply_to: parentEmail,
      subject: `New trial-session enquiry: ${childName}`,
      html: `<div style="font-family:Arial,sans-serif;max-width:620px;margin:auto;color:#1f1a17">
        <div style="background:#f46c2d;color:white;padding:24px;border-radius:18px 18px 0 0">
          <h1 style="margin:0;font-size:24px">New trial-session enquiry</h1>
        </div>
        <div style="padding:24px;border:1px solid #eadfd3;border-top:0;border-radius:0 0 18px 18px">
          <p><strong>Child’s full name:</strong> ${safeName}</p>
          <p><strong>Child’s date of birth:</strong> ${safeDob}</p>
          <p><strong>Parent’s email:</strong> ${safeEmail}</p>
          <p><strong>Parent’s phone:</strong> ${safePhone}</p>
          <p><strong>Interested in a trial session:</strong> Yes</p>
        </div>
      </div>`,
    });

    await sendEmail({
      from: FROM_EMAIL,
      to: [parentEmail],
      reply_to: CLUB_EMAIL,
      subject: "We’ve received your Cornwall Gymnastics enquiry",
      html: `<div style="font-family:Arial,sans-serif;max-width:620px;margin:auto;color:#1f1a17;background:#fffdf8">
        <div style="background:#f46c2d;color:white;padding:28px;border-radius:22px 22px 0 0">
          <p style="margin:0 0 6px;font-size:14px;letter-spacing:1px;text-transform:uppercase">Cornwall Gymnastics Centre</p>
          <h1 style="margin:0;font-size:28px">Thanks for your enquiry! 🤸</h1>
        </div>
        <div style="padding:28px;border:1px solid #eadfd3;border-top:0;border-radius:0 0 22px 22px">
          <p>We’ve received your request for a trial session.</p>
          <p>While our team works through the requests, please allow us up to <strong>3 working days</strong> to respond to your email.</p>
          <p>We look forward to speaking with you soon.</p>
          <p style="margin-top:28px"><strong>Cornwall Gymnastics Centre</strong><br>
          Units 2 and 3 Knights Business Centre<br>Wadebridge, Cornwall PL27 6HB</p>
        </div>
      </div>`,
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid request";
    const isValidation = message.startsWith("Invalid") || message.includes("confirmed");
    if (!isValidation) console.error(error);
    return new Response(JSON.stringify({ error: isValidation ? message : "Unable to send enquiry" }), {
      status: isValidation ? 400 : 500,
      headers,
    });
  }
});
