import { useLocation, } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Epub, { Rendition } from 'epubjs';
import { Progress } from 'antd';
const BookView = () => {
	const location = useLocation()
	const { state: { position } } = location
	const [viewState, setViewState] = useState(false)
	const [percent, setPercent] = useState(0)
	let rendition: Rendition
	// 打开书籍
	useEffect(() => {
		window.electron.ipcRenderer.sendMessage('books:view', [position])
		window.electron.ipcRenderer.once('books:viewdata', (arg) => {
			if (!arg) {
				return
			}
			setViewState(true)
			console.log(arg.buffer)
			const book = Epub((arg?.buffer) as ArrayBuffer) as any;
			rendition = book.renderTo("area", { width: 600, height: '100%' });
			rendition.display();
			const keyListener = function (e: any) {
				// Left Key
				if ((e.keyCode || e.which) == 37) {
					book.package.metadata.direction === "rtl" ? rendition.next() : rendition.prev();
				}
				// Right Key
				if ((e.keyCode || e.which) == 39) {
					book.package.metadata.direction === "rtl" ? rendition.prev() : rendition.next();
				}
				console.log(book)
				console.log(rendition.currentLocation())
			};
			console.log(rendition)
			console.log(book)
			book.ready.then(() => {
				book.on('book:pageChanged', function (location: any) {
					console.log(location.anchorPage, location.pageRange)
				});
				return book.locations.generate();
			}).then((locations: any) => {
				console.log("Total Pages?: ", locations.length, locations.currentLocation);
				rendition.on('keyup', keyListener);
				document.addEventListener('keyup', keyListener)
				rendition.on('click', (e: any) => {
					console.log(e)
					console.log(rendition.currentLocation())
				})
			});
			return () => {
				rendition.off('keyup', keyListener)
				document.removeEventListener('keyup', keyListener)
				book.destroy()
			}
		})
	}, [])

	return (
		<>
			<div className='w-100p absolute left-0  top-0 fs-0'>
				<Progress className='fs-0' percent={percent} strokeWidth={1} showInfo={false}></Progress>
			</div>
			<div className='min-w-600px w-100p h-100p relative flex justify-content-center ' >
				<div id="area" className='h-100p' style={{ margin: 'auto' }}> {viewState || '正在打开epub......'}  </div>
			</div>
		</>
	)
}

export default BookView