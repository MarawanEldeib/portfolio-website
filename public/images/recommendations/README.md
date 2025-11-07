# Recommendation Profile Images

Place profile images here for your recommendations.

## Required Images

1. **sarah-johnson.jpg** (or similar name)
   - Dr. Sarah Johnson - Fraunhofer IOSB
   
2. **ahmad-rahman.jpg** (or similar name)
   - Ahmad Rahman - AirAsia
   
3. **michael-weber.jpg** (or similar name)
   - Prof. Dr. Michael Weber - Multimedia University

## Image Specifications

- **Format**: JPG, PNG, or WebP
- **Size**: 256x256px (or larger square)
- **Aspect Ratio**: 1:1 (square)
- **File Size**: Under 200KB recommended
- **Quality**: Professional headshot with good lighting

## How to Add

1. Save profile images in this directory
2. Update `lib/data.ts` with the correct file paths:
   ```typescript
   image: "/images/recommendations/sarah-johnson.jpg"
   ```

## Placeholder Behavior

If you leave the `image` field empty (`""`), a purple gradient circle with a user icon will appear automatically.
