import { useEffect, useState } from "react";
import { Form, Input, Button, Spin, message, Checkbox } from "antd";
import moment from "moment";
import cookie from "react-cookies";

import useFetch from "@/hooks/useFetch";
import { GRAY_5 } from "@/utils/color";

import * as Apis from "./action";

import { ReactComponent as UsernameSvg } from "@/images/login/username.svg";
import { ReactComponent as PasswordSvg } from "@/images/login/password.svg";
import { ReactComponent as CaptchaSvg } from "@/images/login/captcha.svg";

import styles from "./index.module.scss";

const formlayout = {
	colon: false,
};

const Captcha = props => {
	const { refreshKey, setRefreshKey, value, onChange } = props;
	const [fetchs, getData, isLoading] = useFetch(Apis);

	const imgUrl = getData(d => d.getCaptcha || "");
	const loading = isLoading(l => l.getCaptcha);
	useEffect(() => {
		fetchs.getCaptcha();
	}, [fetchs, refreshKey]);

	return (
		<div className={styles.captcha}>
			<Input
				value={value}
				onChange={onChange}
				placeholder="请输入验证码"
				prefix={<CaptchaSvg color={GRAY_5} />}
			></Input>
			<Spin wrapperClassName={styles.img} spinning={loading}>
				<img
					src={imgUrl}
					alt=" "
					onClick={() => setRefreshKey(v => v + 1)}
				/>
			</Spin>
		</div>
	);
};

// const ForgetPasswordInput = props => {
// 	return (
// 		<div className={styles.password}>
// 			<Input
// 				{...props}
// 				placeholder="请输入验证码"
// 				className={styles.input}
// 			></Input>
// 			<div className={styles.forget}>忘记密码</div>
// 		</div>
// 	);
// };

const Main = () => {
	const [refreshKey, setRefreshKey] = useState(0);
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
						<div className={styles.welcome}>智慧环卫云平台</div>
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
							<Form.Item
								name="code"
								rules={[
									{ required: true, message: "请输入验证码" },
								]}
							>
								<Captcha
									refreshKey={refreshKey}
									setRefreshKey={setRefreshKey}
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
												.login(
													{},
													{
														...v,
														auth: "jwt",
													}
												)
												.then(res => {
													message.success(
														"登录成功",
														3
													);
													cookie.save(
														"access_token",
														res?.data?.data
															?.access_token
													);
													cookie.save(
														"refresh_token",
														res?.data?.data
															?.refresh_token
													);
												})
												.catch(e => {
													setRefreshKey(v => v + 1);
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
				{`Copyright©2020-${year} 登录界面 | 孙通 | All Rights Reserved.`}
				<a
					href="https://github.com/suntong233/react_antd"
					target="_blank"
					rel="noreferrer"
				>
					沪ICP备00000000号-0
				</a>
			</div>
		</div>
	);
};
export default Main;
