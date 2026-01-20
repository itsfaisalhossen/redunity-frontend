import { Droplet, Facebook, Instagram, MailCheck, Phone } from "lucide-react";
import { Link } from "react-router";
import Container from "./Container";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="bg-black">
      <Container>
        <footer className="relative ">
          {/* Main Footer Content */}
          <div className="py-16 lg:py-20 text-white">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
              {/* Brand Section */}
              <div className="lg:col-span-4">
                <div className="flex items-center gap-2  font-bold z-50">
                  <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center shadow-md">
                    {/* <BiLayer className="text-white" size={20} /> */}
                    <Droplet className="text-white" size={20} />
                  </div>
                  <span className="text-xl md:text-3xl font-black tracking-tighter text-white uppercase">
                    RedUnity
                  </span>
                </div>
                <p className="mt-6 text-balance leading-relaxed text-primary-foreground/80">
                  Connecting donors with those in need. Every donation saves
                  lives. Join our community of heroes making a difference one
                  drop at a time.
                </p>

                {/* Social Links */}
                <div className="mt-8 flex items-center gap-4">
                  <Link
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/10 transition-colors hover:bg-accent hover:text-accent-foreground"
                    aria-label="Facebook"
                  >
                    <div className="bg-red-50 hover:bg-red1300 duration-300 rounded p-3">
                      <Facebook className="h-5 w-5 text-black" />
                    </div>
                  </Link>
                  <Link
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/10 transition-colors hover:bg-accent hover:text-accent-foreground"
                    aria-label="Instagram"
                  >
                    <div className="bg-red-50 hover:bg-red-100 duration-300 rounded p-3">
                      <Instagram className="h-5 w-5 text-black" />
                    </div>
                  </Link>
                  <Link
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/10 transition-colors hover:bg-accent hover:text-accent-foreground"
                    aria-label="Phone"
                  >
                    <div className="bg-red-50 hover:bg-1ed-300 duration-300 rounded p-3">
                      <Phone className="h-5 w-5 text-black" />
                    </div>
                  </Link>
                  <Link
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/10 transition-colors hover:bg-accent hover:text-accent-foreground"
                    aria-label="Email"
                  >
                    <div className="bg-red-50 hover:bg-red-100 duration-300 rounded p-3">
                      <MailCheck className="h-5 w-5 text-black" />
                    </div>
                  </Link>
                </div>
              </div>

              {/* Navigation Sections */}
              <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
                {/* Donate */}
                <div>
                  <h3 className="text-sm md:text-lg font-semibold uppercase tracking-wider text-accent">
                    Donate
                  </h3>
                  <ul className="mt-6 space-y-4">
                    {[
                      "Find Blood Drive",
                      "Schedule Donation",
                      "Eligibility",
                      "Blood Types",
                      "Donation Process",
                    ].map((item) => (
                      <li key={item}>
                        <Link className="text-sm hover:text-red-500 text-white transition-colors  ">
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Learn More */}
                <div>
                  <h3 className="text-sm md:text-lg font-semibold uppercase tracking-wider text-accent">
                    Learn More
                  </h3>
                  <ul className="mt-6 space-y-4">
                    {[
                      "About Us",
                      "Success Stories",
                      "Health Benefits",
                      "FAQs",
                      "Blog",
                    ].map((item) => (
                      <li key={item}>
                        <Link className="text-sm hover:text-red-500 text-white transition-colors  ">
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Support */}
                <div>
                  <h3 className="text-sm md:text-lg font-semibold uppercase tracking-wider text-accent">
                    Support
                  </h3>
                  <ul className="mt-6 space-y-4">
                    {[
                      "Help Center",
                      "Contact Us",
                      "Find Locations",
                      "Emergency Request",
                      "Volunteer",
                    ].map((item) => (
                      <li key={item}>
                        <Link className="text-sm hover:text-red-500 text-white transition-colors ">
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="mt-16 border-t dark:border-white/30 border-primary-foreground/10 pt-8">
              <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                <p className="text-sm text-primary-foreground/60">
                  © {currentYear} RedUnity Blood Donation. All rights reserved.
                </p>
                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <Link className="text-primary-foreground/60 transition-colors hover:text-accent">
                    Privacy Policy
                  </Link>
                  <Link className="text-primary-foreground/60 transition-colors hover:text-accent">
                    Terms of Service
                  </Link>
                  <Link className="text-primary-foreground/60 transition-colors hover:text-accent">
                    Cookie Policy
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent" />
        </footer>
      </Container>
    </div>
  );
};
export default Footer;
