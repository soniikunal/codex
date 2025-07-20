"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

interface Teacher {
  name: string;
  educationalDetail: string;
  description: string;
  profile_url: string;
}

const Teachers: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      const res = await axios.get("teacher");
      setTeachers(res.data);
    };
    fetchTeachers();
  }, []);

  return (
    <div id="teacher-2" className="secound-teacher-section">
      <div className="container">
        <div className="section-title mb35 headline text-left">
          <span className="subtitle text-uppercase">Our Assets</span>
          <h2>
            Brains and Brawns <span>Teachers.</span>
          </h2>
        </div>

        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={25}
          breakpoints={{
            0: { slidesPerView: 1 },
            400: { slidesPerView: 1 },
            600: { slidesPerView: 2 },
            1000: { slidesPerView: 3 },
          }}
        >
          {teachers.map((teacher, idx) => (
            <SwiperSlide key={idx} style={{ height: "auto" }}>
              <div
                className="teacher-img-text relative-position text-center"
                style={{ height: "100%" }}
              >
                <div className="teacher-img-social relative-position">
                  <Image
                    src={teacher.profile_url}
                    alt={teacher.name}
                    width={250}
                    height={250}
                    style={{
                      // height: "210px",
                      aspectRatio: 1,
                      objectFit: "fill",
                    }}
                  />
                  {/* <div className="blakish-overlay"></div>
                  <div className="teacher-social-list ul-li">
                    <ul>
                      <li>
                        <a href="#">
                          <i className="fab fa-facebook-f"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fab fa-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fab fa-google-plus-g"></i>
                        </a>
                      </li>
                    </ul>
                  </div> */}
                </div>
                <div className="teacher-name-designation mt15">
                  <span className="teacher-name">{teacher.name}</span>
                  <span className="teacher-designation teacher-custom">
                    {teacher.educationalDetail}
                  </span>
                  <span className="teacher-designation teacher-custom">
                    {teacher.description}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Teachers;
