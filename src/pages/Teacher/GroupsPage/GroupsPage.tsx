import { BreadCrumbsRouter } from 'components/core';
import GroupList from 'components/Teacher/GroupList/groupList';
import GroupListFilters from 'components/Teacher/GroupList/groupListFilters';

const GroupsPage = () => {
  return (
    <>
      <BreadCrumbsRouter />
      <GroupListFilters />
      <GroupList />
    </>
  );
};

export default GroupsPage;
