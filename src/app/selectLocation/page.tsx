"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { useLocation } from "@/lib/LocationContext";
import { useRouter } from "next/navigation";

const SelectLocationSection = () => {
  const router = useRouter();
  const [locations, setLocations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { location, setLocation } = useLocation();

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await axios.get("locations");
        setLocations(res.data || []);
      } catch (err) {
        setError("Failed to load locations");
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();

    if (typeof window !== "undefined" && window.AOS) {
      window.AOS.init();
    }
  }, []);

  const handleSelect = (loc: any) => {
    if (location?._id === loc._id) return;
    setLocation(loc);
    router.push("/");
  };

  const isSelected = (shortName: string) => location?._id === shortName;

  return (
    <section id="latest-area" className="latest-area-section">
      <div className="container">
        <div className="latest-area-content">
          <div className="section-title-2 mb65 headline text-left">
            <h2>
              Locations <span></span>
            </h2>
          </div>

          {loading && <p>Loading...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className="row">
            {locations.map((loc, idx) => (
              <div key={idx} className="col-md-6 col-lg-4 mb-3">
                <div className="latest-event-item">
                  <div className="events-date relative-position text-center">
                    <div className="gradient-bdr"></div>
                    <span className="event-date bold-font">
                      <i className="fas fa-map-marker-alt"></i>
                    </span>
                    {loc.shortName}
                  </div>

                  <div className="event-text">
                    <h3 className="latest-title bold-font">{loc.fullName}</h3>
                    <div className="course-meta">
                      <span className="course-category">{loc.address}</span>
                    </div>

                    <div
                      className="course-viewer ul-li"
                      style={{ color: "#fff" }}
                    >
                      <button
                        className={`btn btn-sm ${
                          isSelected(loc._id) ? "btn-danger" : "btn-success"
                        }`}
                        onClick={() => handleSelect(loc)}
                      >
                        {isSelected(loc._id) ? "Selected" : "Use Location"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SelectLocationSection;
