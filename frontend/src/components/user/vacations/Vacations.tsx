import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Vacations.css";

interface Vacation {
  vacationId: string;
  vacationDestination: string;
  vacationDateStart: string;
  vacationDateEnd: string;
  followers: number;
  price: number;
  imgFileName: string;
  isActive: boolean;
  isUserFollowing: boolean;
  likes: number;
  vacationDescription: string;
}

export default function Vacations() {
  const navigate = useNavigate();
  const [vacations, setVacations] = useState<Vacation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const vacationsPerPage = 10;
  const [showFullDescription, setShowFullDescription] = useState<string | null>(null);

  // Fetch vacations
  const fetchVacations = async () => {
    try {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");
      const userId = userData ? JSON.parse(userData).id : null;
        console.log(userData)
      const response = await fetch("http://localhost:3000/api/users/vacations", {
        method: "POST", // changed to POST so we can send body
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId }), // or also vacationId if needed
      });
  
      if (!response.ok) {
        throw new Error(`Failed to load vacations: ${response.status} ${response.statusText}`);
      }
  
      const data: Vacation[] = await response.json();
      setVacations(data);
    } catch (err) {
      setError((err as Error).message || "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }

    fetchVacations();
  }, [navigate]);

  const toggleFollow = async (vacationId: string) => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    const userId = userData ? JSON.parse(userData).id : null;
  
    if (!token || !userId) {
      console.error("Missing token or user ID.");
      return;
    }
  
    // Get current state
    const vacation = vacations.find((v) => v.vacationId === vacationId);
    const wasFollowing = vacation?.isUserFollowing ?? false;
  
    // Optimistic UI update
    setVacations((prev) =>
      prev.map((v) =>
        v.vacationId === vacationId
          ? {
              ...v,
              isUserFollowing: !v.isUserFollowing,
              followers: v.isUserFollowing ? v.followers - 1 : v.followers + 1,
            }
          : v
      )
    );
  
    try {
      const url = wasFollowing
        ? `http://localhost:3000/api/users/unfollow/${vacationId}/${userId}`
        : "http://localhost:3000/api/users/follow";
  
      const method = wasFollowing ? "DELETE" : "POST";
  
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        ...(wasFollowing ? {} : { body: JSON.stringify({ vacationId, userId }) }),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to ${wasFollowing ? "unfollow" : "follow"}`);
      }
    } catch (error) {
      console.error("Toggle follow failed:", error);
  
      // Rollback
      setVacations((prev) =>
        prev.map((v) =>
          v.vacationId === vacationId
            ? {
                ...v,
                isUserFollowing: wasFollowing,
                followers: wasFollowing ? v.followers + 1 : v.followers - 1,
              }
            : v
        )
      );
    }
  }; 

  const toggleDescription = (vacationId: string) => {
    setShowFullDescription((prev) => (prev === vacationId ? null : vacationId));
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Pagination
  const indexOfLastVacation = currentPage * vacationsPerPage;
  const indexOfFirstVacation = indexOfLastVacation - vacationsPerPage;
  const currentVacations = vacations.slice(indexOfFirstVacation, indexOfLastVacation);
  const totalPages = Math.ceil(vacations.length / vacationsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="vacations-container">
      <h2>Vacations</h2>

      <div className="vacations-list">
        {currentVacations.length > 0 ? (
          currentVacations.map((vacation) => {
            const imageSrc = `/images/${vacation.imgFileName}`;
            const shortDescription = vacation.vacationDescription.slice(0, 150);

            return (
              <div key={vacation.vacationId} className="vacation-card">
                <div className="vacation-likes">
                <button
                  className={`like-button ${vacation.isUserFollowing ? "liked" : ""}`}
                  onClick={() => toggleFollow(vacation.vacationId)}
                >
                  ❤️ Like{vacation.followers !== 1 ? "s" : ""} {vacation.followers}
                </button>

                </div>

                <div className="vacation-image-container">
                  <img
                    src={imageSrc}
                    alt={vacation.vacationDestination}
                    className="vacation-image"
                  />
                  <div className="vacation-title">{vacation.vacationDestination}</div>
                  <div className="vacation-dates">
                    <span>
                      {formatDate(vacation.vacationDateStart)} - {formatDate(vacation.vacationDateEnd)}
                    </span>
                  </div>
                </div>

                <div
                  className={`vacation-description ${
                    showFullDescription === vacation.vacationId ? "expanded" : ""
                  }`}
                >
                  <p>
                    {showFullDescription === vacation.vacationId
                      ? vacation.vacationDescription
                      : shortDescription}
                  </p>
                  {vacation.vacationDescription.length > 150 && (
                    <button
                      onClick={() => toggleDescription(vacation.vacationId)}
                      className="read-more"
                    >
                      {showFullDescription === vacation.vacationId ? "Show Less" : "Read More"}
                    </button>
                  )}
                </div>

                <div className="vacation-price">
                  <span>${vacation.price}</span>
                </div>
              </div>
            );
          })
        ) : (
          <p>No vacations available at the moment.</p>
        )}
      </div>

      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
