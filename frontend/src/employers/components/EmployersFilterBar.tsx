import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';
import { useEmployersStore } from '../state';

export function EmployersFilterBar() {
  const search = useEmployersStore(s => s.search);
  const setSearch = useEmployersStore(s => s.setSearch);

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
