import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Github } from 'lucide-react';
import axios from '@/config/axios.config.jsx';
import { toast } from 'sonner';

function GoogleIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12,2C6.42,2 2,6.42 2,12C2,17.58 6.42,22 12,22C17.64,22 21.5,18.33 21.5,12.33C21.5,11.76 21.45,11.43 21.35,11.1Z"
      />
    </svg>
  );
}

const CreateAccount = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleGoogleRegister = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
  }

  const handleGithubRegister = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/github`;
  }

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('/auth/register', {
        fullname: data.fullname,
        username: data.userName,
        email: data.email,
        password: data.password,
      });

      if (response.status === 201) {
        localStorage.setItem(import.meta.env.VITE_TOKEN_NAME, response.data.token);
        toast.success('User registered successfully');
        navigate('/problems');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'An unexpected error occurred.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold font-headline">Create your Account</CardTitle>
          <CardDescription>Enter your information to create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" type="button" onClick={handleGoogleRegister}><GoogleIcon /> Google</Button>
              <Button variant="outline" type="button" onClick={handleGithubRegister}><Github /> GitHub</Button>
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

            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullname">Full Name</Label>
              <Input
                id="fullname"
                placeholder="John Doe"
                {...register('fullname', { required: 'Full name is required' })}
              />
              {errors.fullname && <p className="text-sm text-destructive">{errors.fullname.message}</p>}
            </div>

            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="userName">Username</Label>
              <Input
                id="userName"
                placeholder="johndoe"
                {...register('userName', { required: 'Username is required' })}
              />
              {errors.userName && <p className="text-sm text-destructive">{errors.userName.message}</p>}
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
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="●●●●●●"
                {...register('password', { required: 'Password is required' })}
              />
              {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
            </div>

            {/* Error Message */}
            {error && <p className="text-sm text-destructive text-center">{error}</p>}

            {/* Submit */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>
        </CardContent>

        {/* Footer */}
        <div className="mt-4 pb-6 text-center text-sm">
          Already have an account?{' '}
          <Link to="/signin" className="underline">
            Sign in
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default CreateAccount;
