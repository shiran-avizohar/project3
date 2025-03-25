import { useState } from "react";
import "./AddVacation.css"; // Importing the CSS file for styling

const AddVacation = () => {
  // State to store vacation details entered by the admin
  const [vacation, setVacation] = useState({
    destination: "",
    price: "",
    startDate: "",
    endDate: "",
    description: "",
    imageUrl: "",
  });

  // Function to handle changes in the form fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setVacation({
      ...vacation,
      [name]: value, // Update the specific field based on the input name
    });
  };

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Log the vacation details (replace with API call to save the vacation)
    console.log("Vacation Added:", vacation);
    // Clear the form fields after submission
    setVacation({
      destination: "",
      price: "",
      startDate: "",
      endDate: "",
      description: "",
      imageUrl: "",
    });
  };

  return (
    <div className="add-vacation-container">
      <h1>Add a New Vacation</h1>
      <form onSubmit={handleSubmit}>
        {/* Destination Field */}
        <div className="form-group">
          <label>Destination</label>
          <input
            type="text"
            name="destination"
            value={vacation.destination}
            onChange={handleChange}
            required // Make this field required
          />
        </div>

        {/* Price Field */}
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={vacation.price}
            onChange={handleChange}
            required // Make this field required
          />
        </div>

        {/* Start Date Field */}
        <div className="form-group">
          <label>Start Date</label>
          <input
            type="date"
            name="startDate"
            value={vacation.startDate}
            onChange={handleChange}
            required // Make this field required
          />
        </div>

        {/* End Date Field */}
        <div className="form-group">
          <label>End Date</label>
          <input
            type="date"
            name="endDate"
            value={vacation.endDate}
            onChange={handleChange}
            required // Make this field required
          />
        </div>

        {/* Description Field */}
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={vacation.description}
            onChange={handleChange}
            required // Make this field required
          />
        </div>

        {/* Image URL Field */}
        <div className="form-group">
          <label>Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={vacation.imageUrl}
            onChange={handleChange}
            required // Make this field required
          />
        </div>

        {/* Submit Button */}
        <button type="submit">Add Vacation</button>
      </form>
    </div>
  );
};

export default AddVacation;
