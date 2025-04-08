import './Follow.css';
import { useEffect, useState } from "react";

interface Vacation {
  id: string;
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

  // Fetching vacations
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
  const handleLike = (vacationId: string) => {
    setVacations((prevVacations) =>
      prevVacations.map((vacation) =>
        vacation.id === vacationId
          ? { ...vacation, liked: !vacation.liked, likes: vacation.liked ? vacation.likes - 1 : vacation.likes + 1 }
          : vacation
      )
    );
  };

  // Handle FOLLOW action
  const handleFollow = (vacationId: string) => {
    // Save followed vacation to localStorage
    const followedVacations = JSON.parse(localStorage.getItem("followedVacations") || "[]");
    if (!followedVacations.some((vacation: Vacation) => vacation.id === vacationId)) {
      const vacationToFollow = vacations.find((vacation) => vacation.id === vacationId);
      followedVacations.push(vacationToFollow!);
      localStorage.setItem("followedVacations", JSON.stringify(followedVacations));
    }
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

            {/* Button to follow */}
            <button onClick={() => handleFollow(vacation.id)} className="follow-action-button">
              Follow
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Follow;
