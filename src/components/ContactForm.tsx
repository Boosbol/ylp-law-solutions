
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    telepon: '',
    perusahaan: '',
    layanan: '',
    prioritas: '',
    pesan: '',
    privacy: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.privacy) {
      toast({
        title: "Error",
        description: "Anda harus menyetujui Kebijakan Privasi dan Syarat & Ketentuan",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          nama: formData.nama,
          email: formData.email,
          telepon: formData.telepon,
          perusahaan: formData.perusahaan,
          layanan: formData.layanan,
          prioritas: formData.prioritas,
          pesan: formData.pesan
        }
      });

      if (error) throw error;

      toast({
        title: "Pesan Berhasil Dikirim!",
        description: "Terima kasih atas pesan Anda. Tim kami akan segera menghubungi Anda.",
      });

      // Reset form
      setFormData({
        nama: '',
        email: '',
        telepon: '',
        perusahaan: '',
        layanan: '',
        prioritas: '',
        pesan: '',
        privacy: false
      });

    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Gagal Mengirim Pesan",
        description: "Terjadi kesalahan. Silakan coba lagi atau hubungi kami langsung.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl flex items-center">
          <MessageSquare className="h-6 w-6 mr-2 text-gold-500" />
          Kirim Pesan
        </CardTitle>
        <p className="text-muted-foreground">
          Isi formulir di bawah ini dan tim kami akan segera menghubungi Anda
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nama">Nama Lengkap *</Label>
              <Input 
                id="nama" 
                name="nama"
                value={formData.nama}
                onChange={handleInputChange}
                placeholder="Masukkan nama lengkap" 
                required 
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input 
                id="email" 
                name="email"
                type="email" 
                value={formData.email}
                onChange={handleInputChange}
                placeholder="nama@email.com" 
                required 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="telepon">Nomor Telepon *</Label>
              <Input 
                id="telepon" 
                name="telepon"
                value={formData.telepon}
                onChange={handleInputChange}
                placeholder="+62 xxx xxx xxx" 
                required 
              />
            </div>
            <div>
              <Label htmlFor="perusahaan">Perusahaan (Opsional)</Label>
              <Input 
                id="perusahaan" 
                name="perusahaan"
                value={formData.perusahaan}
                onChange={handleInputChange}
                placeholder="Nama perusahaan" 
              />
            </div>
          </div>

          <div>
            <Label htmlFor="layanan">Jenis Layanan *</Label>
            <select 
              id="layanan"
              name="layanan"
              value={formData.layanan}
              onChange={handleInputChange}
              className="w-full p-2 border border-input rounded-md"
              required
            >
              <option value="">Pilih jenis layanan</option>
              <option value="pidana">Hukum Pidana</option>
              <option value="perdata">Hukum Perdata</option>
              <option value="korporat">Hukum Korporat</option>
              <option value="ketenagakerjaan">Hukum Ketenagakerjaan</option>
              <option value="properti">Hukum Properti</option>
              <option value="mediasi">Mediasi & Arbitrase</option>
              <option value="lainnya">Lainnya</option>
            </select>
          </div>

          <div>
            <Label htmlFor="prioritas">Tingkat Urgensi *</Label>
            <select 
              id="prioritas"
              name="prioritas"
              value={formData.prioritas}
              onChange={handleInputChange}
              className="w-full p-2 border border-input rounded-md"
              required
            >
              <option value="">Pilih tingkat urgensi</option>
              <option value="rendah">Rendah (Respon dalam 2-3 hari)</option>
              <option value="normal">Normal (Respon dalam 24 jam)</option>
              <option value="tinggi">Tinggi (Respon dalam 6 jam)</option>
              <option value="darurat">Darurat (Respon dalam 2 jam)</option>
            </select>
          </div>

          <div>
            <Label htmlFor="pesan">Deskripsi Kasus/Kebutuhan *</Label>
            <Textarea 
              id="pesan"
              name="pesan"
              value={formData.pesan}
              onChange={handleInputChange}
              className="h-32"
              placeholder="Jelaskan secara singkat masalah hukum atau kebutuhan Anda..."
              required
            />
          </div>

          <div className="flex items-start space-x-2">
            <input 
              type="checkbox" 
              id="privacy" 
              name="privacy"
              checked={formData.privacy}
              onChange={handleInputChange}
              className="mt-1" 
              required
            />
            <Label htmlFor="privacy" className="text-sm">
              Saya menyetujui <a href="#" className="text-gold-600 hover:underline">Kebijakan Privasi</a> dan 
              <a href="#" className="text-gold-600 hover:underline"> Syarat & Ketentuan</a>
            </Label>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gold-500 hover:bg-gold-600"
            disabled={isSubmitting}
          >
            <Send className="h-4 w-4 mr-2" />
            {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
