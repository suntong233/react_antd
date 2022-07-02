import { useEffect, useMemo, useReducer, useRef } from "react";
import { message } from "antd";

const addParamToUrl = (url, params = {}) => {
	const keys = Object.keys(params);
	if (keys.length === 0) return url;
	return (
		url +
		keys.reduce((pre, cur, index) => {
			if (index !== keys.length - 1) {
				return `${pre}${cur}=${params[cur]}&`;
			} else {
				return `${pre}${cur}=${params[cur]}`;
			}
		}, "?")
	);
};
const useFetch = apis => {
	const controllerRef = useRef({});
	const [store, dispatch] = useReducer(
		(state, action) => {
			switch (action.type) {
				case "get": {
					const { loading } = state;
					const { id } = action;
					return {
						...state,
						loading: {
							...loading,
							[id]: true,
						},
					};
				}
				case "finish": {
					const { loading, data } = state;
					const { id, json } = action;
					return {
						...state,
						loading: {
							...loading,
							[id]: false,
						},
						data: {
							...data,
							[id]: json,
						},
					};
				}
				default: {
					return { ...state };
				}
			}
		},
		{ data: {}, loading: {} }
	);

	const getData = fn => fn(store.data);
	const isLoading = fn => fn(store.loading);

	useEffect(() => {
		const { current } = controllerRef;
		return () => {
			if (current) {
				const keys = Object.keys(current);
				keys.forEach(i => {
					const fn = current[i];
					fn?.abort();
				});
			}
		};
	}, [controllerRef]);

	return [
		useMemo(
			() =>
				new Proxy(apis, {
					get:
						(target, pro) =>
						async (args = {}) => {
							try {
								const {
									url,
									dataFormat = v => v,
									controllerId,
									options,
									headers,
									showError,
									params,
								} = target[pro]({ ...args });
								if (controllerRef.current[controllerId]) {
									controllerRef.current[controllerId].abort();
								}
								if (controllerId) {
									controllerRef.current[controllerId] =
										new AbortController();
								}
								dispatch({ type: "get", id: pro });
								const response = await fetch(
									addParamToUrl(url, params),
									{
										headers: {
											"Content-Type": "application/json",
											...headers,
										},
										signal: controllerId
											? controllerRef.current[
													controllerId
											  ]
											: null,
										...options,
									}
								);
								const json = await response.json();
								dispatch({
									type: "finish",
									id: pro,
									json: dataFormat(json),
								});
								if (response.ok) {
									const code = Number(json?.code ?? "-1");
									if (code !== 0) {
										if (showError && json?.message)
											message.error(
												json?.message || "未知错误"
											);
										return new Promise(
											(resolve, reject) => {
												reject(json);
											}
										);
									} else {
										return new Promise(
											(resolve, reject) => {
												resolve(json);
											}
										);
									}
								} else {
									if (showError && json?.message)
										message.error(
											json?.message || "未知错误"
										);
									return new Promise((resolve, reject) => {
										reject(json);
									});
								}
							} catch (err) {
								return new Promise((resolve, reject) => {
									reject(err);
								});
							}
						},
				}),
			[apis, dispatch]
		),
		getData,
		isLoading,
	];
};

export default useFetch;
