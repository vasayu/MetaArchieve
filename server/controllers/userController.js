import UserModel from '../models/User.js';

export const getUserFolders = async (req, res) => {
    try {
        const userAddress = req.userAddress;
        const user = await UserModel.findOne({userAddress});  
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        const folders = user.folders || [];
        res.status(200).json({folders});
    } catch (error) {
        console.error("Error fetching user folders:", error);
        res.status(500).json({message:"Internal Server Error"})
    }
}

export const createFolder = async (req, res) => {
    try {
      const { userAddress, folderName } = req.body;
  
      // Validate input
      if (!userAddress || !folderName) {
        return res.status(400).json({ message: "userAddress and folderName are required" });
      }
  
      // Find user by wallet/user address
      const user = await UserModel.findOne({ userAddress });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Check if folder with same name already exists
      const existingFolder = user.folders.find(f => f.folderName === folderName);
      if (existingFolder) {
        return res.status(400).json({ message: "Folder with this name already exists" });
      }
  
      // Add new folder
      user.folders.push({ folderName, files: [] });
  
      // Save user document
      await user.save();
  
      res.status(201).json({
        message: "Folder created successfully",
        folders: user.folders, // return updated folder list
      });
    } catch (error) {
      console.error("Error creating folder:", error);
      res.status(500).json({ message: "Server error" });
    }
  };


  export const getUser = async (req, res) => {
    try {
        const userAddress = req.address;
        console.log(userAddress)
        const user = await UserModel.findOne({userAddress});  
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        res.status(200).json({user});
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({message:"Internal Server Error"})
    }
}