"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Heart, Briefcase, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const insuranceInfoSchema = z.object({
  healthInsurance: z.object({
    certificateNumber: z.string().min(1, "保険証番号は必須です"),
    insuredCategory: z.string().min(1, "被保険者区分を選択してください"),
    premiumRate: z.number().min(0).max(20),
    standardMonthlyRemuneration: z.number().min(0),
  }),
  pensionInsurance: z.object({
    basicPensionNumber: z.string().min(1, "基礎年金番号は必須です"),
    premiumRate: z.number().min(0).max(20),
    standardMonthlyRemuneration: z.number().min(0),
    enrollmentMonths: z.number().min(0),
  }),
  employmentInsurance: z.object({
    insuredNumber: z.string().min(1, "被保険者番号は必須です"),
    premiumRate: z.number().min(0).max(5),
    qualificationDate: z.string().min(1, "資格取得日は必須です"),
  }),
  workersCompensation: z.object({
    insuranceNumber: z.string().min(1, "労災保険番号は必須です"),
    industryClassification: z.string().min(1, "業種分類を選択してください"),
    premiumRate: z.number().min(0).max(5),
  }),
});

const voluntaryInsuranceSchema = z.object({
  certificateNumber: z.string().min(1, "証券番号は必須です"),
  company: z.string().min(1, "保険会社名は必須です"),
  annualPremium: z.number().min(0, "年間保険料は0以上である必要があります"),
  beneficiary: z.string().min(1, "受益者は必須です"),
});

interface SocialInsuranceFormProps {
  deductionData: any;
  setDeductionData: (data: any) => void;
}

export function SocialInsuranceForm({ deductionData, setDeductionData }: SocialInsuranceFormProps) {
  const { toast } = useToast();
  const [showVoluntaryForm, setShowVoluntaryForm] = useState(false);

  const form = useForm({
    resolver: zodResolver(insuranceInfoSchema),
    defaultValues: deductionData.insuranceInfo
  });

  const voluntaryForm = useForm({
    resolver: zodResolver(voluntaryInsuranceSchema),
    defaultValues: {
      certificateNumber: "",
      company: "",
      annualPremium: 0,
      beneficiary: "",
    }
  });

  const insuredCategories = [
    { value: "被保険者", label: "被保険者" },
    { value: "被扶養者", label: "被扶養者" }
  ];

  const industryClassifications = [
    { value: "情報通信業", label: "情報通信業" },
    { value: "製造業", label: "製造業" },
    { value: "建設業", label: "建設業" },
    { value: "運輸業", label: "運輸業" },
    { value: "卸売・小売業", label: "卸売・小売業" },
    { value: "金融・保険業", label: "金融・保険業" },
    { value: "サービス業", label: "サービス業" }
  ];

  const onSubmit = (data: any) => {
    setDeductionData({
      ...deductionData,
      insuranceInfo: {
        ...deductionData.insuranceInfo,
        ...data
      }
    });

    toast({
      title: "保険情報を更新しました",
      description: "社会保険情報が正常に保存されました",
      className: "bg-green-50 border-green-200 text-green-800",
    });
  };

  const addVoluntaryInsurance = (data: any) => {
    const newInsurance = {
      id: Date.now(),
      ...data
    };

    setDeductionData({
      ...deductionData,
      insuranceInfo: {
        ...deductionData.insuranceInfo,
        voluntaryInsurance: [...deductionData.insuranceInfo.voluntaryInsurance, newInsurance]
      }
    });

    voluntaryForm.reset();
    setShowVoluntaryForm(false);

    toast({
      title: "任意保険を追加しました",
      description: `${data.company}の保険を追加しました`,
      className: "bg-blue-50 border-blue-200 text-blue-800",
    });
  };

  const removeVoluntaryInsurance = (id: number) => {
    setDeductionData({
      ...deductionData,
      insuranceInfo: {
        ...deductionData.insuranceInfo,
        voluntaryInsurance: deductionData.insuranceInfo.voluntaryInsurance.filter((ins: any) => ins.id !== id)
      }
    });

    toast({
      title: "任意保険を削除しました",
      description: "保険情報を削除しました",
      className: "bg-orange-50 border-orange-200 text-orange-800",
    });
  };

  const insuranceSections = [
    {
      title: "健康保険",
      icon: Shield,
      gradient: "from-blue-50 to-indigo-50",
      borderColor: "border-blue-200",
      fields: [
        { name: "healthInsurance.certificateNumber", label: "保険証番号", type: "text" },
        { name: "healthInsurance.insuredCategory", label: "被保険者区分", type: "select", options: insuredCategories },
        { name: "healthInsurance.premiumRate", label: "保険料率 (%)", type: "number" },
        { name: "healthInsurance.standardMonthlyRemuneration", label: "標準報酬月額", type: "number" },
      ]
    },
    {
      title: "厚生年金保険",
      icon: Shield,
      gradient: "from-green-50 to-emerald-50",
      borderColor: "border-green-200",
      fields: [
        { name: "pensionInsurance.basicPensionNumber", label: "基礎年金番号", type: "text" },
        { name: "pensionInsurance.premiumRate", label: "保険料率 (%)", type: "number" },
        { name: "pensionInsurance.standardMonthlyRemuneration", label: "標準報酬月額", type: "number" },
        { name: "pensionInsurance.enrollmentMonths", label: "加入月数", type: "number" },
      ]
    },
    {
      title: "雇用保険",
      icon: Briefcase,
      gradient: "from-purple-50 to-pink-50",
      borderColor: "border-purple-200",
      fields: [
        { name: "employmentInsurance.insuredNumber", label: "被保険者番号", type: "text" },
        { name: "employmentInsurance.premiumRate", label: "保険料率 (%)", type: "number" },
        { name: "employmentInsurance.qualificationDate", label: "資格取得日", type: "date" },
      ]
    },
    {
      title: "労災保険",
      icon: Shield,
      gradient: "from-orange-50 to-red-50",
      borderColor: "border-orange-200",
      fields: [
        { name: "workersCompensation.insuranceNumber", label: "労災保険番号", type: "text" },
        { name: "workersCompensation.industryClassification", label: "業種分類", type: "select", options: industryClassifications },
        { name: "workersCompensation.premiumRate", label: "保険料率 (%)", type: "number" },
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {insuranceSections.map((section, sectionIndex) => {
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
                    </Label>
                    {field.type === "select" ? (
                      <Select onValueChange={(value) => form.setValue(field.name as any, value)}>
                        <SelectTrigger className="bg-white border-gray-200 focus:border-gray-400">
                          <SelectValue placeholder={`${field.label}を選択`} />
                        </SelectTrigger>
                        <SelectContent>
                          {field.options?.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        id={field.name}
                        type={field.type}
                        {...form.register(field.name as any, { 
                          valueAsNumber: field.type === "number" 
                        })}
                        className="bg-white border-gray-200 focus:border-gray-400"
                      />
                    )}
                  </div>
                ))}
              </div>
            </Card>
          );
        })}

        <div className="flex justify-center">
          <Button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 px-8 py-3"
          >
            <Shield className="w-5 h-5 mr-2" />
            保険情報を保存
          </Button>
        </div>
      </form>

      {/* 任意保険セクション */}
      <Card className="p-6 bg-gradient-to-br from-pink-50 to-rose-50 border-2 border-pink-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 mr-4 shadow-lg">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">任意保険</h3>
          </div>
          <Button
            onClick={() => setShowVoluntaryForm(!showVoluntaryForm)}
            className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            保険を追加
          </Button>
        </div>

        {showVoluntaryForm && (
          <form onSubmit={voluntaryForm.handleSubmit(addVoluntaryInsurance)} className="space-y-6 mb-8 p-4 bg-white rounded-lg border border-pink-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="certificate-number">証券番号</Label>
                <Input
                  id="certificate-number"
                  {...voluntaryForm.register("certificateNumber")}
                  className="bg-white border-pink-200 focus:border-pink-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">保険会社名</Label>
                <Input
                  id="company"
                  {...voluntaryForm.register("company")}
                  className="bg-white border-pink-200 focus:border-pink-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="annual-premium">年間保険料</Label>
                <Input
                  id="annual-premium"
                  type="number"
                  {...voluntaryForm.register("annualPremium", { valueAsNumber: true })}
                  className="bg-white border-pink-200 focus:border-pink-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="beneficiary">受益者</Label>
                <Input
                  id="beneficiary"
                  {...voluntaryForm.register("beneficiary")}
                  className="bg-white border-pink-200 focus:border-pink-400"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                type="submit"
                className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700"
              >
                追加
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowVoluntaryForm(false)}
              >
                キャンセル
              </Button>
            </div>
          </form>
        )}

        {/* 任意保険リスト */}
        <div className="space-y-4">
          {deductionData.insuranceInfo.voluntaryInsurance.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              任意保険が登録されていません
            </div>
          ) : (
            <div className="grid gap-4">
              {deductionData.insuranceInfo.voluntaryInsurance.map((insurance: any) => (
                <div
                  key={insurance.id}
                  className="flex items-center justify-between p-4 bg-white rounded-lg border border-pink-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-sm text-gray-600">保険会社</div>
                      <div className="font-semibold">{insurance.company}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">証券番号</div>
                      <div className="font-semibold">{insurance.certificateNumber}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">年間保険料</div>
                      <div className="font-semibold text-green-600">
                        ¥{insurance.annualPremium.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">受益者</div>
                      <div className="font-semibold">{insurance.beneficiary}</div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeVoluntaryInsurance(insurance.id)}
                    className="ml-4 text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}