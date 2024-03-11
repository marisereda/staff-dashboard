import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, Stack, TextField } from '@mui/material';
import { useStoresQuery } from '../../stores/queries/useStoresQuery';
import { useEmployersStore } from '../state';

export function EmployersFilterBar() {
  const search = useEmployersStore(s => s.search);
  const storeId = useEmployersStore(s => s.storeId);
  const setSearch = useEmployersStore(s => s.setSearch);
  const setStoreId = useEmployersStore(s => s.setStoreId);

  const { data: storesPage } = useStoresQuery({
    q: '',
    sortBy: 'address',
    sortOrder: 'asc',
    page: 1,
  });

  const storesOptions =
    storesPage?.data.map(store => ({ label: store.address, id: store.id })) ?? [];

  let currentStoreOption;
  if (storesOptions.length > 0 && storeId) {
    currentStoreOption = storesOptions.find(option => option.id === storeId);
  }

  return (
    <Stack direction="row" spacing={3} sx={{ justifyContent: 'right' }}>
      <Autocomplete
        disablePortal
        options={storesOptions}
        value={currentStoreOption || null}
        sx={{ width: '40%' }}
        onChange={(_, value) => setStoreId(value ? value.id : '')}
        renderInput={params => <TextField {...params} label="Магазин" />}
      />
      <TextField
        id="outlined-basic"
        label=""
        variant="outlined"
        InputProps={{ startAdornment: <SearchIcon /> }}
        sx={{ maxWidth: 500, width: '100%', alignSelf: 'center' }}
        value={search}
        onChange={e => setSearch(e.currentTarget.value)}
      />
    </Stack>
  );
}
