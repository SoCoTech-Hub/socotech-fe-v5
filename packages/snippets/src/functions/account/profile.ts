"use server";

import { api } from "../../api/api";
import { profileId } from "../../context";
import { GET_PROFILE, runQuery } from "../../graphql";

// const cancelSub = async () => {
//   const date = new Date();
//   if (transactions[0].signature) {
//     await pauseSubscription(transactions[0].signature, org);
//   }
//   await api.put(`/profiles/${profileId}`, {
//     cancelDate: date.toISOString().split("T")[0],
//   });
//   setIsOpen(false);
//   setProfile({ ...profile, cancelDate: date.toISOString().split("T")[0] });
// };

// const unCancelSub = async () => {
//   if (transactions[0].signature) {
//     await unpauseSubscription(transactions[0].signature, org);
//   }
//   await api.put(`/profiles/${profileId}`, {
//     cancelDate: null,
//   });
//   setIsOpen(false);
//   setProfile({ ...profile, cancelDate: "" });
// };
export const FetchProfile = async (id: string) => {
  return await runQuery<{
    profile: {
      id: string;
      cancelDate: string;
      isPaying: boolean;
      isPayingDate: string;
    };
  }>(GET_PROFILE, { id });
};
//TODO: complete these functions

export const UpdateImages = async ({
  updatedImages,
}: {
  updatedImages: { avatarImage?: string; bannerImage?: string };
}) => {
  if (updatedImages.avatarImage) {
    await api.PUT(`/profile/${profileId}`, { avatar: updatedImages });
  }
  if (updatedImages.bannerImage) {
    await api.PUT(`/profile/${profileId}`, {
      banner: updatedImages.bannerImage,
    });
  }

  return;
};
export const UploadImages = async (e: File) => {
  const res = await api.POST("/uploads", e);
  return res.data.id;
};

export const replaceImage = async ({
  oldUrl,
  newFile,
}: {
  oldUrl: string;
  newFile: File;
}) => {
  const foundUploads = await api.GET(`/uploads?url=${oldUrl}`);
  await api.DELETE(`/uploads/${foundUploads.data[0].id}`);
  const result = await api.POST("/uploads", newFile);
  return result.data;
};

export const DeleteProfile = async () => {
  return;
};
export const DeactivateProfile = async () => {
  return;
};
