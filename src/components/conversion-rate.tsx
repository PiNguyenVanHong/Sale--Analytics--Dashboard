import {
  ChartNoAxesCombined,
  CircleArrowDown,
  CircleArrowUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAnimation } from "@/context/AnimationContext";
import { cn, splitText } from "@/lib/utils";
import { useDynamicRefs } from "@/hooks/use-dynamic-refs";

import { AnimatedSkeleton } from "@/components/animated-skeleton";

interface ConversionRateProps {
  data: {
    title: string;
    value: string;
    change: {
      value: string;
      upto: string;
    };
    details: {
      title: string;
      percentage: string;
      value: string;
    }[];
  } | null;
}

const ConversionRate = ({ data }: ConversionRateProps) => {
  const { gsap } = useAnimation();
  const { handleAddRef, getRefsByKey } = useDynamicRefs();

  const [details, setDetails] = useState(data?.details || Array(4).fill(null));

  useEffect(() => {
    if (data) {
      setDetails(data.details);
      const skeletons = getRefsByKey("skeleton");
      const mainElements = getRefsByKey("main");
      const containers = getRefsByKey("container");

      const timeline = gsap.timeline();
      timeline
        .to(skeletons, { opacity: 0, duration: 3 })
        .fromTo(
          mainElements,
          { opacity: 0 },
          { opacity: 1, duration: 2 },
          "-=2"
        );

      if (!details.includes(null)) {
        containers.forEach((el) => {
          const split = splitText(el);
          timeline.from(
            split,
            {
              yPercent: 145,
              opacity: 1,
              duration: 0.5,
              stagger: 0.05,
              ease: "back.out",
            },
            "-=1.2"
          );
        });
      }
    }
  }, [data, details, getRefsByKey, gsap]);

  return (
    <div className="col-span-1">
      <div className="border border-neutral-300 bg-neutral-100 rounded-2xl p-1">
        <div className="bg-white border border-neutral-300 px-3 py-4 rounded-xl flex items-center justify-between">
          <div className="flex flex-col gap-2 items-start">
            <AnimatedSkeleton
              isVisible={!!data}
              containerClass="w-40 h-6"
              skeletonClass="h-5 w-40"
              addRef={(e) => handleAddRef("skeleton", e)}
            >
              <h5
                className="absolute z-10 uppercase text-neutral-700 font-medium"
                ref={(e) => handleAddRef("main", e)}
              >
                {data?.title}
              </h5>
            </AnimatedSkeleton>
            <div className="flex items-center justify-start gap-1.5">
              <AnimatedSkeleton
                isVisible={!!data}
                containerClass="w-20 h-8"
                skeletonClass="h-8 w-20"
                addRef={(e) => handleAddRef("skeleton", e)}
              >
                <span
                  className="absolute z-10 font-semibold text-2xl"
                  ref={(e) => {handleAddRef("container", e); handleAddRef("main", e)}}
                >
                  {data?.value}
                </span>
              </AnimatedSkeleton>
              <AnimatedSkeleton
                isVisible={!!data}
                containerClass="h-7 w-16"
                skeletonClass="h-7 w-16"
                addRef={(e) => handleAddRef("skeleton", e)}
              >
                {data?.change.upto === "up" ? (
                  <div
                    className="absolute z-10 flex items-center justify-around w-full h-full text-xs font-medium px-1 py-0.5 rounded-full border border-neutral-200 text-emerald-500 bg-emerald-50"
                    ref={(e) => handleAddRef("main", e)}
                  >
                    <CircleArrowUp size={14} />
                    <span ref={(e) => handleAddRef("container", e)}>
                      {data?.change.value}
                    </span>
                  </div>
                ) : (
                  <div
                    className="absolute z-10 flex items-center justify-around w-full h-full text-xs font-medium px-1 py-0.5 rounded-full border border-neutral-200 text-red-600 bg-red-50"
                    ref={(e) => handleAddRef("main", e)}
                  >
                    <CircleArrowDown size={14} />
                    <span ref={(e) => handleAddRef("container", e)}>
                      {data?.change.value}
                    </span>
                  </div>
                )}
              </AnimatedSkeleton>
            </div>
          </div>
          <div className="p-2 border border-neutral-300 rounded-lg text-foreground-purple">
            <ChartNoAxesCombined size={18} />
          </div>
        </div>
        <div className="mt-1 bg-white border border-neutral-300 px-3 py-4 rounded-xl flex flex-col items-center justify-center gap-4">
          {details.map((item, index) => (
            <div
              key={index}
              className={cn(
                "w-full flex items-center justify-between",
                index !== details.length - 1 &&
                  "pb-4 border-b border-neutral-300"
              )}
            >
              <div className="flex flex-col items-start gap-2">
                <AnimatedSkeleton
                  isVisible={!!data}
                  containerClass="w-32 h-5"
                  skeletonClass="h-5 w-32"
                  addRef={(e) => handleAddRef("skeleton", e)}
                >
                  <h5
                    className="absolute z-10 font-medium w-"
                    ref={(e) => handleAddRef("main", e)}
                  >
                    {item?.title}
                  </h5>
                </AnimatedSkeleton>
                <AnimatedSkeleton
                  isVisible={!!data}
                  containerClass="w-10 h-5"
                  skeletonClass="h-5 w-10"
                  addRef={(e) => handleAddRef("skeleton", e)}
                >
                  <span
                    className="absolute z-10 text-neutral-600 text-sm"
                    ref={(e) => handleAddRef("container", e)}
                  >
                    {item?.percentage}
                  </span>
                </AnimatedSkeleton>
              </div>
              <AnimatedSkeleton
                isVisible={!!data}
                containerClass="w-10 h-5"
                skeletonClass="h-5 w-10"
                addRef={(e) => handleAddRef("skeleton", e)}
              >
                <span
                  className="absolute z-10 font-medium"
                  ref={(e) => handleAddRef("container", e)}
                >
                  {item?.value}
                </span>
              </AnimatedSkeleton>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConversionRate;
