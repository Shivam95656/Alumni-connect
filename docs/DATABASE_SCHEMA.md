# Alumni Connect - SQL Database Schema

This document contains the SQL schema for creating tables in Supabase PostgreSQL.

## Tables

### 1. Alumni Table

```sql
CREATE TABLE alumni (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  batch INTEGER,
  year VARCHAR(20),
  department VARCHAR(100),
  roll_number VARCHAR(50),
  linkedin VARCHAR(255),
  github VARCHAR(255),
  is_approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_alumni_email ON alumni(email);
CREATE INDEX idx_alumni_is_approved ON alumni(is_approved);
```

### 2. Admins Table

```sql
CREATE TABLE admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_admins_email ON admins(email);
```

### 3. Events Table

```sql
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  date TIMESTAMP NOT NULL,
  location VARCHAR(255),
  event_category VARCHAR(100),
  created_by UUID NOT NULL REFERENCES admins(id),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_events_created_by ON events(created_by);
CREATE INDEX idx_events_is_active ON events(is_active);
```

### 4. Internships Table

```sql
CREATE TABLE internships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  description TEXT,
  requirements TEXT,
  deadline TIMESTAMP NOT NULL,
  stipend VARCHAR(100),
  location VARCHAR(255),
  created_by UUID NOT NULL REFERENCES admins(id),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_internships_created_by ON internships(created_by);
CREATE INDEX idx_internships_deadline ON internships(deadline);
CREATE INDEX idx_internships_is_active ON internships(is_active);
```

### 5. Placements Table

```sql
CREATE TABLE placements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  description TEXT,
  salary VARCHAR(100),
  location VARCHAR(255),
  deadline TIMESTAMP NOT NULL,
  eligibility TEXT,
  created_by UUID NOT NULL REFERENCES admins(id),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_placements_created_by ON placements(created_by);
CREATE INDEX idx_placements_deadline ON placements(deadline);
CREATE INDEX idx_placements_is_active ON placements(is_active);
```

## Setup Instructions

1. Open Supabase dashboard
2. Go to SQL Editor
3. Copy and paste each table creation script above
4. Execute each query
5. Enable Row Level Security (RLS) for tables if needed

## Notes

- All passwords should be hashed before storing in database
- UUIDs are used for primary keys for better security
- Timestamps track creation and updates
- Indexes are created on frequently queried columns for performance
