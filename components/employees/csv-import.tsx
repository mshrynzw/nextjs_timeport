"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Download, FileText, AlertCircle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CSVImportProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (data: any[]) => void;
}

export function CSVImport({ isOpen, onClose, onImport }: CSVImportProps) {
  const [file, setFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [step, setStep] = useState(1);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      // ここで実際のCSVパースを行う
      // サンプルデータを使用
      const sampleData = [
        {
          personalInfo: {
            lastName: "山田",
            firstName: "太郎",
            lastNameKana: "ヤマダ",
            firstNameKana: "タロウ",
            birthDate: "1990-01-01",
            gender: "male",
            phoneNumber: "090-1111-2222",
            email: "yamada.taro@example.com"
          },
          employmentInfo: {
            employeeId: "EMP006",
            hireDate: "2024-01-01",
            department: "開発部",
            position: "エンジニア",
            employmentType: "regular",
            status: "active",
            yearsOfService: 1
          },
          salaryInfo: {
            basicSalary: 320000,
            totalAllowance: 50000
          }
        }
      ];
      setPreviewData(sampleData);
      setStep(2);
    }
  };

  const downloadTemplate = () => {
    // CSVテンプレートのダウンロード処理
    const csvContent = `姓,名,姓（カナ）,名（カナ）,生年月日,性別,電話番号,メールアドレス,社員番号,入社日,部署,役職,雇用形態,基本給,諸手当
田中,花子,タナカ,ハナコ,1985-05-15,female,080-1234-5678,tanaka.hanako@example.com,EMP999,2024-04-01,人事部,主任,regular,350000,60000`;
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'employee_template.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "テンプレートをダウンロードしました",
      description: "CSVテンプレートファイルをダウンロードしました",
      className: "bg-blue-50 border-blue-200 text-blue-800",
    });
  };

  const validateData = () => {
    const validationErrors: string[] = [];
    
    previewData.forEach((employee, index) => {
      if (!employee.personalInfo.lastName) {
        validationErrors.push(`行${index + 1}: 姓が入力されていません`);
      }
      if (!employee.personalInfo.email || !employee.personalInfo.email.includes('@')) {
        validationErrors.push(`行${index + 1}: 有効なメールアドレスが入力されていません`);
      }
      if (!employee.employmentInfo.employeeId) {
        validationErrors.push(`行${index + 1}: 社員番号が入力されていません`);
      }
    });

    setErrors(validationErrors);
    setStep(3);
  };

  const executeImport = () => {
    if (errors.length === 0) {
      onImport(previewData);
      toast({
        title: "インポートが完了しました",
        description: `${previewData.length}件の従業員データをインポートしました`,
        className: "bg-green-50 border-green-200 text-green-800",
      });
      onClose();
    }
  };

  const resetImport = () => {
    setFile(null);
    setPreviewData([]);
    setErrors([]);
    setStep(1);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-white to-green-50 border-0 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800 flex items-center">
            <Upload className="w-6 h-6 mr-2 text-green-600" />
            CSV インポート
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6">
          {/* ステップ1: ファイル選択 */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 transition-colors">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">CSVファイルを選択</h3>
                  <p className="text-gray-500 mb-4">従業員データのCSVファイルをアップロードしてください</p>
                  
                  <Label htmlFor="csv-file" className="cursor-pointer">
                    <Input
                      id="csv-file"
                      type="file"
                      accept=".csv"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                      ファイルを選択
                    </Button>
                  </Label>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <Button
                  variant="outline"
                  onClick={downloadTemplate}
                  className="flex items-center gap-2 bg-white hover:bg-gray-50"
                >
                  <Download className="w-4 h-4" />
                  CSVテンプレートをダウンロード
                </Button>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  CSVファイルの形式について
                </h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• 文字コードはUTF-8で保存してください</li>
                  <li>• 1行目はヘッダー行として扱われます</li>
                  <li>• 必須項目: 姓、名、メールアドレス、社員番号</li>
                  <li>• 日付形式: YYYY-MM-DD（例: 2024-01-01）</li>
                </ul>
              </div>
            </div>
          )}

          {/* ステップ2: プレビュー */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">データプレビュー</h3>
                <div className="text-sm text-gray-600">
                  {previewData.length}件のデータが見つかりました
                </div>
              </div>

              <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-3 text-left font-semibold">氏名</th>
                      <th className="p-3 text-left font-semibold">社員番号</th>
                      <th className="p-3 text-left font-semibold">部署</th>
                      <th className="p-3 text-left font-semibold">役職</th>
                      <th className="p-3 text-left font-semibold">メール</th>
                    </tr>
                  </thead>
                  <tbody>
                    {previewData.map((employee, index) => (
                      <tr key={index} className="border-t border-gray-200">
                        <td className="p-3">
                          {employee.personalInfo.lastName} {employee.personalInfo.firstName}
                        </td>
                        <td className="p-3 font-mono">{employee.employmentInfo.employeeId}</td>
                        <td className="p-3">{employee.employmentInfo.department}</td>
                        <td className="p-3">{employee.employmentInfo.position}</td>
                        <td className="p-3">{employee.personalInfo.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={resetImport} className="bg-white hover:bg-gray-50">
                  やり直し
                </Button>
                <Button onClick={validateData} className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                  データを検証
                </Button>
              </div>
            </div>
          )}

          {/* ステップ3: 検証結果 */}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">検証結果</h3>

              {errors.length === 0 ? (
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <span className="font-semibold text-green-800">検証が完了しました</span>
                  </div>
                  <p className="text-green-700 mt-2">
                    すべてのデータが正常です。インポートを実行できます。
                  </p>
                </div>
              ) : (
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <div className="flex items-center mb-2">
                    <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                    <span className="font-semibold text-red-800">エラーが見つかりました</span>
                  </div>
                  <ul className="text-red-700 space-y-1">
                    {errors.map((error, index) => (
                      <li key={index}>• {error}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(2)} className="bg-white hover:bg-gray-50">
                  戻る
                </Button>
                <Button variant="outline" onClick={resetImport} className="bg-white hover:bg-gray-50">
                  やり直し
                </Button>
                {errors.length === 0 && (
                  <Button onClick={executeImport} className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                    インポート実行
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}