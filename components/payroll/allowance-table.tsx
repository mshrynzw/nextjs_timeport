"use client";

import { Card } from "@/components/ui/card";
import { DollarSign, Home, Award, Users, Car, Coffee, TrendingUp, Clock } from "lucide-react";

interface AllowanceTableProps {
  allowances: {
    basicSalary: number;
    positionAllowance: number;
    qualificationAllowance: number;
    housingAllowance: number;
    familyAllowance: number;
    commutingAllowance: number;
    mealAllowance: number;
    performanceAllowance: number;
    overtimeAllowance: number;
    nightAllowance: number;
    holidayAllowance: number;
  };
}

export function AllowanceTable({ allowances }: AllowanceTableProps) {
  const allowanceCategories = [
    {
      title: "基本給与",
      items: [
        { name: "基本給", value: allowances.basicSalary, icon: DollarSign, color: "text-blue-600" },
        { name: "役職手当", value: allowances.positionAllowance, icon: Award, color: "text-purple-600" },
        { name: "資格手当", value: allowances.qualificationAllowance, icon: Award, color: "text-green-600" },
        { name: "住宅手当", value: allowances.housingAllowance, icon: Home, color: "text-orange-600" },
        { name: "家族手当", value: allowances.familyAllowance, icon: Users, color: "text-pink-600" }
      ],
      gradient: "from-blue-50 to-indigo-50",
      borderColor: "border-blue-200"
    },
    {
      title: "諸手当",
      items: [
        { name: "通勤手当", value: allowances.commutingAllowance, icon: Car, color: "text-blue-600" },
        { name: "食事手当", value: allowances.mealAllowance, icon: Coffee, color: "text-green-600" },
        { name: "業績手当", value: allowances.performanceAllowance, icon: TrendingUp, color: "text-purple-600" }
      ],
      gradient: "from-green-50 to-emerald-50",
      borderColor: "border-green-200"
    },
    {
      title: "時間外手当",
      items: [
        { name: "残業手当", value: allowances.overtimeAllowance, icon: Clock, color: "text-orange-600" },
        { name: "深夜手当", value: allowances.nightAllowance, icon: Clock, color: "text-purple-600" },
        { name: "休日手当", value: allowances.holidayAllowance, icon: Clock, color: "text-red-600" }
      ],
      gradient: "from-orange-50 to-red-50",
      borderColor: "border-orange-200"
    }
  ];

  const totalAllowances = Object.values(allowances).reduce((sum, value) => sum + value, 0);

  return (
    <div className="mb-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 tracking-wide">支給項目詳細</h2>
        <p className="text-gray-600 mt-1">給与・手当の内訳</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {allowanceCategories.map((category, categoryIndex) => (
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

      {/* 総支給額 */}
      <Card className="p-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">総支給額</h3>
              <p className="text-green-100">全手当の合計金額</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold font-mono">
              ¥{totalAllowances.toLocaleString()}
            </div>
            <div className="text-green-100 text-sm">税引き前</div>
          </div>
        </div>
      </Card>
    </div>
  );
}