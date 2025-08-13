import React, { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const otpRef = useRef("");

  const handleVerify = () => {
    const otpValue = otpRef.current; // This can be linked with Redux later
    // In a real app, you'd verify the OTP here.
    navigate("/problems");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold font-headline">
            Check your email
          </CardTitle>
          <CardDescription>
            We've sent a 6-digit code to your email address.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              onChange={(value) => (otpRef.current = value)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <Button type="button" className="w-full" onClick={handleVerify}>
            Verify
          </Button>
        </CardContent>
        <CardFooter className="flex-col items-center space-y-2">
          <div className="text-sm text-muted-foreground">
            Didn't receive the email?{" "}
            <Link to="#" className="underline">
              Resend code
            </Link>
          </div>
          <Button variant="link" asChild>
            <Link to="/create-account">Back to sign up</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default VerifyEmail;