"use client";

import { Navbar } from "@/components/navbar";
import { DashboardCharts } from "@/components/dashboard-charts";
import { Card } from "@/components/ui/card";
import { 
  Calendar, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Award,
  Target,
  Briefcase
} from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      title: "出勤日数",
      value: "19",
      unit: "日",
      icon: Calendar,
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50 to-indigo-50",
      change: "+2",
      changeType: "increase"
    },
    {
      title: "残業時間",
      value: "8.5",
      unit: "時間",
      icon: Clock,
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-50 to-red-50",
      change: "-1.5",
      changeType: "decrease"
    },
    {
      title: "基本給",
      value: "300,000",
      unit: "円",
      icon: DollarSign,
      gradient: "from-green-500 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-50",
      change: "0",
      changeType: "neutral"
    },
    {
      title: "手当合計",
      value: "28,000",
      unit: "円",
      icon: TrendingUp,
      gradient: "from-purple-500 to-purple-600",
      bgGradient: "from-purple-50 to-pink-50",
      change: "+3,000",
      changeType: "increase"
    },
    {
      title: "差引支給額",
      value: "285,000",
      unit: "円",
      icon: Award,
      gradient: "from-indigo-500 to-purple-600",
      bgGradient: "from-indigo-50 to-purple-50",
      change: "+5,000",
      changeType: "increase"
    },
    {
      title: "有給取得日数",
      value: "1",
      unit: "日",
      icon: Users,
      gradient: "from-teal-500 to-cyan-600",
      bgGradient: "from-teal-50 to-cyan-50",
      change: "+1",
      changeType: "increase"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-600/10 rounded-full blur-3xl"></div>
      </div>

      <Navbar />
      
      <div className="pt-20 pb-8">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* ヘッダー */}
          <div className="mb-12 text-center">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 tracking-tight">
              ダッシュボード
            </h1>
            <p className="text-xl text-gray-600 font-medium">勤怠管理システム - 概要</p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-4 rounded-full"></div>
          </div>

          {/* 統計カード */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-12">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card
                  key={index}
                  className={`p-6 bg-gradient-to-br ${stat.bgGradient} backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 transform relative overflow-hidden group`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.gradient} shadow-lg`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-bold ${
                      stat.changeType === 'increase' ? 'bg-green-100 text-green-700' :
                      stat.changeType === 'decrease' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {stat.change}
                    </div>
                  </div>
                  
                  <div className="space-y-2 relative z-10">
                    <h3 className="text-sm font-semibold text-gray-600 tracking-wide">{stat.title}</h3>
                    <div className="flex items-end gap-1">
                      <span className="text-2xl font-bold text-gray-800 font-mono">{stat.value}</span>
                      <span className="text-sm text-gray-500 mb-1">{stat.unit}</span>
                    </div>
                  </div>

                  {/* 装飾的なグラデーション */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient} opacity-60`}></div>
                </Card>
              );
            })}
          </div>

          {/* チャートセクション */}
          <DashboardCharts />

          {/* クイックアクション */}
          <div className="mt-12">
            <Card className="p-8 bg-gradient-to-br from-white/90 to-purple-50/90 backdrop-blur-sm border-0 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 mr-4 shadow-lg">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 tracking-wide">クイックアクション</h2>
                    <p className="text-gray-600">よく使用する機能へのショートカット</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: "勤怠入力", icon: Clock, href: "/attendance", gradient: "from-blue-500 to-indigo-600" },
                  { title: "給与明細", icon: DollarSign, href: "/payroll", gradient: "from-green-500 to-emerald-600" },
                  { title: "設定", icon: Target, href: "/settings", gradient: "from-purple-500 to-pink-600" },
                  { title: "従業員管理", icon: Users, href: "/employees", gradient: "from-orange-500 to-red-600" }
                ].map((action, index) => {
                  const IconComponent = action.icon;
                  return (
                    <div
                      key={index}
                      className={`p-6 rounded-xl bg-gradient-to-r ${action.gradient} text-white cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 transform group`}
                    >
                      <div className="flex items-center space-x-3">
                        <IconComponent className="w-6 h-6" />
                        <span className="font-semibold">{action.title}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}