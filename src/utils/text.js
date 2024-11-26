




//闭包
//闭包是两个函数相互嵌套并且内部函数可以访问外部函数变量的环境组合，
//闭包可以封装私有变量和方法，并实现代码结构化，函数回调等功能。使用闭包容易造成内存泄漏和性能损耗

const { useCallback } = require("react");
const { useEffect } = require("react");
const { useRef } = require("react");
const { useState } = require("react");

//内存泄漏：是因为外部函数的变量不会被垃圾回收机制回收，因为外部函数保留了对这些变量会被引用。
//性能损耗：js引擎维需要维护对外部作用于的引用，导致额外的消耗

//常用场景：防抖和节流、定时器

//防抖和节流
// 防抖
//防抖是在事件触发n秒后，再执行回调，如果在n秒内重新触发，则会重新计时；  应用场景：输入框搜索、表单提交、窗口调整大小
//节流
//节流是在规定的时间内，只能执行一次回调，如果多次触发，则只会生效一次    应用场景：滚动事件、按钮点击、页面滚动事件

//深考和前拷贝
//前拷贝是拷贝引用对象的地址，修改数据是原对象也会受到影响
//深拷贝是开辟一块新的内存用于存放拷贝的对象，修改数据时，原对象不受到影响

// es6

/**
 * 
 * 类
 * 模块化  import是导入  export是导出
 * 模版字符串
 * 结构赋值
 * 对象属性简写
 * 延展操作符
 * 箭头函数
 * 箭头函数和function函数的区别
 * 1。外形不同
 * 2.箭头函数本身没有this，但是会捕获自身所在作用域中的this，供自己使用。一旦捕获this，将不会被改变。function函数的this是调用它时的对象
 * 3.箭头函数只能是匿名函数，function函数可以是匿名函数，也可以是具名函数
 * 4.箭头函数没有this，无法作为构造函数使用。
 * 5.箭头函数没有剩余参数对象
 * 
 * 
 * promise
 * promise是js异步编程的一种机制，并返回成功和失败及其结果值
 * 有三种状态
 * paidding：进行中，
 * fuiled：已完成，意味着已解决
 * reject：以失败，意味着一失败
 * 
 * promise一旦从padding状态转换为fuiled或者reject状态就表示已解决，并会保留这个状态。
 * 将不会被改变
 * let和const
 * let和cosnt都具有块级作用域
 * let定义的变量可以不赋值也可以修改，
 * const定义的变量不可以被修改，但是定义的常量可以修改
 * 
 * cookie、localstorage、sessionstorage
 * 
 * cookie存储数据较小
 * localstorage、sessionstorage存储数据量较大
 * 
 * localstorage永久化存储数据，即使是浏览器关闭，除非手动删除
 * sessionstorage存储的数据在浏览器关闭后会被清除
 * 
 * cookie存储的数据具有实效性，在设置的时间内有效。
 * 
 * cookie和sessionstorage具有客服端和服务器之间数据共享
 * 
 * 
 * http和https
 * 
 * 都是客户端和服务器之间的通信协议
 * 
 * http是无状态、无连接的通信协议，通常机遇tcp/ip协议进行通信
 * http数据传输是明文，容易被拦截和篡改
 * http默认端口好是80
 * 
 * https在http的基础上增加了加密协议，是基于ssl/tls对传输的内容进行加密
 * https使用公钥加密和私钥解密，保证了数据的私密性和安全性
 * https默认端口号是443
 * 
 * 
 * 强缓存和协商缓存
 * 强缓存是浏览器直接从本地缓存中获取资源，无需请求服务器。
 * 协商缓存是浏览器在缓存的资源失效后，请求请求服务器，有服务器决定是否返回新的资源。
 * 
 * 
 * 跨域
 * 跨域是🈯️协议、地址、端口；不同的服务之间进行数据访问，产生的限制，保护了用户的数据安全
 * 解决跨域的方法
 * json
 * cose
 * 代理服务器
 * websocked
 * ifname
 * 
 * 同源策略
 * 是指同域名、地址、端口，
 * 
 * 数组的方法
 * push向数组末尾添加一个或多个数据
 * pop删除数组末尾的数据
 * shifut删除数组首位数据
 * unshifut向数组首位中添加数据
 * concant合并一个或多个数据
 * forech遍历数据数据，但不会返回新的数据
 * map遍历数据数据，并返回新的数组
 * filter根据判断条件返回新的数组
 * reducer向数组中的每个元素添加的一个累加器，并返回新的数组
 * inclueds查找数组中是否存在该元素，返回ture或false
 * find在数组中查找元素的值
 * findindex查找元素的索引
 * indexof查找元素是否存在
 * slice
 * split
 * 
 * 
 * 基本数据类型
 * string、number、boolend、undefind、null
 * 复杂数据类型
 * arrary、object、function
 * 
 * 判断方法
 * typeof
 * array。isarray
 * consturcet
 * object。prototype。tostring。call
 * instensof
 * 
 * 
 * interface和type的区别
 * 
 * interface是定义数据的形状
 * type是定义数据的类型
 * interface可以被class继承和实现、type不行
 * interface不能作为交叉、联合的产物，但可以作为其组成元素，而type就没有什么限制
 * 
 * 范型
 * 就是类型变量，类型像传递给函数的参数一样传递。
 * 
 * 
 * git 
 * git init 
 * git clone
 * git branch
 * git checkout 
 * git add
 * git status
 * git commit -m 
 * git push 
 * git pull
 * git merge 
 * git fecth
 * git reset -hard 强制回退
 * git reset -sort
 * git log
 * 
 * 
 * 
 * 
 * 
 * 
 */



function debounce(fn, wait) {
    let tiem
    return function (...arg) {
        clearTimeout(tiem)
        tiem = setTimeout(() => {
            fn.apply(arg)
        }, wait);
    }
}
// const useDebounce = (fn, wait) => {
//     const tiem = useRef(null)
//     const handle = useCallback((...arg) => {
//         clearTimeout(tiem.current)
//         tiem.current = setTimeout(() => {
//             fn(...arg)
//         }, wait);
//     }, [fn, wait])
//     return handle
// }


const useDebounce = (fn, wait) => {
    const time = useRef(null)

    const debounceFn = useCallback((...arg) => {
        clearTimeout(time.current)
        time.current = setTimeout(() => {
            fn(...arg)
        }, wait);
    }, [fn, wait])

    return debounceFn
}


const useFromName = (initValue) => {
    const [Value, setValue] = useState(initValue)

    const handleChange = (e) => {
        const { name, value } = e
        setValue({
            ...Value,
            [name]: value
        })
    }
    const clearValue = () => {
        setValue("")
    }
    return [Value, handleChange, clearValue]
}


const useLocalStorage = (key, initValue) => {

    const [data, setdata] = useState(() => {
        const item = localStorage.getItem(key)
        return item ? JSON.parse(item) : initValue || ""
    })

    useEffect(() => {
        localStorage.setItem(key,JSON.stringify(data))
    }, [key, data])

    const clear = ()=>{
        localStorage.clear()
        setdata("")
    }

    return [data,setdata,clear]
}


