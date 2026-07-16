CREATE TABLE IF NOT EXISTS scouted_profiles (
  login TEXT PRIMARY KEY COLLATE NOCASE,
  name TEXT NOT NULL,
  avatar TEXT NOT NULL,
  rating INTEGER NOT NULL,
  followers INTEGER NOT NULL DEFAULT 0,
  stars INTEGER NOT NULL DEFAULT 0,
  repositories INTEGER NOT NULL DEFAULT 0,
  top_language TEXT NOT NULL DEFAULT 'Code',
  location TEXT,
  first_scanned_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_scanned_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_scouted_profiles_ranking
ON scouted_profiles (rating DESC, stars DESC, followers DESC, last_scanned_at DESC);
