"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Calculator, TrendingUp, DollarSign, Target, Award } from "lucide-react";
import { useMemo } from "react";

interface DeductionSummaryProps {
  deductionData: any;
}

export function DeductionSummary({ deductionData }: DeductionSummaryProps) {
  const summary = useMemo(() => {
    // 扶養控除計算
    const spouseDeduction = deductionData.spouse.hasSpouse ? deductionData.spouse.deductionAmount : 0;
    const dependentDeduction = deductionData.dependents.reduce((sum: number, dep: any) => sum + dep.deductionAmount, 0);
    
    // 保険料控除計算
    const lifeInsuranceDeduction = deductionData.insuranceDeductions.lifeInsurance.totalDeduction || 0;
    const earthquakeInsuranceDeduction = deductionData.insuranceDeductions.earthquakeInsurance.deduction || 0;
    
    // 社会保険料控除計算
    const socialInsuranceDeduction = Object.values(deductionData.socialInsurance).reduce((sum: number, value: any) => sum + value, 0);
    
    // その他控除計算
    const otherDeductionsTotal = Object.values(deductionData.otherDeductions).reduce((sum: number, value: any) => sum + value, 0);
    
    // 基礎控除
    const basicDeduction = 480000;
    
    // 総控除額
    const totalDeductions = spouseDeduction + dependentDeduction + lifeInsuranceDeduction + 
                           earthquakeInsuranceDeduction + socialInsuranceDeduction + 
                           otherDeductionsTotal + basicDeduction;
    
    // 進捗計算（仮の目標控除額）
    const targetDeductions = 2000000;
    const progress = Math.min((totalDeductions / targetDeductions) * 100, 100);

    return {
      spouseDeduction,
      dependentDeduction,
      lifeInsuranceDeduction,
      earthquakeInsuranceDeduction,
      socialInsuranceDeduction,
      otherDeductionsTotal,
      basicDeduction,
      totalDeductions,
      progress
    };
  }, [deductionData]);

  const summaryItems = [
    {
      title: "基礎控除",
      amount: summary.basicDeduction,
      icon: Target,
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50 to-indigo-50"
    },
    {
      title: "扶養控除",
      amount: summary.spouseDeduction + summary.dependentDeduction,
      icon: DollarSign,
      gradient: "from-green-500 to-green-600",
      bgGradient: "from-green-50 to-emerald-50"
    },
    {
      title: "保険料控除",
      amount: summary.lifeInsuranceDeduction + summary.earthquakeInsuranceDeduction,
      icon: Calculator,
      gradient: "from-purple-500 to-purple-600",
      bgGradient: "from-purple-50 to-pink-50"
    },
    {
      title: "その他控除",
      amount: summary.socialInsuranceDeduction + summary.otherDeductionsTotal,
      icon: TrendingUp,
      gradient: "from-orange-500 to-orange-600",
      bgGradient: "from-orange-50 to-red-50"
    }
  ];

  return (
    <div className="space-y-6">
      {/* 総控除額カード */}
      <Card className="p-6 bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-2xl sticky top-24">
        <div className="flex items-center mb-4">
          <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm mr-4">
            <Award className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold">総控除額</h3>
        </div>
        
        <div className="text-center mb-6">
          <div className="text-4xl font-bold mb-2">
            ¥{summary.totalDeductions.toLocaleString()}
          </div>
          <div className="text-indigo-100">年間控除額合計</div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span>控除進捗</span>
            <span>{summary.progress.toFixed(1)}%</span>
          </div>
          <Progress value={summary.progress} className="h-2 bg-white/20" />
        </div>

        <div className="text-xs text-indigo-100 text-center">
          ※ 控除額が多いほど税負担が軽減されます
        </div>
      </Card>

      {/* 控除項目別サマリー */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-800">控除内訳</h4>
        
        {summaryItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <Card
              key={index}
              className={`p-4 bg-gradient-to-br ${item.bgGradient} border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${item.gradient} shadow-md mr-3`}>
                    <IconComponent className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-600">{item.title}</div>
                    <div className="text-lg font-bold text-gray-800">
                      ¥{item.amount.toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">構成比</div>
                  <div className="text-sm font-semibold text-gray-700">
                    {summary.totalDeductions > 0 ? ((item.amount / summary.totalDeductions) * 100).toFixed(1) : 0}%
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* 節税効果 */}
      <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
        <div className="text-center">
          <div className="text-sm text-green-600 font-medium mb-1">予想節税効果</div>
          <div className="text-2xl font-bold text-green-700">
            ¥{Math.round(summary.totalDeductions * 0.2).toLocaleString()}
          </div>
          <div className="text-xs text-green-600 mt-1">
            ※ 税率20%で計算した概算値
          </div>
        </div>
      </Card>

      {/* 入力完了度 */}
      <Card className="p-4 bg-gradient-to-br from-gray-50 to-slate-50 border-2 border-gray-200">
        <div className="text-center">
          <div className="text-sm text-gray-600 font-medium mb-2">入力完了度</div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-600">
              <span>扶養情報</span>
              <span>{deductionData.spouse.hasSpouse || deductionData.dependents.length > 0 ? "完了" : "未入力"}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              <span>所得控除</span>
              <span>{summary.lifeInsuranceDeduction > 0 ? "完了" : "未入力"}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              <span>保険情報</span>
              <span>{deductionData.insuranceInfo.healthInsurance.certificateNumber ? "完了" : "未入力"}</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}