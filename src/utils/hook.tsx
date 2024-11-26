import { useCallback, useEffect, useRef, useState } from 'react';

export const useFormData = (initialValues: any) => {
  const [Value, setValue] = useState(initialValues);
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setValue({
      ...Value,
      [name]: value,
    });
  };

  const resetForm = () => {
    setValue(initialValues);
  };

  return [Value, handleChange, resetForm];
};

export function useDebounce(value: any, delay: any) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const intersection = (num1: Number[], num2: Number[]) => {
  let result: Number[] = []
  num1.forEach((i) => {
    if (num2.includes(i) && !result.includes(i)) {
      result.push(i)
    }
  })
  return result
}

function getAllCookies() {
  const cookies = document.cookie.split('; ');
  const cookieObject: any = {};

  cookies.forEach(cookie => {
    const [name, value] = cookie.split('=');
    cookieObject[name] = value;
  });

  return cookieObject;
}

//简单的数组去重
function removalDuplicate(data: any[]) {
  let result: any[] = []
  data.forEach((item: any) => {
    if (!result.includes(item)) {
      result.push(item)
    }
  })
  return result
}

// 适用于数组对象的去重（根据某个属性）
function removeDuplicatesByKey(arr, key) {
  const seen = new Set();
  return arr.filter(item => {
    const value = item[key];
    if (seen.has(value)) {
      return false;
    }
    seen.add(value);
    return true;
  });
}

// 适用于深层去重（复杂对象数组）
function removeDuplicatesDeep(arr) {
  const seen = new Set();
  return arr.filter(item => {
    const serialized = JSON.stringify(item);
    if (seen.has(serialized)) {
      return false;
    }
    seen.add(serialized);
    return true;
  });
}

// 获取地址栏的值
function getAllQueryParams() {
  const url = new URLSearchParams(window.location.search)
  const params: any = {}
  url.forEach((value, key) => {
    params[key] = value
  });
  return params
}