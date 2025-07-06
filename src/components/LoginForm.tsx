
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, LogIn, UserPlus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const LoginForm = ({ onLogin }) => {
  const [loginData, setLoginData] = useState({ email: '', password: '', otp: '' });
  const [registerData, setRegisterData] = useState({
    companyName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    pan: '',
    gstin: '',
    legalStructure: ''
  });
  const [show2FA, setShow2FA] = useState(false);
  const [activeTab, setActiveTab] = useState('login');

  const demoCredentials = [
    { role: 'vendor', email: 'vendor@demo.com', name: 'ABC Industries' },
    { role: 'hod_civil', email: 'hod.civil@dmrc.com', name: 'HOD Civil' },
    { role: 'hod_electrical', email: 'hod.electrical@dmrc.com', name: 'HOD Electrical' },
    { role: 'hod_architecture', email: 'hod.architecture@dmrc.com', name: 'HOD Architecture' },
    { role: 'dy_hod', email: 'dy.hod@dmrc.com', name: 'Dy. HOD' },
    { role: 'director', email: 'director@dmrc.com', name: 'Director' },
    { role: 'gm_planning', email: 'gm.planning@dmrc.com', name: 'GM Planning' }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (!show2FA) {
      const user = demoCredentials.find(u => u.email === loginData.email);
      if (user) {
        setShow2FA(true);
        toast({
          title: "OTP Sent",
          description: "Please enter the OTP sent to your registered mobile number. Demo OTP: 123456"
        });
      } else {
        toast({
          title: "Invalid Credentials",
          description: "Please check your email and password",
          variant: "destructive"
        });
      }
    } else {
      if (loginData.otp === '123456') {
        const user = demoCredentials.find(u => u.email === loginData.email);
        onLogin(user, user.role);
        toast({
          title: "Login Successful",
          description: `Welcome ${user.name}!`
        });
      } else {
        toast({
          title: "Invalid OTP",
          description: "Please enter the correct OTP",
          variant: "destructive"
        });
      }
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    
    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    // Simulate registration
    const newVendor = {
      role: 'vendor',
      email: registerData.email,
      name: registerData.companyName,
      uniqueId: 'VND' + Date.now().toString().slice(-6)
    };

    toast({
      title: "Registration Successful",
      description: `Welcome ${newVendor.name}! Your unique ID is ${newVendor.uniqueId}`
    });

    onLogin(newVendor, 'vendor');
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl">
      <CardHeader className="text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-blue-600" />
        </div>
        <CardTitle className="text-2xl">Secure Access</CardTitle>
        <CardDescription>Login or Register for Vendor Empanelment Portal</CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  required
                />
              </div>
              
              {!show2FA && (
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                    required
                  />
                </div>
              )}
              
              {show2FA && (
                <div className="space-y-2">
                  <Label htmlFor="otp">Enter OTP</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="6-digit OTP"
                    value={loginData.otp}
                    onChange={(e) => setLoginData({...loginData, otp: e.target.value})}
                    required
                  />
                  <Alert>
                    <AlertDescription>
                      Demo OTP: 123456
                    </AlertDescription>
                  </Alert>
                </div>
              )}
              
              <Button type="submit" className="w-full">
                <LogIn className="w-4 h-4 mr-2" />
                {show2FA ? 'Verify OTP' : 'Login'}
              </Button>
            </form>
            
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">Demo Credentials:</h4>
              <div className="text-sm space-y-1">
                <p><strong>Vendor:</strong> vendor@demo.com</p>
                <p><strong>HOD Civil:</strong> hod.civil@dmrc.com</p>
                <p><strong>Director:</strong> director@dmrc.com</p>
                <p><strong>Password:</strong> demo123 (any)</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={registerData.companyName}
                  onChange={(e) => setRegisterData({...registerData, companyName: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="regEmail">Email</Label>
                <Input
                  id="regEmail"
                  type="email"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input
                  id="mobile"
                  type="tel"
                  value={registerData.mobile}
                  onChange={(e) => setRegisterData({...registerData, mobile: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="legalStructure">Legal Structure</Label>
                <Select onValueChange={(value) => setRegisterData({...registerData, legalStructure: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select legal structure" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sole">Sole Proprietorship</SelectItem>
                    <SelectItem value="llp">Limited Liability Partnership</SelectItem>
                    <SelectItem value="private">Private Limited</SelectItem>
                    <SelectItem value="public">Public Limited</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pan">PAN</Label>
                  <Input
                    id="pan"
                    value={registerData.pan}
                    onChange={(e) => setRegisterData({...registerData, pan: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gstin">GSTIN</Label>
                  <Input
                    id="gstin"
                    value={registerData.gstin}
                    onChange={(e) => setRegisterData({...registerData, gstin: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="regPassword">Password</Label>
                <Input
                  id="regPassword"
                  type="password"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={registerData.confirmPassword}
                  onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full">
                <UserPlus className="w-4 h-4 mr-2" />
                Register
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
