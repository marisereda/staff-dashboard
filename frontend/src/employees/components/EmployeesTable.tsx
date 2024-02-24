import { Employee } from '../types';

type EmployeesTableProps = {
  empoloyees: Employee[];
};

export const EmployeesTable = ({ empoloyees }: EmployeesTableProps) => {
  return (
    <div>
      {empoloyees.map(item => (
        <div>{item.name}</div>
      ))}
    </div>
  );
};
