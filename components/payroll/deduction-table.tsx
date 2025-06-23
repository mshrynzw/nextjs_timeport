"use client";

import { Card } from "@/components/ui/card";
import { Shield, PiggyBank, Heart, Users, Calculator, Minus } from "lucide-react";

interface DeductionTableProps {
  deductions: {
    healthInsurance: number;
    pensionInsurance: number;
    employmentInsurance: number;
    incomeTax: number;
    residentTax: number;
    lifeInsurance: number;
    savings: number;
    internalSavings: number;
    unionFee: number;
  };
}

export function DeductionTable({ deductions }: DeductionTableProps) {
  const deductionCategories = [
    {
      title: "法定控除",
      items: [
        { name: "健康保険料", value: deductions.healthInsurance, icon: Shield, color: "text-blue-600" },
        { name: "厚生年金保険料", value: deductions.pensionInsurance, icon: Shield, color: "text-green-600" },
        { name: "雇用保険料", value: deductions.employmentInsurance, icon: Shield, color: "text-purple-600" },
        { name: "所得税", value: deductions.incomeTax, icon: Calculator, color: "text-orange-600" },
        { name: "住民税", value: deductions.residentTax, icon: Calculator, color: "text-red-600" }
      ],
      gradient: "from-red-50 to-pink-50",
      borderColor: "border-red-200"
    },
    {
      title: "その他控除",
      items: [
        { name: "生命保険料", value: deductions.lifeInsurance, icon: Heart, color: "text-pink-600" },
        { name: "財形貯蓄", value: deductions.savings, icon: PiggyBank, color: "text-green-600" },
        { name: "社内積立", value: deductions.internalSavings, icon: PiggyBank, color: "text-blue-600" },
        { name: "組合費", value: deductions.unionFee, icon: Users, color: "text-purple-600" }
      ],
      gradient: "from-gray-50 to-slate-50",
      borderColor: "border-gray-200"
    }
  ];

  const totalDeductions = Object.values(deductions).reduce((sum, value) => sum + value, 0);

  return (
    <div className="mb-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 tracking-wide">控除項目詳細</h2>
        <p className="text-gray-600 mt-1">税金・保険料・その他控除の内訳</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {deductionCategories.map((category, categoryIndex) => (
          <Card
            key={categoryIndex}
            className={`p-6 bg-gradient-to-br ${category.gradient} backdrop-blur-sm border-2 ${category.borderColor} shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105`}
          >
            <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">{category.title}</h3>
            
            <div className="space-y-4">
              {category.items.map((item, itemIndex) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={itemIndex}
                    className="flex items-center justify-between p-3 bg-white/70 rounded-lg hover:bg-white/90 transition-all duration-200 group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-white shadow-sm group-hover:shadow-md transition-shadow">
                        <IconComponent className={`w-4 h-4 ${item.color}`} />
                      </div>
                      <span className="font-medium text-gray-700">{item.name}</span>
                    </div>
                    <span className="font-bold text-gray-800 font-mono">
                      ¥{item.value.toLocaleString()}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">小計</span>
                <span className="font-bold text-lg text-gray-800 font-mono">
                  ¥{category.items.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* 総控除額 */}
      <Card className="p-6 bg-gradient-to-r from-red-500 to-red-600 text-white shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm">
              <Minus className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">総控除額</h3>
              <p className="text-red-100">全控除項目の合計金額</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold font-mono">
              ¥{totalDeductions.toLocaleString()}
            </div>
            <div className="text-red-100 text-sm">差引対象</div>
          </div>
        </div>
      </Card>
    </div>
  );
}