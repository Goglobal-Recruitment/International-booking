<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Booking.com | Official site | The best hotels, flights, car rentals & accommodations</title>
<link rel="stylesheet" href="style.css">
<link rel="icon" type="image/png" href="images/favicon.png">
</head>
<body class="min-h-screen bg-white">

<!-- Header -->
<header class="header">
    <div class="container">
        <!-- Top header row -->
        <div class="flex items-center justify-between h-16">
            <!-- Logo -->
            <div class="logo">
                <a href="index.html" class="logo">Booking.com</a>
            </div>

            <!-- Right side actions -->
            <div class="flex items-center space-x-4">
                <div class="lg-flex items-center space-x-1 text-sm mobile-hidden">
                    <span class="currency-badge">ZAR</span>
                </div>
                
                <button class="btn btn-ghost btn-sm lg-flex text-white mobile-hidden">
                    <span class="icon mr-1">?</span>
                </button>
                
                <button class="btn btn-ghost btn-sm lg-flex text-white mobile-hidden">
                    List your property
                </button>

                <div class="flex items-center space-x-2">
                    <button class="btn btn-outline btn-sm" onclick="openModal('register')">Register</button>
                    <button class="btn btn-primary btn-sm" onclick="openModal('login')">Sign in</button>
                </div>

                <!-- Mobile Menu Button -->
                <button class="btn btn-ghost desktop-hidden" onclick="toggleMobileMenu()">
                    <span class="icon">☰</span>
                </button>
            </div>
        </div>

        <!-- Navigation tabs -->
        <div class="border-t border-blue-700">
            <nav class="flex items-center">
                <a href="#" class="nav-item active" onclick="setActiveTab('stays')">
                    <span class="icon">🏨</span><span>Stays</span>
                </a>
                <a href="flights.html" class="nav-item" onclick="setActiveTab('flights')">
                    <span class="icon">✈️</span><span>Flights</span>
                </a>
                <a href="#" class="nav-item" onclick="setActiveTab('cars')">
                    <span class="icon">🚗</span><span>Car rental</span>
                </a>
                <a href="#" class="nav-item" onclick="setActiveTab('attractions')">
                    <span class="icon">⭐</span><span>Attractions</span>
                </a>
                <a href="#" class="nav-item" onclick="setActiveTab('taxis')">
                    <span class="icon">🚕</span><span>Airport taxis</span>
                </a>
            </nav>
        </div>

        <!-- Mobile Navigation -->
        <div id="mobileMenu" class="mobile-menu desktop-hidden">
            <nav class="flex flex-col space-y-2">
                <a href="#" class="mobile-menu-item"><span class="icon">🏨</span>Stays</a>
                <a href="flights.html" class="mobile-menu-item"><span class="icon">✈️</span>Flights</a>
                <a href="#" class="mobile-menu-item"><span class="icon">🚗</span>Car rental</a>
                <a href="#" class="mobile-menu-item"><span class="icon">⭐</span>Attractions</a>
                <a href="#" class="mobile-menu-item"><span class="icon">🚕</span>Airport taxis</a>
            </nav>
        </div>
    </div>
</header>

<!-- Hero Section -->
<div class="hero">
    <div class="container h-full flex items-center py-12">
        <div class="text-white max-w-2xl">
            <h1 class="text-2xl md:text-4xl mb-3 font-bold">Find your next stay</h1>
            <p class="text-base md:text-lg opacity-90">Search deals on hotels, homes, and much more...</p>
        </div>
    </div>
</div>

<!-- Search Form -->
<div class="container px-4 -mt-24 relative z-10">
    <div class="max-w-5xl mx-auto">
        <div class="search-form">
            <div class="grid grid-cols-1 lg-grid-cols-4 gap-4 mb-6">
                <div>
                    <label class="form-label">Where are you going?</label>
                    <div class="input-group"><span class="input-icon">📍</span><input type="text" class="form-input form-input-icon" placeholder="Destination"></div>
                </div>
                <div>
                    <label class="form-label">Check-in date</label>
                    <div class="input-group"><span class="input-icon">📅</span><input type="date" class="form-input form-input-icon"></div>
                </div>
                <div>
                    <label class="form-label">Check-out date</label>
                    <div class="input-group"><span class="input-icon">📅</span><input type="date" class="form-input form-input-icon"></div>
                </div>
                <div>
                    <label class="form-label">Guests</label>
                    <div class="input-group"><span class="input-icon">👥</span>
                        <select class="form-input form-input-icon">
                            <option>2 adults</option>
                            <option>1 adult</option>
                            <option>3 adults</option>
                            <option>4 adults</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="flex justify-end">
                <button class="btn btn-primary btn-lg" onclick="searchProperties()"><span class="icon mr-2">🔍</span>Search</button>
            </div>
        </div>
    </div>
</div>

<!-- Your existing search results, featured destinations, property types, deals, and footer remain intact -->

<!-- Register Modal -->
<div id="registerModal" class="modal">
    <div class="modal-content">
        <div class="modal-header">
            <h3>Create your account</h3>
            <button class="modal-close" onclick="closeModal('register')">&times;</button>
        </div>
        <div class="modal-body">
            <form id="registerForm">
                <div class="mb-4"><label>Email address</label><input type="email" name="email" class="form-input" placeholder="Enter your email" required></div>
                <div class="mb-4"><label>Password</label><input type="password" name="password" class="form-input" placeholder="Create a password" required></div>
                <div class="mb-6"><label>Confirm password</label><input type="password" name="confirmPassword" class="form-input" placeholder="Confirm your password" required></div>
                <button type="submit" class="btn btn-primary w-full mb-4">Create account</button>
            </form>
            <p class="text-center text-sm">Already have an account? <a href="#" onclick="openModal('login')" class="text-blue-600">Sign in here</a></p>
        </div>
    </div>
</div>

<!-- Login Modal -->
<div id="loginModal" class="modal">
    <div class="modal-content">
        <div class="modal-header">
            <h3>Sign in</h3>
            <button class="modal-close" onclick="closeModal('login')">&times;</button>
        </div>
        <div class="modal-body">
            <form id="loginForm">
                <div class="mb-4"><label>Email address</label><input type="email" name="email" class="form-input" placeholder="Enter your email" required></div>
                <div class="mb-6"><label>Password</label><input type="password" name="password" class="form-input" placeholder="Enter your password" required></div>
                <button type="submit" class="btn btn-primary w-full mb-4">Sign in</button>
            </form>
            <p class="text-center text-sm">Don't have an account? <a href="#" onclick="openModal('register')" class="text-blue-600">Register here</a></p>
        </div>
    </div>
</div>

<script>
function toggleMobileMenu(){document.getElementById('mobileMenu').classList.toggle('active');}
function setActiveTab(tab){document.querySelectorAll('.nav-item').forEach(item=>item.classList.remove('active'));event.target.closest('.nav-item').classList.add('active');}
function openModal(type){document.getElementById(type+'Modal').style.display='flex';}
function closeModal(type){document.getElementById(type+'Modal').style.display='none';}
window.onclick=function(event){if(event.target.classList.contains('modal')){event.target.style.display='none';}}

document.getElementById('registerForm').addEventListener('submit',function(e){
    e.preventDefault();
    const email=this.email.value;
    const password=this.password.value;
    const confirmPassword=this.confirmPassword.value;
    if(password!==confirmPassword){alert('Passwords do not match!');return;}
    fetch('https://your-backend.com/register',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({email,password})
    }).then(res=>res.json()).then(data=>{
        if(data.success){alert('Account created! Check your inbox (noreply@booking.com)');closeModal('register');}
        else{alert('Error: '+data.message);}
    });
});

document.getElementById('loginForm').addEventListener('submit',function(e){
    e.preventDefault();
    const email=this.email.value;
    const password=this.password.value;
    fetch('https://your-backend.com/login',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({email,password})
    }).then(res=>res.json()).then(data=>{
        if(data.success){alert('Logged in successfully!');closeModal('login');}
        else{alert('Invalid credentials');}
    });
});

function searchProperties(){const results=document.getElementById('searchResults');if(results){results.style.display='block';results.scrollIntoView({behavior:'smooth'});}}
function selectBooking(type){alert('Booking functionality would be available in the full application. Please sign in to continue.');}
</script>

<style>
.modal{display:none;position:fixed;z-index:1000;left:0;top:0;width:100%;height:100%;background-color:rgba(0,0,0,.5);align-items:center;justify-content:center;}
.modal-content{background-color:white;border-radius:.5rem;width:90%;max-width:400px;box-shadow:0 10px 25px rgba(0,0,0,.2);}
.modal-header{display:flex;justify-content:space-between;align-items:center;padding:1.5rem 1.5rem 0;}
.modal-header h3{margin:0;font-size:1.25rem;font-weight:600;}
.modal-close{background:none;border:none;font-size:1.5rem;cursor:pointer;color:#666;}
.modal-body{padding:1.5rem;}
.w-full{width:100%;}
</style>

</body>
</html>
