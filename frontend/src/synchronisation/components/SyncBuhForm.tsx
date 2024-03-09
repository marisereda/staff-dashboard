import ClearIcon from '@mui/icons-material/Clear';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Alert,
  Autocomplete,
  Button,
  Card,
  CardContent,
  IconButton,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useController, useForm } from 'react-hook-form';
import { useEmployersQuery } from '../../employers/queries/useEmployersQuery';
import { useSyncBuhQuery } from '../queries/useSyncBuhQuery';

type Inputs = {
  employerId: string | null;
  files: FileList | null;
};

export function SyncBuhForm() {
  const { control, watch, setValue, register, handleSubmit } = useForm<Inputs>({
    defaultValues: { employerId: null, files: null },
  });

  const employerController = useController({ control, name: 'employerId' });

  const { isPending, isError, isSuccess, mutate, reset } = useSyncBuhQuery();

  const handleUploadFile = ({ employerId, files }: Inputs) => {
    if (!employerId || !files?.[0]) {
      return;
    }

    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('employerId', employerId);

    mutate(formData, {
      onSuccess: () => {
        setValue('files', null);
      },
    });
  };

  const file = watch('files')?.[0];

  const { data: employersPage } = useEmployersQuery({
    q: '',
    sortBy: 'name',
    sortOrder: 'asc',
    page: 1,
  });

  const employersOptions =
    employersPage?.data.map(employer => ({ label: employer.name, id: employer.id })) ?? [];

  return (
    <Card component="form" onSubmit={handleSubmit(handleUploadFile)}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Typography variant="h5" component="h2">
          База даних бухгалтерії
        </Typography>
        <Autocomplete
          disablePortal
          size="small"
          options={employersOptions}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          sx={{ width: '40%' }}
          onChange={(_, value) => employerController.field.onChange(value ? value.id : null)}
          renderInput={params => <TextField {...params} label="Роботодавець" />}
        />
        <Stack direction="row" gap={2} alignItems="center">
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Вибрати файл БД
            <input
              accept=".xls,.xlsx"
              style={{ display: 'none' }}
              type="file"
              {...register('files')}
            />
          </Button>

          {file && (
            <>
              <Typography variant="subtitle1">
                {file.name}
                <span style={{ marginLeft: 20 }}>{file.size / 1000} kB</span>
              </Typography>
              <IconButton size="small" onClick={() => setValue('files', null)}>
                <ClearIcon />
              </IconButton>
            </>
          )}
        </Stack>

        <LoadingButton
          loading={isPending}
          disabled={!file || isPending}
          variant="contained"
          type="submit"
          style={{ alignSelf: 'start' }}
        >
          Синхронізувати
        </LoadingButton>
      </CardContent>
      <Snackbar
        open={isSuccess || isError}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={isError ? 'error' : 'success'} onClose={reset}>
          {isError
            ? 'Під час синхронізації бази даних HR трапилась помилка!'
            : 'Базу даних HR успішно синхронізовано!'}
        </Alert>
      </Snackbar>
    </Card>
  );
}
