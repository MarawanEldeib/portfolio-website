import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { promises as fs } from 'fs';
import path from 'path';

const resend = new Resend(process.env.RESEND_API_KEY);
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

async function getVisitsData(): Promise<VisitsStore> {
  try {
    const data = await fs.readFile(VISITS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return {};
  }
}

function generateEmailHTML(data: VisitData): string {
  const topPaths = Object.entries(data.paths)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const topReferrers = Object.entries(data.referrers)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 8px; text-align: center; margin-bottom: 30px; }
          .header h1 { margin: 0; font-size: 28px; }
          .header .date { font-size: 14px; opacity: 0.9; margin-top: 8px; }
          .metric-card { background: #f8f9fa; border-left: 4px solid #667eea; padding: 20px; margin-bottom: 20px; border-radius: 4px; }
          .metric-card h2 { margin-top: 0; color: #667eea; font-size: 18px; }
          .big-number { font-size: 48px; font-weight: bold; color: #667eea; margin: 10px 0; }
          .list-item { padding: 10px; border-bottom: 1px solid #e0e0e0; display: flex; justify-content: space-between; align-items: center; }
          .list-item:last-child { border-bottom: none; }
          .list-item .label { flex: 1; color: #555; }
          .list-item .value { font-weight: bold; color: #667eea; }
          .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #888; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>📊 Daily Site Visit Report</h1>
          <div class="date">${data.date}</div>
        </div>

        <div class="metric-card">
          <h2>Total Visits</h2>
          <div class="big-number">${data.count}</div>
        </div>

        ${topPaths.length > 0 ? `
          <div class="metric-card">
            <h2>🔥 Top Pages</h2>
            ${topPaths.map(([path, count]) => `
              <div class="list-item">
                <span class="label">${path}</span>
                <span class="value">${count} ${count === 1 ? 'visit' : 'visits'}</span>
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${topReferrers.length > 0 ? `
          <div class="metric-card">
            <h2>🔗 Top Referrers</h2>
            ${topReferrers.map(([referrer, count]) => `
              <div class="list-item">
                <span class="label">${referrer}</span>
                <span class="value">${count} ${count === 1 ? 'visit' : 'visits'}</span>
              </div>
            `).join('')}
          </div>
        ` : ''}

        <div class="footer">
          <p>This is an automated daily report from your portfolio website.</p>
          <p>Powered by Resend</p>
        </div>
      </body>
    </html>
  `;
}

export async function GET(request: NextRequest) {
  try {
    // Verify cron secret for security (Vercel Cron Jobs send this header)
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const visitsData = await getVisitsData();
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const yesterdayData = visitsData[yesterday];

    if (!yesterdayData || yesterdayData.count === 0) {
      return NextResponse.json({
        message: 'No visits to report for yesterday',
        date: yesterday
      });
    }

    const recipientEmail = process.env.CONTACT_EMAIL;

    if (!recipientEmail) {
      return NextResponse.json(
        { error: 'CONTACT_EMAIL not configured' },
        { status: 500 }
      );
    }

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Portfolio Analytics <onboarding@resend.dev>',
      to: recipientEmail,
      subject: `📊 Daily Report: ${yesterdayData.count} visits on ${yesterday}`,
      html: generateEmailHTML(yesterdayData),
    });

    return NextResponse.json({
      success: true,
      message: `Email sent for ${yesterday}`,
      visits: yesterdayData.count
    });
  } catch (error) {
    console.error('Error sending daily digest:', error);
    return NextResponse.json(
      { error: 'Failed to send daily digest' },
      { status: 500 }
    );
  }
}
