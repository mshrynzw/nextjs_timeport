"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

export function TimeClock() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center mb-4">
          <Clock className="w-8 h-8 text-blue-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">現在時刻</h2>
        </div>
        
        {/* デジタル時計 */}
        <div className="bg-gray-900 rounded-lg p-4 font-mono">
          <div className="text-4xl font-bold text-green-400 tracking-wider">
            {format(currentTime, "HH:mm:ss")}
          </div>
        </div>
        
        {/* 日付表示 */}
        <div className="text-lg text-gray-600">
          {format(currentTime, "yyyy年MM月dd日 (E)", { locale: ja })}
        </div>
      </div>
    </Card>
  );
}