import { toast } from "react-toastify";

const options = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
  toastId: "custom-toast-id",
};

export const loading = (message) => {
  return toast.loading(message, options);
};

export const isSuccess = (message) => {
  toast.update("custom-toast-id", {
    render: message,
    type: toast.TYPE.SUCCESS,
    autoClose: 3000,
    isLoading: false,
  });
};

export const isError = (message) => {
  toast.update("custom-toast-id", {
    render: message,
    type: toast.TYPE.ERROR,
    autoClose: 3000,
    isLoading: false,
  });
};
