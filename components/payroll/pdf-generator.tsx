"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PDFGeneratorProps {
  employeeInfo: {
    name: string;
    employeeId: string;
    department: string;
    payMonth: string;
  };
}

export function PDFGenerator({ employeeInfo }: PDFGeneratorProps) {
  const { toast } = useToast();

  const generatePDF = async () => {
    try {
      // jsPDFを動的にインポート
      const { jsPDF } = await import('jspdf');
      
      const doc = new jsPDF();
      
      // PDFのタイトル
      doc.setFontSize(20);
      doc.text('給与明細書', 105, 30, { align: 'center' });
      
      // 従業員情報
      doc.setFontSize(12);
      doc.text(`従業員名: ${employeeInfo.name}`, 20, 60);
      doc.text(`社員番号: ${employeeInfo.employeeId}`, 20, 75);
      doc.text(`所属部署: ${employeeInfo.department}`, 20, 90);
      doc.text(`支給年月: ${employeeInfo.payMonth}`, 20, 105);
      
      // 注意: 実際の実装では、給与データも含める必要があります
      doc.text('※ この機能は開発中です', 20, 130);
      doc.text('実際の給与データを含むPDFを生成するには', 20, 145);
      doc.text('追加の実装が必要です。', 20, 160);
      
      // PDFを保存
      doc.save(`給与明細_${employeeInfo.employeeId}_${employeeInfo.payMonth}.pdf`);
      
      toast({
        title: "PDF出力完了",
        description: "給与明細のPDFファイルをダウンロードしました",
        className: "bg-green-50 border-green-200 text-green-800",
      });
    } catch (error) {
      console.error('PDF生成エラー:', error);
      toast({
        title: "PDF出力エラー",
        description: "PDFの生成に失敗しました",
        className: "bg-red-50 border-red-200 text-red-800",
      });
    }
  };

  return (
    <Button
      onClick={generatePDF}
      className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
    >
      <Download className="w-4 h-4 mr-2" />
      PDF出力
    </Button>
  );
}