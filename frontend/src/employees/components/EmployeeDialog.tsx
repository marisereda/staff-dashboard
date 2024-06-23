import LoadingButton from '@mui/lab/LoadingButton';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

type EmployeeDialogProps = {
  isOpened: boolean;
  isPending: boolean;
  onSubmit: () => void;
  onReject: () => void;
  dialogTitle: string;
  dialogContent: string;
};

export const EmployeeDialog = ({
  isOpened,
  isPending,
  onSubmit,
  onReject,
  dialogTitle,
  dialogContent,
}: EmployeeDialogProps) => {
  return (
    <Dialog maxWidth="xl" open={isOpened} onClose={onReject}>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>{dialogContent}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button disabled={isPending} onClick={onReject}>
          Ні
        </Button>
        <LoadingButton
          loading={isPending}
          disabled={isPending}
          variant="contained"
          color="error"
          onClick={onSubmit}
          autoFocus
        >
          Так
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
