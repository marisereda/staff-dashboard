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
import { UpdateStoreData } from '../types';
import { updateStoreSchema } from '../validation';

export function StoreForm() {
  const isFormOpen = useStoresStore(s => s.isFormOpen);
  const store = useStoresStore(s => s.editingStore);
  const closeForm = useStoresStore(s => s.closeForm);

  const { mutate: update, isPending } = useUpdateStore();

  const { control, handleSubmit, reset, setValue } = useForm<UpdateStoreData>({
    defaultValues: {
      addressHr: '',
      addressBuh: '',
      checkoutNumber: 0,
      placesAmount: 0,
    },
    resolver: zodResolver(updateStoreSchema),
  });

  useEffect(() => {
    setValue('addressHr', store?.addressHr ?? '');
    setValue('addressBuh', store?.addressBuh ?? '');
    setValue('checkoutNumber', store?.checkoutNumber ?? 0);
    setValue('placesAmount', store?.placesAmount ?? 0);
  }, [store, setValue]);

  const onSubmit = (data: UpdateStoreData) => {
    if (store) {
      update(
        { id: store.id, ...data },
        {
          onSuccess: () => {
            handleClose();
          },
          onError: error => {
            console.log('error:', error.message);
          },
        }
      );
    } else {
      handleClose();
    }
  };

  const handleClose = () => {
    closeForm();
    reset();
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
              name="addressHr"
              control={control}
              disabled={true}
              sx={{ minWidth: '500px' }}
            />
            <FormTextField
              label="Адреса (бух.)"
              name="addressBuh"
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
            <FormTextField
              label="Кількість місць для працевлаштування"
              name="placesAmount"
              control={control}
              sx={{ minWidth: '500px' }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button disabled={isPending} onClick={() => handleClose()}>
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
