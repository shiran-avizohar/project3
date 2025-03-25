import { useState, useEffect } from 'react';
import './Vacations.css';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();
    const [vacations, setVacations] = useState<Vacation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Check if user is logged in (e.g., check localStorage or sessionStorage)
        const user = localStorage.getItem('user');
        if (!user) {
            navigate('/login'); // Redirect to login if not logged in
            return;
        }

        // Fetch vacation data from API
        const fetchVacations = async () => {
            try {
                const response = await fetch('/api/vacations');
                if (response.ok) {
                    const data = await response.json();
                    setVacations(data); // Set the vacation data to state
                } else {
                    alert('Failed to load vacations');
                }
            } catch (error) {
                console.error('Error fetching vacations:', error);
                alert('An error occurred while fetching vacations.');
            } finally {
                setLoading(false);
            }
        };

        fetchVacations();
    }, [navigate]); // Trigger useEffect again if navigate changes

    if (loading) {
        return <div>Loading...</div>; // Display loading indicator while fetching data
    }

    return (
        <div className='vacations-container'>
            <h2>Vacations</h2>
            <div className='vacations-list'>
                {/* Map through vacations array to display each vacation */}
                {vacations.length > 0 ? (
                    vacations.map((vacation) => (
                        <div key={vacation.id} className='vacation-card'>
                            <h3>{vacation.title}</h3>
                            <p>Destination: {vacation.destination}</p>
                            <p>Start Date: {vacation.startDate}</p>
                            <p>End Date: {vacation.endDate}</p>
                            <p>Followers: {vacation.followers}</p>
                            <p>Status: {vacation.isActive ? 'Active' : 'Inactive'}</p>
                            <button>Follow</button>
                        </div>
                    ))
                ) : (
                    <p>No vacations available at the moment.</p>
                )}
            </div>
        </div>
    );
}
