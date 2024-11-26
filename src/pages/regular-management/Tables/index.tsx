import {
  Button,
  Col,
  Descriptions,
  Drawer,
  Form,
  Input,
  Modal,
  Row,
  Table,
} from 'antd';
import { useContext, useEffect, useState } from 'react';
import { ColumnsData, ColumnsItem } from '../components/Columns';
import { DescriptionsItem } from '../components/index';
import { Context } from '../type';
type Props = {};

const index = (props: Props) => {
  const [form] = Form.useForm();
  const [data, setdata] = useState<any[]>([]);
  const { SelectList } = useContext(Context);
  const [open, setOpen] = useState(false);
  const [DrawerData, setDrawerData] = useState<any[]>([]);
  const [FormOpen, setFormOpen] = useState(false);
  const [FormData, setFormData] = useState({});
  useEffect(() => {
    setdata(SelectList || []);
  }, [SelectList]);

  const onOpen = (val: any) => {
    // console.log(val, 'val');
    const data = Object.keys(val).reduce((acc: any[], key) => {
      const matchedItem = DescriptionsItem.find((i: any) => i.value === key);

      if (matchedItem) {
        acc.push({
          ...matchedItem,
          children: val[key],
        });
      }

      return acc;
    }, []);

    console.log(data, 'data');
    setDrawerData(data);
    setOpen(true);
  };

  const formOpen = (val: any) => {
    console.log(val, '编辑');
    setFormData(val);
    setFormOpen(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setFormOpen(false);
  };

  useEffect(() => {
    if (FormOpen) {
      form.setFieldsValue(FormData);
    }
  }, [FormOpen]);

  const onFinish = (val: any) => {
    console.log(val, '编辑');
  };

  const onClose = () => {
    setOpen(false);
  };

  const columns = ColumnsItem({
    data: ColumnsData,
    onOpen,
    formOpen,
  });

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        scroll={{ x: 500 }}
        pagination={false}
        rowKey={(row: any) => row.name}
      />
      <Drawer
        width={500}
        title="详情"
        placement="right"
        onClose={onClose}
        open={open}
      >
        <Descriptions layout="vertical">
          {DrawerData?.map((item: any) => {
            return (
              <Descriptions.Item key={item.label} label={item.label}>
                {item.children}
              </Descriptions.Item>
            );
          })}
        </Descriptions>
      </Drawer>

      <Modal
        title="编辑"
        footer={null}
        width={600}
        open={FormOpen}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="control-hooks"
          autoComplete="off"
          onFinish={onFinish}
        >
          <Row gutter={16} justify="center">
            <Col className="gutter-row" span={16}>
              <div>
                <Form.Item name="name">
                  <Input placeholder="姓名" />
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={16}>
              <div>
                <Form.Item name="post">
                  <Input placeholder="岗位" />
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={16}>
              <div>
                <Form.Item name="section">
                  <Input placeholder="部门" />
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={16}>
              <div>
                <Form.Item>
                  <div
                    style={{ display: 'flex', justifyContent: 'space-evenly' }}
                  >
                    <Button type="primary" htmlType="submit">
                      确定
                    </Button>
                    <Button htmlType="button" onClick={handleCancel}>
                      取消
                    </Button>
                  </div>
                </Form.Item>
              </div>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default index;
