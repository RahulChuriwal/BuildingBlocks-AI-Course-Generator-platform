"use client";

import { Button } from '../../../components/ui/button';
import axios from 'axios';
import { Book, LoaderCircle, PlayCircle, Settings, ArrowRight, BookOpenCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

function CourseCard({ course, refreshData }) {
  const courseJson = course?.courseJson?.course;
  const isGenerated = Array.isArray(course?.courseContent) && course.courseContent.length > 0;

  const [loading, setLoading] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [checkingEnrollment, setCheckingEnrollment] = useState(true); // 🔥 new state

  // 🔍 Check if already enrolled
  useEffect(() => {
    const checkEnrollment = async () => {
      try {
        const res = await axios.get(`/api/enroll-course?courseId=${course?.cid}`);
        if (res?.data?.enrollCourseTable) {
          setIsEnrolled(true);
        }
      } catch (err) {
        console.error("Enrollment check failed", err);
      } finally {
        setCheckingEnrollment(false); // ✅ done checking
      }
    };
    checkEnrollment();
  }, [course?.cid]);

  // 🟢 Enroll function
  const onEnrollCourse = async () => {
    try {
      setLoading(true);
      const result = await axios.post('/api/enroll-course', {
        courseId: course?.cid,
      });

      if (result.data.resp) {
        toast.warning('⚠️ Already Enrolled!');
      } else {
        toast.success('✅ Enrolled!');
        await refreshData();
        setIsEnrolled(true);
      }
    } catch (e) {
      toast.error('❌ Server error during enrollment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="shadow rounded-xl bg-white border">
      <Image
        src={course?.bannerImageUrl || "/placeholder.png"}
        alt={course?.name}
        width={400}
        height={300}
        className="w-full aspect-video rounded-t-xl object-cover"
      />
      <div className="p-4 flex flex-col gap-3">
        <h2 className="font-bold text-lg text-orange-600">{courseJson?.name}</h2>
        <p className="line-clamp-3 text-gray-500 text-sm">{courseJson?.description}</p>

        <div className="flex justify-between items-center text-sm">
          <span className="flex items-center gap-1 text-gray-700">
            <Book className="h-4 w-4 text-primary" />
            {courseJson?.noOfChapters} Chapters
          </span>

          {checkingEnrollment ? (
            <LoaderCircle className="animate-spin w-5 h-5 text-orange-400" />
          ) : isEnrolled ? (
            <Link href={`/learn/course/${course?.cid}`}>
              <Button
                size="sm"
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-all duration-200 flex items-center gap-2"
              >
                <BookOpenCheck className="w-4 h-4" />
                <span>Continue</span>
              </Button>
            </Link>
          ) : isGenerated ? (
            <Button className="bg-red-400" size="sm" onClick={onEnrollCourse} disabled={loading}>
              {loading ? (
                <LoaderCircle className="animate-spin w-4 h-4" />
              ) : (
                <PlayCircle className="w-4 h-4" />
              )}
              <span className="ml-2">Enroll Course</span>
            </Button>
          ) : (
            <Link href={`/workspace/edit-course/${course?.cid}`}>
              <Button size="sm" variant="outline">
                <Settings className="w-4 h-4" />
                <span className="ml-2">Generate Course</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
