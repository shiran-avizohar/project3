import { Request, Response, NextFunction } from 'express';
import Vacation from "../../models/vacation";
import Follow from "../../models/follow";
import Sequelize from 'sequelize';

/**
 * Function to add a new vacation.
 * This will create a vacation in the database with provided details.
 */
export async function addVacation(req: Request, res: Response, next: NextFunction) {
    try {
        // Extract vacation details from the request body
        const { vacationDestination, vacationDescription, vacationDateStart, vacationDateEnd, price, imgFileName } = req.body;

        // Create a new vacation in the database
        const newVacation = await Vacation.create({
            vacationDestination,
            vacationDescription,
            vacationDateStart,
            vacationDateEnd,
            price,
            imgFileName,
        });

        // Return a response with status 201 (Created) and the created vacation data
        res.status(201).json(newVacation);
    } catch (e) {
        // If there is an error, pass it to the error handler
        next(e);
    }
}

/**
 * Function to edit an existing vacation.
 * This will update the details of the vacation based on the provided vacationId.
 */
export async function editVacation(req: Request, res: Response, next: NextFunction) {
    try {
        // Extract vacationId from request parameters
        const { vacationId } = req.params;

        // Extract updated vacation details from the request body
        const { vacationDestination, vacationDescription, vacationDateStart, vacationDateEnd, price, imgFileName } = req.body;

        // Find the vacation by its ID
        const vacationToUpdate = await Vacation.findByPk(vacationId);

        // If the vacation does not exist, return 404 (Not Found)
        if (!vacationToUpdate) {
            return res.status(404).json({ message: "Vacation not found" });
        }

        // Update the vacation with the new details
        vacationToUpdate.vacationDestination = vacationDestination || vacationToUpdate.vacationDestination;
        vacationToUpdate.vacationDescription = vacationDescription || vacationToUpdate.vacationDescription;
        vacationToUpdate.vacationDateStart = vacationDateStart || vacationToUpdate.vacationDateStart;
        vacationToUpdate.vacationDateEnd = vacationDateEnd || vacationToUpdate.vacationDateEnd;
        vacationToUpdate.price = price || vacationToUpdate.price;
        vacationToUpdate.imgFileName = imgFileName || vacationToUpdate.imgFileName;

        // Save the updated vacation
        await vacationToUpdate.save();

        // Return the updated vacation details
        res.status(200).json(vacationToUpdate);
    } catch (e) {
        // If there is an error, pass it to the error handler
        next(e);
    }
}

/**
 * Function to delete an existing vacation.
 * This will remove a vacation based on the provided vacationId.
 */
export async function deleteVacation(req: Request, res: Response, next: NextFunction) {
    try {
        // Extract vacationId from request parameters
        const { vacationId } = req.params;

        // Find the vacation by its ID
        const vacationToDelete = await Vacation.findByPk(vacationId);

        // If the vacation does not exist, return 404 (Not Found)
        if (!vacationToDelete) {
            return res.status(404).json({ message: "Vacation not found" });
        }

        // Delete the vacation
        await vacationToDelete.destroy();

        // Return a success message
        res.status(200).json({ message: "Vacation successfully deleted" });
    } catch (e) {
        // If there is an error, pass it to the error handler
        next(e);
    }
}

// Function to get vacation reports with the number of followers for each vacation
export async function getVacationReports(req: Request, res: Response, next: NextFunction) {
    try {
        // Fetch all vacations with the number of followers
        const vacations = await Vacation.findAll({
            attributes: ['id', 'destination', 'startDate', 'endDate', 'price'], // Choose the columns you want to display
            include: [{
                model: Follow,
                attributes: [[Sequelize.fn('COUNT', Sequelize.col('follow.id')), 'followersCount']], // Counting the number of followers
                required: false, // Include vacations with no followers as well
            }],
            group: ['vacation.id'], // Group by vacation to calculate followers per vacation
        });

        // Send the report as a JSON response
        res.status(200).json(vacations);
    } catch (error) {
        // Pass any errors to the error handling middleware
        next(error);
    }
}
