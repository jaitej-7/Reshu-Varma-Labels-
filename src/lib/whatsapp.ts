export const RESHU_VARMA_WHATSAPP = '919933334489';
export const RESHU_VARMA_PHONE = '+91 7893405600';

export function getProductWhatsAppUrl(productName: string, sku: string): string {
  const text = encodeURIComponent(
    `Hello Reshu Varma Label, I am interested in inquiring about the bespoke piece: "${productName}" (SKU: ${sku}). Could you please share availability, customization options, and studio consultation slots?`
  );
  return `https://wa.me/${RESHU_VARMA_WHATSAPP}?text=${text}`;
}

export function getGeneralWhatsAppUrl(message?: string): string {
  const defaultText = encodeURIComponent(
    `Hello Reshu Varma Label, I would like to inquire about your bespoke bridal couture collections and book a private consultation.`
  );
  const text = message ? encodeURIComponent(message) : defaultText;
  return `https://wa.me/${RESHU_VARMA_WHATSAPP}?text=${text}`;
}

export function getAppointmentWhatsAppUrl(
  customerName: string,
  date: string,
  time: string,
  type: string
): string {
  const text = encodeURIComponent(
    `Hello Reshu Varma Label, I have booked a ${type === 'in_person' ? 'Private Studio Atelier Visit' : 'Virtual Video Consultation'} for ${customerName} on ${date} at ${time}. Looking forward to connecting!`
  );
  return `https://wa.me/${RESHU_VARMA_WHATSAPP}?text=${text}`;
}
