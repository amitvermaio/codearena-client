import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Switch } from "../../components/ui/switch";

export default function AccountSettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">Account Settings</h1>

      {/* Personal Information Section */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Update your account's personal information.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" defaultValue="Jane Doe" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" defaultValue="jane.doe@codearena.io" />
          </div>
        </CardContent>

        <CardFooter className="border-t px-6 py-4">
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>

      {/* Notifications Section */}
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            Manage your notification preferences.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Email Notifications */}
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive emails about your account activity and new features.
              </p>
            </div>
            <Switch id="email-notifications" defaultChecked />
          </div>

          {/* Contest Reminders */}
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <Label htmlFor="contest-reminders">Contest Reminders</Label>
              <p className="text-sm text-muted-foreground">
                Get notified before a contest you've registered for begins.
              </p>
            </div>
            <Switch id="contest-reminders" defaultChecked />
          </div>
        </CardContent>

        <CardFooter className="border-t px-6 py-4">
          <Button>Save Preferences</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
