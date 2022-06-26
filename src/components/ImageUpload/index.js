import { Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { BASE_URL } from "@/utils/constants";

const ImageUpload = ({ value, onChange }) => {
	return (
		<Upload
			listType="picture-card"
			className="avatar-uploader"
			showUploadList={false}
			action="https://test/"
			onChange={onChange}
		>
			{value ? (
				<img
					src={BASE_URL + value}
					alt="图片"
					style={{ width: "100%" }}
				/>
			) : (
				<div>
					<PlusOutlined />
					<div style={{ marginTop: 8 }}>上传图片</div>
				</div>
			)}
		</Upload>
	);
};

export default ImageUpload;
