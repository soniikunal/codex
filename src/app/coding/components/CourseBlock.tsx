import Link from "next/link";
import Image from "next/image";

interface CourseBlockProps {
  imageSrc: string;
  title: string;
  description: string;
  btnText: string;
  location: any;
  animationDairection: string;
}

const CourseBlock: React.FC<CourseBlockProps> = ({
  imageSrc,
  title,
  description,
  btnText,
  location,
  animationDairection,
}) => (
  <div
    className={
      "cc-block" +
      (animationDairection == "fade-left" ? " cc-block02" : " cc-block01")
    }
  >
    <div className="container">
      <div className="category-item">
        <div className="row align-items-center">
          <div className="col-md-6" data-aos={animationDairection}>
            <div className="ci-img">
              <Image src={imageSrc} alt={title} width={600} height={400} />
            </div>
          </div>
          <div
            className="col-md-6"
            data-aos={
              animationDairection == "fade-right" ? "fade-left" : "fade-right"
            }
          >
            <div className="ci-content">
              <h2>{title}</h2>
              <p dangerouslySetInnerHTML={{ __html: description }} />
              {location ? (
                <Link href="/course/coding" className="btn">
                  {btnText}
                </Link>
              ) : (
                <Link href="/selectLocation" className="btn">
                  <i className="fas fa-map-marker-alt"></i>&nbsp; Find a
                  Location
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CourseBlock;
