import { ipcMain, BrowserWindow } from "electron";
import { slash } from "./util";
import path from 'path'
import fs from 'fs'
export default class BooksIpc {
	private bookStroe: Store
	private mainWindow: BrowserWindow | null = null
	constructor(bookStroe: Store, mainWindow: BrowserWindow | null = null) {
		this.bookStroe = bookStroe
		this.mainWindow = mainWindow
		ipcMain.on('books:ready', () => {
			this.sendData()
		})
		this.upload()
		this.viewData()
	}
	upload() {
		ipcMain.on('books:upload', (e, arg) => {
			const [fp] = arg
			const bName = path.basename(fp, '.epub')
			this.bookStroe.set(bName, slash(fp as string))
			this.sendData()
		})
	}
	sendData() {
		this.mainWindow?.webContents.send('books:load', this.bookStroe.toJson())
	}
	viewData() {
		ipcMain.on('books:view', (e, arg) => {
			const [fp] = arg
			console.log('books:view===', fp)
			fs.readFile(slash(fp as string), (err, data) => {
				this.mainWindow?.webContents.send('books:viewdata', err ? null : data)
			})
		})
	}

}
