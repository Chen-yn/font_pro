import { useCallback, useEffect, useRef, useState } from "react";
import { FormField } from "../components/fromSelect/type";

export const initialFormFields: FormField[] = [
    {
        name: 'username',
        label: '用户名',
        type: 'input',
        placeholder: '请输入用户名',
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
    {
        name: 'status',
        label: '状态',
        type: 'select',
        placeholder: '请选择状态',
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
        title: '创建时间',
        dataIndex: 'date',
        key: 'date',
        sorter: false, // 可排序
    },
    {
        title: '岗位',
        dataIndex: 'post',
        key: 'post',
        sorter: false, // 可排序
        render: (text: string) => {
            const name: any = {
                0: "产品",
                1: "开发",
                2: "测试"
            }
            return name[text] || ""
        }
    },
    {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (text: string) => {
            const status = {
                entry: '入职',
                practice: "实习",
                become: "转正",
                dimission: "离职"
            }

            return status[text] || ""
        }
    },
];


function deepcopy(obj: any) {
    if (typeof obj !== "object" || obj === null) {
        return obj
    }

    if (Array.isArray(obj)) {
        const copy: any[] = []
        for (let key = 0; key < obj.length; key++) {
            copy[key] = deepcopy(obj[key])
        }
        return copy
    }

    const copy: any = Array.isArray(obj) ? [] : {}
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            copy[key] = deepcopy(obj[key])
        }
    }
    return copy
}

function debounce(fn, wait) {
    let time: any
    return function (...arg) {
        clearTimeout(time)
        time = setTimeout(() => {
            fn.apply(arg)
        }, wait);
    }
}

function throttle(fn, wait) {
    let time = null
    return function (...arg) {
        if (!time) {
            time = setTimeout(() => {
                fn.apply(arg)
                clearTimeout(time)
                time = null
            }, wait);
        }
    }
}

// const useDebounce = (fn, wait) => {
//     const [Debounce, setDebounce] = useState(fn)

//     useEffect(() => {
//         const handle = setTimeout(() => {
//             setDebounce(fn)
//         }, wait);

//         return () => {
//             clearTimeout(handle)
//         }
//     }, [fn, wait])

//     return Debounce
// }


const useDebounce = (fn: any, wait: number) => {
    const time = useRef<any>(null)

    const debounceFn = useCallback((...arg: any[]) => {
        if (time.current) {
            clearTimeout(time.current)
        }
        time.current = setTimeout(() => {
            fn(...arg)
        }, wait);
    }, [fn, wait])

    return debounceFn
}

function deepcopys (obj){
    if(typeof obj !== "object" || obj === null){
        return obj
    }

    const copy:any = Array.isArray(obj) ? [] :{}

    if(Array.isArray(obj)){
        let copy:any[] = []
        for (let i = 0; i < obj.length; i++) {
            copy[i] = deepcopys[obj[i]]
            
        }
        return copy
    }

    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            copy[key] = deepcopys(obj[key])
        }
    }

    return copy
}