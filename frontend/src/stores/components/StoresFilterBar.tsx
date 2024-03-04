import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, Stack, TextField } from '@mui/material';
import { useStoresQuery } from '../queries/useStoresQuery';
import { useStoresStore } from '../state';

export function StoresFilterBar() {
  const search = useStoresStore(s => s.search);
  const setSearch = useStoresStore(s => s.setSearch);
  const setStoreId = useStoresStore(s => s.setStoreId);

  const { data: storesPage } = useStoresQuery({
    q: '',
    sortBy: 'address',
    sortOrder: 'asc',
    page: 1,
  });

  const storesOptions =
    storesPage?.data.map(store => ({ label: store.address, id: store.id })) ?? [];

  return (
    <Stack direction="row" spacing={3} sx={{ justifyContent: 'right' }}>
      <Autocomplete
        disablePortal
        options={storesOptions}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        sx={{ width: '40%' }}
        onChange={(_, value) => setStoreId(value ? value.id : '')}
        renderInput={params => <TextField {...params} label="Адреса магазина" />}
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
