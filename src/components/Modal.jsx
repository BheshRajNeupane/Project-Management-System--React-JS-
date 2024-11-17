import { createPortal } from "react-dom";
import { forwardRef, useImperativeHandle } from "react";
import { useRef } from "react";
import Button from "./Button.jsx";
// export default function Modal({children}){
//     return createPortal(<dialog>
//         {children}
//     </dialog> ,
//      document.getElementById('modal-root')
//     )

// }

const Modal = forwardRef(function Modal({ children, buttonCaption }, ref) {
  const dialog = useRef();
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });
  return createPortal(
    <dialog
      ref={dialog}
      className="backdrop:bg-stone-900/90  p-4  rounded-md  shadow-md "
    >
      {children}
      <form method="dialog" className="mt-4 text-right ">
        <Button>{buttonCaption}</Button>
      </form>
    </dialog>,
    document.getElementById("modal-root")
  );
});

//render on -->      document.getElementById('modal-root')
// to expose a function of components to call from outside use--> useImperativeHandle()
export default Modal;
