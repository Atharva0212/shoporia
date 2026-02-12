import { getSessionItem, removeSessionItem, setSessionItem } from "@/src/utils/sessionStorage";

const LISTING_NAV_TRIGGER_KEY = "listingNavTrigger";

type ListingNavContext = {
  triggerInitialFetch: true;
};


export function setListingNavTrigger() {
  setSessionItem<ListingNavContext>(LISTING_NAV_TRIGGER_KEY, {
    triggerInitialFetch: true,
  });
}

export function consumeListingNavTrigger() {
  const ctx = getSessionItem<ListingNavContext>(LISTING_NAV_TRIGGER_KEY);
  if (ctx) {
    removeSessionItem(LISTING_NAV_TRIGGER_KEY);
  }
  return ctx;
}
