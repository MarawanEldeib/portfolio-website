# TODO

## 🔥 Priority 1 - Email Testing
- [ ] Get Resend API key from [resend.com/api-keys](https://resend.com/api-keys)
- [ ] Add real API key to `.env.local`
- [ ] Test contact form email delivery
- [ ] Verify file attachments work
- [ ] (Production) Verify domain in Resend dashboard
- [ ] (Production) Update `from` email in `app/api/contact/route.ts`

## 📝 Priority 2 - Content Updates
- [ ] Add organization logos to `/public/images/logos/`
- [ ] Add project screenshots
- [ ] Add certificate images
- [ ] Update certificate URLs (replace placeholders)
- [ ] Add project video demos (optional)

## 🚀 Priority 3 - Deploy
- [ ] Push final changes to GitHub
- [ ] Deploy to Vercel
- [ ] Add environment variables in Vercel dashboard:
  - `RESEND_API_KEY`
  - `CONTACT_EMAIL`
  - `NEXT_PUBLIC_SITE_URL`
- [ ] Enable Vercel Analytics (optional)

## ⚡ Future Enhancements
- [ ] Add CAPTCHA (reCAPTCHA v3)
- [ ] Add more projects
- [ ] Manual theme toggle button
- [ ] Add image blur placeholders
- [ ] Optimize Framer Motion imports

---

✅ **Completed**:
- Performance optimizations (lazy loading, GPU acceleration, font optimization)
- Email integration (Resend API fully implemented)
- Section reordering (optimized for recruiters)
- Shared IntersectionObserver hook
- Removed duplicate UI elements
- Fixed 404 errors (organization logos)
- Loading screen simplification
- Skills redesign, Languages section
- Dark mode, File/URL upload
- Form validation
- **Vercel Analytics integration** (custom event tracking for CV downloads, form submissions, certificate views, external links)
