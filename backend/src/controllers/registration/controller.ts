import { Request, Response } from "express";
import User from "../../models/user";
import bcrypt from "bcryptjs";
//func to register new user
export const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, role, email, password } = req.body;
    console.log(req.body);
    // // בדיקה אם המשתמש כבר קיים
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
    res.status(400).json({ message: "Email is already registered" });
    }

    // הצפנת הסיסמה
    const hashedPassword = await bcrypt.hash(password, 10);
    // יצירת המשתמש ושמירתו בדאטהבייס
    const newUser = await User.create({
      firstName: firstName,
      lastName: lastName,
      role: role,
      email: email,
      password: hashedPassword,
    });

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
