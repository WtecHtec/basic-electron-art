# 初始化
npm init -y
# 安装electron
npm i electron -D
# 加载
## loadFile 加载文件
## loadURL 加载url
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

