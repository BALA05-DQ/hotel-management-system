import db from "../model/db.js";

const addHotel = async (req, res) => {
  try {
    const { title, description, latitude, longitude, price } = req.body;

    if (!req.file) {
      return res.status(400).json({
        message: "Please upload an image",
      });
    }

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

    const image = `/uploads/hotels/${req.file.filename}`;
    const result = await db.query(
      `INSERT INTO hotels 
      (image, title, description, latitude, longitude, price)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
      [image, title, description, latitude, longitude, price]
    );

    res.status(201).json({
      message: "Hotel added successfully",
      hotel: result.rows[0],
    });

  } 
  catch (error) {
    console.log(error.message);

    res.status(500).json({
      message: error.message,
    });
  }
};

export { addHotel };