"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Download, Calendar, BarChart3 } from "lucide-react";
import { Card } from "@/components/ui/card";

interface AttendanceFilterProps {
  onFilterChange: (filters: any) => void;
}

export function AttendanceFilter({ onFilterChange }: AttendanceFilterProps) {
  return (
    <Card className="p-6 bg-gradient-to-r from-white/90 to-blue-50/90 backdrop-blur-sm border-0 shadow-xl mb-6">
      <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
        <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto">
          {/* 月選択 */}
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            <Select defaultValue="2025-06">
              <SelectTrigger className="w-full md:w-[180px] bg-white shadow-sm border-gray-200 hover:border-blue-300 transition-colors">
                <SelectValue placeholder="月を選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2025-06">2025年6月</SelectItem>
                <SelectItem value="2025-05">2025年5月</SelectItem>
                <SelectItem value="2025-04">2025年4月</SelectItem>
                <SelectItem value="2025-03">2025年3月</SelectItem>
                <SelectItem value="2025-02">2025年2月</SelectItem>
                <SelectItem value="2025-01">2025年1月</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* ステータスフィルター */}
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-purple-600" />
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-[140px] bg-white shadow-sm border-gray-200 hover:border-purple-300 transition-colors">
                <SelectValue placeholder="ステータス" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべて</SelectItem>
                <SelectItem value="normal">正常</SelectItem>
                <SelectItem value="late">遅刻</SelectItem>
                <SelectItem value="early">早退</SelectItem>
                <SelectItem value="absent">欠勤</SelectItem>
                <SelectItem value="holiday">休日</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 検索ボックス */}
          <div className="relative w-full md:w-[220px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="日付で検索..."
              className="pl-10 bg-white shadow-sm border-gray-200 hover:border-green-300 focus:border-green-400 transition-colors"
            />
          </div>
        </div>

        {/* アクションボタン */}
        <div className="flex gap-3 w-full lg:w-auto justify-end">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2 bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300 shadow-sm transition-all duration-200 hover:scale-105"
          >
            <Filter className="w-4 h-4" />
            詳細フィルター
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 border-green-200 hover:border-green-300 text-green-700 shadow-sm transition-all duration-200 hover:scale-105"
          >
            <Download className="w-4 h-4" />
            エクスポート
          </Button>
        </div>
      </div>
    </Card>
  );
}