"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Plus, Trash2, Heart, Users, Baby } from "lucide-react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";

const spouseSchema = z.object({
  hasSpouse: z.boolean(),
  name: z.string().min(1, "配偶者名は必須です").optional(),
  income: z.number().min(0, "所得金額は0以上である必要があります").optional(),
  age: z.number().min(0, "年齢は0以上である必要があります").optional(),
});

const dependentSchema = z.object({
  name: z.string().min(1, "氏名は必須です"),
  relationship: z.string().min(1, "続柄を選択してください"),
  birthDate: z.string().min(1, "生年月日を選択してください"),
  income: z.number().min(0, "所得金額は0以上である必要があります"),
  liveTogether: z.boolean(),
});

interface DependentFormProps {
  deductionData: any;
  setDeductionData: (data: any) => void;
}

export function DependentForm({ deductionData, setDeductionData }: DependentFormProps) {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>();

  const spouseForm = useForm({
    resolver: zodResolver(spouseSchema),
    defaultValues: {
      hasSpouse: deductionData.spouse.hasSpouse,
      name: deductionData.spouse.name,
      income: deductionData.spouse.income,
      age: deductionData.spouse.age,
    }
  });

  const dependentForm = useForm({
    resolver: zodResolver(dependentSchema),
    defaultValues: {
      name: "",
      relationship: "",
      birthDate: "",
      income: 0,
      liveTogether: true,
    }
  });

  const relationships = [
    { value: "子", label: "子" },
    { value: "父", label: "父" },
    { value: "母", label: "母" },
    { value: "祖父", label: "祖父" },
    { value: "祖母", label: "祖母" },
    { value: "兄弟姉妹", label: "兄弟姉妹" },
    { value: "その他", label: "その他" }
  ];

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const getDependentCategory = (birthDate: string) => {
    const age = calculateAge(birthDate);
    if (age >= 70) return "老人";
    if (age >= 19 && age <= 22) return "特定";
    return "一般";
  };

  const getDeductionAmount = (category: string, liveTogether: boolean) => {
    switch (category) {
      case "特定": return 630000;
      case "老人": return liveTogether ? 580000 : 480000;
      default: return 380000;
    }
  };

  const addDependent = (data: any) => {
    const category = getDependentCategory(data.birthDate);
    const deductionAmount = getDeductionAmount(category, data.liveTogether);
    
    const newDependent = {
      id: Date.now(),
      ...data,
      category,
      deductionAmount
    };

    setDeductionData({
      ...deductionData,
      dependents: [...deductionData.dependents, newDependent]
    });

    dependentForm.reset();
    setSelectedDate(undefined);
    
    toast({
      title: "扶養親族を追加しました",
      description: `${data.name}さんを扶養親族として登録しました`,
      className: "bg-green-50 border-green-200 text-green-800",
    });
  };

  const removeDependent = (id: number) => {
    setDeductionData({
      ...deductionData,
      dependents: deductionData.dependents.filter((dep: any) => dep.id !== id)
    });
    
    toast({
      title: "扶養親族を削除しました",
      description: "扶養親族の情報を削除しました",
      className: "bg-orange-50 border-orange-200 text-orange-800",
    });
  };

  const updateSpouse = (data: any) => {
    const deductionType = data.hasSpouse && data.income <= 380000 ? "配偶者控除" : 
                         data.hasSpouse && data.income <= 1330000 ? "配偶者特別控除" : "なし";
    const deductionAmount = deductionType === "配偶者控除" ? 380000 : 
                           deductionType === "配偶者特別控除" ? Math.max(0, 380000 - Math.floor((data.income - 380000) / 10000) * 10000) : 0;

    setDeductionData({
      ...deductionData,
      spouse: {
        ...data,
        deductionType,
        deductionAmount
      }
    });

    toast({
      title: "配偶者情報を更新しました",
      description: `控除区分: ${deductionType}`,
      className: "bg-blue-50 border-blue-200 text-blue-800",
    });
  };

  return (
    <div className="space-y-8">
      {/* 配偶者情報セクション */}
      <Card className="p-6 bg-gradient-to-br from-pink-50 to-rose-50 border-2 border-pink-200">
        <div className="flex items-center mb-6">
          <div className="p-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 mr-4 shadow-lg">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">配偶者情報</h3>
        </div>

        <form onSubmit={spouseForm.handleSubmit(updateSpouse)} className="space-y-6">
          <div className="space-y-4">
            <Label className="text-sm font-semibold text-gray-700">配偶者の有無</Label>
            <RadioGroup
              value={spouseForm.watch("hasSpouse") ? "yes" : "no"}
              onValueChange={(value) => spouseForm.setValue("hasSpouse", value === "yes")}
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="spouse-yes" />
                <Label htmlFor="spouse-yes">有り</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="spouse-no" />
                <Label htmlFor="spouse-no">無し</Label>
              </div>
            </RadioGroup>
          </div>

          {spouseForm.watch("hasSpouse") && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="spouse-name">配偶者氏名</Label>
                <Input
                  id="spouse-name"
                  {...spouseForm.register("name")}
                  className="bg-white border-pink-200 focus:border-pink-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="spouse-income">所得金額（年間）</Label>
                <Input
                  id="spouse-income"
                  type="number"
                  {...spouseForm.register("income", { valueAsNumber: true })}
                  className="bg-white border-pink-200 focus:border-pink-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="spouse-age">年齢</Label>
                <Input
                  id="spouse-age"
                  type="number"
                  {...spouseForm.register("age", { valueAsNumber: true })}
                  className="bg-white border-pink-200 focus:border-pink-400"
                />
              </div>
            </div>
          )}

          <Button
            type="submit"
            className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            配偶者情報を更新
          </Button>
        </form>

        {deductionData.spouse.hasSpouse && (
          <div className="mt-6 p-4 bg-white rounded-lg border border-pink-200">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">控除区分</span>
              <span className="font-bold text-pink-700">{deductionData.spouse.deductionType}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="font-semibold text-gray-700">控除額</span>
              <span className="font-bold text-pink-700">¥{deductionData.spouse.deductionAmount.toLocaleString()}</span>
            </div>
          </div>
        )}
      </Card>

      {/* 扶養親族情報セクション */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 mr-4 shadow-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">扶養親族情報</h3>
          </div>
        </div>

        {/* 扶養親族追加フォーム */}
        <form onSubmit={dependentForm.handleSubmit(addDependent)} className="space-y-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dependent-name">氏名</Label>
              <Input
                id="dependent-name"
                {...dependentForm.register("name")}
                className="bg-white border-blue-200 focus:border-blue-400"
              />
            </div>

            <div className="space-y-2">
              <Label>続柄</Label>
              <Select onValueChange={(value) => dependentForm.setValue("relationship", value)}>
                <SelectTrigger className="bg-white border-blue-200 focus:border-blue-400">
                  <SelectValue placeholder="続柄を選択" />
                </SelectTrigger>
                <SelectContent>
                  {relationships.map((rel) => (
                    <SelectItem key={rel.value} value={rel.value}>
                      {rel.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>生年月日</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal bg-white border-blue-200 focus:border-blue-400"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "yyyy年MM月dd日", { locale: ja }) : "日付を選択"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      setSelectedDate(date);
                      if (date) {
                        dependentForm.setValue("birthDate", format(date, "yyyy-MM-dd"));
                      }
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dependent-income">所得金額（年間）</Label>
              <Input
                id="dependent-income"
                type="number"
                {...dependentForm.register("income", { valueAsNumber: true })}
                className="bg-white border-blue-200 focus:border-blue-400"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700">同居区分</Label>
              <RadioGroup
                value={dependentForm.watch("liveTogether") ? "together" : "separate"}
                onValueChange={(value) => dependentForm.setValue("liveTogether", value === "together")}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="together" id="together" />
                  <Label htmlFor="together">同居</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="separate" id="separate" />
                  <Label htmlFor="separate">別居</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <Button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <Plus className="w-4 h-4 mr-2" />
            扶養親族を追加
          </Button>
        </form>

        {/* 扶養親族リスト */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-800 flex items-center">
            <Baby className="w-5 h-5 mr-2 text-blue-600" />
            登録済み扶養親族
          </h4>
          
          {deductionData.dependents.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              扶養親族が登録されていません
            </div>
          ) : (
            <div className="grid gap-4">
              {deductionData.dependents.map((dependent: any) => (
                <div
                  key={dependent.id}
                  className="flex items-center justify-between p-4 bg-white rounded-lg border border-blue-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-sm text-gray-600">氏名</div>
                      <div className="font-semibold">{dependent.name}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">続柄</div>
                      <div className="font-semibold">{dependent.relationship}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">区分</div>
                      <div className={`font-semibold ${
                        dependent.category === "特定" ? "text-green-600" :
                        dependent.category === "老人" ? "text-purple-600" :
                        "text-blue-600"
                      }`}>
                        {dependent.category}扶養親族
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">控除額</div>
                      <div className="font-semibold text-green-600">
                        ¥{dependent.deductionAmount.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeDependent(dependent.id)}
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