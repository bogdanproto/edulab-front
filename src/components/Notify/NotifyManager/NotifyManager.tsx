import { useTypeSelector } from '@/hooks';
import { selectNotify } from '@/redux/notifySlice';
import { ToastContainer } from 'react-toastify';

import { Loader } from '../Loader/Loader';

export const NotifyManager = () => {
  const { isLoading } = useTypeSelector(selectNotify);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {isLoading && <Loader />}
    </>
  );
};
