import {useWeb3Context} from "../contexts/useWeb3Context"
import { connectWallet } from "../utils/connectWallet";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { CloudUpload, ShieldCheck, Folder } from "lucide-react";

const Wallet = () => {
    const navigateTo=useNavigate()
    const {updateWeb3State,web3State} = useWeb3Context()
    const {selectedAccount}=web3State;
    useEffect(()=>{
      if(selectedAccount){
        navigateTo("/dashboard")
      }
    },[selectedAccount,navigateTo])
    
    const handleWalletConnection = async()=>{
        const {contractInstance,selectedAccount} = await connectWallet();
        updateWeb3State({contractInstance,selectedAccount})
    }
    
    return ( 
    <div className="absolute inset-0 -z-10 h-full w-full bg-white">
    {/* <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)] flex flex-col justify-center items-center gap-20"> */}
      <div className=" bg-[#1F2D1F] py-4 px-10 flex flex-row justify-between items-center gap-20 shadow-lg">
        <h1 className="font-bold text-4xl text-[#d4f8d4] md:text-4lg">
            MetaArchive
        </h1>
        <button
        className="relative px-4 py-2 text-[#d4f8d4] border-2 border-[#d4f8d4] hover:bg-[#d4f8d4] transition-all duration-300 hover:text-[#1F2D1F] bg-transparent rounded-full"
        onClick={handleWalletConnection}
      >
        Connect Wallet
      </button>
      </div>
      <section className="flex flex-col md:flex-row items-center bg-[#d4f8d4] justify-between px-8 md:px-16 py-20">
        <div className="max-w-xl space-y-6">
          <h2 className="text-5xl font-bold leading-tight">
            Decentralized Archiving You Can Trust
          </h2>
          <p className="text-sm text-[#1F2D1F]/80">
            Store, verify, and access your files securely using blockchain-backed storage.
            Experience complete control, transparency, and permanence with Ethereum and IPFS.
          </p>
          <button onClick={handleWalletConnection}
            className="bg-[#1F2D1F] text-white rounded-full px-6 py-2 hover:bg-[#152015]">
            Get Started
          </button>
        </div>

        <div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mt-10 md:mt-0"
        >
          <img
            src="/Image.png"
            alt="Decentralized Network"
            className="w-80 md:w-96 drop-shadow-2xl"
          />
        </div>
      </section>

      {/* Features Intro */}
      <section className="text-center bg-[#1f2d1f] py-20 px-6">
        <p className=" text-gray-200 text-xs uppercase mb-2">Features</p>
        <h3 className="text-white text-3xl font-semibold max-w-2xl mx-auto">
          Empower your data with decentralized integrity.
        </h3>
        <p className="text-sm mt-3 text-white">
          MetaArchive ensures your important documents remain tamper-proof and accessible forever.
        </p>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-6 px-8 md:px-16 py-20 bg-[#D4F8D4]">
        {[
          { icon: <CloudUpload size={40} />, title: "Decentralized Storage", desc: "Your files are stored across IPFS nodes ensuring security and redundancy." },
          { icon: <ShieldCheck size={40} />, title: "Blockchain Verification", desc: "Every file upload is hashed and verified on Ethereum for immutable proof." },
          { icon: <Folder size={40} />, title: "Organized File System", desc: "Easily create folders, upload documents, and manage archives seamlessly." },
        ].map((feature, i) => (
          <div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
          >
            <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition">
              <div className="p-8 text-center">
                <div className="flex justify-center mb-4 text-[#1F2D1F]">{feature.icon}</div>
                <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
                <p className="text-sm text-[#1F2D1F]/80">{feature.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="text-center py-8 bg-[#1f2d1f] text-white text-sm">
        © {new Date().getFullYear()} MetaArchive. Built with Web3 and IPFS.
      </footer>
    {/* </div> */}
  </div> );
}
 
export default Wallet;