import { useState, useCallback, useMemo } from 'react';
import { User } from 'types/user';

type UseUsersFilterProps = {
  users: User[];
  onSearchInputChange: (
    event: React.ChangeEvent<HTMLInputElement> | string
  ) => void;
};

export const useUsersFilter = ({ users }: UseUsersFilterProps) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearchInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement> | string) => {
      const query = typeof event === 'string' ? event : event.target.value;
      setSearchQuery(query);
    },
    []
  );

  const filteredUsers = useMemo(() => {
    const normalizedSearchQuery = searchQuery.toLowerCase().trim();
    if (!normalizedSearchQuery) {
      return users;
    }

    const result = users.filter(user =>
      user.lastName.toLowerCase().startsWith(normalizedSearchQuery)
    );

    return result.slice(0);
  }, [searchQuery, users]);

  return { filteredUsers, handleSearchInputChange };
};
