import Link from "next/link";
import { Lato } from "next/font/google";

const lato = Lato({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext"],
  display: "auto",
});

function Footer() {
  return (
    <footer className={`bg-gray-50 border-t border-gray-200 py-8 ${lato.className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex items-center mb-6 sm:mb-0">
            <img
              src="/images/reindeers.jpg"
              alt="Reindeers Logo"
              className="h-20 w-20"
            />
          </div>
          <div className="flex flex-wrap justify-center space-x-12">
            <div>
              <h3 className="text-sm font-semibold text-gray-700">
                Get involved
              </h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link
                    href="/donate"
                    className="text-gray-500 hover:text-gray-900"
                  >
                    Donate
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className="text-gray-500 hover:text-gray-900"
                  >
                    Login
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700">
                Contact us
              </h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <a
                    href="mailto:example@gmail.com"
                    className="text-gray-500 hover:text-gray-900"
                  >
                    example@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+12345678910"
                    className="text-gray-500 hover:text-gray-900"
                  >
                    +1 (234) 567-8910
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700">About us</h3>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700">
                Privacy Policy
              </h3>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700">
                Join our mailing list
              </h3>
              <form className="mt-2 flex">
                <input
                  type="email"
                  placeholder="Example@email.com"
                  className="px-4 py-2 border border-gray-300 rounded-l-md focus:ring-teal-500 focus:border-teal-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-600 text-white rounded-r-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  Subscribe
                </button>
              </form>
              <button className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                Donate Now
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center items-center">
          <p className="text-gray-500 text-sm">© 2024 WELCOME TO REINDEER</p>
          <div className="flex space-x-4 ml-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/images/instagram.png"
                alt="Instagram"
                className="h-6 w-6"
              />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/images/linkedin.png"
                alt="LinkedIn"
                className="h-6 w-6"
              />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/images/facebook.png"
                alt="Facebook"
                className="h-6 w-6"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
