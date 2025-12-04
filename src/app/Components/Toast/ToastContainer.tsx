import { Toast } from "./Toast";
import type { ToastHandle, ToastItem } from "./types";

type ToastContainerProps = {
  toastList: ToastItem[];
  toastRefs: React.RefObject<Record<string, ToastHandle | null>>;
  handleCloseToast: (id: ToastItem["id"]) => void;
  handleMouseEnter: (id: ToastItem["id"]) => void;
  handleMouseLeave: (id: ToastItem["id"]) => void;
};

export function ToastContainer({
  toastList,
  toastRefs,
  handleCloseToast,
  handleMouseEnter,
  handleMouseLeave,
}: ToastContainerProps) {
  return (
    <div className="absolute bottom-4 right-4 flex flex-col gap-4">
      {toastList.map((toast) => {
        return (
          <Toast
            key={toast.id}
            toast={toast}
            handleClose={handleCloseToast}
            ref={(el) => {
              if (el) {
                if(!toastRefs.current[toast.id]){
                  toastRefs.current[toast.id] = el;
                  el.start();
                }
              }
            }}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
          >
          </Toast>
        );
      })}
    </div>
  );
}
