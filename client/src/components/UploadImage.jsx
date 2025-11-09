import axios from "axios";
import { useState } from "react";
import { useWeb3Context } from "../contexts/useWeb3Context";
import toast from "react-hot-toast";
import { ImageUp } from "lucide-react";

const UploadImage = ({ closeModal, reloadEffect , folderName }) => {
	const [file, setFile] = useState(null);
	const [filedata, setFiledata] = useState({
		fileName: "",
		fileDescription: "",
	});
	const { web3State } = useWeb3Context();
	const { selectedAccount, contractInstance } = web3State;
	const [loading, setLoading] = useState(false);

	const uploadImageHash = async (ipfsHash) => {
		// const tx = await contractInstance.uploadFile(selectedAccount,ipfsHash)
		await toast.promise(
			contractInstance.uploadFile(selectedAccount, ipfsHash),
			{
				loading: "Transaction is pending",
				success: "Transaction is successful",
				error: "Transaction failed",
			}
		);
	};
	const handleImageUpload = async () => {
		try {
			setLoading(true);
			const formData = new FormData();
			formData.append("file", file);
            formData.append("fileName", filedata.fileName);        
            formData.append("fileDescription", filedata.fileDescription);
            formData.append("folderName", folderName);
			const url = `http://localhost:3000/api/uploadImage`;
			const token = localStorage.getItem("token");

			const config = {
				headers: {
					"x-access-token": token,
				},
			};
			const res = await axios.post(url, formData, config);

			toast.success("image uploaded");
			await uploadImageHash(res.data.ipfsHash);
			setLoading(false);
			reloadEffect();
		} catch (error) {
			console.error(error);
			toast.error("Image Upload Failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div
			onClick={() => closeModal()}
			className="w-full h-full fixed top-0 left-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className="flex flex-col bg-white justify-center p-5 items-center gap-6 rounded-3xl"
			>
				<h2 className="text-2xl font-semibold">Upload Image</h2>
				<div className="grid grid-cols-2 gap-4 justify-center items-center">
					<label className="ml-4 text-gray-600">File Name:</label>
					<input
						type="text"
						value={filedata.fileName}
						onChange={(e) =>
							setFiledata({ ...filedata, fileName: e.target.value })
						}
						className="border border-gray-300 rounded-md px-2 py-1 ml-2"
					/>
					<label className="ml-4 text-gray-600">
						File Description(optional):
					</label>
					<input
						type="text"
						value={filedata.fileDescription}
						onChange={(e) =>
							setFiledata({ ...filedata, fileDescription: e.target.value })
						}
						className="border border-gray-300 rounded-md px-2 py-1 ml-2"
					/>
					<input
						type="file"
						accept=".jpg, .jpeg, .png"
						onChange={(e) => setFile(e.target.files[0])}
						className="w-[200px] col-span-2 pl-4 md:w-[210px]"
					/>
				</div>
				{file ? (
					<button
						onClick={handleImageUpload}
						disabled={loading}
						className="border-sky-400 border-dotted p-2 border-2 rounded-md flex flex-col justify-center items-center hover:bg-sky-200"
					>
						{loading ? "Uploading..." : "Upload"}
					</button>
				) : (
					<p className="text-[20px] font-semibold text-red-500">
						Choose a File To Upload
					</p>
				)}

				<br />
			</div>
		</div>
	);
};

export default UploadImage;

// await toast.promise(axios.post(url,formData),{
//     loading:"Image is uploading",
//     success:async(res)=>{
//         await uploadImageHash(res.data.ipfsHash)
//         return "Image upload successful"
//     },
//     error:"Image Upload failed"
// })
