"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocation } from "@/lib/LocationContext";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const { location } = useLocation();
  const pathname = usePathname();
  const isSelectLocationPage = pathname === "/selectLocation";
  return (
    <header>
      <div
        id="main-menu"
        className={`main-menu-container ${
          isSelectLocationPage ? "menu-bg-overlay-custom" : ""
        }`}
      >
        <div className="main-menu">
          <div className="container">
            <div className="navbar-default">
              <div className="navbar-header float-left">
                <Link href="/" className="navbar-brand text-uppercase">
                  <Image
                    src="/assets/img/logo/Logo_ 1.png"
                    alt="logo"
                    width={150}
                    height={50}
                  />
                </Link>
              </div>

              <div className="cart-search float-right ul-li find-location-header">
                <ul>
                  <li>
                    <Link href="/selectLocation">
                      <i className="fas fa-map-marker-alt"></i>&nbsp;
                      {location?.shortName || "Find Location"}
                    </Link>
                  </li>
                </ul>
              </div>

              <nav className="navbar-menu float-right">
                <div className="nav-menu ul-li">
                  <ul>
                    <li className="menu-item-has-children ul-li-block">
                      <Link href="/">Home</Link>
                    </li>

                    <li className="menu-item-has-children ul-li-block">
                      <a href="#">About</a>
                      <ul className="sub-menu">
                        <li>
                          <Link href="/contact">Contact Us</Link>
                        </li>
                        {/* <li><Link href="news">News & Events</Link></li> */}
                      </ul>
                    </li>

                    <li className="menu-item-has-children ul-li-block">
                      <a href="#">Programs</a>
                      <ul className="sub-menu">
                        <li>
                          <Link href="/coding">Coding</Link>
                        </li>
                        <li>
                          <Link href="/science">Science</Link>
                        </li>
                        <li>
                          <Link href="/math">Math</Link>
                        </li>
                        {/* <li><Link href="camp">Camp</Link></li> */}
                      </ul>
                    </li>

                    <li className="menu-item-has-children ul-li-block">
                      <a
                        href="http://ec2-54-209-232-211.compute-1.amazonaws.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        LMS Login
                      </a>
                    </li>
                  </ul>
                </div>
              </nav>

              <div className="mobile-menu">
                <div className="logo">
                  <Link href="/">
                    <Image
                      src="/assets/img/logo/logo.png"
                      alt="Logo"
                      width={100}
                      height={50} // or adjust to keep aspect ratio
                    />
                  </Link>
                </div>

                <nav>
                  <ul>
                    <li>
                      <Link href="/">Home</Link>
                    </li>
                    <li>
                      <a href="#">About</a>
                      <ul>
                        <li>
                          <Link href="#">Contact Us</Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="#">Programs</a>
                      <ul>
                        <li>
                          <Link href="/coding">Coding</Link>
                        </li>
                        <li>
                          <Link href="/science">Science</Link>
                        </li>
                        <li>
                          <Link href="/math">Math</Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a
                        href="http://ec2-54-209-232-211.compute-1.amazonaws.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        LMS Login
                      </a>
                    </li>
                    <li>
                      <Link href="/contact">Contact</Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
