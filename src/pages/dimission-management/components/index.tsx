import { Col, Form, Input,Select } from 'antd';
export const getDom = (type?: string, placeholder?: string) => {
  switch (type) {
    case 'input':
      return <Input placeholder={placeholder} />;
      case 'select':
        return <Select
        placeholder={placeholder}
        options={[
          {
            value: '0',
            label: '男',
          },
          {
            value: '1',
            label: '女',
          }
        ]}
      />;
    default:
      return null;
  }
};

export const getRenderItem = (itemOption: any[]) => {
  return itemOption?.map((item: any) => {
    return (
      <Col key={item.name} className="gutter-row" span={6}>
        <div>
          <Form.Item name={item.name}>
            {getDom(item.type, item.placeholder)}
          </Form.Item>
        </div>
      </Col>
    );
  });
};
