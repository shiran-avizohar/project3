import { useState, useEffect } from 'react';
import './Vacations.css';

// Interface for vacation data
interface Vacation {
    id: number;
    title: string;
    destination: string;
    startDate: string;
    endDate: string;
    followers: number;
    isActive: boolean;
}

export default function Vacations() {
    // State to store vacation data
    const [vacations, setVacations] = useState<Vacation[]>([]);

    // useEffect hook to fetch vacation data (mocked here)
    useEffect(() => {
        // Mock vacation data, this could be fetched from an API
        const mockVacations = [
            {
                id: 1,
                title: 'Trip to Paris',
                destination: 'Paris, France',
                startDate: '2023-07-01',
                endDate: '2023-07-10',
                followers: 120,
                isActive: true,
            },
            {
                id: 2,
                title: 'Beach Vacation in Bali',
                destination: 'Bali, Indonesia',
                startDate: '2023-08-15',
                endDate: '2023-08-25',
                followers: 200,
                isActive: true,
            },
            {
                id: 3,
                title: 'Safari in Kenya',
                destination: 'Kenya, Africa',
                startDate: '2023-09-01',
                endDate: '2023-09-10',
                followers: 50,
                isActive: false,
            },
        ];

        // Set the vacation data to state
        setVacations(mockVacations);
    }, []);

    return (
        <div className='vacations-container'>
            <h2>Vacations</h2>
            <div className='vacations-list'>
                {/* Map through vacations array to display each vacation */}
                {vacations.map((vacation) => (
                    <div key={vacation.id} className='vacation-card'>
                        <h3>{vacation.title}</h3>
                        <p>Destination: {vacation.destination}</p>
                        <p>Start Date: {vacation.startDate}</p>
                        <p>End Date: {vacation.endDate}</p>
                        <p>Followers: {vacation.followers}</p>
                        <p>Status: {vacation.isActive ? 'Active' : 'Inactive'}</p>
                        <button>Follow</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
