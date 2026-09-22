import db from "../model/db.js";
import fs from "fs";
import path from "path";
const deleteHotel = async (req, res) => {
     try {
 const { id } = req.params; 
 const result = await db.query(
         "DELETE FROM hotels WHERE id = $1 RETURNING *",
      [id]
    );
           if (result.rows.length === 0) {
      return res.status(404).json({
             message: "Hotel not found"
      });
    }
    const hotel = result.rows[0];
    if(hotel.image){
        const imagePath = path.join(
            process.cwd(),
            hotel.image.replace("/uploads/","uploads/")
        );
        if(fs.existsSync(imagePath)){
            fs.unlinkSync(imagePath);
        }
    }
  res.status(200).json({
      message: "Hotel deleted successfully",
      hotel: result.rows[0]
    });
  } catch (error) {
    console.log(error);

         res.status(500).json({
      message: "Something went wrong"
    });
  }
};

export { deleteHotel };