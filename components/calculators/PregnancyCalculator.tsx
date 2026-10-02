'use client';

import React, { useState, useMemo } from 'react';
import { format, subDays, differenceInDays } from 'date-fns';
import {
  Calendar as CalendarIcon,
  Printer,
  Copy,
  Share2,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Search,
  Check,
  Heart,
  Baby,
  Stethoscope,
  Info
} from 'lucide-react';
import {
  calculateDogPregnancy,
  CalculationMethod,
  CalculatorOutput
} from '@/lib/calculator-logic';
import { BREEDS } from '@/lib/breed-data';
import { downloadICS } from '@/lib/ics-generator';
import { generateWhelpingPDF } from '@/lib/pdf-generator';

const POPULAR_BREEDS = [
  'golden-retriever',
  'french-bulldog',
  'labrador',
  'german-shepherd',
  'chihuahua',
  'english-bulldog',
  'poodle',
  'rottweiler',
  'yorkie',
  'dachshund',
  'boxer',
  'beagle'
];

export default function PregnancyCalculator() {
  const [method, setMethod] = useState<CalculationMethod>('mating');
  const [showAdvancedMethods, setShowAdvancedMethods] = useState<boolean>(false);

  // Date selection
  const [primaryDateStr, setPrimaryDateStr] = useState<string>(() => {
    return format(subDays(new Date(), 14), 'yyyy-MM-dd');
  });
  const [endDateStr, setEndDateStr] = useState<string>(() => {
    return format(subDays(new Date(), 12), 'yyyy-MM-dd');
  });

  // Breed & Dog selection
  const [selectedBreedId, setSelectedBreedId] = useState<string>('golden-retriever');
  const [breedSearch, setBreedSearch] = useState<string>('');
  const [isBreedDropdownOpen, setIsBreedDropdownOpen] = useState<boolean>(false);
  const [dogName, setDogName] = useState<string>(''); // Blank by default as per UX best practices

  // UI state
  const [activeTab, setActiveTab] = useState<'timeline' | 'current' | 'checklist'>('timeline');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [copied, setCopied] = useState<boolean>(false);
  const [expandedMilestone, setExpandedMilestone] = useState<number | null>(null);

  // Filtered breeds
  const filteredBreeds = useMemo(() => {
    if (!breedSearch.trim()) {
      return BREEDS.slice(0, 50);
    }
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

  // Days remaining calculation
  const daysRemaining = useMemo(() => {
    const today = new Date();
    const diff = differenceInDays(calculationResult.dueDate, today);
    return diff;
  }, [calculationResult.dueDate]);

  // Quick Date Helpers
  const setQuickDate = (daysAgo: number) => {
    setPrimaryDateStr(format(subDays(new Date(), daysAgo), 'yyyy-MM-dd'));
  };

  const handleCopy = () => {
    const nameLabel = dogName.trim() ? dogName.trim() : 'Your Dog';
    const text = `🐕 ${nameLabel}'s Due Date (${selectedBreed?.name || 'Dog'}):
Target Due Date: ${format(calculationResult.dueDate, 'EEEE, MMMM d, yyyy')}
Delivery Window: ${format(calculationResult.earliestDate, 'MMM d')} – ${format(calculationResult.latestDate, 'MMM d, yyyy')}
Status: Day ${calculationResult.currentDay} of 63 (Week ${calculationResult.currentWeek}) - ${calculationResult.progressPercent}% along
Calculated with Dog Pregnancy Calculator`;

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
          title: `Dog Pregnancy Due Date`,
          text: `Puppies due on ${format(calculationResult.dueDate, 'MMMM d, yyyy')}!`,
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
    <div id="calculator" className="w-full pt-1 pb-8 scroll-mt-20">
      {/* Outer Card */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200/90 overflow-hidden">
        
        {/* Friendly Card Header */}
        <div className="bg-gradient-to-r from-teal-700 via-teal-600 to-teal-800 text-white p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-teal-900/50 text-teal-100 text-xs px-3 py-1 rounded-full font-medium mb-2 border border-teal-400/30">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Accurate Canine Gestation Engine</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                {dogName.trim() ? `When Are ${dogName.trim()}'s Puppies Due?` : "When Are Your Dog's Puppies Due?"}
              </h2>
              <p className="text-teal-100 text-xs sm:text-sm mt-1 max-w-xl">
                Select your mating or ovulation date and breed below to generate an instant whelping countdown and week-by-week calendar.
              </p>
            </div>

            <div className="hidden lg:flex flex-col items-end text-right bg-white/10 backdrop-blur-xs px-4 py-2.5 rounded-2xl border border-white/15">
              <span className="text-[11px] uppercase tracking-wider text-teal-200 font-bold">Standard Gestation</span>
              <span className="text-2xl font-black text-amber-300">63 Days</span>
              <span className="text-[11px] text-teal-100">Average Canine Term</span>
            </div>
          </div>
        </div>

        {/* INPUT FORM SECTION */}
        <div className="p-6 sm:p-8 bg-slate-50/70 border-b border-slate-200">
          <div className="space-y-6">

            {/* Step 1: Calculation Method Tabs */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-teal-600 text-white text-[11px] flex items-center justify-center font-bold">1</span>
                  Select Conception Method
                </label>
                <button
                  type="button"
                  onClick={() => setShowAdvancedMethods(!showAdvancedMethods)}
                  className="text-xs font-semibold text-teal-700 hover:text-teal-800 transition-colors"
                >
                  {showAdvancedMethods ? '− Less Methods' : '+ More Methods (LH Peak, Diestrus)'}
                </button>
              </div>

              {/* Primary User-Friendly Methods */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'mating', label: 'Single Mating Date', note: 'Most common • 63 ± 7 days' },
                  { id: 'ovulation', label: 'Ovulation Date', note: 'Progesterone test • 63 ± 1 day' },
                  { id: 'first-last-mating', label: 'First & Last Mating', note: 'Multiple ties • Range window' },
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setMethod(item.id as CalculationMethod)}
                    className={`text-left p-3.5 rounded-2xl border transition-all ${
                      method === item.id
                        ? 'bg-teal-50 border-teal-600 ring-2 ring-teal-500/20 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-100/60'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold text-xs sm:text-sm text-slate-900">
                      <span>{item.label}</span>
                      {method === item.id && <Check className="w-4 h-4 text-teal-600" />}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">{item.note}</div>
                  </button>
                ))}
              </div>

              {/* Advanced Methods (Expandable) */}
              {showAdvancedMethods && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-2.5 pt-2.5 border-t border-slate-200/80">
                  {[
                    { id: 'lh-peak', label: 'LH Surge Peak', note: 'Serial blood testing • 65 ± 1 days' },
                    { id: 'diestrus', label: 'Diestrus Day 1', note: 'Vaginal cytology • 57 ± 2 days' },
                  ].map(item => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setMethod(item.id as CalculationMethod)}
                      className={`text-left p-3 rounded-xl border text-xs transition-all ${
                        method === item.id
                          ? 'bg-teal-50 border-teal-600 ring-2 ring-teal-500/20'
                          : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-100/60'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold text-slate-900">
                        <span>{item.label}</span>
                        {method === item.id && <Check className="w-3.5 h-3.5 text-teal-600" />}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{item.note}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Step 2, 3, 4 Inputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              {/* Date Input */}
              <div className={method === 'first-last-mating' ? 'md:col-span-4' : 'md:col-span-4'}>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-teal-600 text-white text-[11px] flex items-center justify-center font-bold">2</span>
                  {method === 'first-last-mating' ? 'First Mating Date' : (method === 'ovulation' ? 'Ovulation Date' : (method === 'lh-peak' ? 'LH Peak Date' : (method === 'diestrus' ? 'Diestrus Day 1' : 'Mating Date')))}
                </label>
                <input
                  type="date"
                  value={primaryDateStr}
                  onChange={e => setPrimaryDateStr(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                />
                {/* Quick Presets */}
                <div className="flex items-center gap-1.5 mt-2 text-[11px]">
                  <span className="text-slate-600 font-medium">Quick:</span>
                  <button
                    type="button"
                    onClick={() => setQuickDate(0)}
                    className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600 hover:text-teal-700 hover:border-teal-400 transition-colors"
                  >
                    Today
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuickDate(7)}
                    className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600 hover:text-teal-700 hover:border-teal-400 transition-colors"
                  >
                    1 Wk Ago
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuickDate(14)}
                    className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600 hover:text-teal-700 hover:border-teal-400 transition-colors"
                  >
                    2 Wks Ago
                  </button>
                </div>
              </div>

              {/* End Date (for first & last mating) */}
              {method === 'first-last-mating' && (
                <div className="md:col-span-4">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Last Mating Date
                  </label>
                  <input
                    type="date"
                    value={endDateStr}
                    onChange={e => setEndDateStr(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                  />
                  <span className="text-[11px] text-slate-600 mt-1 block">Final date dam was bred</span>
                </div>
              )}

              {/* Breed Selector */}
              <div className={method === 'first-last-mating' ? 'md:col-span-4' : 'md:col-span-5'}>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-teal-600 text-white text-[11px] flex items-center justify-center font-bold">3</span>
                  Breed (For Litter Size &amp; Health)
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsBreedDropdownOpen(!isBreedDropdownOpen)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-left flex items-center justify-between font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                  >
                    <span className="truncate">{selectedBreed ? selectedBreed.name : 'Select a breed...'}</span>
                    <span className="flex items-center gap-1.5 shrink-0 ml-2">
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                        {selectedBreed.size}
                      </span>
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    </span>
                  </button>

                  {/* Dropdown Menu */}
                  {isBreedDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-2xl shadow-2xl z-40 p-3 max-h-80 overflow-y-auto">
                      <div className="relative mb-2">
                        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          placeholder="Search 200+ breeds..."
                          value={breedSearch}
                          onChange={e => setBreedSearch(e.target.value)}
                          className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                          autoFocus
                        />
                      </div>

                      {/* Quick Popular Pills */}
                      {!breedSearch && (
                        <div className="mb-2 pb-2 border-b border-slate-100">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block mb-1">
                            Popular Breeds:
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {POPULAR_BREEDS.slice(0, 6).map(id => {
                              const b = BREEDS.find(x => x.id === id);
                              if (!b) return null;
                              return (
                                <button
                                  key={id}
                                  type="button"
                                  onClick={() => {
                                    setSelectedBreedId(b.id);
                                    setIsBreedDropdownOpen(false);
                                  }}
                                  className="text-[11px] px-2 py-1 rounded-lg bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-700 font-medium transition-colors"
                                >
                                  {b.name}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      <div className="space-y-0.5">
                        {filteredBreeds.map(b => (
                          <button
                            key={b.id}
                            type="button"
                            onClick={() => {
                              setSelectedBreedId(b.id);
                              setIsBreedDropdownOpen(false);
                              setBreedSearch('');
                            }}
                            className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                              selectedBreedId === b.id
                                ? 'bg-teal-50 text-teal-800 font-bold'
                                : 'hover:bg-slate-100 text-slate-700'
                            }`}
                          >
                            <span className="truncate">{b.name}</span>
                            <div className="flex items-center gap-1.5 shrink-0 ml-2">
                              {b.cSectionRate === 'very-high' && (
                                <span className="text-[10px] bg-red-100 text-red-700 font-bold px-1.5 py-0.5 rounded-sm">
                                  C-Section Alert
                                </span>
                              )}
                              <span className="text-[10px] text-slate-600 capitalize font-medium">{b.size}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Dog's Name (Optional) */}
              <div className={method === 'first-last-mating' ? 'md:col-span-12' : 'md:col-span-3'}>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-slate-300 text-slate-700 text-[11px] flex items-center justify-center font-bold">4</span>
                  Dog&apos;s Name <span className="text-slate-600 font-normal lowercase">(optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Bella, Luna, Daisy"
                  value={dogName}
                  onChange={e => setDogName(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

          </div>
        </div>

        {/* RESULTS HERO SECTION */}
        <div className="p-6 sm:p-8 bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Primary Due Date Card */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="bg-gradient-to-br from-teal-50/90 via-teal-50/40 to-amber-50/30 border border-teal-200/90 rounded-3xl p-6 sm:p-7 relative overflow-hidden shadow-xs">
                
                {/* Header row */}
                <div className="flex items-center justify-between text-xs font-bold text-teal-800 mb-3">
                  <span className="inline-flex items-center gap-1.5 uppercase tracking-wider">
                    <CalendarIcon className="w-4 h-4 text-teal-600" />
                    Target Due Date
                  </span>
                  
                  {/* Countdown Badge */}
                  <span className="bg-amber-100 text-amber-900 border border-amber-300/80 px-3 py-1 rounded-full text-xs font-extrabold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-700" />
                    {daysRemaining > 0
                      ? `${daysRemaining} Days Remaining`
                      : (daysRemaining === 0 ? '🎉 Due Today!' : `${Math.abs(daysRemaining)} Days Past Due`)}
                  </span>
                </div>

                {/* Big Due Date Typography */}
                <div className="text-2xl sm:text-3xl font-bold text-slate-800">
                  {format(calculationResult.dueDate, 'EEEE')}
                </div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-teal-700 mt-1 tracking-tight">
                  {format(calculationResult.dueDate, 'MMMM d, yyyy')}
                </div>

                {/* Delivery Window Summary */}
                <div className="mt-5 pt-4 border-t border-teal-200/60 grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-600 block font-medium">Earliest Safe Delivery (Day 56):</span>
                    <strong className="text-slate-900 font-bold text-sm block mt-0.5">
                      {format(calculationResult.earliestDate, 'MMM d, yyyy')}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-600 block font-medium">Latest Full-Term Date (Day 70):</span>
                    <strong className="text-slate-900 font-bold text-sm block mt-0.5">
                      {format(calculationResult.latestDate, 'MMM d, yyyy')}
                    </strong>
                  </div>
                </div>

                {/* Accuracy Note */}
                <div className="mt-4 flex items-center gap-2 text-xs text-slate-600 bg-white/80 rounded-xl p-3 border border-teal-100">
                  <Info className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>
                    <strong>Estimated Window:</strong> {calculationResult.accuracyWindowDays} days span based on{' '}
                    {method === 'ovulation' ? 'confirmed ovulation timing (±1 day precision)' : 'mating date timing (sperm viability span: 5-7 days)'}.
                  </span>
                </div>
              </div>

              {/* Visual Progress Bar */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Baby className="w-4 h-4 text-teal-600" />
                    Pregnancy Progress: <span className="text-teal-700 font-black">Day {calculationResult.currentDay} of 63</span> (Week {calculationResult.currentWeek > 9 ? 'Full Term' : calculationResult.currentWeek})
                  </span>
                  <span className="font-black text-teal-800 bg-teal-100/70 px-2 py-0.5 rounded-full text-xs">
                    {calculationResult.progressPercent}% Complete
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-3.5 bg-slate-200 rounded-full overflow-hidden p-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-teal-500 to-teal-700 rounded-full transition-all duration-700"
                    style={{ width: `${calculationResult.progressPercent}%` }}
                  />
                </div>

                {/* Key Markers */}
                <div className="flex justify-between text-[11px] text-slate-600 font-medium">
                  <span>Conception (Day 0)</span>
                  <span>Ultrasound (Day 25)</span>
                  <span>X-Ray (Day 50)</span>
                  <span>Due Date (Day 63)</span>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <button
                  type="button"
                  onClick={() => downloadICS(calculationResult.milestones, dogName.trim() || undefined)}
                  className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-xs transition-colors"
                >
                  <CalendarIcon className="w-4 h-4 shrink-0" />
                  <span>Add to Calendar</span>
                </button>

                <button
                  type="button"
                  onClick={() => generateWhelpingPDF(calculationResult, dogName.trim() || undefined)}
                  className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs shadow-xs transition-colors"
                >
                  <Printer className="w-4 h-4 shrink-0" />
                  <span>Download PDF</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-300 transition-colors"
                >
                  {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <Copy className="w-4 h-4 shrink-0" />}
                  <span>{copied ? 'Copied!' : 'Copy Dates'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleShare}
                  className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-300 transition-colors"
                >
                  <Share2 className="w-4 h-4 shrink-0" />
                  <span>Share</span>
                </button>
              </div>

            </div>

            {/* Sidebar: Breed Insights & Labor Tips */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Breed Profile Card */}
              {selectedBreed && (
                <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 sm:p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <div>
                      <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-1.5">
                        <Heart className="w-4 h-4 text-teal-600" />
                        {selectedBreed.name}
                      </h3>
                      <p className="text-xs text-slate-600 capitalize font-medium">{selectedBreed.size} breed category</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] text-slate-600 block font-medium">Avg Litter Size</span>
                      <strong className="text-base font-black text-teal-700">
                        {selectedBreed.avgLitterSize} puppies
                      </strong>
                      <span className="text-[10px] text-slate-600 block">({selectedBreed.litterRange[0]}–{selectedBreed.litterRange[1]} range)</span>
                    </div>
                  </div>

                  {/* C-Section Risk Status */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700">C-Section Surgical Risk:</span>
                    <span
                      className={`font-black uppercase text-[11px] px-2.5 py-0.5 rounded-full ${
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

                  {/* Breed Warning or Notes */}
                  {selectedBreed.warnings.length > 0 ? (
                    <div className="bg-amber-50 border-l-4 border-amber-500 p-3.5 rounded-r-xl text-xs space-y-1">
                      <div className="font-bold text-amber-900 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        Breed Advisory:
                      </div>
                      <ul className="text-amber-800 list-disc list-inside space-y-1 pl-1 text-[11px]">
                        {selectedBreed.warnings.map((w, idx) => (
                          <li key={idx}>{w}</li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="bg-teal-50 border-l-4 border-teal-500 p-3 rounded-r-xl text-xs text-teal-800">
                      <strong>Normal Profile:</strong> {selectedBreed.name}s typically experience smooth, natural whelping within standard gestation timelines.
                    </div>
                  )}

                  {/* Temperature Reminder Callout */}
                  <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-3.5 text-xs text-blue-900 flex gap-2.5 items-start">
                    <span className="text-lg">🌡️</span>
                    <div>
                      <strong className="font-bold block text-blue-950">Pre-Labor Temperature Drop</strong>
                      Take rectal readings twice daily starting Day 56. A drop below <strong>99.0°F (37.2°C)</strong> signals labor within 12–24 hours.
                    </div>
                  </div>

                  {/* Research Citation */}
                  <div className="text-[10px] text-slate-600 italic pt-1 border-t border-slate-200">
                    Source: Borge et al. (Theriogenology 2011, 10,810 litters across 224 breeds).
                  </div>
                </div>
              )}

            </div>

          </div>

          {/* INTERACTIVE TIMELINE / MILESTONES SECTION */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            
            {/* Tab Navigation */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('timeline')}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    activeTab === 'timeline'
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  📅 16 Key Milestones
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('checklist')}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    activeTab === 'checklist'
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  🧰 Whelping Essentials
                </button>
              </div>

              {/* Category Filter Pills (Visible when on timeline tab) */}
              {activeTab === 'timeline' && (
                <div className="flex flex-wrap gap-1.5 text-xs">
                  {[
                    { id: 'all', label: 'All' },
                    { id: 'development', label: 'Embryo & Fetus' },
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
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* TAB CONTENT: TIMELINE */}
            {activeTab === 'timeline' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {filteredMilestones.map(m => {
                  const isPassed = calculationResult.currentDay >= m.day;
                  const isToday = calculationResult.currentDay === m.day;
                  const isExpanded = expandedMilestone === m.day;

                  return (
                    <div
                      key={m.day}
                      className={`rounded-2xl border p-4.5 transition-all ${
                        isToday
                          ? 'bg-teal-50/80 border-teal-500 ring-2 ring-teal-500/20'
                          : isPassed
                          ? 'bg-white border-slate-200/90'
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
                              <span className="text-xs font-semibold text-slate-600">
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
            )}

            {/* TAB CONTENT: WHELPING ESSENTIALS CHECKLIST */}
            {activeTab === 'checklist' && (
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="space-y-1">
                  <h4 className="text-lg font-bold text-slate-900">Essential Whelping Room Checklist</h4>
                  <p className="text-xs text-slate-500">
                    Prepare these essential items at least 2 weeks before your dog&apos;s expected due date.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="bg-white border border-slate-200 rounded-2xl p-4.5 space-y-2">
                    <span className="font-bold text-slate-900 text-sm block text-teal-700">1. Nesting &amp; Warmth</span>
                    <ul className="space-y-1.5 text-slate-600 list-disc list-inside">
                      <li>Whelping box with pig rails</li>
                      <li>Waterproof washable whelping pads</li>
                      <li>Clean cotton towels &amp; blankets</li>
                      <li>Safe heating lamp or heating pad</li>
                      <li>Room thermometer (keep at 75–80°F)</li>
                    </ul>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-2xl p-4.5 space-y-2">
                    <span className="font-bold text-slate-900 text-sm block text-teal-700">2. Medical &amp; Delivery</span>
                    <ul className="space-y-1.5 text-slate-600 list-disc list-inside">
                      <li>Rubber bulb aspirator for airway suction</li>
                      <li>Sterile hemostats (clamp umbilical cord)</li>
                      <li>Unwaxed dental floss (tie cords)</li>
                      <li>Blunt surgical scissors</li>
                      <li>Betadine / iodine antiseptic</li>
                    </ul>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-2xl p-4.5 space-y-2">
                    <span className="font-bold text-slate-900 text-sm block text-teal-700">3. Monitoring &amp; Nutrition</span>
                    <ul className="space-y-1.5 text-slate-600 list-disc list-inside">
                      <li>Digital rectal thermometer (track Day 56 drop)</li>
                      <li>Digital gram scale for newborn weights</li>
                      <li>Puppy milk replacer (Esbilac) &amp; nursing bottles</li>
                      <li>Color-coded puppy identification collars</li>
                      <li>Emergency vet hospital phone number on fridge</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
