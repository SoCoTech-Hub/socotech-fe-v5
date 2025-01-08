 const GetPassPhrase = (): string | null => {
  return process.env.NEXT_PUBLIC_TEST === "true"
    ? "1234567891212"
    : "VzVT6yHrGSRmfEWZj2m9";
};
export default GetPassPhrase