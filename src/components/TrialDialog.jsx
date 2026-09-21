import { useEffect, useRef, useState } from "react";
import { CONTACT_EMAIL, TRIAL_FUNCTION_URL } from "../config";

const emptyForm = { childName: "", dateOfBirth: "", parentEmail: "", parentPhone: "", interested: false };

export default function TrialDialog({ open, onClose }) {
  const dialogRef = useRef(null);
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (open && dialog && !dialog.open) dialog.showModal();
    if (!open && dialog?.open) dialog.close();
  }, [open]);

  function close() {
    dialogRef.current?.close();
    onClose();
  }

  function update(event) {
    const { name, value, checked, type } = event.target;
    setForm(current => ({ ...current, [name]: type === "checkbox" ? checked : value }));
  }

  async function submit(event) {
    event.preventDefault();
    setMessage(""); setError(false);
    if (!form.childName.trim()) return fail("Enter your child’s full name.");
    if (!form.dateOfBirth || new Date(`${form.dateOfBirth}T00:00:00`) > new Date()) return fail("Enter a valid date of birth.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.parentEmail)) return fail("Enter a valid parent email address.");
    if (form.parentPhone.replace(/\D/g, "").length < 10) return fail("Enter a phone number with at least 10 digits.");
    if (!form.interested) return fail("Please confirm that your child is interested in a trial session.");
    setSending(true); setMessage("Sending…");
    try {
      const response = await fetch(TRIAL_FUNCTION_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ child_name: form.childName.trim(), child_date_of_birth: form.dateOfBirth, parent_email: form.parentEmail.trim(), parent_phone: form.parentPhone.trim(), interested_in_trial: form.interested })
      });
      if (!response.ok) throw new Error("Request failed");
      setForm(emptyForm);
      setMessage("Thanks — we’ve received your enquiry. Please allow up to 3 working days for a reply.");
    } catch {
      fail(`Sorry, that didn’t send. Please email ${CONTACT_EMAIL} instead.`);
    } finally { setSending(false); }
  }

  function fail(text) { setError(true); setMessage(text); }

  return (
    <dialog ref={dialogRef} onClose={onClose} aria-labelledby="trial-title">
      <form onSubmit={submit} className="trial-form" noValidate>
        <h2 id="trial-title">Book a trial</h2>
        <p className="muted">Tell us about your child and we’ll be in touch.</p>
        <label>Child’s full name<input name="childName" value={form.childName} onChange={update} required /></label>
        <label>Child’s date of birth<input name="dateOfBirth" type="date" max={new Date().toISOString().slice(0, 10)} value={form.dateOfBirth} onChange={update} required /></label>
        <label>Parent’s email address<input name="parentEmail" type="email" autoComplete="email" value={form.parentEmail} onChange={update} required /></label>
        <label>Parent’s phone number<input name="parentPhone" type="tel" autoComplete="tel" value={form.parentPhone} onChange={update} required /></label>
        <label className="checkbox"><input name="interested" type="checkbox" checked={form.interested} onChange={update} /><span>My child is interested in a trial session.</span></label>
        <p className="privacy">We’ll use these details only to respond to your trial enquiry.</p>
        <p className={error ? "form-message error" : "form-message"} role="alert">{message}</p>
        <div className="form-actions"><button className="btn" disabled={sending}>Send request</button><button className="btn outline" type="button" onClick={close}>Close</button></div>
      </form>
    </dialog>
  );
}
