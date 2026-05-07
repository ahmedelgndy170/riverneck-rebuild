"use client";

import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";

export default function TrailMap() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [mapKey, setMapKey] = useState(0);

  useEffect(() => {
    setMapKey((k) => k + 1);
  }, []);

  useEffect(() => {
    let map: any = null;
    let cancelled = false;

    async function initMap() {
      if (!mapRef.current) return;

      const leaflet = await import("leaflet");
      const L = leaflet.default ?? leaflet;

      if (cancelled || !mapRef.current) return;

      mapRef.current.innerHTML = "";

      const mapInstance = L.map(mapRef.current, {
        center: [34.17, -79.62],
        zoom: 13,
        zoomControl: true,
        scrollWheelZoom: false,
        dragging: true,
      });

      map = mapInstance;

      L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
          attribution: "Tiles © Esri",
          maxZoom: 19,
        }
      ).addTo(mapInstance);

      setTimeout(() => {
        if (!cancelled) mapInstance.invalidateSize();
      }, 300);

      setTimeout(() => {
        if (!cancelled) mapInstance.invalidateSize();
      }, 800);
    }

    initMap();

    return () => {
      cancelled = true;

      if (map) {
        map.remove();
        map = null;
      }

      if (mapRef.current) {
        mapRef.current.innerHTML = "";
        (mapRef.current as any)._leaflet_id = null;
      }
    };
  }, [mapKey]);

  return (
    <div className="h-[340px] w-full overflow-hidden rounded-[22px] border border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.45)] md:h-[520px] md:rounded-3xl">
      <div key={mapKey} ref={mapRef} className="h-full w-full" />
    </div>
  );
}