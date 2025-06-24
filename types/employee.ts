export interface Employee {
  id: number;
  employee_code: string;
  last_name: string;
  first_name: string;
  last_name_kana: string;
  first_name_kana: string;
  birth_date: string;
  gender: string;
  phone_number: string;
  email: string;
  profile_image?: string;
}

export interface EmploymentInfo {
  employee_id: number;
  hire_date: string;
  department: string;
  position: string;
  employment_type: string;
  status: string;
  years_of_service: string;
}

export interface SalaryInfo {
  employee_id: number;
  basic_salary: number;
  total_allowance: number;
}

export interface EmployeeWithDetails extends Employee {
  employment_info: EmploymentInfo;
  salary_info: SalaryInfo;
} 