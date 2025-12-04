import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCanteen } from '@/context/CanteenContext';
import { toast } from '@/hooks/use-toast';
import { UtensilsCrossed, Mail, Lock, GraduationCap, ArrowRight, ShieldCheck } from 'lucide-react';

const StudentLogin: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useCanteen();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@shanmugha\.edu\.in$/;
    return regex.test(email);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validation
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please use your college email (@shanmugha.edu.in)';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    // Simulate login (in production, this would be an API call)
    setTimeout(() => {
      const userName = email.split('@')[0].replace(/\./g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      
      setUser({
        id: crypto.randomUUID(),
        email,
        name: userName,
        allergies: [],
        isAdmin: false,
      });

      toast({
        title: "Welcome to Sri Shanmugha Canteen!",
        description: `Hello, ${userName}! Ready to order?`,
      });

      navigate('/dashboard');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen gradient-hero flex flex-col">
      {/* Header */}
      <header className="p-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl gradient-primary">
            <UtensilsCrossed className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-xl">Sri Shanmugha Canteen</h1>
            <p className="text-sm text-muted-foreground">AI-Powered Ordering</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-6 animate-slide-up">
          {/* Welcome Card */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center p-4 rounded-full bg-primary/10 mb-4">
              <GraduationCap className="h-12 w-12 text-primary" />
            </div>
            <h2 className="text-3xl font-bold">Welcome, Student!</h2>
            <p className="text-muted-foreground">
              Sign in with your college email to start ordering
            </p>
          </div>

          {/* Login Form */}
          <Card className="shadow-elevated">
            <CardHeader>
              <CardTitle>Student Login</CardTitle>
              <CardDescription>
                Only @shanmugha.edu.in emails are accepted
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">College Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="yourname@shanmugha.edu.in"
                      className={`pl-10 ${errors.email ? 'border-destructive' : ''}`}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      className={`pl-10 ${errors.password ? 'border-destructive' : ''}`}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  {errors.password && (
                    <p className="text-sm text-destructive">{errors.password}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  className="w-full"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    'Signing in...'
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  Are you an admin?
                </p>
                <Button
                  variant="outline"
                  onClick={() => navigate('/admin')}
                  className="gap-2"
                >
                  <ShieldCheck className="h-4 w-4" />
                  Admin Login
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Features Preview */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-card rounded-xl p-4 text-center shadow-soft">
              <span className="text-2xl">🎤</span>
              <p className="text-sm font-medium mt-1">Voice Ordering</p>
            </div>
            <div className="bg-card rounded-xl p-4 text-center shadow-soft">
              <span className="text-2xl">🛡️</span>
              <p className="text-sm font-medium mt-1">Allergy Protection</p>
            </div>
            <div className="bg-card rounded-xl p-4 text-center shadow-soft">
              <span className="text-2xl">💰</span>
              <p className="text-sm font-medium mt-1">Budget Optimizer</p>
            </div>
            <div className="bg-card rounded-xl p-4 text-center shadow-soft">
              <span className="text-2xl">✨</span>
              <p className="text-sm font-medium mt-1">AI Recommendations</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-sm text-muted-foreground">
        <p>© 2024 Sri Shanmugha Institution. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default StudentLogin;
