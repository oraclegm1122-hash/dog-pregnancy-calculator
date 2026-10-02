// components/layout/Footer.tsx
import React from 'react';
import Link from 'next/link';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-20 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Medical Disclaimer Banner */}
        <div className="bg-amber-950/40 border border-amber-600/30 rounded-xl p-5 mb-12 flex gap-4 items-start">
          <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-200/90 leading-relaxed space-y-1">
            <p className="font-semibold text-amber-300 uppercase tracking-wider text-[11px]">
              Veterinary Medical & Health Disclaimer
            </p>
            <p>
              This tool is for informational and educational purposes only and is not a substitute for professional
              veterinary medical advice, diagnosis, or treatment. Always consult your veterinarian for medical decisions
              about your dog&apos;s pregnancy, labor, and whelping. If your dog is experiencing an emergency (such as green
              discharge before puppy delivery, severe lethargy, or stalled contractions), contact your veterinarian or an
              emergency animal hospital immediately.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🐕</span>
              <span className="text-xl font-bold text-white tracking-tight">
                Dog Pregnancy <span className="text-teal-400">Calculator</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Accurate canine gestation calculations, research-backed developmental milestones, and whelping planning for pet parents and responsible breeders.
            </p>
          </div>

          {/* Quick Calculators */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Core Tools</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/" className="hover:text-teal-400 transition-colors">Dog Pregnancy Calculator</Link></li>
              <li><Link href="#calculator" className="hover:text-teal-400 transition-colors">Ovulation Due Date Tool</Link></li>
              <li><Link href="#calculator" className="hover:text-teal-400 transition-colors">Printable Whelping Calendar</Link></li>
              <li><Link href="#calculator" className="hover:text-teal-400 transition-colors">Pre-Labor Temp Logger</Link></li>
              <li><Link href="#breeds" className="hover:text-teal-400 transition-colors">Litter Size & C-Section Risk</Link></li>
            </ul>
          </div>

          {/* Guides & Milestones */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Clinical Guides</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="#week-by-week" className="hover:text-teal-400 transition-colors">Week-by-Week Gestation Guide</Link></li>
              <li><Link href="#vet-guidance" className="hover:text-teal-400 transition-colors">Ultrasound vs X-Ray Timing</Link></li>
              <li><Link href="#accuracy" className="hover:text-teal-400 transition-colors">Dating Accuracy: Mating vs Ovulation</Link></li>
              <li><Link href="#labor-signs" className="hover:text-teal-400 transition-colors">Stages of Canine Labor</Link></li>
              <li><Link href="#emergency-box" className="hover:text-teal-400 transition-colors">Green Discharge & Dystocia Alerts</Link></li>
            </ul>
          </div>

          {/* Research & Citations */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Clinical Citations</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Calculations and developmental timelines calibrated according to peer-reviewed data from <em>Colorado State University VTH</em>, <em>Cornell Riney Canine Health Center</em>, <em>Borge et al. (Theriogenology 2011)</em>, and <em>Evans &amp; Adams (JSAP 2010)</em>.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Dog Pregnancy Calculator. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Editorial &amp; Review Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
