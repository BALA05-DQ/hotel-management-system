import { useNavigate } from "react-router-dom";

function HotelCard({ hotel }) {
  const navigate = useNavigate();

  const imageUrl = hotel.image.startsWith("http")
    ? hotel.image
    : `http://localhost:3000/${hotel.image.replace(/^\/+/, "")}`;

  return (
    <div
      className="card"
      onClick={() => navigate(`/hotel/${hotel.id}`)}
    >
      <img src={imageUrl} alt={hotel.title} />

      <h3>{hotel.title}</h3>

      <p>{hotel.description}</p>

      <h4>₹{hotel.price}</h4>
    </div>
  );
}

export default HotelCard;