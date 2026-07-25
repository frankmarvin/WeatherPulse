import { useEffect } from "react";
import { useState } from "react";

export const useGeoLocation = () => {
  const [location, setLocation] =
    useState(null);

  const [error, setError] =
    useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat:
            position.coords.latitude,
          lon:
            position.coords.longitude
        });
      },
      (err) => {
        setError(err.message);
      }
    );
  }, []);

  return {
    location,
    error
  };
};
