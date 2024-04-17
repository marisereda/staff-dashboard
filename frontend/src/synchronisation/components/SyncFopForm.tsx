import ClearIcon from '@mui/icons-material/Clear';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Alert,
  Button,
  Card,
  CardContent,
  IconButton,
  Link,
  Snackbar,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSyncFopQuery } from '../queries/useSyncFopQuery';

type Inputs = {
  files: FileList | null;
};

export function SyncFopForm() {
  const { watch, setValue, register, handleSubmit } = useForm<Inputs>({
    defaultValues: { files: null },
  });
  const { isPending, isError, isSuccess, mutate, reset } = useSyncFopQuery();
  const [linkRef, setLinkRef] = useState('');

  // const handleSyncResponse = (blob: Blob) => {
  //   const binaryData = [];
  //   binaryData.push(blob);
  //   const url = window.URL.createObjectURL(
  //     new Blob(binaryData, { type: 'application/vnd.ms-excel' })
  //   );
  //   setLinkRef(url);
  // };

  const handleUploadFile = ({ files }: Inputs) => {
    if (!files?.[0]) {
      return;
    }
    const formData = new FormData();
    formData.append('file', files[0]);
    mutate(formData, {
      onSuccess: (blob: Blob) => {
        setValue('files', null);
        const binaryData = [];
        binaryData.push(blob);
        const url = window.URL.createObjectURL(
          new Blob(binaryData, { type: 'application/vnd.ms-excel' })
        );
        setLinkRef(url);
      },
    });
  };

  const file = watch('files')?.[0];

  return (
    <Card component="form" onSubmit={handleSubmit(handleUploadFile)} sx={{ minHeight: '270px' }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Typography variant="h5" component="h2">
          База даних ФОП
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
        {isSuccess && (
          <Link href={linkRef} download="fopsNotFoundInEmployees.xlsx">
            Завантажити перелік ФОП, які не є працівниками компанії
          </Link>
        )}
      </CardContent>
      <Snackbar
        open={isSuccess || isError}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={isError ? 'error' : 'success'} onClose={reset}>
          {isError
            ? 'Під час синхронізації бази даних ФОП трапилась помилка!'
            : 'Базу даних ФОП успішно синхронізовано!'}
        </Alert>
      </Snackbar>
    </Card>
  );
}
