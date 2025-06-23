"use client";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto p-4 max-w-7xl">
        {/* ヘッダー */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            TimePort
          </h1>
          <p className="text-gray-600">勤怠管理システム</p>
        </div>

        {/* メインセクション */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* 左カラム - 時計と勤怠ボタン */}
          <div className="lg:col-span-1 space-y-6">
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
        <div className="mb-8">
          <MonthlyStats />
        </div>

        {/* 勤怠履歴 */}
        <div>
          <AttendanceHistory />
        </div>
      </div>
    </div>
  );
}