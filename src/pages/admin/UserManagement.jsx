import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

// Mock API function since the original API isn't available
const getConnections = () => {
  return Promise.resolve([
    { id: 'user2', fullname: 'John Smith', username: 'johnsmith', profilePic: '', bio: 'User bio 1' },
    { id: 'user3', fullname: 'Sarah Johnson', username: 'sarahj', profilePic: '', bio: 'User bio 2' },
    { id: 'user4', fullname: 'Mike Wilson', username: 'mikew', profilePic: '', bio: 'User bio 3' },
  ]);
};

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getConnections().then(connections => {
        const initialUsers = [
            { id: 'user1', fullname: 'Jane Doe', username: 'janedoe', profilePic: '', bio: 'Admin bio', role: 'Admin', status: 'Active' },
            ...connections.map(c => ({ ...c, role: 'User', status: 'Active' })),
             { id: 'user5', fullname: 'Emily Clark', username: 'emilyc', profilePic: '', bio: 'Banned user bio', role: 'User', status: 'Banned' },
        ];
        setUsers(initialUsers);
    });
  }, []);
  
  const handleRoleChange = (userId, newRole) => {
      setUsers(users.map(user => user.id === userId ? { ...user, role: newRole } : user));
  }
  
  const handleStatusChange = (userId, newStatus) => {
      setUsers(users.map(user => user.id === userId ? { ...user, status: newStatus } : user));
  }

  const handleDeleteUser = (userId) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
  }

  return (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold font-headline">Manage Users</h1>
        </div>
      <Card>
        <CardHeader>
          <CardTitle>Platform Users</CardTitle>
          <CardDescription>
            View, edit, and manage all registered users.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">User</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Role</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Status</th>
                  <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Actions</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {users.map((user) => (
                  <tr key={user.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                              <AvatarImage src={user.profilePic} alt={user.fullname} />
                              <AvatarFallback>{user.fullname.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="font-medium whitespace-nowrap">
                              <p>{user.fullname}</p>
                              <p className="text-sm text-muted-foreground">@{user.username}</p>
                          </div>
                        </div>
                    </td>
                    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                      <Select value={user.role} onValueChange={(value) => handleRoleChange(user.id, value)}>
                        <SelectTrigger className="w-[110px]">
                          <SelectValue placeholder="Role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="User">User</SelectItem>
                          <SelectItem value="Admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                     <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                       <Select value={user.status} onValueChange={(value) => handleStatusChange(user.id, value)}>
                          <SelectTrigger className="w-[110px]">
                              <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                              <SelectItem value="Active">Active</SelectItem>
                              <SelectItem value="Banned">Banned</SelectItem>
                          </SelectContent>
                       </Select>
                    </td>
                    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-right">
                       <AlertDialog>
                        <AlertDialogTrigger asChild>
                           <Button variant="destructive" size="sm">Delete</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the user's account.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteUser(user.id)}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default UserManagement;