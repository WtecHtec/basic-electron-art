const { BrowserWindow } = require('electron')

class MainWindow extends BrowserWindow {
  constructor(file, isDev) {
    super({
      title: 'SysTop',
      width: isDev ? 800 : 355,
      height: 500,
      icon: `${__dirname}/assets/icons/icon.png`,
      resizable: isDev ? true : false,
			// 是否显示
      show: true,
			// 透明度
      opacity: 0.9,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    })

    this.loadFile(file)

    if (isDev) {
      this.webContents.openDevTools()
    }
  }
}

module.exports = MainWindow
