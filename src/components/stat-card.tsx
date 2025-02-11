import {
  ArrowRight,
  CircleArrowDown,
  CircleArrowUp,
  LucideIcon,
} from "lucide-react";
import { useEffect } from "react";
import { useAnimation } from "@/context/AnimationContext";
import { splitText } from "@/lib/utils";
import { AnimatedSkeleton } from "@/components/animated-skeleton";
import { useDynamicRefs } from "@/hooks/use-dynamic-refs";

interface StatCardProps {
  data: {
    title: string;
    value: string;
    change: {
      value: string;
      upto: string;
    };
    comparison: string;
  } | null;
  icon: LucideIcon;
}

const StatCard = ({ data, icon: Icon }: StatCardProps) => {
  const { gsap } = useAnimation();
  const { handleAddRef, getRefsByKey } = useDynamicRefs();

  useEffect(() => {
    if (data) {
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
      containers.forEach((el) => {
        const split = splitText(el);
        timeline.from(
          split,
          {
            y: 25,
            opacity: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: "back.out",
          },
          "-=1.2"
        );
      });
    }
  }, [data, getRefsByKey, gsap]);

  return (
    <div className="border border-neutral-300 bg-neutral-100 rounded-2xl p-1">
      <div className="bg-white border border-neutral-300 px-3 py-4 rounded-xl flex items-center justify-between">
        <div className="flex flex-col gap-2 items-start w-full">
          <AnimatedSkeleton
            isVisible={!!data}
            skeletonClass="h-5 w-32"
            addRef={(e) => handleAddRef("skeleton", e)}
            containerClass="w-full h-6"
          >
            <h5
              className="absolute uppercase text-neutral-700 font-medium z-10"
              ref={(e) => handleAddRef("main", e)}
            >
              {data?.title}
            </h5>
          </AnimatedSkeleton>
          <div className="flex items-center justify-start gap-1.5">
            <AnimatedSkeleton
              isVisible={!!data}
              skeletonClass="h-7 w-20"
              addRef={(e) => handleAddRef("skeleton", e)}
              containerClass="w-20 h-7"
            >
              <span
                className="font-medium text-lg absolute z-10"
                ref={(e) => {
                  handleAddRef("container", e);
                  handleAddRef("main", e);
                }}
              >
                {data?.value}
              </span>
            </AnimatedSkeleton>
            <AnimatedSkeleton
              isVisible={!!data}
              skeletonClass="h-7 w-16"
              addRef={(e) => handleAddRef("skeleton", e)}
              containerClass="w-16 h-7"
            >
              <>
                {data?.change.upto === "up" ? (
                  <div
                    className="w-full h-full flex items-center justify-around text-xs font-medium px-1 py-0.5 rounded-full border border-neutral-200 text-emerald-500 bg-emerald-50 absolute z-10"
                    ref={(e) => handleAddRef("main", e)}
                  >
                    <CircleArrowUp size={14} />
                    <span ref={(e) => handleAddRef("container", e)}>
                      {data.change.value}
                    </span>
                  </div>
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-around text-xs font-medium px-1 py-0.5 rounded-full border border-neutral-200 text-red-600 bg-red-50 absolute z-10"
                    ref={(e) => handleAddRef("main", e)}
                  >
                    <CircleArrowDown size={14} />
                    <span ref={(e) => handleAddRef("container", e)}>
                      {data?.change.value}
                    </span>
                  </div>
                )}
              </>
            </AnimatedSkeleton>
          </div>
        </div>
        <div className="p-2 border border-neutral-300 rounded-lg text-foreground-purple">
          <Icon size={18} />
        </div>
      </div>
      <div className="flex items-center justify-between p-3">
        <AnimatedSkeleton
          isVisible={!!data}
          skeletonClass="h-5 w-44"
          addRef={(e) => handleAddRef("skeleton", e)}
          containerClass="h-5 w-44"
        >
          <div className="absolute z-10" ref={(e) => handleAddRef("main", e)}>
            <span
              className="font-semibold"
              ref={(e) => handleAddRef("container", e)}
            >
              {data?.comparison}
            </span>
            <span className="text-neutral-700"> from last month</span>
          </div>
        </AnimatedSkeleton>
        <button>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default StatCard;
