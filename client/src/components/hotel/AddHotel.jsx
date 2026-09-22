import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HotelForm from "./HotelForm";
import "./addHotel.css";

function AddHotel() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    latitude: "",
    longitude: "",
    image: null,
  });

  const [preview, setPreview] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    setForm({
      ...form,
      image: file,
    });

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("title", form.title);
    data.append("description", form.description);
    data.append("price", form.price);
    data.append("latitude", form.latitude);
    data.append("longitude", form.longitude);
    data.append("image", form.image);

    try {
      const res = await fetch(
        "https://hotel-management-system-pjil.onrender.com/api/hotels",
        {
          method: "POST",
          body: data,
        }
      );

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || "Error adding hotel");
        return;
      }

      alert("Hotel added successfully");
      navigate("/admin");
    } catch (err) {
      console.log(err);
      alert("Error adding hotel");
    }
  };

  return (
    <HotelForm
      form={form}
      setForm={setForm}
      handleSubmit={handleSubmit}
      buttonText="Add Hotel"
      preview={preview}
      handleImageChange={handleImageChange}
    />
  );
}

export default AddHotel;