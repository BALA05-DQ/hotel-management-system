import {Routes, Route} from "react-router-dom";
import Header from "./Header";
import User from "./components/user/User";
import Admin from "./components/admin/Admin";
import AddHotel from "./components/hotel/AddHotel";
import Edit from "./components/hotel/Edit";
import HotelDetail from "./components/hotel/HotelDetail";
function App() {
  return (
    <div>
      
        <Header />
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/add-hotel" element={<AddHotel />} />
        <Route path="/edit-hotel/:id" element={<Edit />} />
        <Route path="/hotel/:id"element={<HotelDetail/>}/>
      </Routes>
    </div>
  )
}

export default App
