import { defineConfig } from '@umijs/max';
import routes from './routes'
// import proxy from './proxy'
const { REACT_APP_ENV } = process.env;

export default defineConfig({
    outputPath: 'dist',
    // publicPath: process.env.NODE_ENV === 'production' ? '/dmpfront/' : '/',
    //开发
    publicPath: process.env.NODE_ENV === 'production' ? '/dmp_front/' : '/',
    antd: {},
    access: {},
    model: {},
    initialState: {},
    request: {},
    layout: {
        title: '管理平台',
    },
    routes,
    npmClient: 'pnpm',
    proxy: {
        '/api': {
            target: 'http://localhost:3000',
            changeOrigin: true,
            pathRewrite: { '^': '' },
        },
    },
});


