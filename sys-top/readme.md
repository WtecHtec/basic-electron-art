# 获取cpu参数插件
```
npm install node-os-utils --save
```

# 系统通知 Notification

显示
```
  new Notification(title, {
		body: `CPU is over ${cpuOverload}%`,
    icon: './icon.png',
	})
```
监听点击
```
new Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY })
  .onclick = () =>  console.log('click');
```

# 系统托盘 Tray
```
// 初始化系统托盘
const tray = new Tray( icon )
// 监听点击
tray.on('click', ()=> {})
// 监听右击
tray.on('right-click', ()=> {
	// 菜单实例
	const contextMenu = Menu.buildFromTemplate([
				{
					label: 'Quit',
					click: () => {
						app.isQuitting = true
						app.quit()
					},
				},
			])
  // 设置菜单
	tray.popUpContextMenu(contextMenu)
})
```
# app.quit() 退出程序
# mainWindow.hide() 隐藏win
# mainWindow.show() 显示win
