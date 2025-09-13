import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, changeRole, changeStatus, deleteUser } from "@/store/actions/admin/userActions";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
} from "@/components/ui/alert-dialog";

const UserManagement = () => {
  const dispatch = useDispatch();
  const { list: users, loading, error } = useSelector((state) => state.adminUsers);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-headline">Manage Users</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Platform Users</CardTitle>
          <CardDescription>View, edit, and manage all registered users.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr>
                  <th className="h-12 px-4 text-left">User</th>
                  <th className="h-12 px-4 text-left">Role</th>
                  <th className="h-12 px-4 text-left">Status</th>
                  <th className="h-12 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? users.map((user) => (
                  <tr key={user._id || user.id} className="border-b">
                    <td className="p-4">
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
                    <td className="p-4">
                      <Select
                        value={user.role}
                        onValueChange={(value) =>
                          dispatch(changeRole({ userId: user._id || user.id, role: value }))
                        }
                      >
                        <SelectTrigger className="w-[110px]">
                          <SelectValue placeholder="Role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="User">User</SelectItem>
                          <SelectItem value="Admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="p-4">
                      <Select
                        value={user.status}
                        onValueChange={(value) =>
                          dispatch(changeStatus({ userId: user._id || user.id, status: value }))
                        }
                      >
                        <SelectTrigger className="w-[110px]">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Banned">Banned</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="p-4 text-right">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm">Delete</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the user's account.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => dispatch(deleteUser(user._id || user.id))}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </td>
                  </tr>
                )) : 
                  <div className="flex items-center justify-center h-64">
                    <p className="text-lg text-muted-foreground">No users found</p>
                  </div>
                }
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
