import pool from '../config/db.js';

export async function initDatabase() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS dynamic_qr_codes (
      id UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
      public_id VARCHAR(16) NOT NULL UNIQUE,
      name VARCHAR(255) NOT NULL,
      destination_url TEXT NOT NULL,
      is_active BOOLEAN NOT NULL DEFAULT TRUE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_dynamic_qr_public_id ON dynamic_qr_codes(public_id);
  `;

  try {
    await pool.query(createTableQuery);
    console.log('Database schema initialized (dynamic_qr_codes table ready).');
  } catch (err) {
    console.warn('Could not auto-initialize DB schema (PostgreSQL may be offline during build/dev):', err.message);
  }
}
