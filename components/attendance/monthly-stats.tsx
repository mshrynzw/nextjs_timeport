"use client";

import { Card } from "@/components/ui/card";
import { Calendar, Clock, AlertTriangle, TrendingUp } from "lucide-react";

export function MonthlyStats() {
  const stats = [
    {
      title: "総出勤日数",
      value: "22",
      unit: "日",
      icon: Calendar,
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-indigo-50",
      borderColor: "border-blue-100"
    },
    {
      title: "総労働時間",
      value: "176.5",
      unit: "時間",
      icon: Clock,
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-emerald-50",
      borderColor: "border-green-100"
    },
    {
      title: "総残業時間",
      value: "12.5",
      unit: "時間",
      icon: TrendingUp,
      color: "from-orange-500 to-orange-600",
      bgColor: "from-orange-50 to-red-50",
      borderColor: "border-orange-100"
    },
    {
      title: "遅刻・早退",
      value: "2",
      unit: "回",
      icon: AlertTriangle,
      color: "from-red-500 to-red-600",
      bgColor: "from-red-50 to-pink-50",
      borderColor: "border-red-100"
    }
  ];

  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">今月の統計</h2>
        <p className="text-gray-600">2025年6月</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={index}
              className={`bg-gradient-to-br ${stat.bgColor} p-6 rounded-xl border ${stat.borderColor} hover:shadow-lg transition-all duration-300 hover:scale-105`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
                <div className="flex items-end gap-1">
                  <span className="text-3xl font-bold text-gray-800">{stat.value}</span>
                  <span className="text-sm text-gray-500 mb-1">{stat.unit}</span>
                </div>
              </div>

              {/* 進捗バー（サンプル） */}
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full bg-gradient-to-r ${stat.color}`}
                    style={{ width: `${Math.min((parseFloat(stat.value) / (index === 0 ? 25 : index === 1 ? 200 : index === 2 ? 20 : 5)) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 月間グラフプレビュー */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">今月の勤務時間推移</h3>
        <div className="h-32 bg-white rounded-lg border border-gray-200 flex items-center justify-center">
          <div className="text-gray-500">グラフエリア（実装予定）</div>
        </div>
      </div>
    </Card>
  );
}