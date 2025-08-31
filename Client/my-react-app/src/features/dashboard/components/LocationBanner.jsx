import React from "react";
import Button from "../../../components/Button";
import "../styles/locationBanner.css";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import EditLocationIcon from "@mui/icons-material/EditLocation";
import Image from 'react-bootstrap/Image'
import { useGeolocated } from "react-geolocated";


export default function LocationBanner({ onManual }) {
  const {
    coords,         
    isGeolocationAvailable,  
    isGeolocationEnabled,    
    getPosition,             // trigger function
    positionError,           // any error
  } = useGeolocated({
    positionOptions: { enableHighAccuracy: true },
    userDecisionTimeout: 5000,
  });

  // hide banner once coords exist
  if (coords) return null;

  return (
    <section className="loc-hero" role="region" aria-label="Location access">
      <div className="loc-hero__left">
        <div className="loc-hero__icon" aria-hidden>
          <span className="pin">📍</span>
          <span className="ping" aria-hidden />
        </div>

        <div className="loc-hero__text">
          <h3 className="loc-hero__title">Enable Location Access</h3>
          <p className="loc-hero__subtitle">
            Allow location to find the cheapest supermarkets near you.
          </p>
        </div>
      </div>

      <div className="loc-hero__actions">
        <Button
          variant="primary"
          className="btn-hero pill"
          onClick={getPosition}
          leftIcon={<MyLocationIcon />}
          aria-label="Enable location using browser geolocation"
        >
          Enable Location
        </Button>

        
      </div>

      {!isGeolocationAvailable && (
        <p className="loc-hero__error">⚠️ Your browser does not support Geolocation</p>
      )}
      {!isGeolocationEnabled && (
        <p className="loc-hero__error">⚠️ Geolocation is disabled</p>
      )}
      {positionError && (
        <p className="loc-hero__error">⚠️ {positionError.message}</p>
      )}
    </section>
  );
}
