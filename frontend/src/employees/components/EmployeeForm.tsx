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
import { Inputs, inputSchema } from '../validation/employeeFormSchema';

export function EmployeeForm() {
  const isFormOpen = useEmployeesStore(s => s.isFormOpen);
  const editableEmployee = useEmployeesStore(s => s.editableEmployee);
  const closeForm = useEmployeesStore(s => s.closeForm);

  const { mutate: update, isPending: isPendingUpdation } = useUpdateEmployee();

  const { control, handleSubmit, reset, setValue } = useForm<Inputs>({
    defaultValues: {
      inn: '',
      name: '',
      isFop: false,
    },
    resolver: zodResolver(inputSchema),
  });

  useEffect(() => {
    setValue('inn', editableEmployee?.inn ?? '');
    setValue('name', editableEmployee?.name ?? '');
    setValue('isFop', editableEmployee?.isFop ?? false);
  }, [editableEmployee, setValue]);

  const onSubmit = (data: Inputs) => {
    console.log('data', data);
    if (editableEmployee) {
      update(
        { ...data, id: editableEmployee?.id },
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
