import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getContests } from "@/lib/api";
import { ContestEditDialog } from "@/components/admin/ContestEditDialog";
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
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ContestManagement = () => {
  const [contests, setContests] = useState([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedContest, setSelectedContest] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getContests().then(setContests);
  }, []);

  const handleEdit = (contest) => {
    setSelectedContest(contest);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (contestId) => {
    setContests((prev) => prev.filter((c) => c.id !== contestId));
    toast.success("Contest Deleted", {
      description: "The contest has been removed successfully.",
    });
  };

  const handleSave = (contest) => {
    setContests((prev) =>
      prev.map((c) => (c.id === contest.id ? contest : c))
    );
    toast.success("Contest Updated", {
      description: `"${contest.title}" has been updated successfully.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <h1 className="text-3xl font-bold font-headline">Manage Contests</h1>
        <Button onClick={() => navigate("/administration/contests-management/create-contest")}>
          Create Contest
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Upcoming & Active Contests</CardTitle>
          <CardDescription>
            Here you can view, edit, and manage all contests on the platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Starts On</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contests.map((contest) => (
                  <TableRow key={contest.id}>
                    <TableCell className="font-medium">
                      {contest.title}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          contest.type === "platform" ? "default" : "secondary"
                        }
                      >
                        {contest.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          new Date() < contest.startTime ? "outline" : "default"
                        }
                      >
                        {new Date() < contest.startTime ? "Upcoming" : "Live"}
                      </Badge>
                    </TableCell>
                    <TableCell>{format(contest.startTime, "PPP p")}</TableCell>
                    <TableCell>{contest.duration}</TableCell>
                    <TableCell className="text-right space-x-2 whitespace-nowrap">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(contest)}
                      >
                        Edit
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm">
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete the contest.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(contest.id)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <ContestEditDialog
        isOpen={isEditDialogOpen}
        setIsOpen={setIsEditDialogOpen}
        contest={selectedContest}
        onSave={handleSave}
      />
    </div>
  );
};

export default ContestManagement;
