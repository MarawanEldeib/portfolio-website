import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const VISITS_FILE = path.join(DATA_DIR, 'visits.json');

interface VisitData {
  date: string;
  count: number;
  paths: { [key: string]: number };
  referrers: { [key: string]: number };
}

interface VisitsStore {
  [date: string]: VisitData;
}

async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

async function getVisitsData(): Promise<VisitsStore> {
  try {
    await ensureDataDir();
    const data = await fs.readFile(VISITS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return {};
  }
}

async function saveVisitsData(data: VisitsStore) {
  await ensureDataDir();
  await fs.writeFile(VISITS_FILE, JSON.stringify(data, null, 2));
}

export async function POST(request: NextRequest) {
  try {
    const { pathname, referrer } = await request.json();

    const today = new Date().toISOString().split('T')[0];
    const visitsData = await getVisitsData();

    if (!visitsData[today]) {
      visitsData[today] = {
        date: today,
        count: 0,
        paths: {},
        referrers: {}
      };
    }

    visitsData[today].count += 1;
    visitsData[today].paths[pathname] = (visitsData[today].paths[pathname] || 0) + 1;

    if (referrer && referrer !== 'direct') {
      visitsData[today].referrers[referrer] = (visitsData[today].referrers[referrer] || 0) + 1;
    }

    await saveVisitsData(visitsData);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error tracking visit:', error);
    return NextResponse.json({ error: 'Failed to track visit' }, { status: 500 });
  }
}
