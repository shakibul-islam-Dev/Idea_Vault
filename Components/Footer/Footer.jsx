import Link from "next/link";

export default function Footer() {
  return (
    // bg-white (light mode) and dark:bg-neutral-900 (dark mode)
    <footer className="bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 border-t border-neutral-200 dark:border-neutral-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        {/* Top Section: Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand/About Column */}
          <div className="md:col-span-1">
            <Link
              href="/"
              className="text-xl font-bold text-neutral-900 dark:text-white tracking-wide"
            >
              Idea<span className="text-violet-500">Vault</span>
            </Link>
            <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Explore outstanding ideas and categories crafted carefully for
              your modern digital lifestyle.
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-neutral-900 dark:text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Platform
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/ideas"
                  className="hover:text-violet-500 dark:hover:text-amber-500 transition-colors duration-200"
                >
                  Ideas
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="hover:text-violet-500 dark:hover:text-amber-500 transition-colors duration-200"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/trending"
                  className="hover:text-violet-500 dark:hover:text-amber-500 transition-colors duration-200"
                >
                  Trending
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="hover:text-violet-500 dark:hover:text-amber-500 transition-colors duration-200"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-neutral-900 dark:text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm text-neutral-500 dark:text-neutral-400">
              <li>
                Email:{" "}
                <a
                  href="mailto:support@ideavault.com"
                  className="text-neutral-700 dark:text-neutral-300 hover:text-violet-500 dark:hover:text-amber-500 transition-colors"
                >
                  support@ideavault.com
                </a>
              </li>
              <li>
                Phone:{" "}
                <span className="text-neutral-700 dark:text-neutral-300">
                  +880 1234-567890
                </span>
              </li>
              <li>Location: Uttara, Dhaka, Bangladesh</li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-neutral-900 dark:text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Follow Us
            </h3>
            <div className="flex gap-4">
              {[
                {
                  label: "Facebook",
                  d: "M9 8H7v3h2v9h4v-9h3l.5-3H13V6c0-.5.5-1 1-1h2V2h-3a4 4 0 00-4 4v2z",
                },
                {
                  label: "X",
                  d: "M18.2 2.4h3.3l-7.2 8.2L22.8 21h-6.6l-5.2-6.8L5.1 21H1.8l7.7-8.8L1.2 2.4h6.8l4.7 6.2 5.5-6.2zm-1.2 16.6h1.8L7.1 4.3H5.1l11.9 14.7z",
                },
                {
                  label: "GitHub",
                  d: "M12 2C6.5 2 2 6.5 2 12c0 4.4 2.9 8.2 6.8 9.5.5.1.7-.2.7-.5V19.3c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.4-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7 0-.3-.4-1.3.1-2.7 0 0 .9-.3 2.8 1a9.7 9.7 0 015.1 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.8-2.3 4.7-4.6 4.9.4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0022 12c0-5.5-4.5-10-10-10z",
                },
              ].map((social, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-500 dark:text-neutral-400 hover:bg-violet-500 dark:hover:bg-amber-500 hover:text-white dark:hover:text-neutral-900 transition-all duration-300"
                  aria-label={social.label}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d={social.d} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="border-t border-neutral-200 dark:border-neutral-800 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-neutral-500">
          <p>
            &copy; {new Date().getFullYear()} IdeaVault. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <Link
              href="/privacy"
              className="hover:text-violet-500 dark:hover:text-neutral-300 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-violet-500 dark:hover:text-neutral-300 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
