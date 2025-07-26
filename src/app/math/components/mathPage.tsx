"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const OwlCarousel = dynamic(() => import("react-owl-carousel"), { ssr: false });

interface CarouselItem {
  heading: string;
  subheading: string;
  imageUrl: string;
}

const MathPage: React.FC<{ carouselData: CarouselItem[] }> = ({
  carouselData,
}) => {
  const [hasLocation, setHasLocation] = useState<boolean | null>(null);
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("location") || "null");
      setHasLocation(!!stored?._id);
    } catch {
      setHasLocation(false);
    }
  }, []);

  const mathHeroContent = [
    {
      boldText1: "Unlock ",
      normalText: "Your Child’s",
      boldText2: " Potential",
    },
    {
      boldText1: "Master Math ",
      normalText: "Conquer",
      boldText2: " Competitions",
    },
    {
      boldText1: "Solve ",
      normalText: "Compete",
      boldText2: " Excel",
    },
  ];

  return (
    <>
      {/* Math Hero Carousel */}
      <section
        id="slide1"
        className="slider-section inner-page-slider shapedividers_com-7285"
      >
        {/* <div className="slider-area mathex-bg slider-bg-1 relative-position ">
          <div className="transDown"> */}
        <OwlCarousel
          className=""
          loop
          margin={10}
          items={1}
          autoplay
          autoplayTimeout={3000}
          dots={false}
        >
          {carouselData.map((item, idx) => (
            <div
              key={idx}
              className={`item slider-area relative-position slider-bg-1`}
              style={{
                backgroundImage: `linear-gradient(0deg, rgb(67 118 108 / 41%), rgba(0, 0, 0, 0.8)),
                url("${item.imageUrl}")`,
              }}
            >
              <h2 className="newCarouselItem transDown">
                <span>{item.heading}</span> <br />
                {item.subheading}
              </h2>
            </div>
          ))}
        </OwlCarousel>
        {/* </div>
        </div> */}
      </section>
      <section
        id="course-category"
        className="course-category-section mathex-cc-sec jarallax"
      >
        <div className="cc-block cc-block01">
          <div className="container">
            <div
              className="section-title mb45 headline text-center"
              data-aos="zoom-in"
            >
              <span className="subtitle text-uppercase">
                COURSES CATEGORIES
              </span>
              <h2>
                Unlock Your Child's Potential in <span> Math Competitions</span>
              </h2>
              <p>
                At Brains & Brawns, we turn math from a subject into a passion.
                Whether your child is building foundational skills or preparing
                to conquer the toughest math competitions, our programs are
                designed to challenge, motivate, and elevate every student.
                Through guided practice, expert instruction, and mock
                competitions, we’ll help them reach their full potential in
                prestigious contests like AMC, MOEMS, and Math Kangaroo.
              </p>
            </div>
            <div className="category-item">
              <div className="row align-items-center">
                <div className="col-md-6" data-aos="fade-right">
                  <div className="ci-img">
                    <img
                      src="assets/img/math/1-MATH-AMC 8 & AMC 10 Competition Preparation.png"
                      alt=""
                    />
                  </div>
                </div>
                <div className="col-md-6" data-aos="fade-left">
                  <div className="ci-content">
                    <h2 className="text-white">
                      AMC 8 & AMC 10 Competition Preparation
                    </h2>
                    <p>
                      <span
                        className="font-weight-bold"
                        style={{ fontSize: "x-large" }}
                      >
                        Master the AMC: Build Skills, Gain Confidence
                      </span>
                      <br />
                      <br />
                      Our AMC 8 & 10 prep course equips students with the
                      strategies they need to excel. Through targeted coaching
                      and extensive practice, students work through past
                      problems, learn advanced problem-solving techniques, and
                      receive personalized feedback to improve their
                      performance. Our goal? Helping them approach these
                      national competitions with confidence and skill.
                    </p>
                    {!hasLocation ? (
                      <a href="/selectLocation" className="btn">
                        <i className="fas fa-map-marker-alt"></i>&nbsp; Find a
                        Location
                      </a>
                    ) : (
                      <a href="/course/math" className="btn">
                        Enroll Now
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="cc-block cc-block02">
          <div className="container">
            <div className="category-item">
              <div className="row align-items-center">
                <div className="col-md-6" data-aos="fade-left">
                  <div className="ci-img">
                    <img
                      src="assets/img/math/2-MATH-MOEMS (Grades 1-6) Math Olympiad.png"
                      alt=""
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="ci-content" data-aos="fade-right">
                    <h2 className="text-white">
                      MOEMS (Grades 1-6) Math Olympiad
                    </h2>
                    <p>
                      <span
                        className="font-weight-bold"
                        style={{ fontSize: "x-large" }}
                      >
                        MOEMS Magic: Sparking Curiosity in Young Mathematicians
                      </span>
                      <br />
                      <br />
                      Our MOEMS course is all about nurturing early
                      problem-solving skills and a love for math. Designed for
                      younger students, this program combines challenging yet
                      fun problems with interactive lessons. We help students
                      not just understand math, but enjoy it, setting them up
                      for both academic success and future competitions.
                    </p>
                    {!hasLocation ? (
                      <a href="/selectLocation" className="btn">
                        <i className="fas fa-map-marker-alt"></i>&nbsp; Find a
                        Location
                      </a>
                    ) : (
                      <a href="/course/math" className="btn">
                        Enroll Now
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="cc-block cc-block03">
          <div className="container">
            <div className="category-item">
              <div className="row align-items-center">
                <div className="col-md-6" data-aos="fade-right">
                  <div className="ci-img">
                    <img
                      src="assets/img/math/3-MATH-Math Kangaroo Competition.png"
                      alt=""
                    />
                  </div>
                </div>
                <div className="col-md-6" data-aos="fade-left">
                  <div className="ci-content">
                    <h2 className="text-white">Math Kangaroo Competition</h2>
                    <p>
                      <span
                        className="font-weight-bold"
                        style={{ fontSize: "x-large" }}
                      >
                        Leap Into Success with Math Kangaroo
                      </span>
                      <br />
                      <br />
                      Math Kangaroo introduces students to international-level
                      math challenges. In our preparation program, we focus on
                      building the logic, reasoning, and fluency needed to
                      succeed. We guide students through the competition’s
                      unique problem-solving methods, helping them stay sharp,
                      focused, and ready for global competition.
                    </p>
                    {!hasLocation ? (
                      <a href="/selectLocation" className="btn">
                        <i className="fas fa-map-marker-alt"></i>&nbsp; Find a
                        Location
                      </a>
                    ) : (
                      <a href="/course/math" className="btn">
                        Enroll Now
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section
        id="why-choose"
        className="why-choose-section mathex-why backgroud-style shapedividers_com-4681 jarallax"
      >
        <div className="container">
          <div
            className="section-title mb-5 headline text-center text-dark"
            data-aos="zoom-in"
          >
            <span className="subtitle text-uppercase text-dark">
              Brains and Brawns ADVANTAGES
            </span>
            <h2 className="text-dark">
              <span className="text-dark">
                Why Choose Brains & Brawns for Math Prep?
              </span>
            </h2>
          </div>
          <div className="extra-features-content">
            <div className="row">
              <div className="col-md-4 col-sm-6">
                <div className="extra-left">
                  <div className="extra-left-content" data-aos="zoom-in-right">
                    <div className="extra-icon-text text-left">
                      <div className="features-icon gradient-bg text-center">
                        <i className="flaticon-maths-class-materials-cross-of-a-pencil-and-a-ruler"></i>
                      </div>
                      <div className="features-text">
                        <div className="features-text-title">
                          <h3>Math That Fits Your Child’s Journey</h3>
                        </div>
                        <div className="features-text-dec">
                          <span>
                            We customize each student’s learning experience to
                            match their needs. Whether your child is building
                            fundamental skills or getting ready for a major
                            competition, we create a personalized roadmap that
                            helps them grow steadily and confidently.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="extra-left-content" data-aos="zoom-in-right">
                    <div className="extra-icon-text">
                      <div className="features-icon gradient-bg text-center">
                        <i className="flaticon-clipboard-with-pencil"></i>
                      </div>
                      <div className="features-text pt25">
                        <div className="features-text-title">
                          <h3>Inspiring Mentors with Proven Success</h3>
                        </div>
                        <div className="features-text-dec">
                          <span>
                            Our teachers aren’t just experienced—they're
                            passionate about math and dedicated to your child’s
                            growth. With years of competition prep experience,
                            they guide students to develop both their skills and
                            confidence, ensuring they’re ready for any
                            challenge.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="extra-left-content" data-aos="zoom-in-right">
                    <div className="extra-icon-text">
                      <div className="features-icon gradient-bg text-center">
                        <i className="flaticon-clipboard-with-pencil"></i>
                      </div>
                      <div className="features-text pt25">
                        <div className="features-text-title">
                          <h3>Real-World Applications</h3>
                        </div>
                        <div className="features-text-dec">
                          <span>
                            Math isn’t just for the classroom—it’s everywhere.
                            We make sure students see how math is used in real
                            life, connecting what they learn with everyday
                            problem-solving. This practical approach not only
                            enhances understanding but also makes the subject
                            more engaging.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-sm-4">
                <div
                  className="extra-pic text-center"
                  data-aos="fade-up"
                  data-aos-duration="3000"
                >
                  <img
                    src="assets/img/math/Why Choose Brains & Brawns for Math Prep.png"
                    alt="img"
                  />
                </div>
              </div>

              <div className="col-md-4 col-sm-6">
                <div className="extra-right">
                  <div className="extra-left-content" data-aos="zoom-in-left">
                    <div className="extra-icon-text text-right">
                      <div className="features-icon gradient-bg text-center">
                        <i className="flaticon-ruler-and-pencil"></i>
                      </div>
                      <div className="features-text pt25">
                        <div className="features-text-title text-right pb10">
                          <h3>Comprehensive Competition Prep</h3>
                        </div>
                        <div className="features-text-dec text-right">
                          <span>
                            We offer in-depth competition prep for contests like
                            AMC, MOEMS, and Math Kangaroo. With detailed
                            training sessions, mock exams, and personalized
                            feedback, we ensure your child is fully prepared to
                            take on these prestigious math challenges.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="extra-left-content" data-aos="zoom-in-left">
                    <div className="extra-icon-text text-right">
                      <div className="features-icon gradient-bg text-center">
                        <i className="flaticon-clipboards"></i>
                      </div>
                      <div className="features-text pt25">
                        <div className="features-text-title text-right pb10">
                          <h3>Fun and Engaging Learning Environment</h3>
                        </div>
                        <div className="features-text-dec text-right">
                          <span>
                            We know that math isn’t everyone’s favorite
                            subject—but it’s one of ours! Our interactive
                            lessons and engaging challenges make learning
                            enjoyable. We keep students motivated, helping them
                            see the fun side of solving problems and cracking
                            puzzles.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="extra-left-content" data-aos="zoom-in-left">
                    <div className="extra-icon-text text-right">
                      <div className="features-icon gradient-bg text-center">
                        <i className="flaticon-clipboards"></i>
                      </div>
                      <div className="features-text pt25">
                        <div className="features-text-title text-right pb10">
                          <h3>Proven Results</h3>
                        </div>
                        <div className="features-text-dec text-right">
                          <span>
                            We’ve helped students excel in school and win top
                            honors in national and international math
                            competitions. Our track record speaks for itself,
                            and we’re confident that your child will find the
                            support they need to succeed at Brains & Brawns.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MathPage;
