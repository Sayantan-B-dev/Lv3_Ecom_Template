import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container" style={{ paddingTop: "3rem" }}>
      <div className="empty-state">
        <h1>Page not found</h1>
        <p>The page you requested does not exist in this demo storefront.</p>
        <Link href="/" className="btn btn-primary">Back home</Link>
      </div>
    </div>
  );
}
