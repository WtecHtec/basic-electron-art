import { Card } from "antd"
import { useNavigate } from "react-router-dom";
const { Meta } = Card;
interface BookItemPorp {
	name: string
	position: string
}
const BookItem = ({ name, position }: BookItemPorp) => {
	const navigate = useNavigate()
	const handToView = (name: string, position: string) => {
		console.log(position)
		navigate('/view', { state: { name, position, } })
	}
	return (
		<Card
			onClick={() => handToView(name, position)}
			hoverable
			style={{ width: 240 }}
			cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
		>
			<Meta title={name} description={position} />
		</Card>
	)
}
export default BookItem