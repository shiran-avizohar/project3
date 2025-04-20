import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface AuthRequest extends Request {
    user?: { id: string; role: string };
}

export function authenticateUser(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Missing token" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

export function authorizeAdmin(req, res, next) {
    if (req.user?.role !== "admin") {
        return res.status(403).json({ message: "Access denied. Not admin." });
    }
    next();
}