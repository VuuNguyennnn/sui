import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

const MarketsPage = () => {
  const [data, setData] = useState([]);

  // Mock data for multiple exchanges (e.g., Binance, Coinbase, Kraken)
  const exchanges = ['Binance', 'Coinbase', 'Kraken'];
  const colors = {
    Binance: '#F0B90B',
    Coinbase: '#0052FF',
    Kraken: '#00D8FF',
  };

  useEffect(() => {
    // Initialize data with some random values
    const initData = exchanges.map(exchange => ({
      exchange,
      price: Math.random() * 100 + 100, // random between 100 and 200
    }));
    setData(initData);

    // Simulate real-time updates every 2 seconds
    const interval = setInterval(() => {
      setData(prevData =>
        prevData.map(item => ({
          ...item,
          price: Math.max(item.price + (Math.random() - 0.5) * 2, 0), // random walk
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Format data for recharts: we need a series of points over time for each exchange.
  // For simplicity, we'll keep only the last 30 points for each exchange.
  // We'll maintain a time series in state, but for brevity in this example, we'll just show current prices as a bar chart? 
  // However, the requirement is for charts. Let's change approach: keep a time series.

  // Let's rework: maintain a time series of prices for each exchange over the last 30 seconds.
  const [timeSeries, setTimeSeries] = useState(() => {
    const initial = {};
    exchanges.forEach(exchange => {
      initial[exchange] = Array.from({ length: 30 }, () => Math.random() * 100 + 100);
    });
    return initial;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSeries(prev => {
        const newPrev = {};
        exchanges.forEach(exchange => {
          const newPoints = [...prev[exchange]];
          newPoints.shift();
          const lastPrice = newPoints[newPoints.length - 1] || 100;
          const newPrice = Math.max(lastPrice + (Math.random() - 0.5) * 2, 0);
          newPoints.push(newPrice);
          newPrev[exchange] = newPoints;
        });
        return newPrev;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [exchanges]);

  // Prepare data for recharts: each point is { time: i, ...exchanges with prices }
  const chartData = Array.from({ length: 30 }, (_, i) => ({
    time: i + 1,
    ...Object.fromEntries(
      exchanges.map(exchange => [exchange, timeSeries[exchange][i]])
    ),
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-slate-100 p-6">
       <div className="flex items-center justify-center gap-4 mb-6">
         <TrendingUp className="h-6 w-6 text-[#4ca2ff] animate-pulse" />
         <h1 className="text-3xl font-bold text-center">Real-Time Market Charts</h1>
       </div>
      <div className="space-y-8">
        {exchanges.map(exchange => (
          <div key={exchange} className="glass-panel p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">{exchange} Price (USD)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" tick={{ count: 5 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey={exchange}
                  stroke={colors[exchange]}
                  strokeWidth={2}
                  dot={{ r: 4, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketsPage;