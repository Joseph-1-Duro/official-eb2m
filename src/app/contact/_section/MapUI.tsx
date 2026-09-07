// TODO exact pin: with a (free-tier) Google Maps Embed API key, embed by
// place_id — or hardcode verified lat/lng — to stop re-geocoding per load.

import { ArrowUpRight } from "lucide-react";

const ADDRESS = "3, Wilmot Close, off Ahmadu Bello Way, Victoria Island, Lagos.";
// Geocode-friendly form of ADDRESS for map lookups: drop the human-style
// "off ..." hint (geocoders can't parse it and it can pull the pin onto
// Ahmadu Bello Way itself) and add the country for disambiguation.
// House number + street + area + country is the format geocoders resolve
// most precisely.
const GEO_ADDRESS = "3 Wilmot Close, Victoria Island, Lagos, Nigeria";
const ENCODED_GEO_ADDRESS = encodeURIComponent(GEO_ADDRESS);

const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${ENCODED_GEO_ADDRESS}`;
// Keyless Google Maps embed — Google geocodes the query and pins it.
// z=17 keeps the map at street level so the pin placement is unambiguous.
const MAP_EMBED_URL = `https://www.google.com/maps?q=${ENCODED_GEO_ADDRESS}&z=17&output=embed`;

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