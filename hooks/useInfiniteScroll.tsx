import { useState, useEffect } from "react";

const SCROLL_THRESHOLD = 200;

function useInfiniteScroll(extraCondition: boolean): boolean {
  const [shouldFetchMore, setShouldFetchMore] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolledToBottom =
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - SCROLL_THRESHOLD;

      // Only allow fetching if extraCondition is true
      if (scrolledToBottom && extraCondition) {
        setShouldFetchMore(true);
      } else {
        setShouldFetchMore(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [extraCondition]);

  return shouldFetchMore;
}

export default useInfiniteScroll;
