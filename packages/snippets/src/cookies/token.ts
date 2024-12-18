import CreateCookie from "./createCookie";
import DeleteCookie from "./deleteCookie";
import GetCookie from "./getCookie";

export const GetToken = () => {
  try {
    const token = GetCookie({ key: "token" });
    return token;
  } catch {
    return;
  }
};

export const DeleteToken = () => {
  try {
    return DeleteCookie({ key: "token" });
  } catch {
    return;
  }
};

export interface SetTokenProps {
  jwt: string;
  time?: string;
}
export const SetToken = ({ jwt, time }: SetTokenProps) => {
  try {
    return CreateCookie({ key: "token", value: jwt, time: time });
  } catch {
    return;
  }
};
