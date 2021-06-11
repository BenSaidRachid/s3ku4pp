import rateLimit from 'express-rate-limit';

export const rateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: 'You have exceeded the 5 requests in 1 hrs limit!', 
  headers: true,
});