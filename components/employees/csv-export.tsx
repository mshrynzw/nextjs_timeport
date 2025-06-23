"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Download, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CSVExportProps {
  employees: any[];
  isOpen: boolean;
  onClose: () => void;
}

export function CSVExport({ employees, isOpen, onClose }: CSVExportProps) {
  const [exportType, setExportType] = useState("all");
  const [selectedFields, setSelectedFields] = useState({
    personalInfo: true,
    employmentInfo: true,
    salaryInfo: false,
    contactInfo: true
  });
  const { toast } = useToast();

  const fieldOptions = [
    { key: "personalInfo", label: "個人情報（氏名、生年月日、性別）", description: "基本的な個人情報" },
    { key: "employmentInfo", label: "雇用情報（社員番号、部署、役職）", description: "雇用に関する情報" },
    { key: "contactInfo", label: "連絡先情報（電話、メール）", description: "連絡先情報" },
    { key: "salaryInfo", label: "給与情報（基本給、手当）", description: "機密情報のため注意" }
  ];

  const handleFieldChange = (field: string, checked: boolean) => {
    setSelectedFields(prev => ({
      ...prev,
      [field]: checked
    }));
  };

  const generateCSV = () => {
    let headers: string[] = [];
    let dataRows: string[][] = [];

    // ヘッダー生成
    if (selectedFields.personalInfo) {
      headers.push("姓", "名", "姓（カナ）", "名（カナ）", "生年月日", "性別");
    }
    if (selectedFields.employmentInfo) {
      headers.push("社員番号", "入社日", "部署", "役職", "雇用形態", "勤続年数", "在籍状況");
    }
    if (selectedFields.contactInfo) {
      headers.push("電話番号", "メールアドレス");
    }
    if (selectedFields.salaryInfo) {
      headers.push("基本給", "諸手当", "総支給額");
    }

    // データ行生成
    const targetEmployees = exportType === "active" 
      ? employees.filter(emp => emp.employmentInfo.status === "active")
      : employees;

    targetEmployees.forEach(employee => {
      let row: string[] = [];

      if (selectedFields.personalInfo) {
        row.push(
          employee.personalInfo.lastName,
          employee.personalInfo.firstName,
          employee.personalInfo.lastNameKana,
          employee.personalInfo.firstNameKana,
          employee.personalInfo.birthDate,
          employee.personalInfo.gender === 'male' ? '男性' : 
          employee.personalInfo.gender === 'female' ? '女性' : 'その他'
        );
      }
      if (selectedFields.employmentInfo) {
        row.push(
          employee.employmentInfo.employeeId,
          employee.employmentInfo.hireDate,
          employee.employmentInfo.department,
          employee.employmentInfo.position,
          employee.employmentInfo.employmentType === 'regular' ? '正社員' :
          employee.employmentInfo.employmentType === 'contract' ? '契約社員' :
          employee.employmentInfo.employmentType === 'parttime' ? 'パート' : 'アルバイト',
          employee.employmentInfo.yearsOfService.toString(),
          employee.employmentInfo.status === 'active' ? '在籍中' : '退職済み'
        );
      }
      if (selectedFields.contactInfo) {
        row.push(
          employee.personalInfo.phoneNumber,
          employee.personalInfo.email
        );
      }
      if (selectedFields.salaryInfo) {
        row.push(
          employee.salaryInfo.basicSalary.toString(),
          employee.salaryInfo.totalAllowance.toString(),
          (employee.salaryInfo.basicSalary + employee.salaryInfo.totalAllowance).toString()
        );
      }

      dataRows.push(row);
    });

    // CSV文字列生成
    const csvContent = [headers.join(','), ...dataRows.map(row => row.join(','))].join('\n');
    
    // ダウンロード実行
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `employees_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "エクスポートが完了しました",
      description: `${targetEmployees.length}件の従業員データをエクスポートしました`,
      className: "bg-green-50 border-green-200 text-green-800",
    });

    onClose();
  };

  const selectedFieldsCount = Object.values(selectedFields).filter(Boolean).length;
  const targetCount = exportType === "active" 
    ? employees.filter(emp => emp.employmentInfo.status === "active").length
    : employees.length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-gradient-to-br from-white to-green-50 border-0 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800 flex items-center">
            <Download className="w-6 h-6 mr-2 text-green-600" />
            CSV エクスポート
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* エクスポート対象選択 */}
          <div className="space-y-3">
            <Label className="text-lg font-semibold text-gray-800">エクスポート対象</Label>
            <RadioGroup value={exportType} onValueChange={setExportType}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all" />
                <Label htmlFor="all">全従業員（{employees.length}人）</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="active" id="active" />
                <Label htmlFor="active">在籍中の従業員のみ（{employees.filter(emp => emp.employmentInfo.status === "active").length}人）</Label>
              </div>
            </RadioGroup>
          </div>

          {/* 出力項目選択 */}
          <div className="space-y-3">
            <Label className="text-lg font-semibold text-gray-800">出力項目</Label>
            <div className="space-y-4">
              {fieldOptions.map((option) => (
                <div key={option.key} className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-green-300 transition-colors">
                  <Checkbox
                    id={option.key}
                    checked={selectedFields[option.key as keyof typeof selectedFields]}
                    onCheckedChange={(checked) => handleFieldChange(option.key, checked as boolean)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <Label htmlFor={option.key} className="font-medium text-gray-800 cursor-pointer">
                      {option.label}
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                    {option.key === "salaryInfo" && (
                      <p className="text-xs text-red-600 mt-1">⚠️ 給与情報は機密情報です</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* プレビュー情報 */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              エクスポート概要
            </h4>
            <div className="text-sm text-blue-700 space-y-1">
              <div>対象従業員数: {targetCount}人</div>
              <div>出力項目数: {selectedFieldsCount}カテゴリ</div>
              <div>ファイル形式: CSV（UTF-8）</div>
            </div>
          </div>

          {/* アクションボタン */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 bg-white hover:bg-gray-50"
            >
              キャンセル
            </Button>
            <Button
              onClick={generateCSV}
              disabled={selectedFieldsCount === 0}
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:opacity-50"
            >
              <Download className="w-4 h-4 mr-2" />
              エクスポート実行
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}