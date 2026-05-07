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
        minZoom: 11,
        maxZoom: 19,
        zoomControl: true,
        scrollWheelZoom: false,
        doubleClickZoom: true,
        dragging: true,
        touchZoom: true,
        boxZoom: false,
      });

      map = mapInstance;

      L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
          attribution: "Tiles © Esri",
          maxZoom: 19,
        }
      ).addTo(mapInstance);

      L.circle([34.17, -79.62], {
        radius: 1600,
        color: "#f6c35f",
        weight: 2,
        opacity: 0.85,
        fillColor: "#1d6d54",
        fillOpacity: 0.14,
      }).addTo(mapInstance);

      const customIcon = L.divIcon({
        className: "",
        html: `
          <div style="
            width: 34px;
            height: 34px;
            border-radius: 999px;
            background: #f6c35f;
            border: 4px solid #101010;
            box-shadow: 0 0 28px rgba(246,195,95,0.75);
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <div style="
              width: 12px;
              height: 12px;
              border-radius: 999px;
              background: #1d6d54;
            "></div>
          </div>
        `,
        iconSize: [34, 34],
        iconAnchor: [17, 17],
      });

      L.marker([34.17, -79.62], { icon: customIcon })
        .addTo(mapInstance)
        .bindPopup("River Neck Acres ATV Park");

      setTimeout(() => {
        if (!cancelled) mapInstance.invalidateSize();
      }, 250);

      setTimeout(() => {
        if (!cancelled) mapInstance.invalidateSize();
      }, 750);
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
    <div className="relative overflow-hidden rounded-[20px] border border-white/15 bg-black shadow-[0_25px_80px_rgba(0,0,0,0.45)] active:border-[#f6c35f]/60 md:rounded-3xl">
      <div className="pointer-events-none absolute left-3 top-3 z-[500] rounded-full bg-black/65 px-3 py-2 text-[11px] font-black text-white/90 backdrop-blur-md md:left-5 md:top-5 md:px-4 md:text-sm">
        Interactive Trail Area
      </div>

      <div className="pointer-events-none absolute bottom-3 left-3 right-3 z-[500] rounded-2xl bg-black/65 px-4 py-3 text-center text-[11px] font-bold leading-[1.5] text-white/80 backdrop-blur-md md:hidden">
        Pinch to zoom • Drag to explore
      </div>

      <div className="h-[300px] w-full md:h-[520px]">
        <div key={mapKey} ref={mapRef} className="h-full w-full" />
      </div>
    </div>
  );
}