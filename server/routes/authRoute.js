import express from "express";
import User from "../model/authModel.js";
import bcrypt from "bcrypt";
import multer from "multer";
import { loginAuth } from "../controllers/authControllers.js";
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
upload.single("profileImage"),
  router.post("/register", upload.single("profileImage"), async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    try {
      const profileImage = req.file;
      if (!profileImage) {
        return res.status(500).json("no file uploaded");
      }

      const profileImagePath = profileImage.path;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: "User already exist" });
      }
      // hash password
      const saltedfromEnv = Number(process.env.SALT_PASSWORD);
      const salt = bcrypt.genSaltSync(saltedfromEnv);
      const hashPassword = bcrypt.hashSync(password, salt);
      console.log(hashPassword);

      const userData = new User({
        firstname,
        lastname,
        email,
        password: hashPassword,
        profileImagePath,
      });

      await userData.save();
      res.status(200).json({ message: "user registered sucessfully!" });
    } catch (err) {
      res
        .status(400)
        .json({ message: "registration failed", error: err.message });
    }
  });


  
router.post("/login", loginAuth);

export default router;
