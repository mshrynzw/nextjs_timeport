CREATE TABLE employees (
  id VARCHAR(255) PRIMARY KEY,
  last_name VARCHAR(255),
  first_name VARCHAR(255),
  last_name_kana VARCHAR(255),
  first_name_kana VARCHAR(255),
  birth_date DATE,
  gender TEXT,
  phone_number VARCHAR(255),
  email VARCHAR(255),
  profile_image TEXT
);

CREATE TABLE employment_info (
  employee_id VARCHAR(255),
  hire_date DATE,
  department VARCHAR(255),
  position VARCHAR(255),
  employment_type TEXT,
  status TEXT,
  years_of_service TEXT,
  employees_id INTEGER,
  ,FOREIGN KEY (employees_id) REFERENCES employees(id),
  job_positions_id INTEGER,
  ,FOREIGN KEY (job_positions_id) REFERENCES job_positions(id),
  employment_types_id INTEGER,
  ,FOREIGN KEY (employment_types_id) REFERENCES employment_types(id)
);

CREATE TABLE employee_statuses (
  id INTEGER PRIMARY KEY,
  code TEXT,
  label TEXT
);

CREATE TABLE employment_types (
  id INTEGER PRIMARY KEY,
  code TEXT,
  label TEXT
);

CREATE TABLE departments (
  id INTEGER PRIMARY KEY,
  name TEXT
);

CREATE TABLE job_positions (
  id INTEGER PRIMARY KEY,
  name TEXT,
  level INTEGER
);

CREATE TABLE salary_info (
  employee_id VARCHAR(255),
  basic_salary INTEGER,
  total_allowance INTEGER,
  employees_id INTEGER,
  ,FOREIGN KEY (employees_id) REFERENCES employees(id)
);

CREATE TABLE payroll_confirm (
  id INTEGER PRIMARY KEY,
  year INTEGER,
  month INTEGER,
  cutoff_date DATE,
  payment_date DATE,
  status TEXT
);

CREATE TABLE spouse_deduction (
  id INTEGER PRIMARY KEY,
  has_spouse BOOLEAN,
  name VARCHAR(255),
  income INTEGER,
  age INTEGER,
  deduction_type VARCHAR(255),
  deduction_amount INTEGER
);

CREATE TABLE employee_info (
  id INTEGER PRIMARY KEY,
  name VARCHAR(255),
  employee_id VARCHAR(255),
  department VARCHAR(255),
  pay_month VARCHAR(255)
);

CREATE TABLE attendance (
  id INTEGER PRIMARY KEY,
  employee_id VARCHAR(255),
  work_days INTEGER,
  absent_days INTEGER,
  paid_leave_days INTEGER,
  late_early_count INTEGER,
  regular_hours INTEGER,
  actual_hours INTEGER,
  overtime_hours INTEGER,
  night_hours INTEGER,
  holiday_hours INTEGER
);

CREATE TABLE attendance_statuses (
  id INTEGER PRIMARY KEY,
  code TEXT,
  label TEXT
);

CREATE TABLE approval_statuses (
  id INTEGER PRIMARY KEY,
  code TEXT,
  label TEXT
);

CREATE TABLE payroll_statuses (
  id INTEGER PRIMARY KEY,
  code TEXT,
  label TEXT
);

CREATE TABLE allowances (
  id INTEGER PRIMARY KEY,
  employee_id VARCHAR(255),
  basic_salary INTEGER,
  position_allowance INTEGER,
  qualification_allowance INTEGER,
  housing_allowance INTEGER,
  family_allowance INTEGER,
  commuting_allowance INTEGER,
  meal_allowance INTEGER,
  performance_allowance INTEGER,
  overtime_allowance INTEGER,
  night_allowance INTEGER,
  holiday_allowance INTEGER
);

CREATE TABLE deductions (
  id INTEGER PRIMARY KEY,
  employee_id VARCHAR(255),
  health_insurance INTEGER,
  pension_insurance INTEGER,
  employment_insurance INTEGER,
  income_tax INTEGER,
  resident_tax INTEGER,
  life_insurance INTEGER,
  savings INTEGER,
  internal_savings INTEGER,
  union_fee INTEGER
);

CREATE TABLE payroll_monthly_summary (
  id INTEGER PRIMARY KEY,
  employee_id VARCHAR(255),
  month VARCHAR(255),
  total_pay INTEGER,
  total_deduction INTEGER,
  net_pay INTEGER
);

CREATE TABLE department_stats (
  id INTEGER PRIMARY KEY,
  name TEXT,
  count INTEGER,
  color TEXT
);

CREATE TABLE attendance_monthly_summary (
  id INTEGER PRIMARY KEY,
  month TEXT,
  work_days INTEGER,
  overtime INTEGER
);

CREATE TABLE application_types (
  id INTEGER PRIMARY KEY,
  value TEXT,
  label TEXT,
  icon TEXT
);

CREATE TABLE allowance_categories (
  id INTEGER PRIMARY KEY,
  title TEXT
);

CREATE TABLE allowance_items (
  id INTEGER PRIMARY KEY,
  category_id INTEGER,
  name TEXT,
  value INTEGER,
  icon TEXT,
  color TEXT
);

CREATE TABLE approval_steps (
  id INTEGER PRIMARY KEY,
  step INTEGER,
  title TEXT,
  name TEXT,
  role TEXT,
  status TEXT,
  date TEXT,
  comment TEXT
);