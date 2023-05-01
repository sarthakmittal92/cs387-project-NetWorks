import "./makepost.css"
import React ,{useState}from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Makepost = () => {

    const [list, setList] = useState([]);
    const [image, setImage] = useState([]);

    const showToastMessage = (dat,val) => {
        if(val){
            toast.success(dat, {
                position: toast.POSITION.TOP_RIGHT
            });
        }else{
            toast.error(dat, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
        
    };

    function handleRemove(id) {
      const newList = list.filter((item) => item.id !== id);
      setList(newList);
    }
    const handleAdd = ()=> {
        var hashtag = document.getElementById("hashtag").value;
        if(!(hashtag==="")){
            const isFound = list.some(element => {
                if (element.id === hashtag) {
                    return true;
                }
                return false;
                });
            if(!isFound){
                const newList = [...list,{id:hashtag}];
                setList(newList);
            }
            document.getElementById("hashtag").value = "";
        }
      }
    
      const handleSubmit = ()=>{
        (async () => {
            var caption = document.getElementById("caption").value;
            const formData = new FormData();
            if(image.length===0 || image===undefined){
                console.log(image,"you are right",list);
                const dat = await fetch('http://localhost:5001/Q22', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                  },
                credentials:'include',
                withCredentials:true,
                body: JSON.stringify({
                    caption:caption,
                    hashtags:list
                }),
                }).then((response) => response.json());
                if(dat.value){
                showToastMessage(dat.result,1); 
                }
                else{
                showToastMessage(dat.result,0); 
                }
                
            }else{
                console.log(image,"why here")
                formData.append("image",image);
                formData.append("caption",caption);
                formData.append("hashtags",list.length);
                for (var i = 0; i < list.length;i++) {
                    formData.append(i, list[i].id);
                }
                // formData.append('hashtags', JSON.stringify(list));
                console.log(image);
                const dat = await fetch('http://localhost:5001/Q7', {
                  method: 'POST',
                  credentials:'include',
                  withCredentials:true,
                  body: formData,
                }).then((response) => response.json());
                if(dat.value){
                  showToastMessage(dat.result,1); 
                }
                else{
                  showToastMessage(dat.result,0); 
                }
            }
            
          })();
      }


        return (
            <>
                <ToastContainer />
                <div className="ACaption">
                    <textarea rows="5" cols="60" type="text" name="caption" className="capi w3-input" placeholder="Write Caption" id="caption"/>
                </div>
                <div className="Hashtag">
                    <input type="text" name="hashtname" className="gh" placeholder="Add # here" id="hashtag" />
                    <button type="button"class="btpost" onClick={handleAdd}> Add </button>
                    <div className="HashtagD">
                        <ul className="hcl">
                            {list.map((item) => (
                                <li class="hli" key={item.id}>
                                <span>{item.id}</span>
                                <button class=" bli" type="button" onClick={() => handleRemove(item.id)}>
                                    remove
                                </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div>
                       <div className="fsb ">         
                        <input  onChange={(e)=>{setImage(e.target.files[0])}} type = "file" id = "image" name = "image" multiple = "true" />
                        <input className="btsub" onClick={handleSubmit} type = "submit" />
                        </div>
         
                </div>               
            </>
        )
}