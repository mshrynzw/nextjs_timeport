"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, ArrowUpDown, FileText, History, TrendingUp } from "lucide-react";
import { AttendanceFilter } from "./attendance-filter";
import { AttendanceApplication } from "./attendance-application";

// サンプルデータ
const attendanceData = [
  {
    date: "2025-06-23",
    dayOfWeek: "月",
    clockIn: "09:00",
    clockOut: "18:30",
    breakTime: "01:00",
    workHours: "8:30",
    overtime: "0:30",
    status: "正常",
    notes: ""
  },
  {
    date: "2025-06-22",
    dayOfWeek: "日",
    clockIn: "--:--",
    clockOut: "--:--",
    breakTime: "--:--",
    workHours: "--:--",
    overtime: "--:--",
    status: "休日",
    notes: "日曜日"
  },
  {
    date: "2025-06-21",
    dayOfWeek: "土",
    clockIn: "09:15",
    clockOut: "17:45",
    breakTime: "01:00",
    workHours: "7:30",
    overtime: "0:00",
    status: "遅刻",
    notes: "電車遅延"
  },
  {
    date: "2025-06-20",
    dayOfWeek: "金",
    clockIn: "08:55",
    clockOut: "19:15",
    breakTime: "01:00",
    workHours: "9:20",
    overtime: "1:20",
    status: "正常",
    notes: "残業"
  },
  {
    date: "2025-06-19",
    dayOfWeek: "木",
    clockIn: "09:00",
    clockOut: "18:00",
    breakTime: "01:00",
    workHours: "8:00",
    overtime: "0:00",
    status: "正常",
    notes: ""
  },
  {
    date: "2025-06-18",
    dayOfWeek: "水",
    clockIn: "09:05",
    clockOut: "18:10",
    breakTime: "01:00",
    workHours: "8:05",
    overtime: "0:05",
    status: "遅刻",
    notes: "交通渋滞"
  },
  {
    date: "2025-06-17",
    dayOfWeek: "火",
    clockIn: "08:50",
    clockOut: "17:50",
    breakTime: "01:00",
    workHours: "8:00",
    overtime: "0:00",
    status: "正常",
    notes: ""
  }
];

export function AttendanceHistory() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const itemsPerPage = 10;

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      '正常': { 
        variant: 'default' as const, 
        className: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white border-0 shadow-md' 
      },
      '遅刻': { 
        variant: 'destructive' as const, 
        className: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-0 shadow-md' 
      },
      '早退': { 
        variant: 'secondary' as const, 
        className: 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white border-0 shadow-md' 
      },
      '休日': { 
        variant: 'outline' as const, 
        className: 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white border-0 shadow-md' 
      },
      '欠勤': { 
        variant: 'destructive' as const, 
        className: 'bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white border-0 shadow-md' 
      }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig['正常'];
    return (
      <Badge variant={config.variant} className={config.className}>
        {status}
      </Badge>
    );
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <>
      <Card className="bg-gradient-to-br from-white/90 to-indigo-50/90 backdrop-blur-sm border-0 shadow-2xl">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 mr-4 shadow-lg">
                <History className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800 tracking-wide">勤怠履歴</h2>
                <p className="text-gray-600 mt-1">過去の出勤記録を確認できます</p>
              </div>
            </div>
            <Button
              onClick={() => setShowApplicationModal(true)}
              className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <FileText className="w-4 h-4 mr-2" />
              勤怠申請
            </Button>
          </div>

          <AttendanceFilter onFilterChange={() => {}} />

          {/* テーブル */}
          <div className="overflow-x-auto bg-white rounded-2xl shadow-inner border border-gray-100">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50">
                  <th className="text-left p-6 font-bold text-gray-700">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort('date')}
                      className="flex items-center gap-2 hover:bg-blue-100 transition-colors font-bold"
                    >
                      日付
                      <ArrowUpDown className="w-4 h-4" />
                    </Button>
                  </th>
                  <th className="text-left p-6 font-bold text-gray-700">曜日</th>
                  <th className="text-left p-6 font-bold text-gray-700">出勤</th>
                  <th className="text-left p-6 font-bold text-gray-700">退勤</th>
                  <th className="text-left p-6 font-bold text-gray-700">休憩</th>
                  <th className="text-left p-6 font-bold text-gray-700">実労働</th>
                  <th className="text-left p-6 font-bold text-gray-700">残業</th>
                  <th className="text-left p-6 font-bold text-gray-700">ステータス</th>
                  <th className="text-left p-6 font-bold text-gray-700">備考</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((record, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 group"
                  >
                    <td className="p-6 font-semibold text-gray-800 group-hover:text-blue-800 transition-colors">
                      {record.date}
                    </td>
                    <td className="p-6 text-gray-600">
                      <span className={`inline-block w-10 h-10 rounded-full text-center leading-10 text-sm font-bold shadow-md ${
                        record.dayOfWeek === '日' ? 'bg-gradient-to-r from-red-400 to-red-500 text-white' :
                        record.dayOfWeek === '土' ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-white' :
                        'bg-gradient-to-r from-gray-400 to-gray-500 text-white'
                      }`}>
                        {record.dayOfWeek}
                      </span>
                    </td>
                    <td className="p-6 text-gray-800 font-mono font-semibold">{record.clockIn}</td>
                    <td className="p-6 text-gray-800 font-mono font-semibold">{record.clockOut}</td>
                    <td className="p-6 text-gray-600 font-mono">{record.breakTime}</td>
                    <td className="p-6 text-gray-800 font-mono font-bold">{record.workHours}</td>
                    <td className="p-6 text-gray-600 font-mono">{record.overtime}</td>
                    <td className="p-6">{getStatusBadge(record.status)}</td>
                    <td className="p-6 text-gray-600 text-sm">{record.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ページネーション */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            <div className="text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-lg">
              全 {attendanceData.length} 件中 1-{Math.min(itemsPerPage, attendanceData.length)} 件を表示
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                className="bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300 shadow-sm transition-all duration-200 hover:scale-105"
              >
                <ChevronLeft className="w-4 h-4" />
                前へ
              </Button>
              
              <div className="flex items-center gap-2">
                {[1, 2, 3].map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 p-0 transition-all duration-200 hover:scale-105 ${
                      currentPage === page 
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-md' 
                        : 'bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300 shadow-sm'
                    }`}
                  >
                    {page}
                  </Button>
                ))}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300 shadow-sm transition-all duration-200 hover:scale-105"
              >
                次へ
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <AttendanceApplication
        isOpen={showApplicationModal}
        onClose={() => setShowApplicationModal(false)}
      />
    </>
  );
}