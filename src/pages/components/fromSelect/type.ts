import { Input } from "antd";
export type FormField = {
    name: string;
    label: string;
    type: 'input' | 'select' | 'radio' | 'datePicker';
    placeholder?: string;
    options?: { label: string; value: string }[];
    required?: boolean;
};

export const initialFormFields: FormField[] = [
    {
        name: 'username',
        label: '用户名',
        type: 'input',
        placeholder: '请输入用户名',
        required: false,
    },
    {
        name: 'gender',
        label: '性别',
        type: 'radio',
        options: [],
        required: false,
    },
    {
        name: 'post',
        label: '岗位',
        type: 'select',
        placeholder: '请选择岗位',
        required: false,
        options: [],
    },
    {
        name: 'level',
        label: '职级',
        type: 'select',
        placeholder: '请选择职级',
        required: false,
        options: [],
    },
    {
        name: 'date',
        label: '时间',
        type: 'datePicker',
        placeholder: '请选择时间',
        required: false,
    },
];

export type Column = {
    title: string;
    dataIndex: string;
    key: string;
    sorter?: boolean; // 是否可排序
    render?: (v: any) => React.ReactNode;
};

export type DataType = {
    [key: string]: any; // 表格数据类型，可以根据需要具体化
};

export const columns: Column[] = [
    {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
        sorter: false, // 可排序
    },
    {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        sorter: false, // 可排序
    },
    {
        title: '性别',
        dataIndex: 'gender',
        key: 'gender',
        render: (text: string) => {
            return text === "1" ? "男" : "女"
        }
    },
    {
        title: '创建时间',
        dataIndex: 'createdAt',
        key: 'createdAt',
        sorter: false, // 可排序
    },
    {
        title: '岗位',
        dataIndex: 'post',
        key: 'post',
        sorter: false, // 可排序
        render: (text: string) => {
            const name: any = {
                1: "产品",
                2: "开发",
                3: "测试"
            }
            return name[text] || ""
        }
    },
];

// 模拟表格数据
export const columnsData: DataType[] = [
    {
        key: '1',
        username: '张三',
        age: 28,
        gender: '1',
        createdAt: '2023-11-01',
        post: "1",
    },
    {
        key: '2',
        username: '李四',
        age: 32,
        gender: '2',
        createdAt: '2023-11-02',
        post: "2",
    },
    {
        key: '3',
        username: '王五',
        age: 24,
        gender: '1',
        createdAt: '2023-11-03',
        post: "3",
    },
];