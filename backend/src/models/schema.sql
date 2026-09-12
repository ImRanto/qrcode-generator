-- Extension for UUID generation if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create Dynamic QR Codes Table
CREATE TABLE IF NOT EXISTS dynamic_qr_codes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    public_id VARCHAR(16) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    destination_url TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for fast public_id lookups
CREATE INDEX IF NOT EXISTS idx_dynamic_qr_public_id ON dynamic_qr_codes(public_id);
