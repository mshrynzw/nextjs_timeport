"use client";

import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";

interface PayrollChartProps {
  payrollData: Array<{
    month: string;
    totalPay: number;
    totalDeduction: number;
    netPay: number;
  }>;
}

export function PayrollChart({ payrollData }: PayrollChartProps) {
  const formatMonth = (month: string) => {
    const [year, monthNum] = month.split('-');
    return `${year}/${monthNum}`;
  };

  const chartData = payrollData.map(data => ({
    ...data,
    month: formatMonth(data.month)
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-xl border border-gray-200">
          <p className="font-semibold text-gray-800 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: ¥{entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="mb-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 tracking-wide">給与推移チャート</h2>
        <p className="text-gray-600 mt-1">過去12ヶ月の給与変動</p>
      </div>

      <Card className="p-8 bg-gradient-to-br from-white/90 to-purple-50/90 backdrop-blur-sm border-0 shadow-2xl">
        <div className="flex items-center mb-6">
          <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 mr-4 shadow-lg">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">月次給与推移</h3>
            <p className="text-gray-600">支給・控除・差引支給額の変動</p>
          </div>
        </div>

        <div className="h-96 bg-white rounded-2xl p-6 shadow-inner border border-gray-100">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                stroke="#6b7280" 
                fontSize={12}
                tick={{ fill: '#6b7280' }}
              />
              <YAxis 
                stroke="#6b7280" 
                fontSize={12}
                tick={{ fill: '#6b7280' }}
                tickFormatter={(value) => `¥${(value / 1000)}K`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="totalPay" 
                name="総支給額" 
                stroke="#22c55e" 
                strokeWidth={3}
                dot={{ fill: '#22c55e', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: '#22c55e', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="totalDeduction" 
                name="控除合計" 
                stroke="#ef4444" 
                strokeWidth={3}
                dot={{ fill: '#ef4444', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: '#ef4444', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="netPay" 
                name="差引支給額" 
                stroke="#3b82f6" 
                strokeWidth={4}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 8 }}
                activeDot={{ r: 10, stroke: '#3b82f6', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 統計情報 */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
            <div className="text-sm text-green-600 font-medium">平均支給額</div>
            <div className="text-2xl font-bold text-green-700 font-mono">
              ¥{Math.round(chartData.reduce((sum, data) => sum + data.totalPay, 0) / chartData.length).toLocaleString()}
            </div>
          </div>
          <div className="bg-gradient-to-r from-red-50 to-pink-50 p-4 rounded-xl border border-red-200">
            <div className="text-sm text-red-600 font-medium">平均控除額</div>
            <div className="text-2xl font-bold text-red-700 font-mono">
              ¥{Math.round(chartData.reduce((sum, data) => sum + data.totalDeduction, 0) / chartData.length).toLocaleString()}
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
            <div className="text-sm text-blue-600 font-medium">平均差引額</div>
            <div className="text-2xl font-bold text-blue-700 font-mono">
              ¥{Math.round(chartData.reduce((sum, data) => sum + data.netPay, 0) / chartData.length).toLocaleString()}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}