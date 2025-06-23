"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Building, Plus, Edit, Trash2, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DepartmentManagementProps {
  departments: any[];
  isOpen: boolean;
  onClose: () => void;
}

export function DepartmentManagement({ departments: initialDepartments, isOpen, onClose }: DepartmentManagementProps) {
  const [departments, setDepartments] = useState(initialDepartments);
  const [newDepartmentName, setNewDepartmentName] = useState("");
  const [editingDepartment, setEditingDepartment] = useState<any>(null);
  const { toast } = useToast();

  const addDepartment = () => {
    if (newDepartmentName.trim()) {
      const newDepartment = {
        name: newDepartmentName.trim(),
        count: 0,
        color: `#${Math.floor(Math.random()*16777215).toString(16)}`
      };
      setDepartments([...departments, newDepartment]);
      setNewDepartmentName("");
      
      toast({
        title: "部署を追加しました",
        description: `${newDepartment.name}を追加しました`,
        className: "bg-green-50 border-green-200 text-green-800",
      });
    }
  };

  const updateDepartment = (index: number, newName: string) => {
    const updatedDepartments = [...departments];
    updatedDepartments[index] = { ...updatedDepartments[index], name: newName };
    setDepartments(updatedDepartments);
    setEditingDepartment(null);
    
    toast({
      title: "部署名を更新しました",
      description: `部署名を${newName}に変更しました`,
      className: "bg-blue-50 border-blue-200 text-blue-800",
    });
  };

  const deleteDepartment = (index: number) => {
    const departmentName = departments[index].name;
    const updatedDepartments = departments.filter((_, i) => i !== index);
    setDepartments(updatedDepartments);
    
    toast({
      title: "部署を削除しました",
      description: `${departmentName}を削除しました`,
      className: "bg-red-50 border-red-200 text-red-800",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-white to-purple-50 border-0 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800 flex items-center">
            <Building className="w-6 h-6 mr-2 text-purple-600" />
            部署管理
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* 新規部署追加 */}
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Plus className="w-5 h-5 mr-2 text-purple-600" />
              新規部署追加
            </h3>
            
            <div className="flex gap-3">
              <div className="flex-1">
                <Label htmlFor="new-department">部署名</Label>
                <Input
                  id="new-department"
                  value={newDepartmentName}
                  onChange={(e) => setNewDepartmentName(e.target.value)}
                  placeholder="部署名を入力してください"
                  className="bg-white border-purple-200 focus:border-purple-400"
                  onKeyPress={(e) => e.key === 'Enter' && addDepartment()}
                />
              </div>
              <div className="flex items-end">
                <Button
                  onClick={addDepartment}
                  disabled={!newDepartmentName.trim()}
                  className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  追加
                </Button>
              </div>
            </div>
          </Card>

          {/* 部署一覧 */}
          <Card className="p-6 bg-white border-2 border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Building className="w-5 h-5 mr-2 text-gray-600" />
              部署一覧
            </h3>

            <div className="space-y-3">
              {departments.map((department, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: department.color }}
                    ></div>
                    
                    {editingDepartment === index ? (
                      <Input
                        value={department.name}
                        onChange={(e) => {
                          const updatedDepartments = [...departments];
                          updatedDepartments[index] = { ...updatedDepartments[index], name: e.target.value };
                          setDepartments(updatedDepartments);
                        }}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            updateDepartment(index, department.name);
                          }
                        }}
                        onBlur={() => updateDepartment(index, department.name)}
                        className="w-48 bg-white border-gray-200 focus:border-purple-400"
                        autoFocus
                      />
                    ) : (
                      <div>
                        <div className="font-semibold text-gray-800">{department.name}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Users className="w-3 h-3 mr-1" />
                          {department.count}人
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    {editingDepartment === index ? (
                      <Button
                        size="sm"
                        onClick={() => updateDepartment(index, department.name)}
                        className="bg-green-500 hover:bg-green-600"
                      >
                        保存
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingDepartment(index)}
                        className="bg-white hover:bg-gray-50"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    )}
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteDepartment(index)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      disabled={department.count > 0}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {departments.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                部署が登録されていません
              </div>
            )}
          </Card>

          {/* 注意事項 */}
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-800 mb-2">注意事項</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• 従業員が所属している部署は削除できません</li>
              <li>• 部署名の変更は既存の従業員データにも反映されます</li>
              <li>• 部署の色は自動で設定されます</li>
            </ul>
          </div>

          {/* アクションボタン */}
          <div className="flex justify-end pt-4 border-t border-gray-200">
            <Button
              onClick={onClose}
              className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
            >
              完了
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}