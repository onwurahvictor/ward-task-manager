import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;

let poolConfig;

if (process.env.DATABASE_URL) {
  // Railway internal connection - no SSL needed for internal network
  poolConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: false
  };
} else {
  poolConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  };
}

const pool = new Pool(poolConfig);

const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) DEFAULT 'staff' CHECK (role IN ('staff', 'manager')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        assigned_to VARCHAR(100),
        ward VARCHAR(100),
        priority VARCHAR(20) CHECK (priority IN ('low', 'medium', 'high')),
        status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'in-progress', 'completed')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Database tables ready');
  } catch (err) {
    console.error('Migration error:', err.message);
  }
};

const connectWithRetry = (retries = 5) => {
  pool.connect((err, client, release) => {
    if (err) {
      console.error('Database connection error:', err.message, err.code);
      if (retries > 0) {
        console.log(`Retrying in 3s... ${retries} attempts left`);
        setTimeout(() => connectWithRetry(retries - 1), 3000);
      }
    } else {
      console.log('Successfully connected to PostgreSQL database');
      release();
      initDB();
    }
  });
};

connectWithRetry();

export default pool;