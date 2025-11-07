export const productionConfig = {
  // Database
  db: {
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    }
  },

  // Security
  security: {
    rateLimit: {
      windowMs: 15 * 60 * 1000,
      max: 100
    },
    helmet: {
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", "data:", "https:"],
        },
      },
    }
  },

  // CORS
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
    optionsSuccessStatus: 200
  },

  // Compression
  compression: {
    level: 6,
    threshold: 1024
  }
};

export default productionConfig;

