import SearchIcon from '@mui/icons-material/Search';
import { FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { useEmployeesStore } from '../state';

export function EmployeesFilterBar() {
  const search = useEmployeesStore(s => s.search);
  const fopFilter = useEmployeesStore(s => s.fopFilter);
  const setSearch = useEmployeesStore(s => s.setSearch);
  const setFopFilter = useEmployeesStore(s => s.setFopFilter);

  return (
    <Stack direction="row" spacing={3}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Самозайнята особа</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={fopFilter}
          label="Самозайнята особа"
          onChange={e => setFopFilter(e.target.value)}
        >
          <MenuItem value={'all'}>Всі</MenuItem>
          <MenuItem value={'true'}>Тільки ФОП</MenuItem>
          <MenuItem value={'false'}>Тільки не ФОП</MenuItem>
        </Select>
      </FormControl>
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
