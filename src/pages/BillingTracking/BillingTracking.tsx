import { useState } from 'react';
import * as Chakra from '@chakra-ui/react';
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
import { Card } from '../../components/Card';
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
    <Chakra.Box>
      <Breadcrumb />
      <Chakra.Heading size="lg" mb={2} color="black">
        Billing Tracking
      </Chakra.Heading>
      <Chakra.Text mb={6} color="gray.600">
        Monitor your workspace's monthly billing consumption
      </Chakra.Text>

      <Card mb={6}>
        <Chakra.HStack mb={4} justify="flex-end">
          <Chakra.Select
            value={chartType}
            onChange={(e) => setChartType(e.target.value as ChartType)}
            width="auto"
          >
            <option value="bar">Bar Chart</option>
            <option value="line">Line Chart</option>
          </Chakra.Select>
        </Chakra.HStack>
        {renderChart()}
      </Card>

      <Card>
        <Chakra.TableContainer>
          <Chakra.Table variant="simple">
            <Chakra.Thead>
              <Chakra.Tr>
                <Chakra.Th>Month</Chakra.Th>
                <Chakra.Th isNumeric>Cost</Chakra.Th>
                <Chakra.Th>Description</Chakra.Th>
              </Chakra.Tr>
            </Chakra.Thead>
            <Chakra.Tbody>
              {mockBillingData.map((data) => (
                <Chakra.Tr key={data.month}>
                  <Chakra.Td>{data.month}</Chakra.Td>
                  <Chakra.Td isNumeric>${data.cost.toLocaleString()}</Chakra.Td>
                  <Chakra.Td>{data.description}</Chakra.Td>
                </Chakra.Tr>
              ))}
            </Chakra.Tbody>
          </Chakra.Table>
        </Chakra.TableContainer>
      </Card>
    </Chakra.Box>
  );
};
