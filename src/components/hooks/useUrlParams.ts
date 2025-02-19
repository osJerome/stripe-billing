import { useState, useEffect } from "react";

export const useUrlParam = (paramKey: string): string | null => {
  const [paramValue, setParamValue] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const value = params.get(paramKey);
    setParamValue(value);
  }, [paramKey]);

  return paramValue;
};
