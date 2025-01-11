interface HandleResizeProps {
  setMobile: (isMobile: boolean) => void;
}

const HandleResize = ({ setMobile }: HandleResizeProps): void => {
  setMobile(window.innerWidth <= 1067);
};

export default HandleResize;
