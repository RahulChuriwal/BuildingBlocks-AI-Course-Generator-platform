"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../ui/dialog";
import { Input } from "../../../ui/input";
import { Textarea } from "../../../ui/textarea";
import { Label } from "../../../ui/label";
import { Switch } from "../../../ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../../ui/select";
import { Button } from "../../../ui/button";
import { Sparkle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { toast } from "sonner";

function AddNewCourseDialog({ children }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    noOfChapters: 1,
    includeVideo: false,
    level: "",
    category: "",
  });

  const onHandleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const onGenerate = async () => {
    const courseId = uuidv4();

    try {
      setLoading(true);
      const result = await axios.post("/api/generate-course-layout", {
        ...formData,
        courseId,
      });

      if (result.data?.resp === "limit exceed") {
        toast.warning("Please subscribe to continue.");
        router.push("/workspace/billing");
      } else {
        router.push(`/workspace/edit-course/${result.data?.courseId}`);
      }
    } catch (err) {
      console.error("Error generating course:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-lg rounded-2xl bg-white text-black">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-orange-600">
            Create New Course Using AI
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div>
            <Label>Course Name</Label>
            <Input className="mt-2"
              placeholder="Course Name"
              onChange={(e) => onHandleInputChange("name", e.target.value)}
            />
          </div>

          <div>
            <Label>Course Description (Optional)</Label>
            <Textarea className="mt-2"
              placeholder="Course Description"
              onChange={(e) => onHandleInputChange("description", e.target.value)}
            />
          </div>

          <div>
            <Label>No. of Chapters</Label>
            <Input className="mt-2"
              type="number"
              min={1}
              placeholder="No of chapters"
              onChange={(e) => onHandleInputChange("noOfChapters", e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>Include Video</Label>
            <Switch 
              checked={formData.includeVideo}
              onCheckedChange={(val) => onHandleInputChange("includeVideo", val)}
            />
          </div>

          <div>
            <Label>Difficulty Level</Label>
            <Select
              onValueChange={(value) => onHandleInputChange("level", value)}
            >
              <SelectTrigger className="mt-2 text-black">
                <SelectValue placeholder="Select difficulty level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Category</Label>
            <Input className="mt-2"
              placeholder="Category (Separated by commas)"
              onChange={(e) => onHandleInputChange("category", e.target.value)}
            />
          </div>

          <Button
            className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white"
            disabled={loading}
            onClick={onGenerate}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
              </>
            ) : (
              <>
                <Sparkle className="mr-2 h-4 w-4" /> Generate Course
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddNewCourseDialog;
