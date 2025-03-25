import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // To handle navigation and access the vacation ID from URL
import "./EditVacation.css";

const EditVacation = () => {
  const { vacationId } = useParams(); // Get vacationId from the URL
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

  // Fetch vacation details by ID
  useEffect(() => {
    // Simulate API call to fetch vacation by ID
    // Replace with real API call (e.g., fetchVacation(vacationId))
    const fetchVacationDetails = () => {
      const fetchedVacation = {
        destination: "Hawaii",
        price: 2000,
        startDate: "2023-12-01",
        endDate: "2023-12-10",
        description: "A beautiful vacation in Hawaii.",
        imageUrl: "image-url-placeholder",
      };
      setVacation(fetchedVacation);
    };

    fetchVacationDetails();
  }, [vacationId]);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVacation({ ...vacation, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Send updated data to the server or local state
    console.log("Updated vacation details:", vacation);
    // Redirect after successful update
    navigate("/admin/vacations"); // Change to your vacation list page
  };

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
