
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2 } from 'lucide-react';
import { GalleryPhoto } from '@/types/admin';

interface PhotoCardProps {
  photo: GalleryPhoto;
  onDelete: (id: string) => void;
}

const PhotoCard = ({ photo, onDelete }: PhotoCardProps) => {
  return (
    <Card className="group">
      <div className="relative">
        <img
          src={photo.image_url}
          alt={photo.title}
          className="w-full h-48 object-cover rounded-t-lg"
          onError={(e) => {
            console.error('Image failed to load:', photo.image_url);
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder.svg';
          }}
          onLoad={() => {
            console.log('Image loaded successfully:', photo.image_url);
          }}
        />
        <Button
          onClick={() => onDelete(photo.id)}
          className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 p-2 opacity-0 group-hover:opacity-100 transition-opacity"
          size="sm"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2">{photo.title}</h3>
        <p className="text-sm text-gray-600 mb-2">{photo.description}</p>
        <p className="text-xs text-gray-500">
          {new Date(photo.date_taken).toLocaleDateString('id-ID')}
        </p>
      </CardContent>
    </Card>
  );
};

export default PhotoCard;
