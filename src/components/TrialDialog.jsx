import { useEffect, useRef } from "react";
export default function TrialDialog({ open, onClose }) {
  const dialogRef = useRef(null);
  useEffect(() => { const dialog = dialogRef.current; if (open && dialog && !dialog.open) dialog.showModal(); if (!open && dialog?.open) dialog.close(); }, [open]);
  return <dialog ref={dialogRef} onClose={onClose} aria-labelledby="trial-title">
    <div className="trial-form">
      <h2 id="trial-title">Request a trial</h2>
      <p>Sign in to your Parent Portal, or create an account first, to request a trial session for your child.</p>
      <div className="form-actions"><a className="btn" href="/parent-portal.html?trial=1">Send Trial Request</a><button className="btn outline" type="button" onClick={() => { dialogRef.current?.close(); onClose(); }}>Close</button></div>
    </div>
  </dialog>;
}
