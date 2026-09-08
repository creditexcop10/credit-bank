"use client";

import { useEffect, useState } from "react";
import { Menu, Bell, Search, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  const supabase = createSupabaseBrowserClient();
  const [userName, setUserName] = useState<string>("User");
  const [userId, setUserId] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  const { theme, setTheme } = useTheme();

  // Get User
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        if (user.user_metadata?.first_name) {
          setUserName(user.user_metadata.first_name);
        }
      }
    };
    getUser();
  }, [supabase]);

  // Get Notifications
  useEffect(() => {
    if (!userId) return;
    
    const fetchNotifs = async () => {
      const { data } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(5);
      
      setNotifications(data || []);
    };

    fetchNotifs();

    // Optional: Refresh notifications every 30 seconds
    const interval = setInterval(fetchNotifs, 30000);
    return () => clearInterval(interval);
  }, [userId, supabase]);

  // Mark as read when opened
  const handleMarkRead = async () => {
    if (notifications.some(n => !n.read)) {
      await supabase.from("notifications").update({ read: true }).eq("user_id", userId).eq("read", false);
      // Update local state instantly
      setNotifications(notifications.map(n => ({ ...n, read: true })));
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background/80 px-4 backdrop-blur-md md:px-6">
      <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuClick}>
        <Menu className="h-5 w-5" />
      </Button>

      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input type="search" placeholder="Search transactions..." className="pl-10 bg-muted/50 border-transparent focus-visible:border-border" />
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          <Sun className="h-5 w-5 dark:hidden" />
          <Moon className="hidden h-5 w-5 dark:block" />
        </Button>

        <DropdownMenu>
          {/* Removed asChild and nested button. Applied classes and onClick directly to Trigger */}
          <DropdownMenuTrigger 
            className="relative p-2 rounded-full hover:bg-muted transition-colors focus:outline-none" 
            onClick={handleMarkRead}
          >
            <Bell className="h-5 w-5 text-muted-foreground" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 h-4 w-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72 p-0">
            <div className="p-3 border-b border-border">
              <p className="text-sm font-bold text-foreground">Notifications</p>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-xs text-muted-foreground">No new notifications</div>
              ) : (
                notifications.map((notif) => (
                  <DropdownMenuItem key={notif.id} className="flex flex-col items-start p-3 border-b border-border last:border-0 cursor-default">
                    <div className="flex items-center gap-2 w-full">
                      {!notif.read && <span className="h-2 w-2 rounded-full bg-blue-500"></span>}
                      <p className="text-sm font-semibold text-foreground">{notif.title}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{notif.description}</p>
                    <p className="text-[10px] text-muted-foreground/70 mt-1">{new Date(notif.created_at).toLocaleString()}</p>
                  </DropdownMenuItem>
                ))
              )}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center gap-2 pl-2 border-l border-border">
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-foreground leading-none">{userName}</p>
            <p className="text-xs text-muted-foreground mt-1">Premium Account</p>
          </div>
        </div>
      </div>
    </header>
  );
}