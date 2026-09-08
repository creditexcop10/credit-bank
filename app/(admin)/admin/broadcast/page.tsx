"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; // Install if missing: npx shadcn@latest add textarea
import { Loader2, Megaphone, Send } from "lucide-react";
import { toast } from "sonner";

export default function AdminBroadcastPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [sendEmail, setSendEmail] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      setUsers(data || []);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const handleUserToggle = (id: string) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter(uId => uId !== id));
    } else {
      setSelectedUsers([...selectedUsers, id]);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    const res = await fetch("/api/admin/broadcast", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        message,
        userIds: selectedUsers,
        sendEmail
      }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success(data.message || "Broadcast sent successfully!");
      setTitle("");
      setMessage("");
      setSelectedUsers([]);
      setSendEmail(false);
    } else {
      toast.error(data.error || "Failed to send broadcast.");
    }
    setSending(false);
  };

  if (loading) return <div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Broadcast Center</h1>
        <p className="text-muted-foreground">Send in-app notifications and emails to your users.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Compose Message */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader><CardTitle>Compose Message</CardTitle></CardHeader>
            <CardContent>
              <form onSubmit={handleSend} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Subject / Title</Label>
                  <Input id="title" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Scheduled Maintenance" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" required value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message here..." rows={5} />
                </div>
                
                <div className="flex items-center space-x-2 p-4 bg-muted/50 rounded-lg">
                  <input 
                    type="checkbox" 
                    id="sendEmail" 
                    checked={sendEmail} 
                    onChange={(e) => setSendEmail(e.target.checked)} 
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <Label htmlFor="sendEmail" className="cursor-pointer">Also send as Email (via Brevo)</Label>
                </div>

                <Button type="submit" disabled={sending} className="w-full bg-primary hover:bg-primary/90">
                  {sending ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Sending...</> : <><Send className="h-4 w-4 mr-2" /> Send Broadcast</>}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Select Recipients */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recipients</CardTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  if (selectedUsers.length === users.length) setSelectedUsers([]);
                  else setSelectedUsers(users.map(u => u.id));
                }}
              >
                {selectedUsers.length === users.length ? "Deselect All" : "Select All"}
              </Button>
            </CardHeader>
            <CardContent className="max-h-[400px] overflow-y-auto space-y-2">
              {users.map((user) => (
                <div key={user.id} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted/50 cursor-pointer" onClick={() => handleUserToggle(user.id)}>
                  <input 
                    type="checkbox" 
                    checked={selectedUsers.includes(user.id)} 
                    readOnly 
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <div>
                    <p className="text-sm font-medium text-foreground">{user.first_name} {user.last_name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>
              ))}
            </CardContent>
            {selectedUsers.length === 0 && (
              <div className="p-4 text-center text-xs text-muted-foreground border-t">
                No users selected. Message will send to ALL users.
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}