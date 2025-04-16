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
    image: null as File | null, // Store image as a file object
  });

  // Function to handle changes in the form fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setVacation({
      ...vacation,
      [name]: value, // Update the specific field based on the input name
    });
  };

  // Function to handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setVacation({
        ...vacation,
        image: file, // Store the file object
      });
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create FormData to send all the data, including the image
    const formData = new FormData();
    formData.append("vacationDestination", vacation.destination);
    formData.append("price", vacation.price);
    formData.append("vacationDateStart", vacation.startDate);
    formData.append("vacationDateEnd", vacation.endDate);
    formData.append("vacationDescription", vacation.description);
    if (vacation.image) {
      formData.append("imgFileName", vacation.image.name);
    }

    try {
      const token = localStorage.getItem("token");
      console.log(token)
      // Send data to the server (API)
      const response = await fetch("http://localhost:3000/api/admins", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text(); 
        console.error("Server response:", errorText);
        throw new Error("Failed to add vacation");
      }

      // If successful, update the UI
      alert("Vacation added successfully!");
      // Clear form fields after submission
      setVacation({
        destination: "",
        price: "",
        startDate: "",
        endDate: "",
        description: "",
        image: null,
      });
    } catch (error) {
      console.error("Error while adding vacation:", error);
      alert("There was an error adding the vacation.");
    }
  };

  // Function to handle cancel
  const handleCancel = () => {
    setVacation({
      destination: "",
      price: "",
      startDate: "",
      endDate: "",
      description: "",
      image: null,
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

        {/* Image Upload Field */}
        <div className="form-group">
          <label>Cover Image</label>
          <input
            type="file"
            name="image"
            accept="image/*" // Accept only image files
            onChange={handleImageChange}
            required // Make this field required
          />
          {/* Display the uploaded image */}
          {vacation.image && (
            <div className="image-preview">
              <img
                src={URL.createObjectURL(vacation.image)} // Display image preview
                alt="Cover Image"
                style={{ width: "200px", height: "auto", marginTop: "10px" }}
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit">Add Vacation</button>

        {/* Cancel Button */}
        <button type="button" className="cancel-button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddVacation;
