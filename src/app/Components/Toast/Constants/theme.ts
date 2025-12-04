export const theme = {
  success: {
    icon: {
      src: "/icons/alert/check.svg",
      alt: "Success",
      bgColor: "#f0fdf4",
    },
    borderColor: "#bbf7d0",
    progressColor: "#16a34a",
  },
  error: {
    icon: {
      src: "/icons/alert/alert.svg",
      alt: "Error",
      bgColor: "#fef2f2",
    },
    borderColor: "#fecaca",
    progressColor: "#dc2626",
  },
  info: {
    icon: {
      src: "/icons/alert/info.svg",
      alt: "Info",
      bgColor: "#eff6ff",
    },
    borderColor: "#bfdbfe",
    progressColor: "#2563eb",
  },
  warning: {
    icon: {
      src: "/icons/alert/triangle-alert.svg",
      alt: "Warning",
      bgColor: "#fefce8",
    },
    borderColor: "#fef08a",
    progressColor: "#ca8a04",
  },
} as const;
