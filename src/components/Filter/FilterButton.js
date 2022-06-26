import React, { useEffect, useMemo } from "react";
import { debounce } from "lodash";
import { Form, Popover, Button } from "antd";
import Icon from "@ant-design/icons";

import { ReactComponent as ClearSvg } from "@/images/buttons/clear.svg";
import { ReactComponent as FilterSvg } from "@/images/buttons/filter.svg";

import styles from "./FilterButton.module.scss";

const FilterForm = props => {
	const { configs, onChange, value } = props;
	const [form] = Form.useForm();

	const items = useMemo(
		() =>
			configs.map(i => (
				<Form.Item {...i} key={i.name}>
					{React.cloneElement(i.view, { placeholder: i.placeholder })}
				</Form.Item>
			)),
		[configs]
	);

	useEffect(() => {
		form.setFieldsValue({ ...value });
	}, [value, form]);

	const handleFilterChange = debounce(
		() => form.validateFields().then(v => onChange(v)),
		500
	);

	return (
		<div className={styles.form}>
			<Form form={form} layout="vertical" onValuesChange={handleFilterChange}>
				{items}
			</Form>
			<div className={styles.bottom}>
				<Button
					type="borderless-gray"
					onClick={() => {
						form.resetFields();
						handleFilterChange();
					}}
					icon={<ClearSvg />}
				></Button>
			</div>
		</div>
	);
};

const FilterButton = props => {
	const { filterConfig = [], onChange = () => {}, value = {} } = props;

	const total = Object.keys(value).filter(
		i => value[i] !== undefined && filterConfig.some(j => j.name === i)
	).length;

	return (
		<Popover
			content={
				<FilterForm value={value} onChange={onChange} configs={filterConfig} />
			}
			placement="bottomRight"
			trigger={"click"}
		>
			<Button type="primary" className={styles.main}>
				<Icon component={FilterSvg} />
				筛选
				<div className={styles.total}>{total}</div>
			</Button>
		</Popover>
	);
};
export default FilterButton;
