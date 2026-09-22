 import dotenv from'dotenv';
 dotenv.config();

 import express from 'express';
 import cors from 'cors';
 import router from './route/router.js';
 const app = express ();
 const PORT = process.env.PORT // 3000;
 app.use(cors());
 app.use(express.json());
 app.use('/uploads',express.static('uploads'));
app.use('/api',router);

 app.get('/',(req,res)=>{
    res.send('hello world!');

 })
 app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
 });
 