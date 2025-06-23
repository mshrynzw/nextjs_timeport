"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { 
  User, 
  Briefcase, 
  Shield, 
  History, 
  Edit, 
  Phone, 
  Mail, 
  MapPin,
  Calendar,
  DollarSign
} from "lucide-react";

interface EmployeeModalProps {
  employee: any;
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
}

export function EmployeeModal({ employee, isOpen, onClose, onEdit }: EmployeeModalProps) {
  if (!employee) return null;

  const getEmploymentTypeBadge = (type: string) => {
    const config = {
      'regular': { label: '正社員', className: 'bg-blue-100 text-blue-800' },
      'contract': { label: '契約社員', className: 'bg-green-100 text-green-800' },
      'parttime': { label: 'パート', className: 'bg-yellow-100 text-yellow-800' },
      'temporary': { label: 'アルバイト', className: 'bg-purple-100 text-purple-800' }
    };
    
    const typeConfig = config[type as keyof typeof config] || config.regular;
    return (
      <Badge className={typeConfig.className}>
        {typeConfig.label}
      </Badge>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-white to-blue-50 border-0 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={employee.personalInfo.profileImage} />
                <AvatarFallback className="text-xl">
                  {employee.personalInfo.lastName.charAt(0)}
                  {employee.personalInfo.firstName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {employee.personalInfo.lastName} {employee.personalInfo.firstName}
                </h2>
                <p className="text-gray-600">
                  {employee.personalInfo.lastNameKana} {employee.personalInfo.firstNameKana}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  {getEmploymentTypeBadge(employee.employmentInfo.employmentType)}
                  <Badge className="bg-green-100 text-green-800">在籍中</Badge>
                </div>
              </div>
            </div>
            <Button onClick={onEdit} className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
              <Edit className="w-4 h-4 mr-2" />
              編集
            </Button>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="basic" className="w-full mt-6">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="basic" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              基本情報
            </TabsTrigger>
            <TabsTrigger value="employment" className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              雇用情報
            </TabsTrigger>
            <TabsTrigger value="insurance" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              扶養・保険
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History className="w-4 h-4" />
              履歴
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2 text-blue-600" />
                  個人情報
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">生年月日</span>
                    <span className="font-semibold">{new Date(employee.personalInfo.birthDate).toLocaleDateString('ja-JP')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">性別</span>
                    <span className="font-semibold">
                      {employee.personalInfo.gender === 'male' ? '男性' : 
                       employee.personalInfo.gender === 'female' ? '女性' : 'その他'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">年齢</span>
                    <span className="font-semibold">
                      {new Date().getFullYear() - new Date(employee.personalInfo.birthDate).getFullYear()}歳
                    </span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-green-600" />
                  連絡先情報
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="font-semibold">{employee.personalInfo.phoneNumber}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span className="font-semibold">{employee.personalInfo.email}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gray-500 mt-1" />
                    <div>
                      <div className="font-semibold">住所情報</div>
                      <div className="text-sm text-gray-600">登録されていません</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="employment">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-purple-600" />
                  雇用詳細
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">社員番号</span>
                    <span className="font-semibold font-mono">{employee.employmentInfo.employeeId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">入社日</span>
                    <span className="font-semibold">{new Date(employee.employmentInfo.hireDate).toLocaleDateString('ja-JP')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">勤続年数</span>
                    <span className="font-semibold">{employee.employmentInfo.yearsOfService}年</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">部署</span>
                    <span className="font-semibold">{employee.employmentInfo.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">役職</span>
                    <span className="font-semibold">{employee.employmentInfo.position}</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-orange-600" />
                  給与情報
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">基本給</span>
                    <span className="font-semibold">¥{employee.salaryInfo.basicSalary.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">諸手当</span>
                    <span className="font-semibold">¥{employee.salaryInfo.totalAllowance.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-gray-600 font-semibold">総支給額</span>
                    <span className="font-bold text-lg">
                      ¥{(employee.salaryInfo.basicSalary + employee.salaryInfo.totalAllowance).toLocaleString()}
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="insurance">
            <Card className="p-6 bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-cyan-600" />
                扶養・保険情報
              </h3>
              <div className="text-center py-8 text-gray-500">
                扶養・保険情報は登録されていません
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card className="p-6 bg-gradient-to-br from-gray-50 to-slate-50 border-2 border-gray-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <History className="w-5 h-5 mr-2 text-gray-600" />
                履歴情報
              </h3>
              <div className="text-center py-8 text-gray-500">
                履歴情報は登録されていません
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}