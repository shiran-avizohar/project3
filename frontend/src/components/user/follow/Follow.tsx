import './Follow.css';
import { useEffect, useState } from "react";

interface Vacation {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
  likes: number;
  liked: boolean;  // הוספנו שדה כדי לעקוב אחרי הלייק
}

const Follow = () => {
  const [vacations, setVacations] = useState<Vacation[]>([]); // Vacation state
  const [loading, setLoading] = useState(true);

  // Function to simulate fetching vacation details from a database
  const fetchVacations = async () => {
    try {
      const response = await fetch('YOUR_API_ENDPOINT_HERE'); // Replace with your actual API endpoint
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setVacations(data); // Assuming the API returns a list of vacation objects
      setLoading(false);
    } catch (error) {
      console.error("Error fetching vacations:", error);
      setLoading(false);
    }
  };

  // Handle LIKE action
  const handleLike = (vacationId: number) => {
    setVacations((prevVacations) =>
      prevVacations.map((vacation) =>
        vacation.id === vacationId
          ? { ...vacation, liked: !vacation.liked, likes: vacation.liked ? vacation.likes - 1 : vacation.likes + 1 }
          : vacation
      )
    );
  };

  useEffect(() => {
    fetchVacations(); // Fetch vacation data from the API when the component is mounted
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="follow-vacation-container">
      <h2>Followed Vacation Details</h2>
      {vacations.length === 0 ? (
        <p>No vacations found.</p> // If no vacation data is found
      ) : (
        vacations.map((vacation) => (
          <div key={vacation.id} className="vacation-details">
            <h3>{vacation.title}</h3>
            <p>{vacation.description}</p>
            <p><strong>Start Date:</strong> {vacation.startDate}</p>
            <p><strong>End Date:</strong> {vacation.endDate}</p>
            <p><strong>Status:</strong> {vacation.status}</p>
            <p><strong>Likes:</strong> {vacation.likes}</p>

            {/* Button to toggle LIKE */}
            <button onClick={() => handleLike(vacation.id)} className={`like-button ${vacation.liked ? "liked" : ""}`}>
              {vacation.liked ? "Liked" : "Like"}
            </button>

            <div className="vacation-actions">
              <button className="follow-action-button">Unfollow</button>
              <button className="follow-action-button">Share</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Follow;
