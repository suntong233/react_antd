declare function useFetch<T>(
	actions: T
): [T, (key: string) => any, (key: string) => boolean];

export default useFetch;
