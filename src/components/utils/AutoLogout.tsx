import { useEffect } from "react";

interface AutoLogoutProps {
  inactivityLimit: number;
}

function AutoLogout({ inactivityLimit }: AutoLogoutProps) {
  const LAST_INTERACTION_KEY = "lastInteractionTime";

  useEffect(() => {
    function updateLastInteractionTime() {
      localStorage.setItem(LAST_INTERACTION_KEY, Date.now().toString());
    }

    function checkInactivity() {
      const lastInteraction = localStorage.getItem(LAST_INTERACTION_KEY);
      if (
        lastInteraction &&
        Date.now() - parseInt(lastInteraction, 10) > inactivityLimit
      ) {
        localStorage.clear();
        window.location.href = "/";
      }
    }

    updateLastInteractionTime();
    window.addEventListener("click", updateLastInteractionTime);
    window.addEventListener("mousemove", updateLastInteractionTime);
    window.addEventListener("scroll", updateLastInteractionTime);
    window.addEventListener("keydown", updateLastInteractionTime);

    const intervalId = setInterval(checkInactivity, 60000);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("click", updateLastInteractionTime);
      window.removeEventListener("mousemove", updateLastInteractionTime);
      window.removeEventListener("scroll", updateLastInteractionTime);
      window.removeEventListener("keydown", updateLastInteractionTime);
    };
  }, [inactivityLimit]);

  return null;
}

export default AutoLogout;
