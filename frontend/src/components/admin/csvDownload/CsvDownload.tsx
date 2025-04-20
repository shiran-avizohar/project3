import React from 'react';
import './CsvDownload.css';

// Props interface for the component
interface CsvDownloadButtonProps {
  vacationData: {
    vacationId: string;
    vacationDestination: string;
    followers: number;
    price: number;
    vacationDateStart: string;
    vacationDateEnd: string;
  }[];
}

const CsvDownloadButton: React.FC<CsvDownloadButtonProps> = ({ vacationData }) => {
  // Function to export the data to CSV format
  const exportToCSV = () => {
    // Define the CSV header
    const header = ["Destination", "Followers"];
    
    // Map through vacation data and create rows
    const rows = vacationData.map(item => [
      item.vacationDestination,
      item.followers,
    ]);

    // Combine the header and the data rows
    const csvContent = [
      header.join(","),            
      ...rows.map(row => row.join(",")) 
    ].join("\n");

    // Create a Blob with the CSV content
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    // Create a download link and trigger click to download the CSV
    const link = document.createElement("a");
    const timestamp = new Date().toISOString().split("T")[0]; 
    link.href = URL.createObjectURL(blob);
    link.download = `vacation_report_${timestamp}.csv`; 
    link.click();
  };

  return (
    <button onClick={exportToCSV}>Download CSV</button>
  );
};

export default CsvDownloadButton;
