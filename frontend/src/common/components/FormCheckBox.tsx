import { Checkbox, CheckboxProps } from '@mui/material';
import { FieldValues, Path, UseControllerProps, useController } from 'react-hook-form';

type Props<TFieldValues extends FieldValues, TName extends Path<TFieldValues>> = CheckboxProps &
  UseControllerProps<TFieldValues, TName>;

export function FormCheckBox<TFieldValues extends FieldValues, TName extends Path<TFieldValues>>({
  name,
  rules,
  shouldUnregister,
  defaultValue,
  control,
  disabled,
  ...checkboxProps
}: Props<TFieldValues, TName>) {
  const { field } = useController({
    name,
    rules,
    shouldUnregister,
    defaultValue,
    control,
    disabled,
  });

  return <Checkbox {...checkboxProps} {...field} checked={field.value} />;
}
