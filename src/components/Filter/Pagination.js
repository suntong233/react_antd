import { Pagination as AntdPagination, Button } from "antd";

import { GRAY_6 } from "@/utils/color";

import { ReactComponent as RefreshSvg } from "@/images/buttons/refresh.svg";

import styles from "./Pagination.module.scss";

const Pagination = props => {
	const { value = {}, total, onChange = () => {}, ...rest } = props;
	return (
		<div className={styles.main}>
			<Button
				type="borderless"
				onClick={() => onChange({ page: value.page, pageSize: value.pageSize })}
				icon={<RefreshSvg color={GRAY_6} />}
			></Button>
			<span className={styles.text}>共{total}条</span>
			<AntdPagination
				{...rest}
				total={total}
				current={value.page}
				pageSize={value.pageSize}
				onChange={(page, pageSize) => {
					if (pageSize !== value.pageSize) {
						onChange({ page: 1, pageSize });
					} else {
						onChange({ page, pageSize });
					}
				}}
			/>
		</div>
	);
};
export default Pagination;
