export const theme = {
  success: {
    icon: {
      src: "/icons/alert/check.svg",
      alt: "Success"
    },
    iconBg: "#f0fdf4",        // bg-green-50
  },

  error: {
    icon: {
      src: "/icons/alert/alert.svg",
      alt: "Error"
    },
    iconBg: "#fef2f2",        // bg-red-50
  },

  info: {
    icon: {
      src: "/icons/alert/info.svg",
      alt: "Info"
    },
    iconBg: "#eff6ff",        // bg-blue-50
  }
} as const;
