import { Button } from './ui/button';
import { Input } from './ui/input';

interface TravelMoreSpendLessProps {
  activeTab: string;
}

export function TravelMoreSpendLess({ activeTab }: TravelMoreSpendLessProps) {
  return (
    <div className="bg-gradient-to-r from-[#0071c2] to-[#003580] py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left side - Text and form */}
          <div className="flex-1 text-white max-w-lg">
            <h2 className="text-3xl font-bold mb-4">
              Want to find out more about your next adventure?
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Sign up and we'll send the best deals to you
            </p>
            
            <div className="flex gap-3">
              <Input
                type="email"
                placeholder="Your email address"
                className="flex-1 bg-white text-gray-900 border-white"
              />
              <Button 
                className="bg-[#febb02] hover:bg-[#ff8c00] text-gray-900 font-semibold px-6"
              >
                Subscribe
              </Button>
            </div>
          </div>

          {/* Right side - Illustration */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              {/* Travel illustration placeholder */}
              <div className="w-full h-64 bg-gradient-to-br from-[#febb02] to-[#ff8c00] rounded-2xl flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">✈️</div>
                  <p className="text-lg font-semibold">Ready for Adventure?</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}