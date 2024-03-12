// Config
import { getConfig } from "./config";

// Utils
import { setCustomMessage, setMorningAfternoonMessage, setTimeMessage } from "./utils/set-message";
import { setTitle } from "./utils/set-title";

// Key Events
import { listenToKeys } from "./keys";
import { renderBookmarks } from "./utils/render-bookmarks";
import { addAnimations } from "./utils/animations";
import { loadWallpaper } from "src/newtab/scripts/utils/load-wallpaper";

// ******************************************************************
// initial page load logic start
getConfig(({ config }) => {
  setTitle(config.title);

  loadWallpaper(config);

  // setCustomMessage(`Hello, ${config.user.name}`);
  setMorningAfternoonMessage(config.user.name);
  // setTimeMessage("12hr");

  renderBookmarks(config);

  addAnimations(config.animations);

  listenToKeys(config);
});
// initial page load logic end
// ******************************************************************
