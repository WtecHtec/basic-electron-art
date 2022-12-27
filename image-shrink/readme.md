# 初始化
npm init -y
# 安装electron
npm i electron -D
# 加载
## loadFile 加载文件
## loadURL 加载url
# html 使用node 内置、 electron函数
```
new  BrowserWindow({
		title: 'ImageShrink',
		width: isDev ? 700 :  500,
		height: 600,
		icon: './aseet/icon/icon-04.png',
		// 配置 html 使用 requrie
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		}
	})

```
# 图片压缩工具
npm i imagemin@7.0.1 imagemin-mozjpeg@8.0.0 imagemin-pngquant@8.0.0 slash@3.0.0 -D
## slash 解决mac、win系统路径不一致问题
# 通信
## html 向 win
html:
```
	const { ipcRenderer } = require('electron')
	ipcRenderer.send("image:minimize", {
		imgPath,
		quality,
	})

```
win
```
	const { ipcMain } = require('electron')
	ipcMain.on('image:minimize', (e, option) => {
		console.log('imgPath===', option)
	})
```
## win 向 html
html
```
 const { ipcRenderer } = require('electron')
 ipcRenderer.on('img:done', ()=> {})
```
win
```
	// mainWindow 为 BrowserWindow 实例
	mainWindow.webContents.send('img:done')

```

