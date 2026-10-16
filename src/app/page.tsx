import Link from "next/link";
import { heroContent } from "@/config/content";

export default function Home() {
  return (
    <div className="hero">
      <div className="container hero-layout">
        <div>
          <span className="hero-eyebrow">{heroContent.eyebrow}</span>
          <h1 className="hero-title">{heroContent.title}</h1>
          <p className="hero-subtitle">{heroContent.subtitle}</p>
          <div className="hero-ctas">
            <Link href={heroContent.primaryCta.href} className="btn btn-primary">
              {heroContent.primaryCta.label}
            </Link>
            <Link href={heroContent.secondaryCta.href} className="btn btn-secondary">
              {heroContent.secondaryCta.label}
            </Link>
          </div>
          <p className="hero-note">{heroContent.note}</p>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="hero-tile" style={{ background: "linear-gradient(135deg,#1d4ed8,#7c3aed)" }}>
            Apparel
          </div>
          <div className="hero-tile" style={{ background: "linear-gradient(135deg,#0f766e,#16a34a)" }}>
            Outdoors
          </div>
          <div className="hero-tile" style={{ background: "linear-gradient(135deg,#b45309,#f59e0b)" }}>
            Home
          </div>
          <div className="hero-tile" style={{ background: "linear-gradient(135deg,#be123c,#f43f5e)" }}>
            Footwear
          </div>
        </div>
      </div>
    </div>
  );
}
