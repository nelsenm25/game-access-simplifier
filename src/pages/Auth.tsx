import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isResetPassword) {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/auth/reset-password`,
        });
        if (error) throw error;
        toast({
          title: "Password reset email sent",
          description: "Please check your email to reset your password.",
        });
        setIsResetPassword(false);
      } else if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        toast({
          title: "Success!",
          description: "Please check your email to verify your account.",
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        navigate('/dashboard');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8 backdrop-blur-lg bg-black/30 p-8 rounded-2xl border border-[#00ff8c]/20">
        <div className="text-center">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#00ff8c] to-[#ff00ff] bg-clip-text text-transparent">
            {isResetPassword ? "Reset Password" : isSignUp ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="mt-2 text-gray-400">
            {isResetPassword 
              ? "Enter your email to reset your password"
              : isSignUp 
                ? "Join the Game Testerz community" 
                : "Sign in to your account"}
          </p>
        </div>

        <form onSubmit={handleAuth} className="mt-8 space-y-6">
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-black/50 border-[#00ff8c]/20 text-white placeholder:text-gray-500"
            />
            {!isResetPassword && (
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-black/50 border-[#00ff8c]/20 text-white placeholder:text-gray-500"
              />
            )}
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-[#00ff8c] to-[#ff00ff] text-black font-bold hover:opacity-90 transition-opacity"
          >
            {isLoading 
              ? "Loading..." 
              : isResetPassword 
                ? "Send Reset Link"
                : isSignUp 
                  ? "Sign Up" 
                  : "Sign In"}
          </Button>
        </form>

        <div className="text-center space-y-2">
          {!isResetPassword && (
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-[#00ff8c] hover:text-[#00ff8c]/80 transition-colors"
            >
              {isSignUp ? "Already have an account? Sign in" : "Need an account? Sign up"}
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsResetPassword(!isResetPassword)}
            className="block w-full text-sm text-[#00ff8c] hover:text-[#00ff8c]/80 transition-colors"
          >
            {isResetPassword ? "Back to sign in" : "Forgot your password?"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;