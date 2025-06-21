"use client";

import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import CourseCard from '../_components/CourseCard';
import { Skeleton } from '../../../components/ui/skeleton';

function Explore() {
  const [courseList, setCourseList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded && user) {
      GetCourseList();
    }
  }, [isLoaded, user]);

  const GetCourseList = async () => {
    try {
      setLoading(true);
      const result = await axios.get('/api/courses?courseId=0');
      setCourseList(result.data);
    } catch (err) {
      console.error("Error fetching course list:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = courseList.filter(course =>
    course.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h2 className='font-bold text-3xl mb-6'>Explore More Courses</h2>

      <div className='flex gap-5 max-w-md'>
        <Input
          placeholder="Search courses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button>
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
      </div>

      <div className='grid mt-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5'>
        {loading ? (
          // Show skeletons while loading
          [...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-[250px] w-full rounded-xl" />
          ))
        ) : filteredCourses.length > 0 ? (
          filteredCourses.map((course, index) => (
            <CourseCard
              course={course}
              key={index}
              refreshData={GetCourseList}
            />
          ))
        ) : (
          <p className="text-gray-500 mt-4 col-span-full">No courses found.</p>
        )}
      </div>
    </div>
  );
}

export default Explore;
