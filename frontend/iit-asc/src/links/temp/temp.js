
// import React ,{useEffect}from 'react';
// import './style.css'
// // import ScriptTag from 'react-script-tag';
// import {Helmet} from "react-helmet";
// // import { useSpeechSynthesis } from "react-speech-kit";
// export const Temp = () => {
    
//     // const ourText="Hello"
//     // const { speak } = useSpeechSynthesis()
//     // const text = 'Some dummy text'

//     // const inputElement = useRef()

//     // function speechHandler () {
//     //     console.log("uuu");
//     //     const msg = new SpeechSynthesisUtterance()
//     //     msg.text = text
//     //     window.speechSynthesis.speak(msg);
//     //     console.log("bolo");
//     // }


//     // useEffect(() => {
//     //     const timer =  setTimeout(() => {
//     //         console.log(inputElement)
//     //         // document.getElementById("bc").click();
//     //         speechHandler();
//     //     },1000);
//     //     return()=>clearTimeout(timer)
//     //   }, []);
//     useEffect(() => {
//         const script = document.createElement('script');
//         script.src = "./app.js";
//         script.async = true;
//         document.body.appendChild(script);
//       return () => {
//           document.body.removeChild(script);
//         }
//       }, []);
    

//     return (
//         <>
//                 <div class="container">
//                     <div class="doraemon">
//                     <div class="face">
//                         <div class="white">
//                         <div class="eye left">
//                             <div class="eye-black"></div>
//                         </div>
//                         <div class="eye right">
//                             <div class="eye-black"></div>
//                         </div>
//                         <div class="nose"></div>
//                         <div class="mouth"></div>
//                         <div class="mustache left"></div>
//                         <div class="mustache two left"></div>
//                         <div class="mustache three left"></div>
//                         <div class="mustache right"></div>
//                         <div class="mustache two right"></div>
//                         <div class="mustache three right"></div>
//                         </div>
//                     </div>
//                     </div>
//                 </div>

//                 <Helmet>
//                     <script type="text/javascript" src="./app.js"></script>
//                 </Helmet>
                

//         </>
//     );
// }