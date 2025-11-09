import { useWeb3Context } from "../contexts/useWeb3Context";
import UploadImage from "../components/UploadImage";
import GetImage from "../components/GetImage";
import { useEffect, useState } from "react";
import { FolderIcon } from "lucide-react";
import axios from "axios";

const Home = () => {
	const [reload, setReload] = useState(false);
	const [newFolderName, setNewFolderName] = useState("");
    const {web3State}=useWeb3Context()
    const {selectedAccount}=web3State;
    const [userData,setUserData]=useState(null);
	const [folders, setFolders] = useState([{
        folderName: "(unnamed)",
        files:[
            {}
        ]
    }]);
	const [selectedFolder, setSelectedFolder] = useState(folders[0]);
	const [addFileModalOpen, setAddFileModalOpen] = useState(false);
	// const {web3State}=useWeb3Context()
	// const {selectedAccount}=web3State;
	const reloadEffect = () => {
		setReload(!reload);
	};

	const handleCreateFolder = async() => {
		if (newFolderName.trim() === "") return;

		const newFolder = {
			folderName: newFolderName.trim(),
			files: [],
		};

        try{
            const url=`http://localhost:3000/api/user/createFolder`
            const token = localStorage.getItem("token")
            const config={
                headers:{
                    "x-access-token":token
                }
            }
            const body={
                userAddress:selectedAccount,
                folderName:newFolderName.trim()
            }
            const res = await axios.post(url,body,config)
        }catch(error){
            console.error("Error creating folder: ",error)
        }finally{
            setFolders((prevFolders) => [...prevFolders, newFolder]);
            setNewFolderName("");
        }
	};

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const url=`http://localhost:3000/api/user/user`
                const token = localStorage.getItem("token")
                const config={
                    headers:{
                        "x-access-token":token
                    }
                }
                const res = await axios.get(url,config)
                setUserData(res.data.user)
                setFolders(res.data.user.folders)
                setSelectedFolder(res.data.user.folders[0] || null)
            }catch(error){
                console.error("Error fetching user data: ",error)
            }
        };
        selectedAccount && fetchUserData();
    }, [selectedAccount,reload]);

	return (
		<div className="h-full w-full mt-8 px-10 ">
			<div className="flex flex-row justify-between">
				<h1 className="text-xl font-semibold mb-5">Document Dashboard</h1>
			</div>
			<div className="flex flex-row gap-20">
				<div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-xl border border-gray-200 h-fit">
					<h3 className="text-xl font-semibold mb-4 border-b border-gray-200 pb-2">
						Folders
					</h3>

					<div className="mb-6 space-y-2">
						<input
							type="text"
							placeholder="New Folder Name"
							value={newFolderName}
							onChange={(e) => setNewFolderName(e.target.value)}
							className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:ring-green-500 focus:border-green-500"
						/>
						<button
							onClick={handleCreateFolder}
							className={`w-full py-2 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition duration-150 text-white text-sm disabled:opacity-50  disabled:cursor-not-allowed`}
							disabled={newFolderName.trim() === ""}
						>
							+ Create Folder
						</button>
					</div>

					{/* Folder List */}
					<div className="space-y-2 max-h-96 overflow-y-auto pr-2">
						{folders.length > 0 ? (
							folders.map((folder) => (
								<button
									key={folder.id}
									onClick={() => setSelectedFolder(folder)}
									className={`flex items-center w-full p-3 rounded-lg text-left transition duration-150 ${
										selectedFolder.folderName === folder.folderName
											? "bg-green-100 text-green-700 font-semibold shadow-md border border-green-300"
											: "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
									}`}
								>
									<FolderIcon className="w-5 h-5 mr-3" />
									<span className="truncate flex-grow">{folder.folderName}</span>
									<span className="text-xs ml-2 opacity-70">
										({folder?.files?.length})
									</span>
								</button>
							))
						) : (
							<p className="text-gray-500 text-center pt-4">
								No folders yet. Create one above!
							</p>
						)}
					</div>
				</div>

				<div className="w-full bg-white p-6 rounded-xl shadow-xl border border-gray-200">
					{selectedFolder ? (
						<>
							<div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-4">
								<h3 className="text-2xl font-semibold text-gray-800 truncate max-w-[80%]">
									Folder:{" "}
									<span className="text-green-700">{selectedFolder.folderName}</span>
								</h3>
								<span
									onClick={() => {
										setAddFileModalOpen(!addFileModalOpen);
									}}
									className={`py-2 px-4 rounded-lg font-medium text-sm transition duration-150 flex items-center bg-green-600 hover:bg-green-700 text-white cursor-pointer`}
								>
									{/* <svg
												className="animate-spin h-5 w-5 mr-3 text-white"
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
											>
												<circle
													className="opacity-25"
													cx="12"
													cy="12"
													r="10"
													stroke="currentColor"
													strokeWidth="4"
												></circle>
												<path
													className="opacity-75"
													fill="currentColor"
													d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
												></path>
											</svg> */}
									+ Add File
								</span>
							</div>
							{/* File List */}
							<div className="space-y-3 max-h-[500px] overflow-y-auto">
				                <GetImage reload={reload} selectedFolder={selectedFolder} />
							</div>
						</>
					) : (
						<div className="text-center p-10 text-gray-500">
							<h3 className="text-xl font-semibold mb-2">Select a Folder</h3>
							<p>
								Choose an existing folder on the left or create a new one to
								start archiving your documents.
							</p>
						</div>
					)}
				</div>
				{addFileModalOpen && (
					<UploadImage
						closeModal={() => setAddFileModalOpen(false)}
						reloadEffect={reloadEffect}
                        folderName={selectedFolder.folderName}
					/>
				)}
			</div>
		</div>
	);
};

export default Home;
