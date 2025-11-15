import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

interface VisitData {
  date: string;
  count: number;
  paths: { [key: string]: number };
  referrers: { [key: string]: number };
}

export async function POST(request: NextRequest) {
  try {
    const { pathname, referrer } = await request.json();

    const today = new Date().toISOString().split('T')[0];
    const key = `visits:${today}`;

    // Get current data for today
    const existingData = await kv.get<VisitData>(key);

    const visitsData: VisitData = existingData || {
      date: today,
      count: 0,
      paths: {},
      referrers: {}
    };

    // Update counts
    visitsData.count += 1;
    visitsData.paths[pathname] = (visitsData.paths[pathname] || 0) + 1;

    if (referrer && referrer !== 'direct') {
      visitsData.referrers[referrer] = (visitsData.referrers[referrer] || 0) + 1;
    }

    // Save back to KV with 90-day expiration
    await kv.set(key, visitsData, { ex: 60 * 60 * 24 * 90 });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error tracking visit:', error);
    return NextResponse.json({ error: 'Failed to track visit' }, { status: 500 });
  }
}
