import { Droplet, Facebook, Instagram, MailCheck, Phone } from "lucide-react";
import { Link } from "react-router";
import Container from "./Container";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="bg-white">
      <Container>
        <footer className="relative ">
          {/* Main Footer Content */}
          <div className="py-16 lg:py-20">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
              {/* Brand Section */}
              <div className="lg:col-span-4">
                <h3 className="sirin-stencil-regular items-start mx-auto flex justify-start  font-extrabold text-4xl text-center">
                  <Droplet size={35} color="red" />
                  RedUnity
                </h3>
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
                    <div className="bg-red-50 hover:bg-red-300 duration-300 rounded p-3">
                      <Facebook className="h-5 w-5" />
                    </div>
                  </Link>
                  <Link
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/10 transition-colors hover:bg-accent hover:text-accent-foreground"
                    aria-label="Instagram"
                  >
                    <div className="bg-red-50 hover:bg-red-300 duration-300 rounded p-3">
                      <Instagram className="h-5 w-5" />
                    </div>
                  </Link>
                  <Link
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/10 transition-colors hover:bg-accent hover:text-accent-foreground"
                    aria-label="Phone"
                  >
                    <div className="bg-red-50 hover:bg-red-300 duration-300 rounded p-3">
                      <Phone className="h-5 w-5" />
                    </div>
                  </Link>
                  <Link
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/10 transition-colors hover:bg-accent hover:text-accent-foreground"
                    aria-label="Email"
                  >
                    <div className="bg-red-50 hover:bg-red-300 duration-300 rounded p-3">
                      <MailCheck className="h-5 w-5" />
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
                        <Link
                          href="#"
                          className="text-sm hover:text-red-500 text-black transition-colors  "
                        >
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
                        <Link
                          href="#"
                          className="text-sm hover:text-red-500 text-black transition-colors  "
                        >
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
                        <Link
                          href="#"
                          className="text-sm hover:text-red-500 text-black transition-colors "
                        >
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="mt-16 border-t border-primary-foreground/10 pt-8">
              <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                <p className="text-sm text-primary-foreground/60">
                  © {currentYear} RedUnity Blood Donation. All rights reserved.
                </p>
                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <Link
                    href="#"
                    className="text-primary-foreground/60 transition-colors hover:text-accent"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href="#"
                    className="text-primary-foreground/60 transition-colors hover:text-accent"
                  >
                    Terms of Service
                  </Link>
                  <Link
                    href="#"
                    className="text-primary-foreground/60 transition-colors hover:text-accent"
                  >
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
