export const getFullName = user => {
  let fullname = '';
  if (user && user.user_last_name) {
    fullname = `${user.user_first_name} ${user.user_last_name}`;
  }
  return fullname.trim();
};