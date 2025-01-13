import { useState } from 'react';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  SelectChangeEvent,
} from '@mui/material';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Breadcrumb } from '../../components/Breadcrumb';
import { BillingData, ChartType } from './types';

// Mock data - replace with actual API call
const mockBillingData: BillingData[] = [
  { month: 'Jan 2025', cost: 1200, description: '120 user logins @ $10/login' },
  { month: 'Feb 2025', cost: 1500, description: '150 user logins @ $10/login' },
  { month: 'Mar 2025', cost: 1800, description: '180 user logins @ $10/login' },
  { month: 'Apr 2025', cost: 2000, description: '200 user logins @ $10/login' },
  { month: 'May 2025', cost: 2200, description: '220 user logins @ $10/login' },
  { month: 'Jun 2025', cost: 2500, description: '250 user logins @ $10/login' },
];

export const BillingTracking = () => {
  const [chartType, setChartType] = useState<ChartType>('bar');

  const renderChart = () => {
    const ChartComponent = chartType === 'bar' ? BarChart : LineChart;
    const DataComponent = chartType === 'bar' ? Bar : Line;

    return (
      <ResponsiveContainer width="100%" height={400}>
        <ChartComponent data={mockBillingData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis
            label={{ value: 'Cost ($)', angle: -90, position: 'insideLeft' }}
            width={80}
          />
          <Tooltip />
          <DataComponent
            type="monotone"
            dataKey="cost"
            fill="#0D1B3F"
            stroke="#0D1B3F"
          />
        </ChartComponent>
      </ResponsiveContainer>
    );
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 1200 }}>
      <Breadcrumb />
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ 
          fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
          fontWeight: 600,
          mb: 1
        }}
      >
        Billing Tracking
      </Typography>
      <Typography 
        variant="body1" 
        sx={{ 
          color: 'text.secondary',
          mb: 4,
          fontSize: { xs: '1rem', sm: '1.1rem' }
        }}
      >
        Monitor your workspace's monthly billing consumption
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }} elevation={1}>
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end" sx={{ mb: 3 }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select
              value={chartType}
              onChange={(e: SelectChangeEvent) => setChartType(e.target.value as ChartType)}
            >
              <MenuItem value="bar">Bar Chart</MenuItem>
              <MenuItem value="line">Line Chart</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        {renderChart()}
      </Paper>

      <Paper sx={{ width: '100%', overflow: 'hidden' }} elevation={1}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Month</TableCell>
                <TableCell align="right">Cost</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockBillingData.map((data) => (
                <TableRow key={data.month}>
                  <TableCell>{data.month}</TableCell>
                  <TableCell align="right">${data.cost.toLocaleString()}</TableCell>
                  <TableCell>{data.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};
