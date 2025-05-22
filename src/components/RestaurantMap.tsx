import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

interface RestaurantMapProps {
  address: string;
  name: string;
}

const RestaurantMap: React.FC<RestaurantMapProps> = ({ address, name }) => {
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const handleMapLoad = () => {
    if (!window.google) {
      console.error("Google Maps JS SDK not loaded");
      return;
    }

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        const location = results[0].geometry.location;
        setCoordinates({ lat: location.lat(), lng: location.lng() });
      } else {
        console.error("Geocoding failed:", status);
      }
    });
  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div className="relative rounded-lg overflow-hidden shadow-md h-64 bg-gray-100">
        {coordinates ? (
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={coordinates}
            zoom={15}
            onLoad={handleMapLoad}
          >
            <Marker position={coordinates} title={name} />
          </GoogleMap>
        ) : (
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={{ lat: 53.349805, lng: -6.26031 }} // Dublin fallback
            zoom={12}
            onLoad={handleMapLoad}
          />
        )}
      </div>
    </LoadScript>
  );
};

export default RestaurantMap;
