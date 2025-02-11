import { createContext, useContext, useRef, useState } from "react";
import { gsap } from "gsap";

interface AnimationContextType {
  registerAnimation: (animation: gsap.core.Timeline) => void;
  reverseAllAnimations: () => void;
  gsap: typeof gsap;
  isReversing: boolean;
}

const AnimationContext = createContext<AnimationContextType>({
  registerAnimation: () => {},
  reverseAllAnimations: () => {},
  gsap,
  isReversing: false,
});

interface AnimationProviderProps {
  children: React.ReactNode;
}

export const AnimationProvider = ({ children }: AnimationProviderProps) => {
  const animations = useRef<gsap.core.Timeline[]>([]);
  const [isReversing, setIsReversing] = useState<boolean>(false);

  const registerAnimation = (animation: gsap.core.Timeline) => {
    animations.current.push(animation);
  };

  const reverseAllAnimations = () => {
    if(isReversing) return;
    setIsReversing(true);

    const reversedPromises = animations.current.map(
      (animation, i) =>
        new Promise<void>((resolve) => {
          if (animation.progress() === 0) {
            resolve(); // Skip if there's nothing to reverse
            setIsReversing(false);
          } else {
            // Attach a callback to each timeline
            animation.eventCallback("onReverseComplete", () => {
              resolve();
              if(i === animations.current.length - 1) {
                setIsReversing(false);
                setTimeout(() => {
                  window.location.reload();
                }, 500);
              }
            });

            animation.reverse();
          }
        })
    );

    Promise.all(reversedPromises).then(() => {
      console.log("All animations reversed. Reloading...");
    });
  };

  return (
    <AnimationContext.Provider
      value={{ registerAnimation, reverseAllAnimations, gsap, isReversing }}
    >
      {children}
    </AnimationContext.Provider>
  );
};

// Custom hook để sử dụng AnimationContext
export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error(
      "useAnimationContext must be used within an AnimationProvider"
    );
  }
  return context;
};
