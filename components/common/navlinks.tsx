import Link from "next/link";

interface NavLinkProps {
  href: string;
  icon: React.ElementType; // For Lucide React icons
  children: React.ReactNode;
  onClick?: () => void; // Optional click handler for mobile menu close
}

const NavLink: React.FC<NavLinkProps> = ({
  href,
  icon: Icon,
  children,
  onClick,
}) => {
  return (
    <Link
      href={href}
      className="text-muted-foreground hover:text-foreground transition-colors flex items-center py-2 md:py-0"
      onClick={onClick}
    >
      <Icon className="mr-2 h-4 w-4" /> {children}
    </Link>
  );
};

export default NavLink;
