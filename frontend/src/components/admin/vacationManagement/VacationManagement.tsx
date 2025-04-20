import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./VacationManagement.css";

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
  const [editingVacation, setEditingVacation] = useState<Vacation | null>(null);
  const [formData, setFormData] = useState<Omit<Vacation, "vacationId">>({
    vacationDestination: "",
    vacationDateStart: "",
    vacationDateEnd: "",
    price: 0,
    imgFileName: "",
    vacationDescription: "",
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null); // תמונה חדשה שנבחרה
  const [imagePreview, setImagePreview] = useState<string | null>(null); // תצוגה מקדימה של התמונה

  const [expandedDescriptions, setExpandedDescriptions] = useState<
    Record<string, boolean>
  >({});

  const [currentPage, setCurrentPage] = useState<number>(1); // מספר הדף הנוכחי
  const [vacationsPerPage] = useState<number>(10); // מספר חופשות פר דף

  const toggleDescription = (vacationId: string) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [vacationId]: !prev[vacationId],
    }));
  };

  const fetchVacations = async () => {
    try {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");
      const userId = userData ? JSON.parse(userData).id : null;
      console.log(userData);
      const response = await fetch(
        "http://localhost:3000/api/users/vacations",
        {
          method: "POST", // changed to POST so we can send body
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId }), // or also vacationId if needed
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to load vacations: ${response.status} ${response.statusText}`
        );
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

    if (!user || JSON.parse(user).role !== "admin") {
      navigate("/login", { replace: true });
      return;
    }

    fetchVacations();
  }, [navigate]);

  const handleDelete = (vacationId: string) => {
    if (window.confirm("Are you sure you want to delete this vacation?")) {
      deleteVacation(vacationId);
    }
  };

  const deleteVacation = async (vacationId: string) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("You need to be logged in to update vacation details");
        return;
      }

      const response = await fetch(
        `http://localhost:3000/api/admins/${vacationId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorMessage = `Failed to delete vacation: ${response.status} - ${response.statusText}`;
        throw new Error(errorMessage);
      }

      setVacations((prev) =>
        prev.filter((vacation) => vacation.vacationId !== vacationId)
      );
      alert("Vacation deleted successfully");
    } catch (err) {
      setError(
        (err as Error).message || "An error occurred while deleting vacation."
      );
    }
  };

  const handleEdit = (vacation: Vacation) => {
    setEditingVacation(vacation);
    setFormData({
      vacationDestination: vacation.vacationDestination,
      vacationDateStart: vacation.vacationDateStart,
      vacationDateEnd: vacation.vacationDateEnd,
      price: vacation.price,
      imgFileName: vacation.imgFileName,
      vacationDescription: vacation.vacationDescription,
    });
    setImagePreview(`/images/${vacation.imgFileName}`); // מציג תצוגה מקדימה של התמונה הנוכחית
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file)); // מציג תצוגה מקדימה של התמונה החדשה
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Missing authentication token. Please login again.");
      return;
    }
    if (editingVacation) {
      const updatedData = {
        ...formData,
        imgFileName: selectedImage?.name || formData.imgFileName,
      };

      try {
        const response = await fetch(
          `http://localhost:3000/api/admins/vacations/${editingVacation.vacationId}`,
          {
            method: "PUT",
            body: JSON.stringify(updatedData),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const data = await response.json();
          throw new Error(
            data.message || `Failed to update vacation: ${response.status}`
          );
        }

        alert("Vacation updated successfully");
        setEditingVacation(null);
        fetchVacations();
      } catch (err) {
        setError(
          (err as Error).message || "An error occurred while updating vacation."
        );
      }
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // חישוב החופשות המוצגות בדף הנוכחי
  const indexOfLastVacation = currentPage * vacationsPerPage;
  const indexOfFirstVacation = indexOfLastVacation - vacationsPerPage;
  const currentVacations = vacations.slice(
    indexOfFirstVacation,
    indexOfLastVacation
  );

  // דף קודם
  const paginatePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  // דף הבא
  const paginateNext = () => setCurrentPage((prev) => prev + 1);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="manage-vacations-container">
      <h2>Vacations Management</h2>
      <button
        className="add-vacation-btn"
        onClick={() => navigate("/admin/addVacation")}
      >
        Add New Vacation
      </button>

      {/* Modal for editing */}
      {editingVacation && (
        <div className="modal-overlay">
          <div className="modal-content">
            <form onSubmit={handleFormSubmit}>
              <h3>Edit Vacation</h3>

              <div className="form-group">
                <label htmlFor="vacationDestination">Vacation Name:</label>
                <input
                  type="text"
                  name="vacationDestination"
                  value={formData.vacationDestination}
                  onChange={handleFormChange}
                  placeholder="Enter vacation name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="vacationDateStart">Start Date:</label>
                <input
                  type="date"
                  name="vacationDateStart"
                  value={formData.vacationDateStart}
                  onChange={handleFormChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="vacationDateEnd">End Date:</label>
                <input
                  type="date"
                  name="vacationDateEnd"
                  value={formData.vacationDateEnd}
                  onChange={handleFormChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="price">Price:</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleFormChange}
                  placeholder="Enter price"
                />
              </div>

              <div className="form-group">
                <label htmlFor="vacationDescription">Description:</label>
                <textarea
                  name="vacationDescription"
                  value={formData.vacationDescription}
                  onChange={handleFormChange}
                  placeholder="Enter vacation description"
                />
              </div>

              <div className="form-group">
                <label>Update Image</label>
                {imagePreview && (
                  <div>
                    <img
                      src={imagePreview}
                      alt="Current Preview"
                      width="100%"
                    />
                  </div>
                )}
                <input type="file" onChange={handleImageChange} />
              </div>

              <button type="submit">Save Changes</button>
              <button
                type="button"
                onClick={() => setEditingVacation(null)}
                className="cancel-btn"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="vacations-list">
        {currentVacations.length > 0 ? (
          currentVacations.map((vacation) => {
            const imageSrc = `/images/${vacation.imgFileName}`;
            const isExpanded =
              expandedDescriptions[vacation.vacationId] || false;
            const description = isExpanded
              ? vacation.vacationDescription
              : `${vacation.vacationDescription.slice(0, 150)}...`;

            return (
              <div key={vacation.vacationId} className="vacation-card">
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
                  <p>{description}</p>
                  {vacation.vacationDescription.length > 150 && (
                    <button
                      className="toggle-description-btn"
                      onClick={() => toggleDescription(vacation.vacationId)}
                    >
                      {isExpanded ? "Show less" : "Read more"}
                    </button>
                  )}
                </div>
                <div className="vacation-price">
                  <span>${vacation.price}</span>
                </div>
                <div className="vacation-actions">
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(vacation)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(vacation.vacationId)}
                  >
                    Delete
                  </button>
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
        <button onClick={paginatePrev} disabled={currentPage === 1}>
          Previous
        </button>

        <button
          onClick={paginateNext}
          disabled={indexOfLastVacation >= vacations.length}
        >
          Next
        </button>
      </div>
    </div>
  );
}
