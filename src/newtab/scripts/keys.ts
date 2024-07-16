// ui
import { Config } from "src/newtab/scripts/config";
import { bookmarkSearchInputEl, bookmarkSearchSectionEl, searchInputEl } from "./ui";

// utils
import { focusSearch, search, tryFocusSearch, unfocusSearch } from "./utils/search";
import {
  enableSearchBookmark,
  disableSearchBookmark,
  refreshBookmarkSearchResults
} from "src/newtab/scripts/utils/search-bookmark";
import {
  focusBookmarkSearch,
  tryFocusBookmarkSearch,
  unfocusBookmarkSearch
} from "src/newtab/scripts/utils/bookmark-search";
// import { navigateTab } from "src/newtab/scripts/utils/navigate-tab";

export const listenToKeys = (config: Config) => {
  document.addEventListener("keydown", (e) => {
    if (!config.hotkeys.enabled) return;

    // keybinds stuff

    // search
    if (e.key === "Escape") unfocusSearch();
    const searchFocused = document.activeElement === searchInputEl;
    const bookmarkSearchFocused = document.activeElement === bookmarkSearchInputEl;

    if (e.key === config.hotkeys.activationKey) {
      if (bookmarkSearchSectionEl.classList.contains("grid")) {
        tryFocusBookmarkSearch(config, e);
      } else {
        tryFocusSearch(config, e);
      }
    }
    if (e.key === config.hotkeys.closePageKey && !searchFocused) window.close();

    // bookmarks stuff
    if (config.bookmarks.type === "user-defined") {
      // if search bookmark is on already (grid)
      if (bookmarkSearchSectionEl.classList.contains("grid")) {
        if (e.key === "Escape") {
          unfocusBookmarkSearch(config.animations.type);
          disableSearchBookmark();
          bookmarkSearchInputEl.value = "";
        }
      }

      if (
        e.key === "b" &&
        !searchFocused &&
        !bookmarkSearchFocused &&
        !bookmarkSearchSectionEl.classList.contains("grid")
      ) {
        enableSearchBookmark(config.bookmarks.userDefined);
        tryFocusBookmarkSearch(config, e);
      }
    }

    // nav stuff
    // if (e.key === "J") navigateTab("left");
    // if (e.key === "K") navigateTab("right");
  });

  searchInputEl.addEventListener("blur", () => unfocusSearch());

  searchInputEl.addEventListener("focus", (e) => focusSearch(config, e));

  searchInputEl.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      // open in new tab if ctrl
      if (e.ctrlKey) {
        search(config, searchInputEl.value, true);
        return;
      }

      search(config, searchInputEl.value);
    }
  });

  searchInputEl.addEventListener("input", () => {
    if (!config.title.dynamic.enabled) return;

    // not empty or just spaces
    if (searchInputEl.value !== "" && !/^\s*$/.test(searchInputEl.value))
      document.title = searchInputEl.value;
    else document.title = config.title.defaultTitle;
  });

  bookmarkSearchInputEl.addEventListener("blur", () =>
    unfocusBookmarkSearch(config.animations.type)
  );

  bookmarkSearchInputEl.addEventListener("focus", (e) => focusBookmarkSearch(config, e));

  bookmarkSearchInputEl.addEventListener("keyup", (e) => {
    refreshBookmarkSearchResults(config.bookmarks.userDefined);

    if (e.key === "Enter") {
      e.preventDefault();
    }
  });
};
