import { useState } from "react";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/header";
import MainContent from "@/components/main-content";

function App() {
  const [open, setOpen] = useState<boolean>(true);

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <AppSidebar />
      <main className="w-full h-full">
        <SidebarInset className="bg-sidebar border-l-2">
          <main className="w-full h-full">
            <Header onOpen={() => setOpen(!open)} open={open} />
            <MainContent />
          </main>
        </SidebarInset>
      </main>
    </SidebarProvider>
  );
}

export default App;
