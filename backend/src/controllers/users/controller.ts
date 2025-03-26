import { Request, Response, NextFunction } from 'express';
import Vacation from '../../models/vacation';
import User from '../../models/user';
import Follow from '../../models/follow';

// Retrieve all vacations with follower information
export async function getVacations(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const vacations = await Vacation.findAll({
            include: [{
                model: Follow,
                attributes: ['userId'], // Retrieve only the user IDs of followers
            }],
        });

        res.status(200).json(vacations);
    } catch (error) {
        next(error);
    }
}


// Allow a user to follow a vacation
export async function followVacation(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { vacationId, userId } = req.body;

        // Check if the user is already following the vacation
        const existingFollow = await Follow.findOne({ where: { vacationId, userId } });

        if (existingFollow) {
            res.status(400).json({ message: 'User is already following this vacation.' });
            return;
        }

        // Create a new follow record
        const follow = await Follow.create({ vacationId, userId });

        res.status(201).json(follow);
    } catch (error) {
        next(error);
    }
}

// Allow a user to unfollow a vacation
export async function unfollowVacation(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { vacationId, userId } = req.params;

        // Find the follow record
        const follow = await Follow.findOne({ where: { vacationId, userId } });

        if (!follow) {
            res.status(404).json({ message: 'Follow relationship not found.' });
            return;
        }

        // Delete the follow record
        await follow.destroy();
        res.status(200).json({ message: 'Successfully unfollowed the vacation.' });
    } catch (error) {
        next(error);
    }
}
