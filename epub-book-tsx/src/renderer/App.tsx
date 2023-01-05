import { Breadcrumb, Layout } from 'antd';
import RouterMain from './RouterMain';
import { useEffect, useState } from 'react';
import { useLocation, MemoryRouter as Router } from 'react-router-dom';
import './App.css';
const { Header, Content, Footer } = Layout;

function BreadcrumbLink() {
	let location = useLocation()
	const [curName, setCurName] = useState('')
	useEffect(() => {
		const { pathname } = location;
		if (pathname === '/view') {
			setCurName(location.state.name)
		}
	}, [location])

	return (
		<Breadcrumb style={{ margin: '21px 0', }}>
			<Breadcrumb.Item className={'c-fff'} href="/"> 图书馆</Breadcrumb.Item>
			{curName && <Breadcrumb.Item> {curName}</Breadcrumb.Item>}
		</Breadcrumb>
	)
}

export default function App() {
	// const { pathname } = useLocation(); `// 2、存储当前路由地址`
	return (
		<Router>
			<Layout style={{ height: '100vh' }} className='min-w-600px'>
				<Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%', background: '#ffffff', }}>
					<BreadcrumbLink></BreadcrumbLink>
				</Header>
				<Content className="site-layout relative" style={{ padding: '12px 50px', boxSizing: 'border-box', overflow: 'hidden' }}>
					<RouterMain />
				</Content>
				<Footer style={{ textAlign: 'center', lineHeight: '16px', }}>Epub ©2022 Created by H</Footer>
			</Layout>
		</Router>
	);
}
