import { useCallback, useEffect, useRef, useState } from "react"

//深拷贝
const deepCoyp = (obj: any) => {
    if (typeof obj !== 'object' || obj === null) {
        return obj
    }

    const copy: any = Array.isArray(obj) ? [] : {}

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            copy[key] = deepCoyp(obj[key])
        }
    }
}

//防抖
function debounce(fn, wait) {
    let time
    return function (...arg) {
        clearTimeout(time)
        time = setTimeout(() => {
            fn.apply(this, arg)
        }, wait);
    }
}

//节流
function thrttile(fn, wait) {
    let time = null
    return function (...arg) {
        if (!time) {
            time = setTimeout(() => {
                fn.apply(this, arg)
                clearTimeout(time)
                time = null
            }, wait);
        }
    }
}

//自定义hook
const useLocalStrage = (name, initvalue) => {
    const [Value, setValue] = useState(() => {
        const item = localStorage.getItem(name)
        return item ? JSON.parse(item) : initvalue || ''
    })

    useEffect(() => {
        localStorage.setItem(name, JSON.stringify(initvalue))

    }, [name, Value, initvalue])

    const clearValue = () => {
        localStorage.clear()
        setValue("")
    }

    return [Value, setValue, clearValue]
}

const useFormData = (key, initvalue) => {
    const [data, setdata] = useState(initvalue)

    const handle = (e) => {
        const { name, value } = e
        setdata({
            ...data,
            [name]: value
        })
    }

    const clearData = () => {
        setdata(initvalue)
    }

    return [data, handle, clearData]
}

const useDebounce = (fn, wait) => {
    const time = useRef(null)

    const DebounceFn = useCallback((...arg) => {
        clearTimeout(time.current)
        time.current = setTimeout(() => {
            fn(arg)
        }, wait);
    }, [fn, wait])

    return DebounceFn
}