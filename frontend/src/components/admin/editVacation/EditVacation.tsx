import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // To handle navigation and access the vacation ID from URL
import "./EditVacation.css";

const EditVacation = () => {
  const { id } = useParams(); // Get vacationId from the URL
  const navigate = useNavigate(); // To navigate after the form is submitted

  // Define state for vacation details
  const [vacation, setVacation] = useState({
    destination: "",
    price: 0,
    startDate: "",
    endDate: "",
    description: "",
    imageUrl: "",
  });

  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState<string | null>(null); // State for error messages

  // Fetch vacation details by ID
  useEffect(() => {
    const fetchVacationDetails = async () => {
      try {
        const response = await fetch(`/api/vacations/${id}`);
        if (!response.ok) throw new Error("Failed to fetch vacation details");
        const data = await response.json();
        setVacation(data);
      } catch (error) {
        console.error(error);
        setError("Something went wrong while fetching vacation details");
      } finally {
        setLoading(false); // Set loading to false once the request finishes
      }
    };
    fetchVacationDetails();
  }, [id]);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVacation({ ...vacation, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/vacations/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(vacation),
      });
      if (!response.ok) throw new Error("Failed to update vacation");
      navigate("/admin/dashboard");
    } catch (error) {
      console.error(error);
      setError("Failed to update vacation");
    }
  };

  // If data is still loading, show loading message or spinner
  if (loading) {
    return <div>Loading...</div>;
  }

  // If there's an error fetching or submitting, display the error message
  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="edit-vacation-container">
      <h2>Edit Vacation</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="destination">Destination</label>
          <input
            type="text"
            id="destination"
            name="destination"
            value={vacation.destination}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={vacation.price}
            onChange={handleChange}
            required
            min="0"
          />
        </div>
        <div className="form-group">
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={vacation.startDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={vacation.endDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={vacation.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={vacation.imageUrl}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditVacation;
