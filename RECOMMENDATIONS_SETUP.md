# Recommendations Setup Guide

## Overview
A beautiful scrolling carousel displaying professional recommendations with profile images has been added to your portfolio.

## Features

### 🎨 Visual Design
- **Scrolling Carousel**: Auto-playing Swiper carousel with navigation
- **Profile Images**: Circular profile photos with purple gradient fallback
- **Quote Icon**: Large decorative quote mark
- **Gradient Cards**: Subtle gradient background with hover effects
- **Purple Theme**: Matches recommendation aesthetic

### 📱 Responsive Layout
- **Mobile**: 1 recommendation per view
- **Tablet**: 2 recommendations per view
- **Desktop**: 2 recommendations per view
- **Auto-scroll**: 6-second intervals

### 🔗 LinkedIn Integration
- Optional LinkedIn profile links
- Blue LinkedIn icon button
- Opens in new tab

## Adding Recommendations

### 1. Edit Data (`lib/data.ts`)

```typescript
export const recommendations = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    title: "Senior Research Scientist",
    company: "Fraunhofer IOSB",
    image: "/images/recommendations/sarah-johnson.jpg", // Add image path
    text: "Your recommendation text here...",
    linkedin: "https://linkedin.com/in/sarah-johnson", // Optional
  },
  {
    id: 2,
    name: "Ahmad Rahman",
    title: "Lead Software Engineer",
    company: "AirAsia",
    image: "/images/recommendations/ahmad-rahman.jpg",
    text: "Another great recommendation...",
    linkedin: "", // Leave empty to hide LinkedIn button
  },
];
```

### 2. Add Profile Images

**Create directory:**
```
public/images/recommendations/
```

**Add images:**
- Format: JPG, PNG, or WebP
- Recommended size: 256x256px (or larger square)
- Name: descriptive (e.g., `john-doe.jpg`)

**Example structure:**
```
public/
  images/
    recommendations/
      sarah-johnson.jpg
      ahmad-rahman.jpg
      michael-weber.jpg
```

### 3. Image Best Practices

✅ **Good Images:**
- Square aspect ratio (1:1)
- Professional headshot
- Clear face, good lighting
- 256px × 256px or larger
- Under 200KB file size

❌ **Avoid:**
- Group photos
- Blurry or dark images
- Very large file sizes (>1MB)
- Non-square crops

## Default Placeholder

If no image is provided (empty string `""`):
- Purple gradient circle appears
- User icon displayed
- Still looks professional!

## Sample Recommendations

The portfolio comes with 3 sample recommendations:
1. **Dr. Sarah Johnson** - Fraunhofer IOSB (Research mentor)
2. **Ahmad Rahman** - AirAsia (Team lead)
3. **Prof. Dr. Michael Weber** - Multimedia University (Academic supervisor)

**Replace these with your actual recommendations!**

## Getting Recommendations

### LinkedIn Method
1. Request recommendations on LinkedIn
2. Copy the text from your LinkedIn profile
3. Add to `lib/data.ts`
4. Link to their LinkedIn profile

### Email Method
1. Request written recommendation via email
2. Ask for permission to display on portfolio
3. Get their LinkedIn URL (optional)
4. Request profile photo or use initials fallback

## Field Explanations

| Field | Required | Description |
|-------|----------|-------------|
| `id` | ✅ Yes | Unique number for each recommendation |
| `name` | ✅ Yes | Full name of recommender |
| `title` | ✅ Yes | Job title/position |
| `company` | ✅ Yes | Company/organization name |
| `image` | ❌ No | Path to profile image (uses placeholder if empty) |
| `text` | ✅ Yes | Recommendation text (keep under 300 words) |
| `linkedin` | ❌ No | LinkedIn profile URL (hides button if empty) |

## Styling Colors

- **Border hover**: Purple (`border-purple-300`)
- **Quote icon**: Purple (`text-purple-600`)
- **Company name**: Purple (`text-purple-600`)
- **Profile border**: Purple (`border-purple-500`)
- **Placeholder gradient**: Purple to Pink

## Navigation

Recommendations appear in the menu between:
- **Before**: Certifications
- **After**: Contact

Section ID: `#recommendations`

---

**Your recommendations section is ready to showcase professional endorsements!** 🌟
