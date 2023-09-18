import rateLimiter from "express-rate-limit";
const apiLimiter = rateLimiter({
    windowMs: 5 * 60 * 1000, // 15 minutes
    max: 50,
    message: "Too many requests from this IP, please try again after 5 minutes",
  });

export default apiLimiter