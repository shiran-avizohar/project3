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
  const [filteredVacations, setFilteredVacations] = useState<Vacation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const vacationsPerPage = 10;
  const [filterOption, setFilterOption] = useState<string>("");

  // Fetch vacations
  const fetchVacations = async () => {
    try {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");
      const userId = userData ? JSON.parse(userData).id : null;

      const response = await fetch(
        "http://localhost:3000/api/users/vacations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to load vacations: ${response.status} ${response.statusText}`
        );
      }

      const data: Vacation[] = await response.json();
      setVacations(data);
      setFilteredVacations(data); // Initially show all vacations
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

  useEffect(() => {
    let filtered = vacations;

    switch (filterOption) {
      case "followed":
        filtered = filtered.filter((vacation) => vacation.isUserFollowing);
        break;
      case "not-started":
        filtered = filtered.filter(
          (vacation) => new Date(vacation.vacationDateStart) > new Date()
        );
        break;
      case "active":
        filtered = filtered.filter((vacation) => {
          const today = new Date();
          return (
            new Date(vacation.vacationDateStart) <= today &&
            new Date(vacation.vacationDateEnd) >= today
          );
        });
        break;
      default:
        filtered = vacations; // Show all vacations when no filter is selected
    }

    setFilteredVacations(filtered);
    setCurrentPage(1); // Reset to first page when applying filters
  }, [filterOption, vacations]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterOption(event.target.value);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const indexOfLastVacation = currentPage * vacationsPerPage;
  const indexOfFirstVacation = indexOfLastVacation - vacationsPerPage;
  const currentVacations = filteredVacations.slice(
    indexOfFirstVacation,
    indexOfLastVacation
  );
  const totalPages = Math.ceil(filteredVacations.length / vacationsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="vacations-container">
      <h2>Vacations</h2>

      {/* Filter Selector */}
      <div className="filter-container">
        <label htmlFor="filter" className="filter-label">Sort By</label>
        <select
          id="filter"
          value={filterOption}
          onChange={handleFilterChange}
          className="filter-select"
        >
          <option value="">All Vacations</option>
          <option value="followed">Followed Vacations</option>
          <option value="not-started">Vacations Not Started</option>
          <option value="active">Active Vacations</option>
        </select>
      </div>

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
                  >
                    ❤️ Like {vacation.followers}
                  </button>
                </div>

                <div className="vacation-image-container">
                  <img
                    src={imageSrc}
                    alt={vacation.vacationDestination}
                    className="vacation-image"
                  />
                  <div className="vacation-title">
                    {vacation.vacationDestination}
                  </div>
                </div>
                <div className="vacation-dates">
                  <span>
                    {formatDate(vacation.vacationDateStart)} -{" "}
                    {formatDate(vacation.vacationDateEnd)}
                  </span>
                </div>

                <div className="vacation-description">
                  <p>{shortDescription}</p>
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

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
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
