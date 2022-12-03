export const getInitials = (name?: string | null) => {
  if (typeof name === "undefined" || name === null) {
    return "";
  }
  const words = name.split(" ");
  let initials = "";

  if (words.length === 2) {
    initials = `${words[0]?.substring(0, 1).toUpperCase()}`;
  } else if (words.length === 1) {
    initials = `${words[0]?.substring(0, 2).toUpperCase()}`;
  }
  return initials;
};
