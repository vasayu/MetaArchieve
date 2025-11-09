import axios from "axios";
import { useWeb3Context } from "../contexts/useWeb3Context";
import { useEffect, useState } from "react";
import {toast} from "react-hot-toast"
import { CircleArrowLeft,CircleArrowRight, FileTextIcon } from "lucide-react";
const GetImage = ({reload,selectedFolder}) => {
    const [currentPage,setCurrentPage]=useState(1)
    const [imagePerPage,setImagePerPage]=useState(3);
    const [images,setImages]=useState([])
    const [loading,setLoading]=useState(false)
    const {web3State}=useWeb3Context()
    const {selectedAccount,contractInstance}=web3State;
    useEffect(()=>{
        try {
            const getImageHashes=async()=>{
               const ipfsHashes = await contractInstance.viewFiles(selectedAccount)
               return ipfsHashes;
            }
             const getImage=async()=>{
              setLoading(true)
            //   const ipfsHashes = await getImageHashes()
            console.log("Selected Folder: ",selectedFolder)
            const ipfsHashArray = selectedFolder.files.map(file => file.ipfsHash);
            console.log(ipfsHashArray)

              const url=`http://localhost:3000/api/getImage?page=${currentPage}&limit=${imagePerPage}`
              const token = localStorage.getItem("token")
              const config={
                headers:{
                    "x-access-token":token
                }
              }
              const res = await axios.post(url,ipfsHashArray,config)
              const imagesData = res.data.depcryptedImageArr;
              console.log("Fetched Images: ",imagesData)
              setImages(imagesData)
              setLoading(false)
            }
            getImage()
        } catch (error) {
            toast.error("Error Fetching Images")
        }finally{
            setLoading(false)
        }
       
    },[selectedFolder])

    const paginate = (pageNumber)=>setCurrentPage(pageNumber)
    return (<>
    {  !loading?(
        selectedFolder.files.length>0?
        (
         <div className="flex flex-col gap-3 justify-start md:justify-center items-center w-full  overflow-x-auto">
            {selectedFolder.files.map((imgData, index) => (
                <FileItem key={index} file={imgData} imgData={images[index]} />
            ))}
                {/* <img
                    key={index}
                    src={`data:image/jpeg;base64,${imgData}`}
                    alt={`Image ${index + 1}`}
                    className="w-[300px] h-[240px]  mx-2 object-cover"
                /> */}
          </div>
        )
        :(
        <p>No images found</p>
        )):<p>Loading...</p>
     }
    </>);
}

const FileItem = ({ file, imgData }) => {
    const [openImage, setOpenImage] = useState(false);
    return (
        <div className="flex items-center w-full justify-between p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-150 border border-gray-200">
        <div className="flex items-center space-x-3">
            <FileTextIcon className="w-5 h-5 text-green-600" />
            <span className="font-medium text-gray-800 truncate max-w-[200px] sm:max-w-none">{file.fileName}</span>
        </div>
        <div className="flex items-center space-x-4 text-sm text-gray-500">
            <button onClick={() => {setOpenImage(true)}} className="text-green-600 hover:text-green-700 text-xs py-1 px-2 rounded-md border border-green-300 bg-white shadow-sm">
            View
            </button>
        </div>
        {openImage && (
            <div
            onClick={() => setOpenImage(false)}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white p-4 rounded-lg max-w-full max-h-full overflow-auto"
            >
                <img
                src={`data:image/jpeg;base64,${imgData}`}
                alt={file.fileName}
                className="w-[300px] h-[240px]  mx-2 object-cover"
                />
                <div className="mt-2">
                    <p><span className="font-semibold block">File Name: </span><span className="pl-2">{file.fileName || "No name provided."}</span></p>
                    <p><span className="font-semibold block">File Description: </span><span className="pl-2">{file.fileDescription || "No description provided."}</span></p>
                </div>
            </div>
            </div>
        )}
        </div>
    );
};

export default GetImage;