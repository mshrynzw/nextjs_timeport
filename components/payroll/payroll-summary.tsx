"use client";

import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Calculator, Award, Minus } from "lucide-react";
import { useMemo } from "react";

interface PayrollSummaryProps {
  allowances: any;
  deductions: any;
  payrollData: Array<{
    month: string;
    totalPay: number;
    totalDeduction: number;
    netPay: number;
  }>;
  selectedMonth: string;
}

export function PayrollSummary({ allowances, deductions, payrollData, selectedMonth }: PayrollSummaryProps) {
  const calculations = useMemo(() => {
    const totalPay = Object.values(allowances).reduce((sum: number, value: any) => sum + value, 0);
    const totalDeduction = Object.values(deductions).reduce((sum: number, value: any) => sum + value, 0);
    const netPay = totalPay - totalDeduction;

    // 前月比較
    const currentIndex = payrollData.findIndex(data => data.month === selectedMonth);
    const prevMonthData = currentIndex > 0 ? payrollData[currentIndex - 1] : null;
    const monthlyChange = prevMonthData ? netPay - prevMonthData.netPay : 0;

    return {
      totalPay,
      totalDeduction,
      netPay,
      monthlyChange
    };
  }, [allowances, deductions, payrollData, selectedMonth]);

  const summaryCards = [
    {
      title: "総支給額",
      value: calculations.totalPay,
      icon: DollarSign,
      gradient: "from-green-500 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-50",
      borderColor: "border-green-200",
      textColor: "text-green-800"
    },
    {
      title: "控除合計",
      value: calculations.totalDeduction,
      icon: Calculator,
      gradient: "from-red-500 to-red-600",
      bgGradient: "from-red-50 to-pink-50",
      borderColor: "border-red-200",
      textColor: "text-red-800"
    },
    {
      title: "差引支給額",
      value: calculations.netPay,
      icon: Award,
      gradient: "from-blue-500 to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-800",
      highlight: true
    },
    {
      title: "前月比較",
      value: calculations.monthlyChange,
      icon: calculations.monthlyChange >= 0 ? TrendingUp : calculations.monthlyChange < 0 ? TrendingDown : Minus,
      gradient: calculations.monthlyChange >= 0 ? "from-green-500 to-green-600" : calculations.monthlyChange < 0 ? "from-red-500 to-red-600" : "from-gray-500 to-gray-600",
      bgGradient: calculations.monthlyChange >= 0 ? "from-green-50 to-emerald-50" : calculations.monthlyChange < 0 ? "from-red-50 to-pink-50" : "from-gray-50 to-gray-100",
      borderColor: calculations.monthlyChange >= 0 ? "border-green-200" : calculations.monthlyChange < 0 ? "border-red-200" : "border-gray-200",
      textColor: calculations.monthlyChange >= 0 ? "text-green-800" : calculations.monthlyChange < 0 ? "text-red-800" : "text-gray-800",
      isChange: true
    }
  ];

  return (
    <div className="mb-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 tracking-wide">給与サマリー</h2>
        <p className="text-gray-600 mt-1">今月の給与概要</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryCards.map((card, index) => {
          const IconComponent = card.icon;
          return (
            <Card
              key={index}
              className={`p-6 bg-gradient-to-br ${card.bgGradient} backdrop-blur-sm border-2 ${card.borderColor} shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 transform relative overflow-hidden group ${
                card.highlight ? 'ring-2 ring-blue-300 ring-opacity-50' : ''
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="flex items-center justify-between mb-4 relative z-10">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${card.gradient} shadow-lg`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                {card.highlight && (
                  <div className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                    メイン
                  </div>
                )}
              </div>
              
              <div className="space-y-3 relative z-10">
                <h3 className="text-sm font-semibold text-gray-600 tracking-wide">{card.title}</h3>
                <div className="space-y-1">
                  <div className={`text-3xl font-bold ${card.textColor} font-mono tracking-wider`}>
                    {card.isChange ? (
                      <>
                        {calculations.monthlyChange >= 0 ? '+' : ''}
                        ¥{Math.abs(card.value).toLocaleString()}
                      </>
                    ) : (
                      `¥${card.value.toLocaleString()}`
                    )}
                  </div>
                  {card.isChange && (
                    <div className="text-xs text-gray-500">
                      {calculations.monthlyChange === 0 ? '変動なし' : '前月比'}
                    </div>
                  )}
                </div>
              </div>

              {/* 装飾的なグラデーション */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${card.gradient} opacity-60`}></div>
              
              {card.highlight && (
                <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-blue-400"></div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}