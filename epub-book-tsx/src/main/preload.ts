import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = string;

export function handleLog(msg: string) {
	console.log('handleLog===', msg)
}

contextBridge.exposeInMainWorld('api', {
	handleLog(msg: string) {
		console.log('handleLog===', msg)
	},
})

contextBridge.exposeInMainWorld('electron', {

	ipcRenderer: {
		sendMessage(channel: Channels, args: unknown[]) {
			ipcRenderer.send(channel, args);
		},
		on(channel: Channels, func: (...args: unknown[]) => void) {
			const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
				func(...args);
			ipcRenderer.on(channel, subscription);

			return () => {
				ipcRenderer.removeListener(channel, subscription);
			};
		},
		once(channel: Channels, func: (...args: unknown[]) => void) {
			ipcRenderer.once(channel, (_event, ...args) => func(...args));
		},
	},
});
