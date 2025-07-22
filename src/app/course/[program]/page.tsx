"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import axiosInstance from "@/lib/axios";

interface Course {
  program: any;
  pk: string;
  sk: string;
  courseName: string;
  thumbnailImage: string;
}

const programMap: Record<
  string,
  { code: string; label: string; href: string }
> = {
  coding: { code: "PROG_CODING", label: "Coding", href: "/coding" },
  science: { code: "PROG_SCIENCE", label: "Science", href: "/science" },
  math: { code: "PROG_MATH", label: "Math", href: "/math" },
};

const CoursePage = () => {
  const params = useParams();
  const programSlug = params?.program as string | undefined;
  const program = programSlug ? programMap[programSlug] : undefined;

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!program) return;

    const fetchCourses = async () => {
      try {
        const locationData =
          typeof window !== "undefined"
            ? JSON.parse(localStorage.getItem("location") || "null")
            : null;

        const res = await axiosInstance.post("/program/detail", {
          pk: program.code,
          locationId: locationData?._id,
        });

        setCourses(res.data || []);
      } catch (err) {
        setError("Failed to load courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();

    if (typeof window !== "undefined" && window.AOS) {
      window.AOS.init();
    }
  }, [program]);

  if (!program) {
    return (
      <section className="container py-16">
        <h2>Program not found</h2>
        <p>Please select a valid program.</p>
      </section>
    );
  }

  return (
    <>
      {/* Breadcrumb Section */}
      <section
        id="breadcrumb"
        className="breadcrumb-section relative-position backgroud-style"
      >
        <div className="blakish-overlay"></div>
        <div className="container">
          <div className="page-breadcrumb-content text-center">
            <div className="page-breadcrumb-title">
              <h2 className="breadcrumb-head black bold">
                <span>Course Listing</span>
              </h2>
            </div>
            <div className="page-breadcrumb-item ul-li">
              <ul className="breadcrumb text-uppercase black">
                <li className="breadcrumb-item">
                  <Link href={program.href}>{program.label}</Link>
                </li>
                <li className="breadcrumb-item active">
                  <span>Course list</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Course List Section */}
      <section id="course-page" className="course-page-section">
        <div className="container py-10">
          <h3 className="mb-5 text-center">
            Showing courses for: {program.label}
          </h3>

          {loading && <p className="text-center">Loading...</p>}
          {error && <p className="text-center text-danger">{error}</p>}

          {!loading && courses.length === 0 && (
            <p className="text-center">No courses found for this program.</p>
          )}

          <div className="row">
            {courses.map((course, idx) => {
              const detailsHref = `/course/${programSlug}/${course.program}`;
              return (
                <div
                  className="col-md-4 mb-4"
                  key={course.sk || idx}
                  data-aos="fade-up"
                >
                  <div className="card h-100 shadow-sm best-course-pic-text relative-position">
                    <div className="best-course-pic relative-position card-img-top position-relative overflow-hidden">
                      <img
                        src={course.thumbnailImage}
                        alt={course.courseName}
                        className="img-fluid w-100"
                        style={{ height: "220px", objectFit: "cover" }}
                      />
                      <div className="course-details-btn position-absolute bottom-0 start-0 p-2">
                        <Link
                          href={detailsHref}
                          className="btn btn-sm btn-primary text-white"
                        >
                          COURSE DETAIL <i className="fas fa-arrow-right"></i>
                        </Link>
                      </div>
                      <div className="blakish-overlay position-absolute w-100 h-100" />
                    </div>
                    <div className="card-body best-course-text cc-card">
                      <div className="course-title headline relative-position">
                        <h5 className="card-title">
                          <Link href={detailsHref}>{course.courseName}</Link>
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default CoursePage;
