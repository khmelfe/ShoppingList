import React from "react";
import Button from "../../../components/Button";
import "../styles/locationBanner.css";

const PinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M12 22s6-6.2 6-11a6 6 0 10-12 0c0 4.8 6 11 6 11z" stroke="currentColor" strokeWidth="1.8"/>
    <circle cx="12" cy="11" r="2.3" stroke="currentColor" strokeWidth="1.8"/>
  </svg>
);
const EditIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M12 20h9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M16.5 3.5l4 4L8 20H4v-4L16.5 3.5z" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

export default function LocationBanner({ onEnable, onManual }) {
  return (
    <section className="loc-hero" role="region" aria-label="Location access">
      {/* floating blob + grid are purely decorative (done in CSS) */}

      <div className="loc-hero__left">
        <div className="loc-hero__icon" aria-hidden>
          <span className="pin">📍</span>
          <span className="ping" aria-hidden />
        </div>

        <div className="loc-hero__text">
          <h3>Enable Location Access</h3>
          <p>Allow location to find the cheapest supermarkets near you.</p>
        </div>
      </div>

    <div className="loc-hero__actions">
      <Button
        variant="primary"
        className="btn-hero pill"
        onClick={onEnable}
        leftIcon={<PinIcon />}
      >
        Enable Location
      </Button>

      <Button
        variant="secondary"
        className="btn-ghost pill"
        onClick={onManual}
        leftIcon={<EditIcon />}
      >
        Enter location manually
      </Button>
    </div>
    </section>
  );
}
