import { authApi } from '@/redux/auth/authApi';
import { useGetGroupsQuery } from '@/redux/groups';
import { removeSpacesAndLowerCase } from '@/utils';
import { Stack } from '@mui/material';
import AdminTabsHeader from 'components/Admin/AdminTabsHeader';
import { Toaster } from 'components/Notify/Toaster/Toaster';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StudentToRegister } from 'types/user';
import * as XLSX from 'xlsx';

import AddStudentsTable from './AddStudentsTable';

type RequiredColumn = {
  ui: string;
  dev: keyof StudentToRegister;
};

type DataObject = {
  [key: string]: string;
};

const AddStudents = () => {
  const [typeError, setTypeError] = useState<string | null>(null);
  const [excelData, setExcelData] = useState<StudentToRegister[]>([]);
  const [isFileUploading, setIsFileUploading] = useState<boolean>(false);
  const groupsData = useGetGroupsQuery();
  const groups = groupsData.data?.data || [];
  const groupOptions = groups.map(group => group.name);

  const [importUsers, { isLoading, isError, isSuccess, data }] =
    authApi.useImportUsersMutation();

  const navigate = useNavigate();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsFileUploading(true);
    setTypeError(null);

    const allowedFileTypes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv',
    ];
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      setIsFileUploading(false);

      return;
    }

    if (selectedFile && allowedFileTypes.includes(selectedFile.type)) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(selectedFile);
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const workbook = XLSX.read(event.target?.result, { type: 'buffer' });
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];
        const data: unknown[] = XLSX.utils.sheet_to_json(worksheet);

        const requiredColumns: RequiredColumn[] = [
          { ui: 'First name', dev: 'firstName' },
          { ui: 'Last name', dev: 'lastName' },
          { ui: 'Email', dev: 'email' },
          { ui: 'Group name', dev: 'groupName' },
        ];

        const normalizeKey = (key: string) => removeSpacesAndLowerCase(key);

        const completeRow = (data as DataObject[]).find(row => {
          const rowKeys = Object.keys(row).map(normalizeKey);

          return rowKeys.length === requiredColumns.length;
        });

        if (!completeRow) {
          setTypeError('Please consider fill in at least 1 row in your file');
          setIsFileUploading(false);

          return;
        }

        const excelHeadingCells = Object.keys(completeRow).map(normalizeKey);

        const missingColumnsUI = requiredColumns.reduce(
          (missing: string[], column) => {
            const columnKey = normalizeKey(column.dev);
            if (!excelHeadingCells.includes(columnKey)) {
              missing.push(column.ui);
            }

            return missing;
          },
          []
        );

        if (missingColumnsUI.length > 0) {
          setTypeError(
            `Missing required heading columns: ${missingColumnsUI.join(', ')}`
          );
          setIsFileUploading(false);

          return;
        }

        const dataWithFormattedObjects = (data as DataObject[]).map(user => {
          const formattedObject: Partial<StudentToRegister> = {};
          requiredColumns.forEach(column => {
            const columnKey = normalizeKey(column.dev);
            const excelColumnKey = Object.keys(user).find(
              key => normalizeKey(key) === columnKey
            );
            if (column.dev === 'groupName') {
              const groupName = user[excelColumnKey as string] ?? '';
              formattedObject[column.dev] = groupOptions.includes(groupName)
                ? groupName
                : '';
            } else {
              formattedObject[column.dev] =
                user[excelColumnKey as string] ?? '';
            }
          });
          formattedObject.id = (Math.random() + 1).toString(36).substring(7);

          return formattedObject as StudentToRegister;
        });

        setExcelData(dataWithFormattedObjects);
        setIsFileUploading(false);
      };

      event.target.value = '';
    } else {
      setTypeError('Please select only excel file type');
      setIsFileUploading(false);
    }
  };

  const navigateBack = () => {
    navigate('/admin/users');
  };

  const handleSubmit = async (students: StudentToRegister[]) => {
    const formattedStudents = students.map(user => ({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      group: user.groupName,
    }));

    await importUsers(formattedStudents);
    setExcelData([]);
  };

  return (
    <Stack spacing={3}>
      <AdminTabsHeader title="Add Students" onBackBtnClick={navigateBack} />

      {typeError && <Toaster type={'error'} message={typeError} />}

      {isSuccess && (
        <Toaster
          type={'success'}
          message={data?.message ?? 'Students have been added'}
        />
      )}

      {isError && (
        <Toaster
          type={'error'}
          message="Error loading data, please try again"
        />
      )}

      <AddStudentsTable
        students={excelData}
        handleFileUpload={handleFileUpload}
        isFileUploading={isFileUploading}
        fileTypeError={typeError}
        onSubmit={handleSubmit}
        groupOptions={groupOptions}
        isLoading={isLoading}
        isError={isError}
      />
    </Stack>
  );
};

export default AddStudents;
