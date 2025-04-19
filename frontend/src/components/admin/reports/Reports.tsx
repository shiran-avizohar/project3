import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import './Reports.css';
import CsvDownload from '../csvDownload/CsvDownload';

type Vacation = {
  vacationId: string;
  vacationDestination: string;
  followers: number;
  price: number;
  vacationDateStart: string;
  vacationDateEnd: string;
};

const Reports = () => {
  const [vacations, setVacations] = useState<Vacation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const fetchVacations = async () => {
    try {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");
      const userId = userData ? JSON.parse(userData).id : null;
        console.log(userData)
      const response = await fetch("http://localhost:3000/api/users/vacations", {
        method: "POST", // changed to POST so we can send body
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId }), // or also vacationId if needed
      });
  
      if (!response.ok) {
        throw new Error(`Failed to load vacations: ${response.status} ${response.statusText}`);
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
    fetchVacations();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="admin-reports-container">
      <div className="reports-header">
        <h1> Vacation Reports </h1>
        <button onClick={fetchVacations} className="refresh-btn">🔄refresh</button>
      </div>

      <ResponsiveContainer width="100%" height={450}>
        <LineChart data={vacations} margin={{ top: 30, right: 30, left: 20, bottom: 50 }}>
          <defs>
            <linearGradient id="colorFollowers" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#8884d8" stopOpacity={0.2} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis 
            dataKey="vacationDestination" 
            angle={-30} 
            textAnchor="end" 
            interval={0}
            height={70}
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            label={{ value: 'Followers', angle: -90, position: 'insideLeft' }}
            tick={{ fontSize: 12 }}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: "#f9f9f9", border: "1px solid #ccc" }} 
            labelStyle={{ fontWeight: "bold" }}
          />
          <Legend verticalAlign="top" height={36} />
          <Line 
            type="monotone" 
            dataKey="followers" 
            stroke="#8884d8" 
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
            fillOpacity={1} 
            fill="url(#colorFollowers)" 
          />
        </LineChart>
      </ResponsiveContainer>

      <CsvDownload vacationData={vacations} />
    </div>
  );
};

export default Reports;
