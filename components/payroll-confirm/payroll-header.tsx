"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Users, 
  DollarSign, 
  Calculator, 
  Download, 
  AlertTriangle,
  CheckCircle,
  FileText,
  CreditCard
} from "lucide-react";

interface PayrollHeaderProps {
  period: {
    year: number;
    month: number;
    cutoffDate: string;
    paymentDate: string;
    status: 'draft' | 'processing' | 'approved' | 'finalized';
  };
  summary: {
    totalEmployees: number;
    totalGrossPay: number;
    totalDeduction: number;
    totalNetPay: number;
    processedCount: number;
    pendingCount: number;
  };
  onStepChange: (step: number) => void;
  onShowIssues: () => void;
  onShowApproval: () => void;
  onShowOutput: () => void;
}

export function PayrollHeader({ 
  period, 
  summary, 
  onStepChange, 
  onShowIssues, 
  onShowApproval, 
  onShowOutput 
}: PayrollHeaderProps) {
  const getStatusBadge = (status: string) => {
    const config = {
      'draft': { label: '未処理', className: 'bg-gray-100 text-gray-800' },
      'processing': { label: '処理中', className: 'bg-blue-100 text-blue-800' },
      'approved': { label: '承認済み', className: 'bg-green-100 text-green-800' },
      'finalized': { label: '確定済み', className: 'bg-purple-100 text-purple-800' }
    };
    
    const statusConfig = config[status as keyof typeof config] || config.draft;
    return (
      <Badge className={statusConfig.className}>
        {statusConfig.label}
      </Badge>
    );
  };

  const stats = [
    {
      title: "対象従業員数",
      value: summary.totalEmployees,
      unit: "人",
      icon: Users,
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50 to-indigo-50"
    },
    {
      title: "総支給額",
      value: summary.totalGrossPay,
      unit: "円",
      icon: DollarSign,
      gradient: "from-green-500 to-green-600",
      bgGradient: "from-green-50 to-emerald-50",
      format: "currency"
    },
    {
      title: "総控除額",
      value: summary.totalDeduction,
      unit: "円",
      icon: Calculator,
      gradient: "from-red-500 to-red-600",
      bgGradient: "from-red-50 to-pink-50",
      format: "currency"
    },
    {
      title: "差引支給総額",
      value: summary.totalNetPay,
      unit: "円",
      icon: CreditCard,
      gradient: "from-purple-500 to-purple-600",
      bgGradient: "from-purple-50 to-pink-50",
      format: "currency"
    }
  ];

  const formatValue = (value: number, format?: string) => {
    if (format === "currency") {
      return (value / 10000).toFixed(0) + "万";
    }
    return value.toString();
  };

  return (
    <div className="mb-8">
      {/* 期間設定と処理状況 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="p-6 bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-sm border-0 shadow-xl">
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 mr-4 shadow-lg">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">給与処理期間</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">対象年月</span>
              <span className="font-bold text-lg">{period.year}年{period.month}月</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">締日</span>
              <span className="font-semibold">{new Date(period.cutoffDate).toLocaleDateString('ja-JP')}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">支給日</span>
              <span className="font-semibold">{new Date(period.paymentDate).toLocaleDateString('ja-JP')}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">処理状況</span>
              {getStatusBadge(period.status)}
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-white/90 to-green-50/90 backdrop-blur-sm border-0 shadow-xl">
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 mr-4 shadow-lg">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">処理進捗</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">処理完了</span>
              <span className="font-bold text-green-600">{summary.processedCount}人</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">未処理</span>
              <span className="font-bold text-orange-600">{summary.pendingCount}人</span>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>進捗率</span>
                <span>{Math.round((summary.processedCount / summary.totalEmployees) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(summary.processedCount / summary.totalEmployees) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card
              key={index}
              className={`p-6 bg-gradient-to-br ${stat.bgGradient} backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 transform relative overflow-hidden group`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="flex items-center justify-between mb-4 relative z-10">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.gradient} shadow-lg`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <div className="space-y-3 relative z-10">
                <h3 className="text-sm font-semibold text-gray-600 tracking-wide">{stat.title}</h3>
                <div className="flex items-end gap-1">
                  <span className="text-3xl font-bold text-gray-800 font-mono tracking-wider">
                    {formatValue(stat.value, stat.format)}
                  </span>
                  <span className="text-sm text-gray-500 mb-1">{stat.unit}</span>
                </div>
              </div>

              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient} opacity-60`}></div>
            </Card>
          );
        })}
      </div>

      {/* アクションボタン */}
      <Card className="p-6 bg-gradient-to-br from-white/90 to-gray-50/90 backdrop-blur-sm border-0 shadow-xl">
        <div className="flex flex-wrap gap-4 justify-center">
          <Button
            onClick={() => onStepChange(1)}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <Download className="w-4 h-4 mr-2" />
            勤怠データ取込
          </Button>
          
          <Button
            onClick={() => onStepChange(2)}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <Calculator className="w-4 h-4 mr-2" />
            給与計算実行
          </Button>
          
          <Button
            onClick={onShowIssues}
            variant="outline"
            className="bg-white hover:bg-orange-50 border-orange-200 hover:border-orange-300 text-orange-700 shadow-sm transition-all duration-200 hover:scale-105"
          >
            <AlertTriangle className="w-4 h-4 mr-2" />
            異常データ確認
          </Button>
          
          <Button
            onClick={onShowApproval}
            variant="outline"
            className="bg-white hover:bg-purple-50 border-purple-200 hover:border-purple-300 text-purple-700 shadow-sm transition-all duration-200 hover:scale-105"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            承認ワークフロー
          </Button>
          
          <Button
            onClick={onShowOutput}
            variant="outline"
            className="bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300 shadow-sm transition-all duration-200 hover:scale-105"
          >
            <FileText className="w-4 h-4 mr-2" />
            明細・振込データ出力
          </Button>
        </div>
      </Card>
    </div>
  );
}