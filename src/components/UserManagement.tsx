
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Trash2, Plus, Edit, X, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import bcrypt from 'bcryptjs';

interface AdminUser {
  id: string;
  email: string;
  name: string;
  created_at: string;
}

interface UserManagementProps {
  currentUserId: string;
}

const UserManagement = ({ currentUserId }: UserManagementProps) => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      console.log('Fetching admin users...');
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .order('created_at', { ascending: false });

      console.log('Fetch result:', { data, error });

      if (error) {
        console.error('Error fetching users:', error);
        throw error;
      }
      
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error",
        description: "Gagal mengambil data user",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (submitting) return;
    setSubmitting(true);
    
    try {
      console.log('Adding new user:', { name: newUser.name, email: newUser.email });
      
      // Hash password
      const passwordHash = await bcrypt.hash(newUser.password, 10);
      
      const { data, error } = await supabase
        .from('admin_users')
        .insert([{
          name: newUser.name,
          email: newUser.email,
          password_hash: passwordHash
        }])
        .select()
        .single();

      console.log('Insert result:', { data, error });

      if (error) {
        console.error('Insert error:', error);
        if (error.code === '23505') {
          toast({
            title: "Error",
            description: "Email sudah digunakan oleh user lain",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: `Gagal menambahkan user admin: ${error.message}`,
            variant: "destructive",
          });
        }
        return;
      }

      toast({
        title: "Berhasil",
        description: "User admin berhasil ditambahkan",
      });

      setNewUser({ name: '', email: '', password: '' });
      setIsAddDialogOpen(false);
      fetchUsers();
    } catch (error) {
      console.error('Error adding user:', error);
      toast({
        title: "Error",
        description: "Gagal menambahkan user admin",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateUser = async (userId: string, updates: { name?: string; email?: string; password?: string }) => {
    if (submitting) return;
    setSubmitting(true);

    try {
      console.log('Updating user:', userId, updates);
      
      const updateData: any = {};
      
      if (updates.name) updateData.name = updates.name;
      if (updates.email) updateData.email = updates.email;
      if (updates.password) {
        updateData.password_hash = await bcrypt.hash(updates.password, 10);
      }

      const { error } = await supabase
        .from('admin_users')
        .update(updateData)
        .eq('id', userId);

      console.log('Update result:', { error });

      if (error) {
        console.error('Update error:', error);
        if (error.code === '23505') {
          toast({
            title: "Error",
            description: "Email sudah digunakan oleh user lain",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: `Gagal mengupdate data user: ${error.message}`,
            variant: "destructive",
          });
        }
        return;
      }

      toast({
        title: "Berhasil",
        description: "Data user berhasil diupdate",
      });

      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
      toast({
        title: "Error",
        description: "Gagal mengupdate data user",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (userId === currentUserId) {
      toast({
        title: "Error",
        description: "Tidak dapat menghapus akun sendiri",
        variant: "destructive",
      });
      return;
    }

    if (!confirm('Apakah Anda yakin ingin menghapus user ini?')) return;

    if (submitting) return;
    setSubmitting(true);

    try {
      console.log('Deleting user:', userId);
      
      const { error } = await supabase
        .from('admin_users')
        .delete()
        .eq('id', userId);

      console.log('Delete result:', { error });

      if (error) {
        console.error('Delete error:', error);
        throw error;
      }

      toast({
        title: "Berhasil",
        description: "User berhasil dihapus",
      });

      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        title: "Error",
        description: "Gagal menghapus user",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Memuat data user...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Manajemen User Admin</CardTitle>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90" disabled={submitting}>
              <Plus className="h-4 w-4 mr-2" />
              Tambah User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah User Admin Baru</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <Label htmlFor="name">Nama</Label>
                <Input
                  id="name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  required
                  disabled={submitting}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  required
                  disabled={submitting}
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                  required
                  minLength={6}
                  disabled={submitting}
                />
              </div>
              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? 'Menambahkan...' : 'Tambah User'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Tanggal Dibuat</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  {editingUser?.id === user.id ? (
                    <Input
                      value={editingUser.name}
                      onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                      className="w-full"
                      disabled={submitting}
                    />
                  ) : (
                    <span className={user.id === currentUserId ? 'font-semibold text-primary' : ''}>
                      {user.name} {user.id === currentUserId && '(Anda)'}
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  {editingUser?.id === user.id ? (
                    <Input
                      type="email"
                      value={editingUser.email}
                      onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                      className="w-full"
                      disabled={submitting}
                    />
                  ) : (
                    user.email
                  )}
                </TableCell>
                <TableCell>
                  {new Date(user.created_at).toLocaleDateString('id-ID')}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    {editingUser?.id === user.id ? (
                      <>
                        <Button
                          size="sm"
                          onClick={() => handleUpdateUser(user.id, {
                            name: editingUser.name,
                            email: editingUser.email
                          })}
                          className="bg-green-500 hover:bg-green-600"
                          disabled={submitting}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingUser(null)}
                          disabled={submitting}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingUser(user)}
                          disabled={submitting}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        {user.id !== currentUserId && (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteUser(user.id)}
                            disabled={submitting}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {users.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Tidak ada user admin yang ditemukan
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserManagement;
