import { Button, Empty, Upload } from 'antd';
import { UploadChangeParam } from 'antd/es/upload';

interface EmptyBookProps {
	handImport: HandImportFunc
}

const EmptyBook = ({ handImport }: EmptyBookProps) => {
	const onChange = (arg: UploadChangeParam) => {
		let filePath: string | undefined
		try {
			filePath = arg.fileList[0].originFileObj?.path
		} catch (e) { }
		handImport(filePath)
	}

	return (
		<Empty
			image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
			imageStyle={{
				height: 60,
			}}
			description={
				<span>
					没有任何一本Epub书籍
				</span>
			}
		>
			<Upload accept=".epub" showUploadList={false} beforeUpload={() => false} onChange={onChange}>
				<Button type="primary" >导入</Button>
			</Upload>
		</Empty>
	)
}
export default EmptyBook