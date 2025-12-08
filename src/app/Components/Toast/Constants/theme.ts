export const theme = {
  success: {
    icon: {
      src: "/icons/alert/check.svg",
      alt: "Success",
      bgColor: "#cff9e1", // light mint, clearly visible, not bright
    },
    borderColor: "#86efac",
    progressColor: "#16a34a",
  },

  error: {
    icon: {
      src: "/icons/alert/alert.svg",
      alt: "Error",
      bgColor: "#fbd4d4", // soft red, visible but not bright
    },
    borderColor: "#fca5a5",
    progressColor: "#dc2626",
  },

  info: {
    icon: {
      src: "/icons/alert/info.svg",
      alt: "Info",
      bgColor: "#cddffe", // soft blue, light but readable
    },
    borderColor: "#93c5fd",
    progressColor: "#2563eb",
  },

  warning: {
    icon: {
      src: "/icons/alert/triangle-alert.svg",
      alt: "Warning",
      bgColor: "#fbedab", // soft yellow, mild but visible
    },
    borderColor: "#fde047",
    progressColor: "#ca8a04",
  },
} as const;
