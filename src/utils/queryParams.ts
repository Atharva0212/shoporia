export function updateQueryParams({ queryParams }: { queryParams: Record<string, string | number | boolean | null | undefined> }) {
    const searchParams = new URLSearchParams(window.location.search);

    Object.entries(queryParams).forEach(([key, value]) => {
         const isEmpty =
        value === null ||
        value === undefined ||
        (typeof value === "string" && value.trim() === "");

         if (!isEmpty) {
            searchParams.set(key, String(value));
        } else {
            searchParams.delete(key);
        }
    });
    const queryString = searchParams.toString();

    window.history.replaceState(null, '', queryString ? `?${queryString}` : window.location.pathname);
}
export function clearQueryParams() {
    const url = window.location.origin + window.location.pathname;
    window.history.replaceState(null, '', url);
}

export function getSearchParams() {
  return new URLSearchParams(window.location.search);
}