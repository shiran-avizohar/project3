import { Request, Response } from "express";
import User from "../../models/user";
import bcrypt from "bcryptjs";


// פונקציה לרישום משתמש חדש
export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        // בדיקה אם המשתמש כבר קיים
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // הצפנת הסיסמה
        const hashedPassword = await bcrypt.hash(password, 10);

        // יצירת המשתמש ושמירתו בדאטהבייס
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
