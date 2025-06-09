
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Beranda', href: '/' },
    { name: 'Tentang Kami', href: '/tentang' },
    { name: 'Tim', href: '/tim' },
    { name: 'Studi Kasus', href: '/studi-kasus' },
    { name: 'Galeri Aktivitas', href: '/galeri-aktivitas' },
    { name: 'Kontak', href: '/kontak' },
  ];

  const layananItems = [
    { name: 'Hukum Pidana', href: '/layanan#pidana' },
    { name: 'Hukum Perdata', href: '/layanan#perdata' },
    { name: 'Hukum Bisnis', href: '/layanan#bisnis' },
    { name: 'Hukum Keluarga', href: '/layanan#keluarga' },
    { name: 'Hukum Pertanahan', href: '/layanan#pertanahan' },
    { name: 'Hukum Pajak', href: '/layanan#pajak' },
    { name: 'Mediasi & Arbitrase', href: '/layanan#mediasi' },
    { name: 'Konsultasi Hukum', href: '/layanan#konsultasi' },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="sticky top-0 z-50 bg-gray-50 shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/2349fbc5-deb1-46dd-9bae-218485f74177.png" 
              alt="YLP Logo" 
              className="h-12 w-auto"
            />
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-primary">
                Yasmine Lisasih Law Office
              </h1>
              <p className="text-sm text-muted-foreground">& Partners</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-gold-500 ${
                  isActive(item.href) 
                    ? 'text-gold-500 border-b-2 border-gold-500 pb-1' 
                    : 'text-foreground'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Layanan Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-gold-500 ${
                isActive('/layanan') 
                  ? 'text-gold-500 border-b-2 border-gold-500 pb-1' 
                  : 'text-foreground'
              }`}>
                <span>Layanan</span>
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-gray-50 border border-gray-200 shadow-lg">
                {layananItems.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link 
                      to={item.href} 
                      className="w-full px-4 py-2 text-sm hover:bg-gold-50 hover:text-gold-600 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link to="/kontak">
              <Button className="bg-gold-500 hover:bg-gold-600 text-white font-medium px-6 py-2">
                Konsultasi Gratis
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-md transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-gray-200 mt-4">
            <nav className="flex flex-col space-y-4 pt-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-colors hover:text-gold-500 px-2 py-1 ${
                    isActive(item.href) ? 'text-gold-500' : 'text-foreground'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Layanan Submenu */}
              <div className="px-2">
                <div className="text-sm font-medium text-foreground mb-2">Layanan:</div>
                <div className="grid grid-cols-1 gap-2 pl-4 border-l-2 border-gold-200">
                  {layananItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="text-sm text-muted-foreground hover:text-gold-500 transition-colors py-1"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              
              <Link to="/kontak">
                <Button 
                  className="bg-gold-500 hover:bg-gold-600 text-white w-full mt-4 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Konsultasi Gratis
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
