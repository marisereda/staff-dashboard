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
import { useCreateEmployer } from '../queries/useCreateEmployer';
import { useUpdateEmployer } from '../queries/useUpdateEmployer';
import { useEmployersStore } from '../state';
import { Inputs, inputSchema } from '../validation/employerFormSchema';

export function EmployerForm() {
  const isFormOpen = useEmployersStore(s => s.isFormOpen);
  const editableEmployer = useEmployersStore(s => s.editableEmployer);
  const closeForm = useEmployersStore(s => s.closeForm);

  const { mutate: create, isPending: isPendingCreation } = useCreateEmployer();
  const { mutate: update, isPending: isPendingUpdation } = useUpdateEmployer();

  const { control, handleSubmit, reset, setValue } = useForm<Inputs>({
    defaultValues: {
      inn: '',
      name: '',
      isSingleTax: false,
    },
    resolver: zodResolver(inputSchema),
  });

  useEffect(() => {
    setValue('inn', editableEmployer?.inn ?? '');
    setValue('name', editableEmployer?.name ?? '');
    setValue('isSingleTax', editableEmployer?.isSingleTax ?? false);
  }, [editableEmployer, setValue]);

  const onSubmit = (data: Inputs) => {
    if (editableEmployer) {
      update(
        { ...data, id: editableEmployer?.id },
        {
          onSuccess: () => {
            handleClose();
            reset();
          },
        }
      );
    } else {
      create(data, {
        onSuccess: () => {
          handleClose();
          reset();
        },
      });
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
        <DialogTitle>
          {editableEmployer ? 'Редагування роботодавця' : 'Створення нового роботодавця'}
        </DialogTitle>
        <DialogContent>
          <Stack gap={3}>
            <DialogContentText></DialogContentText>
            <FormTextField label="ІПН" name="inn" control={control} sx={{ minWidth: '500px' }} />
            <FormTextField label="ПІБ" name="name" control={control} sx={{ minWidth: '500px' }} />
            <FormGroup>
              <FormControlLabel
                label="використовує єдину систему оподаткування"
                control={<FormCheckBox name="isSingleTax" control={control} />}
              />
            </FormGroup>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={isPendingCreation || isPendingUpdation}
            onClick={() => {
              handleClose(), reset();
            }}
          >
            Скасувати
          </Button>
          <LoadingButton
            loading={isPendingCreation || isPendingUpdation}
            disabled={isPendingCreation || isPendingUpdation}
            type="submit"
          >
            Зберегти
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
