
import { Button, Checkbox, Form, Input, message, Radio, Select, Typography } from "antd";
import { useState } from "react";
import styles from "./index.module.scss";
const { Option } = Select;

const Main = () => {
    const [form] = Form.useForm();
    // const nameValue = Form.useWatch('name', form); // ?
    const [formLayout, setFormLayout] = useState('horizontal');
    const [componentDisabled, setComponentDisabled] = useState(true);
    const [componentSize, setComponentSize] = useState('default');
    const formItemLayout = formLayout === 'horizontal' ? {
        labelCol: {
            span: 4,
        },
        wrapperCol: {
            span: 8,
        },
    } : null;

    const onFinish = (v) => {
        message.success('Submit success!');
        console.log(v);
    }

    const onFinishFailed = (v) => {
        message.error('Submit error!');
        console.log(v);
    }

    const onSelectChange = (v) => {
        switch (v) {
            case "默认":
                form.setFieldsValue({ name:"无名" });
                return;
            default: break; 
        }
    }

    const onFormLayoutChange = ({layout, disabled, size}) => {
        setFormLayout(layout);
        setComponentDisabled(disabled);
        setComponentSize(size);
    }

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <div className={`${styles.title} h3`}>表单</div>
            </div>
            <div className={styles.container}>
                <Form labelWrap size={componentSize} {...formItemLayout} name="formName" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off"
                    disabled={componentDisabled}
                    onValuesChange={onFormLayoutChange} layout={formLayout} initialValues={{ remember: true, disabled: componentDisabled }}>
                    <Form.Item label="Form disabled" name="disabled" valuePropName="checked">
                        <Checkbox>disabled</Checkbox>
                    </Form.Item>
                    <Form.Item label="Form Size" name="size">
                        <Radio.Group>
                            <Radio.Button value="small">Small</Radio.Button>
                            <Radio.Button value="default">Default</Radio.Button>
                            <Radio.Button value="large">Large</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="Form Layout" name="layout">
                        <Radio.Group value={formLayout}>
                            <Radio.Button value="horizontal">Horizontal</Radio.Button>
                            <Radio.Button value="vertical">Vertical</Radio.Button>
                            <Radio.Button value="inline">Inline</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="名称" rules={[{ required: true, message: "请输入名称" }]} name="name">
                        <Input />
                    </Form.Item>
                    <Form.Item label="url" rules={[{ required: true, message: "请输入url" },{ type:"url", warningOnly:true }]} name="url">
                        <Input placeholder="请输入url"/>
                    </Form.Item>
                    <Form.Item label="下拉框" rules={[{ required: true }]} name="select">
                        <Select placeholder="请选择" allowClear onChange={onSelectChange}>
                            <Option value="默认">默认</Option>
                            <Option value="显示隐藏">显示隐藏</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.select !== currentValues.select} >
                        {
                            ({ getFieldValue }) =>  getFieldValue('select') === '显示隐藏' ? (
                                <Form.Item name="hide" label="hide" rules={[ { required: true } ]} >
                                    <Input />
                                </Form.Item>
                            ) : null
                        }
                    </Form.Item>
                    <Form.Item valuePropName="checked" wrapperCol={{ offset: 4, span: 8 }} name="isdefault">
                        <Checkbox>是否默认</Checkbox>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">提交</Button>
                    </Form.Item>
                </Form>
            </div>
            <div>
                <Typography>
                    {/* <pre>Name Value: {(nameValue || "todo")}</pre> */}
                </Typography>
            </div>
        </div>
    )
}

export default Main;
