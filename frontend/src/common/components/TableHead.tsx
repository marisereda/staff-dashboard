import {
  TableHead as MuiTableHead,
  Stack,
  TableCell,
  TableRow,
  TableSortLabel,
  Typography,
} from '@mui/material';
import { ReactNode } from 'react';
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
  renderActions?: () => ReactNode;
};

export const TableHead = <TSortBy,>({
  columns,
  sortBy,
  sortOrder,
  onSortChange,
  renderActions: RenderActions,
}: Props<TSortBy>) => {
  const handleSortChange = (newSortBy: TSortBy | null) => {
    if (!newSortBy) {
      return;
    }
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';

    onSortChange(newSortBy, newSortOrder);
  };

  return (
    <>
      <MuiTableHead>
        <TableRow>
          {columns.map(({ primaryLabel, secondaryLabel, sortBy: columnSortBy }, index) => (
            <TableCell
              key={index}
              align="left"
              sortDirection="asc"
              sx={theme => ({
                backgroundColor: theme.palette.grey.A700,
              })}
            >
              <TableSortLabel
                disabled={!sortBy}
                direction={sortOrder}
                active={columnSortBy === sortBy}
                hideSortIcon={!columnSortBy}
                sx={theme => ({
                  '&.MuiTableSortLabel-root': { color: theme.palette.primary.contrastText },
                  '&.MuiTableSortLabel-root .MuiTableSortLabel-icon': {
                    color: theme.palette.primary.contrastText,
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

          {RenderActions && (
            <TableCell
              sx={theme => ({
                backgroundColor: theme.palette.grey.A700,
                color: theme.palette.primary.contrastText,
              })}
              align="right"
            >
              <RenderActions />
            </TableCell>
          )}
        </TableRow>
      </MuiTableHead>
    </>
  );
};
