"use client";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, Filter, X } from "lucide-react";

interface EmployeeFilters {
  search: string;
  department: string;
  employmentType: 'regular' | 'contract' | 'parttime' | 'temporary' | '';
  status: 'active' | 'inactive' | '';
}

interface EmployeeFiltersProps {
  filters: EmployeeFilters;
  onFiltersChange: (filters: EmployeeFilters) => void;
  departments: string[];
}

export function EmployeeFilters({ filters, onFiltersChange, departments }: EmployeeFiltersProps) {
  const handleFilterChange = (key: keyof EmployeeFilters, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const handleDepartmentChange = (value: string) => {
    const actualValue = value === "all" ? "" : value;
    handleFilterChange('department', actualValue);
  };

  const handleEmploymentTypeChange = (value: string) => {
    const actualValue = value === "all" ? "" : value;
    handleFilterChange('employmentType', actualValue as EmployeeFilters['employmentType']);
  };

  const handleStatusChange = (value: string) => {
    const actualValue = value === "all" ? "" : value;
    handleFilterChange('status', actualValue as EmployeeFilters['status']);
  };

  const clearFilters = () => {
    onFiltersChange({
      search: "",
      department: "",
      employmentType: "",
      status: ""
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== "");

  return (
    <Card className="p-6 bg-gradient-to-r from-white/90 to-blue-50/90 backdrop-blur-sm border-0 shadow-xl mb-6">
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto">
          {/* 検索ボックス */}
          <div className="relative w-full md:w-[300px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="氏名・社員番号で検索..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="pl-10 bg-white shadow-sm border-gray-200 hover:border-blue-300 focus:border-blue-400 transition-colors"
            />
          </div>

          {/* 部署フィルター */}
          <Select value={filters.department || "all"} onValueChange={handleDepartmentChange}>
            <SelectTrigger className="w-full md:w-[150px] bg-white shadow-sm border-gray-200 hover:border-blue-300 transition-colors">
              <SelectValue placeholder="部署" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">すべて</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* 雇用形態フィルター */}
          <Select value={filters.employmentType || "all"} onValueChange={handleEmploymentTypeChange}>
            <SelectTrigger className="w-full md:w-[150px] bg-white shadow-sm border-gray-200 hover:border-purple-300 transition-colors">
              <SelectValue placeholder="雇用形態" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">すべて</SelectItem>
              <SelectItem value="regular">正社員</SelectItem>
              <SelectItem value="contract">契約社員</SelectItem>
              <SelectItem value="parttime">パート</SelectItem>
              <SelectItem value="temporary">アルバイト</SelectItem>
            </SelectContent>
          </Select>

          {/* 在籍状況フィルター */}
          <Select value={filters.status || "all"} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-full md:w-[150px] bg-white shadow-sm border-gray-200 hover:border-green-300 transition-colors">
              <SelectValue placeholder="在籍状況" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">すべて</SelectItem>
              <SelectItem value="active">在籍中</SelectItem>
              <SelectItem value="inactive">退職済み</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* アクションボタン */}
        <div className="flex gap-3 w-full lg:w-auto justify-end">
          {hasActiveFilters && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearFilters}
              className="flex items-center gap-2 bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300 shadow-sm transition-all duration-200 hover:scale-105"
            >
              <X className="w-4 h-4" />
              クリア
            </Button>
          )}
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2 bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300 shadow-sm transition-all duration-200 hover:scale-105"
          >
            <Filter className="w-4 h-4" />
            詳細フィルター
          </Button>
        </div>
      </div>

      {/* アクティブフィルター表示 */}
      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap gap-2">
          {filters.search && (
            <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-1">
              検索: {filters.search}
              <button onClick={() => handleFilterChange('search', '')}>
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
          {filters.department && (
            <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm flex items-center gap-1">
              部署: {filters.department}
              <button onClick={() => handleFilterChange('department', '')}>
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
          {filters.employmentType && (
            <div className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm flex items-center gap-1">
              雇用形態: {filters.employmentType === 'regular' ? '正社員' : 
                        filters.employmentType === 'contract' ? '契約社員' :
                        filters.employmentType === 'parttime' ? 'パート' : 'アルバイト'}
              <button onClick={() => handleFilterChange('employmentType', '')}>
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
          {filters.status && (
            <div className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm flex items-center gap-1">
              在籍: {filters.status === 'active' ? '在籍中' : '退職済み'}
              <button onClick={() => handleFilterChange('status', '')}>
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}