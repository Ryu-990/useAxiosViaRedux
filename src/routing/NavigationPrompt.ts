import React, { useEffect } from "react";
import {
  useLocation,
  useBlocker
} from "react-router-dom";


// NavigationPrompt.tsx
interface NavigationPromptProps {
    message: (loc: { pathname: string }) => string;
    getUserConfirmation: (message: string, navCallback: (allow: boolean) => void) => void;
  }
  
 export const NavigationPrompt: React.FC<NavigationPromptProps> = ({ message }) => {
    const location = useLocation();
    const blocker = useBlocker(({ currentLocation, nextLocation }) => {
      return currentLocation.pathname !== nextLocation.pathname;
    });
  
    useEffect(() => {
      if (blocker.state === "blocked") {
        const promptMessage = message({ pathname: blocker.location.pathname });
        if (window.confirm(promptMessage)) {
          blocker.proceed();
        } else {
          blocker.reset();
        }
      }
    }, [blocker, message]);
  
    useEffect(() => {
      const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        const promptMessage = message({ pathname: location.pathname });
        if (!window.confirm(promptMessage)) {
          e.preventDefault();
        }
      };
  
      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [location, message]);
  
    return null;
  };