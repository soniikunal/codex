"use client";

import { useEffect, useState } from "react";
import CourseBlock from "./CourseBlock";

const CodingCourseCategories = () => {
  const [location, setLocation] = useState<string>("");

  useEffect(() => {
    const storedLocation = localStorage.getItem("location");
    if (storedLocation) {
      try {
        const parsed = JSON.parse(storedLocation);
        setLocation(parsed);
      } catch (err) {
        console.error("Invalid JSON in localStorage for 'location'", err);
        localStorage.removeItem("location");
      }
    }
  }, []);

  return (
    <section
      id="course-category"
      className="course-category-section coding-cc-sec jarallax"
    >
      <div className="container">
        <div
          className="section-title mb45 headline text-center"
          data-aos="zoom-in"
        >
          <span className="subtitle text-uppercase">COURSES CATEGORIES</span>
          <h2>
            Coding and Robotics Courses<span> For K-12</span>
          </h2>
          <p>
            At <span>Brains and Brawns</span>, coding is not just a
            skill—it&apos;s a journey. From Kindergarten to high school, we
            provide an interactive, progressive learning experience that is
            designed to nurture creativity, logical thinking, and
            problem-solving, making learning both fun and effective. With our
            <span> MindTree Curriculum</span>, students grow year after year,
            mastering essential skills that build both confidence and real-world
            capability.
          </p>
        </div>
      </div>

      <CourseBlock
        imageSrc="/assets/img/coding/01-CODING-In-Person Classes.png"
        title="In-Person Classes"
        description="<span class='font-weight-bold' style='font-size: x-large;'>Collaborative, hands-on learning.</span><br/><br/>Hands-on, immersive learning experiences in a classroom. Students work together on projects that bring coding to life through teamwork and guided instruction."
        btnText="Enroll Now"
        location={location}
        animationDairection="fade-right"
      />

      <CourseBlock
        imageSrc="/assets/img/coding/02-CODING-Private 1-on-1.png"
        title="Private 1-on-1"
        description="<span class='font-weight-bold' style='font-size: x-large;'>Personalized sessions for accelerated growth</span><br/><br/>Personalized, focused instruction that’s adapted to your child's pace and needs. From beginners to advanced learners, one-on-one tutoring ensures faster progress and deeper understanding."
        btnText="Enroll Now"
        location={location}
        animationDairection="fade-left"
      />

      <CourseBlock
        imageSrc="/assets/img/coding/03-CODING-Online Group Sessions.png"
        title="Online Group Sessions"
        description="<span class='font-weight-bold' style='font-size: x-large;'>Connect, code, and collaborate virtually.</span><br/><br/>Live, instructor-led sessions that bring coding directly to your home, with interactive activities and group collaboration."
        btnText="Book Now"
        location={location}
        animationDairection="fade-right"
      />

      <CourseBlock
        imageSrc="/assets/img/course/science-cat02.png"
        title="School Outreach"
        description="<span class='font-weight-bold' style='font-size: x-large;'>Coding education brought to your school.</span><br/><br/>Customizable programs that integrate coding directly into your school’s curriculum."
        btnText="Learn More"
        location={location}
        animationDairection="fade-left"
      />
    </section>
  );
};

export default CodingCourseCategories;
