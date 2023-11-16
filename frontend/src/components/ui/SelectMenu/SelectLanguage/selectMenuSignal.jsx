import { signal, effect } from "@preact/signals-react";

const LOCAL_STORAGE_KEY = "MENU";

export const selectedCourseSignal = signal(
  getKeyFromLocalStorage(LOCAL_STORAGE_KEY)
);

effect(() => {
  localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify(selectedCourseSignal.value)
  );
});

function getKeyFromLocalStorage(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (e) {
    return null;
  }
}
