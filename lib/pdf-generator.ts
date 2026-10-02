// lib/pdf-generator.ts
import { jsPDF } from 'jspdf';
import { format } from 'date-fns';
import { CalculatorOutput } from './calculator-logic';

export function generateWhelpingPDF(output: CalculatorOutput, dogName?: string): void {
  if (typeof window === 'undefined') return;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const primaryName = dogName?.trim() || 'Your Expecting Dog';

  // --- PAGE 1: Milestone Calendar ---
  // Header bar
  doc.setFillColor(13, 148, 136); // Teal #0d9488
  doc.rect(0, 0, 210, 26, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(`${primaryName}'s Official Whelping Calendar`, 14, 16);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('Clinical Gestation Milestones • Veterinary Reproduction Guide', 14, 22);

  // Summary Card Box
  doc.setFillColor(240, 253, 250); // Teal 50
  doc.setDrawColor(204, 251, 241);
  doc.roundedRect(14, 32, 182, 28, 2, 2, 'FD');

  doc.setTextColor(15, 118, 110);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('EXPECTED DELIVERY TARGET', 20, 39);

  doc.setFontSize(16);
  doc.setTextColor(19, 78, 74);
  doc.text(format(output.dueDate, 'EEEE, MMMM d, yyyy'), 20, 47);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text(`Viable Window: ${format(output.earliestDate, 'MMM d, yyyy')} to ${format(output.latestDate, 'MMM d, yyyy')} (Day 56 - 70)`, 20, 54);
  if (output.breedName) {
    doc.text(`Breed: ${output.breedName} | C-Section Risk: ${output.cSectionRisk.toUpperCase()}`, 115, 54);
  }

  // Milestones Table Header
  doc.setFillColor(241, 245, 249);
  doc.rect(14, 66, 182, 8, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  doc.text('DAY', 18, 71.5);
  doc.text('CALENDAR DATE', 38, 71.5);
  doc.text('MILESTONE & CLINICAL ACTION', 75, 71.5);

  let currentY = 80;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);

  output.milestones.forEach((m, idx) => {
    if (currentY > 270) {
      doc.addPage();
      currentY = 25;
    }

    if (idx % 2 === 0) {
      doc.setFillColor(248, 250, 252);
      doc.rect(14, currentY - 5, 182, 10.5, 'F');
    }

    // Day
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 118, 110);
    doc.text(`Day ${m.day}`, 18, currentY + 1);

    // Date
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(format(m.date, 'MMM d, yyyy'), 38, currentY + 1);

    // Title & snippet
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(m.title, 75, currentY - 0.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    const shortDesc = m.description.length > 70 ? m.description.substring(0, 67) + '...' : m.description;
    doc.text(shortDesc, 75, currentY + 3.5);
    doc.setFontSize(8.5);

    currentY += 11.5;
  });

  // Footer on Page 1
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.text('Dog Pregnancy Calculator • Always consult your veterinarian for medical management.', 14, 287);

  // --- PAGE 2: Temperature Tracking Log Sheet ---
  doc.addPage();

  // Header
  doc.setFillColor(13, 148, 136);
  doc.rect(0, 0, 210, 24, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Pre-Labor Rectal Temperature Log (Day 54 - 65)', 14, 15);

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.text('Take rectal temperature twice daily at the same times (e.g. 8:00 AM & 8:00 PM).', 14, 20);

  // Medical Alert Box
  doc.setFillColor(254, 242, 242);
  doc.setDrawColor(252, 165, 165);
  doc.roundedRect(14, 28, 182, 20, 2, 2, 'FD');
  doc.setTextColor(153, 27, 27);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('CRITICAL CLINICAL TRIGGER:', 20, 34);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('Normal canine temperature is 100.0 - 101.5°F (37.8 - 38.6°C). A sharp, sustained drop below 99.0°F (37.2°C)', 20, 39);
  doc.text('is triggered by the abrupt drop in circulating progesterone and signals active labor onset within 12 to 24 hours.', 20, 44);

  // Table Grid
  const startGridY = 54;
  doc.setFillColor(241, 245, 249);
  doc.rect(14, startGridY, 182, 8, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(30, 41, 59);
  doc.text('DATE / DAY', 18, startGridY + 5.5);
  doc.text('TIME (AM)', 55, startGridY + 5.5);
  doc.text('TEMP (°F / °C)', 80, startGridY + 5.5);
  doc.text('TIME (PM)', 115, startGridY + 5.5);
  doc.text('TEMP (°F / °C)', 140, startGridY + 5.5);
  doc.text('BEHAVIOR & NOTES', 170, startGridY + 5.5);

  let rowY = startGridY + 8;
  for (let d = 54; d <= 65; d++) {
    doc.setDrawColor(226, 232, 240);
    doc.line(14, rowY, 196, rowY);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 118, 110);
    doc.text(`Day ${d}`, 18, rowY + 9);

    // Empty fields for manual pen/pencil recording
    doc.line(75, rowY + 11, 105, rowY + 11);
    doc.line(135, rowY + 11, 162, rowY + 11);

    rowY += 15;
  }
  doc.line(14, rowY, 196, rowY);

  // Vet Emergency Box at bottom of Page 2
  doc.setFillColor(255, 251, 235);
  doc.setDrawColor(253, 230, 138);
  doc.roundedRect(14, rowY + 4, 182, 24, 2, 2, 'FD');

  doc.setTextColor(146, 64, 14);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text('EMERGENCY VET CHECKLIST - Call Clinic Immediately If:', 20, rowY + 10);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(120, 53, 15);
  doc.text('• Green (uteroverdin) discharge before any puppy is delivered (sign of placental detachment)', 20, rowY + 15);
  doc.text('• Hard active labor contractions lasting > 30-45 minutes with no delivery', 20, rowY + 19);
  doc.text('• More than 2-4 hours between puppies when additional puppies remain in uterus', 20, rowY + 23);

  // Save the document
  const fileName = dogName
    ? `${dogName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-whelping-calendar.pdf`
    : 'dog-pregnancy-whelping-calendar.pdf';
  doc.save(fileName);
}
