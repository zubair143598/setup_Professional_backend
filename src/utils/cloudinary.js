// as cloudinary is a name it depend on us if we want to give or not even i can give my name like {v2 as Zubair}
import {v2 as cloudinary} from "cloudinary"
// fs is a file system which come with node by default no need to install separately, it is use todo operation like read , write, remove on file. in simple word: we use to mange file system
import fs from "fs"

// linked and unlinked in fs is used to add or delete files from fs 

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

//more organize method 
// the localFilePath is the file url
const uploadOnCloudinary = async ( localFilePath)=>{
    try {
        if (!localFilePath) return null;
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })

        //file has been successfully uploaded 
        // console.log("file is uploaded on cloudinary", response.url);

        fs.unlinkSync(localFilePath)

        return response        

    } catch (error) {
        // if file is not uploaded successfully this is case of catch, if some mistake in local path also catch case.
        //when use method on cloudinary, so the file is on my server because the local file is received, but it is not upload so  it is a problem, so for cleaning purpose we have to remove that from server because if we don't than the corrupted file will still remain server, so to avoid this we will use the unlinked of fs 
        
        fs.unlinkSync(localFilePath) //remove the locally saved temporary file as the upload operation got failed
    }
}

export {uploadOnCloudinary}




// // Cloudinary method 
// // we can upload file only through this  just give file link in the url and make a method. simple( we can write a method and the provided link will  be write in the url )
// const uploadResult = await cloudinary.uploader
//        .upload(
//            'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//                public_id: 'shoes',
//            }
//        )
//        .catch((error) => {
//            console.log(error);
//        });
    
//     console.log(uploadResult);
 

    