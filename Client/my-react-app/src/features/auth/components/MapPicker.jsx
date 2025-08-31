import { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "../../../styles/MapPicker.css"; 

// Fix default Leaflet marker icons for bundlers
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

async function reverseGeocode(lat, lon) {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  const data = await res.json();
  const a = data?.address || {};
  return (
    a.city ||
    a.town ||
    a.village ||
    a.municipality ||
    a.suburb ||
    a.state ||
    data?.display_name ||
    `${lat.toFixed(4)}, ${lon.toFixed(4)}`
  );
}

async function geocodeQuery(q) {
  if (!q?.trim()) return null;
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    q
  )}&limit=1&addressdetails=1`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  const arr = await res.json();
  if (!arr?.length) return null;
  return {
    lat: parseFloat(arr[0].lat),
    lon: parseFloat(arr[0].lon),
    label:
      arr[0].display_name ||
      `${parseFloat(arr[0].lat).toFixed(4)}, ${parseFloat(arr[0].lon).toFixed(4)}`,
  };
}

function ClickHandler({ onPick }) {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      onPick(lat, lng);
    },
  });
  return null;
}

/**
 * MapPicker Modal
 * Props:
 *  - open: boolean
 *  - onClose: () => void
 *  - onConfirm: ({lat, lon, location}) => void
 *  - initialLat?: number
 *  - initialLon?: number
 *  - initialLabel?: string
 */
export default function MapPicker({
  open,
  onClose,
  onConfirm,
  initialLat = 31.7683,
  initialLon = 35.2137,
  initialLabel = "",
}) {
  const [lat, setLat] = useState(initialLat);
  const [lon, setLon] = useState(initialLon);
  const [label, setLabel] = useState(initialLabel);
  const [search, setSearch] = useState("");

  const center = useMemo(() => [lat, lon], [lat, lon]);
  const mapRef = useRef(null);

  useEffect(() => {
    if (open) {
      setLat(initialLat);
      setLon(initialLon);
      setLabel(initialLabel);
      setSearch("");
    }
  }, [open, initialLat, initialLon, initialLabel]);

  const handlePick = async (pickLat, pickLon) => {
    setLat(pickLat);
    setLon(pickLon);
    const loc = await reverseGeocode(pickLat, pickLon);
    setLabel(loc);
  };

  const gotoMyLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setLat(latitude);
        setLon(longitude);
        const loc = await reverseGeocode(latitude, longitude);
        setLabel(loc);
        const map = mapRef.current;
        if (map?._leaflet_id) map.setView([latitude, longitude], 14);
      },
      () => {}
    );
  };

  const searchPlace = async (e) => {
    e.preventDefault();
    const r = await geocodeQuery(search);
    if (!r) return;
    setLat(r.lat);
    setLon(r.lon);
    setLabel(r.label);
    const map = mapRef.current;
    if (map?._leaflet_id) map.setView([r.lat, r.lon], 13);
  };

  if (!open) return null;

  return (
    <div className="map-picker-backdrop" onClick={onClose}>
      <div className="map-picker-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="map-picker-header">
          <strong className="map-picker-title">Choose your location</strong>

          <form className="map-picker-search" onSubmit={searchPlace}>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search a place…"
              className="map-picker-input"
            />
            <button type="submit" className="map-picker-btn btn-outline">
              Search
            </button>
            <button
              type="button"
              onClick={gotoMyLocation}
              className="map-picker-btn btn-primary"
              title="Use my current location"
            >
              📍 My location
            </button>
          </form>

          <button
            onClick={onClose}
            className="map-picker-close"
            aria-label="Close"
          >
            ✖
          </button>
        </div>

        {/* Map */}
        <div className="map-picker-map">
          <MapContainer
            center={center}
            zoom={13}
            style={{ width: "100%", height: "100%" }}
            whenCreated={(m) => (mapRef.current = m)}
          >
            <TileLayer
              attribution="&copy; OpenStreetMap"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={center} />
            <ClickHandler onPick={handlePick} />
          </MapContainer>
        </div>

        {/* Footer */}
        <div className="map-picker-footer">
          <div className="map-picker-label" title={label}>
            {label || "Pick a point on the map…"}
          </div>

          <div className="map-picker-actions">
            <button onClick={onClose} className="map-picker-btn btn-outline">
              Cancel
            </button>
            <button
              onClick={() => onConfirm({ lat, lon, location: label })}
              className="map-picker-btn btn-primary"
            >
              Use this location
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
