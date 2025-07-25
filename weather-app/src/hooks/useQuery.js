import { useState, useCallback } from "react";

const useQuery = (url, options = {}) => {
  const {
    successCallback = () => {},
    failureCallback = () => {},
    settledCallback = () => {},
    retries = 3,
    retryDelay = 1000,
  } = options;

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWithRetry = useCallback(
    async (retryCount) => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
        successCallback(result);
      } catch (err) {
        if (retryCount > 0) {
          setTimeout(() => fetchWithRetry(retryCount - 1), retryDelay);
        } else {
          setError(err);
          failureCallback(err);
        }
      } finally {
        setLoading(false);
        settledCallback();
      }
    },
    [failureCallback, retryDelay, settledCallback, successCallback, url]
  );

  const executeQuery = useCallback(() => {
    /* setData(null);
    setError(null); */
    fetchWithRetry(retries);
  }, [fetchWithRetry, retries]);

  return { data, error, loading, executeQuery };
};

export default useQuery;
