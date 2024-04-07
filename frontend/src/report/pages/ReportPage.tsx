import LoadingButton from '@mui/lab/LoadingButton';
import { Alert, Card, CardContent, Link, Snackbar, Typography } from '@mui/material';
import { useState } from 'react';
import { useReportQuery } from '../queries/useReportQuery';

export function ReportPage() {
  const { mutate, isPending, isError, isSuccess, reset, error } = useReportQuery();

  const [linkRef, setLinkRef] = useState('');

  const handleReportResponse = (blob: Blob) => {
    const binaryData = [];
    binaryData.push(blob);
    const url = window.URL.createObjectURL(
      new Blob(binaryData, { type: 'application/vnd.ms-excel' })
    );
    setLinkRef(url);
  };

  return (
    <Card component="div" sx={{ minHeight: '270px' }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Typography variant="h5" component="h2">
          Формування звіту
        </Typography>
        <LoadingButton
          loading={isPending}
          disabled={isPending || isSuccess}
          variant="contained"
          type="button"
          style={{ alignSelf: 'start' }}
          onClick={() =>
            mutate(undefined, {
              onSuccess: handleReportResponse,
            })
          }
        >
          Сформувати звіт
        </LoadingButton>

        {isSuccess && (
          <Link href={linkRef} download="dislocationReport.xlsx">
            Завантажити звіт
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
            ? `Під час формування звіту трапилась помилка: ${error.message}`
            : 'Звіт успішно сформовано!'}
        </Alert>
      </Snackbar>
    </Card>
  );
}

// ''
