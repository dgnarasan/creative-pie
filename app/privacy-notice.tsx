import Link from "next/link";
export function PrivacyNotice() {
  return <aside className="privacy-notice" aria-label="Privacy and cookies">
    <p>No optional tracking. Your project brief stays on your device until you choose to send it.</p>
    <Link href="/privacy">Privacy &amp; cookies</Link>
  </aside>;
}
