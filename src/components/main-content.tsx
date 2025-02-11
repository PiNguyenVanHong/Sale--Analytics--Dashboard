import {
  ChartScatter,
  Coins,
  Eye,
  LucideIcon,
  ShoppingBag,
} from "lucide-react";

import StatCard from "@/components/stat-card";
import SalesChart from "@/components/sales-chart";
import ConversionRate from "@/components/conversion-rate";
import PremiumUpgradeCard from "@/components/premium-upgrade-card";
import ProductListWidget from "@/components/product-list-widget";
import { useEffect, useRef, useState } from "react";
import { ProductColumn } from "./table/_products/column";
import { useAnimation } from "@/context/AnimationContext";

const statCardsIcon = [Coins, ChartScatter, ShoppingBag, Eye] as LucideIcon[];

const API_DELAY = 5000; // Define a constant for the delay

interface StatCardData {
  title: string;
  value: string;
  change: {
    value: string;
    upto: string;
  };
  comparison: string;
}

interface ConversionRateData {
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
}

interface SalesChartData {
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
}

interface PremiumUpgradeData {
  plan: {
    name: string;
    description: string;
    performance: {
      improvement: string;
      lockedFeatures: string;
    };
  };
}

interface ProductListData {
  title: string;
  value: string;
  change: {
    value: string;
    upto: string;
  };
}

interface DataProps {
  statCards: StatCardData[];
  conversionRate: ConversionRateData | null;
  salesChart: SalesChartData | null;
  premiumUpgrades: PremiumUpgradeData | null;
  productList: ProductListData | null;
}

const MainContent = () => {
  const [formattedProducts, setFormattedProducts] = useState<ProductColumn[]>(
    Array(5).fill({
      id: "",
      product_info: "",
      thumbnail: "",
      price: "",
      stock: "",
      sold: "",
      isActive: undefined,
    })
  );
  const [data, setData] = useState<DataProps>({
    statCards: Array(4).fill(null),
    conversionRate: null,
    salesChart: null,
    premiumUpgrades: null,
    productList: null,
  });

  const { registerAnimation, gsap } = useAnimation();
  const divRefs = useRef<any[]>([]);

  const handleAddRef = (el: any) => {
    if (el && !divRefs.current.includes(el)) {
      divRefs.current.push(el);
    }
  };

  useEffect(() => {
    const timeline = gsap.timeline({ paused: false });
    const animation = timeline.fromTo(
      divRefs.current,
      { scale: 0.9, opacity: 0, duration: 1 },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        delay: 2,
        ease: "sine.inOut",
        stagger: 0.05,
      }
    );

    registerAnimation(animation);

    return () => {
      animation.kill();
    };
  }, [gsap, registerAnimation]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productResponse, productListResponse] = await Promise.all([
          fetch("/product.json"),
          fetch("/product-list.json"),
        ]);

        const productResult = await productResponse.json();
        const productListResult = await productListResponse.json();

        setTimeout(() => {
          setFormattedProducts(
            productResult.map((item: any) => ({
              id: item.id,
              product_info: item.name,
              thumbnail: "../../src/assets/products/" + item.thumbnail,
              price: item.price,
              stock: item.stock,
              sold: item.sold,
              isActive: item.isActive,
            }))
          );

          setData((prev) => ({ ...prev, productList: productListResult }));
        }, API_DELAY);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchStatCards = async () => {
      try {
        const response = await fetch("/stat-cards.json");
        const result = await response.json();

        setTimeout(() => {
          setData((prev) => ({ ...prev, statCards: result }));
        }, API_DELAY);
      } catch (error) {
        console.error("Error fetching stat cards:", error);
      }
    };

    const fetchConversionRate = async () => {
      try {
        const response = await fetch("/conversion-rate.json");
        const result = await response.json();

        setTimeout(() => {
          setData((prev) => ({ ...prev, conversionRate: result }));
        }, API_DELAY);
      } catch (error) {
        console.error("Error fetching conversion rate:", error);
      }
    };

    const fetchSalesChart = async () => {
      try {
        const response = await fetch("/sale-chart.json");
        const result = await response.json();

        setTimeout(() => {
          setData((prev) => ({ ...prev, salesChart: result }));
        }, API_DELAY);
      } catch (error) {
        console.error("Error fetching sales chart:", error);
      }
    };

    const fetchPremiumUpgrade = async () => {
      try {
        const response = await fetch("/premium-upgrade.json");
        const result = await response.json();

        setTimeout(() => {
          setData((prev) => ({ ...prev, premiumUpgrades: result }));
        }, API_DELAY);
      } catch (error) {
        console.error("Error fetching premium upgrade:", error);
      }
    };

    fetchStatCards();
    fetchConversionRate();
    fetchSalesChart();
    fetchPremiumUpgrade();
    fetchData();
  }, []);

  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="w-full grid grid-cols-4 items-stretch gap-6">
        {data.statCards.map((item, i) => (
          <div key={i} ref={handleAddRef}>
            <StatCard data={item} icon={statCardsIcon[i]} />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-6 items-stretch">
        <div ref={handleAddRef} className="col-span-2">
          <SalesChart data={data.salesChart} />
        </div>
        <div ref={handleAddRef} className="col-span-1">
          <ConversionRate data={data.conversionRate} />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6 items-stretch">
        <div ref={handleAddRef}>
          <PremiumUpgradeCard data={data.premiumUpgrades} />
        </div>
        <div className="col-span-2" ref={handleAddRef}>
          <ProductListWidget data={data.productList} list={formattedProducts} />
        </div>
      </div>
    </div>
  );
};

export default MainContent;