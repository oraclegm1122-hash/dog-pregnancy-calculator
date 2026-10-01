'use client';

import React, { useState, useMemo } from 'react';
import { format, subDays, addDays } from 'date-fns';
import {
  Calendar as CalendarIcon,
  Download,
  Printer,
  Copy,
  Share2,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  Clock,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import {
  calculateDogPregnancy,
  CalculationMethod,
  CalculatorOutput,
  GESTATION_BY_METHOD
} from '@/lib/calculator-logic';
import { BREEDS, BreedData } from '@/lib/breed-data';
import { downloadICS } from '@/lib/ics-generator';
import { generateWhelpingPDF } from '@/lib/pdf-generator';

export default function PregnancyCalculator() {
  const [method, setMethod] = useState<CalculationMethod>('mating');
  const [primaryDateStr, setPrimaryDateStr] = useState<string>(() => {
    // Default to 14 days ago so users immediately see active pregnancy progress
    return format(subDays(new Date(), 14), 'yyyy-MM-dd');
  });
  const [endDateStr, setEndDateStr] = useState<string>(() => {
    return format(subDays(new Date(), 12), 'yyyy-MM-dd');
  });
  const [selectedBreedId, setSelectedBreedId] = useState<string>('golden-retriever');
  const [breedSearch, setBreedSearch] = useState<string>('');
  const [isBreedDropdownOpen, setIsBreedDropdownOpen] = useState<boolean>(false);
  const [dogName, setDogName] = useState<string>('Bella');
  const [copied, setCopied] = useState<boolean>(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [expandedMilestone, setExpandedMilestone] = useState<number | null>(null);

  // Filter breeds for search
  const filteredBreeds = useMemo(() => {
    if (!breedSearch.trim()) return BREEDS.slice(0, 40);
    const q = breedSearch.toLowerCase();
    return BREEDS.filter(b => b.name.toLowerCase().includes(q)).slice(0, 30);
  }, [breedSearch]);

  const selectedBreed = useMemo(() => {
    return BREEDS.find(b => b.id === selectedBreedId) || BREEDS[0];
  }, [selectedBreedId]);

  // Compute calculation output
  const calculationResult: CalculatorOutput = useMemo(() => {
    const baseDate = new Date(primaryDateStr + 'T12:00:00');
    const endDate = method === 'first-last-mating' ? new Date(endDateStr + 'T12:00:00') : undefined;

    return calculateDogPregnancy({
      method,
      date: isNaN(baseDate.getTime()) ? new Date() : baseDate,
      dateEnd: endDate && !isNaN(endDate.getTime()) ? endDate : undefined,
      breedId: selectedBreedId,
      dogName: dogName.trim() || undefined,
    });
  }, [method, primaryDateStr, endDateStr, selectedBreedId, dogName]);

  const handleCopy = () => {
    const text = `🐕 ${dogName || 'Dog'}'s Pregnancy Timeline (${selectedBreed?.name}):
Expected Due Date: ${format(calculationResult.dueDate, 'MMMM d, yyyy')} (Day 63)
Viable Delivery Window: ${format(calculationResult.earliestDate, 'MMM d')} - ${format(calculationResult.latestDate, 'MMM d')}
Current Progress: Day ${calculationResult.currentDay} (Week ${calculationResult.currentWeek}) - ${calculationResult.progressPercent}%
Calculated via WhelpWise Dog Pregnancy Calculator`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `${dogName || 'Dog'}'s Due Date Calendar`,
          text: `Expected Due Date: ${format(calculationResult.dueDate, 'MMMM d, yyyy')} for ${dogName || 'our dog'}!`,
          url: window.location.href,
        });
      } catch {
        handleCopy();
      }
    } else {
      handleCopy();
    }
  };

  const filteredMilestones = useMemo(() => {
    if (filterCategory === 'all') return calculationResult.milestones;
    return calculationResult.milestones.filter(m => m.category === filterCategory);
  }, [calculationResult.milestones, filterCategory]);

  return (
    <section id="calculator" className="w-full pt-2 pb-10">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-teal-700 via-teal-600 to-teal-800 text-white p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-teal-900/60 text-teal-200 text-xs px-3 py-1 rounded-full font-medium mb-3 border border-teal-500/30">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Multi-Method Gestation Engine • CSU &amp; Cornell Calibrated</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Calculate {dogName ? `${dogName}'s` : "Your Dog's"} Exact Due Date
              </h2>
              <p className="text-teal-100 text-sm mt-1 max-w-2xl">
                Choose your conception milestone, select from 214+ breeds, and obtain a personalized day-by-day clinical whelping schedule.
              </p>
            </div>
            <div className="hidden lg:flex flex-col items-end text-right">
              <span className="text-xs uppercase tracking-wider text-teal-200 font-semibold">Standard Canine Gestation</span>
              <span className="text-2xl font-black text-amber-300">63 Days</span>
              <span className="text-[11px] text-teal-200">±1 day with Ovulation Dating</span>
            </div>
          </div>
        </div>

        {/* Form Inputs Grid */}
        <div className="p-6 sm:p-8 bg-slate-50 border-b border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Method Selection (5 Methods) */}
            <div className="md:col-span-12">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                1. Calculation Method
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                {[
                  { id: 'mating', label: 'Single Mating', note: '63 ± 7 days' },
                  { id: 'first-last-mating', label: 'First & Last Mating', note: 'Date range' },
                  { id: 'ovulation', label: 'Ovulation Date', note: '63 ± 1 days (High Precision)' },
                  { id: 'lh-peak', label: 'LH Surge Peak', note: '65 ± 1 days' },
                  { id: 'diestrus', label: 'Diestrus Day 1', note: '57 ± 2 days' },
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setMethod(item.id as CalculationMethod)}
                    className={`text-left p-3 rounded-xl border text-xs transition-all ${
                      method === item.id
                        ? 'bg-teal-50 border-teal-600 ring-2 ring-teal-500/20 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-100/60'
                    }`}
                  >
                    <div className="font-bold text-slate-900 flex items-center justify-between">
                      {item.label}
                      {method === item.id && <CheckCircle className="w-3.5 h-3.5 text-teal-600" />}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">{item.note}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Date Input */}
            <div className={method === 'first-last-mating' ? 'md:col-span-4' : 'md:col-span-4'}>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                2. {method === 'first-last-mating' ? 'First Mating Date' : (method === 'ovulation' ? 'Ovulation Date' : (method === 'lh-peak' ? 'LH Peak Date' : (method === 'diestrus' ? 'Diestrus Onset Date' : 'Mating Date')))}
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={primaryDateStr}
                  onChange={e => setPrimaryDateStr(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            </div>

            {/* Secondary End Date (only for first-last mating) */}
            {method === 'first-last-mating' && (
              <div className="md:col-span-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Last Mating Date
                </label>
                <input
                  type="date"
                  value={endDateStr}
                  onChange={e => setEndDateStr(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            )}

            {/* Breed Selector Autocomplete */}
            <div className={method === 'first-last-mating' ? 'md:col-span-4' : 'md:col-span-5'}>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                {method === 'first-last-mating' ? '3.' : '3.'} Breed &amp; Size (214 Breeds)
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsBreedDropdownOpen(!isBreedDropdownOpen)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-left flex items-center justify-between font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                >
                  <span className="truncate">
                    {selectedBreed ? selectedBreed.name : 'Select a breed...'}
                  </span>
                  <span className="flex items-center gap-1.5 shrink-0 ml-2">
                    <span className="text-[11px] uppercase px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 font-semibold border border-slate-200">
                      {selectedBreed.size}
                    </span>
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  </span>
                </button>

                {isBreedDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-2xl z-30 p-2 max-h-72 overflow-y-auto">
                    <input
                      type="text"
                      placeholder="Type breed name (e.g. French Bulldog, Golden Retriever)..."
                      value={breedSearch}
                      onChange={e => setBreedSearch(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg mb-2 focus:outline-hidden focus:ring-1 focus:ring-teal-500"
                      autoFocus
                    />
                    <div className="space-y-1">
                      {filteredBreeds.map(b => (
                        <button
                          key={b.id}
                          type="button"
                          onClick={() => {
                            setSelectedBreedId(b.id);
                            setIsBreedDropdownOpen(false);
                            setBreedSearch('');
                          }}
                          className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                            selectedBreedId === b.id ? 'bg-teal-50 text-teal-800 font-bold' : 'hover:bg-slate-100 text-slate-700'
                          }`}
                        >
                          <span>{b.name}</span>
                          <div className="flex items-center gap-1.5">
                            {b.cSectionRate === 'very-high' && (
                              <span className="text-[10px] bg-red-100 text-red-700 font-bold px-1.5 py-0.5 rounded-xs">
                                80%+ C-Sec
                              </span>
                            )}
                            <span className="text-[10px] text-slate-500 capitalize">{b.size}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Dog Name Input */}
            <div className={method === 'first-last-mating' ? 'md:col-span-12' : 'md:col-span-3'}>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                4. Dog&apos;s Name (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Bella, Luna, Daisy"
                value={dogName}
                onChange={e => setDogName(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>
        </div>

        {/* RESULTS CARD */}
        <div className="p-6 sm:p-8 bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Primary Delivery Box */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-gradient-to-br from-teal-50 via-teal-50/50 to-amber-50/40 border border-teal-200/80 rounded-2xl p-6 sm:p-7 relative overflow-hidden">
                <div className="flex items-center justify-between text-xs text-teal-800 font-semibold mb-2">
                  <span className="flex items-center gap-1.5 uppercase tracking-wider">
                    <CalendarIcon className="w-4 h-4 text-teal-600" />
                    Target Whelping Date
                  </span>
                  <span className="bg-white/80 border border-teal-200 px-2.5 py-0.5 rounded-full text-teal-700">
                    Day 63 Milestone
                  </span>
                </div>

                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {format(calculationResult.dueDate, 'EEEE')}
                </div>
                <div className="text-2xl sm:text-3xl font-black text-teal-700 mt-0.5">
                  {format(calculationResult.dueDate, 'MMMM d, yyyy')}
                </div>

                {/* Viable Range Window */}
                <div className="mt-4 pt-4 border-t border-teal-200/60 grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-500 block">Earliest Viable Date (Day 56):</span>
                    <strong className="text-slate-800 font-bold text-sm">
                      {format(calculationResult.earliestDate, 'MMM d, yyyy')}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Latest Full-Term Date (Day 70):</span>
                    <strong className="text-slate-800 font-bold text-sm">
                      {format(calculationResult.latestDate, 'MMM d, yyyy')}
                    </strong>
                  </div>
                </div>

                {/* Accuracy Note */}
                <div className="mt-4 flex items-center gap-2 text-xs text-slate-600 bg-white/70 rounded-lg p-2.5 border border-teal-100">
                  <Clock className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>
                    <strong>Calculation Accuracy:</strong> Window is{' '}
                    <span className="font-semibold text-teal-800">{calculationResult.accuracyWindowDays} days</span>{' '}
                    based on {method === 'ovulation' ? 'confirmed ovulation timing (±1 day precision)' : 'mating date timing (sperm viability span: 5-7 days)'}.
                  </span>
                </div>
              </div>

              {/* Live Gestational Progress Bar */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-800">
                    Current Gestation: <span className="text-teal-700 font-extrabold">Day {calculationResult.currentDay} of 63</span> ({calculationResult.currentWeek > 9 ? 'Full Term / Overdue' : `Week ${calculationResult.currentWeek}`})
                  </span>
                  <span className="font-black text-teal-800">{calculationResult.progressPercent}%</span>
                </div>

                <div className="w-full h-3.5 bg-slate-200 rounded-full overflow-hidden p-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-teal-500 to-teal-700 rounded-full transition-all duration-700"
                    style={{ width: `${calculationResult.progressPercent}%` }}
                  />
                </div>

                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>Conception (Day 0)</span>
                  <span>Ultrasound (Day 25)</span>
                  <span>X-Ray (Day 50)</span>
                  <span>Due Date (Day 63)</span>
                </div>
              </div>

              {/* Action Buttons Toolbar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <button
                  type="button"
                  onClick={() => downloadICS(calculationResult.milestones, dogName)}
                  className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-xs transition-colors"
                >
                  <CalendarIcon className="w-4 h-4 shrink-0" />
                  <span>Add to iCal / Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => generateWhelpingPDF(calculationResult, dogName)}
                  className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs shadow-xs transition-colors"
                >
                  <Printer className="w-4 h-4 shrink-0" />
                  <span>Printable PDF</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs border border-slate-300 transition-colors"
                >
                  {copied ? <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" /> : <Copy className="w-4 h-4 shrink-0" />}
                  <span>{copied ? 'Copied!' : 'Copy Dates'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleShare}
                  className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs border border-slate-300 transition-colors"
                >
                  <Share2 className="w-4 h-4 shrink-0" />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Breed & Medical Alerts Sidebar */}
            <div className="lg:col-span-5 space-y-4">
              {/* Breed Profile Summary Box */}
              {selectedBreed && (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <div>
                      <h3 className="font-extrabold text-sm text-slate-900">{selectedBreed.name}</h3>
                      <p className="text-xs text-slate-500 capitalize">{selectedBreed.size} breed group</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-slate-500 block">Avg Litter Size</span>
                      <strong className="text-sm font-bold text-teal-700">
                        {selectedBreed.avgLitterSize} puppies
                      </strong>
                      <span className="text-[10px] text-slate-400 block">({selectedBreed.litterRange[0]}-{selectedBreed.litterRange[1]} range)</span>
                    </div>
                  </div>

                  {/* C-Section Risk Status */}
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-semibold text-slate-700">C-Section Surgical Risk:</span>
                      <span
                        className={`font-black uppercase text-[11px] px-2 py-0.5 rounded-full ${
                          selectedBreed.cSectionRate === 'very-high'
                            ? 'bg-red-100 text-red-700 border border-red-200'
                            : selectedBreed.cSectionRate === 'high'
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        }`}
                      >
                        {selectedBreed.cSectionRate.replace('-', ' ')}
                        {selectedBreed.cSectionPercent ? ` (${selectedBreed.cSectionPercent}%)` : ''}
                      </span>
                    </div>
                  </div>

                  {/* Breed Warning or Notes */}
                  {selectedBreed.warnings.length > 0 ? (
                    <div className="bg-amber-50 border-l-4 border-amber-500 p-3.5 rounded-r-lg text-xs space-y-1">
                      <div className="font-bold text-amber-900 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        Clinical Breed Alert:
                      </div>
                      <ul className="text-amber-800 list-disc list-inside space-y-1 pl-1 text-[11px]">
                        {selectedBreed.warnings.map((w, idx) => (
                          <li key={idx}>{w}</li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="bg-teal-50 border-l-4 border-teal-500 p-3.5 rounded-r-lg text-xs text-teal-800">
                      <strong>Normal Whelping Profile:</strong> {selectedBreed.name}s typically experience natural whelping with standard 63-day gestation and low dystocia rates.
                    </div>
                  )}

                  {/* Research Citation Footnote */}
                  <div className="text-[10px] text-slate-500 italic pt-1 border-t border-slate-200">
                    Source: Borge et al. (Theriogenology 2011, 10,810 litters across 224 breeds) &amp; Evans &amp; Adams (JSAP 2010).
                  </div>
                </div>
              )}

              {/* Temperature Alert Reminder */}
              <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4 flex gap-3 items-start text-xs text-blue-900">
                <span className="text-xl">🌡️</span>
                <div>
                  <strong className="font-bold text-blue-950 block mb-0.5">Pre-Labor Temperature Trigger (Day 56)</strong>
                  Normal rectal temperature is 100–101.5°F. A sustained drop below <strong>99.0°F (37.2°C)</strong> indicates progesterone collapse and delivery within 12–24 hours.
                </div>
              </div>
            </div>
          </div>

          {/* 16-MILESTONE INTERACTIVE ACCORDION / TIMELINE */}
          <div className="mt-12 pt-10 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  16 Key Pregnancy &amp; Whelping Milestones
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Detailed day-by-day embryological development, veterinary visits, and whelping room preparations.
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-1.5 text-xs">
                {[
                  { id: 'all', label: 'All (16)' },
                  { id: 'development', label: 'Development' },
                  { id: 'vet-visit', label: '🏥 Vet Visits' },
                  { id: 'preparation', label: '📦 Whelping Setup' },
                  { id: 'monitoring', label: '🌡️ Temperature' },
                ].map(cat => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setFilterCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-full font-semibold transition-colors ${
                      filterCategory === cat.id
                        ? 'bg-teal-600 text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Milestone List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredMilestones.map(m => {
                const isPassed = calculationResult.currentDay >= m.day;
                const isToday = calculationResult.currentDay === m.day;
                const isExpanded = expandedMilestone === m.day;

                return (
                  <div
                    key={m.day}
                    className={`rounded-xl border p-4 transition-all ${
                      isToday
                        ? 'bg-teal-50 border-teal-500 ring-2 ring-teal-500/20'
                        : isPassed
                        ? 'bg-white border-slate-200'
                        : 'bg-slate-50/60 border-slate-200'
                    }`}
                  >
                    <div
                      className="flex items-start justify-between cursor-pointer"
                      onClick={() => setExpandedMilestone(isExpanded ? null : m.day)}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl mt-0.5">{m.icon}</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black text-teal-700 bg-teal-100/70 px-2 py-0.5 rounded-md">
                              Day {m.day}
                            </span>
                            <span className="text-xs font-semibold text-slate-500">
                              {format(m.date, 'MMM d, yyyy')}
                            </span>
                            {isToday && (
                              <span className="text-[10px] bg-teal-600 text-white font-extrabold px-1.5 py-0.5 rounded-xs animate-pulse">
                                TODAY
                              </span>
                            )}
                          </div>
                          <h4 className="font-bold text-sm text-slate-900 mt-1">{m.title}</h4>
                        </div>
                      </div>

                      <button
                        type="button"
                        aria-label="Toggle milestone details"
                        className="text-slate-400 hover:text-slate-600 p-1"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>

                    <p className={`text-xs text-slate-600 mt-2.5 leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}>
                      {m.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
