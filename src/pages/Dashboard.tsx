import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shield, GamepadIcon, Clock, Settings } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [lastLogin, setLastLogin] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    const fetchLastLogin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.last_sign_in_at) {
        setLastLogin(new Date(session.user.last_sign_in_at).toLocaleString());
      }
    };

    fetchLastLogin();
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
    <div className="min-h-screen bg-[#0a0a0a] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#00ff8c] to-[#ff00ff] bg-clip-text text-transparent">
              Welcome, {user.email?.split('@')[0]}
            </h1>
            {lastLogin && (
              <p className="text-gray-400 text-sm">Last login: {lastLogin}</p>
            )}
          </div>
          <Button 
            onClick={handleSignOut}
            variant="outline"
            className="border-[#00ff8c] hover:bg-[#00ff8c]/10"
          >
            Sign Out
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-black/30 backdrop-blur-lg border-[#00ff8c]/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-[#00ff8c]" />
                Security
              </CardTitle>
              <CardDescription>Account security settings</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline" 
                className="w-full border-[#00ff8c]/20 hover:bg-[#00ff8c]/10"
                onClick={() => navigate('/settings/security')}
              >
                Manage Security
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-black/30 backdrop-blur-lg border-[#00ff8c]/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GamepadIcon className="h-5 w-5 text-[#00ff8c]" />
                Active Tests
              </CardTitle>
              <CardDescription>Your current game testing projects</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">No active tests</p>
            </CardContent>
          </Card>

          <Card className="bg-black/30 backdrop-blur-lg border-[#00ff8c]/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-[#00ff8c]" />
                Recent Activity
              </CardTitle>
              <CardDescription>Your recent testing activity</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">No recent activity</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8 bg-black/30 backdrop-blur-lg border-[#00ff8c]/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-[#00ff8c]" />
              Account Settings
            </CardTitle>
            <CardDescription>Manage your account preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-sm text-gray-400">{user.email}</p>
              </div>
              <Button 
                variant="outline"
                className="border-[#00ff8c]/20 hover:bg-[#00ff8c]/10"
              >
                Update Email
              </Button>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Password</h3>
                <p className="text-sm text-gray-400">Last updated: Never</p>
              </div>
              <Button 
                variant="outline"
                className="border-[#00ff8c]/20 hover:bg-[#00ff8c]/10"
                onClick={() => navigate('/settings/password')}
              >
                Change Password
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;