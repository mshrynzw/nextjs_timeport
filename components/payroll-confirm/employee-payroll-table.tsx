"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Eye, 
  Edit, 
  Calculator, 
  CheckCircle,
  AlertTriangle,
  ChevronLeft, 
  ChevronRight, 
  ArrowUpDown,
  MoreHorizontal
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface EmployeePayrollTableProps {
  employees: any[];
  onEmployeeSelect: (employee: any) => void;
  onBulkConfirm: (employeeIds: string[]) => void;
  onRecalculate: (employeeIds: string[]) => void;
}

export function EmployeePayrollTable({ 
  employees, 
  onEmployeeSelect, 
  onBulkConfirm, 
  onRecalculate 
}: EmployeePayrollTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedEmployees = [...employees].sort((a, b) => {
    if (!sortField) return 0;
    
    let aValue, bValue;
    
    switch (sortField) {
      case 'name':
        aValue = a.name;
        bValue = b.name;
        break;
      case 'employeeId':
        aValue = a.employeeId;
        bValue = b.employeeId;
        break;
      case 'department':
        aValue = a.department;
        bValue = b.department;
        break;
      case 'grossPay':
        aValue = a.salary.totalGrossPay;
        bValue = b.salary.totalGrossPay;
        break;
      case 'netPay':
        aValue = a.netPay;
        bValue = b.netPay;
        break;
      default:
        return 0;
    }
    
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEmployees = sortedEmployees.slice(startIndex, startIndex + itemsPerPage);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedEmployees(paginatedEmployees.map(emp => emp.employeeId));
    } else {
      setSelectedEmployees([]);
    }
  };

  const handleSelectEmployee = (employeeId: string, checked: boolean) => {
    if (checked) {
      setSelectedEmployees([...selectedEmployees, employeeId]);
    } else {
      setSelectedEmployees(selectedEmployees.filter(id => id !== employeeId));
    }
  };

  const getStatusBadge = (status: string, hasIssues: boolean) => {
    if (hasIssues) {
      return <Badge className="bg-red-100 text-red-800">要確認</Badge>;
    }
    
    const config = {
      'draft': { label: '未処理', className: 'bg-gray-100 text-gray-800' },
      'calculated': { label: '計算済み', className: 'bg-blue-100 text-blue-800' },
      'confirmed': { label: '確定済み', className: 'bg-green-100 text-green-800' },
      'finalized': { label: '最終確定', className: 'bg-purple-100 text-purple-800' }
    };
    
    const statusConfig = config[status as keyof typeof config] || config.draft;
    return (
      <Badge className={statusConfig.className}>
        {statusConfig.label}
      </Badge>
    );
  };

  return (
    <Card className="bg-gradient-to-br from-white/90 to-green-50/90 backdrop-blur-sm border-0 shadow-2xl">
      <div className="p-6">
        {/* テーブルヘッダー */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <h3 className="text-xl font-bold text-gray-800">従業員別給与一覧</h3>
            {selectedEmployees.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">{selectedEmployees.length}件選択中</span>
                <Button 
                  size="sm" 
                  onClick={() => onBulkConfirm(selectedEmployees)}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  一括確定
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => onRecalculate(selectedEmployees)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  <Calculator className="w-4 h-4 mr-1" />
                  再計算
                </Button>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">表示件数:</span>
            <select 
              value={itemsPerPage} 
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="border rounded px-2 py-1 text-sm"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>

        {/* テーブル */}
        <div className="overflow-x-auto bg-white rounded-xl shadow-inner border border-gray-100">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-green-50">
                <th className="text-left p-4">
                  <Checkbox
                    checked={selectedEmployees.length === paginatedEmployees.length && paginatedEmployees.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </th>
                <th className="text-left p-4 font-bold text-gray-700">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('employeeId')}
                    className="flex items-center gap-1 hover:bg-green-100 transition-colors font-bold"
                  >
                    社員番号
                    <ArrowUpDown className="w-4 h-4" />
                  </Button>
                </th>
                <th className="text-left p-4 font-bold text-gray-700">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('name')}
                    className="flex items-center gap-1 hover:bg-green-100 transition-colors font-bold"
                  >
                    氏名
                    <ArrowUpDown className="w-4 h-4" />
                  </Button>
                </th>
                <th className="text-left p-4 font-bold text-gray-700">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('department')}
                    className="flex items-center gap-1 hover:bg-green-100 transition-colors font-bold"
                  >
                    部署・役職
                    <ArrowUpDown className="w-4 h-4" />
                  </Button>
                </th>
                <th className="text-left p-4 font-bold text-gray-700">出勤・労働時間</th>
                <th className="text-left p-4 font-bold text-gray-700">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('grossPay')}
                    className="flex items-center gap-1 hover:bg-green-100 transition-colors font-bold"
                  >
                    総支給額
                    <ArrowUpDown className="w-4 h-4" />
                  </Button>
                </th>
                <th className="text-left p-4 font-bold text-gray-700">控除額</th>
                <th className="text-left p-4 font-bold text-gray-700">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('netPay')}
                    className="flex items-center gap-1 hover:bg-green-100 transition-colors font-bold"
                  >
                    差引支給額
                    <ArrowUpDown className="w-4 h-4" />
                  </Button>
                </th>
                <th className="text-left p-4 font-bold text-gray-700">確定状況</th>
                <th className="text-left p-4 font-bold text-gray-700">アクション</th>
              </tr>
            </thead>
            <tbody>
              {paginatedEmployees.map((employee, index) => (
                <tr
                  key={employee.employeeId}
                  className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-300 group"
                >
                  <td className="p-4">
                    <Checkbox
                      checked={selectedEmployees.includes(employee.employeeId)}
                      onCheckedChange={(checked) => handleSelectEmployee(employee.employeeId, checked as boolean)}
                    />
                  </td>
                  <td className="p-4 font-mono font-semibold text-gray-800">
                    {employee.employeeId}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center">
                      <div className="font-semibold text-gray-800">{employee.name}</div>
                      {employee.hasIssues && (
                        <AlertTriangle className="w-4 h-4 text-red-500 ml-2" />
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <div className="font-semibold text-gray-800">{employee.department}</div>
                      <div className="text-sm text-gray-500">{employee.position}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm">
                      <div>出勤: {employee.attendance.workDays}日</div>
                      <div>労働: {employee.attendance.actualHours}h</div>
                      <div>残業: {employee.attendance.overtimeHours}h</div>
                    </div>
                  </td>
                  <td className="p-4 font-mono font-bold text-green-600">
                    ¥{employee.salary.totalGrossPay.toLocaleString()}
                  </td>
                  <td className="p-4 font-mono font-bold text-red-600">
                    ¥{employee.deductions.totalDeduction.toLocaleString()}
                  </td>
                  <td className="p-4 font-mono font-bold text-blue-600">
                    ¥{employee.netPay.toLocaleString()}
                  </td>
                  <td className="p-4">
                    {getStatusBadge(employee.status, employee.hasIssues)}
                  </td>
                  <td className="p-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEmployeeSelect(employee)}>
                          <Eye className="mr-2 h-4 w-4" />
                          詳細表示
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEmployeeSelect(employee)}>
                          <Edit className="mr-2 h-4 w-4" />
                          編集
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onRecalculate([employee.employeeId])}>
                          <Calculator className="mr-2 h-4 w-4" />
                          再計算
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ページネーション */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-lg">
            全 {employees.length} 件中 {startIndex + 1}-{Math.min(startIndex + itemsPerPage, employees.length)} 件を表示
          </div>
          
          <div className="flex items-center gap-2">
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
            
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + 1;
                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 p-0 transition-all duration-200 hover:scale-105 ${
                      currentPage === page 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-md' 
                        : 'bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300 shadow-sm'
                    }`}
                  >
                    {page}
                  </Button>
                );
              })}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              className="bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300 shadow-sm transition-all duration-200 hover:scale-105"
            >
              次へ
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}