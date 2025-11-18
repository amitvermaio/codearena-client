import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const DeleteAccountPopup = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}>

      {/* BACKDROP SHOULD BE INSIDE PORTAL BUT OUTSIDE CONTENT */}
      {open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md transition-all duration-300 z-40" />
      )}

      <DialogContent
        className="
          z-50
          fixed top-1/2 left-1/2 
          -translate-x-1/2 -translate-y-1/2    /* FORCE CENTER */
          
          max-w-md w-full
          rounded-2xl 
          p-6
          border border-white/10 
          bg-[#0f0f0f]/80
          backdrop-blur-2xl
          shadow-[0_0_20px_rgba(0,0,0,0.6)]
          
          data-[state=open]:animate-in
          data-[state=open]:fade-in-0
          data-[state=open]:zoom-in-95
        "
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-red-500 tracking-tight">
            Delete Account
          </DialogTitle>

          <DialogDescription className="text-neutral-400 text-[15px] mt-1 leading-relaxed">
            This action is permanent and cannot be undone. Your CodeArena data will be permanently removed.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex justify-end gap-4 mt-6">
          <Button
            variant="outline"
            className="border-neutral-700 text-neutral-300 hover:bg-neutral-800 hover:text-white rounded-lg px-5"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            className="bg-red-600 hover:bg-red-700 text-white rounded-lg px-5 shadow-md hover:shadow-red-700/30"
            onClick={onConfirm}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAccountPopup;
