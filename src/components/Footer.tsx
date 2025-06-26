
import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/lovable-uploads/68c75b06-1651-479d-8fb4-362a875ec3ed.png" 
                alt="YLP Logo" 
                className="h-10 w-auto"
              />
              <div>
                <h3 className="text-lg font-bold">Yasmine Lisasih Law Office</h3>
                <p className="text-sm text-gray-300">& Partners</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Mitra hukum terkemuka dengan layanan unggul, inovatif, dan profesional. 
              Berkolaborasi dengan Hotman 911 untuk penanganan kasus kompleks.
            </p>
            <p className="text-sm text-gray-400">
              Didirikan 17 Agustus 2023
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Tautan Cepat</h4>
            <ul className="space-y-2">
              <li><Link to="/tentang" className="text-gray-300 hover:text-gold-500 transition-colors">Tentang Kami</Link></li>
              <li><Link to="/layanan" className="text-gray-300 hover:text-gold-500 transition-colors">Layanan</Link></li>
              <li><Link to="/tim" className="text-gray-300 hover:text-gold-500 transition-colors">Tim</Link></li>
              <li><Link to="/studi-kasus" className="text-gray-300 hover:text-gold-500 transition-colors">Studi Kasus</Link></li>
              <li><Link to="/galeri-aktivitas" className="text-gray-300 hover:text-gold-500 transition-colors">Galeri Aktivitas</Link></li>
              <li><Link to="/kontak" className="text-gray-300 hover:text-gold-500 transition-colors">Kontak</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Kontak</h4>
            <div className="space-y-3 text-gray-300">
              <div>
                <p className="font-medium">Kantor Pusat</p>
                <p className="text-sm">Paragon Business Park Blok B28 V</p>
                <p className="text-sm">Lippo Cikarang, Bekasi</p>
                <p className="text-sm">+62 856 4211 1789</p>
              </div>
              <div>
                <p className="font-medium">Kantor Cabang</p>
                <p className="text-sm">Jl. Kebon Jeruk XV No.13</p>
                <p className="text-sm">Jakarta Barat</p>
                <p className="text-sm">+62 878 8471 7155</p>
              </div>
              <div>
                <p className="font-medium">Email</p>
                <p className="text-sm">nin_yasmine@yahoo.co.id</p>
              </div>
              <div>
                <p className="font-medium">Instagram</p>
                <div className="flex items-center space-x-2">
                  <Instagram className="h-4 w-4" />
                  <p className="text-sm">@yasminelisasihlawoffice</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2023 Yasmine Lisasih Law Office & Partners. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
