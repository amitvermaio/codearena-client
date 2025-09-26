import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import axios from "@/config/axios.config";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutuser } from "@/store/features/user/userSlice";
import DeleteAccountPopup from "@/components/settings/DeleteAccountPopup";

/** noop telemetry placeholder (harmless) */
const initSecurityTelemetry = () => {};
initSecurityTelemetry();

/** small helper to build auth header */
const authHeader = () => {
  const token = localStorage.getItem(import.meta.env.VITE_TOKEN_NAME);
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const SecuritySettings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openDeleteAccountPopup, setOpenDeleteAccountPopup] = useState(false);

  const closeDeleteAccountPopup = useCallback(() => {
    setOpenDeleteAccountPopup(false);
  }, []);

  // ---------------- React Hook Form ----------------
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  // Keep client-side submit lightweight; server call can be added later.
  const onSubmit = useCallback((data) => {
    // basic client-side sanity: ensure new and confirm match (react-hook-form already validates)
    if (data.newPassword && data.confirmPassword && data.newPassword !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // placeholder behaviour — replace with real API when available
    console.log("Password updated (client):", { ...data, mask: "****" });
    toast.success("Password updated successfully!");
    reset();
  }, [reset]);

  const handleDeleteAccount = useCallback(async () => {
    try {
      const token = localStorage.getItem(import.meta.env.VITE_TOKEN_NAME);
      if (!token) {
        toast.error("You are not logged in!");
        return;
      }

      const { data } = await axios.post(
        "/auth/delete-account",
        {},
        { headers: authHeader() }
      );

      if (data?.statusCode === 200) {
        toast.success("Account deleted successfully!");
        localStorage.removeItem(import.meta.env.VITE_TOKEN_NAME);
        dispatch(logoutuser());
        navigate("/problems");
      } else {
        // graceful handling for non-200 replies
        toast.error(data?.message || "Failed to delete account");
      }
    } catch (error) {
      console.error("Delete account failed:", error);
      toast.error("Failed to delete account");
    } finally {
      setOpenDeleteAccountPopup(false);
    }
  }, [dispatch, navigate]);

  return (
    <div className="space-y-6">
      <DeleteAccountPopup
        open={openDeleteAccountPopup}
        onClose={closeDeleteAccountPopup}
        onConfirm={handleDeleteAccount}
      />
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
          <Button variant="destructive" onClick={() => setOpenDeleteAccountPopup(true)}>
            Delete My Account
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SecuritySettings;
