import { NextRequest, NextResponse } from 'next/server';

// Colour palettes per category type
const PALETTES: Record<string, { bg: string; fg: string; icon: string }> = {
  refrigerator: { bg: '#e8f0fe', fg: '#1a3a8f', icon: '❄️' },
  oven:         { bg: '#fff3e0', fg: '#7c3a00', icon: '🔥' },
  tv:           { bg: '#e8eaf6', fg: '#283593', icon: '📺' },
  bicycle:      { bg: '#e8f5e9', fg: '#1b5e20', icon: '🚲' },
  mattress:     { bg: '#fce4ec', fg: '#880e4f', icon: '🛏️' },
  default:      { bg: '#f1f5f9', fg: '#334155', icon: '🛒' },
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = (searchParams.get('type') || 'default').toLowerCase();
  const label = searchParams.get('label') || 'Product Image';
  const w = Math.min(Number(searchParams.get('w') || 600), 1200);
  const h = Math.min(Number(searchParams.get('h') || w), 1200);

  const palette = PALETTES[type] || PALETTES.default;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${palette.bg};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${palette.bg}cc;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)" rx="8"/>
  <text x="50%" y="42%" dominant-baseline="middle" text-anchor="middle" font-size="${Math.round(w * 0.18)}" fill="${palette.fg}22">⬜</text>
  <text x="50%" y="48%" dominant-baseline="middle" text-anchor="middle" font-size="${Math.round(w * 0.12)}">${palette.icon}</text>
  <text x="50%" y="66%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui,sans-serif" font-size="${Math.round(w * 0.045)}" font-weight="600" fill="${palette.fg}99">${label.substring(0, 30)}</text>
  <text x="50%" y="76%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui,sans-serif" font-size="${Math.round(w * 0.032)}" fill="${palette.fg}66">Priyantha Trading Agencies</text>
</svg>`;

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=86400, immutable',
    },
  });
}
