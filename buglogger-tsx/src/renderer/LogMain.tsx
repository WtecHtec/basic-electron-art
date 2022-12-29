import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'
import  Button  from 'react-bootstrap/Button';
import LogItem from './LogItem'
import AddLogItem from './AddLogItem'

export default function LogMain() {
	const navigate = useNavigate();
	const [logs, setLogs] = useState([
    {
      _id: 1,
      text: 'This is log one',
      priority: 'low',
      user: 'Brad',
      created: new Date().toString(),
    },
    {
      _id: 2,
      text: 'This is log two',
      priority: 'moderate',
      user: 'Kate',
      created: new Date().toString(),
    },
    {
      _id: 3,
      text: 'This is log three',
      priority: 'high',
      user: 'John',
      created: new Date().toString(),
    },
  ])
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    variant: 'success',
  })

	function showAlert(message: any, variant:string = 'success', seconds:number = 3000) {
    setAlert({
      show: true,
      message,
      variant,
    })

    setTimeout(() => {
      setAlert({
        show: false,
        message: '',
        variant: 'success',
      })
    }, seconds)
  }

	const deleteItem = (_id: Number) => {
		console.log(_id)
		window.electron.ipcRenderer.sendMessage('logs:delete', _id)
    showAlert('Log Removed')
	}
	const addItem = (item : any) => {
		if (item.text === '' || item.user === '' || item.priority === '') {
      showAlert('Please enter all fields', 'danger')
      return false
    }

    // item._id = Math.floor(Math.random() * 90000) + 10000
    // item.created = new Date().toString()
    // setLogs([...logs, item])

    window.electron.ipcRenderer.sendMessage('logs:add', item)

    showAlert('Log Added')
	}

	useEffect(() => {
    window.electron.ipcRenderer.sendMessage('logs:load', [])

		window.electron.ipcRenderer.once('ipc-example', (arg) => {
			// eslint-disable-next-line no-console
			console.log('ipc-example===', arg);
		});

		window.electron.ipcRenderer.on('logs:get', (logs: any) => {
			console.log('logs:get===', logs)
      setLogs(JSON.parse(logs))
    })

    // ipcRenderer.on('logs:clear', () => {
    //   setLogs([])
    //   showAlert('Logs Cleared')
    // })
  }, [])

 return (
	 <Container>
		<Button variant="link" onClick={() => navigate('/hello')}>跳转Hello</Button>
		<AddLogItem addItem={addItem} />
		{alert.show && <Alert variant={alert.variant}>{alert.message}</Alert>}
		<Table>
			<thead>
				<tr>
					<th>Priority</th>
					<th>Log Text</th>
					<th>User</th>
					<th>Created</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
					{logs.map((log) => (
            <LogItem key={log._id} log={log} deleteItem={ deleteItem } />
          ))}
			</tbody>
		</Table>
	 </Container> 
 )
}