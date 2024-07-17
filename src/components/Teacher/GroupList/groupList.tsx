import { useTypeSelector } from '@/hooks';
import { useGetGroupsQuery } from '@/redux/groups';
import { List } from '@mui/material';
import { GroupListItem } from 'components/Teacher/GroupList/groupListItem';

export default function GroupList() {
  const { data, isLoading } = useGetGroupsQuery();
  const { filter } = useTypeSelector(state => state.groups);

  return (
    <List component="ul">
      {!isLoading &&
        data &&
        data.data &&
        data.data
          .filter(group =>
            group.name.toLowerCase().includes(filter.toLowerCase())
          )
          .map(group => <GroupListItem key={group.id} {...group} />)}
    </List>
  );
}
