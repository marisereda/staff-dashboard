import { zodResolver } from '@hookform/resolvers/zod';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormTextField } from '../../common/components/FormTextField';
import { useEmployersQuery } from '../../employers/queries/useEmployersQuery';
import { useUpdateStore } from '../queries/useUpdateStore';
import { useStoresStore } from '../state';
import { Inputs, inputSchema } from '../validation/storeFormSchema';

export function StoreForm() {
  const isFormOpen = useStoresStore(s => s.isFormOpen);
  const store = useStoresStore(s => s.store);

  const { data: employersPage } = useEmployersQuery({
    q: '',
    sortBy: 'name',
    pageSize: 100,
    sortOrder: 'asc',
    page: 1,
  });
  const employers = employersPage?.data ?? [];

  const closeForm = useStoresStore(s => s.closeForm);
  const { mutate: update, isPending } = useUpdateStore();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    if (store?.employers?.length) {
      const initialSelectedIds = store?.employers.map(employer => employer.id);
      setSelectedIds(initialSelectedIds);
    }
  }, [store?.employers]);

  const { control, handleSubmit, reset, setValue } = useForm<Inputs>({
    defaultValues: {
      address: '',
      checkoutNumber: 0,
      placesAmount: 0,
    },
    resolver: zodResolver(inputSchema),
  });

  useEffect(() => {
    setValue('address', store?.address ?? '');
    setValue('checkoutNumber', store?.checkoutNumber ?? 0);
    setValue('placesAmount', store?.placesAmount ?? 0);
  }, [store, setValue]);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    const ids = typeof value === 'string' ? value.split(', ') : value;
    setSelectedIds(ids);
  };

  const onSubmit = (data: Inputs) => {
    if (store) {
      update(
        { id: store.id, ...data, employers: selectedIds },
        {
          onSuccess: () => {
            handleClose();
            reset();
          },
          onError: error => {
            console.log('error:', error.message);
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
            <FormTextField
              label="Кількість місць для працевлаштування"
              name="placesAmount"
              control={control}
              sx={{ minWidth: '500px' }}
            />
            <FormControl>
              <InputLabel id="demo-multiple-checkbox-label">Роботодавець</InputLabel>
              <Select
                multiple
                value={selectedIds}
                onChange={handleChange}
                input={<OutlinedInput label="Роботодавець" />}
                renderValue={selected =>
                  employers
                    .filter(({ id }) => selected.includes(id))
                    .map(({ name }) => name)
                    .join(', ')
                }
              >
                {employers.map(employer => (
                  <MenuItem key={employer.id} value={employer.id}>
                    <Checkbox checked={selectedIds.includes(employer.id)} />
                    <ListItemText primary={employer.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={isPending}
            onClick={() => {
              handleClose();
              reset();
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
