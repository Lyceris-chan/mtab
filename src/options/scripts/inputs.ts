import { oconfig } from "src/options/scripts/oconfig";
import { buttonSwitches, hotkeyInputs, inputs } from "./ui";
import { switchButtons } from "src/options/scripts/utils/switch-buttons";

import {
  searchEngineDuckduckgoButtonEl,
  searchEngineGoogleButtonEl,
  searchEngineBingButtonEl,
  searchEngineBraveButtonEl,
  searchEngineYahooButtonEl,
  searchEngineYandexButtonEl,
  searchEngineStartpageButtonEl,
  searchEngineEcosiaButtonEl,
  searchUseCustomEngineEnabledCheckboxEl
} from "src/options/scripts/ui";
import { listenToHotkeyInputs } from "src/options/scripts/utils/hotkey-inputs";
import { saveConfig } from "src/options/scripts/utils/save-config";
import { exportConfig } from "src/options/scripts/utils/export-config";
import { importConfig } from "src/options/scripts/utils/import-config";
import { setDefaultConfig } from "src/options/scripts/utils/set-default-config";

export const listenToInputs = () => {
  inputs.forEach((input) => {
    input.input.addEventListener("blur", () =>
      unfocusInput({
        container: input.container,
        input: input.input,
        borderClassOld: oconfig.inputBorderClass,
        borderClassNew: "border-transparent"
      })
    );

    input.input.addEventListener("focus", (e) =>
      focusInput({
        container: input.container,
        input: input.input,
        borderClassOld: "border-transparent",
        borderClassNew: oconfig.inputBorderClass,
        e
      })
    );
  });

  buttonSwitches.forEach((btnSwitch) => {
    switchButtons(btnSwitch.buttons, btnSwitch.attr);
  });

  listenToHotkeyInputs(hotkeyInputs);

  //Special case for using a custom search engine
  // if custom search engine is enabled, then disable it
  const arrayOfSearchEngines = [
    searchEngineDuckduckgoButtonEl,
    searchEngineGoogleButtonEl,
    searchEngineBingButtonEl,
    searchEngineBraveButtonEl,
    searchEngineYahooButtonEl,
    searchEngineYandexButtonEl,
    searchEngineStartpageButtonEl,
    searchEngineEcosiaButtonEl
  ];

  arrayOfSearchEngines.forEach((searchEngine) => {
    searchEngine.addEventListener("click", () => {
      if (searchUseCustomEngineEnabledCheckboxEl.checked) {
        searchUseCustomEngineEnabledCheckboxEl.click();
      }
    });
  });

  const saveBtn = document.getElementById("save-button") as HTMLButtonElement;
  saveBtn.onclick = () => {
    saveConfig();
  };

  const exportBtn = document.getElementById("export-button") as HTMLButtonElement;
  exportBtn.onclick = () => {
    saveConfig();
    exportConfig();
  };

  const importBtn = document.getElementById("import-button") as HTMLButtonElement;
  importBtn.onclick = () => {
    importConfig();
  };

  const resetToDefaultBtn = document.getElementById("reset-to-default-button") as HTMLButtonElement;
  resetToDefaultBtn.onclick = () => {
    setDefaultConfig();
  };
};

export const unfocusInput = ({
  container,
  input,
  borderClassOld,
  borderClassNew
}: {
  container: HTMLDivElement;
  input: HTMLInputElement;
  borderClassOld: string;
  borderClassNew: string;
}) => {
  input.blur();

  container.classList.replace(borderClassOld, borderClassNew);
};

export const focusInput = ({
  container,
  input,
  borderClassOld,
  borderClassNew,
  e
}: {
  container: HTMLDivElement;
  input: HTMLInputElement;
  borderClassOld: string;
  borderClassNew: string;
  e: Event;
}) => {
  container.classList.replace(borderClassOld, borderClassNew);

  input.focus();
  e.preventDefault();
};
