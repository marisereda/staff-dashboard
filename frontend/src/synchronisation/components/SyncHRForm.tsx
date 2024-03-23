import ClearIcon from '@mui/icons-material/Clear';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Alert,
  Button,
  Card,
  CardContent,
  IconButton,
  Snackbar,
  Stack,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useSyncHrQuery } from '../queries/useSyncHrQuery';

type Inputs = {
  files: FileList | null;
};

export function SyncHRForm() {
  const { watch, setValue, register, handleSubmit } = useForm<Inputs>({
    defaultValues: { files: null },
  });
  const { isPending, isError, isSuccess, mutate, reset } = useSyncHrQuery();

  const handleUploadFile = ({ files }: Inputs) => {
    if (!files?.[0]) {
      return;
    }
    const formData = new FormData();
    formData.append('file', files[0]);
    mutate(formData, {
      onSuccess: () => {
        setValue('files', null);
      },
    });
  };

  const file = watch('files')?.[0];

  return (
    <Card component="form" onSubmit={handleSubmit(handleUploadFile)} sx={{ minHeight: '270px' }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Typography variant="h5" component="h2">
          База даних HR-відділу
        </Typography>
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
