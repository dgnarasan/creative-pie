// The database helper is shared with database-backed Sites. This portfolio
// currently has no D1 binding; callers must retain getDb()'s runtime guard.
declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
  }
}
