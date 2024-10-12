import { ref, computed } from "vue";
import { defineStore } from "pinia";

const key = "theme";
type themeT = "light" | "dark";

export const useThemeStore = defineStore(key, () => {
  let localTheme: themeT = (localStorage.getItem(key) as themeT) || "light";
  if (!/^(light|dark)$/.test(localTheme)) {
    localTheme = "light";
  }
  let theme = ref<themeT>(localTheme);

  /**
   * 设置主题
   * @param v
   */
  function setTheme(v: themeT) {
    theme.value = v;
    localStorage.setItem(key, v);
  }
  return { theme, setTheme };
});
