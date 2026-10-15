import rateLimit from 'express-rate-limit';

// Rate limiter for contact/enquiry submissions: 5 requests per 15 minutes per IP
export const enquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 enquiry requests per windowMs
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    success: false,
    error: 'RATE_LIMIT_EXCEEDED',
    message: 'Too many enquiry submissions from this connection. Please try again after 15 minutes or reach out directly via email.',
  },
});

// General API rate limiter: 100 requests per 15 minutes
export const generalApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'TOO_MANY_REQUESTS',
    message: 'Too many requests received from this connection. Please try again later.',
  },
});

// Authentication rate limiter: 10 attempts per 15 minutes to block brute-force attacks
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'TOO_MANY_LOGIN_ATTEMPTS',
    message: 'Too many login attempts from this connection. Please wait 15 minutes before trying again.',
  },
});
