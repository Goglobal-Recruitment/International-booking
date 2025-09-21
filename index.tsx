import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-2c363e8a/health", (c) => {
  return c.json({ status: "ok" });
});

// Initialize discount codes on startup
const initializeDiscountCodes = async () => {
  try {
    const existingCodes = await kv.get('discount_codes');
    if (!existingCodes) {
      const defaultCodes = [
        {
          id: 1,
          code: 'WELCOME10',
          description: 'Welcome discount for new users',
          percentage: 10,
          maxUses: 100,
          usedCount: 0,
          expiryDate: '2024-12-31',
          active: true
        },
        {
          id: 2,
          code: 'SUMMER25',
          description: 'Summer vacation special',
          percentage: 25,
          maxUses: 50,
          usedCount: 0,
          expiryDate: '2024-08-31',
          active: true
        },
        {
          id: 3,
          code: 'FLIGHT15',
          description: 'Flight booking discount',
          percentage: 15,
          maxUses: 200,
          usedCount: 0,
          expiryDate: '2024-12-31',
          active: true
        },
        {
          id: 4,
          code: 'HOTEL20',
          description: 'Hotel stay discount',
          percentage: 20,
          maxUses: 75,
          usedCount: 0,
          expiryDate: '2024-12-31',
          active: true
        },
        {
          id: 5,
          code: 'CAR15',
          description: 'Car rental discount',
          percentage: 15,
          maxUses: 150,
          usedCount: 0,
          expiryDate: '2024-12-31',
          active: true
        },
        {
          id: 6,
          code: 'WEEKEND30',
          description: 'Weekend special discount',
          percentage: 30,
          maxUses: 30,
          usedCount: 0,
          expiryDate: '2024-12-31',
          active: true
        },
        {
          id: 7,
          code: 'HOLIDAY40',
          description: 'Holiday season special',
          percentage: 40,
          maxUses: 25,
          usedCount: 0,
          expiryDate: '2024-12-31',
          active: true
        },
        {
          id: 8,
          code: 'FIRSTTIME50',
          description: 'First time user special',
          percentage: 50,
          maxUses: 20,
          usedCount: 0,
          expiryDate: '2024-12-31',
          active: true
        },
        {
          id: 9,
          code: 'BUSINESS35',
          description: 'Business traveler discount',
          percentage: 35,
          maxUses: 40,
          usedCount: 0,
          expiryDate: '2024-12-31',
          active: true
        },
        {
          id: 10,
          code: 'STUDENT25',
          description: 'Student discount',
          percentage: 25,
          maxUses: 100,
          usedCount: 0,
          expiryDate: '2024-12-31',
          active: true
        }
      ];
      
      await kv.set('discount_codes', defaultCodes);
      console.log('Initialized discount codes');
    }
  } catch (error) {
    console.error('Failed to initialize discount codes:', error);
  }
};

// Initialize discount codes
initializeDiscountCodes();

// Mock flight data scraping functionality for November and December
const mockFlightData = [
  {
    id: 'EK201',
    airline: 'Emirates',
    from: 'JNB',
    to: 'DXB',
    price: 899,
    duration: '8h 15m',
    departure: '10:30',
    arrival: '20:45',
    class: 'Economy',
    month: 'November',
    date: '2024-11-15'
  },
  {
    id: 'QR101',
    airline: 'Qatar Airways', 
    from: 'CPT',
    to: 'DOH',
    price: 1299,
    duration: '9h 30m',
    departure: '14:20',
    arrival: '01:50',
    class: 'Economy',
    month: 'November', 
    date: '2024-11-22'
  },
  {
    id: 'SA203',
    airline: 'South African Airways',
    from: 'JNB',
    to: 'LHR',
    price: 1599,
    duration: '11h 45m',
    departure: '19:10',
    arrival: '06:55',
    class: 'Economy',
    month: 'December',
    date: '2024-12-05'
  },
  {
    id: 'BA055',
    airline: 'British Airways',
    from: 'CPT',
    to: 'LHR',
    price: 1799,
    duration: '11h 20m',
    departure: '21:15',
    arrival: '08:35',
    class: 'Economy',
    month: 'December',
    date: '2024-12-18'
  },
  {
    id: 'LH573',
    airline: 'Lufthansa',
    from: 'JNB',
    to: 'FRA',
    price: 1450,
    duration: '10h 50m',
    departure: '20:45',
    arrival: '07:35',
    class: 'Economy',
    month: 'November',
    date: '2024-11-28'
  },
  {
    id: 'AF995',
    airline: 'Air France',
    from: 'CPT',
    to: 'CDG',
    price: 1550,
    duration: '11h 15m',
    departure: '18:30',
    arrival: '05:45',
    class: 'Economy',
    month: 'December',
    date: '2024-12-12'
  }
];

// Initialize flight data
const initializeFlightData = async () => {
  try {
    const existingFlights = await kv.get('flight_data');
    if (!existingFlights) {
      await kv.set('flight_data', mockFlightData);
      console.log('Initialized flight data for November and December');
    }
  } catch (error) {
    console.error('Failed to initialize flight data:', error);
  }
};

// Initialize flight data
initializeFlightData();

// Daily flight data update (simulating scraping)
const updateFlightData = async () => { 
  try {
    // In a real implementation, this would scrape live flight data
    // For now, we'll simulate price fluctuations
    const flightData = await kv.get('flight_data') || mockFlightData;
    const updatedFlights = flightData.map((flight: any) => ({
      ...flight,
      price: flight.price + Math.floor(Math.random() * 200) - 100, // Random price variation
      lastUpdated: new Date().toISOString()
    }));
    
    await kv.set('flight_data', updatedFlights);
    console.log('Updated flight data');
  } catch (error) {
    console.error('Failed to update flight data:', error);
  }
};

// Update flight data daily
setInterval(updateFlightData, 24 * 60 * 60 * 1000); // 24 hours

// User registration endpoint
app.post("/make-server-2c363e8a/signup", async (c) => {
  try {
    const { email, password, firstName, lastName, subscribeNewsletter } = await c.req.json();

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { 
        name: `${firstName} ${lastName}`,
        firstName,
        lastName,
        subscribeNewsletter
      },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.error('Registration error:', error);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ success: true, user: data.user });
  } catch (error) {
    console.error('Registration error:', error);
    return c.json({ error: 'Registration failed' }, 500);
  }
});

// Validate discount code endpoint
app.post("/make-server-2c363e8a/validate-discount", async (c) => {
  try {
    const { code } = await c.req.json();
    
    const discountCodes = await kv.get('discount_codes') || [];
    const foundCode = discountCodes.find(
      (dc: any) => dc.code === code.toUpperCase() && dc.active && 
      dc.usedCount < dc.maxUses && new Date(dc.expiryDate) > new Date()
    );

    if (foundCode) {
      return c.json({ valid: true, discount: foundCode });
    } else {
      return c.json({ valid: false });
    }
  } catch (error) {
    console.error('Discount validation error:', error);
    return c.json({ valid: false }, 500);
  }
});

// Process payment endpoint
app.post("/make-server-2c363e8a/process-payment", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (!user?.id) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { bookingId, amount, paymentMethod, discountCode, booking } = await c.req.json();

    // Update discount code usage if applicable
    if (discountCode) {
      const discountCodes = await kv.get('discount_codes') || [];
      const updatedCodes = discountCodes.map((dc: any) => {
        if (dc.code === discountCode) {
          return { ...dc, usedCount: dc.usedCount + 1 };
        }
        return dc;
      });
      await kv.set('discount_codes', updatedCodes);
    }

    // Store booking
    const bookingData = {
      id: `booking_${Date.now()}`,
      userId: user.id,
      bookingId,
      amount,
      paymentMethod,
      discountCode,
      booking,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    // Get existing bookings for user
    const userBookings = await kv.get(`bookings_${user.id}`) || [];
    userBookings.push(bookingData);
    await kv.set(`bookings_${user.id}`, userBookings);

    return c.json({ success: true, bookingId: bookingData.id });
  } catch (error) {
    console.error('Payment processing error:', error);
    return c.json({ error: 'Payment processing failed' }, 500);
  }
});

// Get user bookings endpoint
app.get("/make-server-2c363e8a/bookings", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (!user?.id) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const bookings = await kv.get(`bookings_${user.id}`) || [];
    return c.json({ bookings });
  } catch (error) {
    console.error('Failed to fetch bookings:', error);
    return c.json({ error: 'Failed to fetch bookings' }, 500);
  }
});

// Admin: Get all discount codes
app.get("/make-server-2c363e8a/admin/discount-codes", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (!user?.id || user.email !== 'admin@bookingint.com') {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const codes = await kv.get('discount_codes') || [];
    return c.json({ codes });
  } catch (error) {
    console.error('Failed to fetch discount codes:', error);
    return c.json({ error: 'Failed to fetch discount codes' }, 500);
  }
});

// Admin: Create discount code
app.post("/make-server-2c363e8a/admin/discount-codes", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (!user?.id || user.email !== 'admin@bookingint.com') {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { code, description, percentage, maxUses, expiryDate } = await c.req.json();
    
    const discountCodes = await kv.get('discount_codes') || [];
    const newCode = {
      id: Math.max(...discountCodes.map((dc: any) => dc.id), 0) + 1,
      code: code.toUpperCase(),
      description,
      percentage: parseInt(percentage),
      maxUses: parseInt(maxUses),
      usedCount: 0,
      expiryDate,
      active: true
    };

    discountCodes.push(newCode);
    await kv.set('discount_codes', discountCodes);

    return c.json({ success: true, code: newCode });
  } catch (error) {
    console.error('Failed to create discount code:', error);
    return c.json({ error: 'Failed to create discount code' }, 500);
  }
});

// Admin: Update discount code
app.put("/make-server-2c363e8a/admin/discount-codes/:id", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (!user?.id || user.email !== 'admin@bookingint.com') {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const id = parseInt(c.req.param('id'));
    const { code, description, percentage, maxUses, expiryDate } = await c.req.json();
    
    const discountCodes = await kv.get('discount_codes') || [];
    const updatedCodes = discountCodes.map((dc: any) => {
      if (dc.id === id) {
        return {
          ...dc,
          code: code.toUpperCase(),
          description,
          percentage: parseInt(percentage),
          maxUses: parseInt(maxUses),
          expiryDate
        };
      }
      return dc;
    });

    await kv.set('discount_codes', updatedCodes);

    return c.json({ success: true });
  } catch (error) {
    console.error('Failed to update discount code:', error);
    return c.json({ error: 'Failed to update discount code' }, 500);
  }
});

// Admin: Delete discount code
app.delete("/make-server-2c363e8a/admin/discount-codes/:id", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (!user?.id || user.email !== 'admin@bookingint.com') {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const id = parseInt(c.req.param('id'));
    
    const discountCodes = await kv.get('discount_codes') || [];
    const filteredCodes = discountCodes.filter((dc: any) => dc.id !== id);

    await kv.set('discount_codes', filteredCodes);

    return c.json({ success: true });
  } catch (error) {
    console.error('Failed to delete discount code:', error);
    return c.json({ error: 'Failed to delete discount code' }, 500);
  }
});

// Flight search endpoint
app.post("/make-server-2c363e8a/search-flights", async (c) => {
  try {
    const { from, to, departureDate, returnDate, passengers, class: flightClass } = await c.req.json();
    
    const flightData = await kv.get('flight_data') || [];
    
    // Filter flights based on search criteria
    let filteredFlights = flightData.filter((flight: any) => {
      const matchesRoute = (!from || flight.from.toLowerCase().includes(from.toLowerCase())) &&
                          (!to || flight.to.toLowerCase().includes(to.toLowerCase()));
      
      // Filter for November/December flights specifically
      const flightDate = new Date(flight.date);
      const searchDate = departureDate ? new Date(departureDate) : null;
      const matchesDate = !searchDate || 
        (flightDate.getMonth() === searchDate.getMonth() && 
         Math.abs(flightDate.getDate() - searchDate.getDate()) <= 3);
      
      return matchesRoute && matchesDate;
    });

    // If no specific flights match, return all November/December flights
    if (filteredFlights.length === 0) {
      filteredFlights = flightData.filter((flight: any) => 
        flight.month === 'November' || flight.month === 'December'
      );
    }

    // Add mock additional flights for variety
    const additionalFlights = [
      {
        id: 'TK042',
        airline: 'Turkish Airlines',
        from: from || 'JNB',
        to: to || 'IST',
        price: 1150,
        duration: '9h 45m',
        departure: '23:55',
        arrival: '09:40',
        class: flightClass || 'Economy',
        month: 'November',
        date: '2024-11-20',
        type: 'flights'
      },
      {
        id: 'EY234',
        airline: 'Etihad Airways',
        from: from || 'CPT',
        to: to || 'AUH',
        price: 1350,
        duration: '8h 30m',
        departure: '16:45',
        arrival: '01:15',
        class: flightClass || 'Economy',
        month: 'December',
        date: '2024-12-08',
        type: 'flights'
      }
    ];

    const allFlights = [...filteredFlights, ...additionalFlights].map(flight => ({
      ...flight,
      type: 'flights',
      title: `${flight.airline} Flight ${flight.id}`,
      description: `${flight.from} to ${flight.to} - ${flight.duration}`,
      image: 'https://images.unsplash.com/photo-1647363377737-8d0ad7c2f494?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXJwbGFuZSUyMGZseWluZyUyMGJsdWUlMjBza3klMjBjbG91ZHN8ZW58MXx8fHwxNzU4MzAwOTA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 4.0 + Math.random(),
      location: `${flight.from} to ${flight.to}`
    }));

    return c.json({ flights: allFlights });
  } catch (error) {
    console.error('Flight search error:', error);
    return c.json({ error: 'Flight search failed' }, 500);
  }
});

// Get flight data for November and December
app.get("/make-server-2c363e8a/flights/november-december", async (c) => {
  try {
    const flightData = await kv.get('flight_data') || [];
    const novDecFlights = flightData.filter((flight: any) => 
      flight.month === 'November' || flight.month === 'December'  
    );
    
    return c.json({ flights: novDecFlights });
  } catch (error) {
    console.error('Failed to fetch November/December flights:', error);
    return c.json({ error: 'Failed to fetch flights' }, 500);
  }
});

// Admin: Scraping Control Endpoints

// Get scraping status and settings
app.get("/make-server-2c363e8a/admin/scraping/status", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (!user?.id || user.email !== 'admin@bookingint.com') {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const scrapingConfig = await kv.get('scraping_config') || {
      flights: { enabled: true, interval: 24, lastRun: null, status: 'idle' },
      hotels: { enabled: true, interval: 12, lastRun: null, status: 'idle' },
      cars: { enabled: true, interval: 6, lastRun: null, status: 'idle' },
      attractions: { enabled: false, interval: 48, lastRun: null, status: 'idle' },
      taxis: { enabled: false, interval: 24, lastRun: null, status: 'idle' }
    };

    return c.json({ scrapingConfig });
  } catch (error) {
    console.error('Failed to fetch scraping status:', error);
    return c.json({ error: 'Failed to fetch scraping status' }, 500);
  }
});

// Update scraping configuration
app.put("/make-server-2c363e8a/admin/scraping/config", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (!user?.id || user.email !== 'admin@bookingint.com') {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const config = await c.req.json();
    await kv.set('scraping_config', config);

    return c.json({ success: true, config });
  } catch (error) {
    console.error('Failed to update scraping config:', error);
    return c.json({ error: 'Failed to update scraping config' }, 500);
  }
});

// Trigger manual scraping for specific service
app.post("/make-server-2c363e8a/admin/scraping/trigger/:service", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (!user?.id || user.email !== 'admin@bookingint.com') {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const service = c.req.param('service');
    const scrapingConfig = await kv.get('scraping_config') || {};
    
    // Update status to running
    if (scrapingConfig[service]) {
      scrapingConfig[service].status = 'running';
      scrapingConfig[service].lastRun = new Date().toISOString();
      await kv.set('scraping_config', scrapingConfig);
    }

    // Simulate scraping based on service type
    setTimeout(async () => {
      try {
        switch (service) {
          case 'flights':
            await updateFlightData();
            break;
          case 'hotels':
            await generateHotelsData();
            break;
          case 'cars':
            await generateCarsData();
            break;
          case 'attractions':
            await generateAttractionsData();
            break;
          case 'taxis':
            await generateTaxisData();
            break;
        }

        // Update status to completed
        const updatedConfig = await kv.get('scraping_config') || {};
        if (updatedConfig[service]) {
          updatedConfig[service].status = 'completed';
          await kv.set('scraping_config', updatedConfig);
        }
      } catch (error) {
        console.error(`Scraping error for ${service}:`, error);
        const updatedConfig = await kv.get('scraping_config') || {};
        if (updatedConfig[service]) {
          updatedConfig[service].status = 'error';
          await kv.set('scraping_config', updatedConfig);
        }
      }
    }, 2000); // Simulate 2 second scraping time

    return c.json({ success: true, message: `${service} scraping triggered` });
  } catch (error) {
    console.error('Failed to trigger scraping:', error);
    return c.json({ error: 'Failed to trigger scraping' }, 500);
  }
});

// Generate mock data functions
const generateHotelsData = async () => {
  const hotelsData = [
    {
      id: 'hotel_1',
      name: 'Luxury Ocean Resort',
      location: 'Cape Town',
      price: 299,
      rating: 4.8,
      amenities: ['Pool', 'Spa', 'Gym', 'WiFi'],
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'hotel_2', 
      name: 'City Center Hotel',
      location: 'Johannesburg',
      price: 199,
      rating: 4.5,
      amenities: ['WiFi', 'Gym', 'Restaurant'],
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'hotel_3',
      name: 'Safari Lodge',
      location: 'Kruger National Park',
      price: 450,
      rating: 4.9,
      amenities: ['Game Drives', 'Spa', 'Restaurant', 'WiFi'],
      lastUpdated: new Date().toISOString()
    }
  ];
  
  await kv.set('hotels_data', hotelsData);
  console.log('Updated hotels data');
};

const generateCarsData = async () => {
  const carsData = [
    {
      id: 'car_1',
      model: 'BMW 3 Series',
      category: 'Premium',
      price: 89,
      location: 'Cape Town Airport',
      features: ['GPS', 'Bluetooth', 'AC'],
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'car_2',
      model: 'Toyota Corolla',
      category: 'Economy',
      price: 45,
      location: 'OR Tambo Airport',
      features: ['AC', 'Manual'],
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'car_3',
      model: 'Mercedes E-Class',
      category: 'Luxury',
      price: 129,
      location: 'Durban Airport',
      features: ['GPS', 'Leather', 'Premium Sound', 'AC'],
      lastUpdated: new Date().toISOString()
    }
  ];
  
  await kv.set('cars_data', carsData);
  console.log('Updated cars data');
};

const generateAttractionsData = async () => {
  const attractionsData = [
    {
      id: 'attraction_1',
      name: 'Table Mountain Cable Car',
      location: 'Cape Town',
      price: 45,
      duration: '3 hours',
      rating: 4.7,
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'attraction_2',
      name: 'Wine Tasting Tour',
      location: 'Stellenbosch',
      price: 75,
      duration: '6 hours',
      rating: 4.8,
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'attraction_3',
      name: 'Apartheid Museum',
      location: 'Johannesburg',
      price: 25,
      duration: '2 hours',
      rating: 4.6,
      lastUpdated: new Date().toISOString()
    }
  ];
  
  await kv.set('attractions_data', attractionsData);
  console.log('Updated attractions data');
};

const generateTaxisData = async () => {
  const taxisData = [
    {
      id: 'taxi_1',
      service: 'Airport Transfer',
      from: 'OR Tambo Airport',
      to: 'Sandton',
      price: 35,
      duration: '45 minutes',
      vehicleType: 'Sedan',
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'taxi_2',
      service: 'Premium Transfer',
      from: 'Cape Town Airport',
      to: 'V&A Waterfront',
      price: 55,
      duration: '30 minutes',
      vehicleType: 'Luxury SUV',
      lastUpdated: new Date().toISOString()
    }
  ];
  
  await kv.set('taxis_data', taxisData);
  console.log('Updated taxis data');
};

// Get all scraped data for admin overview
app.get("/make-server-2c363e8a/admin/data/overview", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (!user?.id || user.email !== 'admin@bookingint.com') {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const [flightData, hotelsData, carsData, attractionsData, taxisData] = await Promise.all([
      kv.get('flight_data') || [],
      kv.get('hotels_data') || [],
      kv.get('cars_data') || [],
      kv.get('attractions_data') || [],
      kv.get('taxis_data') || []
    ]);

    return c.json({
      flights: { count: flightData.length, data: flightData },
      hotels: { count: hotelsData.length, data: hotelsData },
      cars: { count: carsData.length, data: carsData },
      attractions: { count: attractionsData.length, data: attractionsData },
      taxis: { count: taxisData.length, data: taxisData }
    });
  } catch (error) {
    console.error('Failed to fetch data overview:', error);
    return c.json({ error: 'Failed to fetch data overview' }, 500);
  }
});

// Initialize default scraping config
const initializeScrapingConfig = async () => {
  try {
    const existingConfig = await kv.get('scraping_config');
    if (!existingConfig) {
      const defaultConfig = {
        flights: { enabled: true, interval: 24, lastRun: null, status: 'idle' },
        hotels: { enabled: true, interval: 12, lastRun: null, status: 'idle' },
        cars: { enabled: true, interval: 6, lastRun: null, status: 'idle' },
        attractions: { enabled: false, interval: 48, lastRun: null, status: 'idle' },
        taxis: { enabled: false, interval: 24, lastRun: null, status: 'idle' }
      };
      
      await kv.set('scraping_config', defaultConfig);
      console.log('Initialized scraping configuration');
    }
  } catch (error) {
    console.error('Failed to initialize scraping config:', error);
  }
};

// Initialize scraping config
initializeScrapingConfig();

// Get analytics data
app.get("/make-server-2c363e8a/admin/analytics", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (!user?.id || user.email !== 'admin@bookingint.com') {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    // Generate mock analytics data
    const analytics = {
      totalBookings: 157,
      totalRevenue: 45680,
      activeDiscountCodes: 8,
      userRegistrations: 342,
      recentActivity: [
        { type: 'booking', description: 'New flight booking to Dubai', timestamp: new Date().toISOString() },
        { type: 'user', description: 'New user registration', timestamp: new Date(Date.now() - 3600000).toISOString() },
        { type: 'discount', description: 'Discount code WELCOME10 used', timestamp: new Date(Date.now() - 7200000).toISOString() }
      ],
      monthlyStats: {
        bookings: [12, 19, 23, 31, 28, 35, 42],
        revenue: [3200, 4100, 3800, 5200, 4600, 6100, 7200]
      }
    };

    return c.json({ analytics });
  } catch (error) {
    console.error('Failed to fetch analytics:', error);
    return c.json({ error: 'Failed to fetch analytics' }, 500);
  }
});

Deno.serve(app.fetch);