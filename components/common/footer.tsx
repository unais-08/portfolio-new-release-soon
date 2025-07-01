import SocialLinks from "@/components/common/social-links";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full border-t border-gray-200 py-8 mt-16 dark:border-gray-700">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        {/* Copyright and Name */}
        <div className="mb-4 md:mb-0 text-gray-600 dark:text-gray-400">
          <p>&copy; {currentYear} Shaikh Unais. All rights reserved.</p>
        </div>

        {/* Social Links */}
        <div className="flex space-x-6 mb-4 md:mb-0">
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
