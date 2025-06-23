"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Shield, Home, DollarSign, Calculator, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const insuranceDeductionSchema = z.object({
  lifeInsurance: z.object({
    general: z.number().min(0).max(120000),
    medical: z.number().min(0).max(120000),
    pension: z.number().min(0).max(120000),
  }),
  earthquakeInsurance: z.object({
    amount: z.number().min(0).max(50000),
    oldInsurance: z.number().min(0).max(150000),
  }),
  socialInsurance: z.object({
    nationalPension: z.number().min(0),
    nationalHealth: z.number().min(0),
    careInsurance: z.number().min(0),
    others: z.number().min(0),
  }),
  otherDeductions: z.object({
    smallBusiness: z.number().min(0).max(840000),
    medical: z.number().min(0),
    donation: z.number().min(0),
    casualty: z.number().min(0),
  }),
});

interface InsuranceDeductionFormProps {
  deductionData: any;
  setDeductionData: (data: any) => void;
}

export function InsuranceDeductionForm({ deductionData, setDeductionData }: InsuranceDeductionFormProps) {
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(insuranceDeductionSchema),
    defaultValues: {
      lifeInsurance: deductionData.insuranceDeductions.lifeInsurance,
      earthquakeInsurance: deductionData.insuranceDeductions.earthquakeInsurance,
      socialInsurance: deductionData.socialInsurance,
      otherDeductions: deductionData.otherDeductions,
    }
  });

  const calculateLifeInsuranceDeduction = (general: number, medical: number, pension: number) => {
    const generalDeduction = Math.min(general * 0.25 + 25000, 40000);
    const medicalDeduction = Math.min(medical * 0.25 + 25000, 40000);
    const pensionDeduction = Math.min(pension * 0.25 + 25000, 40000);
    return Math.min(generalDeduction + medicalDeduction + pensionDeduction, 120000);
  };

  const calculateEarthquakeInsuranceDeduction = (amount: number, oldInsurance: number) => {
    const earthquakeDeduction = Math.min(amount, 50000);
    const oldDeduction = Math.min(oldInsurance * 0.1, 15000);
    return earthquakeDeduction + oldDeduction;
  };

  const onSubmit = (data: any) => {
    const lifeInsuranceDeduction = calculateLifeInsuranceDeduction(
      data.lifeInsurance.general,
      data.lifeInsurance.medical,
      data.lifeInsurance.pension
    );

    const earthquakeInsuranceDeduction = calculateEarthquakeInsuranceDeduction(
      data.earthquakeInsurance.amount,
      data.earthquakeInsurance.oldInsurance
    );

    const updatedData = {
      ...deductionData,
      insuranceDeductions: {
        lifeInsurance: {
          ...data.lifeInsurance,
          totalDeduction: lifeInsuranceDeduction
        },
        earthquakeInsurance: {
          ...data.earthquakeInsurance,
          deduction: earthquakeInsuranceDeduction
        }
      },
      socialInsurance: data.socialInsurance,
      otherDeductions: data.otherDeductions
    };

    setDeductionData(updatedData);

    toast({
      title: "控除情報を更新しました",
      description: "所得控除の計算が完了しました",
      className: "bg-green-50 border-green-200 text-green-800",
    });
  };

  const deductionSections = [
    {
      title: "生命保険料控除",
      icon: Heart,
      gradient: "from-pink-50 to-rose-50",
      borderColor: "border-pink-200",
      fields: [
        { name: "lifeInsurance.general", label: "一般生命保険料", max: 120000 },
        { name: "lifeInsurance.medical", label: "介護医療保険料", max: 120000 },
        { name: "lifeInsurance.pension", label: "個人年金保険料", max: 120000 },
      ]
    },
    {
      title: "地震保険料控除",
      icon: Shield,
      gradient: "from-blue-50 to-indigo-50",
      borderColor: "border-blue-200",
      fields: [
        { name: "earthquakeInsurance.amount", label: "地震保険料", max: 50000 },
        { name: "earthquakeInsurance.oldInsurance", label: "旧長期損害保険料", max: 150000 },
      ]
    },
    {
      title: "社会保険料控除",
      icon: Home,
      gradient: "from-green-50 to-emerald-50",
      borderColor: "border-green-200",
      fields: [
        { name: "socialInsurance.nationalPension", label: "国民年金保険料", max: null },
        { name: "socialInsurance.nationalHealth", label: "国民健康保険料", max: null },
        { name: "socialInsurance.careInsurance", label: "介護保険料", max: null },
        { name: "socialInsurance.others", label: "その他社会保険料", max: null },
      ]
    },
    {
      title: "その他控除",
      icon: Calculator,
      gradient: "from-purple-50 to-pink-50",
      borderColor: "border-purple-200",
      fields: [
        { name: "otherDeductions.smallBusiness", label: "小規模企業共済等掛金控除", max: 840000 },
        { name: "otherDeductions.medical", label: "医療費控除", max: null },
        { name: "otherDeductions.donation", label: "寄附金控除", max: null },
        { name: "otherDeductions.casualty", label: "雑損控除", max: null },
      ]
    }
  ];

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      {deductionSections.map((section, sectionIndex) => {
        const IconComponent = section.icon;
        return (
          <Card key={sectionIndex} className={`p-6 bg-gradient-to-br ${section.gradient} border-2 ${section.borderColor}`}>
            <div className="flex items-center mb-6">
              <div className="p-3 rounded-full bg-gradient-to-r from-gray-600 to-gray-700 mr-4 shadow-lg">
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">{section.title}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {section.fields.map((field, fieldIndex) => (
                <div key={fieldIndex} className="space-y-2">
                  <Label htmlFor={field.name} className="text-sm font-semibold text-gray-700">
                    {field.label}
                    {field.max && (
                      <span className="text-xs text-gray-500 ml-2">
                        (上限: ¥{field.max.toLocaleString()})
                      </span>
                    )}
                  </Label>
                  <Input
                    id={field.name}
                    type="number"
                    {...form.register(field.name as any, { valueAsNumber: true })}
                    className="bg-white border-gray-200 focus:border-gray-400"
                    placeholder="0"
                  />
                </div>
              ))}
            </div>

            {/* 控除額計算結果表示 */}
            {section.title === "生命保険料控除" && (
              <div className="mt-6 p-4 bg-white rounded-lg border border-pink-200">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700">計算結果</span>
                  <span className="font-bold text-pink-700">
                    ¥{calculateLifeInsuranceDeduction(
                      form.watch("lifeInsurance.general") || 0,
                      form.watch("lifeInsurance.medical") || 0,
                      form.watch("lifeInsurance.pension") || 0
                    ).toLocaleString()}
                  </span>
                </div>
              </div>
            )}

            {section.title === "地震保険料控除" && (
              <div className="mt-6 p-4 bg-white rounded-lg border border-blue-200">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700">計算結果</span>
                  <span className="font-bold text-blue-700">
                    ¥{calculateEarthquakeInsuranceDeduction(
                      form.watch("earthquakeInsurance.amount") || 0,
                      form.watch("earthquakeInsurance.oldInsurance") || 0
                    ).toLocaleString()}
                  </span>
                </div>
              </div>
            )}
          </Card>
        );
      })}

      <div className="flex justify-center pt-6">
        <Button
          type="submit"
          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 px-8 py-3"
        >
          <Calculator className="w-5 h-5 mr-2" />
          控除額を計算・保存
        </Button>
      </div>
    </form>
  );
}