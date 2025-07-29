import express from "express";
const app = express();
app.use(express.json());
import cors from 'cors';
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));


app.use(express.static('public'));
app.use(express.urlencoded({extended: true}))
import mongoConnection from "./config/db.js";
import dotenv from "dotenv";
import authRouter from './routes/authRoute.js'
dotenv.config();
mongoConnection();

app.get("/", (req, res) => {
  res.send("i am sanakhan");
});



app.use('/auth', authRouter)




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
