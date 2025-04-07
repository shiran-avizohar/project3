import { Request, Response, RequestHandler } from "express";
import User from "../../models/user";
import bcrypt from "bcryptjs";

// Register function, updated for correct type handling
export const register: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, role, email, password } = req.body;
    console.log(req.body);

    // Check if the email is already registered
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
       res.status(400).json({ message: "Email is already registered" });
      return; // Early return to prevent further processing
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await User.create({
      firstName,
      lastName,
      role,
      email,
      password: hashedPassword,
    });

    // Send success response
    res.status(201).json({ message: "User registered successfully", user: newUser });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
