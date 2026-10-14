// Formatting utilities for currency, dates, and names

export function formatMoney(amount: number, currency = 'so‘m'): string {
  if (isNaN(amount)) return `0 ${currency}`;
  const formatted = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return `${formatted} ${currency}`;
}

export function formatDateUz(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const day = String(d.getDate()).padStart(2, '0');
    const monthsUz = [
      'yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun',
      'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr'
    ];
    const month = monthsUz[d.getMonth()];
    const year = d.getFullYear();
    return `${day}-${month}, ${year}-yil`;
  } catch {
    return dateStr;
  }
}

export function formatTimeUz(timeStr: string): string {
  if (!timeStr) return '';
  return timeStr.slice(0, 5);
}
