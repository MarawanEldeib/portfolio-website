# Security Policy

## Reporting Security Issues

If you discover a security vulnerability, please email: [your-email@example.com]

**Please do not report security vulnerabilities through public GitHub issues.**

## Security Best Practices Implemented

### 1. **HTTP Security Headers**
- Strict-Transport-Security (HSTS)
- X-Frame-Options: SAMEORIGIN
- X-Content-Type-Options: nosniff
- X-XSS-Protection
- Referrer-Policy
- Permissions-Policy

### 2. **Content Security Policy (CSP)**
- Prevents XSS attacks
- Restricts resource loading
- Sandboxed SVG content

### 3. **Input Validation**
- Middleware blocks suspicious user agents
- Directory traversal protection
- SQL injection prevention

### 4. **Dependencies**
- Regular security audits with `npm audit`
- Automatic dependency updates
- No vulnerable packages

### 5. **Data Protection**
- No sensitive data in client-side code
- Environment variables for secrets
- Secure localStorage usage

### 6. **Performance Security**
- Lazy loading prevents resource exhaustion
- Rate limiting in middleware
- Optimized bundle sizes

## Response Timeline

- **Critical**: 24 hours
- **High**: 7 days
- **Medium**: 30 days
- **Low**: 90 days

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| Latest  | :white_check_mark: |
| < Latest| :x:                |
