import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface AuthRequest extends Request {
    user?: { id: string; role: string };
}

export function authenticateUser(req: AuthRequest, res: Response, next: NextFunction): void {
    const token = req.header('Authorization');

    if (!token) {
        res.status(401).json({ message: 'Access denied. No token provided.' });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string; role: string };
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
}

export function authorizeAdmin(req: AuthRequest, res: Response, next: NextFunction): void {
    if (!req.user || req.user.role !== 'admin') {
        res.status(403).json({ message: 'Access denied. Admins only.' });
        return;
    }
    next();
}
