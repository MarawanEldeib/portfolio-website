# Certificate URLs Setup Guide

## Overview
"View Certificate" buttons have been added to all major sections of your portfolio. Simply add URLs to display the buttons.

## Where to Add Certificate URLs

### 1. **Certifications Section** (`lib/data.ts`)

```typescript
export const certifications = [
  {
    id: 1,
    title: "Front-End Web Development with React",
    issuer: "The Hong Kong University of Science and Technology",
    date: "2022-03",
    image: "",
    credentialUrl: "https://coursera.org/verify/YOUR_CERT_ID", // ← Add here
  },
  // ... more certifications
];
```

**Button Color**: Blue (`bg-blue-600`)

---

### 2. **Awards Section** (`lib/data.ts`)

```typescript
export const awards = [
  {
    id: 1,
    title: "Best Research Project",
    issuer: "Multimedia University",
    date: "2024-10",
    description: "Awarded for MangoVision...",
    image: "",
    certificateUrl: "https://your-university.edu/awards/YOUR_CERT.pdf", // ← Add here
  },
  // ... more awards
];
```

**Button Color**: Yellow (`bg-yellow-600`)

---

### 3. **Work Experience** (`lib/data.ts`)

```typescript
export const timeline = [
  {
    id: 1,
    type: "work",
    title: "Student Assistant (Hiwi)",
    organization: "Fraunhofer IOSB",
    // ... other fields
    certificateUrl: "https://drive.google.com/file/d/YOUR_REFERENCE_LETTER", // ← Add here
  },
  {
    id: 2,
    type: "work",
    title: "Software Engineer Intern",
    organization: "AirAsia",
    // ... other fields
    certificateUrl: "https://airasia.com/certificates/YOUR_CERT.pdf", // ← Add here
  },
];
```

**Button Color**: Blue (`bg-blue-600`)
**Note**: These can be reference letters, completion certificates, or offer letters

---

### 4. **Education** (`lib/data.ts`)

```typescript
export const timeline = [
  {
    id: 3,
    type: "education",
    title: "Master of Science in Software Engineering",
    organization: "Stuttgart University",
    // ... other fields
    certificateUrl: "https://uni-stuttgart.de/transcripts/YOUR_TRANSCRIPT.pdf", // ← Add here
  },
  {
    id: 4,
    type: "education",
    title: "Bachelor of Engineering (Hons.) in Computer Engineering",
    organization: "Multimedia University",
    // ... other fields
    certificateUrl: "https://mmu.edu.my/degree/YOUR_DEGREE_CERT.pdf", // ← Add here
  },
];
```

**Button Color**: Green (`bg-green-600`)
**Note**: These can be degree certificates, transcripts, or enrollment letters

---

## Button Visibility Rules

- **Buttons only appear when URLs are added**
- Empty strings (`""`) or `undefined` = No button displayed
- Valid URL = Button appears automatically

## Supported URL Types

✅ **Direct PDFs**: `https://example.com/certificate.pdf`
✅ **Google Drive**: `https://drive.google.com/file/d/FILE_ID/view`
✅ **Credential Platforms**: 
   - Coursera: `https://coursera.org/verify/CERT_ID`
   - Udemy: `https://udemy.com/certificate/CERT_ID`
   - LinkedIn Learning: `https://linkedin.com/learning/certificates/CERT_ID`
✅ **University Portals**: Any institutional verification URL
✅ **Cloud Storage**: Dropbox, OneDrive, etc.

## Button Features

- 🔗 Opens in new tab
- 🔒 Security attributes (`rel="noopener noreferrer"`)
- 🎨 Matching color schemes per section
- 📱 Responsive design
- ✨ Hover effects

## Example Setup

```typescript
// Complete example with all URLs
{
  id: 1,
  title: "Machine Learning Specialization",
  issuer: "Stanford University & DeepLearning.AI",
  date: "2023-08",
  image: "/images/certs/ml-stanford.png",
  credentialUrl: "https://coursera.org/verify/ABC123XYZ", // ✓ Button will show
}

{
  id: 2,
  title: "AWS Certified Solutions Architect",
  issuer: "Amazon Web Services",
  date: "2024-05",
  image: "/images/certs/aws-cert.png",
  credentialUrl: "", // ✗ No button (empty string)
}
```

## Privacy Note

If you prefer not to share certain certificates publicly, simply leave the `certificateUrl` field empty or set to `""`. The button won't appear, but the certification will still be displayed beautifully.

---

**Your portfolio now has professional certificate verification across all sections!** 🎓
