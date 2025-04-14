import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './VacationManagement.css';

interface Vacation {
    vacationId: string;
    vacationDestination: string;
    vacationDateStart: string;
    vacationDateEnd: string;
    price: number;
    imgFileName: string;
    vacationDescription: string;
}

export default function VacationManagement() {
    const navigate = useNavigate();
    const [vacations, setVacations] = useState<Vacation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [editingVacation, setEditingVacation] = useState<Vacation | null>(null); // State to manage the vacation being edited
    const [formData, setFormData] = useState<Omit<Vacation, 'vacationId'>>({
        vacationDestination: '',
        vacationDateStart: '',
        vacationDateEnd: '',
        price: 0,
        imgFileName: '',
        vacationDescription: '',
    });

    // Fetching all vacations
    const fetchVacations = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/users/vacations', {
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

        if (!user || JSON.parse(user).role !== "admin"){
            navigate('/login', { replace: true });
            return;
        }

        fetchVacations();
    }, [navigate]);

    const handleDelete = (vacationId: string) => {
        if (window.confirm('Are you sure you want to delete this vacation?')) {
            deleteVacation(vacationId);
        }
    };

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

    const handleEdit = (vacation: Vacation) => {
        // Set the vacation as the one being edited
        setEditingVacation(vacation);
        setFormData({
            vacationDestination: vacation.vacationDestination,
            vacationDateStart: vacation.vacationDateStart,
            vacationDateEnd: vacation.vacationDateEnd,
            price: vacation.price,
            imgFileName: vacation.imgFileName,
            vacationDescription: vacation.vacationDescription,
        });
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
      
        const token = localStorage.getItem("token"); // ← ודאי שהטוקן קיים
      
        if (!token) {
          setError("Missing authentication token. Please login again.");
          return;
        }
      
        if (editingVacation) {
          try {
            const response = await fetch(`http://localhost:3000/api/admins/vacations/${editingVacation.vacationId}`, {
              method: 'PUT',
              body: JSON.stringify(formData),
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
              },
            });
      
            if (!response.ok) {
              const data = await response.json();
              throw new Error(data.message || `Failed to update vacation: ${response.status}`);
            }
      
            alert('Vacation updated successfully');
            setEditingVacation(null); // Clear editing state
            fetchVacations(); // Refresh vacation list
          } catch (err) {
            setError((err as Error).message || 'An error occurred while updating vacation.');
          }
        }
      };
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
            <h2>Vacations Management </h2>
            <button className="add-vacation-btn" onClick={() => navigate('/admin/addVacation')}>Add New Vacation</button>

            {/* Vacation Edit Form */}
            {editingVacation && (
                <form onSubmit={handleFormSubmit}>
                    <h3>Edit Vacation</h3>
                    <input
                        type="text"
                        name="vacationDestination"
                        value={formData.vacationDestination}
                        onChange={handleFormChange}
                        placeholder="Destination"
                    />
                    <input
                        type="date"
                        name="vacationDateStart"
                        value={formData.vacationDateStart}
                        onChange={handleFormChange}
                    />
                    <input
                        type="date"
                        name="vacationDateEnd"
                        value={formData.vacationDateEnd}
                        onChange={handleFormChange}
                    />
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleFormChange}
                        placeholder="Price"
                    />
                    <textarea
                        name="vacationDescription"
                        value={formData.vacationDescription}
                        onChange={handleFormChange}
                        placeholder="Description"
                    />
                    <button type="submit">Save Changes</button>
                </form>
            )}

            <div className="vacations-list">
                {vacations.length > 0 ? (
                    vacations.map((vacation) => {
                        const imageSrc = `/images/${vacation.imgFileName}`;
                        return (
                            <div key={vacation.vacationId} className="vacation-card">
                                <div className="vacation-title">{vacation.vacationDestination}</div>
                                <div className="vacation-image-container">
                                    <img src={imageSrc} alt={vacation.vacationDestination} className="vacation-image" />
                                </div>
                                <div className="vacation-dates">
                                    <span>{formatDate(vacation.vacationDateStart)} - {formatDate(vacation.vacationDateEnd)}</span>
                                </div>
                                <div className="vacation-description">
                                    <p>{vacation.vacationDescription.slice(0, 150)}</p>
                                </div>
                                <div className="vacation-price">
                                    <span>${vacation.price}</span>
                                </div>
                                <div className="vacation-actions">
                                    <button className="edit-btn" onClick={() => handleEdit(vacation)}>Edit</button>
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
