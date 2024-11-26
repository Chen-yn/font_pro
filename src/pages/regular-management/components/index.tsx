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

export const FormItemData = [
    {
        label:"年龄",
        value:"gender",
        name:"gender",
        type:"input",
        placeholder:"年龄",
    },
    {
        label:"性别",
        value:"sex",
        name:"sex",
        type:"select",
        placeholder:"性别",
    },
]

export const DescriptionsItem = [
  {
    label:"姓名",
    value:"name",
    children:""
  },
  {
    label:"年龄",
    value:"age",
    children:""
  },
  {
    label:"城市",
    value:"address",
    children:""
  },
  {
    label:"部门",
    value:"section",
    children:""
  },
  {
    label:"岗位",
    value:"post",
    children:""
  },
]
