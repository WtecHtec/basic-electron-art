import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import BookManage from './BookManage';
import BookView from './BookView';
const RouterMain = () => {
	return (

		<Routes>
			<Route path="/" element={<BookManage />} />
			<Route path="/view" element={<BookView />} />
		</Routes>
	)
}

export default RouterMain