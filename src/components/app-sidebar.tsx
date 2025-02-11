import Logo from "@/assets/react.svg";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import {
  Box,
  ChartColumnStacked,
  Headset,
  House,
  PartyPopper,
  Search,
  Settings,
  ShoppingBag,
  Store,
  TicketPercent,
  TvMinimalPlay,
  UserRound,
  Workflow,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAnimation } from "@/context/AnimationContext";

const data = {
  footer: [
    { id: 1, title: "Settings", url: "/", icon: Settings },
    { id: 2, title: "Help Center", url: "/", icon: Headset },
  ],
  mainMenu: {
    name: "Main Menu",
    items: [
      { id: 3, title: "Dashboard", url: "/", icon: House },
      { id: 4, title: "Orders", url: "/", icon: ShoppingBag },
      { id: 5, title: "Products", url: "/", icon: Box },
      { id: 6, title: "Customers", url: "/", icon: UserRound },
      { id: 7, title: "Analytics", url: "/", icon: ChartColumnStacked },
      { id: 8, title: "Marketing", url: "/", icon: PartyPopper },
    ],
  },
  salesChannel: {
    name: "Sales Channel",
    items: [
      { id: 9, title: "Integrations", url: "/", icon: Workflow },
      { id: 10, title: "My Store", url: "/", icon: Store },
      { id: 11, title: "Discounts", url: "/", icon: TicketPercent },
    ],
  },
};

export function AppSidebar() {
  const { reverseAllAnimations, registerAnimation, gsap, isReversing } = useAnimation();
  gsap.registerPlugin(useGSAP);
  const container = useRef(null);
  const divRefs = useRef<any[]>([]);
  divRefs.current = [];

  const handleAddRef = (el: any) => {
    if (el && !divRefs.current.includes(el)) {
      divRefs.current.push(el);
    }
  };

  useGSAP(
    () => {
      const timeline = gsap.timeline();

      const animation = timeline
        .fromTo(
          ".good",
          { scale: 0, opacity: 0, duration: 1 },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "sine.inOut",
            stagger: 0.2,
          }
        )
        .fromTo(
          divRefs.current,
          {
            x: "10px",
            opacity: 0,
            scale: 0,
          },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            delay: 0.5,
            stagger: 0.05,
            ease: "elastic.out(1, 0.5)",
          },
          "-=1"
        );

      registerAnimation(animation);
    },
    { scope: container }
  );

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="max-h-16 h-full">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/" className="block">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary/60 text-sidebar-primary-foreground">
                  <div className="w-4 h-4">
                    <img src={Logo} alt="Logo" />
                  </div>
                </div>
                <div className="flex-1 font-medium text-xl leading-tight">
                  Metoric
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent ref={container}>
        <SidebarGroup className="h-16 flex items-center justify-center border-t-2 border-b-2 border-neutral-200 px-3">
          <div className="relative good">
            <Input
              id="input-10"
              className="peer ps-8 pe-14"
              placeholder="Search"
              type="text"
            />
            <div className="pointer-events-none absolute inset-y-0 start-2 flex items-center justify-center pe-3 text-black peer-disabled:opacity-50">
              <Search size={16} strokeWidth={2} aria-hidden="true" />
            </div>
            <div className="pointer-events-none absolute inset-y-0 -end-1.5 flex items-center justify-center gap-1 pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-[8px] font-semibold">⌘</span>
              </kbd>
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-[10px] font-semibold">K</span>
              </kbd>
            </div>
          </div>
        </SidebarGroup>
        <SidebarGroup className="pr-3">
          <SidebarGroupLabel ref={(e) => handleAddRef(e)}>
            {data.mainMenu.name}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.mainMenu.items.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  ref={handleAddRef}
                  // style={{
                  //   opacity: 0, // Bắt đầu ở trạng thái ẩn
                  //   transform: "translateX(100%)", // Di chuyển bắt đầu từ phải
                  // }}
                >
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      item.id === 3 &&
                        "bg-neutral-100/90 hover:bg-neutral-100/90 hover:text-foreground-purple border-2 border-neutral-200/50 rounded-md text-foreground-purple font-medium"
                    )}
                  >
                    <a href={item.url}>
                      <item.icon strokeWidth={2} />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="pr-4">
          <SidebarGroupLabel ref={(e) => handleAddRef(e)}>
            {data.salesChannel.name}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.salesChannel.items.map((item) => (
                <SidebarMenuItem key={item.title} ref={handleAddRef}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="pr-4">
          <SidebarGroupLabel ref={(e) => handleAddRef(e)}>
            Start Animations
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem
                className="flex items-center justify-between pl-2 pr-6"
                ref={(e) => handleAddRef(e)}
              >
                <div className="flex items-center gap-2">
                  <TvMinimalPlay size={16} />
                  <span>Demo Project</span>
                </div>
                <div className="inline-flex items-center gap-2">
                  <Switch
                    id="switch-07"
                    onClick={reverseAllAnimations}
                    disabled={isReversing}
                    style={{
                      cursor: isReversing ? "not-allowed" : "pointer",
                      opacity: isReversing ? 0.6 : 1,
                      transition: "opacity 0.3s",
                    }}
                  />
                  <Label htmlFor="switch-07" className="sr-only">
                    M3-style switch
                  </Label>
                </div>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-0 font-medium">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.footer.map((item) => (
                <SidebarMenuItem key={item.title} ref={handleAddRef}>
                  <SidebarMenuButton asChild size="sm" className="text-sm">
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
