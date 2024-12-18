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
