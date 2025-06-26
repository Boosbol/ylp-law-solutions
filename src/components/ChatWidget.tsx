
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, X, ExternalLink, Scale } from 'lucide-react';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  // WhatsApp numbers from the contact page
  const whatsappNumbers = [
    {
      label: "Kantor Pusat",
      number: "+62 856 4211 1789",
      location: "Lippo Cikarang"
    },
    {
      label: "Kantor Cabang", 
      number: "+62 878 8471 7155",
      location: "Jakarta Barat"
    },
    {
      label: "Kontak Darurat",
      number: "+62 821 3746 2729",
      location: "24/7 Emergency"
    }
  ];

  const openWhatsApp = (number: string) => {
    const message = encodeURIComponent("Halo, saya ingin berkonsultasi mengenai layanan hukum Yasmine Lisasih Law Office & Partners.");
    const whatsappUrl = `https://wa.me/${number.replace(/[^0-9]/g, '')}?text=${message}`;
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gold-500 hover:bg-gold-600 text-white shadow-lg z-50"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* WhatsApp Options Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-80 shadow-xl z-50 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between p-4 bg-primary text-white rounded-t-lg flex-shrink-0">
            <div className="flex items-center space-x-2">
              <Scale className="h-5 w-5" />
              <CardTitle className="text-sm font-medium">
                Hubungi via WhatsApp
              </CardTitle>
            </div>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-white hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          
          <CardContent className="p-4 space-y-3">
            <p className="text-sm text-gray-600 mb-4">
              Pilih nomor WhatsApp untuk konsultasi langsung:
            </p>
            
            {whatsappNumbers.map((contact, index) => (
              <Button
                key={index}
                onClick={() => openWhatsApp(contact.number)}
                variant="outline"
                className="w-full justify-between p-4 h-auto hover:bg-green-50 hover:border-green-500 transition-colors"
              >
                <div className="text-left">
                  <div className="font-medium text-sm">{contact.label}</div>
                  <div className="text-xs text-gray-500">{contact.location}</div>
                  <div className="text-xs font-mono text-green-600">{contact.number}</div>
                </div>
                <ExternalLink className="h-4 w-4 text-green-600" />
              </Button>
            ))}
            
            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <p className="text-xs text-green-700">
                <strong>Jam Operasional:</strong><br />
                Senin - Jumat: 08:00 - 17:00 WIB<br />
                Darurat: 24/7
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ChatWidget;
