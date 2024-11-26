import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  Popover,
  Row,
  Select,
  Space,
  Table,
} from 'antd';
import React, { useState } from 'react';
import { ColumnsItem, ColumnsList } from '../regular-management/components/Columns';
import { getRenderItem } from './components/index';
import { FormItemData } from './components/type';
// import { useForm } from '../fn/hook';
const { Option } = Select;
const style: React.CSSProperties = { padding: '8px 0' };

type Props = {};
let list = [
  {
    name: 'chenyanan',
    age: 20,
    address: '河北省',
    section: "测试部门1",
    post: "测试"
  },
  {
    name: 'chenyanan123',
    age: 10,
    address: '北京',
    section: "测试部门2",
    post: "研发"
  },
];
const index = (props: Props) => {
  const [form] = Form.useForm();
  // const [FormIteOpen, setFormIteOpen] = useState(false);
  const [FormItemList, setFormIteList] = useState<any[]>([]);
  const [data, setdata] = useState<any[]>(list);

  const onFinish = (values: any) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onChange = (val: any) => {
    const list = FormItemData.filter((item: any) => val.includes(item.value));
    setFormIteList(list);
  };

  const content = () => {
    return <Checkbox.Group options={FormItemData} onChange={onChange} />;
  };

  const columns = ColumnsItem({
    data: ColumnsList,
    onOpen: undefined,
  });

  return (
    <Card>
      <Form
        form={form}
        name="control-hooks"
        autoComplete="off"
        onFinish={onFinish}
      >
        <Row gutter={16}>
          <Col className="gutter-row" span={6}>
            <div>
              <Form.Item name="name">
                <Input placeholder="姓名" />
              </Form.Item>
            </div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div>
              <Form.Item name="post">
                <Select
                  placeholder="请选择岗位"
                  options={[
                    {
                      value: '1',
                      label: '产品',
                    },
                    {
                      value: '2',
                      label: '开发',
                    },
                    {
                      value: '3',
                      label: '测试',
                    },
                  ]}
                />
              </Form.Item>
            </div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div>
              <Form.Item name="section">
                <Input placeholder="部门" />
              </Form.Item>
            </div>
          </Col>
          {getRenderItem(FormItemList)}
          <Col className="gutter-row" span={6}>
            <div>
              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit">
                    查询
                  </Button>
                  <Button htmlType="button" onClick={onReset}>
                    重置
                  </Button>
                  <Popover content={content} trigger="click">
                    <Button type="link">更多选项</Button>
                  </Popover>
                </Space>
              </Form.Item>
            </div>
          </Col>
        </Row>
      </Form>

      <Table
        columns={columns}
        dataSource={data}
        scroll={{ x: 500 }}
        pagination={false}
        rowKey={(row: any) => row.name}
      />
    </Card>
  );
};

export default index;
