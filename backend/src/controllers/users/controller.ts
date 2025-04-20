import { Request, Response, NextFunction } from 'express';
import Vacation from '../../models/vacation';
import Follow from '../../models/follow';
import { Op } from 'sequelize';

// Retrieve all vacations with follower information


export async function getVacations(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.body.userId;
      console.log(userId)
  
      // 1. Fetch all vacations
      const vacations = await Vacation.findAll();
  
      // 2. Fetch all follows for the current user
      const userFollows = await Follow.findAll({
        where: { userId },
        attributes: ['vacationId'],
        raw: true,
      });
  
      const followedVacationIds = new Set(userFollows.map(f => f.vacationId?.toString()));
  
      // 3. Fetch follower counts for all vacations in one query
      const allVacationIds = vacations.map(v => v.vacationId || v.id);
      const followerCounts = await Follow.findAll({
        where: {
          vacationId: {
            [Op.in]: allVacationIds,
          },
        },
        attributes: ['vacationId'],
        raw: true,
      });
  
      // Count how many times each vacationId appears
      const counts: Record<string, number> = {};
      for (const f of followerCounts) {
        const id = f.vacationId;
        counts[id] = (counts[id] || 0) + 1;
      }
  
      // 4. Build response
      const result = vacations.map(v => {
        const vacationId = v.vacationId || v.id;
        return {
          ...v.toJSON(),
          isUserFollowing: followedVacationIds.has(vacationId?.toString()),
          followers: counts[vacationId] || 0,
        };
      });
  
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

// Allow a user to follow a vacation
export async function followVacation(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { vacationId, userId } = req.body;
        console.log("thisss",vacationId)

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
  
      if (!vacationId || !userId) {
        res.status(400).json({ message: "Missing vacationId or userId in route." });
        return;
      }
  
      const follow = await Follow.findOne({ where: { vacationId, userId } });
  
      if (!follow) {
        res.status(404).json({ message: "Follow relationship not found." });
        return;
      }
  
      await follow.destroy();
      res.status(200).json({ message: "Successfully unfollowed the vacation." });
    } catch (error) {
      next(error);
    }
  }
  
