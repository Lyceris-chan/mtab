import { defaultConfig } from "src/newtab/scripts/config";
import { fillInputs } from "src/options/scripts/utils/fill-inputs";
import { saveConfig } from "src/options/scripts/utils/save-config";

export const setDefaultConfig = () => {
  const confirmReset = window.confirm("do you want to reset your options to default?");

  if (confirmReset) {
    const clonedDefaultConfig = structuredClone(defaultConfig);
    console.log("[RESET_DEBUG]", clonedDefaultConfig);
    fillInputs(clonedDefaultConfig);
    saveConfig(false);
    alert("options reset to default");
  } else {
    alert("you selected no, options did not reset");
  }
};
