import { useState, useEffect } from "react";
import EmptyBook from "./Empty";
import BookItem from "./BookItem";


const BookManage = () => {
	const [storeData, setStoreData] = useState({} as StroeData)
	const [bookList, setBookList] = useState([] as string[])
	const handImport: HandImportFunc = (fp: string | undefined) => {
		if (fp) {
			window.electron.ipcRenderer.sendMessage('books:upload', [fp])
		}
	}
	useEffect(() => {
		window.api.handleLog('测试 handleLog');
		window.electron.ipcRenderer.on('books:load', (arg) => {
			if (!arg || !Object.keys(arg)) return
			setBookList(Object.keys(arg))
			setStoreData(arg)
		})
		window.electron.ipcRenderer.sendMessage('books:ready', [])
	}, [])
	return (
		<>
			{bookList?.length > 0 ? (bookList.map(item => {
				return <BookItem key={item} name={item} position={storeData[item]}></BookItem>
			})) : (<EmptyBook handImport={handImport} />)}
		</>

	)
}

export default BookManage