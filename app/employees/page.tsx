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
import { useState } from "react";

// サンプルデータ
const employeesData = [
  {
    id: "EMP001",
    personalInfo: {
      lastName: "田中",
      firstName: "太郎",
      lastNameKana: "タナカ",
      firstNameKana: "タロウ",
      birthDate: "1985-04-15",
      gender: "male",
      phoneNumber: "090-1234-5678",
      email: "tanaka@company.com",
      profileImage: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    employmentInfo: {
      employeeId: "EMP001",
      hireDate: "2020-04-01",
      department: "開発部",
      position: "シニアエンジニア",
      employmentType: "regular",
      status: "active",
      yearsOfService: 5.2
    },
    salaryInfo: {
      basicSalary: 400000,
      totalAllowance: 80000
    }
  },
  {
    id: "EMP002",
    personalInfo: {
      lastName: "鈴木",
      firstName: "花子",
      lastNameKana: "スズキ",
      firstNameKana: "ハナコ",
      birthDate: "1990-08-22",
      gender: "female",
      phoneNumber: "080-9876-5432",
      email: "suzuki@company.com",
      profileImage: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    employmentInfo: {
      employeeId: "EMP002",
      hireDate: "2022-10-01",
      department: "人事部",
      position: "主任",
      employmentType: "regular",
      status: "active",
      yearsOfService: 2.7
    },
    salaryInfo: {
      basicSalary: 350000,
      totalAllowance: 60000
    }
  },
  {
    id: "EMP003",
    personalInfo: {
      lastName: "佐藤",
      firstName: "次郎",
      lastNameKana: "サトウ",
      firstNameKana: "ジロウ",
      birthDate: "1988-12-10",
      gender: "male",
      phoneNumber: "070-5555-1234",
      email: "sato@company.com",
      profileImage: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    employmentInfo: {
      employeeId: "EMP003",
      hireDate: "2019-07-15",
      department: "営業部",
      position: "課長",
      employmentType: "regular",
      status: "active",
      yearsOfService: 6.4
    },
    salaryInfo: {
      basicSalary: 450000,
      totalAllowance: 90000
    }
  },
  {
    id: "EMP004",
    personalInfo: {
      lastName: "高橋",
      firstName: "美咲",
      lastNameKana: "タカハシ",
      firstNameKana: "ミサキ",
      birthDate: "1992-03-25",
      gender: "female",
      phoneNumber: "080-7777-9999",
      email: "takahashi@company.com",
      profileImage: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    employmentInfo: {
      employeeId: "EMP004",
      hireDate: "2023-01-10",
      department: "経理部",
      position: "スタッフ",
      employmentType: "contract",
      status: "active",
      yearsOfService: 1.9
    },
    salaryInfo: {
      basicSalary: 280000,
      totalAllowance: 40000
    }
  },
  {
    id: "EMP005",
    personalInfo: {
      lastName: "山田",
      firstName: "健一",
      lastNameKana: "ヤマダ",
      firstNameKana: "ケンイチ",
      birthDate: "1980-09-08",
      gender: "male",
      phoneNumber: "090-3333-4444",
      email: "yamada@company.com",
      profileImage: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    employmentInfo: {
      employeeId: "EMP005",
      hireDate: "2018-03-01",
      department: "総務部",
      position: "部長",
      employmentType: "regular",
      status: "active",
      yearsOfService: 7.3
    },
    salaryInfo: {
      basicSalary: 500000,
      totalAllowance: 120000
    }
  }
];

const departmentStats = [
  { name: "開発部", count: 25, color: "#3b82f6" },
  { name: "営業部", count: 18, color: "#10b981" },
  { name: "人事部", count: 8, color: "#f59e0b" },
  { name: "経理部", count: 6, color: "#ef4444" },
  { name: "総務部", count: 5, color: "#8b5cf6" }
];

export default function EmployeesPage() {
  const [employees, setEmployees] = useState(employeesData);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);
  const [showCSVImport, setShowCSVImport] = useState(false);
  const [showCSVExport, setShowCSVExport] = useState(false);
  const [showDepartmentManagement, setShowDepartmentManagement] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    department: "",
    employmentType: "",
    status: ""
  });

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

  const handleEmployeeDelete = (employeeId: string) => {
    setEmployees(employees.filter(emp => emp.id !== employeeId));
  };

  const handleEmployeeSave = (employeeData: any) => {
    if (selectedEmployee) {
      // 編集
      setEmployees(employees.map(emp => 
        emp.id === selectedEmployee.id ? { ...emp, ...employeeData } : emp
      ));
    } else {
      // 新規追加
      const newEmployee = {
        id: `EMP${String(employees.length + 1).padStart(3, '0')}`,
        ...employeeData
      };
      setEmployees([...employees, newEmployee]);
    }
    setShowEmployeeForm(false);
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