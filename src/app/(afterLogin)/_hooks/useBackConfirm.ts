// src/app/(afterLogin)/_hooks/useNavigationConfirm.ts
"use client";

import { useEffect, useRef, useCallback } from "react";

export const useBackConfirm = (
  message: string = "작성중인 내용이 삭제됩니다."
) => {
  const isSaved = useRef(false);
  const isClickedFirst = useRef(false);

  const handlePopState = useCallback(() => {
    if (!isSaved.current) {
      const confirmLeave = window.confirm(message);

      if (confirmLeave) {
        isSaved.current = true;
        window.history.go(-1);
        return;
      }

      window.history.pushState(null, "", window.location.pathname);
    }
  }, [message]);

  useEffect(() => {
    if (!isClickedFirst.current) {
      window.history.pushState(null, "", window.location.pathname);
      isClickedFirst.current = true;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [handlePopState]);
};
