import {
  TableHead as MuiTableHead,
  Stack,
  TableCell,
  TableRow,
  TableSortLabel,
  Typography,
} from '@mui/material';
import { SortOrder } from '../types';

export type HeadColumnOptions<TSortBy> = {
  primaryLabel: string | null;
  secondaryLabel: string | null;
  sortBy: TSortBy | null;
};

type Props<TSortBy> = {
  columns: HeadColumnOptions<TSortBy>[];
  sortBy: TSortBy;
  sortOrder: SortOrder;
  onSortChange: (sortBy: TSortBy, sortOrder: SortOrder) => void;
};

export const TableHead = <TSortBy,>({
  columns,
  sortBy,
  sortOrder,
  onSortChange,
}: Props<TSortBy>) => {
  const handleSortChange = (newSortBy: TSortBy | null) => {
    if (!newSortBy) {
      return;
    }
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';

    onSortChange(newSortBy, newSortOrder);
  };

  return (
    <MuiTableHead>
      <TableRow>
        {columns.map(({ primaryLabel, secondaryLabel, sortBy: columnSortBy }, index) => (
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
              active={columnSortBy === sortBy}
              hideSortIcon={!columnSortBy}
              sx={theme => ({
                '&.MuiTableSortLabel-root': { color: theme.palette.common.white },
                '&.MuiTableSortLabel-root .MuiTableSortLabel-icon': {
                  color: theme.palette.common.white,
                },
              })}
              onClick={() => handleSortChange(columnSortBy)}
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
    </MuiTableHead>
  );
};
