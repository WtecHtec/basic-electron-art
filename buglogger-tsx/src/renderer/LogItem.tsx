
import Moment from 'react-moment'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'

const LogItem = ({
  deleteItem,
  log: { _id, priority, user, text, created },
}: any) => {
  const setVariant = () => {
    if (priority === 'high') {
      return 'danger'
    } else if (priority === 'moderate') {
      return 'warning'
    } else {
      return 'success'
    }
  }

  return (
    <tr>
      <td>
        <Badge bg={ setVariant()} className='p-2'>
          {priority.charAt(0).toUpperCase() + priority.slice(1)}
        </Badge>
      </td>
      <td>{text}</td>
      <td>{user}</td>
      <td>
        <Moment format='MMMM Do YYYY, h:mm:ss a'>{new Date(created)}</Moment>
      </td>
      <td>
        <Button variant='danger' size='sm' onClick={() => deleteItem(_id)}>
          x
        </Button>
      </td>
    </tr>
  )
}

export default LogItem
