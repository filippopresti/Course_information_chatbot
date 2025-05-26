import React from "react";
import "./styles/styles.css";
import Hero from "./components/Hero";

interface Location {
  name: string;
  addressLines: string[];
  mapEmbedUrl: string;
}

const LOCATIONS: Location[] = [
  {
    name: "Peckham Road",
    addressLines: ["45–65 Peckham Road", "London", "SE5 8UH"],
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2481.123456789!2d-0.0771234!3d51.4721234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487605123456789%3A0xabcdef1234567890!2s45%20Peckham%20Rd%2C%20London%20SE5%208UH!5e0!3m2!1sen!2suk!",
  },
  {
    name: "Greencoat Building",
    addressLines: ["Wilson Road", "London", "SE5 8FG"],
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9940.890976607498!2d-0.10364406044919033!3d51.47242560000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876035a52f0ca39%3A0xeb921cc7dea5de94!2sUAL%20Creative%20Computing%20Institute!5e0!3m2!1sen!2suk!4v1748228669308!5m2!1sen!2suk",
  },
  {
    name: "Hub at Eagle Wharf",
    addressLines: ["Peckham Hill Street", "London", "SE15 5JT"],
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.123456789!2d-0.0641234!3d51.4701234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487605abcdef5678%3A0xfedcba9876543210!2sEagle%20Wharf%20Rd%2C%20London%20SE15%205JT!5e0!3m2!1sen!2suk!",
  },
  {
    name: "High Holborn",
    addressLines: ["272 High Holborn", "London", "WC1V 7EY"],
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.876543210!2d-0.1171234!3d51.5171234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761babcdef1234%3A0xabcdef9876543210!2s272%20High%20Holborn%2C%20London%20WC1V%207EY!5e0!3m2!1sen!2suk!",
  },
];

export const LocationsPage: React.FC = () => {
  return (
    <>
      <div className="landing">
        <Hero
          title="Our Facilities"
          subtitle="The Creative Computing Institute operates across several London sites —
        find us where you learn, experiment and collaborate."
          buttonText="Explore Virtual Tour"
          buttonLink="#virtual-tour"
          backgroundImage="https://ual-media-res.cloudinary.com/image/fetch/c_fill,f_auto,g_auto,q_auto,w_600/https://www.arts.ac.uk/__data/assets/image/0028/73387/cci_large-900x448.jpg"
        />
      </div>

      <br />
      {/* CCI buildings locations (Google maps) */}
      <section className="locations-page">
        <div className="locations-grid">
          {LOCATIONS.map((loc) => (
            <div key={loc.name} className="location-card">
              <h2>{loc.name}</h2>
              <address>
                {loc.addressLines.map((line) => (
                  <div key={line}>{line}</div>
                ))}
              </address>
              <div className="map-container">
                <iframe
                  title={loc.name + " map"}
                  src={loc.mapEmbedUrl}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          ))}
        </div>
        {/* Virtual tour */}
        <div id="virtual-tour" className="virtual-tour">
          <h2>Virtual Tour</h2>
          <p>Explore our facilities virtually! Enjoy the tour.</p>
          <div className="iframe-wrapper">
            <iframe
              src="https://my.matterport.com/show/?m=zy8wob6hUkU"
              allow="autoplay; fullscreen; web-share; xr-spatial-tracking;"
            />
          </div>
        </div>
        {/* Interactive Map */}
        <div id="virtual-tour" className="virtual-tour">
          <h2>CCI Building and Student Halls</h2>
          <p>Explore CCI buildings and Student accomodations across London.</p>
          <div className="iframe-wrapper">
            <iframe
              src="https://www.google.com/maps/d/u/0/embed?mid=1uKzBGtclPc4BFnGdUoVW0HykTB8N-9o&ehbc=2E312F&noprof=1"
              allow="autoplay; fullscreen; web-share; xr-spatial-tracking;"
              title="CCI Building and Student Halls"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
};

export default LocationsPage;
