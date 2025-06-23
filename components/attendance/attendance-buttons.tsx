"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LogIn, LogOut, Coffee, Coffee as CoffeeOff } from "lucide-react";
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
    });
  };

  const handleClockOut = () => {
    const now = format(new Date(), "HH:mm");
    setTodayRecord({ ...todayRecord, clockOut: now });
    setWorkStatus('finished');
    toast({
      title: "退勤しました",
      description: `退勤時刻: ${now}`,
    });
  };

  const handleBreakStart = () => {
    setWorkStatus('break');
    toast({
      title: "休憩を開始しました",
      description: "お疲れ様です",
    });
  };

  const handleBreakEnd = () => {
    setWorkStatus('working');
    toast({
      title: "休憩を終了しました",
      description: "業務を再開してください",
    });
  };

  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
      <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">勤怠入力</h2>
      
      <div className="space-y-4">
        {/* 出勤ボタン */}
        <Button
          onClick={handleClockIn}
          disabled={workStatus !== 'not-started'}
          className="w-full h-16 text-lg font-semibold bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 disabled:opacity-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <LogIn className="w-6 h-6 mr-3" />
          出勤
        </Button>

        {/* 休憩ボタン */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={handleBreakStart}
            disabled={workStatus !== 'working'}
            variant="outline"
            className="h-12 bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 transition-all duration-300"
          >
            <Coffee className="w-5 h-5 mr-2" />
            休憩開始
          </Button>
          
          <Button
            onClick={handleBreakEnd}
            disabled={workStatus !== 'break'}
            variant="outline"
            className="h-12 bg-gradient-to-r from-blue-600 to-blue-700 text-white border-0 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 transition-all duration-300"
          >
            <CoffeeOff className="w-5 h-5 mr-2" />
            休憩終了
          </Button>
        </div>

        {/* 退勤ボタン */}
        <Button
          onClick={handleClockOut}
          disabled={workStatus === 'not-started' || workStatus === 'finished'}
          className="w-full h-16 text-lg font-semibold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <LogOut className="w-6 h-6 mr-3" />
          退勤
        </Button>
      </div>

      {/* 現在の状態表示 */}
      <div className="mt-6 p-3 rounded-lg bg-gray-100">
        <div className="text-center">
          <span className="text-sm text-gray-600">現在の状態:</span>
          <div className={`inline-block ml-2 px-3 py-1 rounded-full text-sm font-medium ${
            workStatus === 'not-started' ? 'bg-gray-200 text-gray-700' :
            workStatus === 'working' ? 'bg-green-200 text-green-800' :
            workStatus === 'break' ? 'bg-blue-200 text-blue-800' :
            'bg-orange-200 text-orange-800'
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