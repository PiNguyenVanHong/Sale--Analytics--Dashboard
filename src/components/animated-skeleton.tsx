import { cn } from "@/lib/utils";

import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

interface AnimatedSkeletonProps {
  isVisible: boolean;
  children: React.ReactNode;
  skeletonClass: string;
  containerClass?: string;
  addRef: (
    el: HTMLDivElement | HTMLSpanElement | null,
    opt?: 1 | 2 | 3
  ) => void;
}

export const AnimatedSkeleton = ({
  isVisible,
  children,
  containerClass,
  skeletonClass,
  addRef,
}: AnimatedSkeletonProps) => {
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setShowSkeleton(false);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        containerClass ? containerClass : "w-full h-7"
      )}
    >
      {isVisible && <>{children}</>}
      {/* <div ref={(e) => addRef('skeleton', e)} className="absolute z-20"> */}
      {showSkeleton && (
        <div
          ref={addRef}
          className={cn("absolute z-20 w-full top-1/2 -translate-y-1/2")}
        >
          <Skeleton className={skeletonClass ? skeletonClass : "h-7 w-full"} />
        </div>
      )}
    </div>
  );
};
