import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/user";
import dotenv from 'dotenv';

// טוען את המשתנים מה-.env
dotenv.config({ path: ".env.development" });

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    // בדיקה אם יש JWT_SECRET
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing in .env file");
      res.status(500).json({ message: "Server configuration error" });
      return;
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }


    const token = jwt.sign({ id: user.dataValues.userId, email: user.dataValues.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful", token, user: { id: user.id, email: user.email } });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default login;
