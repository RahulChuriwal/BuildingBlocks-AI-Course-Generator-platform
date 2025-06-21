"use client";
import React, { useEffect, useState } from "react";
import { GraduationCap, Plus } from "lucide-react";
import Image from "next/image";
import { Button } from "../../../components/ui/button";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import AddNewCourseDailog from "./AddNewCourseDailog";
import EnrollCourseCard from "./EnrollCourseCard";
import { cn } from "../../../lib/utils"; // if you're using class name utility

function CourseList() {
  const [courseList, setCourseList] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [mounted, setMounted] = useState(false);

  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && user) {
      GetCourseList();
    }
  }, [user, isLoaded]);

  useEffect(() => {
    if (!loadingCourses) {
      const timeout = setTimeout(() => setMounted(true), 100);
      return () => clearTimeout(timeout);
    }
  }, [loadingCourses]);

  const GetCourseList = async () => {
    try {
      setLoadingCourses(true);
      const result = await axios.get("/api/courses");
      setCourseList(Array.isArray(result.data) ? result.data : []);
    } catch (err) {
      console.error("❌ Error fetching courses:", err);
    } finally {
      setLoadingCourses(false);
    }
  };

  if (!isLoaded || loadingCourses) {
    return (
      <div className="mt-20 text-center text-orange-600 animate-pulse">
        <GraduationCap className="mx-auto w-12 h-12 mb-4" />
        <p className="text-lg font-semibold">Loading your enrolled courses...</p>
      </div>
    );
  }

  if (courseList.length === 0) {
    return (
      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-8 shadow-md text-center space-y-4 mt-10">
        <div className="flex justify-center">
          <div className="bg-orange-100 p-4 rounded-full shadow-sm">
            <GraduationCap className="h-10 w-10 text-orange-500" />
          </div>
        </div>
        <h2 className="text-xl font-semibold text-orange-800">
          You haven't created any courses yet
        </h2>
        <p className="text-sm text-orange-700">
          Start building your first course and share your knowledge with the world.
        </p>
        <div className="flex justify-center">
          <AddNewCourseDailog>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 py-2 flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create your first course
            </Button>
          </AddNewCourseDailog>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "mt-10 transform transition-all duration-700 ease-out",
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}
    >
      <h2 className="font-bold text-xl text-orange-600 mb-4">Continue Learning your Courses</h2>
      <div className="grid mt-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {courseList.map((course, index) => (
          <EnrollCourseCard key={index} course={course} refreshData={GetCourseList} />
        ))}
      </div>
    </div>
  );
}

export default CourseList;
