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
    <Card className="p-8 bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
      <div className="text-center space-y-6">
        <div className="flex items-center justify-center mb-6">
          <div className="p-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
            <Clock className="w-10 h-10 text-white" />
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 tracking-wide">現在時刻</h2>
          
          {/* デジタル時計 */}
          <div className="relative">
            <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-6 shadow-inner">
              <div className="text-5xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-300 to-green-500 tracking-wider drop-shadow-lg">
                {format(currentTime, "HH:mm:ss")}
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-green-500/10 rounded-2xl animate-pulse"></div>
            </div>
          </div>
          
          {/* 日付表示 */}
          <div className="text-xl text-gray-700 font-medium tracking-wide">
            {format(currentTime, "yyyy年MM月dd日 (E)", { locale: ja })}
          </div>
          
          {/* 装飾的な要素 */}
          <div className="flex justify-center space-x-2 mt-4">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-75"></div>
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-150"></div>
          </div>
        </div>
      </div>
    </Card>
  );
}