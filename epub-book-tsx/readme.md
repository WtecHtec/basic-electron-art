# 预加载 preload 通信
## 主进程：
main.ts 配置
```
	mainWindow = new BrowserWindow({
		show: false,
		width: 1024,
		height: 728,
		icon: getAssetPath('icon.png'),
		webPreferences: {
			nodeIntegration: true,
			preload: app.isPackaged
				? path.join(__dirname, 'preload.js')
				: path.join(__dirname, '../../.erb/dll/preload.js'), // 文件路径
		},
	});

```
声明函数：
preload.ts文件
```

import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('api-test', {
	handleLog(msg: string) {
		console.log('handleLog===', msg)
	},
})

contextBridge.exposeInMainWorld('api-dev', {
	handleLog(msg: string) {
		console.log('handleLog===', msg)
	},
})

```
## 渲染进程
ts声明文件：
preload.d.ts
```


declare global {
	interface Window {
		api-test: {
			handleLog(msg: string): void
		},
		api-dev: {
			handleLog(msg: string): void
		},
	}
}
export {

};

```
使用：
```
	window.api-test.handleLog('测试 handleLog test');
	window.api-dev.handleLog('测试 handleLog dev');
```

# react-router-dom 路由
功能： 在menu组件中监听路由变化改变menu选中节点
## 监听路由
### 路由配置
menu 组件必须在Router节点中
```
import { MemoryRouter as Router , Routes, Route} from 'react-router-dom';
	<Router>
		<menu></menu>
	 	<Routes>
			<Route path="/" element={<BookManage />} />
			<Route path="/view" element={<BookView />} />
		</Routes>
 	</Router>
```
### meun组件监听路由变化
通过 location 监听 
meun.ts
```
import { useLocation, MemoryRouter as Router } from 'react-router-dom';
	let location = useLocation()
	useEffect(() => {
		const { pathname } = location;
		if (pathname === '/view') {
			setCurName(location.state.name)
		}
	}, [location])

```
## 获取路由参数
### 路由跳转
```
import { useNavigate } from "react-router-dom";
const navigate = useNavigate()
navigate('/view', { state: { name, position, } })
```
### 获取参数 state
```
import { useLocation, } from 'react-router-dom';
const location = useLocation()
const { state: { position } } = location

```