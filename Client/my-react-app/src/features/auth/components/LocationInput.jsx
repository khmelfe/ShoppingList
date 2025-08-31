import React, { useMemo, useState } from "react";
import "../../../styles/LocationInput.css";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";

/* --- Leaflet default marker icons (so they show up with CRA/Vite) --- */
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

/* --- Helpers ---------------------------------------------------------- */
async function reverseGeocode(lat, lon) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
    { headers: { Accept: "application/json" } }
  );
  const data = await res.json();
  const city =
    data?.address?.city ||
    data?.address?.town ||
    data?.address?.village ||
    data?.address?.municipality ||
    data?.address?.state ||
    "";
  return city;
}

async function geocodeCity(q) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    q
  )}&limit=1&addressdetails=1`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  const arr = await res.json();
  if (!arr || !arr[0]) return null;
  return {
    lat: parseFloat(arr[0].lat),
    lon: parseFloat(arr[0].lon),
    display: arr[0].display_name,
  };
}

/* --- Map click hook --------------------------------------------------- */
function ClickToSetMarker({ onPick }) {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      onPick(lat, lng);
    },
  });
  return null;
}

/* --- Component -------------------------------------------------------- */
/**
 * LocationInput
 * Props:
 *  - value: string (city or free text)
 *  - onChange: (string) => void  (called when text input changes)
 *  - lat?: number
 *  - lon?: number
 *  - onCoordsChange?: ({lat, lon}) => void  (fired when we pick coords)
 *  - showPreview?: boolean  (default true) show small iframe map when coords exist
 *  - placeholder?: string
 */
export default function LocationInput({
  value,
  onChange,
  lat,
  lon,
  onCoordsChange,
  showPreview = true,
  placeholder = "Enter your city or click 📍 / choose 🗺️",
}) {
  const [showMap, setShowMap] = useState(false);
  const center = useMemo(
    () => [lat || 31.7683, lon || 35.2137], // default Jerusalem
    [lat, lon]
  );

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const city = await reverseGeocode(latitude, longitude);
        onChange(city || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        onCoordsChange?.({ lat: latitude, lon: longitude });
      },
      () => {
        // optional: toast / error set
      }
    );
  };

  const handleBlurGeocode = async () => {
    if (!value || (lat && lon)) return;
    const res = await geocodeCity(value);
    if (res) onCoordsChange?.({ lat: res.lat, lon: res.lon });
  };

  return (
    <div className="location-input">
      <div className="location-row">
        <input
          className="input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={handleBlurGeocode}
          placeholder={placeholder}
          aria-label="Location"
        />
        <button
          type="button"
          className="loc-btn"
          title="Use my current location"
          onClick={handleUseMyLocation}
        >
          📍
        </button>
        <button
          type="button"
          className="loc-btn"
          title="Pick on map"
          onClick={() => setShowMap(true)}
        >
          🗺️
        </button>
      </div>

      {showPreview && lat && lon && (
        <iframe
          title="map-preview"
          width="100%"
          height="200"
          className="map-preview"
          src={`https://www.google.com/maps?q=${lat},${lon}&hl=en&z=14&output=embed`}
        />
      )}

      {/* Modal map picker */}
      {showMap && (
        <div className="map-modal-backdrop" onClick={() => setShowMap(false)}>
          <div className="map-modal" onClick={(e) => e.stopPropagation()}>
            <div className="map-modal__header">
              <strong>Choose your location</strong>
              <button
                type="button"
                className="map-close"
                onClick={() => setShowMap(false)}
              >
                ✖
              </button>
            </div>
            <div className="map-modal__body">
              <MapContainer center={center} zoom={13} style={{ width: "100%", height: "100%" }}>
                <TileLayer
                  attribution='&copy; OpenStreetMap'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {lat && lon ? <Marker position={[lat, lon]} /> : null}
                <ClickToSetMarker
                  onPick={async (pickLat, pickLon) => {
                    const city = await reverseGeocode(pickLat, pickLon);
                    onChange(city || `${pickLat.toFixed(4)}, ${pickLon.toFixed(4)}`);
                    onCoordsChange?.({ lat: pickLat, lon: pickLon });
                  }}
                />
              </MapContainer>
            </div>
            <div className="map-modal__footer">
              <button
                type="button"
                className="map-btn ghost"
                onClick={() => setShowMap(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="map-btn primary"
                onClick={() => setShowMap(false)}
              >
                Use this location
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
