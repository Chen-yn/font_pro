import React, { useEffect, useMemo, useState } from 'react'
import style from './index.less'
import { Button, Card, Col, DatePicker, Drawer, Empty, Form, Input, Row, Select, Table, message } from 'antd'
import { columns, initialFormFields } from './type';
import { FormField } from '../components/fromSelect/type';
import { postUserTable, getUserTable, getCardList } from '@/services';
import { useParams } from '@umijs/max';
type Props = {}

interface CarType {
  id: number;
  name?: string;
  total?: number;
  type?: string;
}
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
    case 'datePicker':
      return <DatePicker />;
    default:
      return null;
  }
};
const index = (props: Props) => {

  let list = [
    {
      id: 0,
      name: "入职",
      type: "entry",
      total: 0,
    },
    {
      id: 1,
      name: "实习",
      type: "practice",
      total: 0,
    },
    {
      id: 2,
      name: "转正",
      type: "become",
      total: 0,
    },
    {
      id: 3,
      name: "离职",
      type: "dimission",
      total: 0,
    },
  ]
  let level: any = {
    "0": [
      { label: 'a', value: 'a' },
      { label: 'b', value: 'b' },
    ],
    "1": [
      { label: 'c', value: 'c' },
    ],
    "2": [
      { label: 'd', value: 'd' },
      { label: 'e', value: 'e' },
    ],
  }
  const [form] = Form.useForm();
  const [CardList, setCardList] = useState<CarType[]>(list)
  const [ToDo, setToDo] = useState([])
  const [formFields, setFormFields] = useState<FormField[]>(initialFormFields)
  const [levelOptions, setLevelOptions] = useState<{ label: string; value: string }[]>([]);
  const [dataSource, setdataSource] = useState([])
  const [Loding, setLoding] = useState(false)
  const [AddOpen, setAddOpen] = useState(false)
  const [AddForm] = Form.useForm();


  const fetchData = async () => {
    setLoding(true)
    try {
      let res = await getUserTable()
      if (res.code === 200) {
        console.log(res, "11")
        setdataSource(res.data)
        setLoding(false)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const fetchCardData = async () => {
    try {
      let res = await getCardList()
      const { entry, become, dimission, practice } = res.data
      let data = CardList.map((item: CarType) => {
        switch (item.type) {
          case 'entry':
            return { ...item, total: entry };
          case 'become':
            return { ...item, total: become };
          case 'dimission':
            return { ...item, total: dimission };
          case 'practice':
            return { ...item, total: practice };
          default:
            return item;
        }
      });
      setCardList(data)
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchCardData()
  }, [])


  useEffect(() => {
    let data: any = {
      post: [
        { label: '产品', value: '0' },
        { label: '开发', value: '1' },
        { label: '测试', value: '2' },
      ],
      status: [
        { label: '入职', value: 'entry' },
        { label: '实习', value: 'practice' },
        { label: '转正', value: 'become' },
        { label: '离职', value: 'dimission' },
      ]
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

  const onFinish = async (values: any) => {
    console.log(values, "values")
    setLoding(true)
    let res = await getUserTable(values)
    if (res.code === 200) {
      setdataSource(res.data)
      setLoding(false)
    }
  }

  const onReset = () => {
    form.resetFields()
    fetchData()
  }

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

  const Add = () => {
    setAddOpen(true)
  }

  const AddClear = () => {
    setAddOpen(false)
    AddForm.resetFields()
    fetchData()
  }

  const onAddFinish = async (val: any) => {
    console.log(val, "val")
    let res = await postUserTable(val)
    console.log(res, "res")
    if (res.code === 200) {
      message.success("新增成功")
      AddForm.resetFields()
      setAddOpen(false)
      fetchData()
      fetchCardData()
    }
  }

  return (
    <div className={style.content}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Card style={{ width: 300 }}>
          {ToDo ? [0, 1, 2].map((item: number) => {
            return <div>{`待办消息条数：${item}`}</div>
          }) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}

        </Card>
        {CardList.map((item: CarType) => {
          return (
            <Card key={item.id} style={{ width: 150, display: 'flex', flexDirection: 'column' }}>
              <div>{item.name}</div>
              <div>{item.total}</div>
            </Card>
          )
        })}
      </div>
      <Card style={{ marginTop: 10 }}>
        <Form
          form={form}
          name="control-hooks"
          autoComplete="off"
          onFinish={onFinish}
          onValuesChange={onValuesChange}
        >
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
        <div>
          <Button type="primary" onClick={Add} style={{ float: 'right', marginBottom: 10 }}>
            新增
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={dataSource}
          loading={Loding}
          rowKey="key" // 指定唯一 key
        />

      </Card>

      <Drawer
        title="新增人员信息"
        placement="right"
        width={600}
        onClose={AddClear}
        open={AddOpen}>
        <Form
          form={AddForm}
          name="control-hooks"
          autoComplete="off"
          layout="vertical"
          onFinish={onAddFinish}
          onValuesChange={onValuesChange}
        >
          <Row gutter={24}>
            {formFields.map((field) => (
              <Col span={12} key={field.name}>
                <Form.Item
                  name={field.name}
                  label={field.label}
                  rules={[{ required: field.required, message: `请输入${field.label}` }]}
                >
                  {renderFormItem(field)}
                </Form.Item>
              </Col>
            ))}
            <Col span={24}>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  确定
                </Button>
                <Button style={{ marginLeft: 5 }} htmlType="button" onClick={AddClear}>
                  取消
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </div>
  )
}

export default index