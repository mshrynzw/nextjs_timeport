"use client";

import { Card } from "@/components/ui/card";
import { Calendar, Clock, AlertTriangle, TrendingUp, Target, Award } from "lucide-react";

export function MonthlyStats() {
  const stats = [
    {
      title: "総出勤日数",
      value: "22",
      unit: "日",
      target: "23",
      icon: Calendar,
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50 to-indigo-50",
      borderColor: "border-blue-200",
      progress: 95.7
    },
    {
      title: "総労働時間",
      value: "176.5",
      unit: "時間",
      target: "184",
      icon: Clock,
      gradient: "from-green-500 to-green-600",
      bgGradient: "from-green-50 to-emerald-50",
      borderColor: "border-green-200",
      progress: 96.0
    },
    {
      title: "総残業時間",
      value: "12.5",
      unit: "時間",
      target: "20",
      icon: TrendingUp,
      gradient: "from-orange-500 to-orange-600",
      bgGradient: "from-orange-50 to-red-50",
      borderColor: "border-orange-200",
      progress: 62.5
    },
    {
      title: "遅刻・早退",
      value: "2",
      unit: "回",
      target: "0",
      icon: AlertTriangle,
      gradient: "from-red-500 to-red-600",
      bgGradient: "from-red-50 to-pink-50",
      borderColor: "border-red-200",
      progress: 0
    }
  ];

  return (
    <Card className="p-8 bg-gradient-to-br from-white/90 to-purple-50/90 backdrop-blur-sm border-0 shadow-2xl">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 tracking-wide">今月の統計</h2>
            <p className="text-gray-600 text-lg mt-2">2025年6月</p>
          </div>
          <div className="p-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 shadow-lg">
            <Award className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={index}
              className={`bg-gradient-to-br ${stat.bgGradient} p-6 rounded-2xl border-2 ${stat.borderColor} hover:shadow-xl transition-all duration-500 hover:scale-105 transform relative overflow-hidden group`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="flex items-center justify-between mb-4 relative z-10">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.gradient} shadow-lg`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">目標</div>
                  <div className="text-sm font-semibold text-gray-600">{stat.target}{stat.unit}</div>
                </div>
              </div>
              
              <div className="space-y-3 relative z-10">
                <h3 className="text-sm font-semibold text-gray-600 tracking-wide">{stat.title}</h3>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-bold text-gray-800 font-mono">{stat.value}</span>
                  <span className="text-lg text-gray-500 mb-1">{stat.unit}</span>
                </div>
              </div>

              {/* 進捗バー */}
              <div className="mt-4 relative z-10">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>達成率</span>
                  <span>{stat.progress.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-white/50 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-2 rounded-full bg-gradient-to-r ${stat.gradient} transition-all duration-1000 ease-out relative overflow-hidden`}
                    style={{ width: `${Math.min(stat.progress, 100)}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* 装飾的なグラデーション */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient} opacity-60`}></div>
            </div>
          );
        })}
      </div>

      {/* 月間パフォーマンス概要 */}
      <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-2xl border border-gray-200 shadow-inner">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800 flex items-center">
            <Target className="w-6 h-6 mr-2 text-purple-600" />
            今月のパフォーマンス
          </h3>
          <div className="px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full">
            <span className="text-green-700 font-semibold">優秀</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-white rounded-xl shadow-sm">
            <div className="text-2xl font-bold text-blue-600">96.0%</div>
            <div className="text-sm text-gray-600">出勤率</div>
          </div>
          <div className="p-4 bg-white rounded-xl shadow-sm">
            <div className="text-2xl font-bold text-green-600">98.5%</div>
            <div className="text-sm text-gray-600">時間達成率</div>
          </div>
          <div className="p-4 bg-white rounded-xl shadow-sm">
            <div className="text-2xl font-bold text-purple-600">A+</div>
            <div className="text-sm text-gray-600">総合評価</div>
          </div>
        </div>
      </div>
    </Card>
  );
}