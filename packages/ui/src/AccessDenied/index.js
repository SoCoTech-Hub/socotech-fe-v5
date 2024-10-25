import useRouter from "next/router";

const AccessDenied = () => {
  const router = useRouter();

  return (
    <div className="w-30 px-1">
      <h1>Access Denied</h1>
      <a
        className={`text-textColor rounded-full px-3 py-2 text-center`}
        href={router.back()}
      >
        Return
      </a>
    </div>
  );
};
export default AccessDenied;
