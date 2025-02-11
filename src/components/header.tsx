import Avatar01 from "@/assets/users/3.jpg";

import {
  Bell,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Ellipsis,
  Mail,
  Calendar,
  ChartSpline,
  Download,
  Loader,
  PanelLeft,
  RefreshCcw,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useAnimation } from "@/context/AnimationContext";

interface HeaderProps {
  open: boolean;
  onOpen: () => void;
}

const navigations = [
  { title: "Overview", value: "overview", icon: PanelLeft },
  { title: "Order", value: "order", icon: Loader },
  { title: "Sales", value: "sales", icon: ChartSpline },
];

const Header = ({ open, onOpen }: HeaderProps) => {
  const [value, setValue] = useState<string>("overview");

  const { registerAnimation, gsap } = useAnimation();
  const divRefs = useRef<any[]>([]);
  const div2Refs = useRef<any[]>([]);
  const toggleRefs = useRef<any>();
  divRefs.current = [];

  const handleAddRef = (el: any, opt?: 1 | 2) => {
    if(opt === undefined || opt === 1) {
      if (el && !divRefs.current.includes(el)) {
        divRefs.current.push(el);
      }
    } else if (opt === 2) {
      if (el && !div2Refs.current.includes(el)) {
        div2Refs.current.push(el);
      }
    }
  };

  useEffect(() => {
    const timeline = gsap.timeline({ paused: false });
    const animation = timeline
      .fromTo(
        divRefs.current,
        { scale: 0, opacity: 0, duration: 1 },
        { scale: 1, opacity: 1, duration: 1, ease: "sine.inOut", stagger: 0.2 }
      )
      .fromTo(
        toggleRefs.current,
        { scale: 0, opacity: 0, duration: 1 },
        { scale: 1, opacity: 1, duration: 1, ease: "sine.inOut", stagger: 0.2 },
        "-=1"
      )
      .fromTo(
        div2Refs.current,
        { scale: 0, opacity: 0, duration: 1 },
        { scale: 1, opacity: 1, duration: 1, ease: "sine.inOut", stagger: 0.2 },
        "-=1"
      );

    registerAnimation(animation);

    return () => {
      animation.kill();
    };
  }, [gsap, registerAnimation]);

  return (
    <>
      <div className="w-full h-16 flex items-center justify-between relative">
        <div className="flex items-center justify-center gap-2 px-6">
          <Button
            variant={"ghost"}
            onClick={onOpen}
            className="absolute -left-1 top-3 w-5 h-5 p-1 rounded-full border border-white bg-white"
          >
            {open ? <ChevronLeft /> : <ChevronRight />}
          </Button>
          <h1 className="text-2xl font-medium">Dashboard</h1>
        </div>
        <div className="flex items-center justify-end gap-3 px-6">
          <button
            className="max-w-8 h-8 px-2 flex items-center justify-center border border-neutral-300 rounded-lg bg-white hover:bg-neutral-100"
            ref={(e) => handleAddRef(e, 1)}
          >
            <Mail size={14} />
          </button>
          <button
            className="max-w-8 h-8 px-2 flex items-center justify-center border border-neutral-300 rounded-lg bg-white hover:bg-neutral-100"
            ref={(e) => handleAddRef(e, 1)}
          >
            <Bell size={14} />
          </button>
          <div
            className="h-6 w-0.5 bg-neutral-200"
            ref={(e) => handleAddRef(e, 1)}
          />
          <DropdownMenu>
            <DropdownMenuTrigger
              className="flex items-center gap-2 py-1.5 px-2 rounded-lg border border-neutral-200"
              ref={(e) => handleAddRef(e, 1)}
            >
              <div className="rounded-full w-5 h-5 overflow-hidden">
                <img src={Avatar01} alt="" />
              </div>
              <ChevronDown size={18} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <button
            className="max-w-8 h-8 px-2 flex items-center justify-center border border-neutral-300 rounded-lg bg-white hover:bg-neutral-100"
            ref={(e) => handleAddRef(e)}
          >
            <Ellipsis size={14} />
          </button>
        </div>
      </div>
      <div className="w-full h-16 border-t-2 border-b-2 border-neutral-200 flex items-center justify-between px-6">
        <ToggleGroup
          className="flex gap-0 -space-x-px rounded-lg shadow-sm shadow-black/5 rtl:space-x-reverse"
          type="single"
          variant="outline"
          value={value}
          onValueChange={(value) => {
            if (value) setValue(value);
          }}
          ref={toggleRefs}
        >
          {navigations.map((item, index) => (
            <ToggleGroupItem
              key={index}
              className="flex-1 rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10 data-[state=on]:bg-white bg-accent"
              value={item.value}
            >
              <div className="flex items-center justify-center gap-2 py-2 px-4">
                <item.icon />
                <span>{item.title}</span>
              </div>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <div className="inline-flex flex-wrap gap-2">
          <Button
            variant="outline"
            aria-label="Login with Google"
            className="h-9 w-9 bg-white rounded-xl"
            ref={(e) => handleAddRef(e, 2)}
          >
            <RefreshCcw className="rotate-90" />
          </Button>
          <Select defaultValue="s2">
            <SelectTrigger className="relative ps-9 w-32" ref={(e) => handleAddRef(e, 2)}>
              <div className="pointer-events-none absolute top-[9px] start-0 flex items-center justify-center ps-3 text-black group-has-[[disabled]]:opacity-50">
                <Calendar size={16} strokeWidth={2} aria-hidden="true" />
              </div>
              <SelectValue placeholder="Select a time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="s1">Daily</SelectItem>
              <SelectItem value="s2">Monthly</SelectItem>
              <SelectItem value="s3">Yearly</SelectItem>
            </SelectContent>
          </Select>
          <Button variant={"purple"} className="py-5 rounded-xl" ref={(e) => handleAddRef(e, 2)}>
            <Download />
            <span>Download</span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Header;
