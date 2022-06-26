import FilterButton from "./FilterButton";
import Pagination from "./Pagination";

const useTableFilter = (filterProps, pageProps, onChange) => {
	return [
		<FilterButton
			{...filterProps}
			onChange={e => onChange({ ...Object.assign(pageProps.value, e) })}
		/>,
		<Pagination
			{...pageProps}
			onChange={e => onChange({ ...Object.assign(filterProps.value, e) })}
		/>,
	];
};

export default useTableFilter;
