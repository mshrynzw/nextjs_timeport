"use client";

import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Calendar, Clock, Coffee, AlertTriangle, Target, TrendingUp } from "lucide-react";

interface AttendanceInfoProps {
  attendance: {
    workDays: number;
    absentDays: number;
    paidLeaveDays: number;
    lateEarlyCount: number;
    regularHours: number;
    actualHours: number;
    overtimeHours: number;
    nightHours: number;
    holidayHours: number;
  };
}

export function AttendanceInfo({ attendance }: AttendanceInfoProps) {
  const attendanceStats = [
    {
      title: "出勤日数",
      value: attendance.workDays,
      unit: "日",
      icon: Calendar,
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50 to-indigo-50",
      borderColor: "border-blue-200"
    },
    {
      title: "欠勤日数",
      value: attendance.absentDays,
      unit: "日",
      icon: AlertTriangle,
      gradient: "from-red-500 to-red-600",
      bgGradient: "from-red-50 to-pink-50",
      borderColor: "border-red-200"
    },
    {
      title: "有給使用",
      value: attendance.paidLeaveDays,
      unit: "日",
      icon: Coffee,
      gradient: "from-green-500 to-green-600",
      bgGradient: "from-green-50 to-emerald-50",
      borderColor: "border-green-200"
    },
    {
      title: "遅刻・早退",
      value: attendance.lateEarlyCount,
      unit: "回",
      icon: Clock,
      gradient: "from-orange-500 to-orange-600",
      bgGradient: "from-orange-50 to-red-50",
      borderColor: "border-orange-200"
    }
  ];

  const workHoursData = [
    {
      name: "所定労働",
      hours: attendance.regularHours,
      color: "#3b82f6"
    },
    {
      name: "実労働",
      hours: attendance.actualHours,
      color: "#10b981"
    },
    {
      name: "時間外",
      hours: attendance.overtimeHours,
      color: "#f59e0b"
    },
    {
      name: "深夜",
      hours: attendance.nightHours,
      color: "#8b5cf6"
    },
    {
      name: "休日",
      hours: attendance.holidayHours,
      color: "#ef4444"
    }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-xl border border-gray-200">
          <p className="font-semibold text-gray-800">{label}</p>
          <p style={{ color: payload[0].color }} className="text-sm">
            {payload[0].value}時間
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="mb-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 tracking-wide">勤怠情報</h2>
        <p className="text-gray-600 mt-1">今月の出勤・労働時間詳細</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 出勤統計 */}
        <Card className="p-6 bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-sm border-0 shadow-xl">
          <div className="flex items-center mb-6">
            <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mr-4 shadow-lg">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">出勤統計</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {attendanceStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={index}
                  className={`bg-gradient-to-br ${stat.bgGradient} p-4 rounded-xl border-2 ${stat.borderColor} hover:shadow-lg transition-all duration-300 hover:scale-105 transform relative overflow-hidden group`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="flex items-center justify-between mb-3 relative z-10">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.gradient} shadow-md`}>
                      <IconComponent className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  
                  <div className="space-y-2 relative z-10">
                    <h4 className="text-xs font-semibold text-gray-600 tracking-wide">{stat.title}</h4>
                    <div className="flex items-end gap-1">
                      <span className="text-2xl font-bold text-gray-800 font-mono">{stat.value}</span>
                      <span className="text-sm text-gray-500 mb-1">{stat.unit}</span>
                    </div>
                  </div>

                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient} opacity-60`}></div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* 労働時間チャート */}
        <Card className="p-6 bg-gradient-to-br from-white/90 to-green-50/90 backdrop-blur-sm border-0 shadow-xl">
          <div className="flex items-center mb-6">
            <div className="p-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 mr-4 shadow-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">労働時間内訳</h3>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={workHoursData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  stroke="#6b7280" 
                  fontSize={12}
                  tick={{ fill: '#6b7280' }}
                />
                <YAxis 
                  stroke="#6b7280" 
                  fontSize={12}
                  tick={{ fill: '#6b7280' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="hours" 
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}