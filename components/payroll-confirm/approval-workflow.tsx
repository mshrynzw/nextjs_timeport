"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  CheckCircle, 
  Clock, 
  User, 
  ArrowRight,
  MessageSquare,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ApprovalWorkflowProps {
  isOpen: boolean;
  onClose: () => void;
  payrollData: any;
}

export function ApprovalWorkflow({ isOpen, onClose, payrollData }: ApprovalWorkflowProps) {
  const [comment, setComment] = useState("");
  const { toast } = useToast();

  const approvalSteps = [
    {
      step: 1,
      title: "人事担当者",
      name: "田中 花子",
      role: "初回確認",
      status: "completed",
      date: "2025-06-26 14:30",
      comment: "勤怠データの確認が完了しました。異常なし。"
    },
    {
      step: 2,
      title: "人事責任者",
      name: "佐藤 次郎",
      role: "内容承認",
      status: "pending",
      date: null,
      comment: null
    },
    {
      step: 3,
      title: "経理担当者",
      name: "山田 太郎",
      role: "最終確認",
      status: "waiting",
      date: null,
      comment: null
    },
    {
      step: 4,
      title: "経理責任者",
      name: "鈴木 美咲",
      role: "確定承認",
      status: "waiting",
      date: null,
      comment: null
    }
  ];

  const getStatusBadge = (status: string) => {
    const config = {
      'completed': { label: '承認済み', className: 'bg-green-100 text-green-800' },
      'pending': { label: '承認待ち', className: 'bg-blue-100 text-blue-800' },
      'waiting': { label: '待機中', className: 'bg-gray-100 text-gray-800' },
      'rejected': { label: '差戻し', className: 'bg-red-100 text-red-800' }
    };
    
    const statusConfig = config[status as keyof typeof config] || config.waiting;
    return (
      <Badge className={statusConfig.className}>
        {statusConfig.label}
      </Badge>
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-blue-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const handleApprove = () => {
    toast({
      title: "承認しました",
      description: "次のステップに進みます",
      className: "bg-green-50 border-green-200 text-green-800",
    });
  };

  const handleReject = () => {
    if (!comment.trim()) {
      toast({
        title: "差戻し理由を入力してください",
        description: "差戻しには理由の入力が必要です",
        className: "bg-red-50 border-red-200 text-red-800",
      });
      return;
    }

    toast({
      title: "差戻しました",
      description: "前のステップに戻ります",
      className: "bg-orange-50 border-orange-200 text-orange-800",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-white to-purple-50 border-0 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800 flex items-center">
            <CheckCircle className="w-6 h-6 mr-2 text-purple-600" />
            承認ワークフロー
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6 space-y-6">
          {/* 給与処理概要 */}
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">給与処理概要</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{payrollData.summary.totalEmployees}</div>
                <div className="text-sm text-gray-600">対象従業員</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  ¥{Math.round(payrollData.summary.totalGrossPay / 10000)}万
                </div>
                <div className="text-sm text-gray-600">総支給額</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  ¥{Math.round(payrollData.summary.totalDeduction / 10000)}万
                </div>
                <div className="text-sm text-gray-600">総控除額</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  ¥{Math.round(payrollData.summary.totalNetPay / 10000)}万
                </div>
                <div className="text-sm text-gray-600">差引支給額</div>
              </div>
            </div>
          </Card>

          {/* 承認フロー */}
          <Card className="p-6 bg-white border-2 border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-6">承認フロー</h3>
            
            <div className="space-y-4">
              {approvalSteps.map((step, index) => (
                <div key={step.step} className="flex items-center">
                  <div className="flex items-center flex-1">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 mr-4">
                      {getStatusIcon(step.status)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="font-semibold text-gray-800">{step.title}</div>
                          <div className="text-sm text-gray-600">{step.name} - {step.role}</div>
                        </div>
                        <div className="flex items-center gap-3">
                          {step.date && (
                            <div className="text-sm text-gray-500">{step.date}</div>
                          )}
                          {getStatusBadge(step.status)}
                        </div>
                      </div>
                      
                      {step.comment && (
                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                          <div className="flex items-start">
                            <MessageSquare className="w-4 h-4 text-gray-500 mr-2 mt-0.5" />
                            <div className="text-sm text-gray-700">{step.comment}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {index < approvalSteps.length - 1 && (
                    <ArrowRight className="w-5 h-5 text-gray-400 mx-4" />
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* 承認アクション */}
          <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 text-yellow-600" />
              承認アクション
            </h3>
            
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-semibold text-gray-700">コメント（任意）</Label>
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="承認・差戻しに関するコメントを入力してください"
                  className="mt-2 bg-white"
                  rows={3}
                />
              </div>
              
              <div className="flex gap-3">
                <Button
                  onClick={handleApprove}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  承認
                </Button>
                <Button
                  onClick={handleReject}
                  variant="outline"
                  className="flex-1 bg-white hover:bg-red-50 border-red-200 hover:border-red-300 text-red-700 shadow-sm transition-all duration-200 hover:scale-105"
                >
                  <AlertCircle className="w-4 h-4 mr-2" />
                  差戻し
                </Button>
              </div>
            </div>
          </Card>

          <div className="flex justify-end pt-4 border-t border-gray-200">
            <Button onClick={onClose} variant="outline" className="bg-white hover:bg-gray-50">
              閉じる
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}