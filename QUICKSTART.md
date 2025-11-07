# Quick Start Guide - Edit Your Portfolio Data

## 📍 Main File to Edit: `lib/data.ts`

This is the ONLY file you need to edit to customize all your portfolio content!

### Step 1: Personal Information

```typescript
export const personalInfo = {
  name: "John Doe",              // ← Change this
  title: "Full Stack Developer",  // ← Your job title
  email: "john@example.com",      // ← Your email
  phone: "+1 234 567 8900",       // ← Your phone
  linkedin: "https://linkedin.com/in/johndoe",  // ← Your LinkedIn
  github: "https://github.com/johndoe",         // ← Your GitHub
  location: "New York, USA",      // ← Your location
  workPermit: {
    hasPermit: true,              // ← Do you have work permit?
    details: "US Citizen",        // ← Work permit details
  },
};
```

### Step 2: Add Your Skills

Edit the skills object with your actual skills and proficiency levels (0-100):

```typescript
export const skills = {
  frontend: [
    { name: "React", level: 90 },     // ← Add/edit skills
    { name: "Next.js", level: 85 },
    // Add more...
  ],
  backend: [...],
  // Edit all categories
};
```

### Step 3: Add Your Projects

```typescript
export const projects = [
  {
    id: 1,
    title: "My Awesome Project",           // ← Project name
    description: "What it does...",        // ← Description
    image: "/images/project1.jpg",         // ← Add image to public/images/
    tech: ["React", "Node.js", "Docker"],  // ← Technologies used
    github: "https://github.com/...",      // ← GitHub link (optional)
    live: "https://myproject.com",         // ← Live demo link (optional)
    status: "completed",                   // ← "completed" or "ongoing"
  },
  // Add more projects...
];
```

### Step 4: Add Work Experience & Education

```typescript
export const timeline = [
  {
    id: 1,
    type: "work",                    // ← "work" or "education"
    title: "Senior Developer",       // ← Job title or degree
    organization: "Tech Company",    // ← Company or university
    location: "Berlin, Germany",     // ← Location
    startDate: "2023-01",           // ← Format: YYYY-MM
    endDate: null,                  // ← null if current, or "2024-06"
    description: "What you did...",  // ← Job/study description
    skills: ["React", "AWS"],       // ← Skills used/learned
  },
  // Add more experiences...
];
```

### Step 5: Add Certifications

```typescript
export const certifications = [
  {
    id: 1,
    title: "AWS Certified Developer",        // ← Certification name
    issuer: "Amazon Web Services",           // ← Issuing organization
    date: "2024-03",                        // ← Format: YYYY-MM
    image: "/images/cert1.jpg",             // ← Certificate image
    credentialUrl: "https://verify.com",    // ← Verification link
  },
];
```

### Step 6: Add Awards (Optional)

```typescript
export const awards = [
  {
    id: 1,
    title: "Best Innovation Award",
    issuer: "Tech Conference 2024",
    date: "2024-05",
    description: "Awarded for...",
    image: "/images/award1.jpg",
  },
];
```

## 🖼️ Adding Images

1. Save your images in `public/images/` folder
2. Use the filename in your data: `"/images/filename.jpg"`

**Recommended images:**
- Project screenshots/thumbnails
- Certificate images
- Award photos
- Profile photos for recommendations

## 📄 Adding Your CV

1. Save your PDF resume as `public/cv/resume.pdf`
2. It will automatically be available for download on the site

## 🌍 Translations

The site supports English and German. Edit these files:
- `messages/en.json` - English text
- `messages/de.json` - German text

Only edit the VALUES, not the keys:
```json
{
  "hero": {
    "greeting": "Hi, I'm",  // ← Change this text only
  }
}
```

## ✅ Checklist

- [ ] Update personal info in `lib/data.ts`
- [ ] Add your skills with levels
- [ ] Add at least 2-3 projects
- [ ] Add work experience and education
- [ ] Add certifications (if any)
- [ ] Add project images to `public/images/`
- [ ] Add CV PDF to `public/cv/resume.pdf`
- [ ] Test both English and German versions
- [ ] Verify all links work

## 🎨 Optional Customizations

**Colors:** Edit `app/globals.css` to change the color scheme
**Fonts:** Edit `app/[locale]/layout.tsx` to change fonts
**Sections:** Hide/show sections in `app/[locale]/page.tsx`

---

**Need help?** Check `SETUP_COMPLETE.md` for full documentation!
