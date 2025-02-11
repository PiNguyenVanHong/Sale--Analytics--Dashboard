import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useAnimation } from "@/context/AnimationContext";
import { useDynamicRefs } from "@/hooks/use-dynamic-refs";
import { useEffect } from "react";
import { formatDate, splitText } from "@/lib/utils";
import { AnimatedSkeleton } from "./animated-skeleton";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  CircleArrowUp,
  CircleArrowDown,
  LucideIcon,
  PiggyBank,
} from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#8884d8",
  },
  mobile: {
    label: "Mobile",
    color: "#fb923c",
  },
} satisfies ChartConfig;

interface SalesChartProps {
  data: {
    title: string;
    value: string;
    change: {
      value: string;
      upto: string;
    };
    icon: LucideIcon;
    filters: {
      title: string;
    }[];
    datas: {
      periods: string[];
      values: {
        date: string;
        netSales: { thisPeriod: number; lastPeriod: number };
      }[];
    };
  } | null;
}

const SalesChart = ({ data }: SalesChartProps) => {
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

  const chartData =
    data?.datas.values.map((item) => ({
      date: item.date,
      desktop: item.netSales.thisPeriod,
      mobile: item.netSales.lastPeriod,
    })) || [];

  const formatXAxis = (tick: any) => {
    const firstDate = chartData[0]?.date;
    const lastDate = chartData[chartData.length - 1]?.date;
    return tick === firstDate || tick === lastDate ? formatDate(tick) : "";
  };

  return (
    <div className="border border-neutral-300 bg-neutral-100 rounded-2xl p-1">
      <div className="bg-white border border-neutral-300 rounded-xl">
        <div className="flex items-center justify-between px-3 py-4 border-b border-neutral-300">
          <div className="flex flex-col gap-2 items-start">
            <AnimatedSkeleton
              isVisible={!!data}
              skeletonClass="h-5 w-32"
              addRef={(e) => handleAddRef("skeleton", e)}
              containerClass="w-32 h-6"
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
                skeletonClass="h-8 w-24"
                addRef={(e) => handleAddRef("skeleton", e)}
                containerClass="w-24 h-8"
              >
                <span
                  className="absolute z-10 font-semibold text-2xl"
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
                {data?.change.upto === "up" ? (
                  <div
                    className="w-full h-full flex items-center justify-around text-xs font-medium px-1 py-0.5 rounded-full border border-neutral-200 text-emerald-500 bg-emerald-50 absolute z-10"
                    ref={(e) => handleAddRef("main", e)}
                  >
                    <CircleArrowUp size={14} />
                    <span ref={(e) => handleAddRef("container", e)}>
                      {data?.change.value}
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
              </AnimatedSkeleton>
            </div>
          </div>
          <div className="p-2 border border-neutral-300 rounded-lg text-foreground-purple">
            <PiggyBank size={18} />
          </div>
        </div>
        <div className="px-3 py-4 flex items-center justify-between">
          <div className="h-full flex items-center gap-2 border border-neutral-300 rounded-xl">
            <Select defaultValue="s1">
              <AnimatedSkeleton
                isVisible={!!data}
                skeletonClass="h-7 w-36"
                addRef={(e) => handleAddRef("skeleton", e)}
                containerClass="w-36 h-7 -top-0.5"
              >
                <SelectTrigger
                  className="w-36 border-none shadow-none"
                  ref={(e) => handleAddRef("main", e)}
                >
                  <SelectValue placeholder="Select framework" />
                </SelectTrigger>
              </AnimatedSkeleton>
              <SelectContent className="[&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2">
                <SelectItem value="s1">{data?.filters[0].title}</SelectItem>
                <SelectItem value="s2">Product 01</SelectItem>
                <SelectItem value="s3">Product 02</SelectItem>
                <SelectItem value="s4">Product 03</SelectItem>
              </SelectContent>
            </Select>
            <div className="w-0.5 h-9 bg-neutral-300" />
            <Select defaultValue="s1">
              <AnimatedSkeleton
                isVisible={!!data}
                skeletonClass="h-7 w-36"
                addRef={(e) => handleAddRef("skeleton", e)}
                containerClass="w-36 h-7 -top-0.5"
              >
                <SelectTrigger
                  className="w-36 border-none shadow-none top-0."
                  ref={(e) => handleAddRef("main", e)}
                >
                  <SelectValue placeholder="Select framework" />
                </SelectTrigger>
              </AnimatedSkeleton>
              <SelectContent className="[&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2">
                <SelectItem value="s1">{data?.filters[1].title}</SelectItem>
                <SelectItem value="s2">Category 01</SelectItem>
                <SelectItem value="s3">Category 02</SelectItem>
                <SelectItem value="s4">Category 03</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-neutral-600">
              <div className="w-2 h-2 rounded-[2px] bg-foreground-purple"></div>
              <span>{data?.datas.periods[0]}</span>
            </div>
            <div className="flex items-center gap-1.5 text-neutral-600">
              <div className="w-2 h-2 rounded-[2px] bg-orange-400"></div>
              <span>{data?.datas.periods[1]}</span>
            </div>
          </div>
        </div>
      </div>
      <Card className="bg-white border border-neutral-300 rounded-xl mt-1 ">
        <CardHeader className="p-0"></CardHeader>
        <CardContent className="p-4">
          <ChartContainer config={chartConfig} className="w-full h-[220px]">
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{ 
                left: -20,
                right: 12,
              }}
              height={220}
            >
              <CartesianGrid vertical={true} horizontal={false} mode={200} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={12}
                tickFormatter={formatXAxis}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={6}
                tickCount={4}
                tickFormatter={(value) =>
                  value >= 1000 ? `$${value / 1000}K` : value
                }
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Area
                dataKey="mobile"
                type="natural"
                fill="var(--color-mobile)"
                fillOpacity={0.4}
                stroke="var(--color-mobile)"
                stackId="a"
                activeDot={{ r: 6, stroke: "#ffffff", strokeWidth: "2" }}
              />
              <Area
                dataKey="desktop"
                type="natural"
                fill="var(--color-desktop)"
                fillOpacity={0.4}
                stroke="var(--color-desktop)"
                stackId="a"
                activeDot={{ r: 6, stroke: "#ffffff", strokeWidth: "2" }}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="p-0"></CardFooter>
      </Card>
    </div>
  );
};

export default SalesChart;
