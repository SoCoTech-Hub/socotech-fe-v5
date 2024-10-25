import DigilibHelp from "@/components/DigilibHelp";
import { baseUrl } from "@/context/constants";

const index = () => (
  <div className="bg-digilibWelcome shadow-menu rounded-lg px-4 py-4">
    <div className="row">
      <div className="col flex justify-self-center py-3">
        <img
          src={`${baseUrl}/digilib_welcome.png`}
          alt="Welcome Image"
          className="object-contain"
        />
      </div>
      <div className="col">
        <div className="pr-3">
          <div className="banner-main-text pt-3">
            Hello, how can we help you?
          </div>
          <div className="pr-6 pt-3">
            <p className="banner-subtext break-words">
              Tell us what you are looking for in the search bar below, select a
              category and we will find what your looking for or select a folder
              below.
            </p>
          </div>
          <DigilibHelp />
        </div>
      </div>
    </div>
  </div>
);

export default index;
