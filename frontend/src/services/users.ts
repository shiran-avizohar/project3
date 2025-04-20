import axios from 'axios';
import Vacation from '../models/vacation/Vacation';
import Follow from '../models/follow/Follow';

class Users {
  // Private variable to store the API URL
  private API_URL = 'http://localhost:3000';

  // Function to get all vacations
  async getVacations(): Promise<Vacation[]> {
    const response = await axios.get<Vacation[]>(`${this.API_URL}/vacations`);
    const vacations = response.data;
    return vacations; // Returning the fetched vacations
  }

  // Function to allow a user to follow a vacation
  async followVacation(vacationId: string, userId: string): Promise<Follow> {
    const response = await axios.post<Follow>(`${this.API_URL}/follow`, { vacationId, userId });
    const follow = response.data;
    return follow; // Returning the created follow object
  }

  // Function to allow a user to unfollow a vacation
  async unfollowVacation(vacationId: string, userId: string): Promise<{ message: string }> {
    const response = await axios.delete<{ message: string }>(`${this.API_URL}/unfollow/${vacationId}/${userId}`);
    const message = response.data;
    return message; // Returning the success message
  }
}

// Creating an instance of the Users class
const usersService = new Users();
export default usersService;
