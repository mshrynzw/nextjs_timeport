"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { TrendingUp, Clock, DollarSign, PieChart as PieChartIcon } from "lucide-react";

// サンプルデータ
const attendanceData = [
  { month: "1月", workDays: 18, overtime: 5 },
  { month: "2月", workDays: 20, overtime: 10 },
  { month: "3月", workDays: 19, overtime: 8 },
  { month: "4月", workDays: 21, overtime: 4 },
  { month: "5月", workDays: 20, overtime: 7 },
  { month: "6月", workDays: 19, overtime: 6 },
];

const salaryData = [
  { month: "1月", basicSalary: 300000, allowance: 20000, netSalary: 290000 },
  { month: "2月", basicSalary: 300000, allowance: 25000, netSalary: 292000 },
  { month: "3月", basicSalary: 300000, allowance: 18000, netSalary: 288000 },
  { month: "4月", basicSalary: 300000, allowance: 23000, netSalary: 291000 },
  { month: "5月", basicSalary: 300000, allowance: 28000, netSalary: 295000 },
  { month: "6月", basicSalary: 300000, allowance: 28000, netSalary: 285000 },
];

const workHoursData = [
  { name: "時間内労働", value: 160, color: "#3b82f6" },
  { name: "残業", value: 32, color: "#f59e0b" },
];

const deductionData = [
  { name: "生命保険", value: 40000, color: "#ef4444" },
  { name: "扶養控除", value: 38000, color: "#8b5cf6" },
  { name: "配偶者控除", value: 26000, color: "#10b981" },
  { name: "その他", value: 15000, color: "#6b7280" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-xl border border-gray-200">
        <p className="font-semibold text-gray-800">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }} className="text-sm">
            {entry.name}: {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
            {entry.name.includes('時間') ? '時間' : entry.name.includes('日数') ? '日' : '円'}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function DashboardCharts() {
  const [activeTab, setActiveTab] = useState("attendance");

  const chartTabs = [
    {
      value: "attendance",
      label: "出勤・残業",
      icon: Clock,
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      value: "salary",
      label: "給与推移",
      icon: TrendingUp,
      gradient: "from-green-500 to-emerald-600"
    },
    {
      value: "workhours",
      label: "労働比率",
      icon: PieChartIcon,
      gradient: "from-purple-500 to-pink-600"
    },
    {
      value: "deductions",
      label: "控除内訳",
      icon: DollarSign,
      gradient: "from-orange-500 to-red-600"
    }
  ];

  return (
    <Card className="p-8 bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-sm border-0 shadow-2xl">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 tracking-wide mb-2">データ分析</h2>
        <p className="text-gray-600">勤怠・給与データの詳細分析</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8 bg-gray-100 p-1 rounded-xl">
          {chartTabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-300 ${
                  activeTab === tab.value
                    ? `bg-gradient-to-r ${tab.gradient} text-white shadow-lg`
                    : 'text-gray-600 hover:text-gray-800 hover:bg-white'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span className="font-medium">{tab.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        <div className="bg-white rounded-2xl p-6 shadow-inner border border-gray-100">
          <TabsContent value="attendance" className="mt-0">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                月別出勤日数・残業時間
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar 
                    dataKey="workDays" 
                    name="出勤日数" 
                    fill="url(#blueGradient)"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    dataKey="overtime" 
                    name="残業時間" 
                    fill="url(#orangeGradient)"
                    radius={[4, 4, 0, 0]}
                  />
                  <defs>
                    <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#1d4ed8" />
                    </linearGradient>
                    <linearGradient id="orangeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#d97706" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="salary" className="mt-0">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                給与推移（過去6ヶ月）
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={salaryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="basicSalary" 
                    name="基本給" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="allowance" 
                    name="手当" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="netSalary" 
                    name="差引支給額" 
                    stroke="#8b5cf6" 
                    strokeWidth={3}
                    dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="workhours" className="mt-0">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <PieChartIcon className="w-5 h-5 text-purple-600" />
                労働時間比率
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={workHoursData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={160}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {workHoursData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="deductions" className="mt-0">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-orange-600" />
                控除内訳
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={deductionData}
                    cx="50%"
                    cy="50%"
                    outerRadius={160}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                  >
                    {deductionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </Card>
  );
}