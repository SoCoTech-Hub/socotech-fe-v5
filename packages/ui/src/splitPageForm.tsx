import { ChevronLeft } from "lucide-react";

import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Input } from "./input";
import { Label } from "./label";
import { Textarea } from "./textarea";

interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "password" | "textarea";
  required?: boolean;
}

interface SplitPageFormProps {
  imageUrl: string;
  imageAlt: string;
  formTitle: string;
  fields: FormField[];
  onSubmit: (formData: Record<string, string>) => void;
  imageSide?: "left" | "right";
}

export default function SplitPageForm({
  imageUrl,
  imageAlt,
  formTitle,
  fields,
  onSubmit,
  imageSide = "left",
}: SplitPageFormProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: Record<string, string> = {};
    fields.forEach((field) => {
      data[field.name] = formData.get(field.name) as string;
    });
    onSubmit(data);
  };

  const renderField = (field: FormField) => {
    const commonProps = {
      id: field.name,
      name: field.name,
      required: field.required,
      className: "w-full",
    };

    switch (field.type) {
      case "textarea":
        return <Textarea {...commonProps} />;
      default:
        return <Input {...commonProps} type={field.type} />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Top Navbar */}
      <nav className="bg-gray-100 p-4">
        <Button
          variant="ghost"
          onClick={() => history.back()}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </nav>

      {/* Main Content */}
      <div className="flex flex-grow flex-col md:flex-row">
        {/* Image Section */}
        <div
          className={`w-full md:w-1/2 ${imageSide === "right" ? "md:order-last" : ""}`}
        >
          <img
            src={imageUrl}
            alt={imageAlt}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="flex w-full items-center justify-center p-8 md:w-1/2">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>{formTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {fields.map((field) => (
                  <div key={field.name} className="space-y-2">
                    <Label htmlFor={field.name}>{field.label}</Label>
                    {renderField(field)}
                  </div>
                ))}
                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
