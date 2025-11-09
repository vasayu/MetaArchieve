import { useNavigate } from "react-router-dom";
import { useWeb3Context } from "../contexts/useWeb3Context";
import toast from "react-hot-toast";

const Navbar = () => {
    const navigate=useNavigate();
    const {web3State}=useWeb3Context()
    const {selectedAccount}=web3State;
    return (  
    <div className="w-full bg-[#1F2D1F] py-4 px-10 flex flex-row justify-between items-center gap-20 shadow-lg">
        <h1 className="font-bold text-4xl text-[#d4f8d4] md:text-4lg">
            MetaArchive
        </h1>
        <div className="flex flex-row">
            <p className="bg-[#d4f8d4] text-[#1F2D1F] px-4 py-2 rounded-full border-2 border-[#d4f8d4]">
                {selectedAccount ? `Connected: ${selectedAccount.substring(0,6)}...${selectedAccount.substring(selectedAccount.length - 4)}` : "Not Connected"}
            </p>
            <button onClick={() => {
                localStorage.removeItem("token")
                window.location.href = "/" 
                toast.success("Logged out successfully")
            }}
                className="text-[#d4f8d4] border-2 border-[#d4f8d4] hover:bg-[#d4f8d4] transition-all duration-300 hover:text-[#1F2D1F] bg-transparent px-4 py-2 ml-4 rounded-full">
                    logout
            </button>
        </div>
      </div>
    );
}
 
export default Navbar;