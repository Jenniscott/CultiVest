// import { useEffect, useCallback } from "react";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

interface UseRedirectOptions {
  delay?: number;
  replace?: boolean;
}

export const useRedirect = (options: UseRedirectOptions = {}) => {
  const router = useRouter();
  const { delay = 0, replace = false } = options;

  const redirect = useCallback(
    (path: string) => {
      const performRedirect = () => {
        if (replace) {
          router.replace(path);
        } else {
          router.push(path);
        }
      };

      if (delay > 0) {
        setTimeout(performRedirect, delay);
      } else {
        performRedirect();
      }
    },
    [router, delay, replace],
  );

  return { redirect };
};

// Hook for immediate redirects with error handling
export const useImmediateRedirect = () => {
  const router = useRouter();

  const redirectToRole = useCallback(
    (role: "farmer" | "investor") => {
      try {
        // Use replace to avoid adding to history stack
        router.replace(`/${role}`);
      } catch (error) {
        console.error("Redirect error:", error);
        // Fallback to window.location if router fails
        window.location.href = `/${role}`;
      }
    },
    [router],
  );

  const redirectToHome = useCallback(() => {
    try {
      router.replace("/");
    } catch (error) {
      console.error("Redirect error:", error);
      window.location.href = "/";
    }
  }, [router]);

  return { redirectToRole, redirectToHome };
};
