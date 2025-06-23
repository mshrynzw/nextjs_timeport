"use client";

import { Card } from "@/components/ui/card";
import { Clock, User, Coffee, Timer, TrendingUp, Calendar } from "lucide-react";
import { useState, useEffect } from "react";

interface TodayStatusProps {
  workStatus: 'not-started' | 'working' | 'break' | 'finished';
  todayRecord: {
    clockIn: string | null;
    clockOut: string | null;
    breakTime: number;
    workHours: number;
    overtime: number;
  };
}

export function TodayStatus({ workStatus, todayRecord }: TodayStatusProps) {
  const [realTimeHours, setRealTimeHours] = useState("00:00");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (todayRecord.clockIn && workStatus === 'working') {
        const [hours, minutes] = todayRecord.clockIn.split(':');
        const clockInTime = new Date();
        clockInTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
        
        const now = new Date();
        const diff = now.getTime() - clockInTime.getTime();
        const totalMinutes = Math.floor(diff / (1000 * 60));
        const displayHours = Math.floor(totalMinutes / 60);
        const displayMinutes = totalMinutes % 60;
        
        setRealTimeHours(`${displayHours.toString().padStart(2, '0')}:${displayMinutes.toString().padStart(2, '0')}`);
        setProgress(Math.min((totalMinutes / (8 * 60)) * 100, 100));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [todayRecord.clockIn, workStatus]);

  const statusCards = [
    {
      title: "出勤時刻",
      value: todayRecord.clockIn || "--:--",
      icon: Clock,
      gradient: "from-green-500 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-50",
      borderColor: "border-green-200"
    },
    {
      title: "退勤時刻",
      value: todayRecord.clockOut || "--:--",
      icon: Clock,
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-50 to-red-50",
      borderColor: "border-orange-200"
    },
    {
      title: "休憩時間",
      value: "01:00",
      icon: Coffee,
      gradient: "from-blue-500 to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-50",
      borderColor: "border-blue-200"
    },
    {
      title: "実労働時間",
      value: workStatus === 'working' ? realTimeHours : "00:00",
      icon: Timer,
      gradient: "from-purple-500 to-pink-600",
      bgGradient: "from-purple-50 to-pink-50",
      borderColor: "border-purple-200"
    }
  ];

  return (
    <Card className="p-8 bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-sm border-0 shadow-2xl">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center tracking-wide">
          <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mr-4 shadow-lg">
            <User className="w-8 h-8 text-white" />
          </div>
          今日の勤務状況
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statusCards.map((card, index) => {
          const IconComponent = card.icon;
          return (
            <div
              key={index}
              className={`bg-gradient-to-br ${card.bgGradient} p-6 rounded-2xl border-2 ${card.borderColor} hover:shadow-xl transition-all duration-500 hover:scale-105 transform relative overflow-hidden group`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="flex items-center justify-between mb-4 relative z-10">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${card.gradient} shadow-lg`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <div className="space-y-3 relative z-10">
                <h3 className="text-sm font-semibold text-gray-600 tracking-wide">{card.title}</h3>
                <div className="text-3xl font-bold text-gray-800 font-mono tracking-wider">
                  {card.value}
                </div>
              </div>

              {/* 装飾的なグラデーション */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${card.gradient} opacity-60`}></div>
            </div>
          );
        })}
      </div>

      {/* 詳細情報と進捗 */}
      <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-2xl border border-gray-200 shadow-inner">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center mb-6">
          <div className="space-y-2">
            <div className="text-sm text-gray-600 font-medium">予定労働時間</div>
            <div className="text-xl font-bold text-gray-800">08:00</div>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-gray-600 font-medium">残業時間</div>
            <div className="text-xl font-bold text-gray-800">00:00</div>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-gray-600 font-medium">進捗</div>
            <div className="text-xl font-bold text-blue-600">
              {workStatus === 'working' ? `${Math.round(progress)}%` : "0%"}
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-gray-600 font-medium">ステータス</div>
            <div className={`text-lg font-bold ${
              workStatus === 'not-started' ? 'text-gray-600' :
              workStatus === 'working' ? 'text-green-600' :
              workStatus === 'break' ? 'text-blue-600' :
              'text-orange-600'
            }`}>
              {workStatus === 'not-started' ? '未出勤' :
               workStatus === 'working' ? '勤務中' :
               workStatus === 'break' ? '休憩中' :
               '退勤済み'}
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-gray-600 font-medium">効率</div>
            <div className="text-xl font-bold text-purple-600">100%</div>
          </div>
        </div>

        {/* 進捗バー */}
        {workStatus === 'working' && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>労働時間進捗</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-pulse"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}