"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  AlertTriangle, 
  Clock, 
  UserX, 
  Calendar,
  CheckCircle,
  X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AttendanceIssuesProps {
  issues: Array<{
    employeeId: string;
    name: string;
    issueType: string;
    severity: 'error' | 'warning';
    description: string;
    suggestedAction: string;
  }>;
  isOpen: boolean;
  onClose: () => void;
}

export function AttendanceIssues({ issues, isOpen, onClose }: AttendanceIssuesProps) {
  const { toast } = useToast();

  const getIssueIcon = (issueType: string) => {
    switch (issueType) {
      case 'missing_timecard':
        return Clock;
      case 'overtime_limit':
        return AlertTriangle;
      case 'absent_without_leave':
        return UserX;
      case 'holiday_work':
        return Calendar;
      default:
        return AlertTriangle;
    }
  };

  const getIssueTypeLabel = (issueType: string) => {
    const labels: { [key: string]: string } = {
      'missing_timecard': '打刻未入力',
      'overtime_limit': '残業時間超過',
      'absent_without_leave': '無断欠勤',
      'holiday_work': '休日出勤'
    };
    return labels[issueType] || issueType;
  };

  const getSeverityBadge = (severity: 'error' | 'warning') => {
    return severity === 'error' ? (
      <Badge className="bg-red-100 text-red-800">エラー</Badge>
    ) : (
      <Badge className="bg-orange-100 text-orange-800">警告</Badge>
    );
  };

  const handleResolveIssue = (issueId: string) => {
    toast({
      title: "問題を解決しました",
      description: "勤怠データが修正されました",
      className: "bg-green-50 border-green-200 text-green-800",
    });
  };

  const handleIgnoreIssue = (issueId: string) => {
    toast({
      title: "問題を無視しました",
      description: "この問題は無視されます",
      className: "bg-gray-50 border-gray-200 text-gray-800",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-white to-orange-50 border-0 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800 flex items-center">
            <AlertTriangle className="w-6 h-6 mr-2 text-orange-600" />
            勤怠データ異常確認
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6">
          {issues.length === 0 ? (
            <Card className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-green-800 mb-2">問題は見つかりませんでした</h3>
              <p className="text-green-600">すべての勤怠データが正常です</p>
            </Card>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {issues.length}件の問題が見つかりました
                  </h3>
                  <p className="text-gray-600">各問題を確認し、適切な対応を行ってください</p>
                </div>
                <div className="flex gap-2">
                  <Badge className="bg-red-100 text-red-800">
                    エラー: {issues.filter(i => i.severity === 'error').length}件
                  </Badge>
                  <Badge className="bg-orange-100 text-orange-800">
                    警告: {issues.filter(i => i.severity === 'warning').length}件
                  </Badge>
                </div>
              </div>

              {issues.map((issue, index) => {
                const IconComponent = getIssueIcon(issue.issueType);
                return (
                  <Card
                    key={index}
                    className={`p-6 border-2 ${
                      issue.severity === 'error' 
                        ? 'bg-gradient-to-br from-red-50 to-pink-50 border-red-200' 
                        : 'bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-full ${
                          issue.severity === 'error' ? 'bg-red-500' : 'bg-orange-500'
                        }`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-lg font-semibold text-gray-800">
                              {issue.name} ({issue.employeeId})
                            </h4>
                            {getSeverityBadge(issue.severity)}
                            <Badge variant="outline" className="bg-white">
                              {getIssueTypeLabel(issue.issueType)}
                            </Badge>
                          </div>
                          
                          <p className="text-gray-700 mb-3">{issue.description}</p>
                          
                          <div className="bg-white p-3 rounded-lg border border-gray-200">
                            <div className="text-sm font-medium text-gray-600 mb-1">推奨対応:</div>
                            <div className="text-sm text-gray-800">{issue.suggestedAction}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2 ml-4">
                        <Button
                          size="sm"
                          onClick={() => handleResolveIssue(issue.employeeId)}
                          className="bg-green-500 hover:bg-green-600 text-white"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          解決
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleIgnoreIssue(issue.employeeId)}
                          className="bg-white hover:bg-gray-50"
                        >
                          <X className="w-4 h-4 mr-1" />
                          無視
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}

          <div className="flex justify-end pt-6 border-t border-gray-200 mt-8">
            <Button onClick={onClose} className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
              閉じる
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}