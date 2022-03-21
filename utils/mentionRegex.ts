export const mentionRegex = (nicknameList: string[]) => {
  const pattern = "(@" + nicknameList.join("|@") + ")";
  return new RegExp(pattern, "g");
};
