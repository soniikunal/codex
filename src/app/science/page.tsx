"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const OwlCarousel = dynamic(() => import("react-owl-carousel"), { ssr: false });

const SciencePage = () => {
  const [hasLocation, setHasLocation] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("location") || "null");
      setHasLocation(!!stored?._id);
    } catch {
      setHasLocation(false);
    }
  }, []);

  const scienceCarouselConfig = {
    loop: true,
    margin: 10,
    items: 1,
    autoplay: true,
    autoplayTimeout: 3000,
    dots: false, // Remove dots (pagination indicators)
  };

  const scienceHeroContent = [
    {
      boldText1: "Experiment ",
      normalText: "Explore",
      boldText2: " Excel",
    },
    {
      boldText1: "Where Science Soars:",
      normalText: "Elementary to",
      boldText2: " AP Mastery!",
    },
    {
      boldText1: "Branch Out with Science:",
      normalText: "Discover, Experiment,",
      boldText2: " Succeed",
    },
  ];

  return (
    <>
      {/* Hero Carousel */}
      <section id="slide1" className="slider-section inner-page-slider">
        <div className="slider-area exsciton-bg slider-bg-1 relative-position shapedividers_com-7550">
          <div className="transDown">
            <OwlCarousel
              className=""
              loop
              margin={10}
              items={1}
              autoplay
              autoplayTimeout={3000}
              dots={false}
            >
              {scienceHeroContent.map((content, index) => (
                <div className="item text-center" key={index}>
                  <h2 className="newCarouselItem">
                    <span>{content.boldText1}</span>
                    <br />
                    {content.normalText}&nbsp;
                    <span>{content.boldText2}</span>
                  </h2>
                </div>
              ))}
            </OwlCarousel>
          </div>
        </div>
      </section>

      {/* Course Category Section */}
      <section
        id="course-category"
        className="course-category-section exsciton-cc-sec jarallax"
      >
        {/* --- Block 1: Intro + Elementary Science --- */}
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
                Science Program <span>Overview</span>
              </h2>
              <p>
                At <span>Brains and Brawns</span>, we don’t just teach
                science—we nurture curiosity and cultivate young minds from
                Kindergarten to high school. Our step-by-step curriculum ensures
                that your child grows year after year, gaining not only
                knowledge but confidence to tackle real-world challenges.
              </p>
            </div>

            <div className="category-item">
              <div className="row align-items-center">
                <div className="col-md-6" data-aos="fade-right">
                  <div className="ci-img">
                    <img
                      src="/assets/img/course/science-cat01.png"
                      alt="Elementary Science"
                    />
                  </div>
                </div>
                <div className="col-md-6" data-aos="fade-left">
                  <div className="ci-content">
                    <h2 className="text-white">Elementary Science</h2>
                    <p>
                      <strong style={{ fontSize: "x-large" }}>
                        Ignite Curiosity
                      </strong>
                      <br />
                      <br />
                      Through fun, hands-on experiments, kids discover the
                      basics of biology, chemistry, and physics. Our interactive
                      approach makes learning science an exciting adventure!
                      <br />
                      <br />
                      <strong style={{ fontSize: "larger" }}>
                        Grades:
                      </strong>{" "}
                      K-5
                    </p>
                    {!hasLocation ? (
                      <a href="/selectLocation" className="btn">
                        Find a Location
                      </a>
                    ) : (
                      <a href="/course/science" className="btn">
                        Enroll Now
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- Block 2: Middle School Science --- */}
        <div className="cc-block cc-block02">
          <div className="container">
            <div className="category-item">
              <div className="row align-items-center">
                <div className="col-md-6" data-aos="fade-left">
                  <div className="ci-img">
                    <img
                      src="/assets/img/science/2-Science-Middle School Science.png"
                      alt="Middle School Science"
                    />
                  </div>
                </div>
                <div className="col-md-6" data-aos="fade-right">
                  <div className="ci-content">
                    <h2 className="text-white">Middle School Science</h2>
                    <p>
                      <strong style={{ fontSize: "x-large" }}>
                        Dive Deeper, Think Bigger
                      </strong>
                      <br />
                      <br />
                      Middle schoolers take their science skills to the next
                      level, engaging in deeper topics and team competitions
                      like You Be the Chemist.
                      <br />
                      <br />
                      <strong style={{ fontSize: "larger" }}>
                        Grades:
                      </strong>{" "}
                      6-8
                    </p>
                    {!hasLocation ? (
                      <a href="/selectLocation" className="btn">
                        Find a Location
                      </a>
                    ) : (
                      <a href="/course/science" className="btn">
                        Enroll Now
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- Block 3: AP Test Prep --- */}
        <div className="cc-block cc-block03">
          <div className="container">
            <div className="category-item">
              <div className="row align-items-center">
                <div className="col-md-6" data-aos="fade-right">
                  <div className="ci-img">
                    <img
                      src="/assets/img/science/3-Science-AP Science Test Prep.png"
                      alt="AP Science Test Prep"
                    />
                  </div>
                </div>
                <div className="col-md-6" data-aos="fade-left">
                  <div className="ci-content">
                    <h2 className="text-white">AP Science Test Prep</h2>
                    <p>
                      <strong style={{ fontSize: "x-large" }}>
                        Ace Your Exams
                      </strong>
                      <br />
                      <br />
                      Prepare for AP Biology, Chemistry, and Physics with 1-on-1
                      tutoring and workshops.
                      <br />
                      <br />
                      <strong style={{ fontSize: "larger" }}>
                        Grades:
                      </strong>{" "}
                      9–12
                    </p>
                    {!hasLocation ? (
                      <a href="/selectLocation" className="btn">
                        Find a Location
                      </a>
                    ) : (
                      <a href="/course/science" className="btn">
                        Enroll Now
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- Block 4: Science Fair Projects --- */}
        <div className="cc-block cc-block02">
          <div className="container">
            <div className="category-item">
              <div className="row align-items-center">
                <div className="col-md-6" data-aos="fade-left">
                  <div className="ci-img">
                    <img
                      src="/assets/img/science/4-Science-Science & Engineering Fair Projects.png"
                      alt="Science Fair Projects"
                    />
                  </div>
                </div>
                <div className="col-md-6" data-aos="fade-right">
                  <div className="ci-content">
                    <h2 className="text-white">
                      Science & Engineering Fair Projects
                    </h2>
                    <p>
                      <strong style={{ fontSize: "x-large" }}>
                        Create, Innovate, Present
                      </strong>
                      <br />
                      <br />
                      We support school fair projects like MSEF and help
                      students present research that stands out.
                      <br />
                      <br />
                      <strong style={{ fontSize: "larger" }}>
                        Grades:
                      </strong>{" "}
                      6–12
                    </p>
                    {!hasLocation ? (
                      <a href="/selectLocation" className="btn">
                        Find a Location
                      </a>
                    ) : (
                      <a href="/course/science" className="btn">
                        Join Now
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
        className="why-choose-section exsciton-why backgroud-style shapedividers_com-5596 jarallax"
      >
        <div className="container">
          <div
            className="section-title mb-5 headline text-center text-dark"
            data-aos="zoom-in"
          >
            <span className="subtitle text-uppercase text-dark">
              Brains and Brawns ADVANTAGES
            </span>
            <h2 className="text-dark" style={{ fontSize: 54 }}>
              Discover{" "}
              <span className="text-dark">
                What Sets Our Science Programs Apart
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
                          <h3>Expert Instructors</h3>
                        </div>
                        <div className="features-text-dec">
                          <span style={{ color: "black" }}>
                            Passionate teachers with real-world experience.
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
                      <div className="features-text pt-6">
                        <div className="features-text-title">
                          <h3>Hands-On Learning</h3>
                        </div>
                        <div className="features-text-dec">
                          <span style={{ color: "black" }}>
                            Interactive experiments and projects that spark
                            creativity.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-4 flex items-center justify-center">
                <div
                  className="extra-pic text-center"
                  data-aos="fade-up"
                  data-aos-duration="3000"
                >
                  <img
                    src="/assets/img/banner/porvide-01-removebg-preview.png"
                    alt="img"
                    className="mx-auto"
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
                      <div className="features-text pt-6">
                        <div className="features-text-title text-right">
                          <h3>Tailored Attention</h3>
                        </div>
                        <div className="features-text-dec text-right">
                          <span style={{ color: "black" }}>
                            Personal guidance to help every student excel.
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
                      <div className="features-text pt-6">
                        <div className="features-text-title text-right">
                          <h3>Long-Term Growth</h3>
                        </div>
                        <div className="features-text-dec text-right">
                          <span style={{ color: "black" }}>
                            A progressive curriculum that builds year by year
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

export default SciencePage;
