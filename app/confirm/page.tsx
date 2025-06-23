"use client";

import { Navbar } from "@/components/navbar";
import { PayrollHeader } from "@/components/payroll-confirm/payroll-header";
import { StepIndicator } from "@/components/payroll-confirm/step-indicator";
import { EmployeePayrollTable } from "@/components/payroll-confirm/employee-payroll-table";
import { PayrollDetailModal } from "@/components/payroll-confirm/payroll-detail-modal";
import { AttendanceIssues } from "@/components/payroll-confirm/attendance-issues";
import { ApprovalWorkflow } from "@/components/payroll-confirm/approval-workflow";
import { OutputGenerators } from "@/components/payroll-confirm/output-generators";
import { useState } from "react";

// サンプルデータ
const payrollConfirmData = {
  period: {
    year: 2025,
    month: 6,
    cutoffDate: "2025-06-25",
    paymentDate: "2025-07-10",
    status: "processing" as const // draft/processing/approved/finalized
  },
  summary: {
    totalEmployees: 62,
    totalGrossPay: 31250000,
    totalDeduction: 6280000,
    totalNetPay: 24970000,
    processedCount: 45,
    pendingCount: 17
  },
  employees: [
    {
      employeeId: "EMP001",
      name: "田中 太郎",
      department: "開発部",
      position: "シニアエンジニア",
      attendance: {
        workDays: 21,
        actualHours: 176.5,
        overtimeHours: 8.5,
        nightHours: 2.0,
        holidayHours: 0
      },
      salary: {
        basicSalary: 300000,
        positionAllowance: 50000,
        qualificationAllowance: 10000,
        housingAllowance: 20000,
        familyAllowance: 15000,
        commutingAllowance: 8000,
        mealAllowance: 5000,
        overtimeAllowance: 45000,
        nightAllowance: 12000,
        holidayAllowance: 0,
        attendanceBonus: 10000,
        performanceBonus: 30000,
        totalGrossPay: 505000
      },
      deductions: {
        healthInsurance: 15000,
        pensionInsurance: 28000,
        employmentInsurance: 1500,
        longTermCareInsurance: 2500,
        incomeTax: 18000,
        residentTax: 22000,
        lifeInsurance: 8000,
        propertyForming: 20000,
        companyLoan: 5000,
        unionFee: 2000,
        socialClubFee: 1000,
        totalDeduction: 123000
      },
      netPay: 382000,
      status: "confirmed" as const, // draft/calculated/confirmed/finalized
      hasIssues: false
    },
    {
      employeeId: "EMP002",
      name: "鈴木 花子",
      department: "人事部",
      position: "主任",
      attendance: {
        workDays: 20,
        actualHours: 160.0,
        overtimeHours: 0,
        nightHours: 0,
        holidayHours: 0
      },
      salary: {
        basicSalary: 350000,
        positionAllowance: 30000,
        qualificationAllowance: 5000,
        housingAllowance: 20000,
        familyAllowance: 10000,
        commutingAllowance: 6000,
        mealAllowance: 5000,
        overtimeAllowance: 0,
        nightAllowance: 0,
        holidayAllowance: 0,
        attendanceBonus: 10000,
        performanceBonus: 20000,
        totalGrossPay: 456000
      },
      deductions: {
        healthInsurance: 14000,
        pensionInsurance: 26000,
        employmentInsurance: 1400,
        longTermCareInsurance: 0,
        incomeTax: 16000,
        residentTax: 20000,
        lifeInsurance: 6000,
        propertyForming: 15000,
        companyLoan: 0,
        unionFee: 2000,
        socialClubFee: 1000,
        totalDeduction: 101400
      },
      netPay: 354600,
      status: "confirmed" as const,
      hasIssues: false
    },
    {
      employeeId: "EMP015",
      name: "山田 花子",
      department: "営業部",
      position: "営業担当",
      attendance: {
        workDays: 19,
        actualHours: 152.0,
        overtimeHours: 12.0,
        nightHours: 0,
        holidayHours: 8.0
      },
      salary: {
        basicSalary: 280000,
        positionAllowance: 0,
        qualificationAllowance: 0,
        housingAllowance: 15000,
        familyAllowance: 5000,
        commutingAllowance: 8000,
        mealAllowance: 5000,
        overtimeAllowance: 18000,
        nightAllowance: 0,
        holidayAllowance: 10800,
        attendanceBonus: 0,
        performanceBonus: 15000,
        totalGrossPay: 356800
      },
      deductions: {
        healthInsurance: 12000,
        pensionInsurance: 22000,
        employmentInsurance: 1200,
        longTermCareInsurance: 0,
        incomeTax: 12000,
        residentTax: 15000,
        lifeInsurance: 4000,
        propertyForming: 10000,
        companyLoan: 0,
        unionFee: 2000,
        socialClubFee: 1000,
        totalDeduction: 79200
      },
      netPay: 277600,
      status: "draft" as const,
      hasIssues: true
    }
  ],
  issues: [
    {
      employeeId: "EMP015",
      name: "山田 花子",
      issueType: "missing_timecard",
      severity: "error" as const,
      description: "6月20日の出勤打刻が未入力です",
      suggestedAction: "勤怠データを手動入力してください"
    },
    {
      employeeId: "EMP023",
      name: "佐藤 次郎",
      issueType: "overtime_limit",
      severity: "warning" as const,
      description: "月間残業時間が45時間を超過しています（48時間）",
      suggestedAction: "36協定の確認と労働時間の調整が必要です"
    }
  ]
};

export default function PayrollConfirmPage() {
  const [currentStep, setCurrentStep] = useState(3);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showIssues, setShowIssues] = useState(false);
  const [showApproval, setShowApproval] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [payrollData, setPayrollData] = useState(payrollConfirmData);

  const handleEmployeeSelect = (employee: any) => {
    setSelectedEmployee(employee);
    setShowDetailModal(true);
  };

  const handleEmployeeUpdate = (updatedEmployee: any) => {
    setPayrollData(prev => ({
      ...prev,
      employees: prev.employees.map(emp => 
        emp.employeeId === updatedEmployee.employeeId ? updatedEmployee : emp
      )
    }));
  };

  const handleBulkConfirm = (employeeIds: string[]) => {
    setPayrollData(prev => ({
      ...prev,
      employees: prev.employees.map(emp => 
        employeeIds.includes(emp.employeeId) 
          ? { ...emp, status: "confirmed" as const }
          : emp
      )
    }));
  };

  const handleRecalculate = (employeeIds: string[]) => {
    // 給与再計算ロジック
    console.log("Recalculating payroll for:", employeeIds);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100 relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-emerald-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-green-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-emerald-400/10 to-green-600/10 rounded-full blur-3xl"></div>
      </div>

      <Navbar />

      <div className="pt-20 pb-8">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          {/* ヘッダー */}
          <div className="mb-10 text-center">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-blue-600 bg-clip-text text-transparent mb-4 tracking-tight">
              給与確定
            </h1>
            <p className="text-xl text-gray-600 font-medium">給与計算・確認・承認プロセス</p>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-600 mx-auto mt-4 rounded-full"></div>
          </div>

          {/* 給与処理ヘッダー */}
          <PayrollHeader 
            period={payrollData.period}
            summary={payrollData.summary}
            onStepChange={setCurrentStep}
            onShowIssues={() => setShowIssues(true)}
            onShowApproval={() => setShowApproval(true)}
            onShowOutput={() => setShowOutput(true)}
          />

          {/* ステップインジケーター */}
          <StepIndicator 
            currentStep={currentStep}
            onStepChange={setCurrentStep}
          />

          {/* 従業員別給与一覧 */}
          <EmployeePayrollTable 
            employees={payrollData.employees}
            onEmployeeSelect={handleEmployeeSelect}
            onBulkConfirm={handleBulkConfirm}
            onRecalculate={handleRecalculate}
          />

          {/* モーダル */}
          {showDetailModal && selectedEmployee && (
            <PayrollDetailModal
              employee={selectedEmployee}
              isOpen={showDetailModal}
              onClose={() => setShowDetailModal(false)}
              onUpdate={handleEmployeeUpdate}
            />
          )}

          {showIssues && (
            <AttendanceIssues
              issues={payrollData.issues}
              isOpen={showIssues}
              onClose={() => setShowIssues(false)}
            />
          )}

          {showApproval && (
            <ApprovalWorkflow
              isOpen={showApproval}
              onClose={() => setShowApproval(false)}
              payrollData={payrollData}
            />
          )}

          {showOutput && (
            <OutputGenerators
              isOpen={showOutput}
              onClose={() => setShowOutput(false)}
              employees={payrollData.employees}
              period={payrollData.period}
            />
          )}
        </div>
      </div>
    </div>
  );
}