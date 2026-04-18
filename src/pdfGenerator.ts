import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FormData } from './types';
import { format } from 'date-fns';

const BRAND_COLOR = [85, 97, 139] as [number, number, number];

export function generatePDF(data: FormData) {
  const doc = new jsPDF();
  const logoBase64 = "data:image/png;base64,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";

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  
  // Title Page / Initial Write
  doc.setFontSize(22);
  doc.setTextColor(...BRAND_COLOR);
  doc.text("BETREUUNGSFRAGEBOGEN", pageWidth / 2, 45, { align: 'center' });
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Erstellt am: ${format(new Date(), 'dd.MM.yyyy')}`, pageWidth / 2, 52, { align: 'center' });

  // Helper to draw tables
  let startY = 60;
  
  const createSection = (title: string, bodyData: [string, string][]) => {
    // Filter out empty rows to keep PDF clean
    const filteredBody = bodyData.filter(row => row[1] !== "");
    if (filteredBody.length === 0) return;

    autoTable(doc, {
      startY,
      head: [[title, '']],
      body: filteredBody,
      theme: 'grid',
      headStyles: { fillColor: BRAND_COLOR, textColor: 255, fontSize: 12, fontStyle: 'bold' },
      columnStyles: {
        0: { cellWidth: 80, fontStyle: 'bold', textColor: 50 },
        1: { cellWidth: 'auto', textColor: 80 }
      },
      margin: { top: 35, bottom: 25 }
    });
    startY = (doc as any).lastAutoTable.finalY + 10;
  };

  // Section 1
  createSection("1. Standort & Allgemeines", [
    ["Adresse", `${data.address}, ${data.street}`],
    ["Ort / Region", data.cityRegion],
    ["PLZ / Land", data.zipCountry],
    ["Beginn der Dienstleistung", data.startDateOption === "Anderes" ? data.startDateCustom : data.startDateOption],
    ["Anzahl der Personen", data.numberOfPersons]
  ]);

  // Section 2: Person 1
  createSection("2. Erste zu betreuende Person", [
    ["Name", `${data.p1_firstName} ${data.p1_lastName}`],
    ["Geschlecht", data.p1_gender],
    ["Körpermerkmale", `Gewicht: ${data.p1_weight}kg, Größe: ${data.p1_height}cm`],
    ["Alter / Geburtsdatum", `${data.p1_age} / ${data.p1_birthDate}`],
    ["Stundenweise Betreuung?", data.p1_hourlyCare],
    ["Pflegegrad", data.p1_careLevel],
    ["Mobilitätsgrad", data.p1_mobility.join(', ')],
    ["Diagnosen", [...data.p1_diagnoses, data.p1_otherDiagnoses].filter(Boolean).join(', ')],
    ["Kontrolle", `Urin: ${data.p1_urineControl} | Stuhl: ${data.p1_stoolControl}`],
    ["An- und Auskleiden", data.p1_dressing],
    ["Tägliche Pflege", data.p1_dailyCare.join(', ')],
    ["Nachtdienste", `${data.p1_nightShifts} ${data.p1_nightShiftsReason ? '(' + data.p1_nightShiftsReason + ')' : ''}`],
    ["Körperpflege / Toilette / Baden", `${data.p1_bodyCare} / ${data.p1_toilet} / ${data.p1_bathing}`],
    ["Transfer notwendig?", `${data.p1_transferNeeded} ${data.p1_transferNeeded === 'Ja' ? '(' + data.p1_bedChairTransfer + ')' : ''}`],
    ["Ernährung", `Essen: ${data.p1_eating} | Diät: ${data.p1_diet} ${data.p1_otherDiets ? '(' + data.p1_otherDiets + ')' : ''}`],
    ["Tägliche Routine", data.p1_dailyRoutine],
    ["Spezielle Ausrüstung", [...data.p1_equipment, data.p1_otherEquipment].filter(Boolean).join(', ')]
  ]);

  // Section 3: Person 2
  if (data.hasSecondPerson === 'Ja') {
    createSection("3. Zweite zu betreuende Person", [
      ["Name", `${data.p2_firstName} ${data.p2_lastName}`],
      ["Geschlecht", data.p2_gender],
      ["Körpermerkmale", `Gewicht: ${data.p2_weight}kg, Größe: ${data.p2_height}cm`],
      ["Alter / Geburtsdatum", `${data.p2_age} / ${data.p2_birthDate}`],
      ["Stundenweise Betreuung?", data.p2_hourlyCare],
      ["Pflegegrad", data.p2_careLevel],
      ["Mobilitätsgrad", data.p2_mobility.join(', ')],
      ["Diagnosen", [...data.p2_diagnoses, data.p2_otherDiagnoses].filter(Boolean).join(', ')],
      ["Kontrolle", `Urin: ${data.p2_urineControl} | Stuhl: ${data.p2_stoolControl}`],
      ["An- und Auskleiden", data.p2_dressing],
      ["Tägliche Pflege", data.p2_dailyCare.join(', ')],
      ["Nachtdienste", `${data.p2_nightShifts} ${data.p2_nightShiftsReason ? '(' + data.p2_nightShiftsReason + ')' : ''}`],
      ["Körperpflege / Toilette / Baden", `${data.p2_bodyCare} / ${data.p2_toilet} / ${data.p2_bathing}`],
      ["Transfer notwendig?", `${data.p2_transferNeeded} ${data.p2_transferNeeded === 'Ja' ? '(' + data.p2_bedChairTransfer + ')' : ''}`],
      ["Ernährung", `Essen: ${data.p2_eating} | Diät: ${data.p2_diet} ${data.p2_otherDiets ? '(' + data.p2_otherDiets + ')' : ''}`],
      ["Tägliche Routine", data.p2_dailyRoutine],
      ["Spezielle Ausrüstung", [...data.p2_equipment, data.p2_otherEquipment].filter(Boolean).join(', ')]
    ]);
  }

  // Section 4
  createSection("4. Unterkunft", [
    ["Unterkunftsart", data.accommodationType],
    ["Internet / WLAN", data.internetWifi],
    ["Schlafzimmer f. Pflegekraft", data.caregiverBedroom],
    ["Fußläufige Einkaufsmögl.", data.shoppingWalkable ? "Ja" : "Nein"],
    ["Fernseher vorhanden", data.tvAvailable ? "Ja" : "Nein"],
    ["Haustiere", data.pets],
    ["Weitere Personen im Haus", `${data.otherPersonsInHousehold} ${data.otherPersonsDetails ? '(' + data.otherPersonsDetails + ')' : ''}`],
    ["Beziehung zur Person", data.relationshipToPatient]
  ]);

  // Section 5
  createSection("5. Anforderungen an die Pflegekraft", [
    ["Geschlecht", data.req_gender.join(', ')],
    ["Deutschkenntnisse", data.req_german.join(', ')],
    ["Alter", data.req_age.join(', ')],
    ["Führerschein", data.req_driversLicense],
    ["Erfahrung", data.req_experience.join(', ')],
    ["Rauchen", data.req_smoking],
    ["Weitere Anforderungen", data.req_otherRequirements],
    ["Wochenbudget Einkäufe", data.req_weeklyBudget ? `${data.req_weeklyBudget} €` : ""]
  ]);

  // Section 6
  createSection("6. Kontaktdaten", [
    ["Name", `${data.contact_title} ${data.contact_firstName} ${data.contact_lastName}`],
    ["Beziehung zum Kunden", data.contact_relationship],
    ["Adresse", `${data.contact_address}, ${data.contact_street}, ${data.contact_zipCountry} ${data.contact_city}`],
    ["E-Mail", data.contact_email],
    ["Telefon", data.contact_phone],
    ["Wie gefunden?", data.contact_howFound],
    ["Weitere Kontaktperson", `${data.contact_otherPersonFirstName} ${data.contact_otherPersonLastName} (Tel: ${data.contact_otherPersonPhone})`]
  ]);

  // Section 7: AGB & Unterschrift
  if (data.agbAccepted) {
    const formattedDate = data.signatureDate ? format(new Date(data.signatureDate), 'dd.MM.yyyy HH:mm') : format(new Date(), 'dd.MM.yyyy HH:mm');
    createSection("7. Rechtlicher Hinweis & Bestätigung", [
      ["Zustimmung", "Der/Die Unterzeichnende akzeptiert die Allgemeinen Geschäftsbedingungen (AGB) und die Datenschutzerklärung von HomeCare24."],
      ["Digitale Unterschrift", data.signatureName],
      ["Datum & Uhrzeit", `${formattedDate} Uhr`]
    ]);
  }

  // Add Headers, Footers, and Page Numbers at the very end
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    
    // Header
    if (logoBase64) {
      try {
        const imgProps = doc.getImageProperties(logoBase64);
        const ratio = imgProps.width / imgProps.height;
        const targetHeight = 15;
        const targetWidth = targetHeight * ratio;
        doc.addImage(logoBase64, 'PNG', 14, 10, targetWidth, targetHeight, undefined, 'FAST');
      } catch (e) {
        // Fallback explicitly to 25x15 if properties retrieval fails
        try {
          doc.addImage(logoBase64, 'PNG', 14, 10, 25, 15, undefined, 'FAST');
        } catch (innerE) {
          doc.setFontSize(14);
          doc.setTextColor(...BRAND_COLOR);
          doc.text("HomeCare24", 14, 20);
        }
      }
    } else {
      doc.setFontSize(14);
      doc.setTextColor(...BRAND_COLOR);
      doc.text("HomeCare24", 14, 20);
    }
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("HomeCare24 – Vermittlung von Betreuungskräften / Vanessa Wiehler", pageWidth - 14, 20, { align: 'right' });
    
    doc.setDrawColor(...BRAND_COLOR);
    doc.setLineWidth(0.5);
    doc.line(14, 28, pageWidth - 14, 28);
    
    // Footer
    doc.line(14, pageHeight - 20, pageWidth - 14, pageHeight - 20);
    doc.setFontSize(9);
    doc.setTextColor(100);
    doc.text(`www.wiehler-homecare24.de | Handy: 0151 44584307 | E-Mail: info@wiehler-homecare24.de`, pageWidth / 2, pageHeight - 12, { align: 'center' });
    doc.text(`Seite ${i} von ${pageCount}`, pageWidth - 14, pageHeight - 12, { align: 'right' });
  }

  // Save the PDF
  doc.save('Betreuungsfragebogen_HomeCare24.pdf');
}
