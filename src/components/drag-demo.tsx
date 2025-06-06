"use client";

import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Plus, Loader2, Power, PowerOff, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock app data with server assignments
const MOCK_APPS = [
  { id: "telegram", name: "Telegram", domain: "telegram.org", server: "europe", serverName: "Amsterdam" },
  { id: "tiktok", name: "TikTok", domain: "tiktok.com", server: "asia", serverName: "Singapore" },
  { id: "whatsapp", name: "WhatsApp", domain: "whatsapp.com", server: "us", serverName: "New York" },
  { id: "facebook", name: "Facebook", domain: "facebook.com", server: "us", serverName: "California" },
  { id: "twitter", name: "X", domain: "twitter.com", server: "us", serverName: "Texas" },
  { id: "instagram", name: "Instagram", domain: "instagram.com", server: "europe", serverName: "Frankfurt" },
  { id: "youtube", name: "YouTube", domain: "youtube.com", server: "asia", serverName: "Tokyo" },
  { id: "wikipedia", name: "Wikipedia", domain: "wikipedia.org", server: "europe", serverName: "London" },
  { id: "signal", name: "Signal", domain: "signal.org", server: "us", serverName: "Oregon" },
  { id: "discord", name: "Discord", domain: "discord.com", server: "asia", serverName: "Seoul" },
];

const SERVER_COLORS = {
  us: "bg-blue-500/20 text-blue-600 border-blue-500/30",
  europe: "bg-green-500/20 text-green-600 border-green-500/30", 
  asia: "bg-orange-500/20 text-orange-600 border-orange-500/30"
};

interface DroppedApp {
  id: string;
  name: string;
  domain: string;
  server: string;
  serverName: string;
  x: number;
  y: number;
  isConnecting: boolean;
  isActive: boolean;
}

export function DragDemo() {
  const [isDragOver, setIsDragOver] = useState(false);
  const [droppedApps, setDroppedApps] = useState<DroppedApp[]>([]);
  const [draggedApp, setDraggedApp] = useState<typeof MOCK_APPS[0] | null>(null);
  const [duplicateAttempt, setDuplicateAttempt] = useState<string | null>(null);
  const [reDraggedApp, setReDraggedApp] = useState<{ index: number; offsetX: number; offsetY: number } | null>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (app: typeof MOCK_APPS[0]) => {
    setDraggedApp(app);
    setDuplicateAttempt(null);
    setReDraggedApp(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);

    if (reDraggedApp && dropZoneRef.current) {
      const rect = dropZoneRef.current.getBoundingClientRect();
      const newX = e.clientX - rect.left - reDraggedApp.offsetX;
      const newY = e.clientY - rect.top - reDraggedApp.offsetY;

      setDroppedApps(prev => {
        const newApps = [...prev];
        const appToMove = newApps[reDraggedApp.index];
        if (appToMove) {
          newApps[reDraggedApp.index] = {
            ...appToMove,
            x: Math.max(0, Math.min(newX, rect.width - 64)),
            y: Math.max(0, Math.min(newY, rect.height - 64)),
          };
        }
        return newApps;
      });
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    if (!dropZoneRef.current?.contains(e.relatedTarget as Node)) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    if (reDraggedApp) {
      setReDraggedApp(null);
      return;
    }

    if (!draggedApp || !dropZoneRef.current) return;

    // Check for duplicates
    const exists = droppedApps.find(app => app.id === draggedApp.id);
    if (exists) {
      setDuplicateAttempt(draggedApp.name);
      setTimeout(() => setDuplicateAttempt(null), 3000);
      setDraggedApp(null);
      return;
    }

    const x = e.clientX - dropZoneRef.current.getBoundingClientRect().left;
    const y = e.clientY - dropZoneRef.current.getBoundingClientRect().top;

    // Add some randomness to prevent exact overlap
    const randomOffset = () => (Math.random() - 0.5) * 20;

    const newApp: DroppedApp = {
      ...draggedApp,
      x: Math.max(20, Math.min(x + randomOffset(), dropZoneRef.current.getBoundingClientRect().width - 80)),
      y: Math.max(20, Math.min(y + randomOffset(), dropZoneRef.current.getBoundingClientRect().height - 80)),
      isConnecting: true,
      isActive: false,
    };

    setDroppedApps(prev => [...prev, newApp]);

    // Simulate connection process
    setTimeout(() => {
      setDroppedApps(prev => 
        prev.map(app => 
          app.id === newApp.id && app.x === newApp.x 
            ? { ...app, isConnecting: false, isActive: true }
            : app
        )
      );
    }, 1500 + Math.random() * 1000); // 1.5-2.5s connection time

    setDraggedApp(null);
  };

  const handleReDragStart = (e: React.DragEvent, index: number) => {
    const app = droppedApps[index];
    if (app.isConnecting) {
      e.preventDefault();
      return;
    }
    const node = e.currentTarget as HTMLElement;
    const rect = node.getBoundingClientRect();
    setReDraggedApp({
      index,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
    });
    setDraggedApp(null);

    const img = new Image();
    img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
    e.dataTransfer.setDragImage(img, 0, 0);
  };

  const handleReDragEnd = () => {
    setReDraggedApp(null);
  };

  const toggleApp = (appId: string, x: number, y: number) => {
    setDroppedApps(prev =>
      prev.map(app =>
        app.id === appId && app.x === x && app.y === y
          ? { ...app, isActive: !app.isActive }
          : app
      )
    );
  };

  const removeApp = (appId: string, x: number, y: number) => {
    setDroppedApps(prev =>
      prev.filter(app => !(app.id === appId && app.x === x && app.y === y))
    );
  };

  const clearApps = () => {
    setDroppedApps([]);
  };

  const activeApps = droppedApps.filter(app => app.isActive);
  const connectingApps = droppedApps.filter(app => app.isConnecting);

  return (
    <div className="space-y-6">
      {/* Available Apps */}
      <div className="text-center space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">
          drag any app below into the tunnel zone
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          {MOCK_APPS.map((app) => {
            const isDropped = droppedApps.some(dropped => dropped.id === app.id);
            return (
              <div
                key={app.id}
                draggable={!isDropped}
                onDragStart={() => handleDragStart(app)}
                className={cn(
                  "group transition-all duration-200",
                  isDropped 
                    ? "opacity-50 cursor-not-allowed" 
                    : "cursor-grab active:cursor-grabbing"
                )}
              >
                <Card className={cn(
                  "w-16 h-16 p-2 transition-all duration-200",
                  !isDropped && "hover:shadow-sm group-hover:scale-105"
                )}>
                  <CardContent className="p-0 flex items-center justify-center h-full">
                    <img
                      src={`https://logo.clearbit.com/${app.domain}`}
                      alt={app.name}
                      className="w-8 h-8 rounded"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.parentElement!.innerHTML = `
                          <div class="w-8 h-8 rounded bg-primary/20 flex items-center justify-center text-xs font-mono text-primary">
                            ${app.name.slice(0, 2).toUpperCase()}
                          </div>
                        `;
                      }}
                    />
                  </CardContent>
                </Card>
                <p className={cn(
                  "text-xs text-center mt-1 transition-colors",
                  isDropped 
                    ? "text-muted-foreground/50" 
                    : "text-muted-foreground group-hover:text-foreground"
                )}>
                  {app.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Duplicate Warning */}
      {duplicateAttempt && (
        <div className="text-center">
          <Badge variant="destructive" className="animate-in fade-in-50 duration-300">
            {duplicateAttempt} is already tunneled
          </Badge>
        </div>
      )}

      {/* Drop Zone */}
      <Card
        ref={dropZoneRef}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative min-h-64 transition-all duration-300",
          isDragOver && "border-primary border-2 shadow-lg",
          droppedApps.length === 0 && "border-dashed"
        )}
      >
        <CardContent className="p-8 h-full relative">
          {droppedApps.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-center">
              <div className={cn(
                "w-16 h-16 rounded-lg border-2 border-dashed flex items-center justify-center mb-4 transition-all duration-300",
                isDragOver ? "border-primary bg-primary/10" : "border-muted-foreground/30"
              )}>
                <Plus className={cn(
                  "w-8 h-8 transition-colors duration-300",
                  isDragOver ? "text-primary" : "text-muted-foreground"
                )} />
              </div>
              <h3 className="font-semibold mb-2">sidegate tunnel zone</h3>
              <p className="text-sm text-muted-foreground">
                {isDragOver ? "drop here to tunnel through wireguard" : "drag apps here to route through tunnel"}
              </p>
            </div>
          ) : (
            <>
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  {activeApps.length} active • {connectingApps.length} connecting
                </Badge>
                <button
                  onClick={clearApps}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  clear all
                </button>
              </div>
              
              {/* Dropped Apps */}
              {droppedApps.map((app, index) => (
                <div
                  key={`${app.id}-${index}`}
                  draggable={!app.isConnecting}
                  onDragStart={(e) => handleReDragStart(e, index)}
                  onDragEnd={handleReDragEnd}
                  style={{
                    position: 'absolute',
                    left: app.x,
                    top: app.y,
                    zIndex: index + 1,
                    transition: reDraggedApp?.index === index ? 'none' : 'all 0.3s ease',
                  }}
                  className={cn(
                    "group animate-in zoom-in-50",
                    !app.isConnecting ? "cursor-grab" : "cursor-default",
                    reDraggedApp?.index === index && "opacity-75 scale-105 shadow-2xl z-50"
                  )}
                >
                  <Card className={cn(
                    "w-16 h-16 p-2 shadow-sm border-2 transition-all duration-300",
                    app.isConnecting && "border-yellow-500/50 bg-yellow-50/50",
                    app.isActive && "border-green-500/50 bg-green-50/50",
                    !app.isActive && !app.isConnecting && "border-red-500/50 bg-red-50/50"
                  )}>
                    <CardContent className="p-0 flex items-center justify-center h-full relative">
                      {app.isConnecting ? (
                        <Loader2 className="w-4 h-4 animate-spin text-yellow-600" />
                      ) : (
                        <img
                          src={`https://logo.clearbit.com/${app.domain}`}
                          alt={app.name}
                          className="w-8 h-8 rounded"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.parentElement!.innerHTML = `
                              <div class="w-8 h-8 rounded bg-primary/20 flex items-center justify-center text-xs font-mono text-primary">
                                ${app.name.slice(0, 1).toUpperCase()}
                              </div>
                            `;
                          }}
                        />
                      )}
                      
                      {/* Status indicator */}
                      <div className={cn(
                        "absolute -top-1 -right-1 w-3 h-3 rounded-full border border-white",
                        app.isConnecting && "bg-yellow-500",
                        app.isActive && "bg-green-500",
                        !app.isActive && !app.isConnecting && "bg-red-500"
                      )} />
                    </CardContent>
                  </Card>

                  {/* Hover Controls */}
                  {!app.isConnecting && (
                    <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-background border rounded-lg p-2 shadow-lg min-w-max z-20">
                      <div className="flex items-center gap-2 text-xs">
                        <div className={cn("flex items-center gap-1 px-2 py-1 rounded border", SERVER_COLORS[app.server as keyof typeof SERVER_COLORS])}>
                          <Globe className="w-3 h-3" />
                          {app.serverName}
                        </div>
                        <button
                          onClick={() => toggleApp(app.id, app.x, app.y)}
                          className={cn(
                            "p-1 rounded hover:bg-muted transition-colors",
                            app.isActive ? "text-green-600" : "text-red-600"
                          )}
                        >
                          {app.isActive ? <Power className="w-3 h-3" /> : <PowerOff className="w-3 h-3" />}
                        </button>
                        <button
                          onClick={() => removeApp(app.id, app.x, app.y)}
                          className="p-1 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Connection Status */}
                  {app.isConnecting && (
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                      <Badge variant="secondary" className="text-xs bg-yellow-50 text-yellow-700 border-yellow-200">
                        connecting to {app.serverName}...
                      </Badge>
                    </div>
                  )}
                </div>
              ))}

              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--primary)_1px,_transparent_1px)] bg-[length:20px_20px]" />
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {activeApps.length > 0 && (
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground font-sans">
            ✓ {activeApps.length} app{activeApps.length !== 1 ? 's' : ''} routing through private wireguard tunnel
          </p>
          <p className="text-xs text-muted-foreground font-mono">
            routes enabled • domains resolved • silent activation
          </p>
        </div>
      )}
    </div>
  );
} 