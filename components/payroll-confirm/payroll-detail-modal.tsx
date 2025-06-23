"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { 
  User, 
  Clock, 
  DollarSign, 
  Calculator, 
  Edit, 
  Save,
  History
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PayrollDetailModalProps {
  employee: any;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (employee: any) => void;
}

export function PayrollDetailModal({ employee, isOpen, onClose, onUpdate }: PayrollDetailModalProps) {
  const [editMode, setEditMode] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState(employee);
  const [adjustmentReason, setAdjustmentReason] = useState("");
  const { toast } = useToast();

  if (!employee) return null;

  const handleSave = () => {
    const updatedEmployee = {
      ...editedEmployee,
      adjustments: [
        ...(employee.adjustments || []),
        {
          date: new Date().toISOString(),
          reason: adjustmentReason,
          changes: "手動調整"
        }
      ]
    };
    
    onUpdate(updatedEmployee);
    setEditMode(false);
    setAdjustmentReason("");
    
    toast({
      title: "給与情報を更新しました",
      description: "変更内容が保存されました",
      className: "bg-green-50 border-green-200 text-green-800",
    });
  };

  const handleCancel = () => {
    setEditedEmployee(employee);
    setEditMode(false);
    setAdjustmentReason("");
  };

  const updateSalaryField = (field: string, value: number) => {
    setEditedEmployee({
      ...editedEmployee,
      salary: {
        ...editedEmployee.salary,
        [field]: value,
        totalGrossPay: field === 'basicSalary' ? 
          value + Object.values(editedEmployee.salary).reduce((sum: number, val: any) => 
            typeof val === 'number' && field !== 'basicSalary' && field !== 'totalGrossPay' ? sum + val : sum, 0
          ) :
          editedEmployee.salary.basicSalary + Object.values({
            ...editedEmployee.salary,
            [field]: value
          }).reduce((sum: number, val: any, index: number, arr: any[]) => 
            typeof val === 'number' && Object.keys(editedEmployee.salary)[index] !== 'basicSalary' && Object.keys(editedEmployee.salary)[index] !== 'totalGrossPay' ? sum + val : sum, 0
          )
      }
    });
  };

  const updateDeductionField = (field: string, value: number) => {
    setEditedEmployee({
      ...editedEmployee,
      deductions: {
        ...editedEmployee.deductions,
        [field]: value,
        totalDeduction: field === 'totalDeduction' ? value :
          Object.values({
            ...editedEmployee.deductions,
            [field]: value
          }).reduce((sum: number, val: any, index: number, arr: any[]) => 
            typeof val === 'number' && Object.keys(editedEmployee.deductions)[index] !== 'totalDeduction' ? sum + val : sum, 0
          )
      },
      netPay: editedEmployee.salary.totalGrossPay - (field === 'totalDeduction' ? value :
        Object.values({
          ...editedEmployee.deductions,
          [field]: value
        }).reduce((sum: number, val: any, index: number, arr: any[]) => 
          typeof val === 'number' && Object.keys(editedEmployee.deductions)[index] !== 'totalDeduction' ? sum + val : sum, 0
        ))
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-white to-green-50 border-0 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{employee.name}</h2>
                <p className="text-gray-600">{employee.employeeId} - {employee.department}</p>
              </div>
            </div>
            <div className="flex gap-2">
              {editMode ? (
                <>
                  <Button onClick={handleCancel} variant="outline">
                    キャンセル
                  </Button>
                  <Button onClick={handleSave} className="bg-green-500 hover:bg-green-600">
                    <Save className="w-4 h-4 mr-2" />
                    保存
                  </Button>
                </>
              ) : (
                <Button onClick={() => setEditMode(true)} className="bg-blue-500 hover:bg-blue-600">
                  <Edit className="w-4 h-4 mr-2" />
                  編集
                </Button>
              )}
            </div>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="attendance" className="w-full mt-6">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="attendance" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              勤怠情報
            </TabsTrigger>
            <TabsTrigger value="salary" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              支給項目
            </TabsTrigger>
            <TabsTrigger value="deductions" className="flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              控除項目
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History className="w-4 h-4" />
              調整履歴
            </TabsTrigger>
          </TabsList>

          <TabsContent value="attendance">
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-600" />
                勤怠情報詳細
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-sm text-gray-600">出勤日数</div>
                  <div className="text-2xl font-bold text-blue-600">{employee.attendance.workDays}日</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-sm text-gray-600">実労働時間</div>
                  <div className="text-2xl font-bold text-green-600">{employee.attendance.actualHours}時間</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-sm text-gray-600">残業時間</div>
                  <div className="text-2xl font-bold text-orange-600">{employee.attendance.overtimeHours}時間</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-sm text-gray-600">深夜時間</div>
                  <div className="text-2xl font-bold text-purple-600">{employee.attendance.nightHours}時間</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-sm text-gray-600">休日時間</div>
                  <div className="text-2xl font-bold text-red-600">{employee.attendance.holidayHours}時間</div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="salary">
            <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                支給項目詳細
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(employee.salary).map(([key, value]) => {
                  if (key === 'totalGrossPay') return null;
                  const labels: { [key: string]: string } = {
                    basicSalary: '基本給',
                    positionAllowance: '役職手当',
                    qualificationAllowance: '資格手当',
                    housingAllowance: '住宅手当',
                    familyAllowance: '家族手当',
                    commutingAllowance: '通勤手当',
                    mealAllowance: '食事手当',
                    overtimeAllowance: '残業手当',
                    nightAllowance: '深夜手当',
                    holidayAllowance: '休日手当',
                    attendanceBonus: '皆勤手当',
                    performanceBonus: '業績手当'
                  };
                  
                  return (
                    <div key={key} className="bg-white p-4 rounded-lg shadow-sm">
                      <Label className="text-sm text-gray-600">{labels[key] || key}</Label>
                      {editMode ? (
                        <Input
                          type="number"
                          value={editedEmployee.salary[key]}
                          onChange={(e) => updateSalaryField(key, Number(e.target.value))}
                          className="mt-1 font-mono"
                        />
                      ) : (
                        <div className="text-lg font-bold text-green-600 font-mono">
                          ¥{(value as number).toLocaleString()}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 p-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">総支給額</span>
                  <span className="text-2xl font-bold font-mono">
                    ¥{editedEmployee.salary.totalGrossPay.toLocaleString()}
                  </span>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="deductions">
            <Card className="p-6 bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <Calculator className="w-5 h-5 mr-2 text-red-600" />
                控除項目詳細
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(employee.deductions).map(([key, value]) => {
                  if (key === 'totalDeduction') return null;
                  const labels: { [key: string]: string } = {
                    healthInsurance: '健康保険料',
                    pensionInsurance: '厚生年金保険料',
                    employmentInsurance: '雇用保険料',
                    longTermCareInsurance: '介護保険料',
                    incomeTax: '所得税',
                    residentTax: '住民税',
                    lifeInsurance: '生命保険料',
                    propertyForming: '財形貯蓄',
                    companyLoan: '社内貸付返済',
                    unionFee: '組合費',
                    socialClubFee: '親睦会費'
                  };
                  
                  return (
                    <div key={key} className="bg-white p-4 rounded-lg shadow-sm">
                      <Label className="text-sm text-gray-600">{labels[key] || key}</Label>
                      {editMode ? (
                        <Input
                          type="number"
                          value={editedEmployee.deductions[key]}
                          onChange={(e) => updateDeductionField(key, Number(e.target.value))}
                          className="mt-1 font-mono"
                        />
                      ) : (
                        <div className="text-lg font-bold text-red-600 font-mono">
                          ¥{(value as number).toLocaleString()}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 p-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">総控除額</span>
                  <span className="text-2xl font-bold font-mono">
                    ¥{editedEmployee.deductions.totalDeduction.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="mt-4 p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">差引支給額</span>
                  <span className="text-2xl font-bold font-mono">
                    ¥{editedEmployee.netPay.toLocaleString()}
                  </span>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card className="p-6 bg-gradient-to-br from-gray-50 to-slate-50 border-2 border-gray-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <History className="w-5 h-5 mr-2 text-gray-600" />
                調整履歴
              </h3>
              {employee.adjustments && employee.adjustments.length > 0 ? (
                <div className="space-y-3">
                  {employee.adjustments.map((adjustment: any, index: number) => (
                    <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-semibold text-gray-800">{adjustment.changes}</div>
                          <div className="text-sm text-gray-600">{adjustment.reason}</div>
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(adjustment.date).toLocaleDateString('ja-JP')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  調整履歴はありません
                </div>
              )}
            </Card>
          </TabsContent>
        </Tabs>

        {editMode && (
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <Label className="text-sm font-semibold text-yellow-800">調整理由</Label>
            <Textarea
              value={adjustmentReason}
              onChange={(e) => setAdjustmentReason(e.target.value)}
              placeholder="調整理由を入力してください"
              className="mt-2 bg-white"
              rows={3}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}