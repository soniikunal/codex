"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import axiosInstance from "./axios";

type LocationData = {
  _id: string;
  shortName: string;
};

const LocationContext = createContext<
  | {
      location: LocationData | null;
      setLocation: (loc: LocationData) => void;
    }
  | undefined
>(undefined);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [location, setLocationState] = useState<LocationData | null>(null);

  const setLocation = (loc: LocationData) => {
    localStorage.setItem("location", JSON.stringify(loc));
    setLocationState(loc);
  };

  useEffect(() => {
    const stored = localStorage.getItem("location");
    if (!stored) return;

    try {
      const parsed = JSON.parse(stored) as LocationData;

      const verifyLocation = async () => {
        try {
          const res = await axiosInstance.get(`/locations/${parsed._id}`);
          if (res.data && res.data._id) {
            setLocationState(parsed);
          } else {
            localStorage.removeItem("location");
            setLocationState(null);
          }
        } catch (err) {
          console.error("Location check failed", err);
          localStorage.removeItem("location");
          setLocationState(null);
        }
      };

      verifyLocation();
    } catch (err) {
      console.error("Invalid JSON in localStorage for 'location'", err);
      localStorage.removeItem("location");
    }
  }, []);

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context)
    throw new Error("useLocation must be used within a LocationProvider");
  return context;
};
