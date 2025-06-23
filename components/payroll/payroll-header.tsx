"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Building, Hash, Calendar, Download, Printer, ChevronLeft, ChevronRight } from "lucide-react";
import { PDFGenerator } from "./pdf-generator";

interface PayrollHeaderProps {
  employeeInfo: {
    name: string;
    employeeId: string;
    department: string;
    payMonth: string;
  };
  selectedMonth: string;
  onMonthChange: (month: string) => void;
}

export function PayrollHeader({ employeeInfo, selectedMonth, onMonthChange }: PayrollHeaderProps) {
  const months = [
    { value: "2025-06", label: "2025年6月" },
    { value: "2025-05", label: "2025年5月" },
    { value: "2025-04", label: "2025年4月" },
    { value: "2025-03", label: "2025年3月" },
    { value: "2025-02", label: "2025年2月" },
    { value: "2025-01", label: "2025年1月" },
  ];

  const handlePrint = () => {
    window.print();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const currentIndex = months.findIndex(m => m.value === selectedMonth);
    if (direction === 'prev' && currentIndex < months.length - 1) {
      onMonthChange(months[currentIndex + 1].value);
    } else if (direction === 'next' && currentIndex > 0) {
      onMonthChange(months[currentIndex - 1].value);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* 従業員情報カード */}
      <Card className="p-6 bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-sm border-0 shadow-xl">
        <div className="flex items-center mb-6">
          <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mr-4 shadow-lg">
            <User className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">従業員情報</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <User className="w-5 h-5 text-blue-600" />
            <div>
              <div className="text-sm text-gray-600">従業員名</div>
              <div className="text-lg font-semibold text-gray-800">{employeeInfo.name}</div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Hash className="w-5 h-5 text-green-600" />
            <div>
              <div className="text-sm text-gray-600">社員番号</div>
              <div className="text-lg font-semibold text-gray-800">{employeeInfo.employeeId}</div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Building className="w-5 h-5 text-purple-600" />
            <div>
              <div className="text-sm text-gray-600">所属部署</div>
              <div className="text-lg font-semibold text-gray-800">{employeeInfo.department}</div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-orange-600" />
            <div className="flex-1">
              <div className="text-sm text-gray-600 mb-2">支給年月</div>
              <Select value={selectedMonth} onValueChange={onMonthChange}>
                <SelectTrigger className="bg-white border-gray-200 hover:border-blue-300 transition-colors">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem key={month.value} value={month.value}>
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </Card>

      {/* アクションボタンカード */}
      <Card className="p-6 bg-gradient-to-br from-white/90 to-green-50/90 backdrop-blur-sm border-0 shadow-xl">
        <div className="flex items-center mb-6">
          <div className="p-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 mr-4 shadow-lg">
            <Download className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">アクション</h2>
        </div>

        <div className="space-y-4">
          {/* 月ナビゲーション */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-600">月切り替え</span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth('prev')}
                className="bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300"
              >
                <ChevronLeft className="w-4 h-4" />
                前月
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth('next')}
                className="bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300"
              >
                次月
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* PDF出力ボタン */}
          <PDFGenerator employeeInfo={employeeInfo} />

          {/* 印刷ボタン */}
          <Button
            onClick={handlePrint}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <Printer className="w-4 h-4 mr-2" />
            印刷
          </Button>
        </div>
      </Card>
    </div>
  );
}