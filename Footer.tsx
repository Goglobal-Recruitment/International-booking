import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Globe, Phone, Mail, Facebook, Twitter, Instagram } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Support',
      links: ['Customer Service', 'Partner Help', 'Careers', 'Sustainability', 'Press Center']
    },
    {
      title: 'Discover',
      links: ['Genius loyalty program', 'Seasonal and holiday deals', 'Travel articles', 'Booking.com for Business', 'Traveller Review Awards']
    },
    {
      title: 'Terms and settings',
      links: ['Privacy & cookies', 'Terms & conditions', 'Partner dispute', 'Modern Slavery Statement', 'Human Rights Statement']
    },
    {
      title: 'Partners',
      links: ['Extranet login', 'Partner Hub', 'List your property', 'Become an affiliate', 'Connectivity partners']
    },
    {
      title: 'About',
      links: ['About Booking International', 'How We Work', 'Investor relations', 'Corporate contact']
    }
  ];

  return (
    <footer className="bg-blue-900 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <Button variant="link" className="text-white p-0 h-auto text-left justify-start">
                      {link}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8 bg-blue-800" />

        <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5" />
              <span>English (US)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>$ USD</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-white hover:bg-blue-800">
              <Facebook className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-blue-800">
              <Twitter className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-blue-800">
              <Instagram className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-blue-200">
          <p>Copyright © 1996–{currentYear} Booking International™. All rights reserved.</p>
          <p className="mt-2">
            Booking International is part of Booking Holdings Inc., the world leader in online travel and related services.
          </p>
        </div>
      </div>
    </footer>
  );
}