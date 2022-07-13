import { toast } from 'react-toastify';

export const createToast = (message, variant = 'info') =>
  toast[variant](message, {
    position: 'bottom-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
