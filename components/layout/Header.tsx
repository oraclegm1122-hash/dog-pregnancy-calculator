// components/layout/Header.tsx
import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Calendar, Heart, BookOpen, Stethoscope } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl p-1.5 bg-teal-50 rounded-lg group-hover:scale-105 transition-transform">🐕</span>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-teal-700 transition-colors">
                Whelp<span className="text-teal-600">Wise</span>
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                Canine Reproductive Toolkit
              </span>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
            <Link href="/" className="text-teal-700 hover:text-teal-800 flex items-center gap-1.5">
              <Calendar className="w-4 h-4" /> Calculator
            </Link>
            <Link href="#week-by-week" className="hover:text-teal-700 flex items-center gap-1.5 transition-colors">
              <BookOpen className="w-4 h-4" /> Week-by-Week
            </Link>
            <Link href="#breeds" className="hover:text-teal-700 flex items-center gap-1.5 transition-colors">
              <Heart className="w-4 h-4" /> Breeds & Litter
            </Link>
            <Link href="#vet-guidance" className="hover:text-teal-700 flex items-center gap-1.5 transition-colors">
              <Stethoscope className="w-4 h-4" /> Vet Schedule
            </Link>
          </nav>

          {/* DVM Review Badge */}
          <div className="flex items-center gap-2 bg-teal-50 border border-teal-200 text-teal-800 text-xs px-3 py-1.5 rounded-full font-medium">
            <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
            <span className="truncate">Reviewed by <strong className="font-semibold">Dr. S. Mitchell, DVM</strong></span>
          </div>
        </div>
      </div>
    </header>
  );
}
