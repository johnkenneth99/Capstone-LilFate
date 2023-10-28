import useSWR from "swr";

const useSWRHook = ({ key, fetcher }) => {
  const swrOptions = {
    revalidateOnMount: true,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  };

  const { data, error, isLoading } = useSWR(key, fetcher, swrOptions);
};

export default useSWRHook;
