import jsPDF from 'jspdf';
import { ResumeData } from '../types';
import profileImg from '../assets/images/Dileep_VIT _convocation.png';

// Helper to load an image asynchronously
const loadImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
  });
};

// Helper to crop an image to a circle using an offscreen canvas
const getCircularImageBase64 = (img: HTMLImageElement): string => {
  const canvas = document.createElement('canvas');
  const size = Math.min(img.width, img.height);
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return img.src;

  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
  ctx.clip();
  ctx.drawImage(img, (size - img.width) / 2, (size - img.height) / 2);
  return canvas.toDataURL('image/png');
};

// Helper to draw a clickable link in the header
const drawLink = (
  doc: jsPDF,
  text: string,
  url: string,
  x: number,
  y: number,
  color: number[]
): number => {
  doc.setTextColor(color[0], color[1], color[2]);
  doc.text(text, x, y);
  const textWidth = doc.getTextWidth(text);
  // Link coordinates: jsPDF link takes (x, y, w, h).
  // Baseline is y. 8pt font is approx 2.8mm tall. Link area covers it nicely.
  doc.link(x, y - 2.5, textWidth, 3, { url });
  return textWidth;
};

// Helper to draw mixed bold/normal paragraph text with bullet point wrapping
const drawBoldPrefixParagraph = (
  doc: jsPDF,
  x: number,
  y: number,
  bullet: string,
  boldPrefix: string,
  normalText: string,
  contentWidth: number,
  lineHeight: number
): number => {
  const primaryFont = 'helvetica';
  
  // 1. Draw bullet
  let curX = x;
  if (bullet) {
    doc.setFont(primaryFont, 'bold');
    doc.text(bullet, curX, y);
    curX += doc.getTextWidth(bullet);
  }
  
  // 2. Draw bold prefix
  if (boldPrefix) {
    doc.setFont(primaryFont, 'bold');
    doc.text(boldPrefix, curX, y);
    curX += doc.getTextWidth(boldPrefix);
  }
  
  // 3. Draw normal text first line
  doc.setFont(primaryFont, 'normal');
  const firstLineLimit = x + contentWidth - curX;
  
  const words = normalText.split(' ');
  let firstLineText = '';
  let remainingWords = [...words];
  
  for (let i = 0; i < words.length; i++) {
    const testText = firstLineText ? firstLineText + ' ' + words[i] : words[i];
    const testWidth = doc.getTextWidth(testText);
    if (testWidth <= firstLineLimit) {
      firstLineText = testText;
      remainingWords.shift();
    } else {
      break;
    }
  }
  
  doc.text(firstLineText, curX, y);
  
  let currentY = y;
  
  // 4. Draw subsequent lines (wrap back to indented alignment under the prefix)
  if (remainingWords.length > 0) {
    const remainingText = remainingWords.join(' ');
    const indentX = bullet ? x + doc.getTextWidth(bullet) : x;
    const indentLimit = contentWidth - (indentX - x);
    const lines = doc.splitTextToSize(remainingText, indentLimit);
    lines.forEach((line: string) => {
      currentY += lineHeight;
      doc.text(line, indentX, currentY);
    });
  }
  
  return currentY + lineHeight;
};

export const generateResumePDF = async (resumeData: ResumeData) => {
  try {
    // Create jsPDF instance (A4: 210mm x 297mm)
    const doc = new jsPDF('p', 'mm', 'a4');
    
    // Set default font to Helvetica (standard, highly ATS-friendly)
    doc.setFont('helvetica', 'normal');

    const pageWidth = 210;
    const pageHeight = 297;
    
    // Margins (15mm to maximize print area and keep to single page)
    const margin = 15;
    const contentWidth = pageWidth - margin * 2; // 180mm
    
    // Custom theme colors matching specifications
    const primaryColor = [17, 24, 39];    // #111827
    const secondaryColor = [75, 85, 99];  // #4B5563 (slightly lighter gray for dates/locations)
    const accentColor = [37, 99, 235];    // #2563EB (electric blue accents)
    const textColor = [31, 41, 55];       // #1F2937 (dark charcoal body text)

    let y = margin;

    // ── 1. HEADER SECTION (Name, Subtitle, Contact, Photo) ──
    
    // Load & render circular photo on top right
    const photoSize = 21; // 21mm diameter
    let photoLoaded = false;
    let circularPhotoBase64 = '';
    
    try {
      const img = await loadImage(profileImg);
      circularPhotoBase64 = getCircularImageBase64(img);
      photoLoaded = true;
    } catch (err) {
      console.error('Failed to load profile photo:', err);
    }

    // Draw circular photo
    if (photoLoaded && circularPhotoBase64) {
      doc.addImage(circularPhotoBase64, 'PNG', pageWidth - margin - photoSize, y, photoSize, photoSize);
    }

    // Left Content: Name
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text(resumeData.name.toUpperCase(), margin, y + 4.5);
    
    // Left Content: Subtitle
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
    doc.text("AI/ML Architect  |  Full Stack AI Engineer", margin, y + 9.5);

    // Left Content: Contact details (separated by pipes)
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);

    const emailStr = resumeData.email;
    const phoneStr = resumeData.phone;

    let curX = margin;
    
    // Phone
    if (phoneStr && phoneStr.trim()) {
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);
      doc.text(phoneStr, curX, y + 14.5);
      curX += doc.getTextWidth(phoneStr);

      // Separator
      doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
      doc.text("  |  ", curX, y + 14.5);
      curX += doc.getTextWidth("  |  ");
    }

    // Email link
    curX += drawLink(doc, emailStr, `mailto:${emailStr}`, curX, y + 14.5, accentColor);

    // Separator
    doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.text("  |  ", curX, y + 14.5);
    curX += doc.getTextWidth("  |  ");

    // LinkedIn link
    curX += drawLink(doc, "LinkedIn", resumeData.linkedin, curX, y + 14.5, accentColor);

    // Separator
    doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.text("  |  ", curX, y + 14.5);
    curX += doc.getTextWidth("  |  ");

    // GitHub link
    curX += drawLink(doc, "GitHub", resumeData.github, curX, y + 14.5, accentColor);

    // Separator
    doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.text("  |  ", curX, y + 14.5);
    curX += doc.getTextWidth("  |  ");

    // Portfolio link
    curX += drawLink(doc, "Portfolio", resumeData.portfolio, curX, y + 14.5, accentColor);

    // Position coordinate below header
    y = Math.max(y + 19, margin + photoSize + 2.5);

    // Helper to draw section heading divider
    const drawSectionHeader = (title: string) => {
      y += 3.5;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.0);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text(title, margin, y);
      
      y += 1.0;
      doc.setDrawColor(accentColor[0], accentColor[1], accentColor[2]); // Accent blue divider line
      doc.setLineWidth(0.25);
      doc.line(margin, y, pageWidth - margin, y);
      
      y += 2.5;
    };

    // ── 2. SUMMARY SECTION ──
    drawSectionHeader("SUMMARY");
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    
    const summaryLines = doc.splitTextToSize(resumeData.shortSummary, contentWidth);
    doc.text(summaryLines, margin, y);
    y += summaryLines.length * 3.2 + 1.2;

    // ── 3. EDUCATION SECTION ──
    drawSectionHeader("EDUCATION");
    doc.setFontSize(8);
    
    resumeData.education.forEach((edu, i) => {
      // Only show top 2 institutions to fit one-page constraint
      if (i > 1) return;

      // Line 1: Institution & Location
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text(edu.institution, margin, y);
      
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
      doc.text(edu.location, pageWidth - margin, y, { align: 'right' });
      
      y += 3.2;
      
      // Line 2: Degree & Duration
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);
      doc.text(edu.degree, margin, y);
      
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
      doc.text(edu.duration, pageWidth - margin, y, { align: 'right' });
      
      y += 4.0;
    });

    // ── 4. TECHNICAL SKILLS SECTION ──
    drawSectionHeader("TECHNICAL SKILLS");
    doc.setFontSize(8);
    
    resumeData.skills.forEach((skill) => {
      y = drawBoldPrefixParagraph(
        doc,
        margin,
        y,
        "",
        `${skill.category}: `,
        skill.items.join(', '),
        contentWidth,
        3.2
      );
      y += 1.0;
    });

    // ── 5. WORK EXPERIENCE SECTION ──
    drawSectionHeader("WORK EXPERIENCE");
    doc.setFontSize(8);

    resumeData.experience.forEach((exp) => {
      // Line 1: Company & Duration
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text(exp.company, margin, y);
      
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
      doc.text(exp.duration, pageWidth - margin, y, { align: 'right' });
      
      y += 3.2;
      
      // Line 2: Role & Location
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
      doc.text(exp.role, margin, y);
      
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
      doc.text(exp.location, pageWidth - margin, y, { align: 'right' });
      
      y += 3.6;
      
      // Bullet points (draw 4 to 5 bullet points to fill the page and remove the gap)
      exp.bullets.slice(0, 5).forEach((bullet) => {
        y = drawBoldPrefixParagraph(
          doc,
          margin + 2.0,
          y,
          "•  ",
          "",
          bullet,
          contentWidth - 2.0,
          3.2
        );
        y += 0.8;
      });
      
      y += 1.0;
    });

    // ── 6. PROJECTS SECTION ──
    drawSectionHeader("PROJECTS");
    doc.setFontSize(8);

    resumeData.projects.forEach((proj) => {
      let displayTitle = proj.title;
      if (displayTitle.toLowerCase().includes('nexttrip')) {
        displayTitle = 'Moxsend AI';
      } else if (displayTitle.toLowerCase().includes('ujjwal')) {
        displayTitle = 'Ujjwal-Hub (Patent in Progress)';
      }

      // Line 1: Title & Tech Stack (Left) & Duration (Right)
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text(displayTitle, margin, y);
      
      const titleWidth = doc.getTextWidth(displayTitle);
      
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
      const techStr = `  [${proj.stack.slice(0, 5).join(', ')}]`;
      doc.text(techStr, margin + titleWidth, y);
      
      doc.text(proj.duration, pageWidth - margin, y, { align: 'right' });
      
      y += 3.6;

      // Bullet descriptions (draw 3 key bullet points, ensuring they are single-lined)
      proj.bullets.slice(0, 3).forEach((bullet) => {
        y = drawBoldPrefixParagraph(
          doc,
          margin + 2.0,
          y,
          "•  ",
          "",
          bullet,
          contentWidth - 2.0,
          3.2
        );
        y += 0.8;
      });
      
      y += 1.0;
    });

    // ── 7. ACHIEVEMENTS SECTION ──
    drawSectionHeader("ACHIEVEMENTS");
    doc.setFontSize(8);

    resumeData.achievements.forEach((ach) => {
      y = drawBoldPrefixParagraph(
        doc,
        margin,
        y,
        "•  ",
        `${ach.title}: `,
        ach.description,
        contentWidth,
        3.2
      );
      y += 1.0;
    });

    // ── 8. CERTIFICATIONS SECTION ──
    drawSectionHeader("CERTIFICATIONS");
    doc.setFontSize(8);
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);

    // Dual Column layout to fit certifications cleanly on same page
    const certs = resumeData.certifications;
    const mid = Math.ceil(certs.length / 2);
    const colLeft = certs.slice(0, mid);
    const colRight = certs.slice(mid);
    
    let leftY = y;
    colLeft.forEach((c) => {
      leftY = drawBoldPrefixParagraph(
        doc,
        margin,
        leftY,
        "•  ",
        "",
        `${c.name} (${c.issuer})`,
        contentWidth / 2 - 2,
        3.2
      );
      leftY += 0.8;
    });

    let rightY = y;
    colRight.forEach((c) => {
      rightY = drawBoldPrefixParagraph(
        doc,
        margin + contentWidth / 2 + 2,
        rightY,
        "•  ",
        "",
        `${c.name} (${c.issuer})`,
        contentWidth / 2 - 2,
        3.2
      );
      rightY += 0.8;
    });

    // Trigger immediate PDF download
    doc.save('Dileep_Sai_Galla_Resume.pdf');
  } catch (error) {
    console.error('CRITICAL ERROR GENERATING PDF:', error);
    alert('Error generating PDF: ' + (error as Error).message);
  }
};
