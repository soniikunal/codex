"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";

interface Course {
  program: any;
  thumbnailImage: string | Blob | undefined;
  pk: string;
  sk: string;
  headerTitle: string;
  description: string;
  descriptionImage?: string;
  ageRange?: string;
  maxEnrollment?: string;
}

const CourseDetailPage = () => {
  const params = useParams();
  const router = useRouter();

  const program = params?.program as string | undefined;
  const course = params?.course as string | undefined;
  const [courseData, setCourseData] = useState<Course | null>(null);
  const [location, setLocation] = useState<any>(null); // use null as default
  const programMap: Record<string, string> = {
    coding: "PROG_CODING",
    science: "PROG_SCIENCE",
    math: "PROG_MATH",
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const loc = localStorage.getItem("location");
      if (!loc) {
        router.push("/selectLocation");
        return;
      }

      try {
        const parsed = JSON.parse(loc);
        setLocation(parsed);
      } catch (e) {
        console.error("Invalid location in localStorage:", e);
        localStorage.removeItem("location");
        router.push("/selectLocation");
      }
    }

    if (!program || !course) return;

    const fetchCourse = async () => {
      const pk = programMap[program || ""] || "";
      const programCode = course;

      if (!pk || !programCode) return;

      try {
        const res = await axiosInstance.post("/program/coursedetail", {
          pk,
          programCode,
        });

        setCourseData(res.data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchCourse();

    if (typeof window !== "undefined" && window.AOS) {
      window.AOS.init();
    }
  }, [program, course, router]);

  const getCourseEnrollLink = (item: Course) =>
    `/check-out?prog=${item.pk}&course=${item.program}`;

  if (!courseData) {
    return (
      <>
        <section
          id="breadcrumb"
          className="breadcrumb-section relative-position backgroud-style"
        >
          <div className="blakish-overlay"></div>
          <div className="container">
            <div className="page-breadcrumb-content text-center">
              <div className="page-breadcrumb-title">
                <h2 className="breadcrumb-head black bold">
                  <span>Course Details</span>
                </h2>
              </div>
              <div className="page-breadcrumb-item ul-li">
                <ul className="breadcrumb text-uppercase black">
                  <li className="breadcrumb-item">
                    <a href={`/${program}`}>Program</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href={`/course/${program}`}>Course list</a>
                  </li>
                  <li className="breadcrumb-item active">
                    <span>Course details</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="container py-5">
          <p>Loading course details...</p>
        </section>
      </>
    );
  }

  return (
    <>
      {/* Breadcrumb */}
      <section
        id="breadcrumb"
        className="breadcrumb-section relative-position backgroud-style"
      >
        <div className="blakish-overlay"></div>
        <div className="container">
          <div className="page-breadcrumb-content text-center">
            <div className="page-breadcrumb-title">
              <h2 className="breadcrumb-head black bold">
                <span>Course Details</span>
              </h2>
            </div>
            <div className="page-breadcrumb-item ul-li">
              <ul className="breadcrumb text-uppercase black">
                <li className="breadcrumb-item">
                  <a href={`/${program}`}>Program</a>
                </li>
                <li className="breadcrumb-item">
                  <a href={`/course/${program}`}>Course list</a>
                </li>
                <li className="breadcrumb-item active">
                  <span>Course details</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Course Details */}
      <section id="course-details" className="course-details-section">
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <div className="course-details-item">
                <div className="course-single-pic mb30">
                  <img
                    src={courseData.thumbnailImage}
                    alt={courseData.headerTitle}
                  />
                </div>
                <div className="course-single-text">
                  <div className="course-title mt10 headline relative-position">
                    <span>
                      <h3>{courseData.headerTitle}</h3>
                    </span>
                  </div>
                  <div className="course-details-content">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: courseData.description,
                      }}
                    ></div>
                  </div>
                </div>
                {courseData.descriptionImage && (
                  <div className="course-single-pic mb30">
                    <img src={courseData.descriptionImage} alt="Details" />
                  </div>
                )}
              </div>
            </div>

            <div className="col-md-3">
              <div className="side-bar">
                <div className="course-side-bar-widget">
                  <div className="genius-btn gradient-bg text-center text-uppercase float-left bold-font">
                    <a href={getCourseEnrollLink(courseData)}>
                      Enroll this course <i className="fas fa-caret-right"></i>
                    </a>
                  </div>
                </div>

                <div className="enrolled-student"></div>

                <div className="couse-feature ul-li-block">
                  <ul>
                    <li>
                      Location: <span>{location?.fullName}</span>
                    </li>
                    <li>
                      Age: <span>{courseData.ageRange || "-"}</span>
                    </li>
                    <li>
                      Enrollment Limit:{" "}
                      <span>{courseData.maxEnrollment || "-"}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CourseDetailPage;
