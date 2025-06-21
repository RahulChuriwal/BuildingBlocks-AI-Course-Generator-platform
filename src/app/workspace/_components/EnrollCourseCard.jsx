"use client";

import { Button } from '../../../components/ui/button';
import axios from 'axios';
import {
  Book,
  LoaderCircle,
  BookOpenCheck,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Progress } from '../../../components/ui/progress';

function EnrollCourseCard({ course, refreshData }) {
  const courseJson = course?.courseJson?.course;
  const isGenerated = Array.isArray(course?.courseContent) && course.courseContent.length > 0;

  const [loading, setLoading] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [checkingEnrollment, setCheckingEnrollment] = useState(true);
  const [completedChapters, setCompletedChapters] = useState(0); // ✅ NEW
  const totalChapters = courseJson?.noOfChapters || 1;

  useEffect(() => {
    const checkEnrollment = async () => {
      try {
        const res = await axios.get(`/api/enroll-course?courseId=${course?.cid}`);
        if (res?.data?.enrollCourseTable) {
          setIsEnrolled(true);
          setCompletedChapters(res.data.enrollCourseTable.completedChapters || 0); // ✅ Track progress
        }
      } catch (err) {
        console.error("Enrollment check failed", err);
      } finally {
        setCheckingEnrollment(false);
      }
    };

    checkEnrollment();
  }, [course?.cid]);

  // ❌ Hide card if not enrolled
  if (!checkingEnrollment && !isEnrolled) return null;

  const progress = Math.min((completedChapters / totalChapters) * 100, 100);

  return (
    <div className="shadow-xl rounded-2xl bg-white border border-orange-100 hover:shadow-orange-200 transition-all duration-300">
      <Image
        src={course?.bannerImageUrl || "/placeholder.png"}
        alt={course?.name}
        width={400}
        height={300}
        className="w-full aspect-video rounded-t-2xl object-cover"
      />
      <div className="p-5 flex flex-col gap-3">
        <h2 className="font-semibold text-xl text-orange-600">
          {checkingEnrollment ? "Loading..." : courseJson?.name}
        </h2>
        <p className="line-clamp-3 text-gray-500 text-sm">
          {checkingEnrollment ? "Checking enrollment..." : courseJson?.description}
        </p>

        <div className="mt-2 space-y-2">
          <Progress value={progress} />
          <div className="text-xs text-gray-600 font-medium">
            Progress: {completedChapters} / {totalChapters} chapters ({Math.round(progress)}%)
          </div>
        </div>

        <div className="flex justify-between items-center text-sm mt-4">
          <span className="flex items-center gap-1 text-gray-700 font-medium">
            <Book className="h-4 w-4 text-orange-500" />
            {totalChapters} Chapters
          </span>

          {checkingEnrollment ? (
            <div className="flex items-center gap-2 text-orange-400 text-sm">
              <LoaderCircle className="animate-spin w-4 h-4" />
              Verifying...
            </div>
          ) : (
            <Link href={`/learn/course/${course?.cid}`}>
              <Button
                size="sm"
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold px-4 py-2 rounded-full shadow transition-all duration-200 flex items-center gap-2"
              >
                <BookOpenCheck className="w-4 h-4" />
                <span>Continue</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default EnrollCourseCard;
