import { useGetTestsQuery } from '@/redux/tests/testsApi';
import { toFilterByString } from '@/utils';
import {
  List,
  Button,
  Typography,
  Box,
  Stack,
  Pagination,
} from '@mui/material';
import { Modal, SearchInput } from 'components/core';
import { useState } from 'react';

import TestEditForm from './TestEditForm';
import TestItem from './TestItem';

const TEST_PER_PAGE = 10;

const TestList = () => {
  const [isOpenEditModal, setOpenEditModal] = useState(false);
  const [filter, setFilter] = useState<string>('');
  const { data } = useGetTestsQuery();
  const [page, setPage] = useState(1);

  const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const testList = toFilterByString(data?.data || [], filter);
  const totalTests = testList.length;
  const testListDisplay = testList.slice(
    (page - 1) * TEST_PER_PAGE,
    page * TEST_PER_PAGE
  );

  const handleEdit = () => {
    setOpenEditModal(true);
  };

  const handleSearch = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(evt.target.value);
  };

  return (
    <>
      <Stack
        justifyContent="space-between"
        alignItems="center"
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        pb={1}
        mt={1}
      >
        <Box sx={{ width: { xs: '100%', sm: '280px' } }}>
          <SearchInput onChange={handleSearch} placeholder={'Search course'} />
        </Box>
        <Button
          variant="contained"
          onClick={handleEdit}
          sx={{ width: { xs: '100%', sm: 'initial' } }}
        >
          Add test
        </Button>
      </Stack>
      <List component="ul">
        {testListDisplay.map(test => (
          <TestItem key={test.id} test={test} />
        ))}
      </List>

      {Math.ceil(totalTests / TEST_PER_PAGE) > 1 && (
        <Stack mt={2}>
          <Pagination
            count={Math.ceil(totalTests / TEST_PER_PAGE)}
            variant="outlined"
            shape="rounded"
            page={page}
            onChange={handleChangePage}
          />
        </Stack>
      )}

      <Modal isOpenModal={isOpenEditModal} setOpenModal={setOpenEditModal}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add new test
        </Typography>

        <TestEditForm setOpenEditModal={setOpenEditModal} />
      </Modal>
    </>
  );
};

export default TestList;
