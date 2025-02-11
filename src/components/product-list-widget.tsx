import { Box, RefreshCcw, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ProductColumn } from "@/components/table/_products/column";
import { ProductClient } from "@/components/table/_products/client";
import { useAnimation } from "@/context/AnimationContext";
import { useDynamicRefs } from "@/hooks/use-dynamic-refs";
import { useEffect } from "react";
import { splitText } from "@/lib/utils";
import { AnimatedSkeleton } from "./animated-skeleton";

interface ProductListWidgetProps {
  data: {
    title: string;
    value: string;
    change: {
      value: string;
      upto: string;
    };
  } | null;
  list: ProductColumn[] | [];
}

const ProductListWidget = ({ data, list }: ProductListWidgetProps) => {
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
            yPercent: 165,
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
      <div className="bg-white border border-neutral-300 rounded-xl">
        <div className="flex items-center justify-between px-3 py-4 border-b border-neutral-300">
          <div className="flex flex-col gap-2 items-start">
            <AnimatedSkeleton
              isVisible={!!data}
              skeletonClass="h-5 w-20"
              addRef={(e) => handleAddRef("skeleton", e)}
              containerClass="w-20 h-6"
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
                skeletonClass="h-8 w-14"
                addRef={(e) => handleAddRef("skeleton", e)}
                containerClass="w-14 h-8"
              >
                <span
                  className="absolute z-10 font-semibold text-2xl "
                  ref={(e) => handleAddRef("container", e)}
                >
                  {data?.value}
                </span>
              </AnimatedSkeleton>
              <AnimatedSkeleton
                isVisible={!!data}
                skeletonClass="h-7 w-12"
                addRef={(e) => handleAddRef("skeleton", e)}
                containerClass="w-12 h-7"
              >
                {data?.change.upto === "up" ? (
                  <div
                    className="absolute z-10 w-full h-full flex items-center justify-around text-xs font-medium px-1 py-0.5 rounded-full border border-neutral-200 text-emerald-500 bg-emerald-50"
                    ref={(e) => handleAddRef("main", e)}
                  >
                    <span ref={(e) => handleAddRef("container", e)}>
                      +{data?.change.value}
                    </span>
                  </div>
                ) : (
                  <div
                    className="absolute z-10 w-full h-full flex items-center justify-around text-xs font-medium px-1 py-0.5 rounded-full border border-neutral-200 text-red-600 bg-red-50"
                    ref={(e) => handleAddRef("main", e)}
                  >
                    <span ref={(e) => handleAddRef("container", e)}>
                      -{data?.change.value}
                    </span>
                  </div>
                )}
              </AnimatedSkeleton>
            </div>
          </div>
          <div className="p-2 border border-neutral-300 rounded-lg text-foreground-purple">
            <Box size={18} />
          </div>
        </div>
        <div className="px-3 py-4 flex items-center justify-between">
          <div className="relative w-80">
            <Input
              id="input-10"
              className="peer ps-8 pe-14 w-full"
              placeholder="Search product..."
              type="text"
            />
            <div className="pointer-events-none absolute inset-y-0 start-2 flex items-center justify-center pe-3 text-black peer-disabled:opacity-50">
              <Search size={16} strokeWidth={2} aria-hidden="true" />
            </div>
          </div>
          <Button variant={"outline"} className="bg-white">
            <RefreshCcw />
            <span>Refresh</span>
          </Button>
        </div>
      </div>
      <Card className="bg-white border border-neutral-300 rounded-xl mt-1 p-0">
        <CardHeader className="p-0"></CardHeader>
        <CardContent className="p-0">
          <ProductClient data={list} handleAddRef={handleAddRef} />
        </CardContent>
        <CardFooter className="p-0 pt-4"></CardFooter>
      </Card>
    </div>
  );
};

export default ProductListWidget;
