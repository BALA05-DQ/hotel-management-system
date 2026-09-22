import db from "../model/db.js";
const  updateHotel = async(req,res)=>{
    try{
        const{id}=req.params;
        const {title,description,latitude,longitude,price}=req.body;
        if (!title || !description || !latitude || !longitude || !price) {

      return res.status(400).json({

        message: "Please fill all the fields",

      });

    }

    if (price <= 0) {

      return res.status(400).json({

        message: "Price should be greater than 0",

      });

    }

    let result;

    if (req.file) {

      const image = `/uploads/hotels/${req.file.filename}`;
         result=await db.query(
            `UPDATE hotels
            SET image =$1, 
               title=$2,
               description =$3,
               latitude = $4,
               longitude =$5,
               price =$6
               WHERE id=$7
               RETURNING* `,
               [image,title,description,latitude,longitude,price,id]
        );
        } else {

      result = await db.query(
        `UPDATE hotels
         SET title = $1,
             description = $2,
             latitude = $3,
             longitude = $4,
             price = $5
         WHERE id = $6
            RETURNING *`, 
        [title, description, latitude, longitude, price, id]
      );
    }
        if (result.rows.length === 0){
            return res.status(404).json({
                message:"Hotel not found ",

            });

        }
        res.status(200).json({
            message:"Hotel updated successfully",
            hotel: result.rows[0],

        });
    }
    catch(error){
        console.log (error.message);
        res.status(500).json({
            message:error.message,
        });
    }
};
export{updateHotel};