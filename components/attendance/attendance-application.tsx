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
import { CalendarIcon, Send } from "lucide-react";
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
    { value: "paid-leave", label: "有給休暇" },
    { value: "late-arrival", label: "遅刻申請" },
    { value: "early-departure", label: "早退申請" },
    { value: "overtime", label: "残業申請" },
    { value: "makeup-work", label: "振替出勤" },
    { value: "sick-leave", label: "病気休暇" }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Send className="w-5 h-5 text-purple-600" />
            勤怠申請
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 申請種別 */}
          <div className="space-y-2">
            <Label htmlFor="application-type">申請種別</Label>
            <Select value={applicationType} onValueChange={setApplicationType}>
              <SelectTrigger>
                <SelectValue placeholder="申請種別を選択してください" />
              </SelectTrigger>
              <SelectContent>
                {applicationTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 対象日 */}
          <div className="space-y-2">
            <Label>対象日</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "yyyy年MM月dd日", { locale: ja }) : "日付を選択"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* 時間指定（遅刻・早退・残業の場合） */}
          {(applicationType === "late-arrival" || applicationType === "early-departure" || applicationType === "overtime") && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-time">
                  {applicationType === "late-arrival" ? "出勤予定時刻" : 
                   applicationType === "early-departure" ? "退勤予定時刻" : "開始時刻"}
                </Label>
                <Input
                  id="start-time"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
              {applicationType === "overtime" && (
                <div className="space-y-2">
                  <Label htmlFor="end-time">終了時刻</Label>
                  <Input
                    id="end-time"
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>
              )}
            </div>
          )}

          {/* 理由 */}
          <div className="space-y-2">
            <Label htmlFor="reason">理由</Label>
            <Textarea
              id="reason"
              placeholder="申請理由を入力してください"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
            />
          </div>

          {/* 申請ボタン */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              キャンセル
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
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