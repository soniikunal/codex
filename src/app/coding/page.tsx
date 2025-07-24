"use client";

import Head from "next/head";
import Image from "next/image";
import CodingCourseCategories from "@/app/coding/components/CodingCourseCategories";

import dynamic from "next/dynamic";
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});

interface CodingPageHeroSection {
  boldText1: string;
  normalText: string;
  boldText2: string;
}

const HeroSectionContent: CodingPageHeroSection[] = [
  {
    boldText1: "Learn, Build, Succeed ",
    normalText: "with",
    boldText2: "Coding",
  },
  {
    boldText1: "Prepare Your Child ",
    normalText: "for the",
    boldText2: "Digital Future",
  },
  {
    boldText1: "Turn Ideas ",
    normalText: "Into",
    boldText2: "Digital Reality",
  },
  {
    boldText1: "Prepare Your Child ",
    normalText: "for the",
    boldText2: "Digital Future",
  },
];

const Coding: React.FC = () => {
  return (
    <>
      <Head>
        <title>Brains & Brawns</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {/* <div id="preloader"></div> */}
      {/*<!-- Start of slider section
    ============================================= -->*/}

      <section id="" className="">
        <div className="slider-area codeing-bg slider-bg-1 relative-position shapedividers_com-9470">
          <div className="transDown">
            <OwlCarousel
              className=""
              loop
              margin={10}
              items={1}
              autoplay
              autoplayTimeout={3000}
              dots={false}>
              {HeroSectionContent.map((content, index) => (
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
      {/*<!-- End of slider section
    ============================================= -->*/}
      <CodingCourseCategories />

      <section
        id="why-choose"
        className="why-choose-section coding-why backgroud-style shapedividers_com-3237 jarallax">
        <div className="container">
          <div
            className="section-title mb-5 headline text-center text-dark"
            data-aos="zoom-in">
            <span className="subtitle text-uppercase text-dark">
              Brains and Brawns ADVANTAGES
            </span>
            <h2>
              {" "}
              <span className="text-dark">
                {" "}
                Why Choose Brains and Brawns for Coding?
              </span>
            </h2>
          </div>
          <div className="extra-features-content">
            <div className="row">
              <div className="col-md-4 col-sm-6">
                <div className="extra-left">
                  <div className="extra-left-content " data-aos="zoom-in-right">
                    <div className="extra-icon-text text-left">
                      <div className="features-icon gradient-bg text-center">
                        <i className="flaticon-maths-class-materials-cross-of-a-pencil-and-a-ruler"></i>
                      </div>
                      <div className="features-text">
                        <div className="features-text-title">
                          <h3>Expert Guidance</h3>
                        </div>
                        <div className="features-text-dec">
                          <span>
                            Learn from seasoned coding professionals with
                            real-world experience.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*<!-- // extra-left-content -->*/}

                  <div className="extra-left-content " data-aos="zoom-in-right">
                    <div className="extra-icon-text">
                      <div className="features-icon gradient-bg text-center">
                        <i className=" flaticon-clipboard-with-pencil"></i>
                      </div>
                      <div className="features-text pt25">
                        <div className="features-text-title">
                          <h3>Engaging Curriculum</h3>
                        </div>
                        <div className="features-text-dec">
                          <span>
                            Explore coding through fun hands-on projects and
                            real-world applications
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/*<!-- /extra-left -->*/}
              </div>
              {/*<!-- /col-sm-3 -->*/}

              <div className="col-sm-4">
                <div
                  className="extra-pic text-center"
                  data-aos="fade-up"
                  data-aos-duration="1200"
                  style={{ maxWidth: "260px", margin: "0 auto" }}>
                  <Image
                    src="/assets/img/coding/Coding - Brains and Brawns ADVANTAGES.png"
                    alt="img"
                    width={260}
                    height={195}
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "contain",
                    }}
                  />
                </div>
              </div>
              {/*<!-- /col-sm-6 -->*/}

              <div className="col-md-4 col-sm-6">
                <div className="extra-right">
                  <div className="extra-left-content" data-aos="zoom-in-left">
                    <div className="extra-icon-text text-right">
                      <div className="features-icon gradient-bg text-center">
                        <i className="flaticon-ruler-and-pencil"></i>
                      </div>
                      <div className="features-text pt25">
                        <div className="features-text-title text-right pb10">
                          <h3>Personalized Attention</h3>
                        </div>
                        <div className="features-text-dec text-right">
                          <span>
                            Receive tailored support to master coding at your
                            own pace
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*<!-- // extra-left-content -->*/}

                  <div className="extra-left-content" data-aos="zoom-in-left">
                    <div className="extra-icon-text text-right">
                      <div className="features-icon gradient-bg text-center">
                        <i className="flaticon-clipboards"></i>
                      </div>
                      <div className="features-text pt25">
                        <div className="features-text-title text-right pb10">
                          <h3>Build Real-World Skills</h3>
                        </div>
                        <div className="features-text-dec text-right">
                          <span>
                            Develop valuable coding skills for the digital age
                            and future careers
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/*<!-- /extra-left -->*/}
              </div>
              {/*<!-- /col-sm-3 -->*/}
            </div>
            {/*<!-- /row -->*/}
          </div>
        </div>
      </section>
    </>
  );
};
export default Coding;
