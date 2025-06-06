"use client";

import { Github, ArrowRight, Zap, Shield, Move, Star, Download, Users, Lock, Terminal, PanelLeft, Settings, LifeBuoy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DragDemo } from "@/components/drag-demo";
import { SidebarProvider, Sidebar, SidebarHeader, SidebarFooter, SidebarTrigger, SidebarInset, useSidebar } from "@/components/ui/sidebar";
import React from "react";
import { cn } from "@/lib/utils";
import { WaitlistForm } from "@/components/waitlist-form";

const NavLink = ({ href, children, icon: Icon }: { href: string; children: React.ReactNode; icon: React.ElementType }) => {
  const { open } = useSidebar();
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a href={href} className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors">
          <Icon className="w-5 h-5" />
          <span className={cn("font-medium transition-opacity", open ? "opacity-100" : "opacity-0")}>{children}</span>
        </a>
      </TooltipTrigger>
      {!open && (
        <TooltipContent side="right" sideOffset={5}>
          {children}
        </TooltipContent>
      )}
    </Tooltip>
  );
};

function AppSidebar() {
  const { open } = useSidebar();
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <div className={cn("w-3 h-3 bg-primary rounded-full transition-all", open ? "mr-1" : "mr-0")} />
          <h2 className={cn("text-lg font-semibold transition-opacity whitespace-nowrap", open ? "opacity-100" : "opacity-0")}>sidegate</h2>
        </div>
      </SidebarHeader>
      <div className="flex-1 overflow-y-auto">
        <div className="p-2 space-y-4">
          <div>
            <p className={cn("text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-2 px-3 transition-opacity", open ? "opacity-100" : "opacity-0")}>Overview</p>
            <nav className="flex flex-col">
              <NavLink href="#why-sidegate" icon={Shield}>Why Sidegate</NavLink>
              <NavLink href="#features" icon={Star}>Features</NavLink>
              <NavLink href="#how-it-works" icon={Zap}>How It Works</NavLink>
            </nav>
          </div>
          <div>
            <p className={cn("text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-2 px-3 transition-opacity", open ? "opacity-100" : "opacity-0")}>Project</p>
            <nav className="flex flex-col">
              <NavLink href="#open-source" icon={Github}>Open Source</NavLink>
              <NavLink href="https://github.com/plawlost/sidegate/blob/main/LICENSE" icon={Terminal}>MIT License</NavLink>
            </nav>
          </div>
        </div>
      </div>
      <SidebarFooter>
         <div className="p-2">
          <NavLink href="#" icon={LifeBuoy}>Help & Support</NavLink>
          <a href="https://x.com/plawlost" target="_blank" rel="noopener noreferrer">
            <div className="flex items-center gap-3 mt-4 px-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src="https://unavatar.io/twitter/plawlost" />
                <AvatarFallback className="bg-muted text-primary font-semibold text-xs">P</AvatarFallback>
              </Avatar>
              <p className={cn("text-xs text-muted-foreground font-sans transition-opacity whitespace-nowrap", open ? "opacity-100" : "opacity-0")}>
                built by plawlost
              </p>
            </div>
          </a>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="container flex h-14 items-center">
        <SidebarTrigger>
           <PanelLeft className="w-5 h-5" />
        </SidebarTrigger>
        <div className="flex items-center gap-2 ml-4 md:hidden">
           <div className="w-2.5 h-2.5 bg-primary rounded-full" />
           <h2 className="text-md font-semibold">sidegate</h2>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <TooltipProvider delayDuration={0}>
       <SidebarProvider className="bg-background text-foreground font-mono">
        <AppSidebar />
        <SidebarInset className="flex flex-col">
          <SiteHeader />
          <div className="flex-1 overflow-y-auto">
            <div className="container py-8 px-4 sm:px-6 lg:px-8 space-y-24">
              {/* Hero Section */}
              <section className="relative flex flex-col justify-center items-center text-center py-12 md:py-20">
                <div className="relative z-10 max-w-4xl">
                  <Badge variant="secondary" className="px-4 py-2 text-sm font-medium mb-8">
                    <Terminal className="w-4 h-4 mr-2" />
                    hackclub 100h oss sprint
                  </Badge>
                  
                  <div className="space-y-6 mb-12">
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
                      drag any app.<br />unblock instantly.
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-sans">
                      sidegate spins up a private wireguard tunnel for that one app. the rest of your mac stays outside the vpn, fast and quiet.
                    </p>
                  </div>
                  
                  <div className="mb-16">
                    <WaitlistForm />
                  </div>
                  
                  <DragDemo />
                </div>
              </section>
            
              {/* Why Sidegate */}
              <section id="why-sidegate" className="scroll-mt-20">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold">why sidegate</h2>
                </div>
                <Card className="border-2">
                  <CardContent className="p-8">
                    <div className="text-center space-y-6 text-base md:text-lg leading-relaxed font-sans">
                      <p className="text-muted-foreground">
                        in turkey, iran, russia, and many other places, apps like telegram, x, instagram, and wikipedia are blocked or throttled.
                      </p>
                      <p className="text-muted-foreground">
                        a full-device vpn slows every connection and draws attention.
                      </p>
                      <p className="text-muted-foreground">
                        sidegate tunnels only the traffic you choose and leaves everything else untouched.
                      </p>
                      <Separator className="my-6" />
                      <p className="text-xl font-semibold text-foreground font-mono">
                        fast. local. trusted.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Features */}
              <section id="features" className="scroll-mt-20">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold">features v0.1</h2>
                  <p className="text-lg text-muted-foreground font-sans mt-2">
                    built for power users, designed for simplicity
                  </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { icon: Shield, feature: "per-app split tunneling", desc: "route only what you need" },
                    { icon: Lock, feature: "runs completely offline", desc: "no data leaves your mac" },
                    { icon: Zap, feature: "one-click connect", desc: "go live in seconds" },
                    { icon: Users, feature: "auto shutdown on exit", desc: "zero overhead when idle" },
                    { icon: Download, feature: "real-time latency badge", desc: "see performance at a glance" },
                    { icon: Github, feature: "mit licensed, self-hostable", desc: "inspect every line" }
                  ].map((item, i) => (
                    <Card key={i} className="group hover:shadow-sm transition-shadow duration-200 h-full">
                      <CardContent className="p-5 flex items-start gap-4">
                        <div className="w-8 h-8 bg-muted rounded-md flex items-center justify-center flex-shrink-0 mt-1">
                          <item.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-semibold text-base">{item.feature}</h3>
                          <p className="text-sm text-muted-foreground font-sans">{item.desc}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* How It Works */}
              <section id="how-it-works" className="scroll-mt-20">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold">
                    how sidegate works
                  </h2>
                  <p className="text-lg text-muted-foreground font-sans mt-2">
                    engineered for speed and reliability
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>split routing engine</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm text-muted-foreground font-sans">
                      <p>• per-app network route injection</p>
                      <p>• domain resolution override</p>
                      <p>• upstream dns configuration</p>
                      <p>• traffic classification by pid</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>lifecycle automation</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm text-muted-foreground font-sans">
                      <p>• silent activation on app launch</p>
                      <p>• automatic shutdown on exit</p>
                      <p>• process monitoring hooks</p>
                      <p>• zero configuration required</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>smart domain mapping</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm text-muted-foreground font-sans">
                      <p>• dynamic domain discovery</p>
                      <p>• api subdomain routing</p>
                      <p>• cdn endpoint mapping</p>
                      <p>• certificate transparency</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>hardened security</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm text-muted-foreground font-sans">
                      <p>• wireguard cryptography</p>
                      <p>• minimal attack surface</p>
                      <p>• no cloud dependencies</p>
                      <p>• local key management</p>
                    </CardContent>
                  </Card>
                </div>
                 <div className="mt-8 text-center">
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-sm font-mono text-muted-foreground">
                        supports telegram • tiktok • whatsapp • facebook • x.com • instagram • youtube • wikipedia • signal • discord + any upcoming domains
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Open Source */}
              <section id="open-source" className="scroll-mt-20">
                <div className="text-center">
                  <Card className="bg-muted/50">
                    <CardContent className="p-8">
                       <div className="w-16 h-16 mx-auto mb-6 bg-background rounded-lg flex items-center justify-center">
                        <Github className="w-8 h-8 text-primary" />
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        open source, no secrets
                      </h2>
                      <p className="text-lg text-muted-foreground mb-8 font-sans">
                        every commit lives on github under the mit license
                      </p>
                      <Button variant="outline" size="lg" className="group font-medium" asChild>
                        <a href="https://github.com/plawlost/sidegate.git">
                          <Github className="w-4 h-4 mr-2" />
                          view on github
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </section>
              
              {/* Footer */}
              <footer className="py-12 border-t">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <p className="text-sm text-muted-foreground font-sans">
                    built by plawlost during the hackclub 100h oss sprint
                  </p>
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" asChild>
                      <a href="https://x.com/plawlost" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground text-sm">
                        @plawlost
                      </a>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <a href="https://github.com/plawlost/sidegate.git" className="text-muted-foreground hover:text-foreground text-sm">
                        sidegate github
                      </a>
                    </Button>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
