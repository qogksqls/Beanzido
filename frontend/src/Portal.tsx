import reactDom from "react-dom";

type PortalProp = {
  children: React.ReactNode;
};

const ModalPortal = ({ children }: PortalProp) => {
  return reactDom.createPortal(
    children,
    document.getElementById("modal") as HTMLElement
  );
};

export default ModalPortal;
