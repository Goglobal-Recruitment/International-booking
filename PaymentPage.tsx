import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { ArrowLeft, CreditCard, Smartphone, QrCode, CheckCircle, Tag } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface PaymentPageProps {
  booking: any;
  user: any;
  onBack: () => void;
}

export function PaymentPage({ booking, user, onBack }: PaymentPageProps) {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);

  const subtotal = booking?.totalPrice || booking?.price || 0;
  const taxes = Math.round(subtotal * 0.14); // 14% VAT for South Africa
  const discountAmount = appliedDiscount ? Math.round(subtotal * (appliedDiscount.percentage / 100)) : 0;
  const total = subtotal + taxes - discountAmount;

  const handleApplyDiscount = async () => {
    if (!discountCode.trim()) return;

    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-2c363e8a/validate-discount`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({ code: discountCode })
      });

      const result = await response.json();

      if (response.ok && result.valid) {
        setAppliedDiscount(result.discount);
        toast.success(`Discount applied! ${result.discount.percentage}% off`);
      } else {
        toast.error('Invalid discount code');
      }
    } catch (error) {
      toast.error('Failed to validate discount code');
    }
  };

  const handlePayment = async () => {
    setLoading(true);

    try {
      const paymentData = {
        bookingId: booking.id,
        userId: user.id,
        amount: total,
        paymentMethod,
        discountCode: appliedDiscount?.code,
        booking: booking
      };

      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-2c363e8a/process-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.access_token || publicAnonKey}`
        },
        body: JSON.stringify(paymentData)
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Payment successful! Booking confirmed.');
        // Redirect to confirmation page or back to bookings
        setTimeout(() => onBack(), 2000);
      } else {
        toast.error('Payment failed: ' + (result.error || 'Unknown error'));
      }
    } catch (error) {
      toast.error('Payment processing failed');
      console.error('Payment error:', error);
    } finally {
      setLoading(false);
    }
  };

  const initializePaystack = () => {
    // Simulate Paystack integration
    const handler = window.PaystackPop?.setup({
      key: 'pk_test_your_paystack_public_key',
      email: user.email,
      amount: total * 100, // Paystack expects amount in kobo
      currency: 'USD',
      callback: function(response) {
        toast.success('Payment successful with Paystack!');
        handlePayment();
      },
      onClose: function() {
        toast.info('Payment cancelled');
      }
    });
    handler?.openIframe();
  };

  const initializeGooglePay = () => {
    // Simulate Google Pay integration
    toast.info('Google Pay integration would be implemented here');
    // In a real app, you would use the Google Pay API
    setTimeout(() => {
      toast.success('Payment successful with Google Pay!');
      handlePayment();
    }, 2000);
  };

  const generateQrCode = () => {
    setShowQrCode(true);
    // In a real app, you would generate a QR code with payment details
    toast.info('QR code generated. Scan to complete payment.');
  };

  if (!booking) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p>No booking selected</p>
          <Button onClick={onBack} className="mt-4">Go back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to search
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Booking Details */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Booking Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative h-48 rounded-lg overflow-hidden">
                    <ImageWithFallback
                      src={booking.image}
                      alt={booking.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold">{booking.title}</h3>
                    <p className="text-gray-600">{booking.description}</p>
                    <p className="text-sm text-gray-500 mt-2">{booking.location}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Type:</span>
                      <Badge>{booking.type}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Guest:</span>
                      <span>{user.user_metadata?.name || user.email}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Section */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Discount Code */}
                <div>
                  <Label htmlFor="discountCode">Discount Code / Promotional Code</Label>
                  <div className="flex space-x-2 mt-1">
                    <Input
                      id="discountCode"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      placeholder="Enter promo code"
                    />
                    <Button onClick={handleApplyDiscount} variant="outline">
                      Apply
                    </Button>
                  </div>
                  {appliedDiscount && (
                    <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded flex items-center">
                      <Tag className="w-4 h-4 text-green-600 mr-2" />
                      <span className="text-green-800 text-sm">
                        {appliedDiscount.percentage}% discount applied: {appliedDiscount.description}
                      </span>
                    </div>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>ZAR {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes & fees</span>
                    <span>ZAR {taxes.toLocaleString()}</span>
                  </div>
                  {appliedDiscount && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({appliedDiscount.percentage}%)</span>
                      <span>-ZAR {discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>ZAR {total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Payment Methods */}
                <div>
                  <Label>Payment Method</Label>
                  <div className="grid grid-cols-1 gap-3 mt-2">
                    <Button
                      variant={paymentMethod === 'card' ? 'default' : 'outline'}
                      className="flex items-center justify-start space-x-2 h-12"
                      onClick={() => setPaymentMethod('card')}
                    >
                      <CreditCard className="w-5 h-5" />
                      <span>Credit/Debit Card</span>
                    </Button>
                    
                    <Button
                      variant={paymentMethod === 'paystack' ? 'default' : 'outline'}
                      className="flex items-center justify-start space-x-2 h-12"
                      onClick={() => setPaymentMethod('paystack')}
                    >
                      <CreditCard className="w-5 h-5" />
                      <span>Paystack</span>
                    </Button>
                    
                    <Button
                      variant={paymentMethod === 'googlepay' ? 'default' : 'outline'}
                      className="flex items-center justify-start space-x-2 h-12"
                      onClick={() => setPaymentMethod('googlepay')}
                    >
                      <Smartphone className="w-5 h-5" />
                      <span>Google Pay</span>
                    </Button>
                    
                    <Button
                      variant={paymentMethod === 'qr' ? 'default' : 'outline'}
                      className="flex items-center justify-start space-x-2 h-12"
                      onClick={() => setPaymentMethod('qr')}
                    >
                      <QrCode className="w-5 h-5" />
                      <span>QR Code Payment</span>
                    </Button>
                  </div>
                </div>

                {/* Payment Action */}
                <div className="pt-4">
                  {paymentMethod === 'paystack' ? (
                    <Button
                      onClick={initializePaystack}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      disabled={loading}
                    >
                      Pay with Paystack
                    </Button>
                  ) : paymentMethod === 'googlepay' ? (
                    <Button
                      onClick={initializeGooglePay}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      disabled={loading}
                    >
                      Pay with Google Pay
                    </Button>
                  ) : paymentMethod === 'qr' ? (
                    <div className="space-y-4">
                      <Button
                        onClick={generateQrCode}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                      >
                        Generate QR Code
                      </Button>
                      {showQrCode && (
                        <div className="text-center p-4 border rounded-lg">
                          <QrCode className="w-32 h-32 mx-auto mb-2" />
                          <p className="text-sm text-gray-600">
                            Scan this QR code with your banking app to complete payment
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Button
                      onClick={handlePayment}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      disabled={loading}
                    >
                      {loading ? 'Processing...' : `Complete Booking - ZAR ${total.toLocaleString()}`}
                    </Button>
                  )}
                </div>

                <div className="text-xs text-gray-500 text-center">
                  <p>Your payment is secured with 256-bit SSL encryption</p>
                  <p className="mt-1">Free cancellation up to 24 hours before your trip</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}