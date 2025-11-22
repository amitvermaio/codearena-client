import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Edit, Trash2 } from "lucide-react";
import { ProblemSelectDialog } from "@/components/admin/ProblemSelectDialog";
import { toast } from "sonner";
import { Link } from "react-router-dom"; // ✅ Import Link
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { asyncgetpotd, asyncupdatepotd } from "@/store/actions/problems/potdAction";

const AdminPanel = () => {
  const dispatch = useDispatch();
  const { potd, createdBy, updatedBy } = useSelector((state) => state.potd);
  const { problems } = useSelector((state) => state.problems);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleUpdatePotd = (problem) => {
    if (!problem) return;
    dispatch(asyncupdatepotd(problem._id));
    toast.success("Problem of the Day updated successfully.");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold font-headline mb-6">Admin Dashboard</h1>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        
        {/* Problem of the Day */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="text-yellow-400 fill-current" />
              Problem of the Day
            </CardTitle>
            <CardDescription>
              Manage the current daily problem.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {potd ? (
              <>
                <div>
                  <p className="font-semibold">{potd.title}</p>
                  <p className="text-sm text-muted-foreground">{potd.difficulty}</p>
                  {createdBy && (
                    <p className="text-xs text-muted-foreground">Created by: {createdBy}</p>
                  )}
                  {updatedBy && (
                    <p className="text-xs text-muted-foreground">Updated by: {updatedBy}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setIsDialogOpen(true)}>
                    <Edit className="mr-2 h-4 w-4" /> Update
                  </Button>
                </div>
              </>
            ) : (
              <>
                <p className="text-muted-foreground">No Problem of the Day set.</p>
                <Button variant="outline" size="sm" onClick={() => setIsDialogOpen(true)}>
                  <Edit className="mr-2 h-4 w-4" /> Set POTD
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        <ProblemSelectDialog
          isOpen={isDialogOpen}
          setIsOpen={setIsDialogOpen}
          problems={problems}
          onSelectProblem={handleUpdatePotd}
        />

        {/* Manage Users */}
        <Card>
          <CardHeader>
            <CardTitle>Manage Users</CardTitle>
            <CardDescription>
              View, edit, and assign roles to users.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link to="/administration/users-management">Go to Users</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Manage Problems */}
        <Card>
          <CardHeader>
            <CardTitle>Manage Problems</CardTitle>
            <CardDescription>
              Add, edit, and manage coding challenges.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link to="/administration/problems-management">Go to Problems</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Manage Contests */}
        <Card>
          <CardHeader>
            <CardTitle>Manage Contests</CardTitle>
            <CardDescription>
              Schedule and manage new competitions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link to="/administration/contests-management">Go to Contests</Link>
            </Button>
          </CardContent>
        </Card>

        {/* View Analytics */}
        <Card>
          <CardHeader>
            <CardTitle>View Analytics</CardTitle>
            <CardDescription>
              Check platform usage and user statistics.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link to="/administration/analytics">View Analytics</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>
              Configure platform settings and integrations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link to="/administration/settings">Go to Settings</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AdminPanel;


/* -------------------- Redux Version (commented) --------------------

import { useSelector, useDispatch } from "react-redux";
import { fetchPotd, fetchProblems, updatePotd, asyncgetpotd } from "@/store/adminSlice";

const administrationPanel = () => {
  const dispatch = useDispatch();
  const potd = useSelector((state) => state.admin.potd);
  const allProblems = useSelector((state) => state.admin.allProblems);
  const isDialogOpen = useSelector((state) => state.admin.isDialogOpen);

  useEffect(() => {
    dispatch(fetchPotd());
    dispatch(fetchProblems());
  }, [dispatch]);

  const handleUpdatePotd = (problem) => {
    dispatch(updatePotd(problem));
  };

  const handleRemovePotd = () => {
    dispatch(asyncgetpotd());
    toast.info("Problem of the Day has been removed.");
  };

  return ( ... same JSX code as above ... )
}

------------------------------------------------------------------ */
