import { CreateCookie, DeleteCookie, GetCookie } from "./crudCookie";

export const GetToken = () => {
  try {
    const token = GetCookie({ key: "token" });
    return token;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const DeleteToken = () => {
  try {
    return DeleteCookie({ key: "token" });
  } catch (error) {
    console.log(error);
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
  } catch (error) {
    console.log(error);
    return;
  }
};
