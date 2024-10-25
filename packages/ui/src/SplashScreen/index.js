const { baseUrl } = require("@/context/constants");

const SplashScreen = () => {
  return (
    <div
      id="splashScreen"
      className="bg-appBg flex h-screen items-center justify-center"
    >
      <img src={`${baseUrl}/animations/loading.gif`} className="w-11/12" />
    </div>
  );
};
export default SplashScreen;
