import { zodResolver } from '@hookform/resolvers/zod';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormCheckBox } from '../../common/components/FormCheckBox';
import { FormTextField } from '../../common/components/FormTextField';
import { makeShortName } from '../../common/utils/makeShortName';
import { useDeleteBuhWorkplace, useGetEmployeeById } from '../queries';
import { useUpdateEmployee } from '../queries/useUpdateEmployee';
import { useEmployeesStore } from '../state';
import { UpdateEmployeeData } from '../types';
import { updateEmployeeSchema } from '../validation';

export function EmployeeForm() {
  const isFormOpen = useEmployeesStore(s => s.isFormOpen);
  const editingEmployee = useEmployeesStore(s => s.editingEmployee);
  const closeForm = useEmployeesStore(s => s.closeForm);

  const { data: employee, isLoading: getEmployeeIsLoading } = useGetEmployeeById(
    editingEmployee?.id
  );
  const { mutate: update, isPending: isPendingUpdation } = useUpdateEmployee();
  const { mutate: deleteWorkplace, isPending: isPendingDeleteWorkplace } = useDeleteBuhWorkplace();

  const { control, handleSubmit, reset, setValue } = useForm<UpdateEmployeeData>({
    defaultValues: {
      inn: '',
      name: '',
      isFop: false,
    },
    resolver: zodResolver(updateEmployeeSchema),
  });

  useEffect(() => {
    setValue('inn', employee?.inn ?? '');
    setValue('name', employee?.name ?? '');
    setValue('isFop', employee?.isFop ?? false);
  }, [employee, setValue]);

  const onSubmit = (data: UpdateEmployeeData) => {
    if (employee) {
      update(
        { ...data, id: employee?.id },
        {
          onSuccess: () => {
            handleClose();
            reset();
          },
        }
      );
    }
  };

  const handleClose = () => {
    closeForm();
  };

  const isPending = isPendingUpdation || isPendingDeleteWorkplace || getEmployeeIsLoading;

  return (
    <React.Fragment>
      <Dialog
        maxWidth="xl"
        open={isFormOpen}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit(onSubmit),
        }}
        onClose={handleClose}
      >
        <DialogTitle>Редагування працівника</DialogTitle>
        <DialogContent sx={{ minWidth: '500px' }}>
          <Stack gap={3}>
            <DialogContentText></DialogContentText>
            <FormTextField label="ІПН" name="inn" disabled control={control} />
            <FormTextField label="ПІБ" name="name" disabled control={control} />
            <FormGroup>
              <FormControlLabel
                label="є самозайнятою особою"
                control={<FormCheckBox name="isFop" control={control} />}
              />
            </FormGroup>
            {Boolean(employee?.workplacesBuh.length) && (
              <>
                <DialogContentText>Працевлаштування</DialogContentText>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Адреса</TableCell>
                      <TableCell>Посада</TableCell>
                      <TableCell>Роботодавець</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {employee?.workplacesBuh.map(workplace => (
                      <TableRow key={workplace.id}>
                        <TableCell>{workplace.store.addressBuh}</TableCell>
                        <TableCell>{workplace.position}</TableCell>
                        <TableCell>{makeShortName(workplace.employer.name)}</TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            disabled={isPending}
                            onClick={() =>
                              deleteWorkplace({
                                employeeId: employee.id,
                                workplaceId: workplace.id,
                              })
                            }
                          >
                            Звільнити
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </>
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={isPendingUpdation}
            onClick={() => {
              handleClose(), reset();
            }}
          >
            Скасувати
          </Button>
          <LoadingButton loading={isPending} disabled={isPending} type="submit">
            Зберегти
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
