import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
      toast({
        title: "Signed out successfully",
        description: "You have been logged out of your account.",
      });
    } catch (error) {
      toast({
        title: "Error signing out",
        description: "There was a problem signing out. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#00ff8c] to-[#ff00ff] bg-clip-text text-transparent">
            Dashboard
          </h1>
          <Button 
            onClick={handleSignOut}
            variant="outline"
            className="border-[#00ff8c] hover:bg-[#00ff8c]/10"
          >
            Sign Out
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-lg bg-black/30 backdrop-blur-lg border border-[#00ff8c]/20">
            <h2 className="text-xl font-semibold text-[#00ff8c] mb-4">Profile</h2>
            <p className="text-gray-300">Email: {user.email}</p>
          </div>
          
          <div className="p-6 rounded-lg bg-black/30 backdrop-blur-lg border border-[#00ff8c]/20">
            <h2 className="text-xl font-semibold text-[#00ff8c] mb-4">Statistics</h2>
            <p className="text-gray-300">Coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;