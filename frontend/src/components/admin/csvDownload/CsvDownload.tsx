// CsvDownloadButton.tsx
import React from 'react';
import './CsvDownload.css';

// Sample data for demonstration
const vacationData = [
  { destination: "Hawaii", followers: 150 },
  { destination: "Paris", followers: 200 },
  { destination: "Tokyo", followers: 120 },
  // Add more vacation data as needed
];

// Component to handle CSV export
const CsvDownloadButton: React.FC = () => {
  // Function to export data to CSV
  const exportToCSV = () => {
    // Define the CSV header
    const header = ["Destination", "Followers"];
    
    // Map through the data and create rows
    const rows = vacationData.map(item => [
      item.destination,
      item.followers,
    ]);

    // Combine header and rows
    const csvContent = [
      header.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");

    // Create a Blob with the CSV content
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    // Create a link to download the CSV file
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "vacation_report.csv"; // File name for download
    link.click(); // Trigger the download
  };

  return (
    <button onClick={exportToCSV}>Download CSV</button>
  );
};

export default CsvDownloadButton;
