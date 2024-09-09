// import { useEffect, useCallback } from "react";
// import { createPortal } from "react-dom";
// import Icons from "../Icons/Iсons.jsx";
// import css from "./BasicModalWindow.module.css";

// export const BasicModalWindow = ({ onOpen, children, title, onClose }) => {
//   const modalWindowRoot = document.querySelector("#modal-root");

//   const handleClose = useCallback(() => {
//     onClose();
//   }, [onClose]);

//   useEffect(() => {
//     const handleEscape = (e) => {
//       if (e.code === "Escape") {
//         handleClose();
//       }
//     };

//     if (onOpen) {
//       document.body.style.overflow = "hidden";
//       window.addEventListener("keydown", handleEscape);
//     }

//     return () => {
//       document.body.style.overflow = "auto";
//       window.removeEventListener("keydown", handleEscape);
//     };
//   }, [onOpen, handleClose]);

//   if (!onOpen) {
//     return null;
//   }

//   const ModalContentWindow = (
//     <div className={css.modalBox} onClick={handleClose}>
//       <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
//         <div className={css.modalHeader}>
//           <h2>{title}</h2>
//           <div className={css.offBtn} onClick={handleClose}>
//             <Icons id='x-mark' width={24} height={24} className='icon-blue' />
//           </div>
//         </div>
//         {children}
//       </div>
//     </div>
//   );

//   return createPortal(ModalContentWindow, modalWindowRoot);
// };
