import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@acme/ui/card';
import { Dropzone } from '@acme/ui/dropzone';
import { Toast } from "../toast";



import { Button } from "../button";
import { Input } from "../input";
import { Label } from "../label";
import MainMenu from "../MainMenu";
import { Textarea } from "../textarea";


;




















































































type formField = {
  label: string;
  placeholder: string;
  id: string;
  value?: string;
  type?: string;
  textArea?: boolean;
};

type Button = {
  label: string;
  type?: "button" | "reset" | "submit";
  onClick: () => {};
};

interface PageProps {
  imageOnLeft?: boolean;
  imageSrc?: string;
  imageAlt?: string;
  formFields: formField[];
  buttonList: Button[];
}

export default function Page(props: PageProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <MainMenu />

      <main className="flex flex-grow">
        <div
          className={`flex w-full flex-col ${props.imageOnLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
        >
          <div className="relative h-[50vh] w-full md:h-auto md:w-1/2">
            <img
              src={props.imageSrc || "/placeholder.svg?height=1080&width=1080"}
              alt={props.imageAlt || "Placeholder"}
              className="absolute inset-0 object-cover w-full h-full"
            />
          </div>
          <div className="flex items-center justify-center w-full p-8 bg-background md:w-1/2">
            <form className="w-full max-w-md space-y-4">
              {props.formFields?.map((x, i) => (
                <div key={`field-${i}`}>
                  <Label htmlFor={x.id}>{x.label}</Label>
                  {x.textArea ? (
                    <Textarea
                      id={x.id}
                      placeholder={x.placeholder}
                      value={x.value}
                    />
                  ) : (
                    <Input
                      id={x.id}
                      placeholder={x.placeholder}
                      value={x.value}
                      type={x.type}
                    />
                  )}
                </div>
              ))}
              <div className="flex">
                {props.buttonList?.map((x, i) => (
                  <Button
                    key={`button-${i}`}
                    type={x.type}
                    className="w-full"
                    onClick={x.onClick}
                  >
                    {x.label}
                  </Button>
                ))}
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

// USE:
/*
import Page from '@acme/ui/Page'

...

...
*/

"use client";
import Page from '../Page'
export default function PageName() {
  return (
    <Page imageOnLeft={true} imageSrc='/placeholder.svg?height=1080&width=1080' imageAlt='Placeholder' formFields={[
      {
        label=''
  placeholder=''
  id=''
  value=''
  type=''
  textArea={false}}]} buttonList={[label: string;
  type?: "button" | "reset" | "submit";
  onClick: () => {};]} />
  );
}