import { useCallback, useEffect, useState } from "react";

const readParam = <T extends string>(key: string, defaultValue: T): T => {
  const params = new URLSearchParams(window.location.search);
  return (params.get(key) as T) ?? defaultValue;
};

export const useSearchParams = <T extends string>(
  key: string,
  defaultValue: T,
): [T, (value: T) => void] => {
  const [value, setValue] = useState<T>(() => readParam(key, defaultValue));

  useEffect(() => {
    const onPopState = () => {
      setValue(readParam(key, defaultValue));
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [key, defaultValue]);

  const set = useCallback(
    (next: T) => {
      setValue(next);

      const nextParams = new URLSearchParams(window.location.search);

      if (next === defaultValue) {
        nextParams.delete(key);
      } else {
        nextParams.set(key, next);
      }

      const search = nextParams.toString();
      window.history.pushState(null, '', search ? `?${search}` : window.location.pathname);
    },
    [key, defaultValue],
  );

  return [value, set];
};
