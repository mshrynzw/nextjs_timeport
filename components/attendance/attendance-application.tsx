"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Send, FileText, Clock } from "lucide-react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";

interface AttendanceApplicationProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AttendanceApplication({ isOpen, onClose }: AttendanceApplicationProps) {
  const [applicationType, setApplicationType] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [reason, setReason] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "申請を送信しました",
      description: "承認をお待ちください",
      className: "bg-green-50 border-green-200 text-green-800",
    });
    
    // フォームリセット
    setApplicationType("");
    setSelectedDate(undefined);
    setReason("");
    setStartTime("");
    setEndTime("");
    onClose();
  };

  const applicationTypes = [
    { value: "paid-leave", label: "有給休暇", icon: "🏖️" },
    { value: "late-arrival", label: "遅刻申請", icon: "⏰" },
    { value: "early-departure", label: "早退申請", icon: "🚪" },
    { value: "overtime", label: "残業申請", icon: "💼" },
    { value: "makeup-work", label: "振替出勤", icon: "🔄" },
    { value: "sick-leave", label: "病気休暇", icon: "🏥" }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-white to-blue-50 border-0 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl font-bold text-gray-800">
            <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 shadow-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            勤怠申請
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          {/* 申請種別 */}
          <div className="space-y-3">
            <Label htmlFor="application-type" className="text-sm font-semibold text-gray-700">申請種別</Label>
            <Select value={applicationType} onValueChange={setApplicationType}>
              <SelectTrigger className="bg-white border-gray-200 hover:border-purple-300 transition-colors shadow-sm">
                <SelectValue placeholder="申請種別を選択してください" />
              </SelectTrigger>
              <SelectContent>
                {applicationTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value} className="hover:bg-purple-50">
                    <div className="flex items-center gap-2">
                      <span>{type.icon}</span>
                      <span>{type.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 対象日 */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-gray-700">対象日</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal bg-white border-gray-200 hover:border-blue-300 transition-colors shadow-sm"
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-blue-600" />
                  {selectedDate ? format(selectedDate, "yyyy年MM月dd日", { locale: ja }) : "日付を選択"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-white shadow-xl border-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                  className="rounded-lg"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* 時間指定（遅刻・早退・残業の場合） */}
          {(applicationType === "late-arrival" || applicationType === "early-departure" || applicationType === "overtime") && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <Label htmlFor="start-time" className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {applicationType === "late-arrival" ? "出勤予定時刻" : 
                   applicationType === "early-departure" ? "退勤予定時刻" : "開始時刻"}
                </Label>
                <Input
                  id="start-time"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="bg-white border-gray-200 hover:border-blue-300 focus:border-blue-400 transition-colors shadow-sm"
                />
              </div>
              {applicationType === "overtime" && (
                <div className="space-y-3">
                  <Label htmlFor="end-time" className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    終了時刻
                  </Label>
                  <Input
                    id="end-time"
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="bg-white border-gray-200 hover:border-blue-300 focus:border-blue-400 transition-colors shadow-sm"
                  />
                </div>
              )}
            </div>
          )}

          {/* 理由 */}
          <div className="space-y-3">
            <Label htmlFor="reason" className="text-sm font-semibold text-gray-700">理由</Label>
            <Textarea
              id="reason"
              placeholder="申請理由を入力してください"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
              className="bg-white border-gray-200 hover:border-blue-300 focus:border-blue-400 transition-colors shadow-sm resize-none"
            />
          </div>

          {/* 申請ボタン */}
          <div className="flex gap-3 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300 transition-all duration-200 hover:scale-105"
            >
              キャンセル
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              disabled={!applicationType || !selectedDate || !reason}
            >
              <Send className="w-4 h-4 mr-2" />
              申請送信
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}