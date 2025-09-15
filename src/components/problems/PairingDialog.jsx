// Dialog component that manages partner pairing flow with options, countdown, success, and failure states.
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { Loader2, UserSearch, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PairingDialog({ open, onOpenChange }) {
  const [step, setStep] = useState("options"); // options | connecting | failed
  const [partnerId, setPartnerId] = useState("");
  const [countdown, setCountdown] = useState(45);
  const navigate = useNavigate();

  // Handle connecting state countdown + matching simulation
  useEffect(() => {
    if (step !== "connecting") return;

    if (countdown === 0) {
      setStep("failed");
      return;
    }

    const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);

    // Simulate partner matching
    const matchTimer = setTimeout(() => {
      if (Math.random() > 0.1) {
        onOpenChange(false);
        navigate("/problems/1");
      }
    }, Math.random() * 15000 + 5000);

    return () => {
      clearTimeout(timer);
      clearTimeout(matchTimer);
    };
  }, [step, countdown, onOpenChange, navigate]);

  // Reset state when dialog closes
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setStep("options");
        setCountdown(45);
        setPartnerId("");
      }, 300);
    }
  }, [open]);

  const handleStartConnecting = () => setStep("connecting");
  const handleCancel = () => onOpenChange(false);

  const renderContent = () => {
    if (step === "options") {
      return (
        <>
          <DialogHeader>
            <DialogTitle>Pair Up for a Challenge</DialogTitle>
            <DialogDescription>
              How would you like to find a partner?
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-6">
            {/* Connect with specific user */}
            <div className="space-y-2">
              <Label htmlFor="partner-id">Connect with a specific user</Label>
              <div className="flex gap-2">
                <Input
                  id="partner-id"
                  placeholder="Enter user ID"
                  value={partnerId}
                  onChange={(e) => setPartnerId(e.target.value)}
                />
                <Button
                  onClick={handleStartConnecting}
                  disabled={!partnerId.trim()}
                >
                  <UserSearch className="mr-2 h-4 w-4" />
                  Connect
                </Button>
              </div>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or
                </span>
              </div>
            </div>

            {/* Random Partner */}
            <Button
              variant="secondary"
              className="w-full"
              onClick={handleStartConnecting}
            >
              <Globe className="mr-2 h-4 w-4" />
              Find a Random Partner
            </Button>
          </div>
        </>
      );
    }

    if (step === "connecting") {
      return (
        <>
          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl font-bold">
              Connecting...
            </DialogTitle>
            <DialogDescription>
              Searching for a partner. This may take up to a minute.
            </DialogDescription>
          </DialogHeader>

          <div className="py-8 flex flex-col items-center justify-center gap-4">
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
            <p className="text-4xl font-bold font-mono">{countdown}s</p>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </DialogFooter>
        </>
      );
    }

    if (step === "failed") {
      return (
        <>
          <DialogHeader>
            <DialogTitle>No Partner Found</DialogTitle>
            <DialogDescription>
              We couldn't find a partner for you at this time. Please try again.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="pt-4">
            <Button variant="outline" onClick={handleCancel}>
              Close
            </Button>
            <Button
              onClick={() => {
                setStep("options");
                setCountdown(45);
              }}
            >
              Try Again
            </Button>
          </DialogFooter>
        </>
      );
    }

    return null;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>{renderContent()}</DialogContent>
    </Dialog>
  );
}
