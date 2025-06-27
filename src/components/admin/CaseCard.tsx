
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Edit2, Trash2 } from 'lucide-react';
import { CaseStudy } from '@/types/admin';

interface CaseCardProps {
  caseStudy: CaseStudy;
  onEdit: (caseStudy: CaseStudy) => void;
  onDelete: (id: string) => void;
}

const CaseCard = ({ caseStudy, onEdit, onDelete }: CaseCardProps) => {
  return (
    <Card className="group">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">{caseStudy.title}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
              <div><strong>Kategori:</strong> {caseStudy.category}</div>
              <div><strong>Klien:</strong> {caseStudy.client}</div>
              <div><strong>Tahun:</strong> {caseStudy.year}</div>
              <div><strong>Status:</strong> {caseStudy.status}</div>
            </div>
            <p className="text-gray-700 mb-4">{caseStudy.description}</p>
          </div>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              onClick={() => onEdit(caseStudy)}
              size="sm"
              variant="outline"
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => onDelete(caseStudy.id)}
              size="sm"
              variant="destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CaseCard;
