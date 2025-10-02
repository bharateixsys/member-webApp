import { toast } from "react-toastify";

const ToastService = {
  success: (msg, options = {}) => toast.success(msg, options),
  error: (msg, options = {}) => toast.error(msg, options),
  info: (msg, options = {}) => toast.info(msg, options),
  warn: (msg, options = {}) => toast.warn(msg, options),
};

export default ToastService;
