import { Form, Input, Button, message, Checkbox } from "antd";
import moment from "moment";

import useFetch from "@/hooks/useFetch";
import { GRAY_5 } from "@/utils/color";
import store from "@/store";

import * as Apis from "./action";

import { ReactComponent as UsernameSvg } from "@/images/login/username.svg";
import { ReactComponent as PasswordSvg } from "@/images/login/password.svg";

import styles from "./index.module.scss";

const formlayout = {
	colon: false,
};

const Main = () => {
	const [form] = Form.useForm();
	const year = moment().format("YYYY");
	const [fetchs] = useFetch(Apis);
	return (
		<div className={styles.main}>
			<div className={styles.header}>
				<div className={styles.logo} />
			</div>
			<div className={styles.body}>
				<div className={styles.content}>
					<div className={styles.left}></div>
					<div className={styles.right}>
						<div className={styles.welcome}>后台管理平台</div>
						<Form {...formlayout} form={form}>
							<Form.Item
								name="username"
								rules={[
									{ required: true, message: "请输入用户名" },
								]}
							>
								<Input
									prefix={<UsernameSvg color={GRAY_5} />}
									placeholder="请输入用户名"
								/>
							</Form.Item>
							<Form.Item
								name="password"
								rules={[
									{ required: true, message: "请输入密码" },
								]}
							>
								<Input.Password
									prefix={<PasswordSvg color={GRAY_5} />}
									placeholder="请输入密码"
								/>
							</Form.Item>
							<Form.Item>
								<Checkbox>记住密码</Checkbox>
							</Form.Item>
							<Form.Item>
								<Button
									type="primary"
									style={{ width: "100%" }}
									onClick={() =>
										form.validateFields().then(v => {
											fetchs
												.login({ params: { ...v } })
												.then(res => {
													message.success(
														"登录成功",
														3
													);
													return res;
												})
												.then(_ => {
													store.dispatch({
														type: "UPDATE_SESSION",
														data: {
															state: "valid",
														},
													});
												});
										})
									}
								>
									登录
								</Button>
							</Form.Item>
						</Form>
					</div>
				</div>
			</div>
			<div className={styles.info}>
				{`CopyRight©2020-${year} 登录界面 | 孙通 | All Rights Reserved.`}
			</div>
		</div>
	);
};
export default Main;
