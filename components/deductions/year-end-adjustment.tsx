"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Calculator, TrendingUp, Download, Eye } from "lucide-react";
import { useMemo } from "react";

interface YearEndAdjustmentProps {
  deductionData: any;
}

export function YearEndAdjustment({ deductionData }: YearEndAdjustmentProps) {
  const calculations = useMemo(() => {
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
    
    // 基礎控除（2020年以降）
    const basicDeduction = 480000;
    
    // 総控除額
    const totalDeductions = spouseDeduction + dependentDeduction + lifeInsuranceDeduction + 
                           earthquakeInsuranceDeduction + socialInsuranceDeduction + 
                           otherDeductionsTotal + basicDeduction;
    
    // 仮の年収（実際は給与データから取得）
    const annualIncome = 5000000;
    const taxableIncome = Math.max(0, annualIncome - totalDeductions);
    
    // 所得税計算（簡易版）
    let incomeTax = 0;
    if (taxableIncome <= 1950000) {
      incomeTax = taxableIncome * 0.05;
    } else if (taxableIncome <= 3300000) {
      incomeTax = taxableIncome * 0.1 - 97500;
    } else if (taxableIncome <= 6950000) {
      incomeTax = taxableIncome * 0.2 - 427500;
    } else {
      incomeTax = taxableIncome * 0.23 - 636000;
    }
    
    // 住民税計算（簡易版）
    const residentTax = taxableIncome * 0.1;
    
    // 手取り額計算
    const netIncome = annualIncome - incomeTax - residentTax - socialInsuranceDeduction;

    return {
      spouseDeduction,
      dependentDeduction,
      lifeInsuranceDeduction,
      earthquakeInsuranceDeduction,
      socialInsuranceDeduction,
      otherDeductionsTotal,
      basicDeduction,
      totalDeductions,
      annualIncome,
      taxableIncome,
      incomeTax,
      residentTax,
      netIncome
    };
  }, [deductionData]);

  const deductionSummary = [
    { label: "基礎控除", amount: calculations.basicDeduction, color: "text-blue-600" },
    { label: "配偶者控除", amount: calculations.spouseDeduction, color: "text-pink-600" },
    { label: "扶養控除", amount: calculations.dependentDeduction, color: "text-green-600" },
    { label: "生命保険料控除", amount: calculations.lifeInsuranceDeduction, color: "text-purple-600" },
    { label: "地震保険料控除", amount: calculations.earthquakeInsuranceDeduction, color: "text-orange-600" },
    { label: "社会保険料控除", amount: calculations.socialInsuranceDeduction, color: "text-indigo-600" },
    { label: "その他控除", amount: calculations.otherDeductionsTotal, color: "text-gray-600" },
  ];

  const taxSummary = [
    { label: "年収", amount: calculations.annualIncome, color: "text-green-600" },
    { label: "総控除額", amount: calculations.totalDeductions, color: "text-blue-600" },
    { label: "課税所得", amount: calculations.taxableIncome, color: "text-orange-600" },
    { label: "予想所得税", amount: calculations.incomeTax, color: "text-red-600" },
    { label: "予想住民税", amount: calculations.residentTax, color: "text-purple-600" },
    { label: "予想手取り額", amount: calculations.netIncome, color: "text-green-700" },
  ];

  const documents = [
    { name: "扶養控除等申告書", status: "作成可能", icon: FileText },
    { name: "基礎控除申告書", status: "作成可能", icon: FileText },
    { name: "配偶者控除等申告書", status: "作成可能", icon: FileText },
    { name: "所得金額調整控除申告書", status: "対象外", icon: FileText },
  ];

  return (
    <div className="space-y-8">
      {/* 控除額サマリー */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
        <div className="flex items-center mb-6">
          <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 mr-4 shadow-lg">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">控除額サマリー</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {deductionSummary.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-lg border border-blue-200 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">{item.label}</span>
                <span className={`font-bold ${item.color}`}>
                  ¥{item.amount.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">総控除額</span>
            <span className="text-2xl font-bold">
              ¥{calculations.totalDeductions.toLocaleString()}
            </span>
          </div>
        </div>
      </Card>

      {/* 税額シミュレーション */}
      <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
        <div className="flex items-center mb-6">
          <div className="p-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 mr-4 shadow-lg">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">税額シミュレーション</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {taxSummary.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-lg border border-green-200 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">{item.label}</span>
                <span className={`font-bold ${item.color}`}>
                  ¥{item.amount.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-lg">
          <div className="text-center">
            <div className="text-sm opacity-90">年末調整による還付予想額</div>
            <div className="text-3xl font-bold mt-2">
              ¥{Math.max(0, 200000 - calculations.incomeTax).toLocaleString()}
            </div>
          </div>
        </div>
      </Card>

      {/* 申告書プレビュー */}
      <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
        <div className="flex items-center mb-6">
          <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 mr-4 shadow-lg">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">申告書プレビュー</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {documents.map((doc, index) => {
            const IconComponent = doc.icon;
            return (
              <div key={index} className="bg-white p-4 rounded-lg border border-purple-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <IconComponent className="w-5 h-5 text-purple-600 mr-3" />
                    <div>
                      <div className="font-semibold text-gray-800">{doc.name}</div>
                      <div className={`text-sm ${
                        doc.status === "作成可能" ? "text-green-600" : "text-gray-500"
                      }`}>
                        {doc.status}
                      </div>
                    </div>
                  </div>
                  {doc.status === "作成可能" && (
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      プレビュー
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex gap-4 justify-center">
          <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            <Download className="w-4 h-4 mr-2" />
            申告書をダウンロード
          </Button>
          <Button variant="outline" className="border-purple-200 hover:bg-purple-50">
            <FileText className="w-4 h-4 mr-2" />
            印刷用PDF作成
          </Button>
        </div>
      </Card>
    </div>
  );
}