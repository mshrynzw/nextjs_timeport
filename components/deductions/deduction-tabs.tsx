"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Users, Calculator, Shield, FileText, Heart, Building, DollarSign, Calendar } from "lucide-react";
import { DependentForm } from "./dependent-form";
import { InsuranceDeductionForm } from "./insurance-deduction-form";
import { SocialInsuranceForm } from "./social-insurance-form";
import { YearEndAdjustment } from "./year-end-adjustment";

interface DeductionTabsProps {
  deductionData: any;
  setDeductionData: (data: any) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function DeductionTabs({ deductionData, setDeductionData, activeTab, setActiveTab }: DeductionTabsProps) {
  const tabs = [
    {
      value: "dependents",
      label: "扶養情報",
      icon: Users,
      gradient: "from-blue-500 to-blue-600",
      description: "配偶者・扶養親族の情報"
    },
    {
      value: "deductions",
      label: "所得控除",
      icon: Calculator,
      gradient: "from-green-500 to-green-600",
      description: "生命保険・地震保険等の控除"
    },
    {
      value: "insurance",
      label: "保険情報",
      icon: Shield,
      gradient: "from-purple-500 to-purple-600",
      description: "健康保険・厚生年金等の情報"
    },
    {
      value: "yearend",
      label: "年末調整",
      icon: FileText,
      gradient: "from-orange-500 to-orange-600",
      description: "申告書プレビュー・控除額サマリー"
    }
  ];

  return (
    <Card className="p-8 bg-gradient-to-br from-white/90 to-purple-50/90 backdrop-blur-sm border-0 shadow-2xl">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8 bg-gray-100 p-1 rounded-xl h-auto">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className={`flex flex-col items-center gap-2 px-4 py-4 rounded-lg transition-all duration-300 ${
                  activeTab === tab.value
                    ? `bg-gradient-to-r ${tab.gradient} text-white shadow-lg`
                    : 'text-gray-600 hover:text-gray-800 hover:bg-white'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <div className="text-center">
                  <div className="font-medium text-sm">{tab.label}</div>
                  <div className="text-xs opacity-80 hidden lg:block">{tab.description}</div>
                </div>
              </TabsTrigger>
            );
          })}
        </TabsList>

        <div className="bg-white rounded-2xl p-6 shadow-inner border border-gray-100">
          <TabsContent value="dependents" className="mt-0">
            <DependentForm 
              deductionData={deductionData}
              setDeductionData={setDeductionData}
            />
          </TabsContent>

          <TabsContent value="deductions" className="mt-0">
            <InsuranceDeductionForm 
              deductionData={deductionData}
              setDeductionData={setDeductionData}
            />
          </TabsContent>

          <TabsContent value="insurance" className="mt-0">
            <SocialInsuranceForm 
              deductionData={deductionData}
              setDeductionData={setDeductionData}
            />
          </TabsContent>

          <TabsContent value="yearend" className="mt-0">
            <YearEndAdjustment deductionData={deductionData} />
          </TabsContent>
        </div>
      </Tabs>
    </Card>
  );
}