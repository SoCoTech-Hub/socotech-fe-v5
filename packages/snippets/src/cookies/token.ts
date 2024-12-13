import CreateCookie from "./createCookie";
import DeleteCookie from "./deleteCookie";
import GetCookie from "./getCookie";

export const GetToken = () => {
  return GetCookie({ key: "token" });
};

export const DeleteToken = () => {
  return DeleteCookie({ key: "token" });
};

export interface SetTokenProps {
  jwt: string;
  time?: string;
}
export const SetToken = ({ jwt, time }: SetTokenProps) => {
  return CreateCookie({ key: "token", value: jwt, time: time });
};
