import { getGrades } from '@/utils';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from '@mui/material';
import React, { useState } from 'react';
import { Task } from 'types/task';

import { StudentLinearProgressWithLabel } from './StudentLinearProgress';

interface GradesTableProps {
  lessons: { [lessonTitle: string]: Task[] };
}

const StudentGradeLessons: React.FC<GradesTableProps> = ({ lessons }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const rows = Object.entries(lessons).map(([lessonName, tasks]) => ({
    lessonName,
    homeworkGrades: getGrades(tasks, 'homework'),
    testGrades: getGrades(tasks, 'test'),
  }));

  return (
    <Paper sx={{ width: '100%' }} elevation={3}>
      <TableContainer>
        <Table
          stickyHeader
          aria-label="sticky table"
          sx={{ width: '100%', tableLayout: 'fixed' }}
        >
          <TableHead>
            <TableRow>
              <TableCell style={{ width: '38%', fontWeight: 'bold' }}>
                Lesson Title
              </TableCell>
              <TableCell
                align="center"
                style={{ width: '32%', fontWeight: 'bold' }}
              >
                Homework Grade
              </TableCell>
              <TableCell
                align="center"
                style={{ width: '32%', fontWeight: 'bold' }}
              >
                Test Grade
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => (
                <TableRow hover role="checkbox" key={row.lessonName}>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ minWidth: '36%', maxWidth: '200px' }}
                  >
                    {row.lessonName}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ minWidth: '32%', maxWidth: '100px' }}
                  >
                    <StudentLinearProgressWithLabel
                      value={
                        isNaN(Number(row.homeworkGrades))
                          ? row.homeworkGrades
                          : Number(row.homeworkGrades)
                      }
                    />
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ minWidth: '32%', maxWidth: '100px' }}
                  >
                    <StudentLinearProgressWithLabel
                      value={
                        isNaN(Number(row.testGrades))
                          ? row.testGrades
                          : Number(row.testGrades)
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {rows.length > rowsPerPage && (
        <TablePagination
          rowsPerPageOptions={[6, 12, 24]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            '& .MuiTablePagination-toolbar': {
              padding: '6px',
              fontSize: '0.8rem',
            },
            '& .MuiTablePagination-actions': {
              flexShrink: 0,
              marginLeft: '5px',
            },
            '& .MuiInputBase-root': {
              marginRight: '5px',
              marginLeft: '5px',
            },
            '& .MuiTablePagination-displayedRows': {
              fontSize: '0.8rem',
            },
          }}
        />
      )}
    </Paper>
  );
};

export default StudentGradeLessons;
