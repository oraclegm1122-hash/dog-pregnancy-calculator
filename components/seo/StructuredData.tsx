// components/seo/StructuredData.tsx
import React from 'react';

export default function StructuredData() {
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'WhelpWise Dog Pregnancy Calculator',
    'description': 'Free clinical dog pregnancy calculator. Calculate canine due date using mating date, ovulation, or LH peak with breed-specific litter sizes, C-section risks, and printable whelping calendar.',
    'url': 'https://whelpwise.com/',
    'applicationCategory': 'HealthApplication',
    'operatingSystem': 'Web, iOS, Android',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    },
    'author': {
      '@type': 'Organization',
      'name': 'WhelpWise Canine Health'
    }
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': "How do I calculate my dog's due date?",
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': "To calculate your dog's due date, enter her mating date or ovulation date into the calculator above. The biological canine gestation period averages 63 days from ovulation (range 62-64 days) and 63 days from mating (range 56-70 days due to variable sperm survival and delayed fertilization)."
        }
      },
      {
        '@type': 'Question',
        'name': 'Can a dog give birth safely at 55 days?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Puppies born before Day 57 from ovulation are clinically premature with underdeveloped pulmonary surfactant and have a significantly diminished survival rate. However, if calculated from breeding date, what appears to be Day 55 may actually be Day 58+ from actual ovulation, in which case the puppies may be fully viable. Contact your vet immediately if labor begins before Day 58.'
        }
      },
      {
        '@type': 'Question',
        'name': 'What are the first confirmed signs that a dog is pregnant?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Early clinical signs around Days 21-28 include subtle lethargy, mild transient morning nausea or reduced appetite, enlargement and pinking-up of the nipples (especially in primiparous dams), and clear mucoid vaginal discharge. Definitive confirmation should be performed via abdominal ultrasound between Days 25 and 30.'
        }
      },
      {
        '@type': 'Question',
        'name': 'How many puppies will my dog have?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Litter size depends heavily on maternal breed size and dam age. According to landmark research by Borge et al. (2011) covering 10,810 litters across 224 breeds: toy breeds average 3.5 puppies (range 1-5), medium breeds average 5.5 puppies (range 3-9), and giant breeds average 8.0 puppies (range 5-13). An abdominal radiograph (X-ray) taken after Day 50 provides the only accurate count.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Why is ovulation dating more accurate than mating date?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Canine spermatozoa can survive inside the female reproductive tract for up to 5 to 7 days prior to fertilization, while canine ova require 48 to 72 hours post-ovulation to mature into fertilizable secondary oocytes. Because of this biological flexibility, mating date gestation has a wide ±7 day window (56-70 days), whereas ovulation dating narrows the delivery target to ±1 day (62-64 days).'
        }
      },
      {
        '@type': 'Question',
        'name': 'What are the emergency signs of whelping complications (dystocia)?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Contact an emergency vet immediately if you observe: 1) Purulent green or black vaginal discharge (uteroverdin) before the first puppy is delivered, indicating placental detachment; 2) Strong, visible abdominal contractions lasting more than 30-45 minutes without producing a pup; 3) More than 2 to 4 hours between puppies when more remain inside; or 4) Dam exhibiting extreme lethargy, trembling, or hypocalcemia (eclampsia).'
        }
      }
    ]
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://whelpwise.com/'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Dog Pregnancy Calculator',
        'item': 'https://whelpwise.com/#calculator'
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
