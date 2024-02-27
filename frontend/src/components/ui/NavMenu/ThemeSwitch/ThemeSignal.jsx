import { signal, effect } from "@preact/signals-react";

const LOCAL_STORAGE_KEY = "themeMode";

export const selectedThemeSignal = signal(
  getKeyFromLocalStorage(LOCAL_STORAGE_KEY)
);

effect(() => {
  localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify(selectedThemeSignal.value)
  );
});

function getKeyFromLocalStorage(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (e) {
    return "light";
  }
}
