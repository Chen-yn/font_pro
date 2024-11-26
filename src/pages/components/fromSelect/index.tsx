import React, { useEffect, useState } from 'react'
import { Card, Button, Form, Input, Select, Radio, Col, Row, DatePicker, Table } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { initialFormFields, FormField, columns, DataType, columnsData } from './type'
// import { useForm } from '../../fn/hook'
type Props = {}


const renderFormItem = (field: FormField) => {
    switch (field.type) {
        case 'input':
            return <Input placeholder={field.placeholder} />;
        case 'select':
            return (
                <Select placeholder={field.placeholder}>
                    {field.options?.map((option) => (
                        <Select.Option key={option.value} value={option.value}>
                            {option.label}
                        </Select.Option>
                    ))}
                </Select>
            );
        case 'radio':
            return <Radio.Group >
                {field.options?.map((option) => (
                    <Radio value={option.value}>{option.label}</Radio>
                ))}
            </Radio.Group>;

        case 'datePicker':
            return <DatePicker />;
        default:
            return null;
    }
};

const index = (props: Props) => {
    const [form] = Form.useForm();
    const [formFields, setFormFields] = useState<FormField[]>(initialFormFields)
    const [levelOptions, setLevelOptions] = useState<{ label: string; value: string }[]>([]);
    const [dataSource, setDataSource] = useState<DataType[]>(columnsData)

    let level: any = {
        "1": [
            { label: 'a', value: 'a' },
            { label: 'b', value: 'b' },
        ],
        "2": [
            { label: 'c', value: 'c' },
        ],
        "3": [
            { label: 'd', value: 'd' },
            { label: 'e', value: 'e' },
        ],
    }
    useEffect(() => {
        let data: any = {
            gender: [
                { label: '男', value: '1' },
                { label: '女', value: '2' },
            ],
            post: [
                { label: '产品', value: '1' },
                { label: '开发', value: '2' },
                { label: '测试', value: '3' },
            ],

        }

        setFormFields((prevFields) =>
            prevFields.map((field) => {
                // 检查是否存在匹配的 options 数据
                if (data[field.name]) {
                    return {
                        ...field,
                        options: data[field.name], // 使用接口返回的 options 数据
                    };
                }
                return field; // 未匹配则保留原有字段配置
            })
        );
    }, [])

    useEffect(() => {
        // 初始化时设置表单
        setFormFields((prevFields) =>
            prevFields.map((field) =>
                field.name === 'level' ? { ...field, options: levelOptions } : field
            )
        );
    }, [levelOptions]);

    const onValuesChange = (changedValues: any) => {
        // 检测岗位字段的变化
        if (changedValues.post) {
            const selectedPostId = changedValues.post;
            // 根据岗位ID更新职级选项
            setLevelOptions(level[selectedPostId] || []);
            // 清空职级字段的当前值
            form.setFieldsValue({ level: undefined });
        }
    };

    const onFinish = (values: any) => {
        console.log(values);
        // console.log(values.date.format("YYYY-MM-DD"))
        if (values.gender) {
            let list = columnsData.filter((i: any) => i.gender === values.gender)
            setDataSource(list)
        } else if (values.post) {
            let list = columnsData.filter((i: any) => i.post === values.post)
            setDataSource(list)
        }
    };

    const onReset = () => {
        form.resetFields();
        setDataSource(columnsData)
    };

    return (
        <>
            <Card>
                <Form form={form} autoComplete='off' name="control-hooks" onFinish={onFinish} onValuesChange={onValuesChange}>
                    <Row gutter={16}>
                        {formFields.map((field) => (
                            <Col span={8} key={field.name}>
                                <Form.Item
                                    name={field.name}
                                    label={field.label}
                                    rules={[{ required: field.required, message: `请输入${field.label}` }]}
                                >
                                    {renderFormItem(field)}
                                </Form.Item>
                            </Col>
                        ))}
                        <Col className="gutter-row" span={6}>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    查询
                                </Button>
                                <Button style={{ marginLeft: 5 }} htmlType="button" onClick={onReset}>
                                    重置
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Card>

            <Card style={{ marginTop: 6 }}>
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    rowKey="key" // 指定唯一 key
                />
            </Card>
        </>
    )
}

export default index

