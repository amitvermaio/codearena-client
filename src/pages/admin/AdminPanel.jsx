import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getProblemOfTheDay, getProblems } from "@/lib/api";
import { Star, Edit, Trash2 } from "lucide-react";
import { ProblemSelectDialog } from "@/components/admin/ProblemSelectDialog";
import { toast } from "sonner";

const AdminPanel = () => {
  const [potd, setPotd] = useState(null);
  const [allProblems, setAllProblems] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    getProblemOfTheDay().then(setPotd);
    getProblems().then(setAllProblems);
  }, []);

  const handleUpdatePotd = (problem) => {
    setPotd(problem);
  };

  const handleRemovePotd = () => {
    setPotd(null);
    toast.info("Problem of the Day has been removed.");
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
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setIsDialogOpen(true)}>
                    <Edit className="mr-2 h-4 w-4" /> Update
                  </Button>
                  <Button variant="destructive" size="sm" onClick={handleRemovePotd}>
                    <Trash2 className="mr-2 h-4 w-4" /> Remove
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
          problems={allProblems}
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
            <Button>
              <a href="/admin/users">Go to Users</a>
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
            <Button>
              <a href="/admin/problems">Go to Problems</a>
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
            <Button>
              <a href="/admin/contests">Go to Contests</a>
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
            <Button>
              <a href="/admin/analytics">View Analytics</a>
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
            <Button>
              <a href="/admin/settings">Go to Settings</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AdminPanel;
