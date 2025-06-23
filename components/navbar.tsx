"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Calendar, 
  DollarSign, 
  Settings, 
  Users, 
  CheckCircle, 
  LogIn,
  Menu,
  X
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { href: "/", icon: Home, label: "ホーム" },
    { href: "/attendance", icon: Calendar, label: "勤怠入力・履歴" },
    { href: "/payroll", icon: DollarSign, label: "月次給与明細" },
    { href: "/settings", icon: Settings, label: "扶養・控除・保険" },
    { href: "/employees", icon: Users, label: "従業員管理" },
    { href: "/confirm", icon: CheckCircle, label: "給与確定" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 backdrop-blur-md border-b border-white/20 shadow-2xl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* ロゴ */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="p-2 rounded-lg bg-white/20 backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-wide">TimePort</span>
          </Link>

          {/* デスクトップメニュー */}
          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-white/90 hover:text-white hover:bg-white/20 transition-all duration-300 ${
                      isActive ? 'bg-white/20 text-white shadow-lg' : ''
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* ログインボタン */}
          <div className="hidden md:flex items-center space-x-3">
            <Button
              variant="outline"
              className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:border-white/40 backdrop-blur-sm transition-all duration-300"
            >
              <LogIn className="w-4 h-4 mr-2" />
              ログイン
            </Button>
          </div>

          {/* モバイルメニューボタン */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-white hover:bg-white/20"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>
        </div>

        {/* モバイルメニュー */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            <div className="space-y-2">
              {menuItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = pathname === item.href;
                
                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start space-x-3 px-4 py-3 text-white/90 hover:text-white hover:bg-white/20 transition-all duration-300 ${
                        isActive ? 'bg-white/20 text-white' : ''
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <IconComponent className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Button>
                  </Link>
                );
              })}
              
              <div className="pt-4 border-t border-white/20">
                <Button
                  variant="outline"
                  className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20 hover:border-white/40"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  ログイン
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}