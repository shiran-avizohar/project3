import React, { useState, useEffect } from "react";

// Define the Vacation interface (or import it if already defined elsewhere)
interface Vacation {
  id: string;
  name: string;
}

const Unfollow = () => {
  const [followedVacations, setFollowedVacations] = useState<Vacation[]>([]);

  // Load followed vacations from localStorage or any other source
  useEffect(() => {
    const storedVacations = JSON.parse(localStorage.getItem("followedVacations") || "[]");
    setFollowedVacations(storedVacations);
  }, []);

  // Function to remove vacation from followed list
  const handleUnfollow = (vacationId: string) => {
    const updatedVacations = followedVacations.filter((vacation) => vacation.id !== vacationId);
    setFollowedVacations(updatedVacations);
    localStorage.setItem("followedVacations", JSON.stringify(updatedVacations)); // Save the updated list back to localStorage
  };

  return (
    <div>
      <h2>Your Followed Vacations</h2>
      {followedVacations.length === 0 ? (
        <p>You are not following any vacations yet.</p>
      ) : (
        <ul>
          {followedVacations.map((vacation) => (
            <li key={vacation.id}>
              {vacation.name}{" "}
              <button onClick={() => handleUnfollow(vacation.id)}>Unfollow</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Unfollow;
