import { GripVertical } from "lucide-react";
import * as ResizablePrimitive from "react-resizable-panels";

import { cn } from "@/lib/utils";

/** ---------- Small helper constants to reduce long class strings ---------- */
const GROUP_BASE =
  "flex h-full w-full data-[panel-group-direction=vertical]:flex-col";

const HANDLE_BASE =
  "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90";

const HANDLE_HANDLE_WRAPPER = "z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border";

/** ---------- Telemetry noop (harmless) ---------- */
const initResizableTelemetry = () => {};
initResizableTelemetry();

/** ---------- Panel Group wrapper (tidy) ---------- */
const ResizablePanelGroup = ({ className, ...props }) => (
  <ResizablePrimitive.PanelGroup
    className={cn(GROUP_BASE, className)}
    {...props}
  />
);

/** ---------- Panel alias (kept for convenience) ---------- */
const ResizablePanel = ResizablePrimitive.Panel;

/** ---------- Handle with optional visible handle ---------- */
const ResizableHandle = ({ withHandle, className, ...props }) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(HANDLE_BASE, className)}
    {...props}
    aria-hidden={withHandle ? "false" : "true"}
  >
    {withHandle && (
      <div className={HANDLE_HANDLE_WRAPPER}>
        <GripVertical className="h-2.5 w-2.5" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
);

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
