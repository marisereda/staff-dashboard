import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';
import { useStoresStore } from '../state';

export function StoresFilterBar() {
  const search = useStoresStore(s => s.search);
  const setSearch = useStoresStore(s => s.setSearch);

  return (
    <div>
      <TextField
        id="outlined-basic"
        label=""
        variant="outlined"
        InputProps={{ startAdornment: <SearchIcon /> }}
        sx={{ maxWidth: 500, width: '100%', alignSelf: 'center' }}
        value={search}
        onChange={e => setSearch(e.currentTarget.value)}
      />
    </div>
  );
}
