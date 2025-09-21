import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Mail, CheckCircle } from 'lucide-react';
import { getSupabaseClient } from '../utils/supabase/client';
import { toast } from 'sonner@2.0.3';

interface EmailVerificationModalProps {
  open: boolean;
  onClose: () => void;
  email: string;
}

export function EmailVerificationModal({ open, onClose, email }: EmailVerificationModalProps) {
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // In a real app, you would verify the code with your backend
      // For this demo, we'll simulate verification
      if (verificationCode === '123456' || verificationCode.length === 6) {
        setVerified(true);
        toast.success('Email verified successfully!');
        
        // Auto-close after 2 seconds
        setTimeout(() => {
          onClose();
          setVerified(false);
          setVerificationCode('');
        }, 2000);
      } else {
        toast.error('Invalid verification code. Try 123456 for demo.');
      }
    } catch (error) {
      toast.error('Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    try {
      // Simulate resending verification email
      toast.success('Verification code resent to ' + email);
    } catch (error) {
      toast.error('Failed to resend verification code');
    }
  };

  if (verified) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl mb-2">Email Verified!</h2>
            <p className="text-gray-600">Your account has been successfully verified.</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Mail className="w-5 h-5" />
            <span>Verify your email</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-gray-600">
            We've sent a verification code to{' '}
            <span className="font-medium">{email}</span>
          </p>
          
          <form onSubmit={handleVerification} className="space-y-4">
            <div>
              <Label htmlFor="verificationCode">Verification code</Label>
              <Input
                id="verificationCode"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Enter 6-digit code"
                maxLength={6}
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Demo: Use code "123456" to verify
              </p>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? 'Verifying...' : 'Verify email'}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Didn't receive the code?{' '}
              <Button variant="link" className="p-0" onClick={handleResendCode}>
                Resend code
              </Button>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}