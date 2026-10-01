// lib/breed-data.ts
// Comprehensive purebred canine reproductive database based on Borge et al. (2011) and Evans & Adams (2010)

export interface BreedData {
  id: string;
  name: string;
  slug: string;
  size: 'toy' | 'small' | 'medium' | 'large' | 'giant';
  avgLitterSize: number;
  litterRange: [number, number];
  cSectionRate: 'low' | 'medium' | 'high' | 'very-high';
  cSectionPercent?: number;
  gestationNotes: string;
  warnings: string[];
  phase: 1 | 2 | 3;
}

export const BREEDS: BreedData[] = [
  {
    "id": "french-bulldog",
    "name": "French Bulldog",
    "slug": "french-bulldog-pregnancy",
    "size": "small",
    "avgLitterSize": 3,
    "litterRange": [
      1,
      5
    ],
    "cSectionRate": "very-high",
    "cSectionPercent": 81.3,
    "gestationNotes": "Due to brachycephalic anatomy, natural birth is extremely rare. Plan for a scheduled C-section with your vet.",
    "warnings": [
      "Over 80% of French Bulldogs require C-sections (Evans & Adams, 2010)",
      "Frenchies are 15.9x more likely to have dystocia than crossbreeds (RVC VetCompass)",
      "Schedule C-section for day 61-63 from confirmed ovulation date",
      "Single-puppy litters carry higher risk of oversized puppies"
    ],
    "phase": 1
  },
  {
    "id": "english-bulldog",
    "name": "English Bulldog",
    "slug": "english-bulldog-pregnancy",
    "size": "medium",
    "avgLitterSize": 4,
    "litterRange": [
      3,
      5
    ],
    "cSectionRate": "very-high",
    "cSectionPercent": 86.1,
    "gestationNotes": "Highest C-section rate of any breed. Natural whelping should not be assumed.",
    "warnings": [
      "86.1% of English Bulldog litters are delivered by C-section (Evans & Adams, 2010)",
      "Puppies have very large heads relative to the dam's pelvic canal",
      "Emergency C-sections cost 2-3x more than planned ones — always schedule in advance"
    ],
    "phase": 1
  },
  {
    "id": "boston-terrier",
    "name": "Boston Terrier",
    "slug": "boston-terrier-pregnancy",
    "size": "small",
    "avgLitterSize": 4,
    "litterRange": [
      1,
      6
    ],
    "cSectionRate": "very-high",
    "cSectionPercent": 92.3,
    "gestationNotes": "One of the highest C-section rates of any breed. Plan for surgical delivery.",
    "warnings": [
      "92.3% of Boston Terrier litters are delivered by C-section (Evans & Adams, 2010)",
      "Do NOT attempt natural whelping without vet supervision",
      "Oversized puppy heads relative to the dam's narrow pelvis"
    ],
    "phase": 1
  },
  {
    "id": "german-shepherd",
    "name": "German Shepherd",
    "slug": "german-shepherd-pregnancy",
    "size": "large",
    "avgLitterSize": 7,
    "litterRange": [
      5,
      9
    ],
    "cSectionRate": "low",
    "gestationNotes": "German Shepherds typically whelp naturally with few complications. Large litters are common.",
    "warnings": [
      "Large litters (8+) may deliver 1-2 days earlier than average",
      "Hip dysplasia in the dam doesn't typically affect whelping",
      "Monitor for uterine inertia in older dams with very large litters"
    ],
    "phase": 1
  },
  {
    "id": "golden-retriever",
    "name": "Golden Retriever",
    "slug": "golden-retriever-pregnancy",
    "size": "large",
    "avgLitterSize": 8,
    "litterRange": [
      6,
      10
    ],
    "cSectionRate": "low",
    "gestationNotes": "Goldens are generally excellent whelpers with predictable timing and healthy litters.",
    "warnings": [
      "Regular veterinary palpation or ultrasound recommended around day 28-30 to verify healthy embryonic sac numbers"
    ],
    "phase": 1
  },
  {
    "id": "labrador",
    "name": "Labrador Retriever",
    "slug": "labrador-pregnancy",
    "size": "large",
    "avgLitterSize": 7,
    "litterRange": [
      5,
      10
    ],
    "cSectionRate": "low",
    "gestationNotes": "Labs typically have smooth pregnancies and deliveries. They are one of the most commonly bred dogs.",
    "warnings": [
      "Labs can have very large litters (10+), ensure adequate nutrition in late pregnancy"
    ],
    "phase": 1
  },
  {
    "id": "chihuahua",
    "name": "Chihuahua",
    "slug": "chihuahua-pregnancy",
    "size": "toy",
    "avgLitterSize": 3,
    "litterRange": [
      1,
      5
    ],
    "cSectionRate": "high",
    "gestationNotes": "Chihuahuas have elevated dystocia risk due to their tiny pelvis and relatively large puppy heads.",
    "warnings": [
      "High dystocia risk — ensure a vet experienced with toy breeds is on standby",
      "Eclampsia (low blood calcium) is a serious risk during nursing",
      "Single-puppy litters may produce oversized puppies requiring C-section",
      "Hydrocephalus (\"water on the brain\") is more common in apple-head Chihuahuas"
    ],
    "phase": 1
  },
  {
    "id": "shih-tzu",
    "name": "Shih Tzu",
    "slug": "shih-tzu-pregnancy",
    "size": "small",
    "avgLitterSize": 4,
    "litterRange": [
      2,
      6
    ],
    "cSectionRate": "medium",
    "gestationNotes": "Brachycephalic breed with moderate C-section risk. Smaller Shih Tzus have higher whelping complications.",
    "warnings": [
      "Brachycephalic puppies may have difficulty fitting through the birth canal",
      "Under-5-lb dams have significantly higher C-section rates"
    ],
    "phase": 1
  },
  {
    "id": "husky",
    "name": "Siberian Husky",
    "slug": "husky-pregnancy",
    "size": "medium",
    "avgLitterSize": 5,
    "litterRange": [
      4,
      8
    ],
    "cSectionRate": "low",
    "gestationNotes": "Huskies are generally strong whelpers with robust maternal instincts.",
    "warnings": [],
    "phase": 2
  },
  {
    "id": "pitbull",
    "name": "Pitbull / American Bully",
    "slug": "pitbull-pregnancy",
    "size": "medium",
    "avgLitterSize": 6,
    "litterRange": [
      5,
      10
    ],
    "cSectionRate": "low",
    "gestationNotes": "Pitbulls typically have large, healthy litters and strong natural whelping.",
    "warnings": [
      "Frame all care around maternal welfare and veterinary monitoring"
    ],
    "phase": 2
  },
  {
    "id": "yorkie",
    "name": "Yorkshire Terrier",
    "slug": "yorkie-pregnancy",
    "size": "toy",
    "avgLitterSize": 3,
    "litterRange": [
      1,
      5
    ],
    "cSectionRate": "high",
    "gestationNotes": "Toy breed with elevated dystocia and eclampsia risk.",
    "warnings": [
      "High eclampsia risk during nursing",
      "May need C-section for single-puppy litters"
    ],
    "phase": 2
  },
  {
    "id": "great-dane",
    "name": "Great Dane",
    "slug": "great-dane-pregnancy",
    "size": "giant",
    "avgLitterSize": 9,
    "litterRange": [
      6,
      15
    ],
    "cSectionRate": "low",
    "gestationNotes": "Giant breed with very large litters. Gestation may run slightly past day 63.",
    "warnings": [
      "Very large litters require significant nutritional support",
      "Giant breeds may go 1-2 days past day 63"
    ],
    "phase": 2
  },
  {
    "id": "dachshund",
    "name": "Dachshund",
    "slug": "dachshund-pregnancy",
    "size": "small",
    "avgLitterSize": 5,
    "litterRange": [
      3,
      8
    ],
    "cSectionRate": "medium",
    "gestationNotes": "Elongated body may cause more lumbar stress in late pregnancy.",
    "warnings": [
      "Avoid jumping and stairs in late pregnancy to protect the spine"
    ],
    "phase": 2
  },
  {
    "id": "pomeranian",
    "name": "Pomeranian",
    "slug": "pomeranian-pregnancy",
    "size": "toy",
    "avgLitterSize": 2,
    "litterRange": [
      1,
      4
    ],
    "cSectionRate": "high",
    "gestationNotes": "Very small breed with tiny litters. Eclampsia is a significant risk.",
    "warnings": [
      "Average only 2 puppies per litter",
      "High eclampsia risk",
      "May need C-section"
    ],
    "phase": 2
  },
  {
    "id": "cane-corso",
    "name": "Cane Corso",
    "slug": "cane-corso-pregnancy",
    "size": "giant",
    "avgLitterSize": 7,
    "litterRange": [
      4,
      10
    ],
    "cSectionRate": "low",
    "gestationNotes": "Large breed with typically smooth pregnancies and strong whelping drive.",
    "warnings": [],
    "phase": 2
  },
  {
    "id": "rottweiler",
    "name": "Rottweiler",
    "slug": "rottweiler-pregnancy",
    "size": "large",
    "avgLitterSize": 8,
    "litterRange": [
      5,
      12
    ],
    "cSectionRate": "low",
    "gestationNotes": "Large litters are common. Strong maternal drive.",
    "warnings": [
      "Monitor for secondary uterine inertia during prolonged labor"
    ],
    "phase": 2
  },
  {
    "id": "boxer",
    "name": "Boxer",
    "slug": "boxer-pregnancy",
    "size": "large",
    "avgLitterSize": 6,
    "litterRange": [
      4,
      9
    ],
    "cSectionRate": "medium",
    "gestationNotes": "Brachycephalic influence can occasionally require assistance or C-section.",
    "warnings": [
      "Moderate dystocia rate due to broad puppy heads"
    ],
    "phase": 2
  },
  {
    "id": "beagle",
    "name": "Beagle",
    "slug": "beagle-pregnancy",
    "size": "medium",
    "avgLitterSize": 6,
    "litterRange": [
      3,
      8
    ],
    "cSectionRate": "low",
    "gestationNotes": "Very smooth whelpers with predictable gestation and strong maternal care.",
    "warnings": [],
    "phase": 2
  },
  {
    "id": "doberman",
    "name": "Doberman Pinscher",
    "slug": "doberman-pregnancy",
    "size": "large",
    "avgLitterSize": 8,
    "litterRange": [
      5,
      11
    ],
    "cSectionRate": "low",
    "gestationNotes": "Typically whelp naturally with large litters.",
    "warnings": [
      "Von Willebrand disease testing recommended prior to breeding"
    ],
    "phase": 2
  },
  {
    "id": "pug",
    "name": "Pug",
    "slug": "pug-pregnancy",
    "size": "small",
    "avgLitterSize": 4,
    "litterRange": [
      2,
      6
    ],
    "cSectionRate": "high",
    "gestationNotes": "Brachycephalic head dimensions lead to elevated dystocia.",
    "warnings": [
      "Frequent need for planned veterinary whelping assistance or C-section"
    ],
    "phase": 2
  },
  {
    "id": "american-bulldog",
    "name": "American Bulldog",
    "slug": "american-bulldog-pregnancy",
    "size": "large",
    "avgLitterSize": 8,
    "litterRange": [
      5,
      12
    ],
    "cSectionRate": "medium",
    "gestationNotes": "Bully anatomy may lead to wide shoulder puppy dystocia.",
    "warnings": [
      "Veterinary radiograph at day 50 recommended to assess puppy head/pelvic ratio"
    ],
    "phase": 2
  },
  {
    "id": "goldendoodle",
    "name": "Goldendoodle",
    "slug": "goldendoodle-pregnancy",
    "size": "large",
    "avgLitterSize": 7,
    "litterRange": [
      4,
      10
    ],
    "cSectionRate": "low",
    "gestationNotes": "Hybrid vigor generally produces smooth pregnancies and healthy litters.",
    "warnings": [],
    "phase": 2
  },
  {
    "id": "cavapoo",
    "name": "Cavapoo",
    "slug": "cavapoo-pregnancy",
    "size": "small",
    "avgLitterSize": 4,
    "litterRange": [
      2,
      6
    ],
    "cSectionRate": "medium",
    "gestationNotes": "Small size necessitates careful monitoring for calcium deficiency and dystocia.",
    "warnings": [
      "Ensure dam maintains steady weight gain in trimester 3"
    ],
    "phase": 2
  },
  {
    "id": "border-collie",
    "name": "Border Collie",
    "slug": "border-collie-pregnancy",
    "size": "medium",
    "avgLitterSize": 6,
    "litterRange": [
      4,
      8
    ],
    "cSectionRate": "low",
    "gestationNotes": "Natural whelpers with high stamina and attentive maternal care.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "bernese-mountain-dog",
    "name": "Bernese Mountain Dog",
    "slug": "bernese-mountain-dog-pregnancy",
    "size": "giant",
    "avgLitterSize": 8,
    "litterRange": [
      5,
      12
    ],
    "cSectionRate": "low",
    "gestationNotes": "Substantial litters; require high calorie intake in the final 3 weeks.",
    "warnings": [
      "Provide cool, well-ventilated whelping box environment"
    ],
    "phase": 3
  },
  {
    "id": "mastiff",
    "name": "English Mastiff",
    "slug": "mastiff-pregnancy",
    "size": "giant",
    "avgLitterSize": 8,
    "litterRange": [
      4,
      14
    ],
    "cSectionRate": "high",
    "cSectionPercent": 64.6,
    "gestationNotes": "Evans & Adams 2010 found 64.6% C-section rate due to puppy size and uterine inertia.",
    "warnings": [
      "64.6% C-section rate reported in research",
      "Careful crush prevention required in whelping box"
    ],
    "phase": 3
  },
  {
    "id": "cocker-spaniel",
    "name": "Cocker Spaniel",
    "slug": "cocker-spaniel-pregnancy",
    "size": "medium",
    "avgLitterSize": 5,
    "litterRange": [
      3,
      8
    ],
    "cSectionRate": "low",
    "gestationNotes": "Consistent whelpers with predictable 63-day delivery window.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "miniature-schnauzer",
    "name": "Miniature Schnauzer",
    "slug": "miniature-schnauzer-pregnancy",
    "size": "small",
    "avgLitterSize": 4,
    "litterRange": [
      2,
      6
    ],
    "cSectionRate": "low",
    "gestationNotes": "Usually whelp without difficulty; maintain balanced diet to avoid hyperlipidemia.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "weimaraner",
    "name": "Weimaraner",
    "slug": "weimaraner-pregnancy",
    "size": "large",
    "avgLitterSize": 7,
    "litterRange": [
      5,
      10
    ],
    "cSectionRate": "low",
    "gestationNotes": "Deep-chested athletic dams with typical 63-day gestation.",
    "warnings": [
      "Feed smaller, frequent meals in late pregnancy to prevent abdominal discomfort"
    ],
    "phase": 3
  },
  {
    "id": "australian-shepherd",
    "name": "Australian Shepherd",
    "slug": "australian-shepherd-pregnancy",
    "size": "medium",
    "avgLitterSize": 6,
    "litterRange": [
      4,
      9
    ],
    "cSectionRate": "low",
    "gestationNotes": "Active breed that whelps smoothly; reduce strenuous agility after week 4.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "akita",
    "name": "Akita",
    "slug": "akita-pregnancy",
    "size": "large",
    "avgLitterSize": 7,
    "litterRange": [
      4,
      10
    ],
    "cSectionRate": "low",
    "gestationNotes": "Strong constitution and excellent maternal protective instincts.",
    "warnings": [
      "Keep visitors minimal around whelping box to prevent maternal anxiety"
    ],
    "phase": 3
  },
  {
    "id": "maltese",
    "name": "Maltese",
    "slug": "maltese-pregnancy",
    "size": "toy",
    "avgLitterSize": 3,
    "litterRange": [
      1,
      5
    ],
    "cSectionRate": "medium",
    "gestationNotes": "Delicate toy breed requiring attentive temperature control.",
    "warnings": [
      "Monitor for hypoglycemia and hypocalcemia (eclampsia) post-whelp"
    ],
    "phase": 3
  },
  {
    "id": "havanese",
    "name": "Havanese",
    "slug": "havanese-pregnancy",
    "size": "toy",
    "avgLitterSize": 4,
    "litterRange": [
      2,
      6
    ],
    "cSectionRate": "low",
    "gestationNotes": "Healthy toy breed with relatively smooth natural deliveries.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "poodle",
    "name": "Standard Poodle",
    "slug": "poodle-pregnancy",
    "size": "large",
    "avgLitterSize": 7,
    "litterRange": [
      4,
      10
    ],
    "cSectionRate": "low",
    "gestationNotes": "Predictable and trouble-free whelpers; grooming around perineum recommended prior to due date.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "jack-russell",
    "name": "Jack Russell Terrier",
    "slug": "jack-russell-pregnancy",
    "size": "small",
    "avgLitterSize": 5,
    "litterRange": [
      3,
      7
    ],
    "cSectionRate": "low",
    "gestationNotes": "Tenacious, sturdy breed with strong natural whelping capabilities.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "corgi",
    "name": "Pembroke Welsh Corgi",
    "slug": "corgi-pregnancy",
    "size": "small",
    "avgLitterSize": 6,
    "litterRange": [
      4,
      8
    ],
    "cSectionRate": "medium",
    "gestationNotes": "Achondroplastic anatomy can lead to narrow pelvic inlet; veterinary radiograph advised.",
    "warnings": [
      "Monitor dam walking mechanics in week 8-9 due to short legs and heavy abdomen"
    ],
    "phase": 3
  },
  {
    "id": "cavalier",
    "name": "Cavalier King Charles Spaniel",
    "slug": "cavalier-king-charles-pregnancy",
    "size": "small",
    "avgLitterSize": 5,
    "litterRange": [
      2,
      7
    ],
    "cSectionRate": "medium",
    "gestationNotes": "Gentle nature; ensure cardiac check prior to breeding and monitor during labor.",
    "warnings": [
      "Ensure comfortable, stress-free whelping environment"
    ],
    "phase": 3
  },
  {
    "id": "belgian-malinois",
    "name": "Belgian Malinois",
    "slug": "belgian-malinois-pregnancy",
    "size": "large",
    "avgLitterSize": 7,
    "litterRange": [
      5,
      10
    ],
    "cSectionRate": "low",
    "gestationNotes": "Athletic, resilient breed with straightforward whelping.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "whippet",
    "name": "Whippet",
    "slug": "whippet-pregnancy",
    "size": "medium",
    "avgLitterSize": 5,
    "litterRange": [
      3,
      8
    ],
    "cSectionRate": "low",
    "gestationNotes": "Lean body composition means pregnancy becomes visible earlier (around day 35).",
    "warnings": [
      "Ensure warm whelping box (minimum 80°F for newborn puppies) due to thin coat"
    ],
    "phase": 3
  },
  {
    "id": "affenpinscher",
    "name": "Affenpinscher",
    "slug": "affenpinscher-pregnancy",
    "size": "toy",
    "avgLitterSize": 2,
    "litterRange": [
      1,
      4
    ],
    "cSectionRate": "medium",
    "gestationNotes": "Affenpinscher gestation is typically 63 days. Average litter size is 2 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "brussels-griffon",
    "name": "Brussels Griffon",
    "slug": "brussels-griffon-pregnancy",
    "size": "toy",
    "avgLitterSize": 3,
    "litterRange": [
      1,
      4
    ],
    "cSectionRate": "high",
    "gestationNotes": "Brussels Griffon gestation is typically 63 days. Average litter size is 3 puppies.",
    "warnings": [
      "Elevated dystocia / C-section rate for this breed. Discuss whelping plan with your veterinarian."
    ],
    "phase": 3
  },
  {
    "id": "chinese-crested",
    "name": "Chinese Crested",
    "slug": "chinese-crested-pregnancy",
    "size": "toy",
    "avgLitterSize": 3,
    "litterRange": [
      1,
      5
    ],
    "cSectionRate": "low",
    "gestationNotes": "Chinese Crested gestation is typically 63 days. Average litter size is 3 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "english-toy-spaniel",
    "name": "English Toy Spaniel",
    "slug": "english-toy-spaniel-pregnancy",
    "size": "toy",
    "avgLitterSize": 3,
    "litterRange": [
      1,
      4
    ],
    "cSectionRate": "high",
    "gestationNotes": "English Toy Spaniel gestation is typically 63 days. Average litter size is 3 puppies.",
    "warnings": [
      "Elevated dystocia / C-section rate for this breed. Discuss whelping plan with your veterinarian."
    ],
    "phase": 3
  },
  {
    "id": "italian-greyhound",
    "name": "Italian Greyhound",
    "slug": "italian-greyhound-pregnancy",
    "size": "toy",
    "avgLitterSize": 3,
    "litterRange": [
      1,
      5
    ],
    "cSectionRate": "low",
    "gestationNotes": "Italian Greyhound gestation is typically 63 days. Average litter size is 3 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "japanese-chin",
    "name": "Japanese Chin",
    "slug": "japanese-chin-pregnancy",
    "size": "toy",
    "avgLitterSize": 3,
    "litterRange": [
      1,
      4
    ],
    "cSectionRate": "high",
    "gestationNotes": "Japanese Chin gestation is typically 63 days. Average litter size is 3 puppies.",
    "warnings": [
      "Elevated dystocia / C-section rate for this breed. Discuss whelping plan with your veterinarian."
    ],
    "phase": 3
  },
  {
    "id": "manchester-terrier-toy",
    "name": "Manchester Terrier (Toy)",
    "slug": "manchester-terrier-toy-pregnancy",
    "size": "toy",
    "avgLitterSize": 3,
    "litterRange": [
      1,
      4
    ],
    "cSectionRate": "low",
    "gestationNotes": "Manchester Terrier (Toy) gestation is typically 63 days. Average litter size is 3 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "miniature-pinscher",
    "name": "Miniature Pinscher",
    "slug": "miniature-pinscher-pregnancy",
    "size": "toy",
    "avgLitterSize": 3,
    "litterRange": [
      1,
      5
    ],
    "cSectionRate": "low",
    "gestationNotes": "Miniature Pinscher gestation is typically 63 days. Average litter size is 3 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "papillon",
    "name": "Papillon",
    "slug": "papillon-pregnancy",
    "size": "toy",
    "avgLitterSize": 3,
    "litterRange": [
      1,
      5
    ],
    "cSectionRate": "low",
    "gestationNotes": "Papillon gestation is typically 63 days. Average litter size is 3 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "pekingese",
    "name": "Pekingese",
    "slug": "pekingese-pregnancy",
    "size": "toy",
    "avgLitterSize": 3,
    "litterRange": [
      1,
      5
    ],
    "cSectionRate": "high",
    "cSectionPercent": 40.5,
    "gestationNotes": "Pekingese gestation is typically 63 days. Average litter size is 3 puppies.",
    "warnings": [
      "Elevated dystocia / C-section rate for this breed. Discuss whelping plan with your veterinarian."
    ],
    "phase": 3
  },
  {
    "id": "russian-toy",
    "name": "Russian Toy",
    "slug": "russian-toy-pregnancy",
    "size": "toy",
    "avgLitterSize": 3,
    "litterRange": [
      1,
      4
    ],
    "cSectionRate": "medium",
    "gestationNotes": "Russian Toy gestation is typically 63 days. Average litter size is 3 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "silky-terrier",
    "name": "Silky Terrier",
    "slug": "silky-terrier-pregnancy",
    "size": "toy",
    "avgLitterSize": 3,
    "litterRange": [
      2,
      5
    ],
    "cSectionRate": "low",
    "gestationNotes": "Silky Terrier gestation is typically 63 days. Average litter size is 3 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "toy-fox-terrier",
    "name": "Toy Fox Terrier",
    "slug": "toy-fox-terrier-pregnancy",
    "size": "toy",
    "avgLitterSize": 3,
    "litterRange": [
      1,
      5
    ],
    "cSectionRate": "low",
    "gestationNotes": "Toy Fox Terrier gestation is typically 63 days. Average litter size is 3 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "toy-poodle",
    "name": "Toy Poodle",
    "slug": "toy-poodle-pregnancy",
    "size": "toy",
    "avgLitterSize": 3,
    "litterRange": [
      1,
      4
    ],
    "cSectionRate": "medium",
    "gestationNotes": "Toy Poodle gestation is typically 63 days. Average litter size is 3 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "biewer-terrier",
    "name": "Biewer Terrier",
    "slug": "biewer-terrier-pregnancy",
    "size": "toy",
    "avgLitterSize": 3,
    "litterRange": [
      1,
      4
    ],
    "cSectionRate": "high",
    "gestationNotes": "Biewer Terrier gestation is typically 63 days. Average litter size is 3 puppies.",
    "warnings": [
      "Elevated dystocia / C-section rate for this breed. Discuss whelping plan with your veterinarian."
    ],
    "phase": 3
  },
  {
    "id": "american-eskimo-dog-miniature",
    "name": "American Eskimo Dog (Miniature)",
    "slug": "american-eskimo-dog-miniature-pregnancy",
    "size": "small",
    "avgLitterSize": 4,
    "litterRange": [
      2,
      6
    ],
    "cSectionRate": "low",
    "gestationNotes": "American Eskimo Dog (Miniature) gestation is typically 63 days. Average litter size is 4 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "australian-terrier",
    "name": "Australian Terrier",
    "slug": "australian-terrier-pregnancy",
    "size": "small",
    "avgLitterSize": 4,
    "litterRange": [
      2,
      6
    ],
    "cSectionRate": "low",
    "gestationNotes": "Australian Terrier gestation is typically 63 days. Average litter size is 4 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "basenji",
    "name": "Basenji",
    "slug": "basenji-pregnancy",
    "size": "small",
    "avgLitterSize": 5,
    "litterRange": [
      3,
      7
    ],
    "cSectionRate": "low",
    "gestationNotes": "Basenji gestation is typically 63 days. Average litter size is 5 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "bedlington-terrier",
    "name": "Bedlington Terrier",
    "slug": "bedlington-terrier-pregnancy",
    "size": "small",
    "avgLitterSize": 4,
    "litterRange": [
      2,
      6
    ],
    "cSectionRate": "low",
    "gestationNotes": "Bedlington Terrier gestation is typically 63 days. Average litter size is 4 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "bichon-frise",
    "name": "Bichon Frise",
    "slug": "bichon-frise-pregnancy",
    "size": "small",
    "avgLitterSize": 4,
    "litterRange": [
      2,
      6
    ],
    "cSectionRate": "low",
    "gestationNotes": "Bichon Frise gestation is typically 63 days. Average litter size is 4 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "border-terrier",
    "name": "Border Terrier",
    "slug": "border-terrier-pregnancy",
    "size": "small",
    "avgLitterSize": 4,
    "litterRange": [
      2,
      6
    ],
    "cSectionRate": "low",
    "gestationNotes": "Border Terrier gestation is typically 63 days. Average litter size is 4 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "cairn-terrier",
    "name": "Cairn Terrier",
    "slug": "cairn-terrier-pregnancy",
    "size": "small",
    "avgLitterSize": 4,
    "litterRange": [
      2,
      6
    ],
    "cSectionRate": "low",
    "gestationNotes": "Cairn Terrier gestation is typically 63 days. Average litter size is 4 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "cardigan-welsh-corgi",
    "name": "Cardigan Welsh Corgi",
    "slug": "cardigan-welsh-corgi-pregnancy",
    "size": "small",
    "avgLitterSize": 5,
    "litterRange": [
      3,
      8
    ],
    "cSectionRate": "medium",
    "gestationNotes": "Cardigan Welsh Corgi gestation is typically 63 days. Average litter size is 5 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "cesky-terrier",
    "name": "Cesky Terrier",
    "slug": "cesky-terrier-pregnancy",
    "size": "small",
    "avgLitterSize": 4,
    "litterRange": [
      2,
      6
    ],
    "cSectionRate": "low",
    "gestationNotes": "Cesky Terrier gestation is typically 63 days. Average litter size is 4 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "dandie-dinmont-terrier",
    "name": "Dandie Dinmont Terrier",
    "slug": "dandie-dinmont-terrier-pregnancy",
    "size": "small",
    "avgLitterSize": 4,
    "litterRange": [
      2,
      6
    ],
    "cSectionRate": "high",
    "cSectionPercent": 33.3,
    "gestationNotes": "Dandie Dinmont Terrier gestation is typically 63 days. Average litter size is 4 puppies.",
    "warnings": [
      "Elevated dystocia / C-section rate for this breed. Discuss whelping plan with your veterinarian."
    ],
    "phase": 3
  },
  {
    "id": "fox-terrier-smooth",
    "name": "Fox Terrier (Smooth)",
    "slug": "fox-terrier-smooth-pregnancy",
    "size": "small",
    "avgLitterSize": 4,
    "litterRange": [
      2,
      6
    ],
    "cSectionRate": "low",
    "gestationNotes": "Fox Terrier (Smooth) gestation is typically 63 days. Average litter size is 4 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "fox-terrier-wire",
    "name": "Fox Terrier (Wire)",
    "slug": "fox-terrier-wire-pregnancy",
    "size": "small",
    "avgLitterSize": 4,
    "litterRange": [
      2,
      6
    ],
    "cSectionRate": "low",
    "gestationNotes": "Fox Terrier (Wire) gestation is typically 63 days. Average litter size is 4 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "glen-of-imaal-terrier",
    "name": "Glen of Imaal Terrier",
    "slug": "glen-of-imaal-terrier-pregnancy",
    "size": "small",
    "avgLitterSize": 4,
    "litterRange": [
      2,
      6
    ],
    "cSectionRate": "medium",
    "gestationNotes": "Glen of Imaal Terrier gestation is typically 63 days. Average litter size is 4 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "lakeland-terrier",
    "name": "Lakeland Terrier",
    "slug": "lakeland-terrier-pregnancy",
    "size": "small",
    "avgLitterSize": 4,
    "litterRange": [
      2,
      6
    ],
    "cSectionRate": "low",
    "gestationNotes": "Lakeland Terrier gestation is typically 63 days. Average litter size is 4 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "lhasa-apso",
    "name": "Lhasa Apso",
    "slug": "lhasa-apso-pregnancy",
    "size": "small",
    "avgLitterSize": 4,
    "litterRange": [
      2,
      6
    ],
    "cSectionRate": "medium",
    "gestationNotes": "Lhasa Apso gestation is typically 63 days. Average litter size is 4 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "lowchen",
    "name": "Lowchen",
    "slug": "lowchen-pregnancy",
    "size": "small",
    "avgLitterSize": 4,
    "litterRange": [
      2,
      6
    ],
    "cSectionRate": "low",
    "gestationNotes": "Lowchen gestation is typically 63 days. Average litter size is 4 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "norfolk-terrier",
    "name": "Norfolk Terrier",
    "slug": "norfolk-terrier-pregnancy",
    "size": "small",
    "avgLitterSize": 3,
    "litterRange": [
      1,
      5
    ],
    "cSectionRate": "high",
    "gestationNotes": "Norfolk Terrier gestation is typically 63 days. Average litter size is 3 puppies.",
    "warnings": [
      "Elevated dystocia / C-section rate for this breed. Discuss whelping plan with your veterinarian."
    ],
    "phase": 3
  },
  {
    "id": "norwich-terrier",
    "name": "Norwich Terrier",
    "slug": "norwich-terrier-pregnancy",
    "size": "small",
    "avgLitterSize": 3,
    "litterRange": [
      1,
      5
    ],
    "cSectionRate": "high",
    "gestationNotes": "Norwich Terrier gestation is typically 63 days. Average litter size is 3 puppies.",
    "warnings": [
      "Elevated dystocia / C-section rate for this breed. Discuss whelping plan with your veterinarian."
    ],
    "phase": 3
  },
  {
    "id": "parson-russell-terrier",
    "name": "Parson Russell Terrier",
    "slug": "parson-russell-terrier-pregnancy",
    "size": "small",
    "avgLitterSize": 5,
    "litterRange": [
      3,
      7
    ],
    "cSectionRate": "low",
    "gestationNotes": "Parson Russell Terrier gestation is typically 63 days. Average litter size is 5 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "rat-terrier",
    "name": "Rat Terrier",
    "slug": "rat-terrier-pregnancy",
    "size": "small",
    "avgLitterSize": 4,
    "litterRange": [
      2,
      6
    ],
    "cSectionRate": "low",
    "gestationNotes": "Rat Terrier gestation is typically 63 days. Average litter size is 4 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "schipperke",
    "name": "Schipperke",
    "slug": "schipperke-pregnancy",
    "size": "small",
    "avgLitterSize": 4,
    "litterRange": [
      2,
      6
    ],
    "cSectionRate": "low",
    "gestationNotes": "Schipperke gestation is typically 63 days. Average litter size is 4 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "scottish-terrier",
    "name": "Scottish Terrier",
    "slug": "scottish-terrier-pregnancy",
    "size": "small",
    "avgLitterSize": 4,
    "litterRange": [
      2,
      6
    ],
    "cSectionRate": "high",
    "cSectionPercent": 59.8,
    "gestationNotes": "Scottish Terrier gestation is typically 63 days. Average litter size is 4 puppies.",
    "warnings": [
      "Elevated dystocia / C-section rate for this breed. Discuss whelping plan with your veterinarian."
    ],
    "phase": 3
  },
  {
    "id": "sealyham-terrier",
    "name": "Sealyham Terrier",
    "slug": "sealyham-terrier-pregnancy",
    "size": "small",
    "avgLitterSize": 4,
    "litterRange": [
      2,
      6
    ],
    "cSectionRate": "high",
    "gestationNotes": "Sealyham Terrier gestation is typically 63 days. Average litter size is 4 puppies.",
    "warnings": [
      "Elevated dystocia / C-section rate for this breed. Discuss whelping plan with your veterinarian."
    ],
    "phase": 3
  },
  {
    "id": "shetland-sheepdog",
    "name": "Shetland Sheepdog",
    "slug": "shetland-sheepdog-pregnancy",
    "size": "small",
    "avgLitterSize": 4,
    "litterRange": [
      2,
      7
    ],
    "cSectionRate": "low",
    "gestationNotes": "Shetland Sheepdog gestation is typically 63 days. Average litter size is 4 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "skye-terrier",
    "name": "Skye Terrier",
    "slug": "skye-terrier-pregnancy",
    "size": "small",
    "avgLitterSize": 5,
    "litterRange": [
      3,
      7
    ],
    "cSectionRate": "medium",
    "gestationNotes": "Skye Terrier gestation is typically 63 days. Average litter size is 5 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "staffordshire-bull-terrier",
    "name": "Staffordshire Bull Terrier",
    "slug": "staffordshire-bull-terrier-pregnancy",
    "size": "small",
    "avgLitterSize": 5,
    "litterRange": [
      3,
      8
    ],
    "cSectionRate": "medium",
    "gestationNotes": "Staffordshire Bull Terrier gestation is typically 63 days. Average litter size is 5 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "tibetan-spaniel",
    "name": "Tibetan Spaniel",
    "slug": "tibetan-spaniel-pregnancy",
    "size": "small",
    "avgLitterSize": 4,
    "litterRange": [
      2,
      6
    ],
    "cSectionRate": "medium",
    "gestationNotes": "Tibetan Spaniel gestation is typically 63 days. Average litter size is 4 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "tibetan-terrier",
    "name": "Tibetan Terrier",
    "slug": "tibetan-terrier-pregnancy",
    "size": "small",
    "avgLitterSize": 5,
    "litterRange": [
      3,
      7
    ],
    "cSectionRate": "low",
    "gestationNotes": "Tibetan Terrier gestation is typically 63 days. Average litter size is 5 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "welsh-terrier",
    "name": "Welsh Terrier",
    "slug": "welsh-terrier-pregnancy",
    "size": "small",
    "avgLitterSize": 4,
    "litterRange": [
      2,
      6
    ],
    "cSectionRate": "low",
    "gestationNotes": "Welsh Terrier gestation is typically 63 days. Average litter size is 4 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "west-highland-white-terrier",
    "name": "West Highland White Terrier",
    "slug": "west-highland-white-terrier-pregnancy",
    "size": "small",
    "avgLitterSize": 4,
    "litterRange": [
      2,
      6
    ],
    "cSectionRate": "medium",
    "gestationNotes": "West Highland White Terrier gestation is typically 63 days. Average litter size is 4 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "miniature-bull-terrier",
    "name": "Miniature Bull Terrier",
    "slug": "miniature-bull-terrier-pregnancy",
    "size": "small",
    "avgLitterSize": 4,
    "litterRange": [
      2,
      6
    ],
    "cSectionRate": "high",
    "cSectionPercent": 52.4,
    "gestationNotes": "Miniature Bull Terrier gestation is typically 63 days. Average litter size is 4 puppies.",
    "warnings": [
      "Elevated dystocia / C-section rate for this breed. Discuss whelping plan with your veterinarian."
    ],
    "phase": 3
  },
  {
    "id": "airedale-terrier",
    "name": "Airedale Terrier",
    "slug": "airedale-terrier-pregnancy",
    "size": "medium",
    "avgLitterSize": 7,
    "litterRange": [
      4,
      10
    ],
    "cSectionRate": "low",
    "gestationNotes": "Airedale Terrier gestation is typically 63 days. Average litter size is 7 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "american-hairless-terrier",
    "name": "American Hairless Terrier",
    "slug": "american-hairless-terrier-pregnancy",
    "size": "medium",
    "avgLitterSize": 4,
    "litterRange": [
      2,
      6
    ],
    "cSectionRate": "low",
    "gestationNotes": "American Hairless Terrier gestation is typically 63 days. Average litter size is 4 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "american-leopard-hound",
    "name": "American Leopard Hound",
    "slug": "american-leopard-hound-pregnancy",
    "size": "medium",
    "avgLitterSize": 6,
    "litterRange": [
      4,
      9
    ],
    "cSectionRate": "low",
    "gestationNotes": "American Leopard Hound gestation is typically 63 days. Average litter size is 6 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "american-staffordshire-terrier",
    "name": "American Staffordshire Terrier",
    "slug": "american-staffordshire-terrier-pregnancy",
    "size": "medium",
    "avgLitterSize": 6,
    "litterRange": [
      4,
      9
    ],
    "cSectionRate": "low",
    "gestationNotes": "American Staffordshire Terrier gestation is typically 63 days. Average litter size is 6 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "american-water-spaniel",
    "name": "American Water Spaniel",
    "slug": "american-water-spaniel-pregnancy",
    "size": "medium",
    "avgLitterSize": 5,
    "litterRange": [
      3,
      7
    ],
    "cSectionRate": "low",
    "gestationNotes": "American Water Spaniel gestation is typically 63 days. Average litter size is 5 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "appenzeller-sennenhund",
    "name": "Appenzeller Sennenhund",
    "slug": "appenzeller-sennenhund-pregnancy",
    "size": "medium",
    "avgLitterSize": 6,
    "litterRange": [
      4,
      8
    ],
    "cSectionRate": "low",
    "gestationNotes": "Appenzeller Sennenhund gestation is typically 63 days. Average litter size is 6 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "australian-cattle-dog",
    "name": "Australian Cattle Dog",
    "slug": "australian-cattle-dog-pregnancy",
    "size": "medium",
    "avgLitterSize": 5,
    "litterRange": [
      3,
      8
    ],
    "cSectionRate": "low",
    "gestationNotes": "Australian Cattle Dog gestation is typically 63 days. Average litter size is 5 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "barbet",
    "name": "Barbet",
    "slug": "barbet-pregnancy",
    "size": "medium",
    "avgLitterSize": 6,
    "litterRange": [
      4,
      8
    ],
    "cSectionRate": "low",
    "gestationNotes": "Barbet gestation is typically 63 days. Average litter size is 6 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "basset-fauve-de-bretagne",
    "name": "Basset Fauve de Bretagne",
    "slug": "basset-fauve-de-bretagne-pregnancy",
    "size": "medium",
    "avgLitterSize": 5,
    "litterRange": [
      3,
      7
    ],
    "cSectionRate": "low",
    "gestationNotes": "Basset Fauve de Bretagne gestation is typically 63 days. Average litter size is 5 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "basset-hound",
    "name": "Basset Hound",
    "slug": "basset-hound-pregnancy",
    "size": "medium",
    "avgLitterSize": 6,
    "litterRange": [
      4,
      9
    ],
    "cSectionRate": "medium",
    "gestationNotes": "Basset Hound gestation is typically 63 days. Average litter size is 6 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "boykin-spaniel",
    "name": "Boykin Spaniel",
    "slug": "boykin-spaniel-pregnancy",
    "size": "medium",
    "avgLitterSize": 5,
    "litterRange": [
      3,
      7
    ],
    "cSectionRate": "low",
    "gestationNotes": "Boykin Spaniel gestation is typically 63 days. Average litter size is 5 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "brittany",
    "name": "Brittany",
    "slug": "brittany-pregnancy",
    "size": "medium",
    "avgLitterSize": 6,
    "litterRange": [
      4,
      9
    ],
    "cSectionRate": "low",
    "gestationNotes": "Brittany gestation is typically 63 days. Average litter size is 6 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "bull-terrier-standard",
    "name": "Bull Terrier (Standard)",
    "slug": "bull-terrier-standard-pregnancy",
    "size": "medium",
    "avgLitterSize": 5,
    "litterRange": [
      3,
      8
    ],
    "cSectionRate": "medium",
    "gestationNotes": "Bull Terrier (Standard) gestation is typically 63 days. Average litter size is 5 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "canaan-dog",
    "name": "Canaan Dog",
    "slug": "canaan-dog-pregnancy",
    "size": "medium",
    "avgLitterSize": 5,
    "litterRange": [
      3,
      7
    ],
    "cSectionRate": "low",
    "gestationNotes": "Canaan Dog gestation is typically 63 days. Average litter size is 5 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "carolina-dog",
    "name": "Carolina Dog",
    "slug": "carolina-dog-pregnancy",
    "size": "medium",
    "avgLitterSize": 5,
    "litterRange": [
      3,
      8
    ],
    "cSectionRate": "low",
    "gestationNotes": "Carolina Dog gestation is typically 63 days. Average litter size is 5 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "chow-chow",
    "name": "Chow Chow",
    "slug": "chow-chow-pregnancy",
    "size": "medium",
    "avgLitterSize": 5,
    "litterRange": [
      3,
      7
    ],
    "cSectionRate": "medium",
    "gestationNotes": "Chow Chow gestation is typically 63 days. Average litter size is 5 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "clumber-spaniel",
    "name": "Clumber Spaniel",
    "slug": "clumber-spaniel-pregnancy",
    "size": "medium",
    "avgLitterSize": 5,
    "litterRange": [
      3,
      8
    ],
    "cSectionRate": "high",
    "cSectionPercent": 43.8,
    "gestationNotes": "Clumber Spaniel gestation is typically 63 days. Average litter size is 5 puppies.",
    "warnings": [
      "Elevated dystocia / C-section rate for this breed. Discuss whelping plan with your veterinarian."
    ],
    "phase": 3
  },
  {
    "id": "english-springer-spaniel",
    "name": "English Springer Spaniel",
    "slug": "english-springer-spaniel-pregnancy",
    "size": "medium",
    "avgLitterSize": 6,
    "litterRange": [
      4,
      9
    ],
    "cSectionRate": "low",
    "gestationNotes": "English Springer Spaniel gestation is typically 63 days. Average litter size is 6 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "entlebucher-mountain-dog",
    "name": "Entlebucher Mountain Dog",
    "slug": "entlebucher-mountain-dog-pregnancy",
    "size": "medium",
    "avgLitterSize": 6,
    "litterRange": [
      4,
      8
    ],
    "cSectionRate": "low",
    "gestationNotes": "Entlebucher Mountain Dog gestation is typically 63 days. Average litter size is 6 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "field-spaniel",
    "name": "Field Spaniel",
    "slug": "field-spaniel-pregnancy",
    "size": "medium",
    "avgLitterSize": 5,
    "litterRange": [
      3,
      7
    ],
    "cSectionRate": "low",
    "gestationNotes": "Field Spaniel gestation is typically 63 days. Average litter size is 5 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "finnish-lapphund",
    "name": "Finnish Lapphund",
    "slug": "finnish-lapphund-pregnancy",
    "size": "medium",
    "avgLitterSize": 5,
    "litterRange": [
      3,
      7
    ],
    "cSectionRate": "low",
    "gestationNotes": "Finnish Lapphund gestation is typically 63 days. Average litter size is 5 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "finnish-spitz",
    "name": "Finnish Spitz",
    "slug": "finnish-spitz-pregnancy",
    "size": "medium",
    "avgLitterSize": 4,
    "litterRange": [
      2,
      6
    ],
    "cSectionRate": "low",
    "gestationNotes": "Finnish Spitz gestation is typically 63 days. Average litter size is 4 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "german-pinscher",
    "name": "German Pinscher",
    "slug": "german-pinscher-pregnancy",
    "size": "medium",
    "avgLitterSize": 6,
    "litterRange": [
      4,
      8
    ],
    "cSectionRate": "low",
    "gestationNotes": "German Pinscher gestation is typically 63 days. Average litter size is 6 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "harrier",
    "name": "Harrier",
    "slug": "harrier-pregnancy",
    "size": "medium",
    "avgLitterSize": 6,
    "litterRange": [
      4,
      8
    ],
    "cSectionRate": "low",
    "gestationNotes": "Harrier gestation is typically 63 days. Average litter size is 6 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "irish-terrier",
    "name": "Irish Terrier",
    "slug": "irish-terrier-pregnancy",
    "size": "medium",
    "avgLitterSize": 5,
    "litterRange": [
      3,
      7
    ],
    "cSectionRate": "low",
    "gestationNotes": "Irish Terrier gestation is typically 63 days. Average litter size is 5 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "irish-water-spaniel",
    "name": "Irish Water Spaniel",
    "slug": "irish-water-spaniel-pregnancy",
    "size": "medium",
    "avgLitterSize": 6,
    "litterRange": [
      4,
      9
    ],
    "cSectionRate": "low",
    "gestationNotes": "Irish Water Spaniel gestation is typically 63 days. Average litter size is 6 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "keeshond",
    "name": "Keeshond",
    "slug": "keeshond-pregnancy",
    "size": "medium",
    "avgLitterSize": 5,
    "litterRange": [
      3,
      7
    ],
    "cSectionRate": "low",
    "gestationNotes": "Keeshond gestation is typically 63 days. Average litter size is 5 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "kerry-blue-terrier",
    "name": "Kerry Blue Terrier",
    "slug": "kerry-blue-terrier-pregnancy",
    "size": "medium",
    "avgLitterSize": 5,
    "litterRange": [
      3,
      7
    ],
    "cSectionRate": "low",
    "gestationNotes": "Kerry Blue Terrier gestation is typically 63 days. Average litter size is 5 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "kooikerhondje",
    "name": "Kooikerhondje",
    "slug": "kooikerhondje-pregnancy",
    "size": "medium",
    "avgLitterSize": 5,
    "litterRange": [
      3,
      7
    ],
    "cSectionRate": "low",
    "gestationNotes": "Kooikerhondje gestation is typically 63 days. Average litter size is 5 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "lagotto-romagnolo",
    "name": "Lagotto Romagnolo",
    "slug": "lagotto-romagnolo-pregnancy",
    "size": "medium",
    "avgLitterSize": 5,
    "litterRange": [
      3,
      7
    ],
    "cSectionRate": "low",
    "gestationNotes": "Lagotto Romagnolo gestation is typically 63 days. Average litter size is 5 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "nova-scotia-duck-tolling-retriever",
    "name": "Nova Scotia Duck Tolling Retriever",
    "slug": "nova-scotia-duck-tolling-retriever-pregnancy",
    "size": "medium",
    "avgLitterSize": 6,
    "litterRange": [
      4,
      8
    ],
    "cSectionRate": "low",
    "gestationNotes": "Nova Scotia Duck Tolling Retriever gestation is typically 63 days. Average litter size is 6 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "norwegian-buhund",
    "name": "Norwegian Buhund",
    "slug": "norwegian-buhund-pregnancy",
    "size": "medium",
    "avgLitterSize": 5,
    "litterRange": [
      3,
      7
    ],
    "cSectionRate": "low",
    "gestationNotes": "Norwegian Buhund gestation is typically 63 days. Average litter size is 5 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "norwegian-elkhound",
    "name": "Norwegian Elkhound",
    "slug": "norwegian-elkhound-pregnancy",
    "size": "medium",
    "avgLitterSize": 5,
    "litterRange": [
      3,
      7
    ],
    "cSectionRate": "low",
    "gestationNotes": "Norwegian Elkhound gestation is typically 63 days. Average litter size is 5 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "pembroke-welsh-corgi-working",
    "name": "Pembroke Welsh Corgi (Working)",
    "slug": "pembroke-welsh-corgi-working-pregnancy",
    "size": "medium",
    "avgLitterSize": 6,
    "litterRange": [
      3,
      8
    ],
    "cSectionRate": "medium",
    "gestationNotes": "Pembroke Welsh Corgi (Working) gestation is typically 63 days. Average litter size is 6 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "pharaoh-hound",
    "name": "Pharaoh Hound",
    "slug": "pharaoh-hound-pregnancy",
    "size": "medium",
    "avgLitterSize": 6,
    "litterRange": [
      4,
      9
    ],
    "cSectionRate": "low",
    "gestationNotes": "Pharaoh Hound gestation is typically 63 days. Average litter size is 6 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "polish-lowland-sheepdog",
    "name": "Polish Lowland Sheepdog",
    "slug": "polish-lowland-sheepdog-pregnancy",
    "size": "medium",
    "avgLitterSize": 5,
    "litterRange": [
      3,
      7
    ],
    "cSectionRate": "low",
    "gestationNotes": "Polish Lowland Sheepdog gestation is typically 63 days. Average litter size is 5 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "portuguese-podengo",
    "name": "Portuguese Podengo",
    "slug": "portuguese-podengo-pregnancy",
    "size": "medium",
    "avgLitterSize": 5,
    "litterRange": [
      3,
      7
    ],
    "cSectionRate": "low",
    "gestationNotes": "Portuguese Podengo gestation is typically 63 days. Average litter size is 5 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "portuguese-water-dog",
    "name": "Portuguese Water Dog",
    "slug": "portuguese-water-dog-pregnancy",
    "size": "medium",
    "avgLitterSize": 6,
    "litterRange": [
      4,
      9
    ],
    "cSectionRate": "low",
    "gestationNotes": "Portuguese Water Dog gestation is typically 63 days. Average litter size is 6 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "pumi",
    "name": "Pumi",
    "slug": "pumi-pregnancy",
    "size": "medium",
    "avgLitterSize": 5,
    "litterRange": [
      3,
      7
    ],
    "cSectionRate": "low",
    "gestationNotes": "Pumi gestation is typically 63 days. Average litter size is 5 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "pyrenean-shepherd",
    "name": "Pyrenean Shepherd",
    "slug": "pyrenean-shepherd-pregnancy",
    "size": "medium",
    "avgLitterSize": 5,
    "litterRange": [
      3,
      7
    ],
    "cSectionRate": "low",
    "gestationNotes": "Pyrenean Shepherd gestation is typically 63 days. Average litter size is 5 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "saluki",
    "name": "Saluki",
    "slug": "saluki-pregnancy",
    "size": "medium",
    "avgLitterSize": 6,
    "litterRange": [
      4,
      9
    ],
    "cSectionRate": "low",
    "gestationNotes": "Saluki gestation is typically 63 days. Average litter size is 6 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "samoyed",
    "name": "Samoyed",
    "slug": "samoyed-pregnancy",
    "size": "medium",
    "avgLitterSize": 6,
    "litterRange": [
      4,
      9
    ],
    "cSectionRate": "low",
    "gestationNotes": "Samoyed gestation is typically 63 days. Average litter size is 6 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "shar-pei",
    "name": "Shar-Pei",
    "slug": "shar-pei-pregnancy",
    "size": "medium",
    "avgLitterSize": 5,
    "litterRange": [
      3,
      7
    ],
    "cSectionRate": "medium",
    "gestationNotes": "Shar-Pei gestation is typically 63 days. Average litter size is 5 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "soft-coated-wheaten-terrier",
    "name": "Soft Coated Wheaten Terrier",
    "slug": "soft-coated-wheaten-terrier-pregnancy",
    "size": "medium",
    "avgLitterSize": 5,
    "litterRange": [
      3,
      8
    ],
    "cSectionRate": "low",
    "gestationNotes": "Soft Coated Wheaten Terrier gestation is typically 63 days. Average litter size is 5 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "spanish-water-dog",
    "name": "Spanish Water Dog",
    "slug": "spanish-water-dog-pregnancy",
    "size": "medium",
    "avgLitterSize": 6,
    "litterRange": [
      4,
      8
    ],
    "cSectionRate": "low",
    "gestationNotes": "Spanish Water Dog gestation is typically 63 days. Average litter size is 6 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "standard-schnauzer",
    "name": "Standard Schnauzer",
    "slug": "standard-schnauzer-pregnancy",
    "size": "medium",
    "avgLitterSize": 6,
    "litterRange": [
      4,
      8
    ],
    "cSectionRate": "low",
    "gestationNotes": "Standard Schnauzer gestation is typically 63 days. Average litter size is 6 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "sussex-spaniel",
    "name": "Sussex Spaniel",
    "slug": "sussex-spaniel-pregnancy",
    "size": "medium",
    "avgLitterSize": 4,
    "litterRange": [
      2,
      6
    ],
    "cSectionRate": "high",
    "gestationNotes": "Sussex Spaniel gestation is typically 63 days. Average litter size is 4 puppies.",
    "warnings": [
      "Elevated dystocia / C-section rate for this breed. Discuss whelping plan with your veterinarian."
    ],
    "phase": 3
  },
  {
    "id": "swedish-vallhund",
    "name": "Swedish Vallhund",
    "slug": "swedish-vallhund-pregnancy",
    "size": "medium",
    "avgLitterSize": 5,
    "litterRange": [
      3,
      7
    ],
    "cSectionRate": "low",
    "gestationNotes": "Swedish Vallhund gestation is typically 63 days. Average litter size is 5 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "treeing-walker-coonhound",
    "name": "Treeing Walker Coonhound",
    "slug": "treeing-walker-coonhound-pregnancy",
    "size": "medium",
    "avgLitterSize": 7,
    "litterRange": [
      5,
      10
    ],
    "cSectionRate": "low",
    "gestationNotes": "Treeing Walker Coonhound gestation is typically 63 days. Average litter size is 7 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "welsh-springer-spaniel",
    "name": "Welsh Springer Spaniel",
    "slug": "welsh-springer-spaniel-pregnancy",
    "size": "medium",
    "avgLitterSize": 6,
    "litterRange": [
      4,
      8
    ],
    "cSectionRate": "low",
    "gestationNotes": "Welsh Springer Spaniel gestation is typically 63 days. Average litter size is 6 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "afghan-hound",
    "name": "Afghan Hound",
    "slug": "afghan-hound-pregnancy",
    "size": "large",
    "avgLitterSize": 7,
    "litterRange": [
      5,
      10
    ],
    "cSectionRate": "low",
    "gestationNotes": "Afghan Hound gestation is typically 63 days. Average litter size is 7 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "alaskan-malamute",
    "name": "Alaskan Malamute",
    "slug": "alaskan-malamute-pregnancy",
    "size": "large",
    "avgLitterSize": 6,
    "litterRange": [
      4,
      9
    ],
    "cSectionRate": "low",
    "gestationNotes": "Alaskan Malamute gestation is typically 63 days. Average litter size is 6 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "american-foxhound",
    "name": "American Foxhound",
    "slug": "american-foxhound-pregnancy",
    "size": "large",
    "avgLitterSize": 7,
    "litterRange": [
      5,
      10
    ],
    "cSectionRate": "low",
    "gestationNotes": "American Foxhound gestation is typically 63 days. Average litter size is 7 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "beauceron",
    "name": "Beauceron",
    "slug": "beauceron-pregnancy",
    "size": "large",
    "avgLitterSize": 7,
    "litterRange": [
      5,
      10
    ],
    "cSectionRate": "low",
    "gestationNotes": "Beauceron gestation is typically 63 days. Average litter size is 7 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "belgian-laekenois",
    "name": "Belgian Laekenois",
    "slug": "belgian-laekenois-pregnancy",
    "size": "large",
    "avgLitterSize": 6,
    "litterRange": [
      4,
      9
    ],
    "cSectionRate": "low",
    "gestationNotes": "Belgian Laekenois gestation is typically 63 days. Average litter size is 6 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "belgian-sheepdog",
    "name": "Belgian Sheepdog",
    "slug": "belgian-sheepdog-pregnancy",
    "size": "large",
    "avgLitterSize": 6,
    "litterRange": [
      4,
      9
    ],
    "cSectionRate": "low",
    "gestationNotes": "Belgian Sheepdog gestation is typically 63 days. Average litter size is 6 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "belgian-tervuren",
    "name": "Belgian Tervuren",
    "slug": "belgian-tervuren-pregnancy",
    "size": "large",
    "avgLitterSize": 6,
    "litterRange": [
      4,
      9
    ],
    "cSectionRate": "low",
    "gestationNotes": "Belgian Tervuren gestation is typically 63 days. Average litter size is 6 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "black-and-tan-coonhound",
    "name": "Black and Tan Coonhound",
    "slug": "black-and-tan-coonhound-pregnancy",
    "size": "large",
    "avgLitterSize": 7,
    "litterRange": [
      5,
      10
    ],
    "cSectionRate": "low",
    "gestationNotes": "Black and Tan Coonhound gestation is typically 63 days. Average litter size is 7 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "bloodhound",
    "name": "Bloodhound",
    "slug": "bloodhound-pregnancy",
    "size": "large",
    "avgLitterSize": 8,
    "litterRange": [
      5,
      12
    ],
    "cSectionRate": "low",
    "gestationNotes": "Bloodhound gestation is typically 63 days. Average litter size is 8 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "bluetick-coonhound",
    "name": "Bluetick Coonhound",
    "slug": "bluetick-coonhound-pregnancy",
    "size": "large",
    "avgLitterSize": 7,
    "litterRange": [
      4,
      10
    ],
    "cSectionRate": "low",
    "gestationNotes": "Bluetick Coonhound gestation is typically 63 days. Average litter size is 7 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "borzoi",
    "name": "Borzoi",
    "slug": "borzoi-pregnancy",
    "size": "large",
    "avgLitterSize": 7,
    "litterRange": [
      4,
      10
    ],
    "cSectionRate": "low",
    "gestationNotes": "Borzoi gestation is typically 63 days. Average litter size is 7 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "briard",
    "name": "Briard",
    "slug": "briard-pregnancy",
    "size": "large",
    "avgLitterSize": 7,
    "litterRange": [
      5,
      10
    ],
    "cSectionRate": "low",
    "gestationNotes": "Briard gestation is typically 63 days. Average litter size is 7 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "bullmastiff",
    "name": "Bullmastiff",
    "slug": "bullmastiff-pregnancy",
    "size": "large",
    "avgLitterSize": 7,
    "litterRange": [
      4,
      10
    ],
    "cSectionRate": "medium",
    "gestationNotes": "Bullmastiff gestation is typically 63 days. Average litter size is 7 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "chesapeake-bay-retriever",
    "name": "Chesapeake Bay Retriever",
    "slug": "chesapeake-bay-retriever-pregnancy",
    "size": "large",
    "avgLitterSize": 7,
    "litterRange": [
      5,
      10
    ],
    "cSectionRate": "low",
    "gestationNotes": "Chesapeake Bay Retriever gestation is typically 63 days. Average litter size is 7 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "chinook",
    "name": "Chinook",
    "slug": "chinook-pregnancy",
    "size": "large",
    "avgLitterSize": 6,
    "litterRange": [
      4,
      9
    ],
    "cSectionRate": "low",
    "gestationNotes": "Chinook gestation is typically 63 days. Average litter size is 6 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "collie-rough-smooth",
    "name": "Collie (Rough & Smooth)",
    "slug": "collie-rough-smooth-pregnancy",
    "size": "large",
    "avgLitterSize": 6,
    "litterRange": [
      4,
      9
    ],
    "cSectionRate": "low",
    "gestationNotes": "Collie (Rough & Smooth) gestation is typically 63 days. Average litter size is 6 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "curly-coated-retriever",
    "name": "Curly-Coated Retriever",
    "slug": "curly-coated-retriever-pregnancy",
    "size": "large",
    "avgLitterSize": 7,
    "litterRange": [
      5,
      10
    ],
    "cSectionRate": "low",
    "gestationNotes": "Curly-Coated Retriever gestation is typically 63 days. Average litter size is 7 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "dalmatian",
    "name": "Dalmatian",
    "slug": "dalmatian-pregnancy",
    "size": "large",
    "avgLitterSize": 7,
    "litterRange": [
      5,
      10
    ],
    "cSectionRate": "low",
    "gestationNotes": "Dalmatian gestation is typically 63 days. Average litter size is 7 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "english-foxhound",
    "name": "English Foxhound",
    "slug": "english-foxhound-pregnancy",
    "size": "large",
    "avgLitterSize": 7,
    "litterRange": [
      5,
      10
    ],
    "cSectionRate": "low",
    "gestationNotes": "English Foxhound gestation is typically 63 days. Average litter size is 7 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "english-pointer",
    "name": "English Pointer",
    "slug": "english-pointer-pregnancy",
    "size": "large",
    "avgLitterSize": 7,
    "litterRange": [
      5,
      10
    ],
    "cSectionRate": "low",
    "gestationNotes": "English Pointer gestation is typically 63 days. Average litter size is 7 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "english-setter",
    "name": "English Setter",
    "slug": "english-setter-pregnancy",
    "size": "large",
    "avgLitterSize": 7,
    "litterRange": [
      4,
      10
    ],
    "cSectionRate": "low",
    "gestationNotes": "English Setter gestation is typically 63 days. Average litter size is 7 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "flat-coated-retriever",
    "name": "Flat-Coated Retriever",
    "slug": "flat-coated-retriever-pregnancy",
    "size": "large",
    "avgLitterSize": 7,
    "litterRange": [
      5,
      10
    ],
    "cSectionRate": "low",
    "gestationNotes": "Flat-Coated Retriever gestation is typically 63 days. Average litter size is 7 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "german-shorthaired-pointer",
    "name": "German Shorthaired Pointer",
    "slug": "german-shorthaired-pointer-pregnancy",
    "size": "large",
    "avgLitterSize": 8,
    "litterRange": [
      5,
      11
    ],
    "cSectionRate": "low",
    "gestationNotes": "German Shorthaired Pointer gestation is typically 63 days. Average litter size is 8 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "german-wirehaired-pointer",
    "name": "German Wirehaired Pointer",
    "slug": "german-wirehaired-pointer-pregnancy",
    "size": "large",
    "avgLitterSize": 7,
    "litterRange": [
      5,
      10
    ],
    "cSectionRate": "medium",
    "cSectionPercent": 47.8,
    "gestationNotes": "German Wirehaired Pointer gestation is typically 63 days. Average litter size is 7 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "giant-schnauzer",
    "name": "Giant Schnauzer",
    "slug": "giant-schnauzer-pregnancy",
    "size": "large",
    "avgLitterSize": 7,
    "litterRange": [
      5,
      10
    ],
    "cSectionRate": "low",
    "gestationNotes": "Giant Schnauzer gestation is typically 63 days. Average litter size is 7 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "gordon-setter",
    "name": "Gordon Setter",
    "slug": "gordon-setter-pregnancy",
    "size": "large",
    "avgLitterSize": 7,
    "litterRange": [
      5,
      10
    ],
    "cSectionRate": "low",
    "gestationNotes": "Gordon Setter gestation is typically 63 days. Average litter size is 7 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "greyhound",
    "name": "Greyhound",
    "slug": "greyhound-pregnancy",
    "size": "large",
    "avgLitterSize": 7,
    "litterRange": [
      4,
      10
    ],
    "cSectionRate": "low",
    "gestationNotes": "Greyhound gestation is typically 63 days. Average litter size is 7 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "irish-red-and-white-setter",
    "name": "Irish Red and White Setter",
    "slug": "irish-red-and-white-setter-pregnancy",
    "size": "large",
    "avgLitterSize": 7,
    "litterRange": [
      5,
      10
    ],
    "cSectionRate": "low",
    "gestationNotes": "Irish Red and White Setter gestation is typically 63 days. Average litter size is 7 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "irish-setter",
    "name": "Irish Setter",
    "slug": "irish-setter-pregnancy",
    "size": "large",
    "avgLitterSize": 8,
    "litterRange": [
      5,
      11
    ],
    "cSectionRate": "low",
    "gestationNotes": "Irish Setter gestation is typically 63 days. Average litter size is 8 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "komondor",
    "name": "Komondor",
    "slug": "komondor-pregnancy",
    "size": "large",
    "avgLitterSize": 7,
    "litterRange": [
      5,
      10
    ],
    "cSectionRate": "low",
    "gestationNotes": "Komondor gestation is typically 63 days. Average litter size is 7 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "kuvasz",
    "name": "Kuvasz",
    "slug": "kuvasz-pregnancy",
    "size": "large",
    "avgLitterSize": 7,
    "litterRange": [
      5,
      10
    ],
    "cSectionRate": "low",
    "gestationNotes": "Kuvasz gestation is typically 63 days. Average litter size is 7 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "old-english-sheepdog",
    "name": "Old English Sheepdog",
    "slug": "old-english-sheepdog-pregnancy",
    "size": "large",
    "avgLitterSize": 7,
    "litterRange": [
      5,
      10
    ],
    "cSectionRate": "low",
    "gestationNotes": "Old English Sheepdog gestation is typically 63 days. Average litter size is 7 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "otterhound",
    "name": "Otterhound",
    "slug": "otterhound-pregnancy",
    "size": "large",
    "avgLitterSize": 7,
    "litterRange": [
      4,
      10
    ],
    "cSectionRate": "low",
    "gestationNotes": "Otterhound gestation is typically 63 days. Average litter size is 7 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "plott-hound",
    "name": "Plott Hound",
    "slug": "plott-hound-pregnancy",
    "size": "large",
    "avgLitterSize": 7,
    "litterRange": [
      5,
      10
    ],
    "cSectionRate": "low",
    "gestationNotes": "Plott Hound gestation is typically 63 days. Average litter size is 7 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "pointer",
    "name": "Pointer",
    "slug": "pointer-pregnancy",
    "size": "large",
    "avgLitterSize": 7,
    "litterRange": [
      5,
      10
    ],
    "cSectionRate": "low",
    "gestationNotes": "Pointer gestation is typically 63 days. Average litter size is 7 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "redbone-coonhound",
    "name": "Redbone Coonhound",
    "slug": "redbone-coonhound-pregnancy",
    "size": "large",
    "avgLitterSize": 7,
    "litterRange": [
      5,
      10
    ],
    "cSectionRate": "low",
    "gestationNotes": "Redbone Coonhound gestation is typically 63 days. Average litter size is 7 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "rhodesian-ridgeback",
    "name": "Rhodesian Ridgeback",
    "slug": "rhodesian-ridgeback-pregnancy",
    "size": "large",
    "avgLitterSize": 8,
    "litterRange": [
      5,
      12
    ],
    "cSectionRate": "low",
    "gestationNotes": "Rhodesian Ridgeback gestation is typically 63 days. Average litter size is 8 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "spinone-italiano",
    "name": "Spinone Italiano",
    "slug": "spinone-italiano-pregnancy",
    "size": "large",
    "avgLitterSize": 7,
    "litterRange": [
      5,
      10
    ],
    "cSectionRate": "low",
    "gestationNotes": "Spinone Italiano gestation is typically 63 days. Average litter size is 7 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "tibetan-mastiff",
    "name": "Tibetan Mastiff",
    "slug": "tibetan-mastiff-pregnancy",
    "size": "large",
    "avgLitterSize": 7,
    "litterRange": [
      4,
      11
    ],
    "cSectionRate": "medium",
    "gestationNotes": "Tibetan Mastiff gestation is typically 63 days. Average litter size is 7 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "vizsla",
    "name": "Vizsla",
    "slug": "vizsla-pregnancy",
    "size": "large",
    "avgLitterSize": 6,
    "litterRange": [
      4,
      9
    ],
    "cSectionRate": "low",
    "gestationNotes": "Vizsla gestation is typically 63 days. Average litter size is 6 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "wirehaired-pointing-griffon",
    "name": "Wirehaired Pointing Griffon",
    "slug": "wirehaired-pointing-griffon-pregnancy",
    "size": "large",
    "avgLitterSize": 6,
    "litterRange": [
      4,
      9
    ],
    "cSectionRate": "low",
    "gestationNotes": "Wirehaired Pointing Griffon gestation is typically 63 days. Average litter size is 6 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "anatolian-shepherd",
    "name": "Anatolian Shepherd",
    "slug": "anatolian-shepherd-pregnancy",
    "size": "giant",
    "avgLitterSize": 8,
    "litterRange": [
      5,
      12
    ],
    "cSectionRate": "low",
    "gestationNotes": "Anatolian Shepherd gestation is typically 63 days. Average litter size is 8 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "black-russian-terrier",
    "name": "Black Russian Terrier",
    "slug": "black-russian-terrier-pregnancy",
    "size": "giant",
    "avgLitterSize": 8,
    "litterRange": [
      5,
      12
    ],
    "cSectionRate": "low",
    "gestationNotes": "Black Russian Terrier gestation is typically 63 days. Average litter size is 8 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "boerboel",
    "name": "Boerboel",
    "slug": "boerboel-pregnancy",
    "size": "giant",
    "avgLitterSize": 8,
    "litterRange": [
      5,
      12
    ],
    "cSectionRate": "low",
    "gestationNotes": "Boerboel gestation is typically 63 days. Average litter size is 8 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "central-asian-shepherd-dog",
    "name": "Central Asian Shepherd Dog",
    "slug": "central-asian-shepherd-dog-pregnancy",
    "size": "giant",
    "avgLitterSize": 8,
    "litterRange": [
      5,
      12
    ],
    "cSectionRate": "low",
    "gestationNotes": "Central Asian Shepherd Dog gestation is typically 63 days. Average litter size is 8 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "dogue-de-bordeaux",
    "name": "Dogue de Bordeaux",
    "slug": "dogue-de-bordeaux-pregnancy",
    "size": "giant",
    "avgLitterSize": 7,
    "litterRange": [
      4,
      11
    ],
    "cSectionRate": "high",
    "gestationNotes": "Dogue de Bordeaux gestation is typically 63 days. Average litter size is 7 puppies.",
    "warnings": [
      "Elevated dystocia / C-section rate for this breed. Discuss whelping plan with your veterinarian."
    ],
    "phase": 3
  },
  {
    "id": "great-pyrenees",
    "name": "Great Pyrenees",
    "slug": "great-pyrenees-pregnancy",
    "size": "giant",
    "avgLitterSize": 8,
    "litterRange": [
      5,
      12
    ],
    "cSectionRate": "low",
    "gestationNotes": "Great Pyrenees gestation is typically 63 days. Average litter size is 8 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "greater-swiss-mountain-dog",
    "name": "Greater Swiss Mountain Dog",
    "slug": "greater-swiss-mountain-dog-pregnancy",
    "size": "giant",
    "avgLitterSize": 8,
    "litterRange": [
      5,
      12
    ],
    "cSectionRate": "low",
    "gestationNotes": "Greater Swiss Mountain Dog gestation is typically 63 days. Average litter size is 8 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "irish-wolfhound",
    "name": "Irish Wolfhound",
    "slug": "irish-wolfhound-pregnancy",
    "size": "giant",
    "avgLitterSize": 7,
    "litterRange": [
      4,
      11
    ],
    "cSectionRate": "low",
    "gestationNotes": "Irish Wolfhound gestation is typically 63 days. Average litter size is 7 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "leonberger",
    "name": "Leonberger",
    "slug": "leonberger-pregnancy",
    "size": "giant",
    "avgLitterSize": 8,
    "litterRange": [
      5,
      12
    ],
    "cSectionRate": "low",
    "gestationNotes": "Leonberger gestation is typically 63 days. Average litter size is 8 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "neapolitan-mastiff",
    "name": "Neapolitan Mastiff",
    "slug": "neapolitan-mastiff-pregnancy",
    "size": "giant",
    "avgLitterSize": 7,
    "litterRange": [
      4,
      11
    ],
    "cSectionRate": "high",
    "gestationNotes": "Neapolitan Mastiff gestation is typically 63 days. Average litter size is 7 puppies.",
    "warnings": [
      "Elevated dystocia / C-section rate for this breed. Discuss whelping plan with your veterinarian."
    ],
    "phase": 3
  },
  {
    "id": "newfoundland",
    "name": "Newfoundland",
    "slug": "newfoundland-pregnancy",
    "size": "giant",
    "avgLitterSize": 8,
    "litterRange": [
      5,
      12
    ],
    "cSectionRate": "low",
    "gestationNotes": "Newfoundland gestation is typically 63 days. Average litter size is 8 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "saint-bernard",
    "name": "Saint Bernard",
    "slug": "saint-bernard-pregnancy",
    "size": "giant",
    "avgLitterSize": 8,
    "litterRange": [
      5,
      13
    ],
    "cSectionRate": "medium",
    "cSectionPercent": 31.3,
    "gestationNotes": "Saint Bernard gestation is typically 63 days. Average litter size is 8 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "scottish-deerhound",
    "name": "Scottish Deerhound",
    "slug": "scottish-deerhound-pregnancy",
    "size": "giant",
    "avgLitterSize": 6,
    "litterRange": [
      4,
      10
    ],
    "cSectionRate": "low",
    "gestationNotes": "Scottish Deerhound gestation is typically 63 days. Average litter size is 6 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "tibetan-kyi-apso",
    "name": "Tibetan Kyi Apso",
    "slug": "tibetan-kyi-apso-pregnancy",
    "size": "giant",
    "avgLitterSize": 7,
    "litterRange": [
      4,
      10
    ],
    "cSectionRate": "low",
    "gestationNotes": "Tibetan Kyi Apso gestation is typically 63 days. Average litter size is 7 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "tosa-inu",
    "name": "Tosa Inu",
    "slug": "tosa-inu-pregnancy",
    "size": "giant",
    "avgLitterSize": 8,
    "litterRange": [
      5,
      12
    ],
    "cSectionRate": "low",
    "gestationNotes": "Tosa Inu gestation is typically 63 days. Average litter size is 8 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "labradoodle",
    "name": "Labradoodle",
    "slug": "labradoodle-pregnancy",
    "size": "large",
    "avgLitterSize": 7,
    "litterRange": [
      5,
      10
    ],
    "cSectionRate": "low",
    "gestationNotes": "Labradoodle gestation is typically 63 days. Average litter size is 7 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "bernedoodle",
    "name": "Bernedoodle",
    "slug": "bernedoodle-pregnancy",
    "size": "giant",
    "avgLitterSize": 8,
    "litterRange": [
      5,
      11
    ],
    "cSectionRate": "low",
    "gestationNotes": "Bernedoodle gestation is typically 63 days. Average litter size is 8 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "aussiedoodle",
    "name": "Aussiedoodle",
    "slug": "aussiedoodle-pregnancy",
    "size": "medium",
    "avgLitterSize": 6,
    "litterRange": [
      4,
      9
    ],
    "cSectionRate": "low",
    "gestationNotes": "Aussiedoodle gestation is typically 63 days. Average litter size is 6 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "sheepadoodle",
    "name": "Sheepadoodle",
    "slug": "sheepadoodle-pregnancy",
    "size": "large",
    "avgLitterSize": 7,
    "litterRange": [
      5,
      10
    ],
    "cSectionRate": "low",
    "gestationNotes": "Sheepadoodle gestation is typically 63 days. Average litter size is 7 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "cockapoo",
    "name": "Cockapoo",
    "slug": "cockapoo-pregnancy",
    "size": "small",
    "avgLitterSize": 5,
    "litterRange": [
      3,
      7
    ],
    "cSectionRate": "low",
    "gestationNotes": "Cockapoo gestation is typically 63 days. Average litter size is 5 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "maltipoo",
    "name": "Maltipoo",
    "slug": "maltipoo-pregnancy",
    "size": "toy",
    "avgLitterSize": 4,
    "litterRange": [
      2,
      5
    ],
    "cSectionRate": "medium",
    "gestationNotes": "Maltipoo gestation is typically 63 days. Average litter size is 4 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "yorkipoo",
    "name": "Yorkipoo",
    "slug": "yorkipoo-pregnancy",
    "size": "toy",
    "avgLitterSize": 3,
    "litterRange": [
      1,
      5
    ],
    "cSectionRate": "high",
    "gestationNotes": "Yorkipoo gestation is typically 63 days. Average litter size is 3 puppies.",
    "warnings": [
      "Elevated dystocia / C-section rate for this breed. Discuss whelping plan with your veterinarian."
    ],
    "phase": 3
  },
  {
    "id": "schnoodle",
    "name": "Schnoodle",
    "slug": "schnoodle-pregnancy",
    "size": "small",
    "avgLitterSize": 4,
    "litterRange": [
      2,
      6
    ],
    "cSectionRate": "low",
    "gestationNotes": "Schnoodle gestation is typically 63 days. Average litter size is 4 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "pomsky",
    "name": "Pomsky",
    "slug": "pomsky-pregnancy",
    "size": "small",
    "avgLitterSize": 4,
    "litterRange": [
      2,
      6
    ],
    "cSectionRate": "medium",
    "gestationNotes": "Pomsky gestation is typically 63 days. Average litter size is 4 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "puggle",
    "name": "Puggle",
    "slug": "puggle-pregnancy",
    "size": "small",
    "avgLitterSize": 5,
    "litterRange": [
      3,
      7
    ],
    "cSectionRate": "medium",
    "gestationNotes": "Puggle gestation is typically 63 days. Average litter size is 5 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "chiweenie",
    "name": "Chiweenie",
    "slug": "chiweenie-pregnancy",
    "size": "toy",
    "avgLitterSize": 4,
    "litterRange": [
      2,
      5
    ],
    "cSectionRate": "medium",
    "gestationNotes": "Chiweenie gestation is typically 63 days. Average litter size is 4 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "morkie",
    "name": "Morkie",
    "slug": "morkie-pregnancy",
    "size": "toy",
    "avgLitterSize": 3,
    "litterRange": [
      1,
      4
    ],
    "cSectionRate": "high",
    "gestationNotes": "Morkie gestation is typically 63 days. Average litter size is 3 puppies.",
    "warnings": [
      "Elevated dystocia / C-section rate for this breed. Discuss whelping plan with your veterinarian."
    ],
    "phase": 3
  },
  {
    "id": "shorkie",
    "name": "Shorkie",
    "slug": "shorkie-pregnancy",
    "size": "toy",
    "avgLitterSize": 3,
    "litterRange": [
      1,
      5
    ],
    "cSectionRate": "medium",
    "gestationNotes": "Shorkie gestation is typically 63 days. Average litter size is 3 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "frenchton",
    "name": "Frenchton",
    "slug": "frenchton-pregnancy",
    "size": "small",
    "avgLitterSize": 4,
    "litterRange": [
      2,
      6
    ],
    "cSectionRate": "very-high",
    "cSectionPercent": 82,
    "gestationNotes": "Frenchton gestation is typically 63 days. Average litter size is 4 puppies.",
    "warnings": [
      "Elevated dystocia / C-section rate for this breed. Discuss whelping plan with your veterinarian."
    ],
    "phase": 3
  },
  {
    "id": "alaskan-klee-kai",
    "name": "Alaskan Klee Kai",
    "slug": "alaskan-klee-kai-pregnancy",
    "size": "small",
    "avgLitterSize": 3,
    "litterRange": [
      1,
      5
    ],
    "cSectionRate": "low",
    "gestationNotes": "Alaskan Klee Kai gestation is typically 63 days. Average litter size is 3 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "gerberian-shepsky",
    "name": "Gerberian Shepsky",
    "slug": "gerberian-shepsky-pregnancy",
    "size": "large",
    "avgLitterSize": 7,
    "litterRange": [
      5,
      10
    ],
    "cSectionRate": "low",
    "gestationNotes": "Gerberian Shepsky gestation is typically 63 days. Average litter size is 7 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "texas-heeler",
    "name": "Texas Heeler",
    "slug": "texas-heeler-pregnancy",
    "size": "medium",
    "avgLitterSize": 6,
    "litterRange": [
      4,
      8
    ],
    "cSectionRate": "low",
    "gestationNotes": "Texas Heeler gestation is typically 63 days. Average litter size is 6 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "boxador",
    "name": "Boxador",
    "slug": "boxador-pregnancy",
    "size": "large",
    "avgLitterSize": 7,
    "litterRange": [
      5,
      11
    ],
    "cSectionRate": "low",
    "gestationNotes": "Boxador gestation is typically 63 days. Average litter size is 7 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "bullpug",
    "name": "Bullpug",
    "slug": "bullpug-pregnancy",
    "size": "small",
    "avgLitterSize": 4,
    "litterRange": [
      2,
      6
    ],
    "cSectionRate": "very-high",
    "cSectionPercent": 84,
    "gestationNotes": "Bullpug gestation is typically 63 days. Average litter size is 4 puppies.",
    "warnings": [
      "Elevated dystocia / C-section rate for this breed. Discuss whelping plan with your veterinarian."
    ],
    "phase": 3
  },
  {
    "id": "chug",
    "name": "Chug",
    "slug": "chug-pregnancy",
    "size": "small",
    "avgLitterSize": 4,
    "litterRange": [
      2,
      6
    ],
    "cSectionRate": "high",
    "gestationNotes": "Chug gestation is typically 63 days. Average litter size is 4 puppies.",
    "warnings": [
      "Elevated dystocia / C-section rate for this breed. Discuss whelping plan with your veterinarian."
    ],
    "phase": 3
  },
  {
    "id": "peekapoo",
    "name": "Peekapoo",
    "slug": "peekapoo-pregnancy",
    "size": "toy",
    "avgLitterSize": 3,
    "litterRange": [
      1,
      5
    ],
    "cSectionRate": "high",
    "gestationNotes": "Peekapoo gestation is typically 63 days. Average litter size is 3 puppies.",
    "warnings": [
      "Elevated dystocia / C-section rate for this breed. Discuss whelping plan with your veterinarian."
    ],
    "phase": 3
  },
  {
    "id": "doxiepoo",
    "name": "Doxiepoo",
    "slug": "doxiepoo-pregnancy",
    "size": "small",
    "avgLitterSize": 4,
    "litterRange": [
      2,
      6
    ],
    "cSectionRate": "medium",
    "gestationNotes": "Doxiepoo gestation is typically 63 days. Average litter size is 4 puppies.",
    "warnings": [],
    "phase": 3
  },
  {
    "id": "whoodle",
    "name": "Whoodle",
    "slug": "whoodle-pregnancy",
    "size": "medium",
    "avgLitterSize": 6,
    "litterRange": [
      4,
      8
    ],
    "cSectionRate": "low",
    "gestationNotes": "Whoodle gestation is typically 63 days. Average litter size is 6 puppies.",
    "warnings": [],
    "phase": 3
  }
];

export function getBreedData(idOrSlug: string): BreedData | undefined {
  return BREEDS.find(b => b.id === idOrSlug || b.slug === idOrSlug || b.name.toLowerCase() === idOrSlug.toLowerCase());
}

export function getAllBreeds(): BreedData[] {
  return BREEDS;
}
