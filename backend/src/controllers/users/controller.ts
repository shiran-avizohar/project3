import { NextFunction, Request, Response } from "express";
import Vacation from "../../models/vacation";
import User from "../../models/user";
import Follow from "../../models/follow";

// This function retrieves and returns all the vacations, including associated users.
export async function getVacations(req: Request, res: Response, next: NextFunction) {
    try {
        // Using findAll to get all vacations, along with the associated users
        const vacations = await Vacation.findAll({
            include: [User] 
        });
        // Sending the list of vacations as a JSON response
        res.json(vacations);
    } catch (e) {
        next(e);
    }
}


// This function allows a user to follow (tag) a vacation
export async function followVacation(req: Request, res: Response, next: NextFunction) {
    try {
        const { vacationId, userId } = req.body; // assuming the data is sent in the body

        // Check if the vacation and user exist
        const vacation = await Vacation.findByPk(vacationId);
        const user = await User.findByPk(userId);

        if (!vacation || !user) {
            return res.status(404).json({ message: "Vacation or User not found" });
        }

        // Create a new follow entry in the Follow table
        const follow = await Follow.create({
            vacationId: vacationId,
            userId: userId,
        });

        res.status(201).json(follow);
    } catch (e) {
        next(e);
    }
}

export async function unfollowVacation(req: Request<{ vacationId: string; userId: string }>, res: Response, next: NextFunction) {
    try {
        // Extract vacationId and userId from request parameters
        const { vacationId, userId } = req.params;

        // Find the "Follow" record that links the user and the vacation
        const follow = await Follow.findOne({
            where: {
                vacationId,
                userId,
            },
        });

        if (!follow) {
            return res.status(404).json({ message: "Follow relationship not found." });
        }

        // Delete the "Follow" record (unfollow the vacation)
        await follow.destroy();

        res.status(200).json({ message: "Successfully unfollowed the vacation." });
    } catch (e) {
        next(e);
    }
}
