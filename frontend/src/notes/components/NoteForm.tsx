import { zodResolver } from '@hookform/resolvers/zod';
import DeleteIcon from '@mui/icons-material/Delete';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { FormCheckBox } from '../../common/components/FormCheckBox';
import { FormTextField } from '../../common/components/FormTextField';
import { useNoteStore } from '../state';
import { UpdateNoteInputs } from '../types';
import { UpdateNoteSchema } from '../validation';

import { useEffect } from 'react';
import { DialogConfirm } from '../../common/components/DialogConfirm';
import { useGetEmployeeById } from '../../employees/queries';
import { useCreateNote } from '../queries/useCreateNote';
import { useDeleteNote } from '../queries/useDeleteNote';
import { useUpdateNote } from '../queries/useUpdateNote';

export const NoteForm = () => {
  const employeeId = useNoteStore(s => s.employeeId);
  const setEmployeeId = useNoteStore(s => s.setEmployeeId);
  const isDialogConfirmOpen = useNoteStore(s => s.isDialogConfirmOpen);
  const setIsDialogConfirmOpen = useNoteStore(s => s.setIsDialogConfirmOpen);

  const { mutate: update, isPending: isPendingUpdation } = useUpdateNote();
  const { mutate: create, isPending: isPendingCreation } = useCreateNote();
  const { mutate: deleteNote, isPending: isPendingDeleting } = useDeleteNote();
  const isLoading = isPendingUpdation || isPendingCreation || isPendingDeleting;

  const { data: employee, isLoading: getEmployeeIsLoading } = useGetEmployeeById(employeeId);
  const { control, handleSubmit, setValue, reset } = useForm<UpdateNoteInputs>({
    defaultValues: {
      content: '',
      isDone: false,
      isImportant: false,
    },
    resolver: zodResolver(UpdateNoteSchema),
  });

  useEffect(() => {
    setValue('content', employee?.note?.content ?? '');
    setValue('isImportant', employee?.note?.isImportant ?? false);
    setValue('isDone', employee?.note?.isDone ?? false);
  }, [employee, setValue]);

  const onSubmit = (data: UpdateNoteInputs) => {
    if (employeeId && employee) {
      employee.note
        ? update(
            { ...data, ownerId: employeeId, id: employee?.note?.id },
            {
              onSuccess: () => {
                handleClose();
                reset();
              },
            }
          )
        : create(
            { ...data, ownerId: employeeId },
            {
              onSuccess: () => {
                handleClose();
                reset();
              },
            }
          );
    }
  };

  const handleClose = () => {
    setEmployeeId(null);
  };

  const handleDeleteNote = () => {
    deleteNote(employee!.note!.id);
    handleClose();
  };

  return (
    <>
      <Dialog
        maxWidth="xl"
        open={Boolean(employeeId)}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit(onSubmit),
        }}
        onClose={handleClose}
      >
        <DialogTitle>Нотатка</DialogTitle>
        <DialogContent sx={{ minWidth: '500px' }}>
          <Stack gap={3}>
            <DialogContentText sx={{ color: 'InactiveCaptionText', fontWeight: 600 }}>
              <Typography>{employee?.name}</Typography>
              <Typography> {`ІПН: ${employee?.inn ?? ''}`}</Typography>
            </DialogContentText>

            <FormTextField
              label="Зміст нотатки"
              name="content"
              multiline
              maxRows={4}
              control={control}
            />
            <FormGroup>
              <FormControlLabel
                label="важливо"
                control={<FormCheckBox name="isImportant" control={control} />}
              />
              <FormControlLabel
                label="зроблено"
                control={<FormCheckBox name="isDone" control={control} />}
              />
            </FormGroup>
          </Stack>
        </DialogContent>
        <DialogActions>
          <IconButton
            disabled={!employee?.note || isLoading}
            sx={{ marginRight: 'auto' }}
            color="error"
            onClick={() => {
              setIsDialogConfirmOpen(true);
            }}
          >
            <DeleteIcon />
          </IconButton>
          <Button
            disabled={isLoading}
            onClick={() => {
              handleClose(), reset();
            }}
          >
            Скасувати
          </Button>
          <LoadingButton
            loading={isPendingUpdation || isPendingCreation}
            disabled={getEmployeeIsLoading}
            variant="contained"
            color="primary"
            type="submit"
          >
            Зберегти
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <DialogConfirm
        isOpened={isDialogConfirmOpen}
        isPending={isPendingDeleting}
        onSubmit={() => {
          handleDeleteNote();
          setIsDialogConfirmOpen(false);
        }}
        onReject={() => {
          setIsDialogConfirmOpen(false);
        }}
        dialogTitle="Підтвердить видалення"
        dialogContent="Ви дійсно бажаєте видалити нотатку?"
      />
    </>
  );
};
