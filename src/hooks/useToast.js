import * as primeToast from "primevue/usetoast";

function useToast() {
  const toast = primeToast.useToast();

  const showSuccessToast = (detail, title = "Success", life = 2000) => {
    toast.add({
      severity: "success",
      summary: title,
      detail: detail,
      // group: "tr",
      life,
    });
  };

  const showInfoToast = (detail, title = "Info", life = 2000) => {
    toast.add({
      severity: "info",
      summary: title,
      detail: detail,
      // group: "tr",
      life,
    });
  };

  const showErrorToast = (detail, title = "Error", life = 2000) => {
    toast.add({
      severity: "error",
      summary: title,
      detail: detail,
      // group: "tr",
      life,
    });
  };
  return { showSuccessToast, showErrorToast, showInfoToast };
}

export default useToast;
