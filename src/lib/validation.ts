// Input validation, security sanitation, and appointment conflict detection

export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}

export function validateUzPhone(phone: string): boolean {
  // Accepts formats: +998901234567, +998 90 123 45 67, 901234567
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  const re = /^(\+?998)?[0-9]{9}$/;
  return re.test(cleaned);
}

export function formatUzPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 9) {
    return `+998 (${digits.slice(0, 2)}) ${digits.slice(2, 5)}-${digits.slice(5, 7)}-${digits.slice(7, 9)}`;
  }
  if (digits.length === 12 && digits.startsWith('998')) {
    const d = digits.slice(3);
    return `+998 (${d.slice(0, 2)}) ${d.slice(2, 5)}-${d.slice(5, 7)}-${d.slice(7, 9)}`;
  }
  return phone;
}

export const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

export function validateFileUpload(file: { type: string; size: number }): { valid: boolean; error?: string } {
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: 'Faqat PDF, Word (DOCX/DOC) va rasm (JPG, PNG) formatidagi fayllar qabul qilinadi.',
    };
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: 'Fayl hajmi 10 MB dan oshmasligi kerak.',
    };
  }
  return { valid: true };
}

// Convert "HH:mm" to minutes from midnight
function timeToMinutes(timeStr: string): number {
  const [h, m] = timeStr.split(':').map(Number);
  return (h || 0) * 60 + (m || 0);
}

export interface ExistingSlot {
  appointment_date: string;
  start_time: string;
  end_time: string;
  status: string;
}

export function hasAppointmentConflict(
  existingSlots: ExistingSlot[],
  newDate: string,
  newStart: string,
  newEnd: string
): boolean {
  const newStartMin = timeToMinutes(newStart);
  const newEndMin = timeToMinutes(newEnd);

  return existingSlots.some((slot) => {
    if (slot.appointment_date !== newDate) return false;
    if (slot.status === 'Cancelled' || slot.status === 'Rejected') return false;

    const slotStartMin = timeToMinutes(slot.start_time);
    const slotEndMin = timeToMinutes(slot.end_time);

    // Overlap condition: startA < endB && startB < endA
    return newStartMin < slotEndMin && slotStartMin < newEndMin;
  });
}

export function sanitizeText(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
