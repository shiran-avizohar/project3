import  { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Reports.css';
import CsvDownload from '../csvDownload/CsvDownload';

// Dummy vacation data (replace with real data or API call)
const vacationData = [
  { destination: 'Hawaii', followers: 150 },
  { destination: 'Paris', followers: 200 },
  { destination: 'Tokyo', followers: 100 },
  { destination: 'New York', followers: 250 },
  { destination: 'London', followers: 300 },
];

const AdminVacationReports = () => {
  const [vacations, setVacations] = useState(vacationData);

  // Fetch data (this can be replaced with an API call)
  useEffect(() => {
    // Replace with real API call to fetch vacation data
    setVacations(vacationData);
  }, []);

  return (
    <div className="admin-reports-container">
      <h1>Vacation Reports</h1>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={vacations}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="destination" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="followers" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
            {/* CSV Download Button */}
     <CsvDownload />
    </div>
  );
};

export default AdminVacationReports;
