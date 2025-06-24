"use client";

import { Navbar } from "@/components/navbar";
import { EmployeeStats } from "@/components/employees/employee-stats";
import { EmployeeFilters } from "@/components/employees/employee-filters";
import { EmployeeTable } from "@/components/employees/employee-table";
import { EmployeeModal } from "@/components/employees/employee-modal";
import { EmployeeForm } from "@/components/employees/employee-form";
import { CSVImport } from "@/components/employees/csv-import";
import { CSVExport } from "@/components/employees/csv-export";
import { DepartmentManagement } from "@/components/employees/department-management";
import { useState, useEffect, useMemo } from "react";
import { Employee, EmployeeWithDetails } from "@/types/employee";
import { supabase } from "@/lib/supabase";

interface EmployeeFilters {
  search: string;
  department: string;
  employmentType: 'regular' | 'contract' | 'parttime' | 'temporary' | '';
  status: 'active' | 'inactive' | '';
}

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);
  const [showCSVImport, setShowCSVImport] = useState(false);
  const [showCSVExport, setShowCSVExport] = useState(false);
  const [showDepartmentManagement, setShowDepartmentManagement] = useState(false);
  const [filters, setFilters] = useState<EmployeeFilters>({
    search: "",
    department: "",
    employmentType: "",
    status: ""
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const { data, error } = await supabase
          .from('employees')
          .select('*');
        if (error) throw error;
        setEmployees(data || []);
      } catch (error) {
        console.error(error);
        alert('従業員データの読み込みに失敗しました。');
      }
    };
    fetchEmployees();
  }, []);

  const departmentStats = useMemo(() => {
    const counts: { [key: string]: number } = employees.reduce((acc, emp) => {
        const dept = emp.employmentInfo?.department || '未分類';
        acc[dept] = (acc[dept] || 0) + 1;
        return acc;
    }, {});
    
    const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#6366f1"];
    return Object.entries(counts).map(([name, count], index) => ({
        name,
        count: count,
        color: colors[index % colors.length]
    }));
  }, [employees]);

  const handleEmployeeSelect = (employee: any) => {
    setSelectedEmployee(employee);
    setShowEmployeeModal(true);
  };

  const handleEmployeeAdd = () => {
    setSelectedEmployee(null);
    setShowEmployeeForm(true);
  };

  const handleEmployeeEdit = (employee: any) => {
    setSelectedEmployee(employee);
    setShowEmployeeForm(true);
  };

  const handleEmployeeDelete = async (employeeId: string) => {
    if (!confirm('本当にこの従業員を削除しますか？')) return;
    try {
      const { error } = await supabase
        .from('employees')
        .delete()
        .eq('id', employeeId);
      if (error) throw error;
      setEmployees(employees.filter(emp => emp.id !== employeeId));
      setShowEmployeeModal(false);
      alert('従業員を削除しました。');
    } catch (error) {
      console.error('従業員の削除に失敗しました:', error);
      alert('従業員の削除に失敗しました。');
    }
  };

  const handleEmployeeSave = async (employeeData: any) => {
    try {
      if (selectedEmployee) {
        // 編集
        const { error } = await supabase
          .from('employees')
          .update(employeeData)
          .eq('id', selectedEmployee.id);
        if (error) throw error;
        setEmployees(employees.map(emp => emp.id === selectedEmployee.id ? { ...emp, ...employeeData } : emp));
        alert('従業員情報を更新しました。');
      } else {
        // 新規追加
        const { data, error } = await supabase
          .from('employees')
          .insert([employeeData])
          .select()
          .single();
        if (error) throw error;
        setEmployees([...employees, data]);
        alert('新しい従業員を登録しました。');
      }
      setShowEmployeeForm(false);
      setSelectedEmployee(null);
    } catch (error) {
      console.error('従業員の保存に失敗しました:', error);
      alert('従業員の保存に失敗しました。');
    }
  };

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = !filters.search || 
      employee.personalInfo.lastName.includes(filters.search) ||
      employee.personalInfo.firstName.includes(filters.search) ||
      employee.employmentInfo.employeeId.includes(filters.search);
    
    const matchesDepartment = !filters.department || 
      employee.employmentInfo.department === filters.department;
    
    const matchesEmploymentType = !filters.employmentType || 
      employee.employmentInfo.employmentType === filters.employmentType;
    
    const matchesStatus = !filters.status || 
      employee.employmentInfo.status === filters.status;

    return matchesSearch && matchesDepartment && matchesEmploymentType && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-600/10 rounded-full blur-3xl"></div>
      </div>

      <Navbar />

      <div className="pt-20 pb-8">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          {/* ヘッダー */}
          <div className="mb-10 text-center">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 tracking-tight">
              従業員管理
            </h1>
            <p className="text-xl text-gray-600 font-medium">従業員情報の管理・編集</p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-4 rounded-full"></div>
          </div>

          {/* 統計ダッシュボード */}
          <EmployeeStats 
            employees={employees}
            departmentStats={departmentStats}
            onAddEmployee={handleEmployeeAdd}
            onCSVImport={() => setShowCSVImport(true)}
            onCSVExport={() => setShowCSVExport(true)}
            onDepartmentManagement={() => setShowDepartmentManagement(true)}
          />

          {/* フィルター */}
          <EmployeeFilters 
            filters={filters}
            onFiltersChange={setFilters}
            departments={departmentStats.map(d => d.name)}
          />

          {/* 従業員テーブル */}
          <EmployeeTable 
            employees={filteredEmployees}
            onEmployeeSelect={handleEmployeeSelect}
            onEmployeeEdit={handleEmployeeEdit}
            onEmployeeDelete={handleEmployeeDelete}
          />

          {/* モーダル */}
          {showEmployeeModal && selectedEmployee && (
            <EmployeeModal
              employee={selectedEmployee}
              isOpen={showEmployeeModal}
              onClose={() => setShowEmployeeModal(false)}
              onEdit={() => {
                setShowEmployeeModal(false);
                handleEmployeeEdit(selectedEmployee);
              }}
            />
          )}

          {showEmployeeForm && (
            <EmployeeForm
              employee={selectedEmployee}
              isOpen={showEmployeeForm}
              onClose={() => setShowEmployeeForm(false)}
              onSave={handleEmployeeSave}
            />
          )}

          {showCSVImport && (
            <CSVImport
              isOpen={showCSVImport}
              onClose={() => setShowCSVImport(false)}
              onImport={(data) => {
                setEmployees([...employees, ...data]);
                setShowCSVImport(false);
              }}
            />
          )}

          {showCSVExport && (
            <CSVExport
              employees={employees}
              isOpen={showCSVExport}
              onClose={() => setShowCSVExport(false)}
            />
          )}

          {showDepartmentManagement && (
            <DepartmentManagement
              departments={departmentStats}
              isOpen={showDepartmentManagement}
              onClose={() => setShowDepartmentManagement(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}