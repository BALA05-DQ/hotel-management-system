import db from "../model/db.js";
const getHotels = async(req,res)=>{
    try{
        const {search,
            minPrice,
            maxPrice,
            offset =0,
            limit =5
        } = req.query;

        console.log("Search:",search);
        let result;
       
          
               if (search || minPrice || maxPrice) {

      let conditions = [];

      let values = [];

      let count = 1;

      if (search) {

        conditions.push(`(

          LOWER(title) ILIKE LOWER($${count})

          OR LOWER(description) ILIKE LOWER($${count})

        )`);

        values.push(`%${search}%`);

        count++;

      }

      if (minPrice) {

        conditions.push(`price >= $${count}`);

        values.push(minPrice);

        count++;

      }

      if (maxPrice) {

        conditions.push(`price <= $${count}`);

        values.push(maxPrice);

        count++;

      }

      values.push(limit);

      values.push(offset);

      result = await db.query(

        `SELECT * FROM hotels

         WHERE ${conditions.join(" AND ")}

         ORDER BY id DESC

         LIMIT $${count} OFFSET $${count + 1}`,

        values

      );
        }else{
         result = await db.query(
            `SELECT * FROM hotels
             ORDER BY id DESC
             LIMIT $1 OFFSET $2`,
             [limit ,offset]
        );
    }
        res.status(200).json({
            hotels:result.rows,
        });
    }catch(error){
        console.log(error.message);
        res.status(500).json({
            message:error.message,
        });
    }
};
export {getHotels};