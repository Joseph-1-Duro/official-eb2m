// TODO implement a better solution in the future with a pin

import { ArrowUpRight } from "lucide-react";

const ADDRESS = "3, Wilmot Close, off Ahmadu Bello Way, Victoria Island, Lagos.";
const DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=3+Wilmot+Close,+Ahmadu+Bello+Way,+Victoria+Island,+Lagos";
// Keyless Google Maps embed — Google geocodes the full address and pins it exactly
const MAP_EMBED_URL =
  "https://www.google.com/maps?q=3,+Wilmot+Close,+off+Ahmadu+Bello+Way,+Victoria+Island,+Lagos&z=16&output=embed";

export default function MapUI() {
  return (
    <section className="map-ui">
      <div className="map-ui__bar">
        <div className="map-ui__bar-inner">
          <p className="map-ui__address">{ADDRESS}</p>
          <a
            href={DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="map-ui__directions"
          >
            Get directions
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="map-ui__frame">
        <iframe
          src={MAP_EMBED_URL}
          title={`Map — ${ADDRESS}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </section>
  );
}