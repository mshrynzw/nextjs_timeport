"use client";

import { Navbar } from "@/components/navbar";
import { PayrollHeader } from "@/components/payroll/payroll-header";
import { PayrollSummary } from "@/components/payroll/payroll-summary";
import { AttendanceInfo } from "@/components/payroll/attendance-info";
import { AllowanceTable } from "@/components/payroll/allowance-table";
import { DeductionTable } from "@/components/payroll/deduction-table";
import { PayrollChart } from "@/components/payroll/payroll-chart";
import { useState } from "react";

// サンプルデータ
const currentPayroll = {
  employeeInfo: {
    name: "田中 太郎",
    employeeId: "EMP001",
    department: "開発部",
    payMonth: "2025年6月"
  },
  attendance: {
    workDays: 21,
    absentDays: 0,
    paidLeaveDays: 1,
    lateEarlyCount: 0,
    regularHours: 168,
    actualHours: 176,
    overtimeHours: 8,
    nightHours: 2,
    holidayHours: 0
  },
  allowances: {
    basicSalary: 300000,
    positionAllowance: 50000,
    qualificationAllowance: 10000,
    housingAllowance: 20000,
    familyAllowance: 15000,
    commutingAllowance: 8000,
    mealAllowance: 5000,
    performanceAllowance: 30000,
    overtimeAllowance: 45000,
    nightAllowance: 12000,
    holidayAllowance: 25000
  },
  deductions: {
    healthInsurance: 15000,
    pensionInsurance: 28000,
    employmentInsurance: 1500,
    incomeTax: 18000,
    residentTax: 22000,
    lifeInsurance: 8000,
    savings: 20000,
    internalSavings: 10000,
    unionFee: 2000
  }
};

const payrollData = [
  { month: "2024-07", totalPay: 520000, totalDeduction: 104500, netPay: 415500 },
  { month: "2024-08", totalPay: 535000, totalDeduction: 107000, netPay: 428000 },
  { month: "2024-09", totalPay: 510000, totalDeduction: 102000, netPay: 408000 },
  { month: "2024-10", totalPay: 545000, totalDeduction: 109000, netPay: 436000 },
  { month: "2024-11", totalPay: 530000, totalDeduction: 106000, netPay: 424000 },
  { month: "2024-12", totalPay: 580000, totalDeduction: 116000, netPay: 464000 },
  { month: "2025-01", totalPay: 525000, totalDeduction: 105000, netPay: 420000 },
  { month: "2025-02", totalPay: 540000, totalDeduction: 108000, netPay: 432000 },
  { month: "2025-03", totalPay: 515000, totalDeduction: 103000, netPay: 412000 },
  { month: "2025-04", totalPay: 550000, totalDeduction: 110000, netPay: 440000 },
  { month: "2025-05", totalPay: 535000, totalDeduction: 107000, netPay: 428000 },
  { month: "2025-06", totalPay: 520000, totalDeduction: 104500, netPay: 415500 }
];

export default function PayrollPage() {
  const [selectedMonth, setSelectedMonth] = useState("2025-06");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-emerald-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-orange-400/10 to-red-600/10 rounded-full blur-3xl"></div>
      </div>

      <Navbar />

      <div className="pt-20 pb-8">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          {/* ヘッダー */}
          <div className="mb-10 text-center">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-blue-600 bg-clip-text text-transparent mb-4 tracking-tight">
              月次給与明細
            </h1>
            <p className="text-xl text-gray-600 font-medium">給与・控除の詳細確認</p>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-600 mx-auto mt-4 rounded-full"></div>
          </div>

          {/* 従業員情報とアクション */}
          <PayrollHeader 
            employeeInfo={currentPayroll.employeeInfo}
            selectedMonth={selectedMonth}
            onMonthChange={setSelectedMonth}
          />

          {/* 給与サマリー */}
          <PayrollSummary 
            allowances={currentPayroll.allowances}
            deductions={currentPayroll.deductions}
            payrollData={payrollData}
            selectedMonth={selectedMonth}
          />

          {/* 勤怠情報 */}
          <AttendanceInfo attendance={currentPayroll.attendance} />

          {/* 支給項目詳細 */}
          <AllowanceTable allowances={currentPayroll.allowances} />

          {/* 控除項目詳細 */}
          <DeductionTable deductions={currentPayroll.deductions} />

          {/* 給与推移チャート */}
          <PayrollChart payrollData={payrollData} />
        </div>
      </div>
    </div>
  );
}