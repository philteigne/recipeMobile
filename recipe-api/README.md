# recipe-api

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

## Database Setup

The database scripts help you initialize, build, and seed your PostgreSQL database.

### Prerequisites

- PostgreSQL installed and running
- Create a `.env` file in the project root with:
  ```
  PG_PASSWORD=your-postgres-password
  PGHOST=localhost
  PGPORT=5432
  PGUSER=postgres
  PGDATABASE=pantry-staging
  ```

### Database Scripts

**Initialize database** (creates role, database, and extensions):
```bash
bun run db:init
```

**Apply schema** (creates tables):
```bash
bun run db:build
```

**Seed database** (populates with initial data):
```bash
bun run db:seed
```

Or run the scripts directly:
```bash
bun scripts/db-init.ts
bun scripts/db-build.ts
bun scripts/db-seed.ts
```

This project was created using `bun init` in bun v1.3.5. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
