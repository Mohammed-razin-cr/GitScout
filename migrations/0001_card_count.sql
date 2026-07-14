CREATE TABLE IF NOT EXISTS app_counters (
  name TEXT PRIMARY KEY,
  value INTEGER NOT NULL DEFAULT 0
);

INSERT OR IGNORE INTO app_counters (name, value)
VALUES ('cards_rated', 0);
