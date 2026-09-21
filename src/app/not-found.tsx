import Link from "next/link";

export default function NotFound() {
  return (
    <section className="not-found" role="main">
      <div className="not-found__inner">
        <p className="not-found__eyebrow">Error 404 — Page Not Found</p>
        <h1 className="not-found__code" aria-hidden="true">
          404
        </h1>
        <p className="not-found__text">
          The page you&rsquo;re looking for has wandered off Lagos Island.
          Let&rsquo;s get you back on solid ground.
        </p>
        <Link href="/" className="not-found__cta">
          Back to Home
        </Link>
      </div>
    </section>
  );
}
