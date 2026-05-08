"use client";

import { useEffect, useMemo, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  CircleMarker,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

type LatLng = [number, number];

const center: LatLng = [34.1013, -79.5502];

const POINT_STEP = 4;
const ANCHOR_STEP = 55;

function reducePoints(points: LatLng[]) {
  if (points.length <= 900) return points;

  const reduced = points.filter((_, index) => index % POINT_STEP === 0);

  if (points[0]) reduced.unshift(points[0]);
  if (points[points.length - 1]) reduced.push(points[points.length - 1]);

  return reduced;
}

function FitToTrails({ trails }: { trails: LatLng[][] }) {
  const map = useMap();

  useEffect(() => {
    const all = trails.flat();

    if (all.length > 1) {
      map.fitBounds(all, {
        padding: [55, 55],
        maxZoom: 16,
      });
    }
  }, [map, trails]);

  return null;
}

function LocateButton({ trails }: { trails: LatLng[][] }) {
  const map = useMap();

  function goToTrails() {
    const all = trails.flat();

    if (all.length > 1) {
      map.fitBounds(all, {
        padding: [55, 55],
        maxZoom: 16,
      });
    } else {
      map.flyTo(center, 15);
    }
  }

  return (
    <button
      type="button"
      onClick={goToTrails}
      className="absolute right-4 top-4 z-[1000] rounded-[10px] bg-white px-4 py-2 text-[13px] font-black text-black shadow-lg transition hover:bg-[#f5c542]"
    >
      Go to Trail Map
    </button>
  );
}

export default function TrailMap() {
  const [trails, setTrails] = useState<LatLng[][]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function loadGPX() {
      try {
        const response = await fetch("/trails.gpx");
        const text = await response.text();

        const parser = new DOMParser();
        const xml = parser.parseFromString(text, "text/xml");

        const trackSegments = Array.from(xml.getElementsByTagName("trkseg"));
        const finalTrails: LatLng[][] = [];

        trackSegments.forEach((segment) => {
          const points = Array.from(segment.getElementsByTagName("trkpt"));

          const latlngs = points
            .map((point) => {
              const lat = point.getAttribute("lat");
              const lon = point.getAttribute("lon");

              if (!lat || !lon) return null;

              return [parseFloat(lat), parseFloat(lon)] as LatLng;
            })
            .filter(Boolean) as LatLng[];

          const optimized = reducePoints(latlngs);

          if (optimized.length > 2) {
            finalTrails.push(optimized);
          }
        });

        setTrails(finalTrails);
      } catch (error) {
        console.error("Failed to load GPX:", error);
      } finally {
        setLoaded(true);
      }
    }

    loadGPX();
  }, []);

  const totalPoints = useMemo(() => {
    return trails.reduce((sum, trail) => sum + trail.length, 0);
  }, [trails]);

  const anchorPoints = useMemo(() => {
    return trails.flatMap((trail) =>
      trail.filter((_, index) => index % ANCHOR_STEP === 0)
    );
  }, [trails]);

  return (
    <section className="bg-[#0b0b0b] px-[6%] py-16 text-white">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-8 text-center">
         
          
        </div>

<div className="relative h-[560px] overflow-hidden rounded-[26px] border border-[#163126] bg-[#050705] shadow-[0_0_25px_rgba(32,201,151,0.05)] md:h-[760px]">          <style>{`
            .riverneck-dash {
              animation: riverneckDashMove 1.4s linear infinite;
            }

            @keyframes riverneckDashMove {
              to {
                stroke-dashoffset: -40;
              }
            }

            .leaflet-container {
              background: #111;
            }

            .leaflet-control-attribution {
              font-size: 10px;
            }
          `}</style>

          <MapContainer
            center={center}
            zoom={15}
            minZoom={12}
            maxZoom={18}
            scrollWheelZoom={true}
            zoomControl={true}
            preferCanvas={false}
            className="h-full w-full"
          >
            <TileLayer
              attribution="Tiles © Esri"
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />

            <TileLayer
              attribution="Labels © Esri"
              url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
            />

            <TileLayer
              attribution="Roads © Esri"
              url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}"
            />

            {trails.map((trail, index) => (
              <Polyline
                key={index}
                positions={trail}
                className="riverneck-dash"
                smoothFactor={1}
                pathOptions={{
                  color: "#42fff2",
                  weight: trail.length > 120 ? 4 : 2.5,
                  opacity: trail.length > 40 ? 1 : 0.45,
                  dashArray: trail.length > 40 ? "10 10" : "6 14",
                  lineCap: "round",
                  lineJoin: "round",
                }}
              />
            ))}

            {anchorPoints.map((point, index) => (
              <CircleMarker
                key={index}
                center={point}
                radius={6}
                pathOptions={{
                  color: "#ffffff",
                  fillColor:
                    index % 5 === 0
                      ? "#ff3b3b"
                      : index % 3 === 0
                      ? "#000000"
                      : "#42fff2",
                  fillOpacity: 1,
                  weight: 3,
                  opacity: 1,
                }}
              />
            ))}

            <FitToTrails trails={trails} />
            <LocateButton trails={trails} />
          </MapContainer>
        </div>

      </div>
    </section>
  );
}