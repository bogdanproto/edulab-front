import { MRT_ColumnDef } from 'material-react-table';
import { Group } from 'types/group';

interface ColumnsProps {
  validationErrors: Record<string, string>;
  setValidationErrors: React.Dispatch<
    React.SetStateAction<Record<string, string>>
  >;
}

const columns = ({
  validationErrors,
  setValidationErrors,
}: ColumnsProps): MRT_ColumnDef<Group>[] => [
  {
    accessorKey: 'id',
    header: 'Id group',
    enableEditing: false,
    Edit: () => null,
  },
  {
    accessorKey: 'name',
    header: 'Group',
    muiEditTextFieldProps: {
      required: true,
      error: !!validationErrors?.name,
      helperText: validationErrors?.name,
      onFocus: () =>
        setValidationErrors({
          ...validationErrors,
          name: validationErrors?.name || '',
        }),
    },
  },
];

export default columns;
