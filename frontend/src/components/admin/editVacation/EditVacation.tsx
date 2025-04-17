import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // To handle navigation and access the vacation ID from URL
import "./EditVacation.css";

const EditVacation = () => {
  const { id } = useParams(); // Get vacationId from the URL
  const navigate = useNavigate(); // To navigate after the form is submitted

  // Define state for vacation details
  const [vacation, setVacation] = useState({
    vacationDestination: "",
    price: 0,
    vacationDateStart: "",
    vacationDateEnd: "",
    vacationDescription: "",
    imgFileName: "",
  });

  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState<string | null>(null); // State for error messages

  // Fetch vacation details by ID
  useEffect(() => {
    const fetchVacationDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/admins/vacations/${id}`
        );
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

    // Get token from localStorage
    const token = localStorage.getItem("token"); // Get the token from localStorage

    if (!token) {
      setError("You need to be logged in to update vacation details");
      return;
    }

    try {
      console.log(JSON.stringify(vacation))
      const response = await fetch(
        `http://localhost:3000/api/admins/vacations/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add token in Authorization header
          },
          body: JSON.stringify(vacation),
        }
      );
      const textResponse = await response.text();
      console.log("Response text:", textResponse);

      if (!response.ok) throw new Error("Failed to update vacation");

      // Redirect to admin dashboard after successful update
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
            id="vacationDestination"
            name="vacationDestination"
            value={vacation.vacationDestination}
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
            id="vacationDateStart"
            name="vacationDateStart"
            value={vacation.vacationDateStart}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            id="vacationDateEnd"
            name="vacationDateEnd"
            value={vacation.vacationDateEnd}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="vacationDescription"
            name="vacationDescription"
            value={vacation.vacationDescription}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="text"
            id="imgFileName"
            name="imgFileName"
            value={vacation.imgFileName}
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
