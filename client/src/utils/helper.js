export const validateEmail = (email) => {
  if (!email.trim()) return "Email is required";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Enter valid email address";
  return "";
};

export const validatePassword = (password) => {
  if (!password) return "Password is required";
  if (password.length < 8) return "password must be atleast 8 characters";
  if (!/(?=.*[a-z])/.test(password))
    return "password must contain at least one lowercase letter";

  if (!/(?=.*[A-Z])/.test(password))
    return "password must contain at least one uppercase letter";

  if (!/(?=.*\d)/.test(password))
    return "password must contain at least one number";

  return "";
};

export const validateAvatar = (file) => {
  if (!file) return "";
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (!allowedTypes.includes(file.type)) {
    return "Avatar must be a JPG or a PNG file";
  }
  const maxsize = 5 * 1024 * 1024; /* 5MB size */
  if (file.size > maxsize) {
    return "Avatar must be less than 5MB.";
  }
  return "";
};

export const getInitials = (name) => {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
};
