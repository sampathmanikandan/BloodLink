/*
  # Create Blood Donation Database Schema

  1. New Tables
    - `donors`
      - `id` (uuid, primary key) - Unique identifier for each donor
      - `name` (text) - Full name of the donor
      - `email` (text) - Email address of the donor
      - `phone` (text) - Contact phone number
      - `blood_group` (text) - Blood type (A+, A−, B+, B−, AB+, AB−, O+, O−)
      - `city` (text) - City location of the donor
      - `gender` (text) - Gender of the donor
      - `available` (boolean) - Availability status for donation
      - `created_at` (timestamptz) - Registration timestamp
      
  2. Security
    - Enable RLS on `donors` table
    - Add policy for public to insert donor registrations
    - Add policy for public to search donors (read-only)
    
  3. Important Notes
    - Table is designed for public access (blood donation app)
    - All donors can be searched by anyone
    - Anyone can register as a donor
*/

CREATE TABLE IF NOT EXISTS donors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  blood_group text NOT NULL,
  city text NOT NULL,
  gender text NOT NULL,
  available boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE donors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can register as donor"
  ON donors
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can search donors"
  ON donors
  FOR SELECT
  TO anon
  USING (true);