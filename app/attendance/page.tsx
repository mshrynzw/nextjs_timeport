"use client";

import { Navbar } from "@/components/navbar";
import { TimeClock } from "@/components/attendance/time-clock";
import { AttendanceButtons } from "@/components/attendance/attendance-buttons";
import { TodayStatus } from "@/components/attendance/today-status";
import { MonthlyStats } from "@/components/attendance/monthly-stats";
import { AttendanceHistory } from "@/components/attendance/attendance-history";
import { useState } from "react";

export default function AttendancePage() {
  const [workStatus, setWorkStatus] = useState<'not-started' | 'working' | 'break' | 'finished'>('not-started');
  const [todayRecord, setTodayRecord] = useState({
    clockIn: null as string | null,
    clockOut: null as string | null,
    breakTime: 0,
    workHours: 0,
    overtime: 0,
  });

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
        <div className="container mx-auto p-6 max-w-7xl relative z-10">
          {/* ヘッダー */}
          <div className="mb-10 text-center">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 tracking-tight">
              勤怠入力・履歴
            </h1>
            <p className="text-xl text-gray-600 font-medium">出退勤の記録と履歴管理</p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-4 rounded-full"></div>
          </div>

          {/* メインセクション */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            {/* 左カラム - 時計と勤怠ボタン */}
            <div className="lg:col-span-1 space-y-8">
              <TimeClock />
              <AttendanceButtons 
                workStatus={workStatus}
                setWorkStatus={setWorkStatus}
                todayRecord={todayRecord}
                setTodayRecord={setTodayRecord}
              />
            </div>

            {/* 右カラム - 今日の勤務状況 */}
            <div className="lg:col-span-2">
              <TodayStatus 
                workStatus={workStatus}
                todayRecord={todayRecord}
              />
            </div>
          </div>

          {/* 月次統計 */}
          <div className="mb-10">
            <MonthlyStats />
          </div>

          {/* 勤怠履歴 */}
          <div>
            <AttendanceHistory />
          </div>
        </div>
      </div>
    </div>
  );
}