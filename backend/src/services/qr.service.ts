import QRCode from 'qrcode';

export async function generateQRCode(data: string): Promise<string> {
  try {
    const qrDataUrl = await QRCode.toDataURL(data, {
      width: 300,
      margin: 2,
      color: {
        dark: '#4A0E2E',
        light: '#FFFFFF',
      },
    });
    return qrDataUrl;
  } catch (err) {
    console.error('QR generation error:', err);
    throw new Error('Failed to generate QR code');
  }
}
