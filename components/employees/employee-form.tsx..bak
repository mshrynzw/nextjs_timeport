"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, User, Briefcase, DollarSign, Check } from "lucide-react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";

const employeeSchema = z.object({
  personalInfo: z.object({
    lastName: z.string().min(1, "姓は必須です"),
    firstName: z.string().min(1, "名は必須です"),
    lastNameKana: z.string().min(1, "姓（カナ）は必須です"),
    firstNameKana: z.string().min(1, "名（カナ）は必須です"),
    birthDate: z.string().min(1, "生年月日は必須です"),
    gender: z.enum(["male", "female", "other"]),
    phoneNumber: z.string().min(1, "電話番号は必須です"),
    email: z.string().email("有効なメールアドレスを入力してください"),
  }),
  employmentInfo: z.object({
    employeeId: z.string().min(1, "社員番号は必須です"),
    hireDate: z.string().min(1, "入社日は必須です"),
    department: z.string().min(1, "部署は必須です"),
    position: z.string().min(1, "役職は必須です"),
    employmentType: z.enum(["regular", "contract", "parttime", "temporary"]),
  }),
  salaryInfo: z.object({
    basicSalary: z.number().min(0, "基本給は0以上である必要があります"),
    totalAllowance: z.number().min(0, "手当は0以上である必要があります"),
  }),
});

interface EmployeeFormProps {
  employee?: any;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

export function EmployeeForm({ employee, isOpen, onClose, onSave }: EmployeeFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [birthDate, setBirthDate] = useState<Date>();
  const [hireDate, setHireDate] = useState<Date>();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(employeeSchema),
    defaultValues: employee || {
      personalInfo: {
        lastName: "",
        firstName: "",
        lastNameKana: "",
        firstNameKana: "",
        birthDate: "",
        gender: "male",
        phoneNumber: "",
        email: "",
      },
      employmentInfo: {
        employeeId: "",
        hireDate: "",
        department: "",
        position: "",
        employmentType: "regular",
      },
      salaryInfo: {
        basicSalary: 0,
        totalAllowance: 0,
      },
    }
  });

  const steps = [
    { number: 1, title: "基本情報", icon: User },
    { number: 2, title: "雇用情報", icon: Briefcase },
    { number: 3, title: "給与情報", icon: DollarSign },
    { number: 4, title: "確認", icon: Check },
  ];

  const departments = ["開発部", "営業部", "人事部", "経理部", "総務部"];
  const positions = ["部長", "課長", "主任", "シニアエンジニア", "エンジニア", "スタッフ"];

  const onSubmit = (data: any) => {
    // 年数計算
    const hireYear = new Date(data.employmentInfo.hireDate).getFullYear();
    const currentYear = new Date().getFullYear();
    const yearsOfService = currentYear - hireYear + (new Date().getMonth() >= new Date(data.employmentInfo.hireDate).getMonth() ? 0 : -1);
    
    const employeeData = {
      ...data,
      employmentInfo: {
        ...data.employmentInfo,
        status: "active",
        yearsOfService: Math.max(0, yearsOfService)
      }
    };

    onSave(employeeData);
    
    toast({
      title: employee ? "従業員情報を更新しました" : "新規従業員を登録しました",
      description: "従業員情報が正常に保存されました",
      className: "bg-green-50 border-green-200 text-green-800",
    });
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-white to-blue-50 border-0 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">
            {employee ? "従業員情報編集" : "新規従業員登録"}
          </DialogTitle>
        </DialogHeader>

        {/* ステップインジケーター */}
        <div className="flex items-center justify-between mb-8 mt-6">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            const isActive = currentStep === step.number;
            const isCompleted = currentStep > step.number;
            
            return (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                  isActive ? 'bg-blue-500 border-blue-500 text-white' :
                  isCompleted ? 'bg-green-500 border-green-500 text-white' :
                  'bg-gray-100 border-gray-300 text-gray-500'
                }`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="ml-2 hidden sm:block">
                  <div className={`text-sm font-medium ${
                    isActive ? 'text-blue-600' :
                    isCompleted ? 'text-green-600' :
                    'text-gray-500'
                  }`}>
                    {step.title}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-0.5 mx-4 ${
                    isCompleted ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            );
          })}
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* ステップ1: 基本情報 */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-600" />
                基本情報
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="lastName">姓</Label>
                  <Input
                    id="lastName"
                    {...form.register("personalInfo.lastName")}
                    className="bg-white border-gray-200 focus:border-blue-400"
                  />
                  {form.formState.errors.personalInfo?.lastName && (
                    <p className="text-red-500 text-sm">{form.formState.errors.personalInfo.lastName.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="firstName">名</Label>
                  <Input
                    id="firstName"
                    {...form.register("personalInfo.firstName")}
                    className="bg-white border-gray-200 focus:border-blue-400"
                  />
                  {form.formState.errors.personalInfo?.firstName && (
                    <p className="text-red-500 text-sm">{form.formState.errors.personalInfo.firstName.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="lastNameKana">姓（カナ）</Label>
                  <Input
                    id="lastNameKana"
                    {...form.register("personalInfo.lastNameKana")}
                    className="bg-white border-gray-200 focus:border-blue-400"
                  />
                  {form.formState.errors.personalInfo?.lastNameKana && (
                    <p className="text-red-500 text-sm">{form.formState.errors.personalInfo.lastNameKana.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="firstNameKana">名（カナ）</Label>
                  <Input
                    id="firstNameKana"
                    {...form.register("personalInfo.firstNameKana")}
                    className="bg-white border-gray-200 focus:border-blue-400"
                  />
                  {form.formState.errors.personalInfo?.firstNameKana && (
                    <p className="text-red-500 text-sm">{form.formState.errors.personalInfo.firstNameKana.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>生年月日</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal bg-white border-gray-200 focus:border-blue-400"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {birthDate ? format(birthDate, "yyyy年MM月dd日", { locale: ja }) : "日付を選択"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={birthDate}
                        onSelect={(date) => {
                          setBirthDate(date);
                          if (date) {
                            form.setValue("personalInfo.birthDate", format(date, "yyyy-MM-dd"));
                          }
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>性別</Label>
                  <RadioGroup
                    value={form.watch("personalInfo.gender")}
                    onValueChange={(value) => form.setValue("personalInfo.gender", value as any)}
                    className="flex gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male">男性</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female">女性</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other">その他</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">電話番号</Label>
                  <Input
                    id="phoneNumber"
                    {...form.register("personalInfo.phoneNumber")}
                    className="bg-white border-gray-200 focus:border-blue-400"
                  />
                  {form.formState.errors.personalInfo?.phoneNumber && (
                    <p className="text-red-500 text-sm">{form.formState.errors.personalInfo.phoneNumber.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">メールアドレス</Label>
                  <Input
                    id="email"
                    type="email"
                    {...form.register("personalInfo.email")}
                    className="bg-white border-gray-200 focus:border-blue-400"
                  />
                  {form.formState.errors.personalInfo?.email && (
                    <p className="text-red-500 text-sm">{form.formState.errors.personalInfo.email.message}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ステップ2: 雇用情報 */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <Briefcase className="w-5 h-5 mr-2 text-green-600" />
                雇用情報
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employeeId">社員番号</Label>
                  <Input
                    id="employeeId"
                    {...form.register("employmentInfo.employeeId")}
                    className="bg-white border-gray-200 focus:border-blue-400"
                  />
                  {form.formState.errors.employmentInfo?.employeeId && (
                    <p className="text-red-500 text-sm">{form.formState.errors.employmentInfo.employeeId.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>入社日</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal bg-white border-gray-200 focus:border-blue-400"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {hireDate ? format(hireDate, "yyyy年MM月dd日", { locale: ja }) : "日付を選択"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={hireDate}
                        onSelect={(date) => {
                          setHireDate(date);
                          if (date) {
                            form.setValue("employmentInfo.hireDate", format(date, "yyyy-MM-dd"));
                          }
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>部署</Label>
                  <Select onValueChange={(value) => form.setValue("employmentInfo.department", value)}>
                    <SelectTrigger className="bg-white border-gray-200 focus:border-blue-400">
                      <SelectValue placeholder="部署を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>役職</Label>
                  <Select onValueChange={(value) => form.setValue("employmentInfo.position", value)}>
                    <SelectTrigger className="bg-white border-gray-200 focus:border-blue-400">
                      <SelectValue placeholder="役職を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      {positions.map((pos) => (
                        <SelectItem key={pos} value={pos}>
                          {pos}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>雇用形態</Label>
                <RadioGroup
                  value={form.watch("employmentInfo.employmentType")}
                  onValueChange={(value) => form.setValue("employmentInfo.employmentType", value as any)}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="regular" id="regular" />
                    <Label htmlFor="regular">正社員</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="contract" id="contract" />
                    <Label htmlFor="contract">契約社員</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="parttime" id="parttime" />
                    <Label htmlFor="parttime">パート</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="temporary" id="temporary" />
                    <Label htmlFor="temporary">アルバイト</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}

          {/* ステップ3: 給与情報 */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-purple-600" />
                給与情報
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="basicSalary">基本給</Label>
                  <Input
                    id="basicSalary"
                    type="number"
                    {...form.register("salaryInfo.basicSalary", { valueAsNumber: true })}
                    className="bg-white border-gray-200 focus:border-blue-400"
                  />
                  {form.formState.errors.salaryInfo?.basicSalary && (
                    <p className="text-red-500 text-sm">{form.formState.errors.salaryInfo.basicSalary.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="totalAllowance">諸手当合計</Label>
                  <Input
                    id="totalAllowance"
                    type="number"
                    {...form.register("salaryInfo.totalAllowance", { valueAsNumber: true })}
                    className="bg-white border-gray-200 focus:border-blue-400"
                  />
                  {form.formState.errors.salaryInfo?.totalAllowance && (
                    <p className="text-red-500 text-sm">{form.formState.errors.salaryInfo.totalAllowance.message}</p>
                  )}
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700">総支給額</span>
                  <span className="font-bold text-green-700 text-xl">
                    ¥{((form.watch("salaryInfo.basicSalary") || 0) + (form.watch("salaryInfo.totalAllowance") || 0)).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ステップ4: 確認 */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <Check className="w-5 h-5 mr-2 text-green-600" />
                入力内容確認
              </h3>

              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">基本情報</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>氏名: {form.watch("personalInfo.lastName")} {form.watch("personalInfo.firstName")}</div>
                    <div>フリガナ: {form.watch("personalInfo.lastNameKana")} {form.watch("personalInfo.firstNameKana")}</div>
                    <div>電話番号: {form.watch("personalInfo.phoneNumber")}</div>
                    <div>メール: {form.watch("personalInfo.email")}</div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">雇用情報</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>社員番号: {form.watch("employmentInfo.employeeId")}</div>
                    <div>部署: {form.watch("employmentInfo.department")}</div>
                    <div>役職: {form.watch("employmentInfo.position")}</div>
                    <div>雇用形態: {form.watch("employmentInfo.employmentType")}</div>
                  </div>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-800 mb-2">給与情報</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>基本給: ¥{(form.watch("salaryInfo.basicSalary") || 0).toLocaleString()}</div>
                    <div>諸手当: ¥{(form.watch("salaryInfo.totalAllowance") || 0).toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ナビゲーションボタン */}
          <div className="flex justify-between pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="bg-white hover:bg-gray-50"
            >
              前へ
            </Button>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="bg-white hover:bg-gray-50"
              >
                キャンセル
              </Button>

              {currentStep < 4 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                >
                  次へ
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                >
                  {employee ? "更新" : "登録"}
                </Button>
              )}
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}