import { zodResolver } from '@hookform/resolvers/zod';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FormTextField } from '../../common/components/FormTextField';
import { useCreateEmployer } from '../queries/useCreateEmployer';
import { useEmployersStore } from '../state';
import { Inputs, inputSchema } from '../validation/employerFormSchema';

export function EmployerForm() {
  const isFormOpen = useEmployersStore(s => s.isFormOpen);
  const setIsFormOpen = useEmployersStore(s => s.setIsFormOpen);
  const { mutate, isPending } = useCreateEmployer();

  const { control, handleSubmit, reset } = useForm<Inputs>({
    defaultValues: { inn: '', name: '' },
    resolver: zodResolver(inputSchema),
  });

  const onSubmit = (data: Inputs) => {
    mutate(data, {
      onSuccess: () => {
        handleClose();
        reset();
      },
    });
  };

  const handleClose = () => {
    setIsFormOpen(false);
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
        <DialogTitle>Створення нового роботодавця</DialogTitle>
        <DialogContent>
          <Stack gap={3}>
            <DialogContentText></DialogContentText>
            <FormTextField label="ІПН" name="inn" control={control} />
            <FormTextField label="ПІБ" name="name" control={control} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={isPending}
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
