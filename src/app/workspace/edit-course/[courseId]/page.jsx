"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import CourseInfo from "../_components/CourseInfo";
import axios from "axios";

function EditCourse() {
  const { courseId } = useParams();
  const [courseInfo, setCourseInfo] = useState(null);

  useEffect(() => {
    GetEnrolledCourseById();
  }, []);

  const GetEnrolledCourseById = async () => {
    try {
      const result = await axios.get("/api/courses?courseId=" + courseId);
      setCourseInfo(result.data);
    } catch (err) {
      console.error("Failed to fetch course:", err);
    }
  };

  return (
    <div>
      {courseInfo ? (
        <CourseInfo course={courseInfo} />
      ) : (
        <p className="text-center mt-10 text-gray-500">Loading course info...</p>
      )}
    </div>
  );
}

export default EditCourse;
