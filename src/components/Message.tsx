// import { useState, useEffect } from "react";

// const Message = () => {
//   const [messages, setMessages] = useState([]);
//   const [messageText, setMessageText] = useState("");

//   useEffect(() => {
//     // Fetch initial messages
//     fetchMessages();
//   }, []);

//   const fetchMessages = () => {
//     // Fetch messages from API
//     // ...
//   };

//   const sendMessage = (e) => {
//     e.preventDefault();

//     // Send message to API
//     // ...

//     // Clear message input
//     setMessageText("");
//   };

//   return (
//     <div className="container">
//       <div className="row mb-12">
//         <div className="col-md-8">
//           <div className="p-5 mb-5 rounded" style={{ background: "#fff" }}>
//             <div className="overflow-scroll p-2 text-center" style={{ height: "400px" }}>
//               <img src="https://alakave.com/image/loader.svg" id="loader_image" className="hide_loader" />
//               <div className="chat_content">
//                 {messages.map((message) => (
//                   <div key={message.id} className="d-flex flex-row justify-content-start">
//                     <img src={message.sender.profile_image} className="avatar-xs rounded-circle ms-3" />
//                     <div>
//                       <p className="small p-2 ms-3 mb-1 rounded-3 bg-white" style={{ background: "#f5f6f7" }}>{message.text}</p>
//                       <p className="small ms-3 mb-3 rounded-3 text-muted text-end">{message.created_at}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="text-muted d-flex align-items-center pt-3">
//               <form className="search-form flex-grow-1 me-2 d-flex" method="post" id="chat_form_submit" enctype="multipart/form-data" onSubmit={sendMessage}>
//                 <div className="input-group">
//                   <input type="file" id="imgupload" name="imgupload" onChange={sendFileMessage} style={{ display: "none" }} />
//                   <input type="hidden" id="action" name="action" value="chat_form_submit" />
//                   <input type="hidden" name="item_id" id="item_id" value="50" />
//                   <input type="hidden" name="chat_id" id="chat_id" value="18" />
//                   <input type="hidden" name="offer_amount" value="0" />
//                   <input type="hidden" name="receiver_id" id="receiver_id" value="33" />
//                   <input type="hidden" name="sender_id" id="sender_id" value="104" />
//                   <input type="text" className="form-control rounded-pill" name="message_text" id="chatMessgeText" autocomplete="off" placeholder="Tapez un message" value={messageText} onChange={(e) => setMessageText(e.target.value)} />
//                 </div>
//                 <div>
//                   <button type="submit" className="btn btn-primary btn-icon rounded-circle submit_btn">
//                     <img src="https://alakave.com/assets/images/icons/paper-plane.png" width="20px" alt="" />
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//         <div className="col-md-4">
//           <div className="card">
//             <div className="card-body">
//               <div className="">
//                 <h3 className="mb-5">Chateau Petrus </h3>
//                 <h3 className="mb-5">40000€</h3>
//                 <a href="https://alakave.com/product/chateau-petrus" target="_blank" className="btn btn-primary w-100 mb-2">
//                   See
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Message;