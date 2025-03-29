import { useState, useEffect } from 'react';
import './Vacations.css';
import { useNavigate } from 'react-router-dom';

// Interface for vacation data
interface Vacation {
    vacationId: string;
    vacationDestination: string;
    vacationDateStart: string;
    vacationDateEnd: string;
    followers: number;
    isActive: boolean;
}

export default function Vacations() {
    const navigate = useNavigate();
    const [vacations, setVacations] = useState<Vacation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null); // Nullable error state

    useEffect(() => {
        // Check if user is logged in (e.g., check localStorage or sessionStorage)
        const user = localStorage.getItem('user');
        if (!user) {
            navigate('/login', { replace: true });
            return;
        }

        // Function to fetch vacations
        const fetchVacations = async () => {
            try {
                const response = await fetch('/api/vacations');
                if (!response.ok) {
                    throw new Error(`Failed to load vacations: ${response.status} ${response.statusText}`);
                }
        
                const data: Vacation[] = await response.json();
                setVacations(data); // Set the vacation data to state
            } catch (err) {
                console.error('Error fetching vacations:', err);
                setError((err as Error).message || 'An unknown error occurred.');
            } finally {
                setLoading(false);
            }
        };

        fetchVacations();
    }, []); // אין צורך ב-[navigate] כתלות

    if (loading) {
        return <div>Loading...</div>; // Display loading indicator while fetching data
    }

    if (error) {
        return <div className="error-message">{error}</div>; // Display error if it occurs
    }

    return (
        <div className="vacations-container">
            <h2>Vacations</h2>
            <div className="vacations-list">
                {/* Map through vacations array to display each vacation */}
                {vacations.length > 0 ? (
                    vacations.map((vacation) => (
                        <div key={vacation.vacationId} className="vacation-card">
                            <p>Destination: {vacation.vacationDestination}</p>
                            <p>Start Date: {vacation.vacationDateStart}</p>
                            <p>End Date: {vacation.vacationDateEnd}</p>
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
