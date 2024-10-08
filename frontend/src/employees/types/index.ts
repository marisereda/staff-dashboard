import { z } from 'zod';
import { SortOrder } from '../../common/types';
import { Employer } from '../../employers/types';
import { Store } from '../../stores/types';
import { updateEmployeeSchema } from '../validation';

export type Employee = {
  id: string;
  code1C?: string;
  inn?: string;
  isFop: boolean;
  name: string;
  phone?: string;
  updateStatusHr?: string;
  updateStatusBuh?: string;

  createdAt: Date;
  updatedAt: Date;

  workplacesHr: WorkplaceHr[];
  workplacesBuh: WorkplaceBuh[];
  note?: Note;
};

export type WorkplaceHr = {
  id: string;
  employeeId: string;
  storeId: string;
  position: string;

  createdAt: Date;
  updatedAt: Date;

  store: Store;
};

export type WorkplaceBuh = {
  id: string;
  employeeId: string;
  storeId: string;
  employerId: string;
  position: string;

  createdAt: Date;
  updatedAt: Date;

  store: Store;
  employer: Employer;
};

export type Note = {
  id: string;
  ownerId: string;
  title: string;
  content: string;
  isDone: boolean;
  isImportant: boolean;
};

export type EmployeesSearchParams = {
  q: string;
  fopFilter: 'all' | 'true' | 'false';
  statusFilter: 'all' | 'hrDeleted' | 'buhDeleted' | 'allDeleted' | 'notDeleted';
  noteFilter: 'all' | 'notes' | 'isDone' | 'notDone' | 'isImportant';
  storeId: string;
  employerId: string;
  sortBy: 'code1C' | 'inn' | 'isFop' | 'name' | 'phone';
  sortOrder: SortOrder;
  page: number;
  pageSize: number;
};

export type HiredEmployees = {
  employedStaff: { employerId: string; employees: number }[];
  employedFreelancers: {
    employeeInn: string;
    employeeName: string;
    positionHr: string | null;
    positionBuh: string;
    employerName: string;
    addressBuh: string;
  }[];
};

export type UpdateEmployeeData = z.infer<typeof updateEmployeeSchema>;
