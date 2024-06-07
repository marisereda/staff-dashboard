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
} from '@mui/material';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormCheckBox } from '../../common/components/FormCheckBox';
import { FormTextField } from '../../common/components/FormTextField';
import { useUpdateEmployee } from '../queries/useUpdateEmployee';
import { useEmployeesStore } from '../state';
import { UpdateEmployeeData } from '../types';
import { updateEmployeeSchema } from '../validation';

export function EmployeeForm() {
  const isFormOpen = useEmployeesStore(s => s.isFormOpen);
  const employee = useEmployeesStore(s => s.editingEmployee);
  const closeForm = useEmployeesStore(s => s.closeForm);

  const { mutate: update, isPending: isPendingUpdation } = useUpdateEmployee();

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

  return (
    <React.Fragment>
      <Dialog
        open={isFormOpen}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit(onSubmit),
        }}
      >
        <DialogTitle>Редагування працівника</DialogTitle>
        <DialogContent>
          <Stack gap={3}>
            <DialogContentText></DialogContentText>
            <FormTextField
              label="ІПН"
              name="inn"
              disabled
              control={control}
              sx={{ minWidth: '500px' }}
            />
            <FormTextField
              label="ПІБ"
              name="name"
              disabled
              control={control}
              sx={{ minWidth: '500px' }}
            />
            <FormGroup>
              <FormControlLabel
                label="є самозайнятою особою"
                control={<FormCheckBox name="isFop" control={control} />}
              />
            </FormGroup>
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
          <LoadingButton loading={isPendingUpdation} disabled={isPendingUpdation} type="submit">
            Зберегти
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
