-- Dynamic QR Codes Table Schema
CREATE TABLE IF NOT EXISTS dynamic_qr_codes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    public_id VARCHAR(12) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    destination_url TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for fast O(1) redirection lookups on public_id
CREATE INDEX IF NOT EXISTS idx_dynamic_qr_public_id ON dynamic_qr_codes(public_id);
