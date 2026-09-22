import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "./hotelDetail.css";

function HotelDetail() {
  const { id } = useParams();

  const [hotel, setHotel] = useState(null);
  const [myLocation, setMyLocation] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/hotels")
      .then((res) => {
        const hotels = res.data.hotels;

        const foundHotel = hotels.find(
          (hotel) => String(hotel.id) === String(id)
        );

        if (foundHotel) {
          setHotel(foundHotel);
        } else {
          setError("Hotel not found");
        }
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to load hotel");
      });
  }, [id]);

  const getMyLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setMyLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      () => {
        alert("Please allow location permission");
      }
    );
  };

  if (error) {
    return <h2>{error}</h2>;
  }

  if (!hotel) {
    return <h2>Loading...</h2>;
  }

  const imageUrl = hotel.image.startsWith("http")
    ? hotel.image
    : `http://localhost:3000/${hotel.image.replace(/^\/+/, "")}`;

  return (
    <div className="hotel-detail">

      <Helmet>
        <title>{hotel.title} - Hotel Booking</title>

        <meta
          name="description"
          content={hotel.description}
        />
      </Helmet>

      <img
        src={imageUrl}
        alt={hotel.title}
      />

      <h1>{hotel.title}</h1>

      <p>{hotel.description}</p>

      <h2>₹{hotel.price}</h2>

      <p>Latitude: {hotel.latitude}</p>

      <p>Longitude: {hotel.longitude}</p>

      <button onClick={getMyLocation}>
        Use My Location
      </button>

      {myLocation && (
        <div>
          <h3>My Location</h3>

          <p>
            Latitude: {myLocation.latitude}
          </p>

          <p>
            Longitude: {myLocation.longitude}
          </p>
        </div>
      )}

      <iframe
        src={`https://www.openstreetmap.org/export/embed.html?bbox=${
          Number(hotel.longitude) - 0.01
        }%2C${
          Number(hotel.latitude) - 0.01
        }%2C${
          Number(hotel.longitude) + 0.01
        }%2C${
          Number(hotel.latitude) + 0.01
        }&layer=mapnik&marker=${
          hotel.latitude
        }%2C${hotel.longitude}`}
        width="100%"
        height="400"
        title="Hotel location"
      ></iframe>

    </div>
  );
}

export default HotelDetail;
