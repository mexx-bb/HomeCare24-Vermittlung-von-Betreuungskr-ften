import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FormData } from './types';
import { format } from 'date-fns';
import logoDataUrl from './assets/logo.png?inline';

const BRAND_COLOR = [85, 97, 139] as [number, number, number];

export async function generatePDF(data: FormData) {
  const doc = new jsPDF();

  const fetchedLogo: string = logoDataUrl;

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
    if (fetchedLogo) {
      try {
        doc.addImage(fetchedLogo, 'PNG', 14, 8, 28, 17);
      } catch (e) {
        console.error("jsPDF addImage error:", e);
        doc.setFontSize(14);
        doc.setTextColor(...BRAND_COLOR);
        doc.text("HomeCare24", 14, 20);
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
