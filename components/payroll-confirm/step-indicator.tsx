"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Database, 
  Calculator, 
  Eye, 
  CheckCircle, 
  FileText,
  Check
} from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
  onStepChange: (step: number) => void;
}

export function StepIndicator({ currentStep, onStepChange }: StepIndicatorProps) {
  const steps = [
    {
      number: 1,
      title: "勤怠データ確認",
      description: "勤怠データの取込と異常検知",
      icon: Database,
      color: "blue"
    },
    {
      number: 2,
      title: "給与計算",
      description: "自動計算エンジンによる給与算出",
      icon: Calculator,
      color: "green"
    },
    {
      number: 3,
      title: "内容確認・修正",
      description: "計算結果の確認と手動調整",
      icon: Eye,
      color: "purple"
    },
    {
      number: 4,
      title: "給与確定",
      description: "承認ワークフローによる確定",
      icon: CheckCircle,
      color: "orange"
    },
    {
      number: 5,
      title: "明細・振込データ出力",
      description: "PDF明細と振込データの生成",
      icon: FileText,
      color: "indigo"
    }
  ];

  const getStepStatus = (stepNumber: number) => {
    if (stepNumber < currentStep) return "completed";
    if (stepNumber === currentStep) return "active";
    return "pending";
  };

  const getStepClasses = (step: any, status: string) => {
    const baseClasses = "flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300";
    
    switch (status) {
      case "completed":
        return `${baseClasses} bg-green-500 border-green-500 text-white shadow-lg`;
      case "active":
        return `${baseClasses} bg-${step.color}-500 border-${step.color}-500 text-white shadow-lg animate-pulse`;
      default:
        return `${baseClasses} bg-gray-100 border-gray-300 text-gray-500`;
    }
  };

  const getConnectorClasses = (stepNumber: number) => {
    const isCompleted = stepNumber < currentStep;
    return `flex-1 h-0.5 mx-4 transition-all duration-500 ${
      isCompleted ? 'bg-green-500' : 'bg-gray-300'
    }`;
  };

  return (
    <Card className="p-8 bg-gradient-to-br from-white/90 to-indigo-50/90 backdrop-blur-sm border-0 shadow-xl mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const IconComponent = step.icon;
          const status = getStepStatus(step.number);
          const isClickable = step.number <= currentStep + 1;
          
          return (
            <div key={step.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <Button
                  variant="ghost"
                  onClick={() => isClickable && onStepChange(step.number)}
                  disabled={!isClickable}
                  className={`p-0 h-auto hover:bg-transparent ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                >
                  <div className={getStepClasses(step, status)}>
                    {status === "completed" ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      <IconComponent className="w-6 h-6" />
                    )}
                  </div>
                </Button>
                
                <div className="mt-4 text-center max-w-32">
                  <div className={`text-sm font-semibold transition-colors duration-300 ${
                    status === 'active' ? `text-${step.color}-600` :
                    status === 'completed' ? 'text-green-600' :
                    'text-gray-500'
                  }`}>
                    {step.title}
                  </div>
                  <div className="text-xs text-gray-500 mt-1 hidden lg:block">
                    {step.description}
                  </div>
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className={getConnectorClasses(step.number)} />
              )}
            </div>
          );
        })}
      </div>
      
      {/* 現在のステップ詳細 */}
      <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
        <div className="flex items-center">
          <div className="p-2 rounded-lg bg-blue-500 mr-3">
            {React.createElement(steps[currentStep - 1]?.icon || Database, { 
              className: "w-5 h-5 text-white" 
            })}
          </div>
          <div>
            <div className="font-semibold text-blue-800">
              ステップ {currentStep}: {steps[currentStep - 1]?.title}
            </div>
            <div className="text-sm text-blue-600">
              {steps[currentStep - 1]?.description}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}