import { LockKeyhole, MoveUp } from "lucide-react";
import { Button } from "./ui/button";
import { useAnimation } from "@/context/AnimationContext";
import { useDynamicRefs } from "@/hooks/use-dynamic-refs";
import { useEffect } from "react";
import { splitText } from "@/lib/utils";
import { AnimatedSkeleton } from "./animated-skeleton";

interface PremiumUpgradeCardProps {
  data: {
    plan: {
      name: string;
      description: string;
      performance: {
        improvement: string;
        lockedFeatures: string;
      };
    };
  } | null;
}

const PremiumUpgradeCard = ({ data }: PremiumUpgradeCardProps) => {
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
            yPercent: 125,
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
    <div className="col-span-1">
      <div className="border border-neutral-300 bg-neutral-100 rounded-2xl p-1">
        <div className="bg-white border border-neutral-300 px-3 py-4 rounded-xl flex items-center justify-between">
          <div className="flex flex-col gap-2 items-start">
            <AnimatedSkeleton
              isVisible={!!data}
              skeletonClass="h-5 w-20"
              addRef={(e) => handleAddRef("skeleton", e)}
              containerClass="w-20 h-6"
            >
              <h5
                className="absolute z-10 uppercase text-neutral-700 font-medium w-"
                ref={(e) => handleAddRef("main", e)}
              >
                Upgrade
              </h5>
            </AnimatedSkeleton>
            <div className="flex items-center justify-start gap-1.5">
              <AnimatedSkeleton
                isVisible={!!data}
                skeletonClass="h-7 w-48"
                addRef={(e) => handleAddRef("skeleton", e)}
                containerClass="w-48 h-7"
              >
                <span
                  className="absolute z-10 font-semibold text-2xl"
                  ref={(e) => handleAddRef("main", e)}
                >
                  {data?.plan.name}
                </span>
              </AnimatedSkeleton>
            </div>
          </div>
          <Button variant={"purple"}>Upgrade</Button>
        </div>
        <div className="bg-white border border-neutral-300 px-3 py-4 rounded-xl mt-1">
          <AnimatedSkeleton
            isVisible={!!data}
            skeletonClass="h-7 w-96"
            addRef={(e) => handleAddRef("skeleton", e)}
            containerClass="w-w-96 h-10"
          >
            <p className="absolute z-10" ref={(e) => handleAddRef("main", e)}>
              {data?.plan.description}
            </p>
          </AnimatedSkeleton>
          <div className="mt-3 w-full grid grid-cols-2 items-stretch justify-between">
            <div className="p-2 pl-4 border border-neutral-300 rounded-tl-xl rounded-bl-xl">
              <AnimatedSkeleton
                isVisible={!!data}
                skeletonClass="h-5 w-24"
                addRef={(e) => handleAddRef("skeleton", e)}
                containerClass="w-24 h-6"
              >
                <h5
                  className="absolute z-10"
                  ref={(e) => handleAddRef("main", e)}
                >
                  Performance
                </h5>
              </AnimatedSkeleton>
              <div className="mt-2 flex items-center justify-start gap-2">
                <MoveUp className="text-emerald-500" size={14} />
                <AnimatedSkeleton
                  isVisible={!!data}
                  skeletonClass="h-10 w-14"
                  addRef={(e) => handleAddRef("skeleton", e)}
                  containerClass="w-14 h-10"
                >
                  <span
                    className="absolute z-10 font-medium text-2xl"
                    ref={(e) => handleAddRef("container", e)}
                  >
                    {data?.plan.performance.improvement}
                  </span>
                </AnimatedSkeleton>
              </div>
            </div>
            <div className="p-2 pl-4 border border-l-0 border-neutral-300 rounded-tr-xl rounded-br-xl">
              <AnimatedSkeleton
                isVisible={!!data}
                skeletonClass="h-5 w-12"
                addRef={(e) => handleAddRef("skeleton", e)}
                containerClass="w-12 h-6"
              >
                <h5
                  className="absolute z-10"
                  ref={(e) => handleAddRef("main", e)}
                >
                  Tools
                </h5>
              </AnimatedSkeleton>
              <div className="mt-2 flex items-center justify-start gap-2">
                <LockKeyhole className="text-yellow-500" size={14} />
                <AnimatedSkeleton
                  isVisible={!!data}
                  skeletonClass="h-10 w-14"
                  addRef={(e) => handleAddRef("skeleton", e)}
                  containerClass="w-14 h-10"
                >
                  <span
                    className="absolute z-10 font-medium text-2xl"
                    ref={(e) => handleAddRef("container", e)}
                  >
                    {data?.plan.performance.lockedFeatures}
                  </span>
                </AnimatedSkeleton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumUpgradeCard;
