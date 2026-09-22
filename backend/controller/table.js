import db from '../model/db.js';

const createTables = async(req,res)=>{
    try{
        await db.query(`
            CREATE TABLE IF NOT EXISTS hotels(
            id SERIAL PRIMARY KEY,
            title VARCHAR(255)NOT NULL,
            description Text,
            latitude DECIMAL(10,7)NOT NULL,
            longtitude DECIMAL(10,7)NOT NULL,
            price DECIMAL(10,2)NOT NULL,
            image VARCHAR(255)
        )
        `);
        res.status(200).json({
            message:"Table created successfully"
        });

    }catch(error){
        res.status(500).json({
            error:error.message
        });
    }
};
export {createTables};