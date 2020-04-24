import { useState, useCallback } from "react";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setLoading(true);
      try {
        if (body) {
          body = JSON.stringify(body);
          headers["Content-Type"] = "application/json";
        }

        const response = await fetch(url, { method, body, headers });
        const data = await response.json();

        if (!response.ok) {
          console.log(data.errors);
          if (data.errors !== undefined) {
            for (let a = 0; a < data.errors.length; a++) {
              console.log("Errs", data.errors[a].msg);
              throw new Error(data.errors[a].msg || "Что-то пошло не так");
            }
          }
          throw new Error(data.message || "Что-то пошло не так");
        }

        setLoading(false);
        return data;
      } catch (error) {
        setLoading(false);
        setError(error.message);
        throw error;
      }
    },
    [] // ???
  );

  const clearError = useCallback(() => setError(null), []);

  return { loading, request, error, clearError };
};
