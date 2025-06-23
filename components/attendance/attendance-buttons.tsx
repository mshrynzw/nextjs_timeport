"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LogIn, LogOut, Coffee, Coffee as CoffeeOff, Play, Pause } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface AttendanceButtonsProps {
  workStatus: 'not-started' | 'working' | 'break' | 'finished';
  setWorkStatus: (status: 'not-started' | 'working' | 'break' | 'finished') => void;
  todayRecord: {
    clockIn: string | null;
    clockOut: string | null;
    breakTime: number;
    workHours: number;
    overtime: number;
  };
  setTodayRecord: (record: any) => void;
}

export function AttendanceButtons({ 
  workStatus, 
  setWorkStatus, 
  todayRecord, 
  setTodayRecord 
}: AttendanceButtonsProps) {
  const { toast } = useToast();

  const handleClockIn = () => {
    const now = format(new Date(), "HH:mm");
    setTodayRecord({ ...todayRecord, clockIn: now });
    setWorkStatus('working');
    toast({
      title: "出勤しました",
      description: `出勤時刻: ${now}`,
      className: "bg-green-50 border-green-200 text-green-800",
    });
  };

  const handleClockOut = () => {
    const now = format(new Date(), "HH:mm");
    setTodayRecord({ ...todayRecord, clockOut: now });
    setWorkStatus('finished');
    toast({
      title: "退勤しました",
      description: `退勤時刻: ${now}`,
      className: "bg-orange-50 border-orange-200 text-orange-800",
    });
  };

  const handleBreakStart = () => {
    setWorkStatus('break');
    toast({
      title: "休憩を開始しました",
      description: "お疲れ様です",
      className: "bg-blue-50 border-blue-200 text-blue-800",
    });
  };

  const handleBreakEnd = () => {
    setWorkStatus('working');
    toast({
      title: "休憩を終了しました",
      description: "業務を再開してください",
      className: "bg-blue-50 border-blue-200 text-blue-800",
    });
  };

  return (
    <Card className="p-8 bg-gradient-to-br from-white/90 to-gray-50/90 backdrop-blur-sm border-0 shadow-2xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center tracking-wide">勤怠入力</h2>
      
      <div className="space-y-6">
        {/* 出勤ボタン */}
        <Button
          onClick={handleClockIn}
          disabled={workStatus !== 'not-started'}
          className="w-full h-20 text-xl font-bold bg-gradient-to-r from-emerald-500 via-emerald-600 to-green-600 hover:from-emerald-600 hover:via-emerald-700 hover:to-green-700 disabled:opacity-50 transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:scale-105 active:scale-95 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <LogIn className="w-8 h-8 mr-4" />
          出勤
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </Button>

        {/* 休憩ボタン */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={handleBreakStart}
            disabled={workStatus !== 'working'}
            className="h-16 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 hover:from-blue-600 hover:via-blue-700 hover:to-indigo-700 text-white border-0 disabled:opacity-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Play className="w-6 h-6 mr-2" />
            休憩開始
          </Button>
          
          <Button
            onClick={handleBreakEnd}
            disabled={workStatus !== 'break'}
            className="h-16 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 text-white border-0 disabled:opacity-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Pause className="w-6 h-6 mr-2" />
            休憩終了
          </Button>
        </div>

        {/* 退勤ボタン */}
        <Button
          onClick={handleClockOut}
          disabled={workStatus === 'not-started' || workStatus === 'finished'}
          className="w-full h-20 text-xl font-bold bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 hover:from-orange-600 hover:via-orange-700 hover:to-red-600 disabled:opacity-50 transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:scale-105 active:scale-95 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <LogOut className="w-8 h-8 mr-4" />
          退勤
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </Button>
      </div>

      {/* 現在の状態表示 */}
      <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200">
        <div className="text-center">
          <span className="text-sm text-gray-600 font-medium">現在の状態:</span>
          <div className={`inline-block ml-3 px-4 py-2 rounded-full text-sm font-bold shadow-md ${
            workStatus === 'not-started' ? 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700' :
            workStatus === 'working' ? 'bg-gradient-to-r from-green-400 to-green-500 text-white' :
            workStatus === 'break' ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-white' :
            'bg-gradient-to-r from-orange-400 to-orange-500 text-white'
          }`}>
            {workStatus === 'not-started' ? '未出勤' :
             workStatus === 'working' ? '勤務中' :
             workStatus === 'break' ? '休憩中' :
             '退勤済み'}
          </div>
        </div>
      </div>
    </Card>
  );
}