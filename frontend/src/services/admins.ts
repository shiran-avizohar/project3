import axios from 'axios';
import Vacation from '../models/vacation/Vacation';

class AdminService {
  // API base URL
  private API_URL = 'http://localhost:3000';

  // Function to add a new vacation
  async addVacation(
    vacationDestination: string,
    vacationDescription: string,
    vacationDateStart: string,
    vacationDateEnd: string,
    price: number,
    imgFileName: string
  ): Promise<Vacation> {
    // Sending a POST request to the '/vacations' endpoint with the vacation details
    const response = await axios.post<Vacation>(`${this.API_URL}/vacations`, {
      vacationDestination,
      vacationDescription,
      vacationDateStart,
      vacationDateEnd,
      price,
      imgFileName,
    });
    const newVacation = response.data;
    return newVacation; // Returning the created vacation
  }

  // Function to edit an existing vacation
  async editVacation(
    vacationId: string,
    vacationDestination: string,
    vacationDescription: string,
    vacationDateStart: string,
    vacationDateEnd: string,
    price: number,
    imgFileName: string
  ): Promise<Vacation> {
    // Sending a PUT request to the '/vacations/:vacationId' endpoint with the updated vacation details
    const response = await axios.put<Vacation>(`${this.API_URL}/vacations/${vacationId}`, {
      vacationDestination,
      vacationDescription,
      vacationDateStart,
      vacationDateEnd,
      price,
      imgFileName,
    });
    const updatedVacation = response.data;
    return updatedVacation; // Returning the updated vacation
  }

  // Function to delete a vacation
  async deleteVacation(vacationId: string): Promise<{ message: string }> {
    // Sending a DELETE request to the '/vacations/:vacationId' endpoint
    const response = await axios.delete<{ message: string }>(`${this.API_URL}/vacations/${vacationId}`);
    const message = response.data;
    return message; // Returning the success message
  }

  // Function to get vacation reports (vacations with followers count)
  async getVacationReports(): Promise<Vacation[]> {
    // Sending a GET request to the '/vacations/reports' endpoint to get the vacation reports
    const response = await axios.get<Vacation[]>(`${this.API_URL}/vacations/reports`);
    const vacationReports = response.data;
    return vacationReports; // Returning the vacation reports
  }
}

// Create an instance of the AdminService class
const adminService = new AdminService();
export default adminService;
