import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    // Backend API call: send reset link to email
    console.log("Sending reset link to", data.email);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        
        {/* Header */}
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold font-headline">
            Forgot Password?
          </CardTitle>
          <CardDescription>
            Enter your registered email to reset your password
          </CardDescription>
        </CardHeader>

        {/* Form */}
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  className="pl-10"
                  {...register("email", { required: "Email is required" })}
                />
              </div>
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full">
              Send Reset Link
            </Button>
          </form>

          {/* Info */}
          <p className="text-xs text-muted-foreground text-center mt-4">
            We’ll send you an email with instructions to reset your password.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default ForgotPassword;
