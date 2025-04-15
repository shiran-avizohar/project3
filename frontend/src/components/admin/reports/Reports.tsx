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

  useEffect(() => {
    const fetchVacations = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/users/vacations', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) throw new Error('Failed to fetch vacation data.');

        const data: Vacation[] = await response.json();
        setVacations(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchVacations();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="admin-reports-container">
      <h1>Vacation Reports</h1>

      <ResponsiveContainer width="100%" height={450}>
        <LineChart data={vacations} margin={{ top: 30, right: 30, left: 20, bottom: 50 }}>
          {/* Define background gradient */}
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
