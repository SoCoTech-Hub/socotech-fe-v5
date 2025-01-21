"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Camera, Pencil } from "lucide-react";

// import { uploadImage } from "@acme/snippets/posts/user";

import { Button } from "../button";
import { PopupAlert } from "../PopupAlert";

interface CoverProps {
  name?: string;
  bannerImage?: string;
  avatarImage?: string;
  user?: { id?: string; profile: { id?: string } };
  updateImages?: ({
    updatedImages,
  }: {
    updatedImages: { avatarImage?: string; bannerImage?: string };
  }) => void;
  uploadImage?: (e: File) => string;
}
export function Cover(props: CoverProps) {
  const [bannerImage, setBannerImage] = useState(
    props.bannerImage || "https://placehold.co/100",
  );
  console.log({ bannerImage });
  const [avatarImage, setAvatarImage] = useState(
    props.avatarImage || "https://placehold.co/100",
  );

  const bannerInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState<"default" | "success" | "destructive">(
    "default",
  );
  const [visible, setVisible] = useState(false);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<string>>,
    uploadType: "profilePic" | "banner",
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please upload a valid image file.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB. Please upload a smaller image.");
        return;
      }

      try {
        // Display a preview while uploading
        const reader = new FileReader();
        reader.onload = (e) => setImage(e.target?.result as string);
        reader.readAsDataURL(file);

        const updatedImages = props.uploadImage?.(file);
        props.updateImages?.({
          updatedImages:
            uploadType === "profilePic"
              ? { avatarImage: updatedImages }
              : { bannerImage: updatedImages },
        });
        setMessage(
          `${uploadType === "profilePic" ? "Profile picture" : "Banner"} uploaded successfully!`,
        );
        setVariant("success");
      } catch (error) {
        console.error("Error uploading image:", error);
        setMessage("Failed to upload the image. Please try again.");
        setVariant("destructive");
      }
      setVisible(true);
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl">
      <PopupAlert
        message={message}
        variant={variant}
        visible={visible}
        onClose={() => setVisible(false)}
      />
      <div className="relative">
        {/* Banner */}
        <div className="h-60 overflow-hidden rounded-t-xl">
          <Image
            src={bannerImage}
            alt="Profile Banner"
            width={1000}
            height={300}
            className="h-full w-full object-cover"
          />
        </div>
        <Button
          onClick={() => bannerInputRef.current?.click()}
          className="absolute right-4 top-4 bg-gray-700/80 hover:bg-gray-700/90"
          aria-label="Edit banner image"
        >
          <Pencil className="mr-2 h-4 w-4" />
          Edit Banner
        </Button>
        <input
          ref={bannerInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e, setBannerImage, "banner")}
          className="hidden"
          aria-label="Upload banner image"
        />

        {/* Avatar */}
        <div className="absolute bottom-0 left-8 flex translate-y-1/2 transform items-center">
          <div className="relative">
            <div className="h-40 w-40">
              <Image
                src={avatarImage}
                alt="Avatar"
                width={150}
                height={150}
                className="h-full w-full rounded-full border-4 border-white object-cover"
              />
              <Button
                onClick={() => avatarInputRef.current?.click()}
                className="absolute bottom-2 right-2 rounded-full px-3 py-2"
                aria-label="Edit avatar image"
              >
                <Camera className="h-4 w-4" />
                <span className="sr-only">Update avatar</span>
              </Button>
              <input
                ref={avatarInputRef}
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleImageUpload(e, setAvatarImage, "profilePic")
                }
                className="hidden"
                aria-label="Upload avatar image"
              />
            </div>
          </div>
          {/* User Name */}
          <h1 className="ml-4 mt-6 text-2xl font-bold text-primaryForeground drop-shadow-lg">
            {props.name}
          </h1>
        </div>
      </div>
    </div>
  );
}
