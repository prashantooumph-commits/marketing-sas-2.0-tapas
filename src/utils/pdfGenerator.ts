/**
 * Generates an authentic, valid PDF 1.4 document binary with standard objects,
 * text streams, xref table, and trailer. Opens in any standard PDF viewer.
 */
export function generateGuidePDFBlob(): Blob {
  const contentLines = [
    'CEDAR & CO LEARNING - EXECUTIVE OPERATIONAL BRIEF',
    '==================================================',
    '',
    'THE MODERN FOUNDER\'S GUIDE TO PREDICTABLE REVENUE & AI OPERATIONS',
    'Version: 2026.4 | Audience: Founders, Managing Directors & Department Leads',
    '',
    'SECTION 1: THE CORE PARADOX OF THE BUSY FOUNDER',
    'Most business leaders spend 65% of their working hours trapped in coordination',
    'overhead: answering recurring customer emails, proofreading ad copy, syncing',
    'calendars, and manually transcribing lead notes. This creates an invisible growth ceiling.',
    '',
    'SECTION 2: THE EMPLOYEE-FIRST DELEGATION FRAMEWORK',
    '1. Executive Assistant (Aria Vance):',
    '   - Protect the calendar with 30-minute default buffers.',
    '   - Daily morning briefings that summarize priority decisions needing attention.',
    '',
    '2. Inbound & Outbound Sales Alignment (Jordan Bell & Arthur Pendelton):',
    '   - Sub-60 second speed-to-lead response on inbound inquiries.',
    '   - Multi-touch personalized outbound sequences with automated suppression and opt-out checks.',
    '',
    '3. Audience-Growth via Value Loops (Astrid Lind):',
    '   - Public social engagement triggers private resource delivery (Flagship Guide loop).',
    '   - Separate content delivery from explicit marketing consent to protect domain trust.',
    '',
    'SECTION 3: THREE NON-NEGOTIABLE OPERATIONAL INVARIANTS',
    'Invariant A: Never decouple creative approval from the actual live audience and budget.',
    'Invariant B: Human takeover must permanently pause automated replies until released.',
    'Invariant C: Knowledge lessons learned from customer feedback must be auditable and reversible.',
    '',
    '--------------------------------------------------',
    'Provided by Cedar & Co Learning (cedarlearning.co). All Rights Reserved.'
  ];

  // Construct valid PDF 1.4 stream
  // Escape parentheses and backslashes for PDF string literal
  let textStream = 'BT\n/F1 12 Tf\n50 750 Td\n16 TL\n';
  for (const line of contentLines) {
    const safeLine = line.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
    textStream += `(${safeLine}) '\n`;
  }
  textStream += 'ET';

  const streamLength = textStream.length;

  const pdfParts: string[] = [];
  pdfParts.push('%PDF-1.4\n');
  
  // Object 1: Catalog
  const obj1Offset = pdfParts.join('').length;
  pdfParts.push('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n');

  // Object 2: Pages
  const obj2Offset = pdfParts.join('').length;
  pdfParts.push('2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n');

  // Object 3: Page
  const obj3Offset = pdfParts.join('').length;
  pdfParts.push(
    '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj\n'
  );

  // Object 4: Stream Content
  const obj4Offset = pdfParts.join('').length;
  pdfParts.push(
    `4 0 obj\n<< /Length ${streamLength} >>\nstream\n${textStream}\nendstream\nendobj\n`
  );

  // Object 5: Font (Standard Type 1 Helvetica)
  const obj5Offset = pdfParts.join('').length;
  pdfParts.push('5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n');

  // Xref Table
  const xrefOffset = pdfParts.join('').length;
  pdfParts.push('xref\n0 6\n0000000000 65535 f \n');
  
  const pad = (n: number) => n.toString().padStart(10, '0');
  pdfParts.push(`${pad(obj1Offset)} 00000 n \n`);
  pdfParts.push(`${pad(obj2Offset)} 00000 n \n`);
  pdfParts.push(`${pad(obj3Offset)} 00000 n \n`);
  pdfParts.push(`${pad(obj4Offset)} 00000 n \n`);
  pdfParts.push(`${pad(obj5Offset)} 00000 n \n`);

  // Trailer
  pdfParts.push(`trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`);

  const pdfString = pdfParts.join('');
  return new Blob([pdfString], { type: 'application/pdf' });
}

export function triggerGuideDownload(filename = 'CedarCo_Executive_Revenue_Guide.pdf') {
  const blob = generateGuidePDFBlob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
