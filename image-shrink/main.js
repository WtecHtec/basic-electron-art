const {  app, BrowserWindow, Menu, ipcMain, shell } = require('electron')
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');

const log = require('electron-log');


const slash = require('slash')
const path = require('path')
const os = require('os');

const isDev = false;
const isMac = process.platform === 'darwin' ? true : false;


// log.transports.file.format = '[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [{level}]{scope} {text}';
// log.transports.file.resolvePath= ()=> path.join(__dirname, '/logs')

// log.info('Hello, log');
// log.warn('Some problem appears');

const menus = [
	...(isMac ? [{
    label: app.name,
    submenu: [
      { 
				 label: 'about', 
				 click: () => {
					if (aboutWindow) return;
					createAboutWindow()
					aboutWindow.on('closed', () => aboutWindow = null)
				 }
		  },
    ]
  }] : []),
]
let mainWindow
let aboutWindow
function  createMainWindow() {
	mainWindow = new  BrowserWindow({
		title: 'ImageShrink',
		width: isDev ? 700 :  500,
		height: 600,
		icon: './aseet/icon/icon-04.png',
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		}
	})
	mainWindow.loadFile('./app/index.html')
}

function  createAboutWindow() {
	aboutWindow = new  BrowserWindow({
		title: 'About',
		width: 400,
		height: 300,
		icon: './aseet/icon/icon-04.png'
	})
	aboutWindow.loadFile('./app/about.html')
}

ipcMain.on('image:minimize', (e, option) => {
	option.dest = path.join(os.homedir() + '/Desktop/Other')
	shringkImage(option)
})

async function shringkImage(option) {
	let { dest, imgPath, quality } = option
	quality = Number(quality) / 100
	try {
		const files = await imagemin([slash(imgPath)], {
			destination: dest,
			plugins: [
				imageminJpegtran(),
				imageminPngquant({
					quality: [ quality, quality]
				})
			]
		});
		shell.openPath(dest)
		mainWindow.webContents.send('img:done')
	} catch(e) {
		console.error( e)
	}
	
}
app.on('ready',  () => {
	createMainWindow()
	const menu = Menu.buildFromTemplate(menus)
  Menu.setApplicationMenu(menu)
	if (isDev) {
		mainWindow.webContents.openDevTools()
	}
	mainWindow.on('ready', () => mainWindow = null)
} )