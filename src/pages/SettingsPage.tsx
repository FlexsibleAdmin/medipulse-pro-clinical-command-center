import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, Lock, User, Palette } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
export function SettingsPage() {
  return (
    <AppLayout container contentClassName="space-y-8">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account preferences and application settings.
        </p>
      </div>
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Alerts</TabsTrigger>
          <TabsTrigger value="appearance">Display</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details and public profile.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <Button variant="outline">Change Avatar</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input id="firstName" defaultValue="Sarah" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input id="lastName" defaultValue="Chen" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue="sarah.chen@medipulse.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" defaultValue="Cardiology Head" disabled />
                </div>
              </div>
              <div className="flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Configure how you receive alerts and updates.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between space-x-2">
                <div className="flex flex-col space-y-1">
                  <Label className="text-base">Critical Alerts</Label>
                  <span className="text-sm text-muted-foreground">Receive immediate notifications for critical patient vitals.</span>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <div className="flex flex-col space-y-1">
                  <Label className="text-base">Appointment Reminders</Label>
                  <span className="text-sm text-muted-foreground">Get notified 15 minutes before scheduled appointments.</span>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <div className="flex flex-col space-y-1">
                  <Label className="text-base">Lab Results</Label>
                  <span className="text-sm text-muted-foreground">Notify when new lab results are available.</span>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize the look and feel of the application.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base">Theme</Label>
                  <p className="text-sm text-muted-foreground">
                    Select your preferred theme for the dashboard.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground mr-2">Toggle Mode:</span>
                  <ThemeToggle className="relative top-0 right-0" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your password and session settings.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Security settings are managed by the organization administrator.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
}