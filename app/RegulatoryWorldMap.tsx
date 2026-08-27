"use client";

import { PointerEvent, useEffect, useMemo, useRef, useState, WheelEvent } from "react";

type Position = [number, number];
type Geometry = { type: "Polygon" | "MultiPolygon"; coordinates: Position[][][] | Position[][][][] };
type CountryFeature = { properties: { ADMIN?: string; NAME_EN?: string; ISO_A3?: string }; geometry: Geometry };
type Country = { code: string; name: string; path: string };
type RegulatoryProfile = { framework: string; model: string };

const profiles: Record<string, RegulatoryProfile> = {
  CAN: { framework: "PIPEDA & provincial laws", model: "Federal / provincial" },
  USA: { framework: "Sectoral federal laws", model: "Federal / state" },
  GBR: { framework: "UK GDPR", model: "Comprehensive" },
  DEU: { framework: "GDPR & BDSG", model: "EU comprehensive" },
  FRA: { framework: "GDPR & Data Protection Act", model: "EU comprehensive" },
  BRA: { framework: "LGPD", model: "Comprehensive" },
  JPN: { framework: "APPI", model: "Comprehensive" },
  AUS: { framework: "Privacy Act 1988", model: "Federal" },
  IND: { framework: "Digital Personal Data Protection Act", model: "Comprehensive" },
  CHN: { framework: "PIPL", model: "Comprehensive" },
  KOR: { framework: "PIPA", model: "Comprehensive" },
  ZAF: { framework: "POPIA", model: "Comprehensive" },
};

const defaultProfile: RegulatoryProfile = { framework: "Research in progress", model: "Under review" };
// Natural Earth uses -99 where an ISO alpha-3 value is unavailable. Keep the
// map usable with stable jurisdiction identifiers instead of exposing that marker.
const jurisdictionCodes: Record<string, string> = {
  Norway: "NOR",
  France: "FRA",
  Kosovo: "XKX",
  "Northern Cyprus": "XNC",
  Somaliland: "XSO",
};
const project = ([longitude, latitude]: Position): Position => [((longitude + 180) / 360) * 1000, ((90 - latitude) / 180) * 500];

function countryCode(feature: CountryFeature) {
  const code = feature.properties.ISO_A3;
  return code && code !== "-99" ? code : jurisdictionCodes[feature.properties.ADMIN ?? ""];
}

function ringPath(ring: Position[]) {
  return ring.map((point, index) => {
    const [x, y] = project(point);
    return `${index === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
  }).join("") + "Z";
}

function geometryPath(geometry: Geometry) {
  const polygons: Position[][][] = geometry.type === "Polygon"
    ? [geometry.coordinates as unknown as Position[][]]
    : geometry.coordinates as Position[][][];
  return polygons.map((polygon) => polygon.map(ringPath).join("")).join("");
}

export default function RegulatoryWorldMap() {
  const [features, setFeatures] = useState<CountryFeature[]>([]);
  const [selected, setSelected] = useState<Country | null>(null);
  const [hovered, setHovered] = useState<Country | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragStart = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null);

  useEffect(() => {
    fetch("/world-countries.geojson")
      .then((response) => response.json())
      .then((data: { features: CountryFeature[] }) => setFeatures(data.features.filter((feature) => countryCode(feature) && countryCode(feature) !== "ATA")))
      .catch(() => setFeatures([]));
  }, []);

  const countries = useMemo(() => features.map((feature) => ({
    code: countryCode(feature)!,
    name: feature.properties.NAME_EN || feature.properties.ADMIN || "Unknown jurisdiction",
    path: geometryPath(feature.geometry),
  })), [features]);
  const active = selected ?? hovered;
  const clampPan = (next: { x: number; y: number }, nextZoom = zoom) => {
    const range = 500 * (nextZoom - 1);
    return { x: Math.max(-range, Math.min(range, next.x)), y: Math.max(-range * .45, Math.min(range * .45, next.y)) };
  };
  const reset = () => { setZoom(1); setPan({ x: 0, y: 0 }); setSelected(null); };
  const changeZoom = (amount: number) => setZoom((current) => {
    const next = Math.max(1, Math.min(2.35, Number((current + amount).toFixed(2))));
    setPan((currentPan) => clampPan(currentPan, next));
    return next;
  });
  const onWheel = (event: WheelEvent<SVGSVGElement>) => { event.preventDefault(); changeZoom(event.deltaY > 0 ? -.18 : .18); };
  const onPointerDown = (event: PointerEvent<SVGSVGElement>) => {
    dragStart.current = { x: event.clientX, y: event.clientY, panX: pan.x, panY: pan.y };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const onPointerMove = (event: PointerEvent<SVGSVGElement>) => {
    if (!dragStart.current || zoom === 1) return;
    setPan(clampPan({ x: dragStart.current.panX + (event.clientX - dragStart.current.x), y: dragStart.current.panY + (event.clientY - dragStart.current.y) }));
  };
  const endDrag = () => { dragStart.current = null; };

  return <section className="regulatory-map" aria-labelledby="regulatory-map-title">
    <div className="regulatory-map-heading">
      <div><h2 id="regulatory-map-title">Global privacy regulation atlas</h2></div>
      
    </div>
    <div className="map-stage">
      <div className="map-controls" aria-label="Map controls">
        <button type="button" onClick={() => changeZoom(.2)} aria-label="Zoom in">+</button>
        <button type="button" onClick={() => changeZoom(-.2)} aria-label="Zoom out">−</button>
        <button type="button" className="map-reset" onClick={reset}>Global view</button>
      </div>
      <svg className="world-map" viewBox="0 0 1000 500" role="img" aria-label="Interactive world map of privacy regulations" onWheel={onWheel} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={endDrag} onPointerCancel={endDrag}>
        <g transform={`translate(${pan.x} ${pan.y}) scale(${zoom})`}>
          {countries.map((country) => <path key={country.code} d={country.path} className={`map-country ${active?.code === country.code ? "is-active" : ""}`} tabIndex={0} aria-label={`${country.name}, ${profiles[country.code]?.framework ?? defaultProfile.framework}`} onPointerEnter={() => setHovered(country)} onPointerLeave={() => setHovered(null)} onFocus={() => setHovered(country)} onBlur={() => setHovered(null)} onClick={(event) => { event.stopPropagation(); setSelected((current) => current?.code === country.code ? null : country); }} />)}
        </g>
      </svg>
      {active && <aside className="map-tooltip" role="status" aria-live="polite">
        <span className="tooltip-code">{active.code}</span><strong>{active.name}</strong>
        <span><small>Primary framework</small>{profiles[active.code]?.framework ?? defaultProfile.framework}</span>
        <span><small>Regulatory model</small>{profiles[active.code]?.model ?? defaultProfile.model}</span>
      </aside>}
      {!features.length && <p className="map-loading">Loading geographic data…</p>}
    </div>
    <p className="map-note">Hover to preview · tap or click to pin · scroll or use controls to zoom · drag to pan when zoomed</p>
  </section>;
}
