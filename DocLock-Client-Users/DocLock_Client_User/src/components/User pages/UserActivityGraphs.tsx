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
import { Box, Typography, Paper, IconButton, CircularProgress } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

const url: string = `http://localhost:3000/api/UserActivity`;

const UserActivityGraphs: React.FC = () => {
  const [monthlyData, setMonthlyData] = useState<{ day: number; visits: number }[]>([]);
  const [yearlyData, setYearlyData] = useState<{ month: string; visits: number }[]>([]);
  const [isLoadingMonthly, setIsLoadingMonthly] = useState(true);
  const [isLoadingYearly, setIsLoadingYearly] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());

  const userId = userStore.getUserId();

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
      setErrorMessage("Failed to fetch monthly usage.");
    } finally {
      setIsLoadingMonthly(false);
    }
  };

  const fetchYearlyUsage = async (userId: number, year: number): Promise<void> => {
    try {
      const response = await axios.get<Record<string, number>>(
        `${url}/user-yearly-usage/${userId}`,
        {
          params: { year },
        }
      );

      const monthNames = [
        "January", "February", "March", "April", "May", "June", "July", "August", 
        "September", "October", "November", "December"
      ];

      const data = Array.from({ length: 12 }, (_, i) => ({
        month: monthNames[i],
        visits: response.data[i + 1] || 0,
      }));

      setYearlyData(data);
    } catch (error) {
      setErrorMessage("Failed to fetch yearly usage.");
    } finally {
      setIsLoadingYearly(false);
    }
  };

  const handlePrevMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 1 ? 12 : prevMonth - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 12 ? 1 : prevMonth + 1));
  };

  const handlePrevYear = () => {
    setCurrentYear((prevYear) => prevYear - 1);
  };

  const handleNextYear = () => {
    setCurrentYear((prevYear) => prevYear + 1);
  };

  return (
    <Box display={{ xs: "block", md: "flex" }} justifyContent="space-between" p={3} width="100%">
      {/* Monthly Activity */}
      <Paper elevation={3} sx={{ flex: 1, mr: { md: 2 }, p: 2, borderRadius: 2, backgroundColor: "#f7f9fc" }}>
        <Typography variant="h6" fontWeight={600} color="#6fa8cb" textAlign="left" mb={2}>
          Monthly Activity
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <IconButton onClick={handlePrevMonth} color="primary">
            <ArrowBack />
          </IconButton>
          <Typography variant="subtitle1" fontWeight={500}>
            {`${new Date(currentYear, currentMonth - 1).toLocaleString('default', { month: 'long' })} ${currentYear}`}
          </Typography>
          <IconButton onClick={handleNextMonth} color="primary">
            <ArrowForward />
          </IconButton>
        </Box>

        {isLoadingMonthly ? (
          <Box display="flex" justifyContent="center" alignItems="center" height={300}>
            <CircularProgress />
          </Box>
        ) : errorMessage ? (
          <Typography color="error" align="center">{errorMessage}</Typography>
        ) : (
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
        )}
      </Paper>

      {/* Yearly Activity */}
      <Paper elevation={3} sx={{ flex: 1, ml: { md: 2 }, p: 2, borderRadius: 2, backgroundColor: "#f7f9fc" }}>
        <Typography variant="h6" fontWeight={600} color="#74ad7d" textAlign="left" mb={2}>
          Yearly Activity
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <IconButton onClick={handlePrevYear} color="primary">
            <ArrowBack />
          </IconButton>
          <Typography variant="subtitle1" fontWeight={500}>
            {currentYear}
          </Typography>
          <IconButton onClick={handleNextYear} color="primary">
            <ArrowForward />
          </IconButton>
        </Box>

        {isLoadingYearly ? (
          <Box display="flex" justifyContent="center" alignItems="center" height={300}>
            <CircularProgress />
          </Box>
        ) : errorMessage ? (
          <Typography color="error" align="center">{errorMessage}</Typography>
        ) : (
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
        )}
      </Paper>
    </Box>
  );
};

export default UserActivityGraphs;
