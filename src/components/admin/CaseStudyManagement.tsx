
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, FileText } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { AdminUser, CaseStudy } from '@/types/admin';
import CaseCard from './CaseCard';
import AddCaseDialog from './AddCaseDialog';

interface CaseStudyManagementProps {
  adminUser: AdminUser | null;
}

const CaseStudyManagement = ({ adminUser }: CaseStudyManagementProps) => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [isAddCaseDialogOpen, setIsAddCaseDialogOpen] = useState(false);
  const [editingCase, setEditingCase] = useState<CaseStudy | null>(null);

  const fetchCaseStudies = async () => {
    try {
      const { data, error } = await supabase
        .from('case_studies')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const transformedData: CaseStudy[] = data?.map(item => ({
        ...item,
        results: Array.isArray(item.results) ? item.results.map(String) : [],
        challenges: Array.isArray(item.challenges) ? item.challenges.map(String) : [],
        solutions: Array.isArray(item.solutions) ? item.solutions.map(String) : []
      })) || [];
      
      setCaseStudies(transformedData);
    } catch (error) {
      console.error('Error fetching case studies:', error);
      toast({
        title: "Error",
        description: "Gagal mengambil data studi kasus",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const handleDeleteCase = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus studi kasus ini?')) return;

    try {
      const { error } = await supabase
        .from('case_studies')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Berhasil",
        description: "Studi kasus berhasil dihapus",
      });

      fetchCaseStudies();
    } catch (error) {
      console.error('Error deleting case study:', error);
      toast({
        title: "Error",
        description: "Gagal menghapus studi kasus",
        variant: "destructive",
      });
    }
  };

  const handleEditCase = (caseStudy: CaseStudy) => {
    setEditingCase(caseStudy);
  };

  const handleCloseDialog = () => {
    setIsAddCaseDialogOpen(false);
    setEditingCase(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Studi Kasus</h2>
        <Button 
          onClick={() => setIsAddCaseDialogOpen(true)}
          className="bg-primary hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Tambah Studi Kasus
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {caseStudies.map((caseStudy) => (
          <CaseCard
            key={caseStudy.id}
            caseStudy={caseStudy}
            onEdit={handleEditCase}
            onDelete={handleDeleteCase}
          />
        ))}
      </div>

      <AddCaseDialog
        isOpen={isAddCaseDialogOpen || editingCase !== null}
        onClose={handleCloseDialog}
        adminUser={adminUser}
        onCaseAdded={fetchCaseStudies}
        editingCase={editingCase}
      />
    </div>
  );
};

export default CaseStudyManagement;
