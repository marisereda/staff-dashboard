import LoadingButton from '@mui/lab/LoadingButton';
import { Alert, Card, CardContent, Snackbar, Typography } from '@mui/material';
import { useReportQuery } from '../queries/useReportQuery';

export function ReportPage() {
  const { mutate, isPending, isError, isSuccess, reset } = useReportQuery();

  return (
    <Card component="div" sx={{ minHeight: '270px' }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Typography variant="h5" component="h2">
          Формування звіту
        </Typography>

        <LoadingButton
          loading={isPending}
          disabled={isPending}
          variant="contained"
          type="button"
          style={{ alignSelf: 'start' }}
          onClick={() => mutate()}
        >
          Сформувати звіт
        </LoadingButton>
      </CardContent>
      <Snackbar
        open={isSuccess || isError}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={isError ? 'error' : 'success'} onClose={reset}>
          {isError ? 'Під час формування звіту трапилась помилка!' : 'Звіт успішно сформовано!'}
        </Alert>
      </Snackbar>
    </Card>
  );
}

// 'Під час формування звіту трапилась помилка!'
