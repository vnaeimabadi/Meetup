import React, {useCallback, useRef, useState} from 'react';
import {preventLeakage} from '../../helpers';
import {supabase} from '../../supabaseClient';

const useClients = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const leakage = useRef(preventLeakage()).current;

  const sendRequest = useCallback(
    async (body: any, applyData: any) => {
      leakage.watch(setIsLoading)(true);
      leakage.watch(setError)(null);

      try {
        const {data, error: responseError} = await supabase
          .from('Clients')
          .select(body);

        if (responseError) {
          throw responseError;
        }

        if (data) {
          applyData(data);
        }

        return data;
      } catch (err) {
        leakage.watch(setError)({
          err,
        });

        throw err;
      } finally {
        leakage.watch(setIsLoading)(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  React.useEffect(() => {
    leakage.subscribe();
    return leakage.unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useClients;
