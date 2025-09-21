# Booking.com Clone - Full Stack Travel Booking Platform

A comprehensive travel booking platform that replicates Booking.com's functionality with advanced features including real-time data scraping, payment integration, and admin management tools.

## 🚀 Features

### Frontend Features
- **Authentic Booking.com Design**: Pixel-perfect recreation of the original interface
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Multi-Service Booking**: Supports flights, accommodations, car rentals, attractions, and airport taxis
- **User Authentication**: Complete registration and login system with email verification
- **Advanced Search**: Powerful search functionality with filters and real-time results
- **Payment Integration**: Multiple payment methods (Paystack, Google Pay, QR codes)
- **Discount System**: Promotional codes and voucher validation
- **Booking Management**: Users can view and manage their bookings

### Backend Features
- **Data Scraping Control**: Admin panel to control and monitor data scraping for all services
- **Real-time Data Updates**: Daily automated updates for flight prices and availability
- **Discount Code Management**: Full CRUD operations for promotional codes
- **Analytics Dashboard**: Comprehensive admin analytics and reporting
- **Payment Processing**: Secure payment handling with discount validation
- **User Management**: Complete user registration and authentication system

### Admin Panel Features
- **Overview Dashboard**: Key metrics and analytics visualization
- **Scraping Control**: Enable/disable and trigger manual scraping for different services
- **Discount Management**: Create, edit, and monitor promotional codes
- **Data Monitoring**: Real-time overview of scraped data across all services
- **System Settings**: Configure platform-wide settings and maintenance mode

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS v4** for styling
- **Shadcn/UI** component library
- **Lucide React** for icons
- **Sonner** for notifications
- **React Hook Form** for form handling

### Backend
- **Supabase** for database and authentication
- **Hono** web framework (Deno runtime)
- **TypeScript** for type safety
- **Edge Functions** for serverless computing

### Payment Integration
- **Paystack** payment gateway
- **Google Pay** integration
- **QR Code** payment support

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Supabase account
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/booking-clone.git
cd booking-clone
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up Supabase**
- Create a new Supabase project
- Copy your project URL and anon key to `utils/supabase/info.tsx`
- Enable email authentication in Supabase Auth settings

4. **Configure Environment Variables**
Update `/utils/supabase/info.tsx` with your Supabase credentials:
```typescript
export const projectId = "your-project-id"
export const publicAnonKey = "your-anon-key"
```

5. **Deploy Edge Functions**
```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Deploy functions
supabase functions deploy
```

6. **Start the development server**
```bash
npm run dev
```

## 📖 Usage

### User Features

1. **Registration & Login**
   - Sign up with email and password
   - Google OAuth integration available
   - Email verification system

2. **Search & Booking**
   - Search for flights, hotels, cars, attractions, or taxis
   - Apply filters and sort results
   - Complete bookings with secure payment

3. **Payment Process**
   - Multiple payment methods supported
   - Apply discount codes for savings
   - Secure payment processing

4. **Booking Management**
   - View all your bookings
   - Track booking status
   - Modify or cancel bookings

### Admin Features

1. **Access Admin Panel**
   - Login with admin credentials: `admin@bookingint.com`
   - Navigate to Admin Panel from user menu

2. **Monitor Data Scraping**
   - View scraping status for all services
   - Enable/disable automatic scraping
   - Trigger manual data updates

3. **Manage Discount Codes**
   - Create new promotional codes
   - Set usage limits and expiry dates
   - Monitor code usage analytics

4. **View Analytics**
   - Track booking metrics
   - Monitor revenue and user growth
   - View system performance data

## 🔧 Configuration

### Scraping Configuration
The platform supports automated data scraping for:
- **Flights**: November and December 2024 data
- **Hotels**: Real-time availability and pricing
- **Cars**: Rental options and rates
- **Attractions**: Tour packages and tickets
- **Taxis**: Airport transfer services

### Discount Codes
Pre-configured discount codes include:
- `WELCOME10` - 10% off for new users
- `SUMMER25` - 25% summer special
- `FLIGHT15` - 15% off flights
- `HOTEL20` - 20% off hotels
- `CAR15` - 15% off car rentals
- `WEEKEND30` - 30% weekend special
- `HOLIDAY40` - 40% holiday discount
- `FIRSTTIME50` - 50% first-time user special
- `BUSINESS35` - 35% business traveler discount
- `STUDENT25` - 25% student discount

## 🔐 Security

- **Authentication**: Secure user authentication with Supabase Auth
- **Payment Security**: All payments processed securely with industry-standard encryption
- **Data Protection**: User data encrypted and stored securely
- **Admin Access**: Role-based access control for admin features

## 📊 API Endpoints

### Authentication
- `POST /signup` - User registration
- Built-in Supabase Auth for login/logout

### Booking Management
- `GET /bookings` - Get user bookings
- `POST /process-payment` - Process booking payment

### Admin Features
- `GET /admin/discount-codes` - Get all discount codes
- `POST /admin/discount-codes` - Create discount code
- `PUT /admin/discount-codes/:id` - Update discount code
- `DELETE /admin/discount-codes/:id` - Delete discount code
- `GET /admin/scraping/status` - Get scraping status
- `POST /admin/scraping/trigger/:service` - Trigger manual scraping
- `GET /admin/analytics` - Get analytics data

### Data Services
- `POST /search-flights` - Search flights
- `POST /validate-discount` - Validate discount code
- `GET /flights/november-december` - Get specific flight data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspiration from Booking.com
- Shadcn/UI for the component library
- Supabase for backend infrastructure
- Tailwind CSS for styling system

## 📞 Support

For support and questions:
- Create an issue in this repository
- Contact: admin@bookingint.com

## 🗺️ Roadmap

- [ ] Mobile app development
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Currency conversion
- [ ] Social media integration
- [ ] AI-powered recommendations
- [ ] Real-time chat support
- [ ] Advanced search filters
- [ ] Loyalty program
- [ ] Partner API integration

---

**Built with ❤️ by the Booking Clone Team**