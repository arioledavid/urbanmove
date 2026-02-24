"use client";

import { useEffect, useState, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icon in Next.js (webpack bundles break default paths)
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

// Demo route: two points in London (pickup → drop-off)
const PICKUP: [number, number] = [51.5075, -0.1278];
const DROPOFF: [number, number] = [51.515, -0.102];
const ROUTE: [number, number][] = [PICKUP, DROPOFF];

export default function DeliveryCardMap() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === "undefined" || !containerRef.current) return;

    const map = L.map(containerRef.current, {
      center: [(PICKUP[0] + DROPOFF[0]) / 2, (PICKUP[1] + DROPOFF[1]) / 2],
      zoom: 13,
      zoomControl: false,
      attributionControl: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map);

    L.marker(PICKUP).addTo(map).bindTooltip("Pickup", { permanent: false });
    L.marker(DROPOFF).addTo(map).bindTooltip("Drop-off", { permanent: false });
    L.polyline(ROUTE, { color: "#e0110c", weight: 4, opacity: 0.8 }).addTo(map);

    const ro = new ResizeObserver(() => map.invalidateSize());
    ro.observe(containerRef.current);

    return () => {
      ro.disconnect();
      map.remove();
    };
  }, [mounted]);

  if (!mounted) {
    return (
      <div
        className="h-32 lg:h-56 w-full rounded-lg bg-gray-100 flex items-center justify-center"
        aria-hidden
      >
        <span className="text-sm text-gray-400">Loading map…</span>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="h-32 lg:h-56 w-full rounded-lg overflow-hidden z-0"
    />
  );
}
