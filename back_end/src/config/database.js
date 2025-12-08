module.exports = {
  dialect: "postgres",
  host: "ep-rough-glitter-ad6ve1cl-pooler.c-2.us-east-1.aws.neon.tech",
  username: "neondb_owner",
  password: "npg_q7WTl8aCzJKr",
  database: "ecommerce",
  define: {
    timestamps: true,
    underscored: false,
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Necessário para funcionar no Neon
    }
  }
};
