const electron = require('electron')
const path = require('path')
const fs = require('fs')
interface StoreOptions {
	configName: string,
	defaults: any
}

class Store {
	private path: string = ''
	private data: StroeData = {};
	constructor(options: StoreOptions) {
		const userDataPath = path.join(__dirname, 'caches')
		this.path = path.join(userDataPath, options.configName + '.json')
		this.data = parseDataFile(this.path, options.defaults)
	}

	get(key: string) {
		return this.data[key]
	}

	set(key: string, val: any) {
		this.data[key] = val
		fs.writeFileSync(this.path, JSON.stringify(this.data))
	}

	toJson() {
		return this.data;
	}
}

function parseDataFile(filePath: string, defaults = null) {
	try {
		return JSON.parse(fs.readFileSync(filePath))
	} catch (err) {
		return defaults
	}
}

export default Store
