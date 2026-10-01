// lib/calculator-logic.ts
import { addDays, differenceInDays } from 'date-fns';
import { getBreedData } from './breed-data';

export type CalculationMethod = 'mating' | 'first-last-mating' | 'lh-peak' | 'ovulation' | 'diestrus';

export interface CalculatorInput {
  method: CalculationMethod;
  date: Date;
  dateEnd?: Date;
  breedId?: string;
  breedSize?: 'toy' | 'small' | 'medium' | 'large' | 'giant';
  dogName?: string;
}

export interface Milestone {
  day: number;
  date: Date;
  title: string;
  description: string;
  category: 'vet-visit' | 'development' | 'preparation' | 'monitoring';
  icon: string;
}

export interface CalculatorOutput {
  dueDate: Date;
  earliestDate: Date;
  latestDate: Date;
  currentDay: number;
  currentWeek: number;
  progressPercent: number;
  milestones: Milestone[];
  breedNotes: string[];
  cSectionRisk: 'low' | 'medium' | 'high' | 'very-high';
  cSectionPercent?: number;
  breedName?: string;
  accuracyWindowDays: number;
}

export const GESTATION_BY_METHOD: Record<CalculationMethod, { avg: number; min: number; max: number; accuracyWindowDays: number }> = {
  'mating': { avg: 63, min: 56, max: 70, accuracyWindowDays: 14 },
  'first-last-mating': { avg: 63, min: 56, max: 70, accuracyWindowDays: 14 },
  'lh-peak': { avg: 65, min: 64, max: 66, accuracyWindowDays: 2 },
  'ovulation': { avg: 63, min: 62, max: 64, accuracyWindowDays: 2 },
  'diestrus': { avg: 57, min: 55, max: 59, accuracyWindowDays: 4 },
};

export function generateMilestones(baseDate: Date, dueDate: Date, method: CalculationMethod): Milestone[] {
  // If method is diestrus (day 57) or LH peak (day 65), normalize milestone offsets relative to mating/ovulation (day 0)
  let dayOffset = 0;
  if (method === 'diestrus') {
    dayOffset = 6; // diestrus day 1 corresponds approximately to day 6 post-ovulation
  } else if (method === 'lh-peak') {
    dayOffset = -2; // LH peak occurs 2 days prior to ovulation
  }

  const milestonesRaw = [
    {
      day: 0,
      title: method === 'ovulation' ? 'Ovulation Confirmed' : (method === 'lh-peak' ? 'LH Surge Peak' : (method === 'diestrus' ? 'Diestrus Onset' : 'Breeding / Mating Date')),
      description: 'Canine conception window opens. Sperm fertilizes mature ova in oviducts.',
      category: 'development' as const,
      icon: '🐕'
    },
    {
      day: 7,
      title: 'Embryos Enter Uterus',
      description: 'Early dividing morulae migrate down the fallopian tubes into the uterine horns.',
      category: 'development' as const,
      icon: '🔬'
    },
    {
      day: 16,
      title: 'Implantation Begins',
      description: 'Blastocysts implant securely into the endometrium; embryonic placental membranes begin formation.',
      category: 'development' as const,
      icon: '📌'
    },
    {
      day: 21,
      title: 'Morning Sickness Window',
      description: 'Hormonal surge (progesterone & relaxin) may cause mild appetite decrease or transient morning nausea.',
      category: 'development' as const,
      icon: '🤢'
    },
    {
      day: 25,
      title: '🏥 Schedule Diagnostic Ultrasound',
      description: 'Gold-standard imaging window. Confirms viable gestational sacs and visible fetal heartbeats.',
      category: 'vet-visit' as const,
      icon: '🏥'
    },
    {
      day: 28,
      title: 'Veterinary Palpation Possible',
      description: 'Experienced veterinarians can gently palpate marble-sized ampullae in the uterine horns (days 28-35).',
      category: 'vet-visit' as const,
      icon: '👐'
    },
    {
      day: 35,
      title: 'Transition to High-Energy Food',
      description: 'Gradually increase calories by 20-25% using a premium puppy or performance formula for fetal organogenesis.',
      category: 'preparation' as const,
      icon: '🍖'
    },
    {
      day: 42,
      title: 'Accelerated Fetal Growth',
      description: 'Fetal skeletons and features form. Dam abdominal enlargement becomes noticeable; mammary tissue swells.',
      category: 'development' as const,
      icon: '🤰'
    },
    {
      day: 45,
      title: '🏥 Schedule Prenatal Radiograph',
      description: 'Book late-term radiograph with your veterinary clinic to evaluate pelvic spacing and puppy count.',
      category: 'vet-visit' as const,
      icon: '☢️'
    },
    {
      day: 49,
      title: 'Introduce the Whelping Box',
      description: 'Set up whelping box with pig rails in a quiet, temperature-controlled, draft-free room to acclimatize dam.',
      category: 'preparation' as const,
      icon: '📦'
    },
    {
      day: 50,
      title: '🏥 Diagnostic X-Ray (Puppy Count)',
      description: 'Optimal radiograph window. Fetal skulls and vertebral columns are fully mineralized for accurate litter count.',
      category: 'vet-visit' as const,
      icon: '🏥'
    },
    {
      day: 55,
      title: 'Sterilize Whelping Kit Supplies',
      description: 'Finalize supplies: aspirator bulb, sterile hemostats, dental floss, betadine, digital thermometers, scale.',
      category: 'preparation' as const,
      icon: '🧰'
    },
    {
      day: 56,
      title: '🌡️ Twice-Daily Rectal Temperature Log',
      description: 'Record morning and evening rectal temperatures. A sustained drop below 99°F (37.2°C) signals labor within 12-24 hours.',
      category: 'monitoring' as const,
      icon: '🌡️'
    },
    {
      day: 58,
      title: 'Earliest Viable Delivery Window',
      description: 'Fetal lungs have produced sufficient surfactant. Puppies born from this date forward are clinically viable.',
      category: 'development' as const,
      icon: '⏰'
    },
    {
      day: 63,
      title: '🎉 Expected Delivery Date (Day 63)',
      description: 'Primary whelping target. Watch for Stage 1 labor: panting, restlessness, nesting, and cervical dilation.',
      category: 'development' as const,
      icon: '🎉'
    },
    {
      day: 65,
      title: '⚠️ Overdue Veterinary Consultation',
      description: 'If active labor has not commenced by day 65 from ovulation (or day 70 from mating), contact veterinary theriogenologist immediately.',
      category: 'vet-visit' as const,
      icon: '⚠️'
    }
  ];

  return milestonesRaw.map(m => {
    let milestoneDate: Date;
    if (m.day === 63) {
      milestoneDate = dueDate;
    } else {
      const adjustedDays = Math.max(0, m.day - dayOffset);
      milestoneDate = addDays(baseDate, adjustedDays);
    }
    return {
      day: m.day,
      date: milestoneDate,
      title: m.title,
      description: m.description,
      category: m.category,
      icon: m.icon,
    };
  });
}

export function calculateDogPregnancy(input: CalculatorInput): CalculatorOutput {
  const breedData = input.breedId ? getBreedData(input.breedId) : undefined;
  const effectiveSize = input.breedSize || breedData?.size || 'medium';

  let dueDate: Date;
  let earliestDate: Date;
  let latestDate: Date;
  let accuracyWindow = GESTATION_BY_METHOD[input.method].accuracyWindowDays;

  if (input.method === 'first-last-mating' && input.dateEnd) {
    const firstMating = input.date;
    const lastMating = input.dateEnd;
    dueDate = addDays(lastMating, 63);
    earliestDate = addDays(firstMating, 56);
    latestDate = addDays(lastMating, 70);
    accuracyWindow = differenceInDays(latestDate, earliestDate);
  } else {
    const gestation = GESTATION_BY_METHOD[input.method];
    dueDate = addDays(input.date, gestation.avg);
    earliestDate = addDays(input.date, gestation.min);
    latestDate = addDays(input.date, gestation.max);
  }

  // Breed size micro-adjustment (CSU veterinary reproductive medicine guideline)
  // Toy breeds often whelp ~1 day early; giant breeds often carry ~1 day longer
  if (effectiveSize === 'toy') {
    dueDate = addDays(dueDate, -1);
  } else if (effectiveSize === 'giant') {
    dueDate = addDays(dueDate, 1);
  }

  const today = new Date();
  const currentDay = Math.max(0, differenceInDays(today, input.date));
  const currentWeek = Math.min(9, Math.max(1, Math.ceil((currentDay || 1) / 7)));
  const progressPercent = Math.min(100, Math.max(0, Math.round((currentDay / 63) * 100)));

  const milestones = generateMilestones(input.date, dueDate, input.method);

  const breedNotes: string[] = [];
  if (breedData) {
    if (breedData.gestationNotes) {
      breedNotes.push(breedData.gestationNotes);
    }
    if (breedData.warnings && breedData.warnings.length > 0) {
      breedNotes.push(...breedData.warnings);
    }
  }

  return {
    dueDate,
    earliestDate,
    latestDate,
    currentDay,
    currentWeek,
    progressPercent,
    milestones,
    breedNotes,
    cSectionRisk: breedData?.cSectionRate || 'low',
    cSectionPercent: breedData?.cSectionPercent,
    breedName: breedData?.name,
    accuracyWindowDays: accuracyWindow,
  };
}
