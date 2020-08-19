import { toast } from "react-toastify";

export function handleRequestError(error, message = "Erro interno") {
  try {
    return toast.error(error.response.data.error);
  } catch (error) {
    return toast.error(message);
  }
}
