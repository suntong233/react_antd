import { useMemo, useReducer, useRef } from "react";
import outStore from "@/store";
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

	return [
		useMemo(
			() =>
				new Proxy(apis, {
					get: (target, pro) => async (params, body) => {
						const {
							url,
							dataFormat = v => v,
							controllerId,
							options,
						} = target[pro];
						if (controllerRef.current[controllerId]) {
							controllerRef.current[controllerId].abort();
						}
						if (controllerId) {
							controllerRef.current[controllerId] = new AbortController();
						}
						dispatch({ type: "get", id: pro });
						try {
							const response = await fetch(addParamToUrl(url, params), {
								headers: {
									"Content-Type": "application/json",
									...options,
								},
								signal: controllerId
									? controllerRef.current[controllerId]
									: null,
								body: JSON.stringify(body),
								...options,
							});
							if (response.ok) {
								const json = await response.json();
								dispatch({ type: "finish", id: pro, json: dataFormat(json) });
								const code = Number(json?.code || "-1");
								if (code !== 0) {
									message.error(json?.msg || "未知错误");
									return new Promise((resolve, reject) => {
										reject(json);
									});
								} else {
									return new Promise((resolve, reject) => {
										resolve(json);
									});
								}
							} else {
								const json = await response.json();
								message.error(json?.msg || "未知错误");
								return new Promise((resolve, reject) => {
									reject(json);
								});
							}
						} catch (err) {
							outStore.dispatch({
								type: "UPDATE_SESSION",
								data: { state: "valid" },
							});
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
