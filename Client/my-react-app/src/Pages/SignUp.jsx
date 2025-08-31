import { useState } from "react";
import "./login.css";
import "../index.js";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";

// fix default marker icons (works with CRA/Vite)
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// reverse geocode helper (lat/lon -> city name)
async function reverseGeocode(lat, lon) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
    { headers: { "Accept": "application/json" } }
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

// (optional) geocode a typed city name to lat/lon on blur
async function geocodeCity(q) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=1&addressdetails=1`;
  const res = await fetch(url, { headers: { "Accept": "application/json" } });
  const arr = await res.json();
  if (!arr || !arr[0]) return null;
  return {
    lat: parseFloat(arr[0].lat),
    lon: parseFloat(arr[0].lon),
    display: arr[0].display_name,
  };
}

function ClickToSetMarker({ onPick }) {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      onPick(lat, lng);
    },
  });
  return null;
}

export default function SignUp() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    location: "",  // human-readable city
    lat: null,
    lon: null,
  });
  const [err, setErr] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [showMap, setShowMap] = useState(false);

  // regex validation
  const usernameRe = /^[A-Za-z]{8,16}$/;
  const emailRe = /^\S+@\S+\.\S+$/;
  const passwordRe = /^(?=.*[A-Z])(?=.*[@!?])[A-Za-z0-9@!?]{8,16}$/;

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  // validate
  const validate = () => {
    const e = {};
    if (!usernameRe.test(form.username)) {
      e.username = "Username must be 8–16 letters (A–Z only).";
    }
    if (!emailRe.test(form.email)) {
      e.email = "Enter a valid email address.";
    }
    if (!passwordRe.test(form.password)) {
      e.password = "Password 8–16 chars, ≥1 uppercase, ≥1 special (@, !, ?).";
    }
    if (!form.location) {
      e.location = "Location is required.";
    }
    setErr(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Registration failed");
      window.location.href = "/login";
    } catch (e) {
      setErr({ api: e.message });
    } finally {
      setLoading(false);
    }
  };

  // geolocate via browser, then reverse geocode to city
  const getLocation = () => {
    if (!navigator.geolocation) {
      setErr({ location: "Geolocation not supported." });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const city = await reverseGeocode(latitude, longitude);
          setForm((f) => ({
            ...f,
            location: city || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
            lat: latitude,
            lon: longitude,
          }));
        } catch {
          setErr({ location: "Failed to fetch city." });
        }
      },
      () => {
        setErr({ location: "Permission denied or unavailable." });
      }
    );
  };

  // when user types a city manually, we can geocode on blur (optional)
  const onLocationBlur = async () => {
    if (!form.location || (form.lat && form.lon)) return; // skip if already have coords
    const res = await geocodeCity(form.location);
    if (res) {
      setForm((f) => ({ ...f, lat: res.lat, lon: res.lon }));
    }
  };

  return (
    
    <div className="auth-card">
      <div className="brand-icon" aria-hidden>🛒</div>
      <h2 className="title">Create Account ✨</h2>
      <p className="subtitle">Join us to start saving on your shopping list.</p>

      {err.api && <div className="error" role="alert">{err.api}</div>}

      <form onSubmit={onSubmit} noValidate>
        {/* Username */}
        <div className="field">
          <label className="label" htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            className="input"
            placeholder="Enter a username"
            value={form.username}
            onChange={onChange}
            aria-invalid={!!err.username}
          />
          {err.username && <div className="error">{err.username}</div>}
        </div>

        {/* Email */}
        <div className="field">
          <label className="label" htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            className="input"
            placeholder="you@example.com"
            value={form.email}
            onChange={onChange}
            aria-invalid={!!err.email}
          />
          {err.email && <div className="error">{err.email}</div>}
        </div>

        {/* Password */}
        <div className="field">
          <label className="label" htmlFor="pw">Password</label>
          <div style={{ position: "relative" }}>
            <input
              id="pw"
              name="password"
              type={showPw ? "text" : "password"}
              className="input"
              placeholder="Choose a strong password"
              value={form.password}
              onChange={onChange}
              aria-invalid={!!err.password}
            />
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                fontSize: "16px",
              }}
              aria-label={showPw ? "Hide password" : "Show password"}
            >
              {showPw ? "🙈" : "👁️"}
            </button>
          </div>
          {err.password && <div className="error">{err.password}</div>}
        </div>

        {/* Location */}
        <div className="field">
          <label className="label">Location</label>
          <div style={{ display: "flex", gap: "8px" }}>
            <input
              className="input"
              name="location"
              placeholder="Enter your city or click 📍 / choose 🗺️"
              value={form.location}
              onChange={onChange}
              onBlur={onLocationBlur}   // optional: geocode when user finishes typing
              aria-invalid={!!err.location}
            />
            <button
              type="button"
              onClick={getLocation}
              style={{ padding: "0 12px", cursor: "pointer" }}
              title="Use my current location"
            >
              📍
            </button>
            <button
              type="button"
              onClick={() => setShowMap(true)}
              style={{ padding: "0 12px", cursor: "pointer" }}
              title="Pick on map"
            >
              🗺️
            </button>
          </div>
          {err.location && <div className="error">{err.location}</div>}

          {/* Preview map (simple iframe) */}
          {form.lat && form.lon && (
            <iframe
              title="map"
              width="100%"
              height="200"
              style={{ marginTop: "12px", borderRadius: "8px", border: "1px solid #ccc" }}
              src={`https://www.google.com/maps?q=${form.lat},${form.lon}&hl=en&z=14&output=embed`}
            />
          )}
        </div>

        <button className="primary" disabled={loading}>
          {loading ? "Creating account..." : "Sign Up"}
        </button>
      </form>

      <div className="split">
        <a href="/login">Already have an account? Login</a>
      </div>

      {/* Map Picker Modal */}
      {showMap && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "grid",
            placeItems: "center",
            zIndex: 1000,
          }}
          onClick={() => setShowMap(false)}
        >
          <div
            style={{
              width: "min(900px, 92vw)",
              height: "min(560px, 80vh)",
              background: "#fff",
              borderRadius: 12,
              overflow: "hidden",
              border: "1px solid #e5e7eb",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
              display: "flex",
              flexDirection: "column",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ padding: "10px 14px", borderBottom: "1px solid #eee", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <strong>Choose your location</strong>
              <button onClick={() => setShowMap(false)} style={{ border: 0, background: "transparent", cursor: "pointer" }}>✖</button>
            </div>

            <div style={{ flex: 1 }}>
              <MapContainer
                center={[form.lat || 31.7683, form.lon || 35.2137]} // default Jerusalem
                zoom={13}
                style={{ width: "100%", height: "100%" }}
              >
                <TileLayer
                  attribution='&copy; OpenStreetMap'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {form.lat && form.lon && <Marker position={[form.lat, form.lon]} />}
                <ClickToSetMarker
                  onPick={async (pickLat, pickLon) => {
                    const city = await reverseGeocode(pickLat, pickLon);
                    setForm((f) => ({
                      ...f,
                      location: city || `${pickLat.toFixed(4)}, ${pickLon.toFixed(4)}`,
                      lat: pickLat,
                      lon: pickLon,
                    }));
                  }}
                />
              </MapContainer>
            </div>

            <div style={{ padding: "10px 14px", borderTop: "1px solid #eee", display: "flex", justifyContent: "flex-end", gap: 8 }}>
              <button
                onClick={() => setShowMap(false)}
                style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #d1d5db", background: "#fff", cursor: "pointer" }}
              >
                Cancel
              </button>
              <button
                onClick={() => setShowMap(false)}
                style={{ padding: "8px 12px", borderRadius: 8, border: 0, background: "var(--brand)", color: "#fff", cursor: "pointer" }}
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
