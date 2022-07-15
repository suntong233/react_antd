
import { Form, Input, Button } from "antd";
import styles from "./index.module.scss";


const Main = () => {

    const onFinish = (v) => {
        console.log(v);
    }

    const onFinishFailed = (v) => {
        console.log(v);
    }

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <div className={`${styles.title} h3`}>表单</div>
            </div>
            <div className={styles.container}>
                <Form name="formName" onFinish={onFinish} onFinishFailed={onFinishFailed}
                    labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                    <Form.Item label="名称" name="name">
                        <Input />
                    </Form.Item>
                    <Form.Item label="类型" name="type">
                        <Input />
                    </Form.Item>
                    <Form.Item label="x" name="x">
                        <Input />
                    </Form.Item>
                    <Form.Item label="y" name="y">
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">提交</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Main;