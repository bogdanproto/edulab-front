import { useMemo, useCallback } from 'react';
import { StudentToRegister } from 'types/user';

const useUserValidation = () => {
  const validateRequired = useCallback((value: string | null) => {
    return value !== null && value.trim() !== '';
  }, []);

  const validateEmail = useCallback(
    (email: string) =>
      !!email.length &&
      email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ),
    []
  );

  const validateUser = useMemo(
    () => (user: StudentToRegister) => {
      return {
        firstName: !validateRequired(user.firstName)
          ? 'First Name is Required'
          : '',
        lastName: !validateRequired(user.lastName)
          ? 'Last Name is Required'
          : '',
        email: !validateEmail(user.email) ? 'Incorrect Email Format' : '',
        group: !validateRequired(user.groupName!)
          ? 'Group Name is Required'
          : '',
      };
    },
    [validateRequired, validateEmail]
  );

  return { validateRequired, validateEmail, validateUser };
};

export default useUserValidation;
