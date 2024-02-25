import { Stack, TableCell, TableHead, TableRow, TableSortLabel, Typography } from '@mui/material';
import { TABLE_HEAD } from '../constants';
import { useEmployeesStore } from '../state';
import { EmployeesSortBy } from '../types';

export const EmployeesTableHead = () => {
  const currentSortBy = useEmployeesStore(s => s.sortBy);
  const sortOrder = useEmployeesStore(s => s.sortOrder);
  const setSorting = useEmployeesStore(s => s.setSorting);

  const handleSortChange = (sortBy: EmployeesSortBy | null) => {
    if (!sortBy) {
      return;
    }
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSorting(sortBy, newSortOrder);
  };

  return (
    <TableHead>
      <TableRow>
        {TABLE_HEAD.map(({ primaryLabel, secondaryLabel, sortBy }, index) => (
          <TableCell
            key={index}
            align="left"
            sortDirection="asc"
            sx={theme => ({
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.common.white,
            })}
          >
            <TableSortLabel
              disabled={!sortBy}
              direction={sortOrder}
              active={currentSortBy === sortBy}
              sx={theme => ({
                '&.MuiTableSortLabel-root': { color: theme.palette.common.white },
                '&.MuiTableSortLabel-root .MuiTableSortLabel-icon': {
                  color: theme.palette.common.white,
                },
              })}
              onClick={() => handleSortChange(sortBy)}
            >
              <Stack>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  {primaryLabel}
                </Typography>
                <Typography variant="caption">{secondaryLabel}</Typography>
              </Stack>
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
