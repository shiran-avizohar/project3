import { useState, useEffect } from "react";
import "./Vacations.css";
import { useNavigate } from "react-router-dom";

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

  const fetchVacations = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/users/vacations");
      if (!response.ok) {
        throw new Error(
          `Failed to load vacations: ${response.status} ${response.statusText}`
        );
      }

      const data: Vacation[] = await response.json();
      const storedFollowed = JSON.parse(
        localStorage.getItem("followedVacations") || "[]"
      );

      const updatedData = data.map((vacation: Vacation) => {
        const matched = storedFollowed.find(
          (v: Vacation) => v.vacationId === vacation.vacationId
        );
        return {
          ...vacation,
          likes: matched?.likes || vacation.likes || 0,
          isUserFollowing: !!matched,
        };
      });

      setVacations(updatedData);
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

  const toggleFollow = (vacationId: string) => {
    setVacations((prev) =>
      prev.map((v) =>
        v.vacationId === vacationId
          ? {
              ...v,
              isUserFollowing: !v.isUserFollowing,
              likes: v.isUserFollowing ? v.likes - 1 : v.likes + 1,
            }
          : v
      )
    );

    const followed = JSON.parse(
      localStorage.getItem("followedVacations") || "[]"
    );
    const vacation = vacations.find((v) => v.vacationId === vacationId);
    if (!vacation) return;

    const isAlreadyFollowed = followed.some(
      (v: Vacation) => v.vacationId === vacationId
    );

    const updatedFollowed = isAlreadyFollowed
      ? followed.filter((v: Vacation) => v.vacationId !== vacationId)
      : [...followed, { ...vacation, likes: vacation.likes + 1 }];

    localStorage.setItem("followedVacations", JSON.stringify(updatedFollowed));
  };

  const [showFullDescription, setShowFullDescription] = useState<string | null>(
    null
  );

  const toggleDescription = (vacationId: string) => {
    if (showFullDescription === vacationId) {
      setShowFullDescription(null);
    } else {
      setShowFullDescription(vacationId);
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="vacations-container">
      <h2>Vacations</h2>

      <div className="vacations-list">
        {vacations.length > 0 ? (
          vacations.map((vacation) => {
            const imageSrc = `/images/${vacation.imgFileName}`;
            const shortDescription = vacation.vacationDescription.slice(0, 150);

            return (
              <div key={vacation.vacationId} className="vacation-card">
                {/* LIKE section */}
                <div className="vacation-likes">
                  <button
                    className={`like-button ${
                      vacation.isUserFollowing ? "liked" : ""
                    }`}
                    onClick={() => toggleFollow(vacation.vacationId)}
                  >
                    ❤️ Like{vacation.likes !== 1 ? "s" : ""} {vacation.likes}
                  </button>
                </div>

                {/* Vacation Title */}
                <div className="vacation-title">
                  {vacation.vacationDestination}
                </div>

                {/* Vacation Image */}
                <div className="vacation-image-container">
                  <img
                    src={imageSrc}
                    alt={vacation.vacationDestination}
                    className="vacation-image"
                  />
                </div>

                {/* Vacation Dates */}
                <div className="vacation-dates">
                  <span>
                    {formatDate(vacation.vacationDateStart)} -{" "}
                    {formatDate(vacation.vacationDateEnd)}
                  </span>
                </div>

                {/* Vacation Description */}
                <div
                  className={`vacation-description ${
                    showFullDescription === vacation.vacationId
                      ? "expanded"
                      : ""
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
                      {showFullDescription === vacation.vacationId
                        ? "Show Less"
                        : "Read More"}
                    </button>
                  )}
                </div>

                {/* Vacation Price */}
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
    </div>
  );
}
