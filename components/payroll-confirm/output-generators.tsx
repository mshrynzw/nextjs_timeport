"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  FileText, 
  Download, 
  CreditCard, 
  Mail,
  Printer,
  Database,
  CheckCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface OutputGeneratorsProps {
  isOpen: boolean;
  onClose: () => void;
  employees: any[];
  period: any;
}

export function OutputGenerators({ isOpen, onClose, employees, period }: OutputGeneratorsProps) {
  const [outputType, setOutputType] = useState("payslips");
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [emailOption, setEmailOption] = useState(false);
  const [printOption, setPrintOption] = useState(false);
  const { toast } = useToast();

  const outputOptions = [
    {
      id: "payslips",
      title: "給与明細PDF",
      description: "個別または一括での給与明細PDF生成",
      icon: FileText,
      color: "blue"
    },
    {
      id: "bank_transfer",
      title: "銀行振込データ",
      description: "全銀協フォーマットでの振込データ生成",
      icon: CreditCard,
      color: "green"
    },
    {
      id: "summary_report",
      title: "集計レポート",
      description: "部署別・項目別の給与集計レポート",
      icon: Database,
      color: "purple"
    }
  ];

  const handleEmployeeSelect = (employeeId: string, checked: boolean) => {
    if (checked) {
      setSelectedEmployees([...selectedEmployees, employeeId]);
    } else {
      setSelectedEmployees(selectedEmployees.filter(id => id !== employeeId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedEmployees(employees.map(emp => emp.employeeId));
    } else {
      setSelectedEmployees([]);
    }
  };

  const generateOutput = async () => {
    const targetEmployees = selectedEmployees.length > 0 
      ? employees.filter(emp => selectedEmployees.includes(emp.employeeId))
      : employees;

    switch (outputType) {
      case "payslips":
        await generatePayslips(targetEmployees);
        break;
      case "bank_transfer":
        await generateBankTransferData(targetEmployees);
        break;
      case "summary_report":
        await generateSummaryReport(targetEmployees);
        break;
    }
  };

  const generatePayslips = async (targetEmployees: any[]) => {
    // PDF生成のシミュレーション
    toast({
      title: "給与明細PDFを生成中...",
      description: `${targetEmployees.length}件の明細を処理しています`,
      className: "bg-blue-50 border-blue-200 text-blue-800",
    });

    // 実際の実装では jsPDF を使用
    setTimeout(() => {
      toast({
        title: "給与明細PDFを生成しました",
        description: `${targetEmployees.length}件の明細が生成されました`,
        className: "bg-green-50 border-green-200 text-green-800",
      });
    }, 2000);
  };

  const generateBankTransferData = async (targetEmployees: any[]) => {
    // 全銀協フォーマットでのデータ生成
    const bankData = targetEmployees.map(emp => ({
      accountNumber: "1234567890", // 実際は従業員の口座番号
      amount: emp.netPay,
      name: emp.name,
      bankCode: "0001",
      branchCode: "001"
    }));

    const csvContent = [
      "口座番号,振込金額,氏名,銀行コード,支店コード",
      ...bankData.map(data => `${data.accountNumber},${data.amount},${data.name},${data.bankCode},${data.branchCode}`)
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `bank_transfer_${period.year}${String(period.month).padStart(2, '0')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "銀行振込データを生成しました",
      description: "CSVファイルをダウンロードしました",
      className: "bg-green-50 border-green-200 text-green-800",
    });
  };

  const generateSummaryReport = async (targetEmployees: any[]) => {
    // 集計レポートの生成
    const summary = {
      totalEmployees: targetEmployees.length,
      totalGrossPay: targetEmployees.reduce((sum, emp) => sum + emp.salary.totalGrossPay, 0),
      totalDeduction: targetEmployees.reduce((sum, emp) => sum + emp.deductions.totalDeduction, 0),
      totalNetPay: targetEmployees.reduce((sum, emp) => sum + emp.netPay, 0)
    };

    toast({
      title: "集計レポートを生成しました",
      description: "レポートデータが準備されました",
      className: "bg-green-50 border-green-200 text-green-800",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-white to-indigo-50 border-0 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800 flex items-center">
            <Download className="w-6 h-6 mr-2 text-indigo-600" />
            明細・振込データ出力
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6 space-y-6">
          {/* 出力タイプ選択 */}
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">出力タイプ</h3>
            <RadioGroup value={outputType} onValueChange={setOutputType}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {outputOptions.map((option) => {
                  const IconComponent = option.icon;
                  return (
                    <div key={option.id} className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                      <RadioGroupItem value={option.id} id={option.id} />
                      <div className="flex items-center space-x-3 flex-1">
                        <div className={`p-2 rounded-lg bg-${option.color}-500`}>
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <Label htmlFor={option.id} className="font-semibold text-gray-800 cursor-pointer">
                            {option.title}
                          </Label>
                          <div className="text-sm text-gray-600">{option.description}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </RadioGroup>
          </Card>

          {/* 対象従業員選択 */}
          <Card className="p-6 bg-white border-2 border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">対象従業員選択</h3>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="select-all"
                  checked={selectedEmployees.length === employees.length}
                  onCheckedChange={handleSelectAll}
                />
                <Label htmlFor="select-all" className="cursor-pointer">全選択</Label>
              </div>
            </div>

            <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-4">
                {employees.map((employee) => (
                  <div key={employee.employeeId} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded">
                    <Checkbox
                      id={employee.employeeId}
                      checked={selectedEmployees.includes(employee.employeeId)}
                      onCheckedChange={(checked) => handleEmployeeSelect(employee.employeeId, checked as boolean)}
                    />
                    <Label htmlFor={employee.employeeId} className="cursor-pointer text-sm">
                      {employee.name} ({employee.employeeId})
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-600">
              {selectedEmployees.length > 0 
                ? `${selectedEmployees.length}人を選択中` 
                : "全従業員が対象です"}
            </div>
          </Card>

          {/* 出力オプション */}
          {outputType === "payslips" && (
            <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4">出力オプション</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="email-option"
                    checked={emailOption}
                    onCheckedChange={setEmailOption}
                  />
                  <Label htmlFor="email-option" className="cursor-pointer flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-blue-600" />
                    従業員にメール送信
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="print-option"
                    checked={printOption}
                    onCheckedChange={setPrintOption}
                  />
                  <Label htmlFor="print-option" className="cursor-pointer flex items-center">
                    <Printer className="w-4 h-4 mr-2 text-gray-600" />
                    印刷用レイアウト
                  </Label>
                </div>
              </div>
            </Card>
          )}

          {/* 生成プレビュー */}
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-purple-600" />
              生成プレビュー
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {selectedEmployees.length || employees.length}
                </div>
                <div className="text-sm text-gray-600">対象従業員</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {outputType === "payslips" ? "PDF" : 
                   outputType === "bank_transfer" ? "CSV" : "Excel"}
                </div>
                <div className="text-sm text-gray-600">ファイル形式</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {period.year}/{period.month}
                </div>
                <div className="text-sm text-gray-600">対象年月</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {emailOption ? "有" : "無"}
                </div>
                <div className="text-sm text-gray-600">メール送信</div>
              </div>
            </div>
          </Card>

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
              onClick={generateOutput}
              className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Download className="w-4 h-4 mr-2" />
              生成開始
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}