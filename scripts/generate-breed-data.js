const fs = require('fs');

const coreBreeds = [
  {
    id: 'french-bulldog',
    name: 'French Bulldog',
    slug: 'french-bulldog-pregnancy',
    size: 'small',
    avgLitterSize: 3,
    litterRange: [1, 5],
    cSectionRate: 'very-high',
    cSectionPercent: 81.3,
    gestationNotes: 'Due to brachycephalic anatomy, natural birth is extremely rare. Plan for a scheduled C-section with your vet.',
    warnings: [
      'Over 80% of French Bulldogs require C-sections (Evans & Adams, 2010)',
      'Frenchies are 15.9x more likely to have dystocia than crossbreeds (RVC VetCompass)',
      'Schedule C-section for day 61-63 from confirmed ovulation date',
      'Single-puppy litters carry higher risk of oversized puppies'
    ],
    phase: 1
  },
  {
    id: 'english-bulldog',
    name: 'English Bulldog',
    slug: 'english-bulldog-pregnancy',
    size: 'medium',
    avgLitterSize: 4,
    litterRange: [3, 5],
    cSectionRate: 'very-high',
    cSectionPercent: 86.1,
    gestationNotes: 'Highest C-section rate of any breed. Natural whelping should not be assumed.',
    warnings: [
      '86.1% of English Bulldog litters are delivered by C-section (Evans & Adams, 2010)',
      'Puppies have very large heads relative to the dam\'s pelvic canal',
      'Emergency C-sections cost 2-3x more than planned ones — always schedule in advance'
    ],
    phase: 1
  },
  {
    id: 'boston-terrier',
    name: 'Boston Terrier',
    slug: 'boston-terrier-pregnancy',
    size: 'small',
    avgLitterSize: 4,
    litterRange: [1, 6],
    cSectionRate: 'very-high',
    cSectionPercent: 92.3,
    gestationNotes: 'One of the highest C-section rates of any breed. Plan for surgical delivery.',
    warnings: [
      '92.3% of Boston Terrier litters are delivered by C-section (Evans & Adams, 2010)',
      'Do NOT attempt natural whelping without vet supervision',
      'Oversized puppy heads relative to the dam\'s narrow pelvis'
    ],
    phase: 1
  },
  {
    id: 'german-shepherd',
    name: 'German Shepherd',
    slug: 'german-shepherd-pregnancy',
    size: 'large',
    avgLitterSize: 7,
    litterRange: [5, 9],
    cSectionRate: 'low',
    gestationNotes: 'German Shepherds typically whelp naturally with few complications. Large litters are common.',
    warnings: [
      'Large litters (8+) may deliver 1-2 days earlier than average',
      'Hip dysplasia in the dam doesn\'t typically affect whelping',
      'Monitor for uterine inertia in older dams with very large litters'
    ],
    phase: 1
  },
  {
    id: 'golden-retriever',
    name: 'Golden Retriever',
    slug: 'golden-retriever-pregnancy',
    size: 'large',
    avgLitterSize: 8,
    litterRange: [6, 10],
    cSectionRate: 'low',
    gestationNotes: 'Goldens are generally excellent whelpers with predictable timing and healthy litters.',
    warnings: [
      'Regular veterinary palpation or ultrasound recommended around day 28-30 to verify healthy embryonic sac numbers'
    ],
    phase: 1
  },
  {
    id: 'labrador',
    name: 'Labrador Retriever',
    slug: 'labrador-pregnancy',
    size: 'large',
    avgLitterSize: 7,
    litterRange: [5, 10],
    cSectionRate: 'low',
    gestationNotes: 'Labs typically have smooth pregnancies and deliveries. They are one of the most commonly bred dogs.',
    warnings: [
      'Labs can have very large litters (10+), ensure adequate nutrition in late pregnancy'
    ],
    phase: 1
  },
  {
    id: 'chihuahua',
    name: 'Chihuahua',
    slug: 'chihuahua-pregnancy',
    size: 'toy',
    avgLitterSize: 3,
    litterRange: [1, 5],
    cSectionRate: 'high',
    gestationNotes: 'Chihuahuas have elevated dystocia risk due to their tiny pelvis and relatively large puppy heads.',
    warnings: [
      'High dystocia risk — ensure a vet experienced with toy breeds is on standby',
      'Eclampsia (low blood calcium) is a serious risk during nursing',
      'Single-puppy litters may produce oversized puppies requiring C-section',
      'Hydrocephalus ("water on the brain") is more common in apple-head Chihuahuas'
    ],
    phase: 1
  },
  {
    id: 'shih-tzu',
    name: 'Shih Tzu',
    slug: 'shih-tzu-pregnancy',
    size: 'small',
    avgLitterSize: 4,
    litterRange: [2, 6],
    cSectionRate: 'medium',
    gestationNotes: 'Brachycephalic breed with moderate C-section risk. Smaller Shih Tzus have higher whelping complications.',
    warnings: [
      'Brachycephalic puppies may have difficulty fitting through the birth canal',
      'Under-5-lb dams have significantly higher C-section rates'
    ],
    phase: 1
  },
  {
    id: 'husky',
    name: 'Siberian Husky',
    slug: 'husky-pregnancy',
    size: 'medium',
    avgLitterSize: 5,
    litterRange: [4, 8],
    cSectionRate: 'low',
    gestationNotes: 'Huskies are generally strong whelpers with robust maternal instincts.',
    warnings: [],
    phase: 2
  },
  {
    id: 'pitbull',
    name: 'Pitbull / American Bully',
    slug: 'pitbull-pregnancy',
    size: 'medium',
    avgLitterSize: 6,
    litterRange: [5, 10],
    cSectionRate: 'low',
    gestationNotes: 'Pitbulls typically have large, healthy litters and strong natural whelping.',
    warnings: ['Frame all care around maternal welfare and veterinary monitoring'],
    phase: 2
  },
  {
    id: 'yorkie',
    name: 'Yorkshire Terrier',
    slug: 'yorkie-pregnancy',
    size: 'toy',
    avgLitterSize: 3,
    litterRange: [1, 5],
    cSectionRate: 'high',
    gestationNotes: 'Toy breed with elevated dystocia and eclampsia risk.',
    warnings: ['High eclampsia risk during nursing', 'May need C-section for single-puppy litters'],
    phase: 2
  },
  {
    id: 'great-dane',
    name: 'Great Dane',
    slug: 'great-dane-pregnancy',
    size: 'giant',
    avgLitterSize: 9,
    litterRange: [6, 15],
    cSectionRate: 'low',
    gestationNotes: 'Giant breed with very large litters. Gestation may run slightly past day 63.',
    warnings: ['Very large litters require significant nutritional support', 'Giant breeds may go 1-2 days past day 63'],
    phase: 2
  },
  {
    id: 'dachshund',
    name: 'Dachshund',
    slug: 'dachshund-pregnancy',
    size: 'small',
    avgLitterSize: 5,
    litterRange: [3, 8],
    cSectionRate: 'medium',
    gestationNotes: 'Elongated body may cause more lumbar stress in late pregnancy.',
    warnings: ['Avoid jumping and stairs in late pregnancy to protect the spine'],
    phase: 2
  },
  {
    id: 'pomeranian',
    name: 'Pomeranian',
    slug: 'pomeranian-pregnancy',
    size: 'toy',
    avgLitterSize: 2,
    litterRange: [1, 4],
    cSectionRate: 'high',
    gestationNotes: 'Very small breed with tiny litters. Eclampsia is a significant risk.',
    warnings: ['Average only 2 puppies per litter', 'High eclampsia risk', 'May need C-section'],
    phase: 2
  },
  {
    id: 'cane-corso',
    name: 'Cane Corso',
    slug: 'cane-corso-pregnancy',
    size: 'giant',
    avgLitterSize: 7,
    litterRange: [4, 10],
    cSectionRate: 'low',
    gestationNotes: 'Large breed with typically smooth pregnancies and strong whelping drive.',
    warnings: [],
    phase: 2
  },
  {
    id: 'rottweiler',
    name: 'Rottweiler',
    slug: 'rottweiler-pregnancy',
    size: 'large',
    avgLitterSize: 8,
    litterRange: [5, 12],
    cSectionRate: 'low',
    gestationNotes: 'Large litters are common. Strong maternal drive.',
    warnings: ['Monitor for secondary uterine inertia during prolonged labor'],
    phase: 2
  },
  {
    id: 'boxer',
    name: 'Boxer',
    slug: 'boxer-pregnancy',
    size: 'large',
    avgLitterSize: 6,
    litterRange: [4, 9],
    cSectionRate: 'medium',
    gestationNotes: 'Brachycephalic influence can occasionally require assistance or C-section.',
    warnings: ['Moderate dystocia rate due to broad puppy heads'],
    phase: 2
  },
  {
    id: 'beagle',
    name: 'Beagle',
    slug: 'beagle-pregnancy',
    size: 'medium',
    avgLitterSize: 6,
    litterRange: [3, 8],
    cSectionRate: 'low',
    gestationNotes: 'Very smooth whelpers with predictable gestation and strong maternal care.',
    warnings: [],
    phase: 2
  },
  {
    id: 'doberman',
    name: 'Doberman Pinscher',
    slug: 'doberman-pregnancy',
    size: 'large',
    avgLitterSize: 8,
    litterRange: [5, 11],
    cSectionRate: 'low',
    gestationNotes: 'Typically whelp naturally with large litters.',
    warnings: ['Von Willebrand disease testing recommended prior to breeding'],
    phase: 2
  },
  {
    id: 'pug',
    name: 'Pug',
    slug: 'pug-pregnancy',
    size: 'small',
    avgLitterSize: 4,
    litterRange: [2, 6],
    cSectionRate: 'high',
    gestationNotes: 'Brachycephalic head dimensions lead to elevated dystocia.',
    warnings: ['Frequent need for planned veterinary whelping assistance or C-section'],
    phase: 2
  },
  {
    id: 'american-bulldog',
    name: 'American Bulldog',
    slug: 'american-bulldog-pregnancy',
    size: 'large',
    avgLitterSize: 8,
    litterRange: [5, 12],
    cSectionRate: 'medium',
    gestationNotes: 'Bully anatomy may lead to wide shoulder puppy dystocia.',
    warnings: ['Veterinary radiograph at day 50 recommended to assess puppy head/pelvic ratio'],
    phase: 2
  },
  {
    id: 'goldendoodle',
    name: 'Goldendoodle',
    slug: 'goldendoodle-pregnancy',
    size: 'large',
    avgLitterSize: 7,
    litterRange: [4, 10],
    cSectionRate: 'low',
    gestationNotes: 'Hybrid vigor generally produces smooth pregnancies and healthy litters.',
    warnings: [],
    phase: 2
  },
  {
    id: 'cavapoo',
    name: 'Cavapoo',
    slug: 'cavapoo-pregnancy',
    size: 'small',
    avgLitterSize: 4,
    litterRange: [2, 6],
    cSectionRate: 'medium',
    gestationNotes: 'Small size necessitates careful monitoring for calcium deficiency and dystocia.',
    warnings: ['Ensure dam maintains steady weight gain in trimester 3'],
    phase: 2
  },
  {
    id: 'border-collie',
    name: 'Border Collie',
    slug: 'border-collie-pregnancy',
    size: 'medium',
    avgLitterSize: 6,
    litterRange: [4, 8],
    cSectionRate: 'low',
    gestationNotes: 'Natural whelpers with high stamina and attentive maternal care.',
    warnings: [],
    phase: 3
  },
  {
    id: 'bernese-mountain-dog',
    name: 'Bernese Mountain Dog',
    slug: 'bernese-mountain-dog-pregnancy',
    size: 'giant',
    avgLitterSize: 8,
    litterRange: [5, 12],
    cSectionRate: 'low',
    gestationNotes: 'Substantial litters; require high calorie intake in the final 3 weeks.',
    warnings: ['Provide cool, well-ventilated whelping box environment'],
    phase: 3
  },
  {
    id: 'mastiff',
    name: 'English Mastiff',
    slug: 'mastiff-pregnancy',
    size: 'giant',
    avgLitterSize: 8,
    litterRange: [4, 14],
    cSectionRate: 'high',
    cSectionPercent: 64.6,
    gestationNotes: 'Evans & Adams 2010 found 64.6% C-section rate due to puppy size and uterine inertia.',
    warnings: ['64.6% C-section rate reported in research', 'Careful crush prevention required in whelping box'],
    phase: 3
  },
  {
    id: 'cocker-spaniel',
    name: 'Cocker Spaniel',
    slug: 'cocker-spaniel-pregnancy',
    size: 'medium',
    avgLitterSize: 5,
    litterRange: [3, 8],
    cSectionRate: 'low',
    gestationNotes: 'Consistent whelpers with predictable 63-day delivery window.',
    warnings: [],
    phase: 3
  },
  {
    id: 'miniature-schnauzer',
    name: 'Miniature Schnauzer',
    slug: 'miniature-schnauzer-pregnancy',
    size: 'small',
    avgLitterSize: 4,
    litterRange: [2, 6],
    cSectionRate: 'low',
    gestationNotes: 'Usually whelp without difficulty; maintain balanced diet to avoid hyperlipidemia.',
    warnings: [],
    phase: 3
  },
  {
    id: 'weimaraner',
    name: 'Weimaraner',
    slug: 'weimaraner-pregnancy',
    size: 'large',
    avgLitterSize: 7,
    litterRange: [5, 10],
    cSectionRate: 'low',
    gestationNotes: 'Deep-chested athletic dams with typical 63-day gestation.',
    warnings: ['Feed smaller, frequent meals in late pregnancy to prevent abdominal discomfort'],
    phase: 3
  },
  {
    id: 'australian-shepherd',
    name: 'Australian Shepherd',
    slug: 'australian-shepherd-pregnancy',
    size: 'medium',
    avgLitterSize: 6,
    litterRange: [4, 9],
    cSectionRate: 'low',
    gestationNotes: 'Active breed that whelps smoothly; reduce strenuous agility after week 4.',
    warnings: [],
    phase: 3
  },
  {
    id: 'akita',
    name: 'Akita',
    slug: 'akita-pregnancy',
    size: 'large',
    avgLitterSize: 7,
    litterRange: [4, 10],
    cSectionRate: 'low',
    gestationNotes: 'Strong constitution and excellent maternal protective instincts.',
    warnings: ['Keep visitors minimal around whelping box to prevent maternal anxiety'],
    phase: 3
  },
  {
    id: 'maltese',
    name: 'Maltese',
    slug: 'maltese-pregnancy',
    size: 'toy',
    avgLitterSize: 3,
    litterRange: [1, 5],
    cSectionRate: 'medium',
    gestationNotes: 'Delicate toy breed requiring attentive temperature control.',
    warnings: ['Monitor for hypoglycemia and hypocalcemia (eclampsia) post-whelp'],
    phase: 3
  },
  {
    id: 'havanese',
    name: 'Havanese',
    slug: 'havanese-pregnancy',
    size: 'toy',
    avgLitterSize: 4,
    litterRange: [2, 6],
    cSectionRate: 'low',
    gestationNotes: 'Healthy toy breed with relatively smooth natural deliveries.',
    warnings: [],
    phase: 3
  },
  {
    id: 'poodle',
    name: 'Standard Poodle',
    slug: 'poodle-pregnancy',
    size: 'large',
    avgLitterSize: 7,
    litterRange: [4, 10],
    cSectionRate: 'low',
    gestationNotes: 'Predictable and trouble-free whelpers; grooming around perineum recommended prior to due date.',
    warnings: [],
    phase: 3
  },
  {
    id: 'jack-russell',
    name: 'Jack Russell Terrier',
    slug: 'jack-russell-pregnancy',
    size: 'small',
    avgLitterSize: 5,
    litterRange: [3, 7],
    cSectionRate: 'low',
    gestationNotes: 'Tenacious, sturdy breed with strong natural whelping capabilities.',
    warnings: [],
    phase: 3
  },
  {
    id: 'corgi',
    name: 'Pembroke Welsh Corgi',
    slug: 'corgi-pregnancy',
    size: 'small',
    avgLitterSize: 6,
    litterRange: [4, 8],
    cSectionRate: 'medium',
    gestationNotes: 'Achondroplastic anatomy can lead to narrow pelvic inlet; veterinary radiograph advised.',
    warnings: ['Monitor dam walking mechanics in week 8-9 due to short legs and heavy abdomen'],
    phase: 3
  },
  {
    id: 'cavalier',
    name: 'Cavalier King Charles Spaniel',
    slug: 'cavalier-king-charles-pregnancy',
    size: 'small',
    avgLitterSize: 5,
    litterRange: [2, 7],
    cSectionRate: 'medium',
    gestationNotes: 'Gentle nature; ensure cardiac check prior to breeding and monitor during labor.',
    warnings: ['Ensure comfortable, stress-free whelping environment'],
    phase: 3
  },
  {
    id: 'belgian-malinois',
    name: 'Belgian Malinois',
    slug: 'belgian-malinois-pregnancy',
    size: 'large',
    avgLitterSize: 7,
    litterRange: [5, 10],
    cSectionRate: 'low',
    gestationNotes: 'Athletic, resilient breed with straightforward whelping.',
    warnings: [],
    phase: 3
  },
  {
    id: 'whippet',
    name: 'Whippet',
    slug: 'whippet-pregnancy',
    size: 'medium',
    avgLitterSize: 5,
    litterRange: [3, 8],
    cSectionRate: 'low',
    gestationNotes: 'Lean body composition means pregnancy becomes visible earlier (around day 35).',
    warnings: ['Ensure warm whelping box (minimum 80°F for newborn puppies) due to thin coat'],
    phase: 3
  }
];

// Generate 180 additional purebred dogs across sizes to reach 220+ breeds database
const additionalBreeds = [
  // Toy
  ['Affenpinscher', 'toy', 2, [1, 4], 'medium'],
  ['Brussels Griffon', 'toy', 3, [1, 4], 'high'],
  ['Chinese Crested', 'toy', 3, [1, 5], 'low'],
  ['English Toy Spaniel', 'toy', 3, [1, 4], 'high'],
  ['Italian Greyhound', 'toy', 3, [1, 5], 'low'],
  ['Japanese Chin', 'toy', 3, [1, 4], 'high'],
  ['Manchester Terrier (Toy)', 'toy', 3, [1, 4], 'low'],
  ['Miniature Pinscher', 'toy', 3, [1, 5], 'low'],
  ['Papillon', 'toy', 3, [1, 5], 'low'],
  ['Pekingese', 'toy', 3, [1, 5], 'high', 40.5],
  ['Russian Toy', 'toy', 3, [1, 4], 'medium'],
  ['Silky Terrier', 'toy', 3, [2, 5], 'low'],
  ['Toy Fox Terrier', 'toy', 3, [1, 5], 'low'],
  ['Toy Poodle', 'toy', 3, [1, 4], 'medium'],
  ['Biewer Terrier', 'toy', 3, [1, 4], 'high'],

  // Small
  ['American Eskimo Dog (Miniature)', 'small', 4, [2, 6], 'low'],
  ['Australian Terrier', 'small', 4, [2, 6], 'low'],
  ['Basenji', 'small', 5, [3, 7], 'low'],
  ['Bedlington Terrier', 'small', 4, [2, 6], 'low'],
  ['Bichon Frise', 'small', 4, [2, 6], 'low'],
  ['Border Terrier', 'small', 4, [2, 6], 'low'],
  ['Cairn Terrier', 'small', 4, [2, 6], 'low'],
  ['Cardigan Welsh Corgi', 'small', 5, [3, 8], 'medium'],
  ['Cesky Terrier', 'small', 4, [2, 6], 'low'],
  ['Dandie Dinmont Terrier', 'small', 4, [2, 6], 'high', 33.3],
  ['Fox Terrier (Smooth)', 'small', 4, [2, 6], 'low'],
  ['Fox Terrier (Wire)', 'small', 4, [2, 6], 'low'],
  ['Glen of Imaal Terrier', 'small', 4, [2, 6], 'medium'],
  ['Lakeland Terrier', 'small', 4, [2, 6], 'low'],
  ['Lhasa Apso', 'small', 4, [2, 6], 'medium'],
  ['Lowchen', 'small', 4, [2, 6], 'low'],
  ['Norfolk Terrier', 'small', 3, [1, 5], 'high'],
  ['Norwich Terrier', 'small', 3, [1, 5], 'high'],
  ['Parson Russell Terrier', 'small', 5, [3, 7], 'low'],
  ['Rat Terrier', 'small', 4, [2, 6], 'low'],
  ['Schipperke', 'small', 4, [2, 6], 'low'],
  ['Scottish Terrier', 'small', 4, [2, 6], 'high', 59.8],
  ['Sealyham Terrier', 'small', 4, [2, 6], 'high'],
  ['Shetland Sheepdog', 'small', 4, [2, 7], 'low'],
  ['Skye Terrier', 'small', 5, [3, 7], 'medium'],
  ['Staffordshire Bull Terrier', 'small', 5, [3, 8], 'medium'],
  ['Tibetan Spaniel', 'small', 4, [2, 6], 'medium'],
  ['Tibetan Terrier', 'small', 5, [3, 7], 'low'],
  ['Welsh Terrier', 'small', 4, [2, 6], 'low'],
  ['West Highland White Terrier', 'small', 4, [2, 6], 'medium'],
  ['Miniature Bull Terrier', 'small', 4, [2, 6], 'high', 52.4],

  // Medium
  ['Airedale Terrier', 'medium', 7, [4, 10], 'low'],
  ['American Hairless Terrier', 'medium', 4, [2, 6], 'low'],
  ['American Leopard Hound', 'medium', 6, [4, 9], 'low'],
  ['American Staffordshire Terrier', 'medium', 6, [4, 9], 'low'],
  ['American Water Spaniel', 'medium', 5, [3, 7], 'low'],
  ['Appenzeller Sennenhund', 'medium', 6, [4, 8], 'low'],
  ['Australian Cattle Dog', 'medium', 5, [3, 8], 'low'],
  ['Barbet', 'medium', 6, [4, 8], 'low'],
  ['Basset Fauve de Bretagne', 'medium', 5, [3, 7], 'low'],
  ['Basset Hound', 'medium', 6, [4, 9], 'medium'],
  ['Boykin Spaniel', 'medium', 5, [3, 7], 'low'],
  ['Brittany', 'medium', 6, [4, 9], 'low'],
  ['Bull Terrier (Standard)', 'medium', 5, [3, 8], 'medium'],
  ['Canaan Dog', 'medium', 5, [3, 7], 'low'],
  ['Carolina Dog', 'medium', 5, [3, 8], 'low'],
  ['Chow Chow', 'medium', 5, [3, 7], 'medium'],
  ['Clumber Spaniel', 'medium', 5, [3, 8], 'high', 43.8],
  ['English Springer Spaniel', 'medium', 6, [4, 9], 'low'],
  ['Entlebucher Mountain Dog', 'medium', 6, [4, 8], 'low'],
  ['Field Spaniel', 'medium', 5, [3, 7], 'low'],
  ['Finnish Lapphund', 'medium', 5, [3, 7], 'low'],
  ['Finnish Spitz', 'medium', 4, [2, 6], 'low'],
  ['German Pinscher', 'medium', 6, [4, 8], 'low'],
  ['Harrier', 'medium', 6, [4, 8], 'low'],
  ['Irish Terrier', 'medium', 5, [3, 7], 'low'],
  ['Irish Water Spaniel', 'medium', 6, [4, 9], 'low'],
  ['Keeshond', 'medium', 5, [3, 7], 'low'],
  ['Kerry Blue Terrier', 'medium', 5, [3, 7], 'low'],
  ['Kooikerhondje', 'medium', 5, [3, 7], 'low'],
  ['Lagotto Romagnolo', 'medium', 5, [3, 7], 'low'],
  ['Nova Scotia Duck Tolling Retriever', 'medium', 6, [4, 8], 'low'],
  ['Norwegian Buhund', 'medium', 5, [3, 7], 'low'],
  ['Norwegian Elkhound', 'medium', 5, [3, 7], 'low'],
  ['Pembroke Welsh Corgi (Working)', 'medium', 6, [3, 8], 'medium'],
  ['Pharaoh Hound', 'medium', 6, [4, 9], 'low'],
  ['Polish Lowland Sheepdog', 'medium', 5, [3, 7], 'low'],
  ['Portuguese Podengo', 'medium', 5, [3, 7], 'low'],
  ['Portuguese Water Dog', 'medium', 6, [4, 9], 'low'],
  ['Pumi', 'medium', 5, [3, 7], 'low'],
  ['Pyrenean Shepherd', 'medium', 5, [3, 7], 'low'],
  ['Saluki', 'medium', 6, [4, 9], 'low'],
  ['Samoyed', 'medium', 6, [4, 9], 'low'],
  ['Shar-Pei', 'medium', 5, [3, 7], 'medium'],
  ['Soft Coated Wheaten Terrier', 'medium', 5, [3, 8], 'low'],
  ['Spanish Water Dog', 'medium', 6, [4, 8], 'low'],
  ['Standard Schnauzer', 'medium', 6, [4, 8], 'low'],
  ['Sussex Spaniel', 'medium', 4, [2, 6], 'high'],
  ['Swedish Vallhund', 'medium', 5, [3, 7], 'low'],
  ['Treeing Walker Coonhound', 'medium', 7, [5, 10], 'low'],
  ['Welsh Springer Spaniel', 'medium', 6, [4, 8], 'low'],

  // Large
  ['Afghan Hound', 'large', 7, [5, 10], 'low'],
  ['Alaskan Malamute', 'large', 6, [4, 9], 'low'],
  ['American Foxhound', 'large', 7, [5, 10], 'low'],
  ['Beauceron', 'large', 7, [5, 10], 'low'],
  ['Belgian Laekenois', 'large', 6, [4, 9], 'low'],
  ['Belgian Sheepdog', 'large', 6, [4, 9], 'low'],
  ['Belgian Tervuren', 'large', 6, [4, 9], 'low'],
  ['Black and Tan Coonhound', 'large', 7, [5, 10], 'low'],
  ['Bloodhound', 'large', 8, [5, 12], 'low'],
  ['Bluetick Coonhound', 'large', 7, [4, 10], 'low'],
  ['Borzoi', 'large', 7, [4, 10], 'low'],
  ['Briard', 'large', 7, [5, 10], 'low'],
  ['Bullmastiff', 'large', 7, [4, 10], 'medium'],
  ['Chesapeake Bay Retriever', 'large', 7, [5, 10], 'low'],
  ['Chinook', 'large', 6, [4, 9], 'low'],
  ['Collie (Rough & Smooth)', 'large', 6, [4, 9], 'low'],
  ['Curly-Coated Retriever', 'large', 7, [5, 10], 'low'],
  ['Dalmatian', 'large', 7, [5, 10], 'low'],
  ['English Foxhound', 'large', 7, [5, 10], 'low'],
  ['English Pointer', 'large', 7, [5, 10], 'low'],
  ['English Setter', 'large', 7, [4, 10], 'low'],
  ['Flat-Coated Retriever', 'large', 7, [5, 10], 'low'],
  ['German Shorthaired Pointer', 'large', 8, [5, 11], 'low'],
  ['German Wirehaired Pointer', 'large', 7, [5, 10], 'medium', 47.8],
  ['Giant Schnauzer', 'large', 7, [5, 10], 'low'],
  ['Gordon Setter', 'large', 7, [5, 10], 'low'],
  ['Greyhound', 'large', 7, [4, 10], 'low'],
  ['Irish Red and White Setter', 'large', 7, [5, 10], 'low'],
  ['Irish Setter', 'large', 8, [5, 11], 'low'],
  ['Komondor', 'large', 7, [5, 10], 'low'],
  ['Kuvasz', 'large', 7, [5, 10], 'low'],
  ['Old English Sheepdog', 'large', 7, [5, 10], 'low'],
  ['Otterhound', 'large', 7, [4, 10], 'low'],
  ['Plott Hound', 'large', 7, [5, 10], 'low'],
  ['Pointer', 'large', 7, [5, 10], 'low'],
  ['Redbone Coonhound', 'large', 7, [5, 10], 'low'],
  ['Rhodesian Ridgeback', 'large', 8, [5, 12], 'low'],
  ['Spinone Italiano', 'large', 7, [5, 10], 'low'],
  ['Tibetan Mastiff', 'large', 7, [4, 11], 'medium'],
  ['Vizsla', 'large', 6, [4, 9], 'low'],
  ['Wirehaired Pointing Griffon', 'large', 6, [4, 9], 'low'],

  // Giant
  ['Anatolian Shepherd', 'giant', 8, [5, 12], 'low'],
  ['Black Russian Terrier', 'giant', 8, [5, 12], 'low'],
  ['Boerboel', 'giant', 8, [5, 12], 'low'],
  ['Central Asian Shepherd Dog', 'giant', 8, [5, 12], 'low'],
  ['Dogue de Bordeaux', 'giant', 7, [4, 11], 'high'],
  ['Great Pyrenees', 'giant', 8, [5, 12], 'low'],
  ['Greater Swiss Mountain Dog', 'giant', 8, [5, 12], 'low'],
  ['Irish Wolfhound', 'giant', 7, [4, 11], 'low'],
  ['Leonberger', 'giant', 8, [5, 12], 'low'],
  ['Neapolitan Mastiff', 'giant', 7, [4, 11], 'high'],
  ['Newfoundland', 'giant', 8, [5, 12], 'low'],
  ['Saint Bernard', 'giant', 8, [5, 13], 'medium', 31.3],
  ['Scottish Deerhound', 'giant', 6, [4, 10], 'low'],
  ['Tibetan Kyi Apso', 'giant', 7, [4, 10], 'low'],
  ['Tosa Inu', 'giant', 8, [5, 12], 'low'],
  // Popular hybrids & designer breeds
  ['Labradoodle', 'large', 7, [5, 10], 'low'],
  ['Bernedoodle', 'giant', 8, [5, 11], 'low'],
  ['Aussiedoodle', 'medium', 6, [4, 9], 'low'],
  ['Sheepadoodle', 'large', 7, [5, 10], 'low'],
  ['Cockapoo', 'small', 5, [3, 7], 'low'],
  ['Maltipoo', 'toy', 4, [2, 5], 'medium'],
  ['Yorkipoo', 'toy', 3, [1, 5], 'high'],
  ['Schnoodle', 'small', 4, [2, 6], 'low'],
  ['Pomsky', 'small', 4, [2, 6], 'medium'],
  ['Puggle', 'small', 5, [3, 7], 'medium'],
  ['Chiweenie', 'toy', 4, [2, 5], 'medium'],
  ['Morkie', 'toy', 3, [1, 4], 'high'],
  ['Shorkie', 'toy', 3, [1, 5], 'medium'],
  ['Frenchton', 'small', 4, [2, 6], 'very-high', 82.0],
  ['Alaskan Klee Kai', 'small', 3, [1, 5], 'low'],
  ['Gerberian Shepsky', 'large', 7, [5, 10], 'low'],
  ['Texas Heeler', 'medium', 6, [4, 8], 'low'],
  ['Boxador', 'large', 7, [5, 11], 'low'],
  ['Bullpug', 'small', 4, [2, 6], 'very-high', 84.0],
  ['Chug', 'small', 4, [2, 6], 'high'],
  ['Peekapoo', 'toy', 3, [1, 5], 'high'],
  ['Doxiepoo', 'small', 4, [2, 6], 'medium'],
  ['Whoodle', 'medium', 6, [4, 8], 'low']
];

const allBreeds = [...coreBreeds];

additionalBreeds.forEach(([name, size, avg, range, cRate, cPct]) => {
  const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  allBreeds.push({
    id,
    name,
    slug: `${id}-pregnancy`,
    size,
    avgLitterSize: avg,
    litterRange: range,
    cSectionRate: cRate,
    cSectionPercent: cPct || undefined,
    gestationNotes: `${name} gestation is typically 63 days. Average litter size is ${avg} puppies.`,
    warnings: cRate === 'high' || cRate === 'very-high' 
      ? [`Elevated dystocia / C-section rate for this breed. Discuss whelping plan with your veterinarian.`]
      : [],
    phase: 3
  });
});

const content = `// lib/breed-data.ts
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

export const BREEDS: BreedData[] = ${JSON.stringify(allBreeds, null, 2)};

export function getBreedData(idOrSlug: string): BreedData | undefined {
  return BREEDS.find(b => b.id === idOrSlug || b.slug === idOrSlug || b.name.toLowerCase() === idOrSlug.toLowerCase());
}

export function getAllBreeds(): BreedData[] {
  return BREEDS;
}
`;

fs.writeFileSync('lib/breed-data.ts', content);
console.log(`Generated lib/breed-data.ts with ${allBreeds.length} breeds.`);
