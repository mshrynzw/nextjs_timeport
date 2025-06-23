"use client";

import { Navbar } from "@/components/navbar";
import { DeductionTabs } from "@/components/deductions/deduction-tabs";
import { DeductionSummary } from "@/components/deductions/deduction-summary";
import { useState } from "react";

// サンプルデータ
const initialDeductionData = {
  spouse: {
    hasSpouse: true,
    name: "田中 花子",
    income: 500000,
    age: 35,
    deductionType: "配偶者控除",
    deductionAmount: 380000
  },
  dependents: [
    {
      id: 1,
      name: "田中 一郎",
      relationship: "子",
      birthDate: "2010-04-15",
      income: 0,
      liveTogether: true,
      category: "一般",
      deductionAmount: 380000
    },
    {
      id: 2,
      name: "田中 二郎",
      relationship: "子",
      birthDate: "2005-08-20",
      income: 0,
      liveTogether: true,
      category: "特定",
      deductionAmount: 630000
    }
  ],
  insuranceDeductions: {
    lifeInsurance: {
      general: 80000,
      medical: 40000,
      pension: 60000,
      totalDeduction: 80000
    },
    earthquakeInsurance: {
      amount: 30000,
      deduction: 30000
    }
  },
  socialInsurance: {
    nationalPension: 200000,
    nationalHealth: 150000,
    careInsurance: 80000,
    others: 50000
  },
  otherDeductions: {
    smallBusiness: 84000,
    medical: 120000,
    donation: 50000,
    casualty: 0
  },
  insuranceInfo: {
    healthInsurance: {
      certificateNumber: "12345678",
      insuredCategory: "被保険者",
      premiumRate: 5.0,
      standardMonthlyRemuneration: 300000
    },
    pensionInsurance: {
      basicPensionNumber: "1234-567890",
      premiumRate: 9.15,
      standardMonthlyRemuneration: 300000,
      enrollmentMonths: 120
    },
    employmentInsurance: {
      insuredNumber: "12345-678901",
      premiumRate: 0.6,
      qualificationDate: "2020-04-01"
    },
    workersCompensation: {
      insuranceNumber: "1234567890",
      industryClassification: "情報通信業",
      premiumRate: 0.25
    },
    voluntaryInsurance: [
      {
        id: 1,
        certificateNumber: "LIFE-123456",
        company: "○○生命保険",
        annualPremium: 120000,
        beneficiary: "配偶者"
      }
    ]
  }
};

export default function DeductionsPage() {
  const [deductionData, setDeductionData] = useState(initialDeductionData);
  const [activeTab, setActiveTab] = useState("dependents");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100 relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-green-400/10 to-blue-600/10 rounded-full blur-3xl"></div>
      </div>

      <Navbar />

      <div className="pt-20 pb-8">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          {/* ヘッダー */}
          <div className="mb-10 text-center">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-4 tracking-tight">
              扶養・控除・保険設定
            </h1>
            <p className="text-xl text-gray-600 font-medium">税務・保険情報の管理</p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-600 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* メインコンテンツ */}
            <div className="xl:col-span-3">
              <DeductionTabs 
                deductionData={deductionData}
                setDeductionData={setDeductionData}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </div>

            {/* サイドバー - 控除額サマリー */}
            <div className="xl:col-span-1">
              <DeductionSummary deductionData={deductionData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}