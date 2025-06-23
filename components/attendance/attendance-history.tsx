"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, ArrowUpDown, FileText } from "lucide-react";
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
      '正常': { variant: 'default' as const, className: 'bg-green-500 hover:bg-green-600' },
      '遅刻': { variant: 'destructive' as const, className: 'bg-red-500 hover:bg-red-600' },
      '早退': { variant: 'secondary' as const, className: 'bg-yellow-500 hover:bg-yellow-600 text-white' },
      '休日': { variant: 'outline' as const, className: 'bg-blue-500 hover:bg-blue-600 text-white border-blue-500' },
      '欠勤': { variant: 'destructive' as const, className: 'bg-gray-500 hover:bg-gray-600' }
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
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">勤怠履歴</h2>
            <Button
              onClick={() => setShowApplicationModal(true)}
              className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
            >
              <FileText className="w-4 h-4 mr-2" />
              勤怠申請
            </Button>
          </div>

          <AttendanceFilter onFilterChange={() => {}} />

          {/* テーブル */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-4 font-semibold text-gray-700">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort('date')}
                      className="flex items-center gap-2 hover:bg-gray-100"
                    >
                      日付
                      <ArrowUpDown className="w-4 h-4" />
                    </Button>
                  </th>
                  <th className="text-left p-4 font-semibold text-gray-700">曜日</th>
                  <th className="text-left p-4 font-semibold text-gray-700">出勤</th>
                  <th className="text-left p-4 font-semibold text-gray-700">退勤</th>
                  <th className="text-left p-4 font-semibold text-gray-700">休憩</th>
                  <th className="text-left p-4 font-semibold text-gray-700">実労働</th>
                  <th className="text-left p-4 font-semibold text-gray-700">残業</th>
                  <th className="text-left p-4 font-semibold text-gray-700">ステータス</th>
                  <th className="text-left p-4 font-semibold text-gray-700">備考</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((record, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="p-4 font-medium text-gray-800">{record.date}</td>
                    <td className="p-4 text-gray-600">
                      <span className={`inline-block w-8 h-8 rounded-full text-center leading-8 text-sm font-medium ${
                        record.dayOfWeek === '日' ? 'bg-red-100 text-red-600' :
                        record.dayOfWeek === '土' ? 'bg-blue-100 text-blue-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {record.dayOfWeek}
                      </span>
                    </td>
                    <td className="p-4 text-gray-800 font-mono">{record.clockIn}</td>
                    <td className="p-4 text-gray-800 font-mono">{record.clockOut}</td>
                    <td className="p-4 text-gray-600 font-mono">{record.breakTime}</td>
                    <td className="p-4 text-gray-800 font-mono font-semibold">{record.workHours}</td>
                    <td className="p-4 text-gray-600 font-mono">{record.overtime}</td>
                    <td className="p-4">{getStatusBadge(record.status)}</td>
                    <td className="p-4 text-gray-600 text-sm">{record.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ページネーション */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              全 {attendanceData.length} 件中 1-{Math.min(itemsPerPage, attendanceData.length)} 件を表示
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              >
                <ChevronLeft className="w-4 h-4" />
                前へ
              </Button>
              
              <div className="flex items-center gap-1">
                {[1, 2, 3].map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="w-8 h-8 p-0"
                  >
                    {page}
                  </Button>
                ))}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => prev + 1)}
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