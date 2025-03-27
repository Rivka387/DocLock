import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import axios from "axios";
import userStore from "./userStore";
import { Box, Typography, Paper } from "@mui/material";

const url: string = `http://localhost:3000/api/UserActivity`;

const UserActivityGraphs: React.FC = () => {
  const [monthlyData, setMonthlyData] = useState<{ day: number; visits: number }[]>([]);
  const [yearlyData, setYearlyData] = useState<{ month: string; visits: number }[]>([]);
  
  const userId = userStore.getUserId();
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  useEffect(() => {
    if (userId) {
      fetchMonthlyUsage(userId, currentYear, currentMonth);
      fetchYearlyUsage(userId, currentYear);
    }
  }, [userId, currentYear, currentMonth]);

  const fetchMonthlyUsage = async (userId: number, year: number, month: number): Promise<void> => {
    try {
      const response = await axios.get<Record<string, number>>(
        `${url}/user-monthly-usage/${userId}`,
        {
          params: { year, month },
        }
      );

      const data = Array.from({ length: 31 }, (_, i) => ({
        day: i + 1,
        visits: response.data[i + 1] || 0,
      }));

      setMonthlyData(data);
    } catch (error) {
      console.error("Failed to fetch monthly usage:", error);
    }
  };

  const fetchYearlyUsage = async (userId: number, year: number): Promise<void> => {
    try {
      const response = await axios.get<Record<string, number>>(`${url}/user-yearly-usage/${userId}`, {
        params: { year },
      });

      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      
      const data = Array.from({ length: 12 }, (_, i) => ({
        month: monthNames[i],
        visits: response.data[i + 1] || 0,
      }));
     
      setYearlyData(data);
    } catch (error) {
      console.error("Failed to fetch yearly usage:", error);
    }
  };

  return (
    <Box display={{ xs: 'block', md: 'flex' }} justifyContent="space-between" p={3} width="100%">
      <Paper elevation={3} sx={{ flex: 1, mr: { md: 2 }, p: 2, borderRadius: 2, backgroundColor: '#f7f9fc' }}>
        <Typography variant="h6" fontWeight={600} color="#6fa8cb" textAlign="left" mb={2}>
          Monthly Activity
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="day" angle={-45} textAnchor="end" fontSize={12} />
            <YAxis domain={[0, 'dataMax']} />
            <Tooltip contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #ddd" }} />
            <Legend />
            <Bar dataKey="visits" fill="#6fa8cb" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Paper>

      <Paper elevation={3} sx={{ flex: 1, ml: { md: 2 }, p: 2, borderRadius: 2, backgroundColor: '#f7f9fc' }}>
        <Typography variant="h6" fontWeight={600} color="#74ad7d" textAlign="left" mb={2}>
          Yearly Activity
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={yearlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="month" angle={-45} textAnchor="end" fontSize={12} />
            <YAxis domain={[0, 'dataMax']} />
            <Tooltip contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #ddd" }} />
            <Legend />
            <Line type="monotone" dataKey="visits" stroke="#74ad7d" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
};

export default UserActivityGraphs;
