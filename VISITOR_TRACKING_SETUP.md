# Daily Visitor Email Notifications Setup Guide

This system tracks website visits and sends you a daily email digest with visitor statistics.

## 📋 Overview

- **Visit Tracking**: Automatically tracks every page visit with path and referrer data
- **Daily Email**: Receive a beautiful HTML email every morning at 8 AM UTC with yesterday's statistics
- **Privacy-First**: Data stored locally in `/data/visits.json`, no third-party analytics
- **Lightweight**: Minimal performance impact on your site

## 🚀 Setup Instructions

### 1. Configure Environment Variables

Copy `.env.local.example` to `.env.local` and add the following:

```env
# Required for email functionality
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxx
NOTIFICATION_EMAIL=your_email@example.com

# Optional: Customize the sender email
RESEND_FROM_EMAIL=Portfolio Analytics <noreply@yourdomain.com>

# Required: Secure your cron endpoint
CRON_SECRET=your_secure_random_string_here

# Optional: Enable tracking in development
NEXT_PUBLIC_ENABLE_TRACKING=true
```

### 2. Get a Resend API Key

1. Go to [resend.com](https://resend.com) and sign up
2. Create a new API key
3. Add it to your `.env.local` as `RESEND_API_KEY`
4. If using a custom domain, verify it in Resend dashboard

### 3. Generate a Cron Secret

Generate a secure random string for `CRON_SECRET`:

```bash
# On Mac/Linux
openssl rand -base64 32

# Or use any password generator
```

Add this to both:
- Your local `.env.local` file
- Vercel environment variables (Project Settings → Environment Variables)

### 4. Deploy to Vercel

The `vercel.json` file is already configured to run the daily digest at 8 AM UTC.

1. Push your changes to GitHub
2. Deploy to Vercel
3. Verify the cron job is registered in Vercel Dashboard → Cron Jobs

### 5. Add Environment Variables to Vercel

In your Vercel project settings, add:
- `RESEND_API_KEY`
- `NOTIFICATION_EMAIL`
- `RESEND_FROM_EMAIL` (optional)
- `CRON_SECRET` (must match your local value)

## 📊 What You'll Receive

Every morning at 8 AM UTC, you'll get an email with:

- **Total daily visits**
- **Top 5 most visited pages**
- **Top 5 referrer sources**
- Beautiful, responsive HTML design

## 🧪 Testing

### Test Visit Tracking

1. Start your dev server: `npm run dev`
2. Visit different pages
3. Check `data/visits.json` to see tracked data

### Test Email Sending

Use this curl command (replace values):

```bash
curl -X GET "http://localhost:3000/api/send-daily-digest" \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

## 📁 File Structure

```
/app
  /api
    /track-visit
      route.ts          # Tracks page visits
    /send-daily-digest
      route.ts          # Sends daily email
/components
  /analytics
    VisitTracker.tsx    # Client component for tracking
/data
  visits.json           # Local storage for visit data
vercel.json             # Cron job configuration
```

## 🔒 Security

- Visit tracking runs client-side but data is stored server-side
- Cron endpoint is protected with `CRON_SECRET`
- Only works in production by default (unless `NEXT_PUBLIC_ENABLE_TRACKING` is set)
- No sensitive user data is collected

## 🛠️ Customization

### Change Email Schedule

Edit `vercel.json`:

```json
{
  "crons": [{
    "path": "/api/send-daily-digest",
    "schedule": "0 8 * * *"  // Cron format: minute hour day month weekday
  }]
}
```

Examples:
- `0 8 * * *` - Daily at 8 AM UTC
- `0 9 * * 1` - Every Monday at 9 AM UTC
- `0 */6 * * *` - Every 6 hours

### Customize Email Design

Edit the `generateEmailHTML` function in `/app/api/send-daily-digest/route.ts`

### Track Additional Data

Modify `/app/api/track-visit/route.ts` to capture more information like:
- User agent (browser/device)
- Screen resolution
- Time spent on page
- Geographic location (via IP)

## 📈 Vercel Cron Job Limits

- **Hobby Plan**: 1 cron job per project
- **Pro Plan**: Unlimited cron jobs
- Cron jobs run with a 60-second timeout

## 🐛 Troubleshooting

### No emails received?

1. Check Vercel logs for errors
2. Verify `RESEND_API_KEY` is correct
3. Check Resend dashboard for delivery status
4. Ensure `NOTIFICATION_EMAIL` is set
5. Check spam folder

### Tracking not working?

1. Verify `VisitTracker` is imported in layout
2. Check browser console for errors
3. Enable in dev with `NEXT_PUBLIC_ENABLE_TRACKING=true`
4. Verify `/data` directory has write permissions

### Cron job not running?

1. Check Vercel Dashboard → Cron Jobs
2. Verify `vercel.json` is in project root
3. Ensure `CRON_SECRET` matches in both local and Vercel
4. Check deployment logs

## 📞 Need Help?

- [Resend Documentation](https://resend.com/docs)
- [Vercel Cron Jobs](https://vercel.com/docs/cron-jobs)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

---

**Note**: This system is designed for personal portfolio sites with moderate traffic. For high-traffic sites, consider using a database instead of JSON file storage.
