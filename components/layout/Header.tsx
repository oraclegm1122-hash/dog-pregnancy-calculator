// components/layout/Header.tsx
import React from 'react';
import Link from 'next/link';
import { Calendar, Heart, BookOpen, HelpCircle } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="text-2xl p-1.5 bg-teal-50 rounded-xl group-hover:scale-105 transition-transform flex items-center justify-center">
              🐕
            </span>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-teal-700 transition-colors">
                Dog Pregnancy <span className="text-teal-600">Calculator</span>
              </span>
            </div>
          </Link>

          {/* Clean Nav Links */}
          <nav className="flex items-center gap-4 sm:gap-6 text-sm font-semibold text-slate-600">
            <Link href="#calculator" className="text-teal-700 hover:text-teal-800 flex items-center gap-1.5 transition-colors">
              <Calendar className="w-4 h-4" /> <span>Calculator</span>
            </Link>
            <Link href="#week-by-week" className="hidden sm:flex hover:text-teal-700 items-center gap-1.5 transition-colors">
              <BookOpen className="w-4 h-4" /> <span>Week-by-Week</span>
            </Link>
            <Link href="#breeds" className="hidden md:flex hover:text-teal-700 items-center gap-1.5 transition-colors">
              <Heart className="w-4 h-4" /> <span>Breeds</span>
            </Link>
            <Link href="#faq" className="hover:text-teal-700 flex items-center gap-1.5 transition-colors">
              <HelpCircle className="w-4 h-4" /> <span>FAQ</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
