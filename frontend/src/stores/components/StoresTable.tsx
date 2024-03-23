import { IconButton, Table, TableBody } from '@mui/material';

import { TableHead } from '../../common/components/TableHead';
import { STORES_HEAD_COLUMNS } from '../constants';
import { useStoresStore } from '../state';
import { Store } from '../types';
import { StoresTableRow } from './StoresTableRow';

type StoresTableProps = {
  stores: Store[];
};

export const StoresTable = ({ stores }: StoresTableProps) => {
  const sortBy = useStoresStore(s => s.sortBy);
  const sortOrder = useStoresStore(s => s.sortOrder);
  const setSorting = useStoresStore(s => s.setSorting);

  return (
    <Table aria-label="simple table">
      <TableHead
        columns={STORES_HEAD_COLUMNS}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortChange={setSorting}
        renderActions={() => (
          <IconButton aria-label="delete" color="inherit" disabled={true}></IconButton>
        )}
      />
      <TableBody>
        {stores.map(store => (
          <StoresTableRow key={store.id} store={store} />
        ))}
      </TableBody>
    </Table>
  );
};
