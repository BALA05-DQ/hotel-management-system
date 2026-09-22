import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./user.css";
import HotelCard from "../hotel/HotelCard";
import Pagination from "../common/Pagination";
import { setHotels } from "../../redux/hotelSlice";

function User() {
  const dispatch = useDispatch();

  const hotels = useSelector((state) => state.hotels.hotels);

  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [page, setPage] = useState(1);

  const limit = 5;

  const getHotels = () => {
    const offset = (page - 1) * limit;

    axios
      .get(
        `http://localhost:3000/api/hotels?search=${search}&minPrice=${minPrice}&maxPrice=${maxPrice}&offset=${offset}&limit=${limit}`
      )
      .then((res) => {
        dispatch(setHotels(res.data.hotels));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getHotels();
  }, [page]);

  const handleSearch = () => {
    setPage(1);

    axios
      .get(
        `http://localhost:3000/api/hotels?search=${search}&minPrice=${minPrice}&maxPrice=${maxPrice}&offset=0&limit=${limit}`
      )
      .then((res) => {
        dispatch(setHotels(res.data.hotels));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="wrapper">
      <input
        type="text"
        placeholder="Search hotel"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <input
        type="number"
        placeholder="Min price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />

      <input
        type="number"
        placeholder="Max price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />

      <button onClick={handleSearch}>Search</button>

      {hotels.map((hotel) => (
        <HotelCard key={hotel.id} hotel={hotel} />
      ))}

      <Pagination
        page={page}
        setPage={setPage}
        hasNext={hotels.length === limit}
      />
    </div>
  );
}

export default User;