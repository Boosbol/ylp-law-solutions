
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { AdminUser, NewCase, CaseStudy } from '@/types/admin';

interface AddCaseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  adminUser: AdminUser | null;
  onCaseAdded: () => void;
  editingCase?: CaseStudy | null;
}

const AddCaseDialog = ({ isOpen, onClose, adminUser, onCaseAdded, editingCase }: AddCaseDialogProps) => {
  const [newCase, setNewCase] = useState<NewCase>({
    title: '',
    category: '',
    client: '',
    year: new Date().getFullYear().toString(),
    duration: '',
    dispute_value: '',
    status: '',
    case_number: '',
    description: '',
    results: '',
    challenges: '',
    solutions: ''
  });

  useEffect(() => {
    if (editingCase) {
      setNewCase({
        title: editingCase.title,
        category: editingCase.category,
        client: editingCase.client,
        year: editingCase.year,
        duration: editingCase.duration,
        dispute_value: editingCase.dispute_value,
        status: editingCase.status,
        case_number: editingCase.case_number,
        description: editingCase.description,
        results: editingCase.results.join('\n'),
        challenges: editingCase.challenges.join('\n'),
        solutions: editingCase.solutions.join('\n')
      });
    } else {
      setNewCase({
        title: '',
        category: '',
        client: '',
        year: new Date().getFullYear().toString(),
        duration: '',
        dispute_value: '',
        status: '',
        case_number: '',
        description: '',
        results: '',
        challenges: '',
        solutions: ''
      });
    }
  }, [editingCase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingCase) {
        const { error } = await supabase
          .from('case_studies')
          .update({
            title: newCase.title,
            category: newCase.category,
            client: newCase.client,
            year: newCase.year,
            duration: newCase.duration,
            dispute_value: newCase.dispute_value,
            status: newCase.status,
            case_number: newCase.case_number,
            description: newCase.description,
            results: newCase.results.split('\n').filter(r => r.trim()),
            challenges: newCase.challenges.split('\n').filter(c => c.trim()),
            solutions: newCase.solutions.split('\n').filter(s => s.trim()),
            updated_at: new Date().toISOString()
          })
          .eq('id', editingCase.id);

        if (error) throw error;

        toast({
          title: "Berhasil",
          description: "Studi kasus berhasil diperbarui",
        });
      } else {
        const { error } = await supabase
          .from('case_studies')
          .insert([{
            title: newCase.title,
            category: newCase.category,
            client: newCase.client,
            year: newCase.year,
            duration: newCase.duration,
            dispute_value: newCase.dispute_value,
            status: newCase.status,
            case_number: newCase.case_number,
            description: newCase.description,
            results: newCase.results.split('\n').filter(r => r.trim()),
            challenges: newCase.challenges.split('\n').filter(c => c.trim()),
            solutions: newCase.solutions.split('\n').filter(s => s.trim()),
            created_by: adminUser?.id
          }]);

        if (error) throw error;

        toast({
          title: "Berhasil",
          description: "Studi kasus berhasil ditambahkan",
        });
      }

      onClose();
      onCaseAdded();
    } catch (error) {
      console.error('Error saving case study:', error);
      toast({
        title: "Error",
        description: editingCase ? "Gagal memperbarui studi kasus" : "Gagal menambahkan studi kasus",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingCase ? 'Edit Studi Kasus' : 'Tambah Studi Kasus Baru'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Judul</Label>
              <Input
                id="title"
                value={newCase.title}
                onChange={(e) => setNewCase({...newCase, title: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="category">Kategori</Label>
              <Input
                id="category"
                value={newCase.category}
                onChange={(e) => setNewCase({...newCase, category: e.target.value})}
                placeholder="Hukum Pidana/Perdata"
                required
              />
            </div>
            <div>
              <Label htmlFor="client">Klien</Label>
              <Input
                id="client"
                value={newCase.client}
                onChange={(e) => setNewCase({...newCase, client: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="year">Tahun</Label>
              <Input
                id="year"
                value={newCase.year}
                onChange={(e) => setNewCase({...newCase, year: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="duration">Durasi</Label>
              <Input
                id="duration"
                value={newCase.duration}
                onChange={(e) => setNewCase({...newCase, duration: e.target.value})}
                placeholder="6 bulan"
                required
              />
            </div>
            <div>
              <Label htmlFor="dispute_value">Nilai Sengketa</Label>
              <Input
                id="dispute_value"
                value={newCase.dispute_value}
                onChange={(e) => setNewCase({...newCase, dispute_value: e.target.value})}
                placeholder="IDR 326 juta"
                required
              />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Input
                id="status"
                value={newCase.status}
                onChange={(e) => setNewCase({...newCase, status: e.target.value})}
                placeholder="Mediasi Berhasil"
                required
              />
            </div>
            <div>
              <Label htmlFor="case_number">Nomor Perkara</Label>
              <Input
                id="case_number"
                value={newCase.case_number}
                onChange={(e) => setNewCase({...newCase, case_number: e.target.value})}
                required
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="description">Deskripsi</Label>
            <Textarea
              id="description"
              value={newCase.description}
              onChange={(e) => setNewCase({...newCase, description: e.target.value})}
              rows={4}
              required
            />
          </div>

          <div>
            <Label htmlFor="results">Hasil Dicapai (satu per baris)</Label>
            <Textarea
              id="results"
              value={newCase.results}
              onChange={(e) => setNewCase({...newCase, results: e.target.value})}
              rows={4}
              placeholder="Penyelesaian melalui mediasi berhasil&#10;Akta Perdamaian ditandatangani"
              required
            />
          </div>

          <div>
            <Label htmlFor="challenges">Tantangan (satu per baris)</Label>
            <Textarea
              id="challenges"
              value={newCase.challenges}
              onChange={(e) => setNewCase({...newCase, challenges: e.target.value})}
              rows={4}
              placeholder="Sisa hutang yang besar&#10;Melibatkan pejabat publik"
              required
            />
          </div>

          <div>
            <Label htmlFor="solutions">Solusi (satu per baris)</Label>
            <Textarea
              id="solutions"
              value={newCase.solutions}
              onChange={(e) => setNewCase({...newCase, solutions: e.target.value})}
              rows={4}
              placeholder="Pendekatan mediasi yang konstruktif&#10;Negosiasi jadwal pembayaran"
              required
            />
          </div>

          <Button type="submit" className="w-full">
            {editingCase ? 'Perbarui Studi Kasus' : 'Tambah Studi Kasus'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCaseDialog;
