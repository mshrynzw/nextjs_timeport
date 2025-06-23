"use client";

import { Card } from "@/components/ui/card";
import { Clock, User, Coffee, Timer } from "lucide-react";
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
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [todayRecord.clockIn, workStatus]);

  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <User className="w-7 h-7 mr-3 text-blue-600" />
          今日の勤務状況
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* 出勤時刻 */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-green-100">
          <div className="flex items-center mb-2">
            <Clock className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-sm font-medium text-green-800">出勤時刻</span>
          </div>
          <div className="text-2xl font-bold text-green-700">
            {todayRecord.clockIn || "--:--"}
          </div>
        </div>

        {/* 退勤時刻 */}
        <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-lg border border-orange-100">
          <div className="flex items-center mb-2">
            <Clock className="w-5 h-5 text-orange-600 mr-2" />
            <span className="text-sm font-medium text-orange-800">退勤時刻</span>
          </div>
          <div className="text-2xl font-bold text-orange-700">
            {todayRecord.clockOut || "--:--"}
          </div>
        </div>

        {/* 休憩時間 */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
          <div className="flex items-center mb-2">
            <Coffee className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-sm font-medium text-blue-800">休憩時間</span>
          </div>
          <div className="text-2xl font-bold text-blue-700">
            01:00
          </div>
        </div>

        {/* 実労働時間 */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-100">
          <div className="flex items-center mb-2">
            <Timer className="w-5 h-5 text-purple-600 mr-2" />
            <span className="text-sm font-medium text-purple-800">実労働時間</span>
          </div>
          <div className="text-2xl font-bold text-purple-700">
            {workStatus === 'working' ? realTimeHours : "00:00"}
          </div>
        </div>
      </div>

      {/* 詳細情報 */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-sm text-gray-600">予定労働時間</div>
            <div className="text-lg font-semibold text-gray-800">08:00</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">残業時間</div>
            <div className="text-lg font-semibold text-gray-800">00:00</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">進捗</div>
            <div className="text-lg font-semibold text-gray-800">
              {workStatus === 'working' ? `${Math.round((parseFloat(realTimeHours.split(':')[0]) / 8) * 100)}%` : "0%"}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600">ステータス</div>
            <div className={`text-lg font-semibold ${
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
        </div>
      </div>
    </Card>
  );
}