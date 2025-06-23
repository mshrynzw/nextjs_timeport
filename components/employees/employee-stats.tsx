"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Users, UserPlus, UserMinus, Building, Plus, Upload, Download, Settings } from "lucide-react";

interface EmployeeStatsProps {
  employees: any[];
  departmentStats: any[];
  onAddEmployee: () => void;
  onCSVImport: () => void;
  onCSVExport: () => void;
  onDepartmentManagement: () => void;
}

export function EmployeeStats({ 
  employees, 
  departmentStats, 
  onAddEmployee, 
  onCSVImport, 
  onCSVExport,
  onDepartmentManagement 
}: EmployeeStatsProps) {
  const totalEmployees = employees.filter(emp => emp.employmentInfo.status === 'active').length;
  const newHires = employees.filter(emp => {
    const hireDate = new Date(emp.employmentInfo.hireDate);
    const currentMonth = new Date();
    return hireDate.getMonth() === currentMonth.getMonth() && 
           hireDate.getFullYear() === currentMonth.getFullYear();
  }).length;
  const resigned = 0; // サンプルデータでは退職者なし

  const stats = [
    {
      title: "総従業員数",
      value: totalEmployees,
      unit: "人",
      icon: Users,
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50 to-indigo-50",
      change: "+2",
      changeType: "increase"
    },
    {
      title: "新規登録",
      value: newHires,
      unit: "人",
      icon: UserPlus,
      gradient: "from-green-500 to-green-600",
      bgGradient: "from-green-50 to-emerald-50",
      change: "+1",
      changeType: "increase"
    },
    {
      title: "退職者数",
      value: resigned,
      unit: "人",
      icon: UserMinus,
      gradient: "from-red-500 to-red-600",
      bgGradient: "from-red-50 to-pink-50",
      change: "0",
      changeType: "neutral"
    },
    {
      title: "部署数",
      value: departmentStats.length,
      unit: "部署",
      icon: Building,
      gradient: "from-purple-500 to-purple-600",
      bgGradient: "from-purple-50 to-pink-50",
      change: "0",
      changeType: "neutral"
    }
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-xl border border-gray-200">
          <p className="font-semibold text-gray-800">{payload[0].name}</p>
          <p style={{ color: payload[0].color }} className="text-sm">
            {payload[0].value}人
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="mb-8">
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
                <div className={`px-2 py-1 rounded-full text-xs font-bold ${
                  stat.changeType === 'increase' ? 'bg-green-100 text-green-700' :
                  stat.changeType === 'decrease' ? 'bg-red-100 text-red-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {stat.change}
                </div>
              </div>
              
              <div className="space-y-3 relative z-10">
                <h3 className="text-sm font-semibold text-gray-600 tracking-wide">{stat.title}</h3>
                <div className="flex items-end gap-1">
                  <span className="text-3xl font-bold text-gray-800 font-mono">{stat.value}</span>
                  <span className="text-sm text-gray-500 mb-1">{stat.unit}</span>
                </div>
              </div>

              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient} opacity-60`}></div>
            </Card>
          );
        })}
      </div>

      {/* アクションボタンと部署別チャート */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* アクションボタン */}
        <Card className="p-6 bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-sm border-0 shadow-xl">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <Settings className="w-6 h-6 mr-2 text-blue-600" />
            クイックアクション
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={onAddEmployee}
              className="h-16 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Plus className="w-5 h-5 mr-2" />
              新規登録
            </Button>
            
            <Button
              onClick={onCSVImport}
              variant="outline"
              className="h-16 bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300 shadow-sm transition-all duration-200 hover:scale-105"
            >
              <Upload className="w-5 h-5 mr-2" />
              CSV インポート
            </Button>
            
            <Button
              onClick={onCSVExport}
              variant="outline"
              className="h-16 bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300 shadow-sm transition-all duration-200 hover:scale-105"
            >
              <Download className="w-5 h-5 mr-2" />
              CSV エクスポート
            </Button>
            
            <Button
              onClick={onDepartmentManagement}
              variant="outline"
              className="h-16 bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300 shadow-sm transition-all duration-200 hover:scale-105"
            >
              <Building className="w-5 h-5 mr-2" />
              部署管理
            </Button>
          </div>
        </Card>

        {/* 部署別従業員数チャート */}
        <Card className="p-6 bg-gradient-to-br from-white/90 to-purple-50/90 backdrop-blur-sm border-0 shadow-xl">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <Building className="w-6 h-6 mr-2 text-purple-600" />
            部署別従業員数
          </h3>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departmentStats}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="count"
                >
                  {departmentStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mt-4">
            {departmentStats.map((dept, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: dept.color }}
                ></div>
                <span className="text-sm text-gray-600">{dept.name}</span>
                <span className="text-sm font-semibold text-gray-800 ml-auto">{dept.count}人</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}