# Video and Code Buttons Setup Guide

## Overview
Your Projects section now has **three buttons** for each project:
1. **Code Button** (GitHub) - Black background with GitHub icon
2. **Demo Button** (Live URL) - Border with external link icon
3. **Video Button** (NEW!) - Red background with play icon

## How to Add Video Links

Open `lib/data.ts` and add video URLs to your projects:

```typescript
export const projects = [
  {
    id: 1,
    title: "MangoVision",
    // ... other fields
    github: "https://github.com/MarawanEldeib/mangovision",
    live: undefined,
    video: "https://youtube.com/watch?v=YOUR_VIDEO_ID", // ← Add your video URL here
    status: "completed" as const,
  },
  {
    id: 2,
    title: "IKHLAS Mobile App",
    // ... other fields
    github: "https://github.com/MarawanEldeib",
    live: "https://ikhlas-demo.com",
    video: "https://youtube.com/watch?v=ANOTHER_VIDEO_ID", // ← Add your video URL here
    status: "completed" as const,
  },
  // ... more projects
];
```

## Supported Video Platforms
- YouTube: `https://youtube.com/watch?v=VIDEO_ID`
- Vimeo: `https://vimeo.com/VIDEO_ID`
- Loom: `https://loom.com/share/VIDEO_ID`
- Google Drive: `https://drive.google.com/file/d/FILE_ID/view`
- Any direct video link

## Button Visibility
- **Code button** appears only if `github` field has a value
- **Demo button** appears only if `live` field has a value
- **Video button** appears only if `video` field has a value

Set any field to `undefined` to hide that button.

## Button Styling
- **Code**: Dark background, white text, GitHub icon
- **Demo**: Border style, external link icon
- **Live**: Red background (YouTube-style), white text, play icon

All buttons open links in a new tab with proper security attributes.
