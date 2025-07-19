"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const getQueryParams = () => {
  const output: Record<string, string> = {};
  if (typeof window !== "undefined" && window.location.search) {
    const queryParams = window.location.search.substring(1);
    const listQueries = queryParams.split("&");
    listQueries.forEach((query) => {
      const [key, value] = query.split("=");
      if (key) output[key] = decodeURIComponent(value || "");
    });
  }
  return output;
};

export default function Breadcrumb() {
  const [course, setCourse] = useState("");
  const [programUrl, setProgramUrl] = useState("");

  useEffect(() => {
    const { prog, course } = getQueryParams();
    setCourse(course);

    let url = "";
    switch (prog) {
      case "PROG_CODING":
        url = "/coding";
        break;
      case "PROG_SCIENCE":
        url = "/science";
        break;
      case "PROG_MATH":
        url = "/math";
        break;
    }
    setProgramUrl(url);
  }, []);

  return (
    <section
      id="breadcrumb"
      className="breadcrumb-section relative-position backgroud-style"
    >
      <div className="blakish-overlay"></div>
      <div className="container">
        <div className="page-breadcrumb-content text-center">
          <div className="page-breadcrumb-title">
            <h2 className="breadcrumb-head black bold">
              Complete <span>Your Enrolment</span>
            </h2>
          </div>
          <div className="page-breadcrumb-item ul-li">
            <ul className="breadcrumb text-uppercase black">
              <li className="breadcrumb-item">
                <Link href={programUrl || "#"}>Program</Link>
              </li>
              <li className="breadcrumb-item">
                <Link href={`/course${programUrl}`}>Course list</Link>
              </li>
              <li className="breadcrumb-item">
                <Link href={`/course${programUrl}/${course}`}>
                  Course details
                </Link>
              </li>
              <li className="breadcrumb-item active">
                <a href="#">Course enrolment</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
