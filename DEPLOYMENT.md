# Deployment Guide

This guide will help you deploy the Booking.com Clone to production.

## 🚀 Quick Deploy Options

### Option 1: Vercel (Recommended)

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/booking-clone.git
git push -u origin main
```

2. **Deploy on Vercel**
- Go to [vercel.com](https://vercel.com)
- Connect your GitHub repository
- Import the project
- Vercel will automatically detect it's a React app
- Deploy!

3. **Configure Environment Variables**
In Vercel dashboard, go to Project Settings > Environment Variables and add:
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Option 2: Netlify

1. **Build the project**
```bash
npm run build
```

2. **Deploy to Netlify**
- Drag and drop the `dist` folder to [netlify.com/drop](https://netlify.com/drop)
- Or connect your GitHub repository for automatic deployments

### Option 3: Manual Server Deployment

1. **Build the project**
```bash
npm run build
```

2. **Upload to your server**
- Upload the `dist` folder contents to your web server
- Configure your web server to serve the static files

## 🔧 Supabase Configuration

### 1. Set up Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Wait for the project to be ready
4. Go to Settings > API to get your keys

### 2. Configure Authentication

1. In Supabase dashboard, go to Authentication > Settings
2. Enable Email authentication
3. Configure email templates (optional)
4. Add your domain to Site URL and Redirect URLs

### 3. Deploy Edge Functions

1. **Install Supabase CLI**
```bash
npm install -g supabase
```

2. **Login to Supabase**
```bash
supabase login
```

3. **Initialize Supabase in your project**
```bash
supabase init
```

4. **Deploy functions**
```bash
supabase functions deploy make-server-2c363e8a --project-ref your-project-ref
```

### 4. Database Setup

The application uses Supabase's built-in key-value storage through Edge Functions. No additional database setup is required as the backend handles data initialization automatically.

## 🔐 Environment Variables

### Frontend (.env.local)
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Backend (Supabase Edge Functions)
These are automatically provided by Supabase:
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_ANON_KEY`

## 📊 Admin Account Setup

1. **Create Admin User**
After deployment, register a user with email: `admin@bookingint.com`

2. **Access Admin Panel**
- Login with the admin credentials
- Navigate to the admin panel from the user menu
- You'll have access to:
  - Analytics dashboard
  - Scraping control
  - Discount code management
  - System settings

## 🌐 Custom Domain (Optional)

### Vercel
1. Go to Project Settings > Domains
2. Add your custom domain
3. Configure DNS records as instructed

### Netlify
1. Go to Site Settings > Domain Management
2. Add custom domain
3. Configure DNS records

## 🔍 Post-Deployment Checklist

- [ ] Frontend is accessible
- [ ] User registration works
- [ ] Login/logout functionality
- [ ] Search functionality works
- [ ] Payment flow is functional
- [ ] Admin panel is accessible
- [ ] Discount codes are working
- [ ] Data scraping is operational

## 🛠️ Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure your domain is added to Supabase Auth settings
   - Check Site URL and Redirect URLs configuration

2. **Edge Function Errors**
   - Verify functions are deployed correctly
   - Check function logs in Supabase dashboard

3. **Authentication Issues**
   - Verify Supabase keys are correct
   - Check if email authentication is enabled

4. **Payment Integration**
   - Test with Paystack test keys first
   - Ensure all payment methods are configured

### Getting Help

- Check Supabase documentation
- Review error logs in browser console
- Check Vercel/Netlify deployment logs
- Create an issue in the GitHub repository

## 🔄 Updates and Maintenance

### Updating the Application
1. Push changes to your GitHub repository
2. Automatic deployments will trigger (if configured)
3. Monitor deployment status

### Database Maintenance
- The application automatically manages data initialization
- Monitor scraping performance in admin panel
- Regular discount code cleanup recommended

### Security Updates
- Keep dependencies updated
- Monitor Supabase security advisories
- Regular security audits recommended

## 📈 Scaling Considerations

### Frontend Scaling
- Vercel/Netlify handle scaling automatically
- Consider CDN for global performance

### Backend Scaling
- Supabase Edge Functions auto-scale
- Monitor function performance and usage
- Consider database optimization for large datasets

### Data Management
- Implement data archiving for old bookings
- Monitor storage usage
- Consider data retention policies

---

**Need help with deployment? Create an issue in the repository or contact support.**