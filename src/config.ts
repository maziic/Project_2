import dotenv from "dotenv";

dotenv.config();

const {
  PORT,
  NODE_ENV,
  PGHOST,
  PGUSER,
  PGDATABASE,
  PGDATABASE_TEST,
  PGPASSWORD,
  PGPORT,
  SECRET,
  SALT_ROUNDS,
  TOKEN,
} = process.env;

export default {
  port: PORT,
  database: NODE_ENV === "dev" ? PGDATABASE : PGDATABASE_TEST,
  host: PGHOST,
  user: PGUSER,
  password: PGPASSWORD,
  dbPort: PGPORT,
  peper: SECRET,
  salt: SALT_ROUNDS,
  token: TOKEN,
};
