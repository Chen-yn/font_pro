export default [
    {
        path: '/',
        redirect: '/workbench',
    },
    {
        name: '工作台',
        path: '/workbench',
        component: './workbench',
    },
    {
        name: '转正管理',
        path: '/regular-management',
        component: './regular-management',
    },
    {
        name: '离职管理',
        path: '/dimission-management',
        component: './dimission-management',
    },
    {
        name: '数据统计',
        path: '/data-management',
        component: './data-management',
    },
    {
        component: './404',
    },
]
