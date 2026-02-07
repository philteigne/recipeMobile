export const buildUrl = (
  path: string, 
  params?: Record<string, string | undefined>,
) => {
  const searchParams = new URLSearchParams();
  
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value) searchParams.set(key, value);
    }
  }

  const query = searchParams.toString();
  return query ? `${path}?${query}` : path;
};