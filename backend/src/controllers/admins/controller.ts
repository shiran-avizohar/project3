import { Request, Response, NextFunction } from 'express';
import Vacation from "../../models/vacation";
import Follow from "../../models/follow";
import Sequelize from 'sequelize';

export async function addVacation(req: Request, res: Response, next: NextFunction): Promise<void> {
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

        // Send a response with status 201 (Created) and the created vacation data
        res.status(201).json(newVacation);
    } catch (e) {
        // If an error occurs, pass it to the next error handler
        next(e);
    }
}

// export async function editVacation(req: Request, res: Response, next: NextFunction): Promise<void> {
//     try {
//         // Extract vacationId from the request parameters
//         const { vacationId } = req.params;
//         // Extract updated vacation details from the request body
//         const { vacationDestination, vacationDescription, vacationDateStart, vacationDateEnd, price, imgFileName } = req.body;

//         // Find the vacation by its ID
//         const vacationToUpdate = await Vacation.findByPk(vacationId);

//         // If vacation is not found, return 404 (Not Found)
//         if (!vacationToUpdate) {
//             res.status(404).json({ message: "Vacation not found" });
//             return; // End function execution after sending the response
//         }

//         // Update vacation details
//         vacationToUpdate.vacationDestination = vacationDestination || vacationToUpdate.vacationDestination;
//         vacationToUpdate.vacationDescription = vacationDescription || vacationToUpdate.vacationDescription;
//         vacationToUpdate.vacationDateStart = vacationDateStart || vacationToUpdate.vacationDateStart;
//         vacationToUpdate.vacationDateEnd = vacationDateEnd || vacationToUpdate.vacationDateEnd;
//         vacationToUpdate.price = price || vacationToUpdate.price;
//         vacationToUpdate.imgFileName = imgFileName || vacationToUpdate.imgFileName;

        
//         // Save the updated vacation to the database
//         await vacationToUpdate.save();

//         // Send the updated vacation details as a response
//         res.status(200).json(vacationToUpdate);
//     } catch (e) {
//         // If an error occurs, pass it to the next error handler
//         next(e);
//     }
// }

interface MulterRequest extends Request {
    file?: Express.Multer.File;
  }
  
  export async function editVacation(req: MulterRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { vacationId } = req.params;
      const {
        vacationDestination,
        vacationDescription,
        vacationDateStart,
        vacationDateEnd,
        price,
      } = req.body;
  
      // נביא את החופשה הקיימת
      const vacationToUpdate = await Vacation.findByPk(vacationId);
  
      if (!vacationToUpdate) {
        res.status(404).json({ message: "Vacation not found" });
        return;
      }
  
      // נעדכן את הערכים - אם לא נשלח ערך, נשמור את הקיים
      vacationToUpdate.vacationDestination = vacationDestination || vacationToUpdate.vacationDestination;
      vacationToUpdate.vacationDescription = vacationDescription || vacationToUpdate.vacationDescription;
      vacationToUpdate.vacationDateStart = vacationDateStart || vacationToUpdate.vacationDateStart;
      vacationToUpdate.vacationDateEnd = vacationDateEnd || vacationToUpdate.vacationDateEnd;
      vacationToUpdate.price = price || vacationToUpdate.price;
  
      // אם התקבלה תמונה חדשה - נעדכן את השם שלה
      if (req.file) {
        vacationToUpdate.imgFileName = req.file.filename;
      }
  
      await vacationToUpdate.save();
      res.status(200).json(vacationToUpdate);
    } catch (e) {
      next(e);
    }
  }
  
export async function deleteVacation(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        // Extract vacationId from the request parameters
        const { vacationId } = req.params;

        // Find the vacation by its ID
        const vacationToDelete = await Vacation.findByPk(vacationId);

        // If vacation is not found, return 404 (Not Found)
        if (!vacationToDelete) {
            res.status(404).json({ message: "Vacation not found" });
            return; // End function execution after sending the response
        }

        // Delete the vacation from the database
        await vacationToDelete.destroy();

        // Send a success message confirming the vacation was deleted
        res.status(200).json({ message: "Vacation successfully deleted" });
    } catch (e) {
        // If an error occurs, pass it to the next error handler
        next(e);
    }
}

export async function getVacationReports(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        // Fetch all vacations with the number of followers for each vacation
        const vacations = await Vacation.findAll({
            attributes: ['id', 'vacationDestination', 'vacationDateStart', 'vacationDateEnd', 'price'],
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
