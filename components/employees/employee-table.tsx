"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Eye, 
  Edit, 
  Trash2, 
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

interface EmployeeTableProps {
  employees: any[];
  onEmployeeSelect: (employee: any) => void;
  onEmployeeEdit: (employee: any) => void;
  onEmployeeDelete: (employeeId: string) => void;
}

export function EmployeeTable({ 
  employees, 
  onEmployeeSelect, 
  onEmployeeEdit, 
  onEmployeeDelete 
}: EmployeeTableProps) {
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
        aValue = a.personalInfo.lastName + a.personalInfo.firstName;
        bValue = b.personalInfo.lastName + b.personalInfo.firstName;
        break;
      case 'employeeId':
        aValue = a.employmentInfo.employeeId;
        bValue = b.employmentInfo.employeeId;
        break;
      case 'department':
        aValue = a.employmentInfo.department;
        bValue = b.employmentInfo.department;
        break;
      case 'hireDate':
        aValue = new Date(a.employmentInfo.hireDate);
        bValue = new Date(b.employmentInfo.hireDate);
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
      setSelectedEmployees(paginatedEmployees.map(emp => emp.id));
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

  const getEmploymentTypeBadge = (type: string) => {
    const config = {
      'regular': { label: '正社員', className: 'bg-blue-100 text-blue-800' },
      'contract': { label: '契約社員', className: 'bg-green-100 text-green-800' },
      'parttime': { label: 'パート', className: 'bg-yellow-100 text-yellow-800' },
      'temporary': { label: 'アルバイト', className: 'bg-purple-100 text-purple-800' }
    };
    
    const typeConfig = config[type as keyof typeof config] || config.regular;
    return (
      <Badge className={typeConfig.className}>
        {typeConfig.label}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    return status === 'active' ? (
      <Badge className="bg-green-100 text-green-800">在籍中</Badge>
    ) : (
      <Badge className="bg-red-100 text-red-800">退職済み</Badge>
    );
  };

  return (
    <Card className="bg-gradient-to-br from-white/90 to-indigo-50/90 backdrop-blur-sm border-0 shadow-2xl">
      <div className="p-6">
        {/* テーブルヘッダー */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <h3 className="text-xl font-bold text-gray-800">従業員一覧</h3>
            {selectedEmployees.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">{selectedEmployees.length}件選択中</span>
                <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                  <Trash2 className="w-4 h-4 mr-1" />
                  一括削除
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
              <tr className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50">
                <th className="text-left p-4">
                  <Checkbox
                    checked={selectedEmployees.length === paginatedEmployees.length && paginatedEmployees.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </th>
                <th className="text-left p-4 font-bold text-gray-700">プロフィール</th>
                <th className="text-left p-4 font-bold text-gray-700">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('employeeId')}
                    className="flex items-center gap-1 hover:bg-blue-100 transition-colors font-bold"
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
                    className="flex items-center gap-1 hover:bg-blue-100 transition-colors font-bold"
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
                    className="flex items-center gap-1 hover:bg-blue-100 transition-colors font-bold"
                  >
                    部署・役職
                    <ArrowUpDown className="w-4 h-4" />
                  </Button>
                </th>
                <th className="text-left p-4 font-bold text-gray-700">雇用形態</th>
                <th className="text-left p-4 font-bold text-gray-700">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('hireDate')}
                    className="flex items-center gap-1 hover:bg-blue-100 transition-colors font-bold"
                  >
                    入社日
                    <ArrowUpDown className="w-4 h-4" />
                  </Button>
                </th>
                <th className="text-left p-4 font-bold text-gray-700">勤続年数</th>
                <th className="text-left p-4 font-bold text-gray-700">在籍状況</th>
                <th className="text-left p-4 font-bold text-gray-700">アクション</th>
              </tr>
            </thead>
            <tbody>
              {paginatedEmployees.map((employee, index) => (
                <tr
                  key={employee.id}
                  className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 group"
                >
                  <td className="p-4">
                    <Checkbox
                      checked={selectedEmployees.includes(employee.id)}
                      onCheckedChange={(checked) => handleSelectEmployee(employee.id, checked as boolean)}
                    />
                  </td>
                  <td className="p-4">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={employee.personalInfo.profileImage} />
                      <AvatarFallback>
                        {employee.personalInfo.lastName.charAt(0)}
                        {employee.personalInfo.firstName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </td>
                  <td className="p-4 font-mono font-semibold text-gray-800">
                    {employee.employmentInfo.employeeId}
                  </td>
                  <td className="p-4">
                    <div>
                      <div className="font-semibold text-gray-800">
                        {employee.personalInfo.lastName} {employee.personalInfo.firstName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {employee.personalInfo.lastNameKana} {employee.personalInfo.firstNameKana}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <div className="font-semibold text-gray-800">{employee.employmentInfo.department}</div>
                      <div className="text-sm text-gray-500">{employee.employmentInfo.position}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    {getEmploymentTypeBadge(employee.employmentInfo.employmentType)}
                  </td>
                  <td className="p-4 text-gray-600">
                    {new Date(employee.employmentInfo.hireDate).toLocaleDateString('ja-JP')}
                  </td>
                  <td className="p-4 text-gray-600">
                    {employee.employmentInfo.yearsOfService}年
                  </td>
                  <td className="p-4">
                    {getStatusBadge(employee.employmentInfo.status)}
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
                        <DropdownMenuItem onClick={() => onEmployeeEdit(employee)}>
                          <Edit className="mr-2 h-4 w-4" />
                          編集
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => onEmployeeDelete(employee.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          削除
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
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-md' 
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