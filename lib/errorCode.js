export const getErrorMessage = (e) => {
  return e.code === "P2002" ? "This name has already used":e.code?.split("")?.includes("P")?e.message?.split("\n")[e.message?.split("\n").length-1] : e.message;
};
