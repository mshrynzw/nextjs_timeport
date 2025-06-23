"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Download } from "lucide-react";
import { Card } from "@/components/ui/card";

interface AttendanceFilterProps {
  onFilterChange: (filters: any) => void;
}

export function AttendanceFilter({ onFilterChange }: AttendanceFilterProps) {
  return (
    <Card className="p-4 bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-6">
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto">
          {/* 月選択 */}
          <Select defaultValue="2025-06">
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="月を選択" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025-06">2025年6月</SelectItem>
              <SelectItem value="2025-05">2025年5月</SelectItem>
              <SelectItem value="2025-04">2025年4月</SelectItem>
              <SelectItem value="2025-03">2025年3月</SelectItem>
            </SelectContent>
          </Select>

          {/* ステータスフィルター */}
          <Select defaultValue="all">
            <SelectTrigger className="w-full md:w-[140px]">
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

          {/* 検索ボックス */}
          <div className="relative w-full md:w-[200px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="日付で検索..."
              className="pl-10 bg-white"
            />
          </div>
        </div>

        {/* アクションボタン */}
        <div className="flex gap-2 w-full lg:w-auto justify-end">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            詳細フィルター
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            エクスポート
          </Button>
        </div>
      </div>
    </Card>
  );
}