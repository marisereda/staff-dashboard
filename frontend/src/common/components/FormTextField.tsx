import { TextField, TextFieldProps } from '@mui/material';
import { FieldValues, Path, UseControllerProps, useController } from 'react-hook-form';

type Props<TFieldValues extends FieldValues, TName extends Path<TFieldValues>> = TextFieldProps &
  UseControllerProps<TFieldValues, TName>;

export function FormTextField<TFieldValues extends FieldValues, TName extends Path<TFieldValues>>({
  name,
  rules,
  shouldUnregister,
  defaultValue,
  control,
  ...textFieldProps
}: Props<TFieldValues, TName>) {
  const { field, fieldState } = useController({
    name,
    rules,
    shouldUnregister,
    defaultValue,
    control,
  });

  return (
    <TextField
      {...textFieldProps}
      variant="outlined"
      fullWidth
      {...field}
      error={fieldState.invalid}
      helperText={fieldState.error?.message}
    />
  );
}
