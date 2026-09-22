import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import HotelForm from "./HotelForm";
import "./addHotel.css";

function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    latitude: "",
    longitude: "",
    image: null,
  });

  const [preview, setPreview] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/hotels")
      .then((res) => {
        const hotel = res.data.hotels.find(
          (hotel) => hotel.id == id
        );

        if (hotel) {
          setForm({
            title: hotel.title,
            description: hotel.description,
            price: hotel.price,
            latitude: hotel.latitude,
            longitude: hotel.longitude,
            image: null,
          });

          setPreview(
            hotel.image.startsWith("http")
              ? hotel.image
              : `http://localhost:3000/${hotel.image.replace(/^\/+/, "")}`
          );
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to load hotel");
      });
  }, [id]);

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

    if (form.image) {
      data.append("image", form.image);
    }

    try {
      const res = await fetch(
        `http://localhost:3000/api/hotels/${id}`,
        {
          method: "PUT",
          body: data,
        }
      );

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || "Error editing hotel");
        return;
      }

      alert("Hotel updated successfully");
      navigate("/admin");
    } catch (err) {
      console.log(err);
      alert("Error editing hotel");
    }
  };

  return (
    <HotelForm
      form={form}
      setForm={setForm}
      handleSubmit={handleSubmit}
      buttonText="Update Hotel"
      preview={preview}
      handleImageChange={handleImageChange}
    />
  );
}

export default Edit;