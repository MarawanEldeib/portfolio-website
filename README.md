# Marawan Eldeib - Portfolio Website

A modern, performant portfolio website built with Next.js 16, featuring AI-optimized animations, internationalization, and enterprise-grade security.

## 🚀 Features

- ✅ **Optimized Performance**: Lazy loading, GPU-accelerated animations, font optimization
- ✅ **Multi-language Support**: English, German (next-intl)
- ✅ **Dark Mode**: Automatic and manual theme switching
- ✅ **Email Integration**: Resend API for contact form
- ✅ **File Upload**: Secure CV/resume upload with validation
- ✅ **SEO Optimized**: Structured data, Open Graph, Twitter cards
- ✅ **Security**: CSP headers, rate limiting, file validation
- ✅ **Analytics Ready**: Built-in event tracking
- ✅ **Responsive Design**: Mobile-first approach
- ✅ **Type Safe**: Full TypeScript coverage

## 📋 Prerequisites

- Node.js 18+ and npm
- Resend account for email functionality ([resend.com](https://resend.com))

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone https://github.com/MarawanEldeib/portfolio-website.git
cd portfolio-website
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create `.env.local` file in the root directory:

```env
# Resend API Key for email sending
# Get your API key from: https://resend.com/api-keys
RESEND_API_KEY=your_resend_api_key_here

# Contact email (where form submissions will be sent)
CONTACT_EMAIL=your-email@example.com

# Public site URL (for metadata)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your portfolio.

## 📧 Email Setup (Resend)

1. Sign up at [resend.com](https://resend.com)
2. Get your API key from the dashboard
3. Add the API key to `.env.local`
4. For production, verify your domain in Resend dashboard
5. Update `from` email in `app/api/contact/route.ts` to use your verified domain

## 🎨 Customization

### Personal Information
Edit `lib/data.ts` to update:
- Personal details (name, email, phone, location)
- Skills and languages
- Projects, experience, and education
- Certifications and recommendations

### Styling
- Global styles: `app/globals.css`
- Color scheme: Tailwind classes in components
- Fonts: Configured in `app/[locale]/layout.tsx`

### Translations
- English: `messages/en.json`
- German: `messages/de.json`

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🚀 Deploy to Vercel

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard:
   - `RESEND_API_KEY`
   - `CONTACT_EMAIL`
   - `NEXT_PUBLIC_SITE_URL`
4. Deploy!

## 🔒 Security Features

- **CSP Headers**: Content Security Policy
- **Rate Limiting**: 5 requests per 15 minutes
- **File Validation**: Magic byte checking, size limits
- **URL Validation**: Phishing protection, HTTPS only
- **Secure Middleware**: Path traversal prevention

## 📊 Performance Optimizations

- Lazy loading for below-the-fold components
- GPU-accelerated CSS animations (translate3d)
- Font display: swap for instant text rendering
- Optimized images with Next.js Image component
- Code splitting and dynamic imports
- Shared IntersectionObserver hook

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Email**: Resend
- **i18n**: next-intl
- **Icons**: Lucide React
- **Forms**: React Hook Form

## 📄 License

MIT License - feel free to use this template for your own portfolio!

## 🤝 Contact

Marawan Eldeib - marawandeep13@gmail.com

Portfolio: [https://marawan-eldeib.com](https://marawan-eldeib.com)
LinkedIn: [linkedin.com/in/marawan-el-deib](https://www.linkedin.com/in/marawan-el-deib/)
GitHub: [github.com/MarawanEldeib](https://github.com/MarawanEldeib)

