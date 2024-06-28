import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-400 py-8 ">
    <div className="max-w-[1200px] mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 lg:w-1/3 place-content-center lg:place-content-start">
          <h1 className="text-xl font-bold text-center lg:text-start">SweetShare</h1>
          <p className="text-sm mt-2 text-center lg:text-start">Sharing delicious recipes with the world!</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-4 place-content-center items-center  lg:w-1/3">
          <Link href="/">
            <span className=" hover:text-primary cursor-pointer">Home</span>
          </Link>
          <Link href="/categories">
            <span className=" hover:text-primary cursor-pointer">Recipes</span>
          </Link>
          <Link href="/contact">
            <span className=" hover:text-primary cursor-pointer">Contact</span>
          </Link>
        </div>
        <div className="flex space-x-8 mt-4 md:mt-0 lg:w-1/3 place-content-end">
          <Link href="https://facebook.com" passHref>
            <div className=" hover:text-primary">
              <FaFacebook size={24} />
            </div>
          </Link>
          <Link href="https://twitter.com" passHref>
            <div className=" hover:text-primary">
              <FaTwitter size={24} />
            </div>
          </Link>
          <Link href="https://instagram.com" passHref>
            <div className=" hover:text-primary">
              <FaInstagram size={24} />
            </div>
          </Link>
        </div>
      </div>
      <div className="text-center mt-8">
        <p className="text-sm">&copy; {new Date().getFullYear()} SweetShare. All rights reserved.</p>
      </div>
    </div>
  </footer>
  );
};

export default Footer;
