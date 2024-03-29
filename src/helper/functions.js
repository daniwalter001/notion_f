const toAvatar = (s = "") => {
  let sToArray = s.split(" ");

  return (sToArray.length > 2 ? sToArray.slice(0, 2) : sToArray)
    .map((el) => el?.at(0)?.toUpperCase() ?? "")
    .join("");
};

let requestHasFailed = (res) =>
  res?.error ||
  res?.data?.error ||
  res?.data?.status === "failed" ||
  res?.status === "failed";

export { toAvatar, requestHasFailed };
