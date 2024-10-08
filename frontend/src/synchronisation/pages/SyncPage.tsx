import { Grid } from '@mui/material';
import { SyncBuhForm } from '../components/SyncBuhForm';
import { SyncFopForm } from '../components/SyncFopForm';
import { SyncHRForm } from '../components/SyncHRForm';

export function SyncPage() {
  return (
    <Grid container spacing={4}>
      <Grid item xs={6}>
        <SyncHRForm />
      </Grid>
      <Grid item xs={6}>
        <SyncBuhForm />
      </Grid>
      <Grid item xs={6}>
        <SyncFopForm />
      </Grid>
    </Grid>
  );
}
