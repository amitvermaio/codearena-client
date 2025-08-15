import React, { useState, useRef, useEffect } from "react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Link } from "lucide-react";

const ImageUpdateDialog = ({ isOpen, onOpenChange, onSave, aspect }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState();
  const [urlInput, setUrlInput] = useState("");

  const imgRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleClose = () => {
    setImageSrc(null);
    setUrlInput("");
    setCrop(undefined);
    onOpenChange(false);
  };

  useEffect(() => {
    if (!isOpen) {
      setImageSrc(null);
      setUrlInput("");
      setCrop(undefined);
    }
  }, [isOpen]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlLoad = () => {
    if (urlInput.match(/\.(jpeg|jpg|gif|png)$/) != null) {
      setImageSrc(urlInput);
    } else {
      alert("Please enter a valid image URL ending in .jpg, .jpeg, .png, or .gif");
    }
  };

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    const initialCrop = centerCrop(
      makeAspectCrop({ unit: "%", width: 90 }, aspect, width, height),
      width,
      height
    );
    setCrop(initialCrop);
  };

  const handleSaveCrop = () => {
    if (!imgRef.current || !crop?.width || !crop?.height) return;

    const canvas = document.createElement("canvas");
    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;

    canvas.width = crop.width * scaleX;
    canvas.height = crop.height * scaleY;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(
      imgRef.current,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      canvas.width,
      canvas.height
    );

    const dataUrl = canvas.toDataURL("image/png");
    onSave(dataUrl);
    handleClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Update Image</DialogTitle>
          <DialogDescription>
            Upload a new image or provide a URL. Adjust the image and click save.
          </DialogDescription>
        </DialogHeader>

        {!imageSrc ? (
          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload">
                <Upload className="mr-2 h-4 w-4" />
                Upload Photo
              </TabsTrigger>
              <TabsTrigger value="link">
                <Link className="mr-2 h-4 w-4" />
                Use Link
              </TabsTrigger>
            </TabsList>

            {/* Upload Tab */}
            <TabsContent value="upload" className="mt-4">
              <div className="flex flex-col items-center justify-center space-y-4 p-8 border-2 border-dashed rounded-lg">
                <Upload className="h-12 w-12 text-muted-foreground" />
                <p className="text-muted-foreground">Drag & drop or click to upload</p>
                <Button type="button" onClick={() => fileInputRef.current?.click()}>
                  Choose File
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
            </TabsContent>

            {/* URL Tab */}
            <TabsContent value="link" className="mt-4">
              <div className="space-y-2 p-4">
                <Label htmlFor="imageUrl">Image URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="imageUrl"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://example.com/image.png"
                  />
                  <Button type="button" onClick={handleUrlLoad}>
                    Load
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="my-4 flex justify-center items-center">
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              aspect={aspect}
              minWidth={100}
            >
              <img
                ref={imgRef}
                src={imageSrc}
                onLoad={onImageLoad}
                alt="Crop preview"
                style={{ maxHeight: "60vh" }}
              />
            </ReactCrop>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          {imageSrc && (
            <>
              <Button variant="ghost" onClick={() => setImageSrc(null)}>
                Change Image
              </Button>
              <Button onClick={handleSaveCrop}>Save Image</Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ImageUpdateDialog;