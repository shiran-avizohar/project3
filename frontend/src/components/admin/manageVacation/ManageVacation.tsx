import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ManageVacation.css';

interface Vacation {
    vacationId: string;
    vacationDestination: string;
    vacationDateStart: string;
    vacationDateEnd: string;
    price: number;
    imgFileName: string;
    vacationDescription: string;
}

export default function ManageVacation() {
    const navigate = useNavigate();
    const [vacations, setVacations] = useState<Vacation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetching all vacations
    const fetchVacations = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/admins/vacations', {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              });
              

            if (!response.ok) {
                throw new Error(`Failed to load vacations: ${response.status} ${response.statusText}`);
            }

            const data: Vacation[] = await response.json();
            setVacations(data);
        } catch (err) {
            setError((err as Error).message || 'An unknown error occurred.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const user = localStorage.getItem('user');
        
        if (!user || !JSON.parse(user).isAdmin) { 
            navigate('/login', { replace: true });
            return;
        }

        fetchVacations();
    }, [navigate]);

    // Function to handle vacation deletion with confirmation
    const handleDelete = (vacationId: string) => {
        if (window.confirm('Are you sure you want to delete this vacation?')) {
            deleteVacation(vacationId);
        }
    };

    // Delete vacation by ID
    const deleteVacation = async (vacationId: string) => {
        try {
            const response = await fetch(`http://localhost:3000/api/admins/vacations/${vacationId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`Failed to delete vacation: ${response.status}`);
            }

            setVacations((prevVacations) => prevVacations.filter((vacation) => vacation.vacationId !== vacationId));
            alert('Vacation deleted successfully');
        } catch (err) {
            setError((err as Error).message || 'An error occurred while deleting vacation.');
        }
    };

    // Function to format the date
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="manage-vacations-container">
            <h2>Manage Vacations</h2>

            <button className="add-vacation-btn" onClick={() => navigate('/admin/add-vacation')}>Add New Vacation</button>

            <div className="vacations-list">
                {vacations.length > 0 ? (
                    vacations.map((vacation) => {
                        const imageSrc = `/images/${vacation.imgFileName}`;
                        return (
                            <div key={vacation.vacationId} className="vacation-card">
                                {/* Vacation Title */}
                                <div className="vacation-title">{vacation.vacationDestination}</div>

                                {/* Vacation Image */}
                                <div className="vacation-image-container">
                                    <img src={imageSrc} alt={vacation.vacationDestination} className="vacation-image" />
                                </div>

                                {/* Vacation Dates */}
                                <div className="vacation-dates">
                                    <span>{formatDate(vacation.vacationDateStart)} - {formatDate(vacation.vacationDateEnd)}</span>
                                </div>

                                {/* Vacation Description */}
                                <div className="vacation-description">
                                    <p>{vacation.vacationDescription.slice(0, 150)}</p>
                                </div>

                                {/* Vacation Price */}
                                <div className="vacation-price">
                                    <span>${vacation.price}</span>
                                </div>

                                {/* Edit and Delete buttons */}
                                <div className="vacation-actions">
                                    <button className="edit-btn" onClick={() => navigate(`/admin/edit-vacation/${vacation.vacationId}`)}>Edit</button>
                                    <button className="delete-btn" onClick={() => handleDelete(vacation.vacationId)}>Delete</button>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p>No vacations available at the moment.</p>
                )}
            </div>
        </div>
    );
}
