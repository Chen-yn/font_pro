import { createContext } from 'react';

// 定义 Context 的数据类型
interface InitValue {
  CardList?: string[];
  SelectList?: any[];
}

const initValue: InitValue = {};

export const Context = createContext(initValue);

// 深拷贝
export function deepCope(obj: any) {
  if (typeof obj !== 'object' || obj == null) {
    return obj;
  }

  const copy: any = Array.isArray(obj) ? [] : {};

  for (let key in obj) {
    copy[key] = deepCope(obj[key]);
  }

  return copy;
}

// 防抖
export function debounce(fn: any, wait: any) {
  let tiems: any;
  return function (this: any, ...arg: any) {
    clearTimeout(tiems);
    tiems = setTimeout(() => {
      fn.apply(this, arg);
    }, wait);
  };
}

//节流
export function throttle(func: any, deplay: any) {
  let timer: any = null;
  return function (this: any) {
    if (!timer) {
      timer = setTimeout(() => {
        func.apply(this, arguments);
        clearTimeout(timer);
        timer = null;
      }, deplay);
    }
  };
}


import { useState, useEffect } from 'react';

const useLocalStorage = (name: string, initialValue?: string, clear?: boolean) => {
  // 初始化时从 localStorage 获取数据
  const [value, setValue] = useState(() => {
    const savedValue = localStorage.getItem(name);
    return savedValue ? JSON.parse(savedValue) : initialValue || '';
  });

  // 当 value 变化时同步到 localStorage
  useEffect(() => {
    localStorage.setItem(name, JSON.stringify(value));
  }, [name, value]);

  // 如果 clear 为 true，则清除对应的 localStorage 项目
  useEffect(() => {
    if (clear) {
      localStorage.removeItem(name);
      setValue('');
    }
  }, [name, clear]);

  return [value, setValue] as const;
};

export default useLocalStorage;
