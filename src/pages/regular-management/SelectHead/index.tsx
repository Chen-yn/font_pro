import { Button, Checkbox, Col, Form, Input, Popover, Row, Select } from 'antd';
import { useState } from 'react';
import { FormItemData, getRenderItem } from '../components/index';
import { debounce ,throttle} from '../type';


const { Option } = Select;
type Props = {
  onSelect: (val: any) => void;
};

const index = (props: Props) => {
  const { onSelect } = props;
  const [form] = Form.useForm();
  const [FormItemList, setFormIteList] = useState<any[]>([]);

  const onFinish = (values: any) => {
    console.log(values);
    onSelect(values);
  };

  const onReset = () => {
    form.resetFields();
    onSelect({});
  };

  const onChange = (val: any) => {
    const list = FormItemData.filter((item: any) => val.includes(item.value));
    setFormIteList(list);
  };

  const content = () => {
    return <Checkbox.Group options={FormItemData} onChange={onChange} />;
  };

  const onChangeName = (val: any) => {
    console.log(val.target.value, '防抖');
  };

  const ChangeName = debounce(onChangeName, 300);
  const throttledFunc = throttle(onFinish, 1000);
  return (
    <Form
      form={form}
      name="control-hooks"
      autoComplete="off"
      onFinish={throttledFunc}
    >
      <Row gutter={16}>
        <Col className="gutter-row" span={6}>
          <div>
            <Form.Item name="name">
              <Input placeholder="姓名" onChange={ChangeName} />
            </Form.Item>
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div>
            <Form.Item name="post">
              <Input placeholder="岗位" />
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
              <div style={{ display: 'flex' }}>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button htmlType="button" onClick={onReset}>
                  重置
                </Button>
                <Popover content={content} trigger="hover">
                  <Button type="link">更多选项</Button>
                </Popover>
              </div>
            </Form.Item>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default index;
