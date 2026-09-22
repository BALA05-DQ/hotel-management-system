import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHotels, removeHotel } from "../../redux/hotelSlice";
import "./admin.css";
import { useNavigate } from "react-router-dom";

function Adminmenu() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hotels = useSelector((state) => state.hotels.hotels);

  useEffect(() => {
    axios
      .get("https://hotel-management-system-pjil.onrender.com/api/hotels")
      .then((res) => {
        dispatch(setHotels(res.data.hotels));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

  const handleDelete = (id) => {

    if (!window.confirm("Are you sure you want to delete this hotel?")) {
      return;
    }

    axios
      .delete(`https://hotel-management-system-pjil.onrender.com/api/hotels/${id}`)
      .then(() => {
        dispatch(removeHotel(id));
        alert("Hotel deleted successfully");
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to delete hotel");
      });
  };

  return (
    <div className="wrapper">

      <button onClick={() => navigate("/add-hotel")}>
        Add Hotel
      </button>

      {hotels.map((hotel) => (

        <div className="card" key={hotel.id}>

          <img
            src={
              hotel.image.startsWith("http")
                ? hotel.image
                : `https://hotel-management-system-pjil.onrender.com/${hotel.image.replace(/^\/+/, "")}`
            }
            alt={hotel.title}
          />

          <h3>{hotel.title}</h3>

          <p>{hotel.description}</p>

          <h4>₹{hotel.price}</h4>

          <button
            onClick={() => navigate(`/edit-hotel/${hotel.id}`)}
          >
            Edit
          </button>

          <button
            onClick={() => handleDelete(hotel.id)}
          >
            Delete
          </button>

        </div>

      ))}

    </div>
  );
}

export default Adminmenu;