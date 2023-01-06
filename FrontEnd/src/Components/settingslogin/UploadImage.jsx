import axios from "axios";
import { useState } from "react";
import baseUrl from "../environment/baseUrl";
import FileBase64 from 'react-file-base64';
import baseUrlImage from "../environment/baseUrlImage";

function UploadImage(){
    const [image, setImage] = useState("");
    const[blob,setBlob]=useState("");
    const handleImage=(e)=>{
        setImage(e.target.files[0]);
    }
    async function Upload(e){
        const formData = new FormData();
        formData.append('myfile',image);
        const response=await axios.post(`${baseUrlImage}/upload`,formData);
        
    }
    async function see(){
        const response1=await axios.get(`${baseUrlImage}/get/myfile`);

        setBlob(response1.data.pic);
    }
    return(<>
        <h3>Image Uploading Module</h3>

<div>
    <input type={"file"} name="pic" onChange={(e)=>handleImage(e)}></input><br/>
    <button type="submit" onClick={(e)=>Upload(e)}>upload</button>
    <button onClick={(e)=>see(e)} >see</button>
    <img className="blob-to-image" src={"data:image/jpg;base64," + blob}></img>
   
</div>
<hr />
</>
);
}
export default UploadImage;