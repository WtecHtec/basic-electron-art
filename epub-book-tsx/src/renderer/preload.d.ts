import { Channels } from 'main/preload';


declare global {
	interface StroeData {
		[propName: string]: any
	}
	class Store {
		get(key: string): any
		set(key: string, data: any): void
		toJson(): any
	}
	interface HandImportFunc {
		(fp: string | undefined): void
	}

	interface Window {
		api: {
			handleLog(msg: string): void
		},
		electron: {
			ipcRenderer: {
				sendMessage(channel: Channels, args: unknown[]): void;
				on(
					channel: Channels,
					func: (...args: unknown[]) => void
				): (() => void) | undefined;
				once(channel: Channels, func: (...args: any) => void): void;
			};
		};
	}
}

export {

};
