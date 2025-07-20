"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import axiosInstance from "./axios";

const LocationContext = createContext<
  | {
      location: string | null;
      setLocation: (loc: string) => void;
    }
  | undefined
>(undefined);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [location, setLocationState] = useState<string | null>(null);

  const setLocation = (loc: string) => {
    localStorage.setItem("location", loc);
    setLocationState(loc);
  };

  useEffect(() => {
    const stored = localStorage.getItem("location");
    if (!stored) return;

    const verifyLocation = async () => {
      try {
        const res = await axiosInstance.get(`/locations/${stored}`);
        if (res.data && res.data._id) {
          setLocationState(stored);
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
