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
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormTextField } from '../../common/components/FormTextField';

import { useUpdateStore } from '../queries/useUpdateStore';
import { useStoresStore } from '../state';
import { Inputs, inputSchema } from '../validation/storeFormSchema';

export function StoreForm() {
  const isFormOpen = useStoresStore(s => s.isFormOpen);
  const store = useStoresStore(s => s.store);

  const closeForm = useStoresStore(s => s.closeForm);

  const { mutate: update, isPending } = useUpdateStore();

  const { control, handleSubmit, reset, setValue } = useForm<Inputs>({
    defaultValues: {
      address: '',
      checkoutNumber: 0,
    },
    resolver: zodResolver(inputSchema),
  });

  useEffect(() => {
    setValue('address', store?.address ?? '');
    setValue('checkoutNumber', store?.checkoutNumber ?? 0);
  }, [store, setValue]);

  const onSubmit = (data: Inputs) => {
    if (store) {
      update(
        { ...store, ...data },
        {
          onSuccess: () => {
            handleClose();
            reset();
          },
          onError: error => {
            console.log('⚠️ error:', error.message);
          },
        }
      );
    } else {
      handleClose();
      reset();
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
        <DialogTitle>Редагування магазину</DialogTitle>
        <DialogContent>
          <Stack gap={3}>
            <DialogContentText></DialogContentText>
            <FormTextField
              label="Адреса"
              name="address"
              control={control}
              disabled={true}
              sx={{ minWidth: '500px' }}
            />
            <FormTextField
              label="Кількість кас"
              name="checkoutNumber"
              control={control}
              sx={{ minWidth: '500px' }}
            />
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
