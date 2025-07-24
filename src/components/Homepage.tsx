"use client";

import FAQ from "@/components/FAQ";
import ParentTestimonials from "@/components/ParentTestimonial";
import Teachers from "@/components/Teachers";
import Image from "next/image";

import dynamic from "next/dynamic";
import ContactForm from "@/components/ContactForm";

const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});

interface CarouselItem {
  heading: string;
  subheading: string;
  imageUrl: string;
}
interface Course {
  title: string;
  description: string;
  imageFileName: string;
  aosStyle: string;
  link: string;
}

interface Advantage {
  title: string;
  description: string;
  iconClass: string;
}

const coursesData: Course[] = [
  {
    title: "Master Math",
    description:
      "Master math with our engaging curriculum and expert guidance.",
    imageFileName: "math-cat.png",
    aosStyle: "fade-right",
    link: "/math",
  },
  {
    title: "Coding",
    description:
      "Learn coding from industry experts and build your digital future.",
    imageFileName: "code-cat.png",
    aosStyle: "zoom-in",
    link: "/coding",
  },
  {
    title: "Science Unleashed",
    description:
      "Experience hands-on science experiments and ignite your curiosity.",
    imageFileName: "science-cat.png",
    aosStyle: "fade-left",
    link: "/science",
  },
];

const advantagesDataRight: Advantage[] = [
  {
    title: "Passionate Educators",
    description:
      "Our instructors are mentors, igniting a love of learning while nurturing confidence and growth in every child.",
    iconClass: "flaticon-maths-class-materials-cross-of-a-pencil-and-a-ruler",
  },
  {
    title: "Interactive, Hands-On Learning",
    description:
      "Our courses transform complex concepts into engaging, hands-on adventures.",
    iconClass: "flaticon-clipboard-with-pencil",
  },
  {
    title: "Build Confidence and Problem-Solving Skills",
    description:
      "Our curriculum fosters critical thinking and creative problem-solving.",
    iconClass: "flaticon-clipboard-with-pencil",
  },
];

const advantagesDataLeft: Advantage[] = [
  {
    title: "Real-World Skill Building",
    description:
      "We focus on practical applications, equipping students with skills for future success.",
    iconClass: "flaticon-ruler-and-pencil",
  },
  {
    title: "Balanced Growth",
    description: "We combine rigorous academics with creative exploration.",
    iconClass: "flaticon-clipboards",
  },
  {
    title: "Flexible Learning Options",
    description:
      "Choose from after-school programs, weekend workshops, or self-paced online courses.",
    iconClass: "flaticon-clipboards",
  },
];

const HomePage: React.FC<{ carouselData: CarouselItem[] }> = ({
  carouselData,
}) => {
  return (
    <>
      <section id="" className="">
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
                backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.4), hwb(0 0% 100% / 0.4)), 
                url(${item.imageUrl})`,
              }}
            >
              <h2 className="newCarouselItem transDown">
                <span>{item.heading}</span> <br />
                {item.subheading}
              </h2>
            </div>
          ))}
        </OwlCarousel>
      </section>

      <section id="best-course" className="best-course-section">
        <div className="container">
          <div
            className="section-title mb45 headline text-center"
            data-aos="zoom-in"
          >
            <span className="subtitle text-uppercase">Our Popular Courses</span>
            <h2>
              Our<span> Program Offering</span>
            </h2>
          </div>
          <div className="best-course-area mb45">
            <div className="row">
              {coursesData.map((course: Course, index: number) => (
                <div
                  className="col-md-4"
                  data-aos={course.aosStyle}
                  key={index}
                >
                  <a href={course.link}>
                    <div className="best-course-pic-text relative-position">
                      <div className="best-course-pic relative-position">
                        <Image
                          src={"/assets/img/course/" + course.imageFileName}
                          alt=""
                          width={500}
                          height={500}
                        />
                      </div>
                      <div className="best-course-text">
                        <div className="course-title mb20 headline relative-position">
                          <h2>{course.title}</h2>
                        </div>
                        <div className="course-meta">
                          <span className="course-category">
                            {course.description}
                          </span>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="why-choose"
        className="why-choose-section backgroud-style shapedividers_com-6217 jarallax"
      >
        <div className="container">
          <div
            className="section-title mb-5 headline text-center text-dark"
            data-aos="zoom-in"
          >
            <span className="subtitle text-uppercase text-dark">
              The B&B Advantage
            </span>
            <h2 className="text-dark">
              <span className="text-dark">Unlock Your Child’s Potential</span>
            </h2>
          </div>
          <div className="extra-features-content">
            <div className="row">
              <div className="col-md-4 col-sm-6">
                <div className="extra-left">
                  <div className="extra-left-content" data-aos="zoom-in-right">
                    {advantagesDataRight.map((advantage, index) => (
                      <div className="extra-icon-text" key={index}>
                        <div className="features-icon gradient-bg text-center">
                          <i className={advantage.iconClass}></i>
                        </div>
                        <div className="features-text">
                          <div className="features-text-title">
                            <h3>{advantage.title}</h3>
                          </div>
                          <div className="features-text-dec">
                            <span>{advantage.description}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div
                  className="extra-pic text-center"
                  data-aos="fade-up"
                  data-aos-duration="3000"
                >
                  <Image
                    src="/assets/img/banner/think-girl.png"
                    alt="img"
                    width={500}
                    height={500}
                  />
                </div>
              </div>
              <div className="col-md-4 col-sm-6">
                <div className="extra-right">
                  <div className="extra-left-content" data-aos="zoom-in-left">
                    {advantagesDataLeft.map((advantage, index) => (
                      <div className="extra-icon-text text-right" key={index}>
                        <div className="features-icon gradient-bg text-center">
                          <i className={advantage.iconClass}></i>
                        </div>
                        <div className="features-text pt25">
                          <div className="features-text-title text-right pb10">
                            <h3>{advantage.title}</h3>
                          </div>
                          <div className="features-text-dec text-right">
                            <span>{advantage.description}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ParentTestimonials />
      <Teachers />
      <FAQ />
      <section
        id="about-us"
        className="about-us-section home-secound home-third"
      >
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <div className="about-resigter-form backgroud-style relative-position">
                <ContactForm />
              </div>
            </div>

            <div className="col-md-7">
              <div className="about-us-text">
                <div className="section-title relative-position mb20 headline text-left">
                  <h2>
                    <span>Our Mission</span>
                  </h2>
                  <p>
                    At B&B, we empower young minds to master skills that shape
                    their future. Through innovative, hands-on learning, we make
                    complex subjects accessible and engaging. Our multi-year
                    curriculum ensures consistent growth, while expert
                    instructors provide personalized guidance every step of the
                    way. Our mission is to spark curiosity, build confidence,
                    and equip children for tomorrow’s challenges, all while
                    making learning an adventure.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
