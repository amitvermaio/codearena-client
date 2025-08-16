import React from "react";
import { useForm } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

// ---------------- Redux Version Imports (Comment if not using) ----------------
// import { useSelector, useDispatch } from "react-redux";
// import { updatePassword, deleteAccount } from "@/redux/securitySlice";

const SecuritySettings = () => {
  // ---------------- React Hook Form ----------------
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = (data) => {
    console.log("Password updated:", data);
    toast.success("Password updated successfully!");
    reset();
  };

  const handleDeleteAccount = () => {
    console.log("Account deleted");
    toast.error("Your account has been deleted!");
  };

  // ---------------- Redux Version (using react-hook-form values) ----------------
  // const dispatch = useDispatch();
  // const onSubmit = (data) => {
  //   dispatch(updatePassword(data));
  // };
  // const handleDeleteAccount = () => {
  //   dispatch(deleteAccount());
  // };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">Security</h1>

      {/* Change Password Section */}
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            It's a good idea to use a strong password that you're not using elsewhere.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            {/* Current Password */}
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input
                id="current-password"
                type="password"
                {...register("currentPassword", { required: "Current password is required" })}
              />
              {errors.currentPassword && (
                <p className="text-sm text-red-500">{errors.currentPassword.message}</p>
              )}
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                {...register("newPassword", {
                  required: "New password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" }
                })}
              />
              {errors.newPassword && (
                <p className="text-sm text-red-500">{errors.newPassword.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input
                id="confirm-password"
                type="password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value, formValues) =>
                    value === formValues.newPassword || "Passwords do not match"
                })}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>
          </CardContent>

          <CardFooter className="border-t px-6 py-4">
            <Button type="submit">Update Password</Button>
          </CardFooter>
        </form>
      </Card>

      {/* Delete Account Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-destructive">Delete Account</CardTitle>
          <CardDescription>
            Permanently delete your account and all of its content from the platform. This action is not reversible.
          </CardDescription>
        </CardHeader>
        <CardFooter className="border-t px-6 py-4 flex justify-end">
          <Button variant="destructive" onClick={handleDeleteAccount}>
            Delete My Account
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SecuritySettings;
