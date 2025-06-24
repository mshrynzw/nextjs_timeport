-- Drop existing tables with CASCADE to handle dependencies
DROP TABLE IF EXISTS approval_steps CASCADE;
DROP TABLE IF EXISTS allowance_items CASCADE;
DROP TABLE IF EXISTS allowance_categories CASCADE;
DROP TABLE IF EXISTS application_types CASCADE;
DROP TABLE IF EXISTS attendance_monthly_summary CASCADE;
DROP TABLE IF EXISTS department_stats CASCADE;
DROP TABLE IF EXISTS payroll_monthly_summary CASCADE;
DROP TABLE IF EXISTS deductions CASCADE;
DROP TABLE IF EXISTS allowances CASCADE;
DROP TABLE IF EXISTS payroll_statuses CASCADE;
DROP TABLE IF EXISTS approval_statuses CASCADE;
DROP TABLE IF EXISTS attendance_statuses CASCADE;
DROP TABLE IF EXISTS attendance CASCADE;
DROP TABLE IF EXISTS spouse_deduction CASCADE;
DROP TABLE IF EXISTS payroll_confirm CASCADE;
DROP TABLE IF EXISTS salary_info CASCADE;
DROP TABLE IF EXISTS employee_statuses CASCADE;
DROP TABLE IF EXISTS employment_info CASCADE;
DROP TABLE IF EXISTS departments CASCADE;
DROP TABLE IF EXISTS employees CASCADE;
DROP TABLE IF EXISTS employment_types CASCADE;
DROP TABLE IF EXISTS job_positions CASCADE;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE job_positions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  level INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE employment_types (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT NOT NULL UNIQUE,
  label TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE employees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_code VARCHAR(255) UNIQUE NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name_kana VARCHAR(255) NOT NULL,
  first_name_kana VARCHAR(255) NOT NULL,
  birth_date DATE NOT NULL,
  gender TEXT NOT NULL,
  phone_number VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  profile_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE departments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE employment_info (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  hire_date DATE NOT NULL,
  department UUID REFERENCES departments(id),
  position UUID REFERENCES job_positions(id),
  employment_type UUID REFERENCES employment_types(id),
  status TEXT NOT NULL,
  years_of_service TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE employee_statuses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT NOT NULL UNIQUE,
  label TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE salary_info (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  basic_salary INTEGER NOT NULL,
  total_allowance INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE payroll_confirm (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  year INTEGER NOT NULL,
  month INTEGER NOT NULL,
  cutoff_date DATE NOT NULL,
  payment_date DATE NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE spouse_deduction (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  has_spouse BOOLEAN NOT NULL,
  name VARCHAR(255),
  income INTEGER,
  age INTEGER,
  deduction_type VARCHAR(255),
  deduction_amount INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE attendance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  work_date DATE NOT NULL,
  work_days INTEGER NOT NULL DEFAULT 0,
  absent_days INTEGER NOT NULL DEFAULT 0,
  paid_leave_days INTEGER NOT NULL DEFAULT 0,
  late_early_count INTEGER NOT NULL DEFAULT 0,
  regular_hours INTEGER NOT NULL DEFAULT 0,
  actual_hours INTEGER NOT NULL DEFAULT 0,
  overtime_hours INTEGER NOT NULL DEFAULT 0,
  night_hours INTEGER NOT NULL DEFAULT 0,
  holiday_hours INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE attendance_statuses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT NOT NULL UNIQUE,
  label TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE approval_statuses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT NOT NULL UNIQUE,
  label TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE payroll_statuses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT NOT NULL UNIQUE,
  label TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE allowances (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  year_month VARCHAR(7) NOT NULL,
  basic_salary INTEGER NOT NULL DEFAULT 0,
  position_allowance INTEGER NOT NULL DEFAULT 0,
  qualification_allowance INTEGER NOT NULL DEFAULT 0,
  housing_allowance INTEGER NOT NULL DEFAULT 0,
  family_allowance INTEGER NOT NULL DEFAULT 0,
  commuting_allowance INTEGER NOT NULL DEFAULT 0,
  meal_allowance INTEGER NOT NULL DEFAULT 0,
  performance_allowance INTEGER NOT NULL DEFAULT 0,
  overtime_allowance INTEGER NOT NULL DEFAULT 0,
  night_allowance INTEGER NOT NULL DEFAULT 0,
  holiday_allowance INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE deductions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  year_month VARCHAR(7) NOT NULL,
  health_insurance INTEGER NOT NULL DEFAULT 0,
  pension_insurance INTEGER NOT NULL DEFAULT 0,
  employment_insurance INTEGER NOT NULL DEFAULT 0,
  income_tax INTEGER NOT NULL DEFAULT 0,
  resident_tax INTEGER NOT NULL DEFAULT 0,
  life_insurance INTEGER NOT NULL DEFAULT 0,
  savings INTEGER NOT NULL DEFAULT 0,
  internal_savings INTEGER NOT NULL DEFAULT 0,
  union_fee INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE payroll_monthly_summary (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  year_month VARCHAR(7) NOT NULL,
  total_pay INTEGER NOT NULL DEFAULT 0,
  total_deduction INTEGER NOT NULL DEFAULT 0,
  net_pay INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE department_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  count INTEGER NOT NULL DEFAULT 0,
  color TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE attendance_monthly_summary (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  year_month VARCHAR(7) NOT NULL,
  work_days INTEGER NOT NULL DEFAULT 0,
  overtime_hours INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE application_types (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  value TEXT NOT NULL UNIQUE,
  label TEXT NOT NULL,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE allowance_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE allowance_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID NOT NULL REFERENCES allowance_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  value INTEGER NOT NULL DEFAULT 0,
  icon TEXT,
  color TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE approval_steps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  application_id UUID NOT NULL,
  step INTEGER NOT NULL,
  title TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  status TEXT NOT NULL,
  date TIMESTAMP WITH TIME ZONE,
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_employees_employee_code ON employees(employee_code);
CREATE INDEX idx_employment_info_employee_id ON employment_info(employee_id);
CREATE INDEX idx_salary_info_employee_id ON salary_info(employee_id);
CREATE INDEX idx_attendance_employee_id ON attendance(employee_id);
CREATE INDEX idx_attendance_work_date ON attendance(work_date);
CREATE INDEX idx_allowances_employee_id ON allowances(employee_id);
CREATE INDEX idx_allowances_year_month ON allowances(year_month);
CREATE INDEX idx_deductions_employee_id ON deductions(employee_id);
CREATE INDEX idx_deductions_year_month ON deductions(year_month);
CREATE INDEX idx_payroll_monthly_summary_employee_id ON payroll_monthly_summary(employee_id);
CREATE INDEX idx_payroll_monthly_summary_year_month ON payroll_monthly_summary(year_month);
CREATE INDEX idx_attendance_monthly_summary_employee_id ON attendance_monthly_summary(employee_id);
CREATE INDEX idx_attendance_monthly_summary_year_month ON attendance_monthly_summary(year_month);