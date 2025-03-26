import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  isMobile?: boolean;
}

const Logo = ({ isMobile = false }: LogoProps) => {
  const logoProps = isMobile 
    ? { width: 200, height: 70, className: "h-16 w-auto" }
    : { width: 280, height: 100, className: "h-20 w-auto" };

  return (
    <Link href="/" className={`${isMobile ? 'md:hidden flex-shrink-0 mx-auto' : 'hidden md:block flex-shrink-0 pl-4'}`}>
      <Image
        src="/img/logo.png"
        alt="IT Work Force Logo"
        {...logoProps}
        priority
      />
    </Link>
  );
};

export default Logo; 