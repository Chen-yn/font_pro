interface DataType {
  key: string;
  title?: string;
  age?: number;
  address?: string;
  width: null | number;
  render?: (val: any) => void;
}

export const ColumnsData: DataType[] = [
  {
    title: '姓名',
    key: 'name',
    width: 100,
  },
  {
    title: '年龄',
    key: 'age',
    width: 100,
  },
  {
    title: '城市',
    key: 'address',
    width: 100,
  },
  {
    title: '部门',
    key: 'section',
    width: 100,
  },
  {
    title: '岗位',
    key: 'post',
    width: 100,
  },
  {
    title: '操作',
    key: '1',
    width: 100,
  },
];

export const ColumnsList: DataType[] = [
  {
    title: '姓名',
    key: 'name',
    width: 100,
  },
  {
    title: '年龄',
    key: 'age',
    width: 100,
  },
  {
    title: '城市',
    key: 'address',
    width: 100,
  },
];

const RenderItem = (
  key: string,
  value: any,
  record: any,
  onOpen: (val: any) => void,
  formOpen: (val: any) => void,
) => {
  //   console.log(key, value, record);
  switch (key) {
    case "name":
      if (onOpen) {
        return <a onClick={() => onOpen(record)}>{value}</a>;
      }
    case "1":
      return  <a onClick={() => formOpen(record)}>编辑</a>;
    default:
      return value;
  }
};

export const ColumnsItem = ({ data, onOpen,formOpen }: any) => {
  let Columns: any = data?.map((item: DataType) => {
    return {
      ...item,
      dataIndex: item.key,
      render: (value: any, record: any) =>
        RenderItem(item.key, value, record, onOpen,formOpen),
    };
  });
  return Columns;
};
