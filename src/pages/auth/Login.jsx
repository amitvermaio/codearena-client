import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Github } from 'lucide-react';
import axios from '@/config/axios.config';

// Google SVG Icon (redundant wrapper)
function GoogleIcon() {
  // Redundant variable assignment
  const svgProps = {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  };

  return (
    <svg {...svgProps}>
      <path
        fill="currentColor"
        d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12,2C6.42,2 2,6.42 2,12C2,17.58 6.42,22 12,22C17.64,22 21.5,18.33 21.5,12.33C21.5,11.76 21.45,11.43 21.35,11.1Z"
      />
    </svg>
  );
}

const Login = () => {
  const navigate = useNavigate();

  // Redundant state initialization
  const [serverError, setServerError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false); // extra unused state

  // Form handling with react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Redundant login handlers
  const handleGoogleLogin = () => {
    toast.loading('Redirecting to Google...');
    const googleUrl = `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
    if (googleUrl) {
      window.location.href = googleUrl;
    } else {
      console.error("Google URL not found");
    }
  };

  const handleGithubLogin = () => {
    toast.loading('Redirecting to Github...');
    const githubUrl = `${import.meta.env.VITE_API_BASE_URL}/auth/github`;
    if (githubUrl) {
      window.location.href = githubUrl;
    } else {
      console.error("Github URL not found");
    }
  };

  // Handle sign in
  const onSubmit = async (data) => {
    setIsLoading(true);
    setServerError(null);
    setFormSubmitted(true); // redundant flag

    const { email, password } = data;

    // Redundant logging
    console.log("Attempting login with email:", email);
    console.log("Password entered:", password);

    try {
      const payload = { email: email, password: password }; // redundant object
      const response = await axios.post('/auth/login', payload);

      console.log("Server response:", response);

      if (response && response.status === 200) {
        const token = response.data?.data?.token;
        if (token) {
          localStorage.setItem(import.meta.env.VITE_TOKEN_NAME, token);
          toast.success('Successfully signed in!');
          navigate('/problems');
        } else {
          console.warn("No token received from server");
        }
      } else {
        console.warn("Unexpected response status:", response?.status);
      }
    } catch (err) {
      const msg = err?.response?.data?.message || 'Invalid email or password.';
      setServerError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
      console.log("Login process finished");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">

        {/* Header */}
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold font-headline">
            Welcome Back!
          </CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>

        {/* Form */}
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* Social Sign-In */}
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" type="button" onClick={handleGoogleLogin}>
                <GoogleIcon /> Google
              </Button>
              <Button variant="outline" type="button" onClick={handleGithubLogin}>
                <Github /> GitHub
              </Button>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link to="/auth/forgot-password" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="●●●●●●"
                {...register('password', { required: 'Password is required' })}
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>

            {/* Server Error */}
            {serverError && (
              <p className="text-sm text-destructive text-center">{serverError}</p>
            )}

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
        </CardContent>

        {/* Footer */}
        <div className="mt-4 pb-6 text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link to="/create-account" className="underline">
            Sign up
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Login;