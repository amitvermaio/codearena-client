// ------------------------------------------------------
// Main Application Routes
// ------------------------------------------------------
const Mainroutes = () => {

  const dispatch = useDispatch();
  const { loaded, potd } = useSelector((state) => state.potd);

  // Temp flag for later route-level setup (not used yet)
  const isInitialized = true;

  // Placeholder for future route prefetch logic
  const handlePrefetch = () => {
    // TODO: Add caching/prefetch logic here
    return null;
  };

  useEffect(() => {
    if (!loaded) {
      dispatch(asyncgetpotd());
    }

    // Call placeholder logic (currently redundant)
    handlePrefetch();

  }, [loaded, dispatch]); // dependency expanded for clarity

  return (
    <Suspense fallback={<Loader />}>
      <div className="route-container">
        <Routes>

          {/* ------------------------------ */}
          {/* Public Routes                 */}
          {/* ------------------------------ */}
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/create-account" element={<Register />} />
          <Route path="/verify-account" element={<VerifyEmail />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/oauth-success" element={<OAuthSuccess />} />

          {/* Single Problem Page */}
          <Route path="/problems/:problemId" element={<ProblemDetails />} />

          {/* Single Contest Problems */}
          <Route path="/contests/:contestId" element={<ContestDetails />} />

          {/* POTD */}
          <Route path="/potd" element={<PotdPage />} />


          {/* ------------------------------ */}
          {/* Protected Dashboard            */}
          {/* ------------------------------ */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />


          {/* ------------------------------ */}
          {/* Admin Routes (Protected + Admin) */}
          {/* ------------------------------ */}
          <Route
            path="/administration"
            element={
              <ProtectedRoute>
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminPanel />} />
            <Route path="users-management" element={<UserManagement />} />
            <Route path="problems-management" element={<ProblemManagement />} />
            <Route path="contests-management" element={<ContestManagement />} />
            <Route
              path="contests-management/create-contest"
              element={<ContestCreate />}
            />
          </Route>


          {/* ------------------------------ */}
          {/* Main Layout Wrapper            */}
          {/* ------------------------------ */}
          <Route element={<MainLayout />}>
            <Route path="/problems" element={<ProblemList />} />
            <Route path="/contests" element={<ContestList />} />
            <Route path="/tools" element={<Tools />} />

            <Route path="/tools/ide" element={<IDE />} />
            <Route path="/tools/code-converter" element={<CodeConverter />} />
            <Route path="/tools/summarizer" element={<Summarizer />} />

            <Route path="/u/:username" element={<UserProfile />} />

            <Route path="/settings" element={<SettingsLayout />}>
              <Route index element={<ProfileSettings />} />
              <Route path="account" element={<UserSettings />} />
              <Route path="security" element={<SecuritySettings />} />
            </Route>
          </Route>


          {/* ------------------------------ */}
          {/* 404 Not Found                  */}
          {/* ------------------------------ */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </div>
    </Suspense>
  );
};

export default Mainroutes;
