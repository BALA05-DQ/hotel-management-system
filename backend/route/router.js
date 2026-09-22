import express from 'express';
import upload from "../middleware/upload.js";
import {addHotel} from '../controller/addhotel.js';
import {createTables}from"../controller/table.js";
import {getHotels}from"../controller/gethotel.js";
import { updateHotel } from "../controller/updatehotel.js";
import { deleteHotel } from "../controller/deletehotel.js";

const router = express.Router();
router.get("/create-table",createTables);
router.post("/hotels",upload.single("image"),addHotel);
router.get("/hotels",getHotels);
router.put("/hotels/:id",upload.single("image"), updateHotel);
router.delete("/hotels/:id", deleteHotel);

export default router;