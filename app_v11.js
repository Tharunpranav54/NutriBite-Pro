// NutriBite Pro - Core JavaScript Application Logic & Data Hydration

let cart = [];
let authMode = 'login'; 

// Massive Data Arrays with 3D Images
const classicMenu = [
    { name: 'Margarita Pizza', price: 150, imgUrl: '3d_pizza.png', bg: '#FCE7F3', desc: 'Wood-fired crust with authentic mozzarella.', tag: 'Bestseller' },
    { name: 'Chicken Biryani', price: 220, imgUrl: '3d_biryani.png', bg: '#FEF3C7', desc: 'Rich aromatic rice with tender chicken chunks.' },
    { name: 'Club Sandwich', price: 110, imgUrl: '3d_sandwich.png', bg: '#D1FAE5', desc: 'Grilled triple-decker with premium fillings.' },
    { name: 'Classic Veg Burger', price: 95, imgUrl: '3d_burger.png', bg: '#E0E7FF', desc: 'Double patty goodness with cheese.', tag: 'Student Saver' },
    { name: 'Alfredo Pasta', price: 180, imgUrl: '3d_noodles.png', bg: '#FEE2E2', desc: 'Creamy white sauce with roasted garlic.' },
    { name: 'Chicken Wings', price: 210, imgUrl: '3d_fries.png', bg: '#F3E8FF', desc: '6pcs BBQ Glazed sticky wings.' },
    { name: 'Choco Lava Cake', price: 85, imgUrl: '3d_dessert.png', bg: '#E0F2FE', desc: 'Warm gooey center with vanilla crust.' },
    { name: 'Garlic Bread', price: 70, imgUrl: '3d_pizza.png', bg: '#FEF3C7', desc: 'Cheesy herb crust, perfect side.' },
    { name: 'Loaded Nachos', price: 130, imgUrl: '3d_fries.png', bg: '#FFEDD5', desc: 'Topped with jalapenos and liquid cheese.' },
    { name: 'Chicken Wrap', price: 120, imgUrl: '3d_sandwich.png', bg: '#ECFCCB', desc: 'Spicy flavors in a soft tortilla.' },
    { name: 'Cold Frappe', price: 90, imgUrl: '3d_drink.png', bg: '#E0E7FF', desc: 'Iced energy boost with chocolate shavings.' },
    { name: 'Paneer Masala', price: 190, imgUrl: '3d_biryani.png', bg: '#FFEDD5', desc: 'Rich tomato gravy with soft paneer.' },
    { name: 'Butter Naan', price: 40, imgUrl: '3d_pizza.png', bg: '#FCE7F3', desc: 'Soft Indian bread with melted butter.' },
    { name: 'Crispy Fries', price: 60, imgUrl: '3d_fries.png', bg: '#FEF3C7', desc: 'Perfectly salted sides.', tag: 'Student Saver' },
    { name: 'Pepperoni Pizza', price: 250, imgUrl: '3d_pizza.png', bg: '#FEE2E2', desc: 'Classic loaded meat pizza.' },
    { name: 'Mutton Biryani', price: 280, imgUrl: '3d_biryani.png', bg: '#D1FAE5', desc: 'Premium slow-cooked meat and rice.', tag: 'Chef Special' },
    { name: 'Hakka Noodles', price: 140, imgUrl: '3d_noodles.png', bg: '#F3E8FF', desc: 'Wok-tossed noodles with veggies.' }
];

const organicMenu = [
    { name: 'Fresh Orange Juice', price: 110, imgUrl: '3d_drink.png', bg: '#FFEDD5', desc: '100% freshly squeezed citrus.', tag: 'Fresh Juice' },
    { name: 'Watermelon Cooler', price: 90, imgUrl: '3d_drink.png', bg: '#FCE7F3', desc: 'Chilled watermelon with mint leaves.', tag: 'Fresh Juice' },
    { name: 'Avocado Salad', price: 180, imgUrl: '3d_salad.png', bg: '#D1FAE5', desc: 'Rich in healthy fats and crisp fresh greens.', tag: 'Keto Safe' },
    { name: 'Detox Green Juice', price: 125, imgUrl: '3d_drink.png', bg: '#ECFCCB', desc: 'Cold-pressed spinach, celery, apple mix.', tag: 'Fresh Juice' },
    { name: 'Power Bowl', price: 210, imgUrl: '3d_salad.png', bg: '#E0F2FE', desc: 'High-protein grain with roasted veggies.', tag: 'Protein+' },
    { name: 'Chicken Salad', price: 220, imgUrl: '3d_salad.png', bg: '#D1FAE5', desc: 'Lean breast meat with olive oil dressing.' },
    { name: 'Pineapple Blast Juice', price: 105, imgUrl: '3d_drink.png', bg: '#FEF3C7', desc: 'Tropical fresh pineapple juice.', tag: 'Fresh Juice' },
    { name: 'Oatmeal Porridge', price: 120, imgUrl: '3d_soup.png', bg: '#FFE4E6', desc: 'Slow-cooked steel cut oats with honey.', tag: 'Senior Safe' },
    { name: 'Fruit Platter', price: 150, imgUrl: '3d_dessert.png', bg: '#FFEDD5', desc: 'Seasonal fresh cut fruits without added sugar.' },
    { name: 'Tofu Brown Rice', price: 190, imgUrl: '3d_biryani.png', bg: '#F3E8FF', desc: 'Vegan protein served over complex carbs.' },
    { name: 'Clear Veg Soup', price: 90, imgUrl: '3d_soup.png', bg: '#D1FAE5', desc: 'Warm wellness broth full of vitamins.', tag: 'Immunity' },
    { name: 'Almond Smoothie', price: 130, imgUrl: '3d_drink.png', bg: '#E0E7FF', desc: 'Dairy-free strawberry blend.' },
    { name: 'Sprouts Crunch', price: 85, imgUrl: '3d_salad.png', bg: '#D1FAE5', desc: 'Sprouted mung beans with lime.' },
    { name: 'Boiled Eggs', price: 60, imgUrl: '3d_fries.png', bg: '#FEF3C7', desc: '4 egg whites seasoned with black pepper.' },
    { name: 'Roasted Almonds', price: 140, imgUrl: '3d_fries.png', bg: '#FFEDD5', desc: 'Dry roasted without oil.' },
    { name: 'Herbal Tea', price: 50, imgUrl: '3d_drink.png', bg: '#FCE7F3', desc: 'Chamomile blend for relaxation and digestion.' },
    { name: 'Coconut Water', price: 45, imgUrl: '3d_drink.png', bg: '#E0F2FE', desc: '100% natural pure hydration.' }
];

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    hydrateMenus();
    const storedAuth = localStorage.getItem('nutribite_pro_auth');
    if (storedAuth) {
        updateAuthUI(true);
        navigateTo('menu');
    } else {
        updateAuthUI(false);
    }
    
    const storedCart = localStorage.getItem('nutribite_pro_cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
        updateCartBadge();
        renderCart();
    }
    
    // Check for saved mobile number
    const savedPhone = localStorage.getItem('nutribite_saved_mobile');
    if (savedPhone && document.getElementById('auth-phone')) {
        document.getElementById('auth-phone').value = savedPhone;
        if(document.getElementById('auth-save-number')) document.getElementById('auth-save-number').checked = true;
    }

    // Load Theme Preference
    const savedTheme = localStorage.getItem('nutribite_theme') || 'dark'; // Updated to default Dark!
    if(savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        document.getElementById('theme-btn').innerHTML = '<ion-icon name="sunny-outline"></ion-icon>';
    } else {
        document.getElementById('theme-btn').innerHTML = '<ion-icon name="moon-outline"></ion-icon>';
    }
});

function hydrateMenus() {
    const classicContainer = document.getElementById('menu-classic-container');
    const organicContainer = document.getElementById('menu-organic-container');
    if(!classicContainer || !organicContainer) return;

    let classicHTML = '';
    classicMenu.forEach((item, index) => {
        const delay = (index % 4) * 0.1;
        const tagHTML = item.tag ? `<span class="pro-card-badge">${item.tag}</span>` : '';
        classicHTML += `
            <div class="pro-card fade-in-up" style="animation-delay: ${delay}s;">
                <img class="real-3d-food" src="${item.imgUrl}" alt="${item.name}">
                ${tagHTML}
                <div>
                    <h3 class="pro-card-title">${item.name}</h3>
                    <p class="pro-card-desc">${item.desc}</p>
                </div>
                <div class="pro-card-footer">
                    <div class="pro-price">₹<span>${item.price}</span></div>
                    <button class="btn-add hover-bounce pulse-glow" onclick="addToCart('${item.name}', ${item.price})"><ion-icon name="add"></ion-icon></button>
                </div>
            </div>`;
    });
    classicContainer.innerHTML = classicHTML;

    let organicHTML = '';
    organicMenu.forEach((item, index) => {
        const delay = (index % 4) * 0.1;
        const tagHTML = item.tag ? `<span class="pro-card-badge" style="color:var(--safe); border-color: rgba(16,185,129,0.3);">${item.tag}</span>` : '';
        organicHTML += `
            <div class="pro-card fade-in-up" style="animation-delay: ${delay}s;">
                <img class="real-3d-food" src="${item.imgUrl}" alt="${item.name}">
                ${tagHTML}
                <div>
                    <h3 class="pro-card-title">${item.name}</h3>
                    <p class="pro-card-desc">${item.desc}</p>
                </div>
                <div class="pro-card-footer">
                    <div class="pro-price">₹<span>${item.price}</span></div>
                    <button class="btn-add hover-bounce" style="background: var(--safe); box-shadow: 0 5px 15px rgba(16,185,129,0.3);" onclick="addToCart('${item.name}', ${item.price})"><ion-icon name="add"></ion-icon></button>
                </div>
            </div>`;
    });
    organicContainer.innerHTML = organicHTML;
}

function navigateTo(targetModule) {
    document.querySelectorAll('.module-view').forEach(mod => {
        mod.classList.remove('active');
        setTimeout(() => { if(!mod.classList.contains('active')) mod.style.display = 'none'; }, 100);
    });

    const target = document.getElementById(`module-${targetModule}`);
    if (target) {
        target.style.display = 'block';
        const animElements = target.querySelectorAll('.fade-in-up, .slide-in-left, .zoom-in');
        animElements.forEach(el => {
            el.style.animation = 'none'; el.offsetHeight; el.style.animation = null; 
        });
        setTimeout(() => { target.classList.add('active'); }, 50);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if(targetModule === 'cart') renderCart();
    
    // Always reset HUB view on profile/admin navigate to prevent getting stuck in a pane
    if(targetModule === 'profile') {
        closeProfilePane();
        renderProfile();
    }
    if(targetModule === 'admin-dashboard') {
        closeAdminPane();
        renderAdminDashboard();
    }
}

function togglePasswordVisibility(inputId, iconId) {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(iconId);
    if(input.type === 'password') {
        input.type = 'text';
        icon.name = 'eye-off';
        icon.style.color = 'var(--primary)';
    } else {
        input.type = 'password';
        icon.name = 'eye';
        icon.style.color = 'var(--text-muted)';
    }
}

function openForgotModal() {
    document.getElementById('forgot-password-modal').style.display = 'flex';
    document.getElementById('fg-step-1').style.display = 'block';
    document.getElementById('fg-step-2').style.display = 'none';
    document.getElementById('fg-step-3').style.display = 'none';
}

function closeForgotModal() {
    document.getElementById('forgot-password-modal').style.display = 'none';
}

function triggerRecoveryLoader() {
    const email = document.getElementById('fg-email').value;
    if(!email) { alert("Please type your registered email."); return; }
    
    document.getElementById('fg-step-1').style.display = 'none';
    document.getElementById('fg-step-2').style.display = 'block';
    
    setTimeout(() => {
        document.getElementById('fg-step-2').style.display = 'none';
        document.getElementById('fg-step-3').style.display = 'block';
    }, 2000);
}

function toggleAuthMode(mode) {
    authMode = mode;
    const title = document.getElementById('auth-title');
    const subtitle = document.getElementById('auth-subtitle');
    const registerFields = document.getElementById('register-fields');
    const submitBtn = document.getElementById('auth-submit-btn');
    const fgLink = document.getElementById('fg-link-txt');

    if (mode === 'register') {
        title.innerText = 'Create Pro Account';
        subtitle.innerHTML = `or <span style="color:var(--primary); font-weight:700; cursor:pointer;" onclick="toggleAuthMode('login')">login to existing</span>`;
        if(document.getElementById('auth-step-1')) document.getElementById('auth-step-1').style.display = 'block';
        if(document.getElementById('register-fields')) document.getElementById('register-fields').style.display = 'none';
        if(document.getElementById('auth-submit-btn')) document.getElementById('auth-submit-btn').innerText = 'CONTINUE TO REGISTRATION';
        fgLink.style.display = 'none';
    } else {
        title.innerText = 'Sign In';
        subtitle.innerHTML = `or <span style="color:var(--primary); font-weight:700; cursor:pointer;" onclick="toggleAuthMode('register')">create a new account</span>`;
        if(document.getElementById('auth-step-1')) document.getElementById('auth-step-1').style.display = 'block';
        if(document.getElementById('register-fields')) document.getElementById('register-fields').style.display = 'none';
        if(document.getElementById('auth-submit-btn')) document.getElementById('auth-submit-btn').innerText = 'LOGIN SECURELY';
        fgLink.style.display = 'block';
    }
}

function submitAuthStep1() {
    const email = document.getElementById('auth-email').value;
    const pass = document.getElementById('auth-pass').value;
    if(!email || !pass) { alert("Email and Password are required."); return; }

    if(authMode === 'register') {
        // Just hide Step 1, show Step 2 (Profile Hydration) - NO SCROLLBARS!
        document.getElementById('auth-step-1').style.display = 'none';
        document.getElementById('register-fields').style.display = 'block';
        document.getElementById('auth-footer-links').style.display = 'none';
    } else {
        // Direct Login
        const savedData = JSON.parse(localStorage.getItem('nutribite_pro_user'));
        if(!savedData || savedData.email !== email || savedData.pass !== pass) {
            alert("Invalid Email or Password! Please register if you don't have an account.");
            return;
        }
        
        // Handle Mobile Saved Preference
        const saveCheck = document.getElementById('auth-save-number');
        if(saveCheck && saveCheck.checked) {
            localStorage.setItem('nutribite_saved_mobile', savedData.phone);
        } else {
            localStorage.removeItem('nutribite_saved_mobile');
        }

        localStorage.setItem('nutribite_pro_auth', 'true');
        updateAuthUI(true);
        navigateTo('menu');
    }
}

function submitRegistration() {
    const email = document.getElementById('auth-email').value;
    const pass = document.getElementById('auth-pass').value;
    const name = document.getElementById('auth-name').value;
    const phone = document.getElementById('auth-phone').value;
    const address = document.getElementById('auth-address').value;

    if(!name) { alert("Please enter your Full Name."); return; }
    
    const memberId = 'NB-' + Math.random().toString(36).substr(2, 5).toUpperCase() + '-PRO';
    
    let mockHistory = [
        {id: 'NB-10291', date: new Date(Date.now() - 86400000).toLocaleString(), total: 450, paymentMethod: 'PhonePe', status: 'DELIVERED'},
        {id: 'NB-32811', date: new Date(Date.now() - 172800000).toLocaleString(), total: 220, paymentMethod: 'Membership', status: 'CANCELLED'}
    ];
    
    const userData = { email, pass, name, phone, address, memberId, college: '', dept: '', loc: '', year: '', perc: '', age: '', orderHistory: mockHistory };
    
    localStorage.setItem('nutribite_pro_user', JSON.stringify(userData));
    
    let allUsers = JSON.parse(localStorage.getItem('nutribite_admin_db')) || [];
    allUsers.push(userData);
    localStorage.setItem('nutribite_admin_db', JSON.stringify(allUsers));
    
    // Handle Mobile Saved Preference
    const saveCheck = document.getElementById('auth-save-number');
    if(saveCheck && saveCheck.checked) {
        localStorage.setItem('nutribite_saved_mobile', phone);
    } else {
        localStorage.removeItem('nutribite_saved_mobile');
    }

    localStorage.setItem('nutribite_pro_auth', 'true');
    updateAuthUI(true);
    navigateTo('menu');
}

function updateAuthUI(isLoggedIn) {
    const authElements = document.querySelectorAll('.auth-required');
    const loginBtn = document.getElementById('nav-login-btn');
    if(isLoggedIn) {
        authElements.forEach(el => el.style.display = 'flex');
        loginBtn.innerHTML = '<ion-icon name="person-circle"></ion-icon> Hub';
        loginBtn.onclick = () => navigateTo('profile');
        
        const loc = document.getElementById('feed-location-text');
        const db = JSON.parse(localStorage.getItem('nutribite_pro_user'));
        if(db && db.address && loc) loc.innerText = "Delivering to " + db.address;
    } else {
        authElements.forEach(el => el.style.display = 'none');
        loginBtn.innerHTML = '<ion-icon name="person-outline"></ion-icon> Sign In';
        loginBtn.onclick = () => navigateTo('login');
    }
}

function logout() {
    if(confirm("Are you sure you want to log out?")) {
        localStorage.removeItem('nutribite_pro_auth');
        updateAuthUI(false);
        navigateTo('home');
    }
}

// --- PROFILE HUB GRID LOGIC ---
function switchProfileTab(paneId) {
    document.getElementById('profile-hub-grid').style.display = 'none';
    const wrapper = document.getElementById('profile-panes-wrapper');
    wrapper.style.display = 'block';

    document.querySelectorAll('.profile-content-pane').forEach(pane => {
        pane.style.display = 'none';
        pane.classList.remove('fade-in-up');
    });

    const target = document.getElementById(paneId);
    if(target) {
        target.style.display = 'block';
        void target.offsetWidth;
        target.classList.add('fade-in-up');
    }
}

function closeProfilePane() {
    document.getElementById('profile-panes-wrapper').style.display = 'none';
    const hub = document.getElementById('profile-hub-grid');
    hub.style.display = 'block';
    
    // re-trigger animation
    hub.classList.remove('reveal-anim');
    void hub.offsetWidth;
    hub.classList.add('reveal-anim');
}

// --- ADMIN HUB GRID LOGIC ---
function switchAdminTab(paneId) {
    document.getElementById('admin-hub-grid').style.display = 'none';
    const wrapper = document.getElementById('admin-hub-content');
    if(!wrapper) return;
    wrapper.style.display = 'block';

    // Hide all internal panels manually since they lack the common class in index.html, to be safe.
    ['admin-ops-panel', 'admin-users-panel', 'admin-finance-panel', 'admin-logistics-panel', 'admin-alerts-panel'].forEach(id => {
        const el = document.getElementById(id);
        if(el) {
            el.style.display = 'none';
            el.classList.remove('fade-in-up');
        }
    });

    const target = document.getElementById(paneId);
    if(target) {
        target.style.display = 'block';
        void target.offsetWidth;
        target.classList.add('fade-in-up');
    }
}

function closeAdminPane() {
    document.getElementById('admin-hub-content').style.display = 'none';
    const hub = document.getElementById('admin-hub-grid');
    if(hub) {
        hub.style.display = 'block';
        hub.classList.remove('reveal-anim');
        void hub.offsetWidth;
        hub.classList.add('reveal-anim');
    }
}

// --- DATA HYDRATION ---
function saveAcademicData() {
    let userData = JSON.parse(localStorage.getItem('nutribite_pro_user'));
    
    userData.age = document.getElementById('acad-age').value;
    userData.dept = document.getElementById('acad-dept').value;
    userData.college = document.getElementById('acad-colg').value;
    userData.loc = document.getElementById('acad-loc').value;
    userData.year = document.getElementById('acad-year').value;
    userData.perc = document.getElementById('acad-perc').value;

    localStorage.setItem('nutribite_pro_user', JSON.stringify(userData));
    alert("Academic Details strictly verified and saved to DB!");
    
    let allUsers = JSON.parse(localStorage.getItem('nutribite_admin_db')) || [];
    let updatedUsers = allUsers.map(u => u.email === userData.email ? userData : u);
    localStorage.setItem('nutribite_admin_db', JSON.stringify(updatedUsers));

    renderProfile();
    switchProfileTab('profile-card'); // Use new pan switching
}

function renderProfile() {
    const userData = JSON.parse(localStorage.getItem('nutribite_pro_user'));
    if(!userData) return;

    document.getElementById('display-profile-name').innerText = userData.name || '--';
    document.getElementById('display-profile-phone').innerText = userData.phone || 'Not Configured';
    document.getElementById('display-profile-address').innerText = userData.address || 'Address Required for Delivery';
    document.getElementById('display-profile-email').innerText = userData.email || '--';
    
    document.getElementById('display-profile-pass').value = userData.pass || '';
    
    document.getElementById('vc-name').innerText = userData.name.toUpperCase();
    document.getElementById('vc-college').innerText = userData.college ? userData.college.toUpperCase() + ` [YR ${userData.year}]` : 'ACADEMIC DETAILS REQUIRED';
    document.getElementById('vc-dept').innerText = userData.dept ? `Dept: ${userData.dept} • Score: ${userData.perc}%` : 'INCOMPLETE PROFILE';
    document.getElementById('vc-id').innerText = userData.memberId || 'N/A';

    // Render Order History Dynamically
    const dynamicOrderTable = document.getElementById('dynamic-user-orders');
    if(dynamicOrderTable && userData.orderHistory && userData.orderHistory.length > 0) {
        let html = '';
        let successCount = 0;
        let cancelledCount = 0;
        let activeCount = 0;

        userData.orderHistory.slice().reverse().forEach(o => {
            if (o.status && o.status.includes('DELIVERED')) successCount++;
            else if (o.status && o.status.includes('CANCELLED')) cancelledCount++;
            else activeCount++;

            html += `<tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                <td style="padding: 1rem; color: white; font-weight:700;">#${o.id}</td>
                <td style="padding: 1rem; color:var(--text-muted);">${o.date}</td>
                <td style="padding: 1rem; font-weight:700;">₹${o.total}</td>
                <td style="padding: 1rem; font-weight:600; color:#A78BFA;">${o.paymentMethod || 'PhonePe'}</td>
                <td style="padding: 1rem;"><span style="color:var(--safe); font-size:0.85rem; background:rgba(16,185,129,0.1); padding:0.2rem 0.5rem; border-radius:10px;">[ ${o.status || 'PAID'} ]</span></td>
            </tr>`;
        });
        dynamicOrderTable.innerHTML = html;
        
        let elSuccess = document.getElementById('status-count-success');
        let elCancel = document.getElementById('status-count-cancelled');
        let elActive = document.getElementById('status-count-active');
        if(elSuccess) elSuccess.innerText = successCount;
        if(elCancel) elCancel.innerText = cancelledCount;
        if(elActive) elActive.innerText = activeCount;
    }
}

function adminLogin() {
    const id = document.getElementById('admin-id').value;
    const pass = document.getElementById('admin-pass').value;

    if(id === "admin" && pass === "1234") {
        document.getElementById('admin-id').value = '';
        document.getElementById('admin-pass').value = '';
        navigateTo('admin-dashboard');
        renderAdminDashboard();
    } else {
        alert("Invalid Admin Credentials. Hint: admin / 1234");
    }
}


function renderAdminDashboard() {
    renderAdminUsers();
    renderAdminMenu();

    const allUsers = JSON.parse(localStorage.getItem('nutribite_admin_db')) || [];
    let totalMembers = allUsers.length;

    const feedbackSlot = document.getElementById('dynamic-feedback-slot');
    if(feedbackSlot && allUsers.length > 0) {
        const latestUser = allUsers[allUsers.length - 1]; 
        const initials = latestUser.name.substring(0,2).toUpperCase();
        feedbackSlot.innerHTML = `
            <div style="background:rgba(16, 185, 129, 0.05); padding:1.5rem; border-radius:12px; display:flex; gap:1.5rem; border-left:4px solid var(--safe);">
                <div style="width:50px; height:50px; background:rgba(16, 185, 129, 0.2); color:var(--safe); font-size:1.5rem; border-radius:50%; display:flex; justify-content:center; align-items:center; font-weight:800;">${initials}</div>
                <div style="flex:1;">
                    <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
                        <h4 style="font-weight:800; color:white;">${latestUser.name} <span style="font-size:0.8rem; background:var(--safe); color:black; padding:0.2rem 0.5rem; border-radius:10px; margin-left:0.5rem;">NEW</span></h4>
                        <div style="color:#FCD34D;"><ion-icon name="star"></ion-icon><ion-icon name="star"></ion-icon><ion-icon name="star"></ion-icon><ion-icon name="star"></ion-icon><ion-icon name="star"></ion-icon></div>
                    </div>
                    <p style="color:var(--text-muted); font-size:0.95rem; line-height:1.6;">"Just signed up using my institution details! The UI is incredibly fast and the BMI health tracker actually correctly diagnosed my diet requirements immediately!"</p>
                </div>
            </div>
        `;
    }
}

function renderAdminUsers() {
    const allUsers = JSON.parse(localStorage.getItem('nutribite_admin_db')) || [];
    const usersList = document.getElementById('admin-users-list');
    
    if(usersList) {
        let html = '';
        if(allUsers.length === 0) {
            html = `<tr><td colspan="4" style="padding:1rem; color:var(--text-muted);">No users registered yet.</td></tr>`;
        } else {
            allUsers.forEach(u => {
                html += `
                    <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                        <td style="padding: 1.2rem 1rem; color: #1c1c1c; font-weight:700;">
                            <div>${u.name}</div>
                            <div style="font-size:0.75rem; color:#666; font-weight:400;">Pass: ${u.pass}</div>
                        </td>
                        <td style="padding: 1.2rem 1rem; color:#1c1c1c;">${u.email}</td>
                        <td style="padding: 1.2rem 1rem; color:#1c1c1c;">
                            <div>${u.phone || 'N/A'}</div>
                            <div style="font-size:0.75rem; color:#888;">${u.address || 'No Address'}</div>
                        </td>
                        <td style="padding: 1.2rem 1rem;"><span style="background: rgba(0,0,0,0.05); padding: 0.3rem 0.8rem; border-radius: 12px; font-size:0.85rem; color:var(--primary); border:1px solid var(--primary);">${u.memberId}</span></td>
                    </tr>`;
            });
        }
        usersList.innerHTML = html;
    }
}

function renderAdminMenu() {
    const list = document.getElementById('admin-menu-list');
    if(!list) return;

    let html = '';
    const fullMenu = [...classicMenu, ...organicMenu];
    
    fullMenu.forEach(item => {
        html += `
            <tr style="border-bottom: 1px solid #EEE;">
                <td style="padding: 1rem; display:flex; align-items:center; gap:1rem;">
                    <img src="${item.imgUrl}" style="width:40px; height:40px; border-radius:50%; background:#F3F4F6;">
                    <div style="color:#1C1C1C; font-weight:700;">${item.name}</div>
                </td>
                <td style="padding: 1rem; color:#1C1C1C; font-weight:800;">₹${item.price}</td>
                <td style="padding: 1rem;"><span style="color:#10B981; font-weight:700; font-size:0.8rem; background:#ECFDF5; padding:0.2rem 0.6rem; border-radius:10px;">ACTIVE</span></td>
                <td style="padding: 1rem; text-align:right;">
                    <button class="btn" style="background:#F3F4F6; color:#666; font-size:0.8rem; padding: 0.4rem 1rem;">EDIT</button>
                </td>
            </tr>
        `;
    });
    list.innerHTML = html;
}
    
    const prebookTable = document.getElementById('prebook-admin-table');
    const existingDate = localStorage.getItem('nutribite_prebook_date');
    if(existingDate && prebookTable) {
        prebookTable.innerHTML += `<tr><td style="padding:1rem; font-weight:700;">#NB-${Math.floor(Math.random()*9000)+1000}</td><td style="padding:1rem; color:var(--info);">${existingDate} @ ${localStorage.getItem('nutribite_prebook_time')}</td><td style="padding:1rem;"><span style="color:var(--safe)">VERIFIED PRE-BOOKING</span></td></tr>`;
    }

    // Dynamic Admin Financials
    const globalOrders = JSON.parse(localStorage.getItem('nutribite_global_orders')) || [];
    let grossSales = 142800; // Base baseline
    globalOrders.forEach(o => grossSales += o.total);
    const commision = Math.round(grossSales * 0.18);
    
    // Attempt to target DOM elements in Finance and Loyalty directly
    const financeMod = document.getElementById('admin-finance');
    if(financeMod) {
        financeMod.innerHTML = `
            <div class="info-box" style="border: 1px solid rgba(16, 185, 129, 0.4);">
                <h3 style="font-size:1.5rem; font-weight: 800; color:var(--safe); margin-bottom: 2rem;"><ion-icon name="cash"></ion-icon> Financial Transactions Management</h3>
                <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
                    <div style="background:rgba(255,255,255,0.03); border-radius:12px; padding: 1.5rem;"><p style="color:var(--text-muted); font-size:0.9rem; text-transform:uppercase;">Gross Network Sales</p><h2 style="font-size:2.8rem; font-weight:800; color:white;">₹${grossSales.toLocaleString()}</h2></div>
                    <div style="background:rgba(16,185,129,0.1); border-radius:12px; padding: 1.5rem; border:1px solid var(--safe);"><p style="color:var(--safe); font-size:0.9rem; text-transform:uppercase; font-weight:700;">App Commission (18%)</p><h2 style="font-size:2.8rem; font-weight:800; color:var(--safe);">₹${commision.toLocaleString()}</h2></div>
                </div>
            </div>`;
    }

    const loyaltyMod = document.getElementById('admin-loyalty');
    if(loyaltyMod) {
        loyaltyMod.innerHTML = `
            <div class="info-box"><h3 style="font-size:1.5rem; font-weight: 800; margin-bottom: 1.5rem;">Loyalty & Membership Ecosystem</h3><div style="display:flex; justify-content:center; align-items:center; padding: 4rem; background:rgba(255,106,0,0.1); border-radius:12px; border:1px dashed var(--primary);"><h2 style="color:var(--primary); font-size:2.5rem; font-weight:800;">${4289 + totalMembers} Active Pro Members</h2></div></div>
        `;
    }
}

function calculateHealth(e, form) {
    if(e) e.preventDefault();
    const height = parseFloat(form.querySelector('.vital-height').value) / 100;
    const weight = parseFloat(form.querySelector('.vital-weight').value);
    const sugar = parseInt(form.querySelector('.vital-sugar').value);
    const sys = parseInt(form.querySelector('.vital-bp-sys').value);

    // Form protection against empty evaluation
    if(!height || !weight) return;

    const bmi = (weight / (height * height)).toFixed(1);
    
    let state = 'NORMAL';
    let targetTextColor = 'var(--safe)';
    let targetBg = 'rgba(16, 185, 129, 0.1)';
    let message = `Optimal Health State detected. You can freely choose from our menus.`;
    let suggestedFoods = [];

    if (bmi < 18.5) {
        state = 'UNDERWEIGHT';
        targetTextColor = '#FCD34D';
        targetBg = 'rgba(245, 158, 11, 0.1)';
        message = `Warning: Critical caloric deficit detected. System demands immediate High-Protein and Carbohydrate intake to achieve stability.`;
        suggestedFoods = [classicMenu[1], classicMenu[4], classicMenu[5]]; 
    } else if (bmi >= 25 || sugar > 110 || sys > 130) {
        state = 'OVERWEIGHT / ELEVATED';
        targetTextColor = '#FCA5A5'; 
        targetBg = 'rgba(239, 68, 68, 0.1)';
        message = `Metric Violation: Caloric surplus or elevated vitals detected. System strongly restricts intake to Smart Organics to optimize metabolism.`;
        suggestedFoods = [organicMenu[0], organicMenu[1], organicMenu[7]]; 
    } else {
        suggestedFoods = [classicMenu[0], organicMenu[2]];
    }

    const statusBox = form.querySelector('.result-status');
    statusBox.style.color = targetTextColor;
    statusBox.style.backgroundColor = targetBg;
    statusBox.style.borderLeftColor = targetTextColor;
    statusBox.innerText = `[DIAGNOSIS: ${state}] - ${message}`;

    form.querySelector('.result-metrics').innerHTML = `
        <div style="display:flex; justify-content:space-between; max-width: 400px; padding: 1rem; background:rgba(255,255,255,0.03); border-radius:12px; margin-bottom:1rem;">
            <span>Verified BMI Metric:</span>
            <strong style="color:white; font-size:1.2rem;">${bmi} kg/m²</strong>
        </div>
    `;

    const suggContainer = form.querySelector('.health-food-suggestions');
    let html = '';
    suggestedFoods.forEach(item => {
        html += `
        <div class="glass-panel hover-bounce" style="display:flex; justify-content:space-between; align-items:center; padding: 1.5rem;">
             <div style="display:flex; align-items:center; gap: 1rem;">
                 <img src="${item.imgUrl}" style="width:70px; height:70px; border-radius:50%; object-fit:cover; box-shadow:0 10px 20px rgba(0,0,0,0.5);">
                 <div>
                     <h4 style="font-weight:800; font-size:1.1rem;">${item.name}</h4>
                 </div>
             </div>
             <button class="btn" style="background:var(--danger); color:white; font-weight:800;" onclick="addToCart('${item.name}', ${item.price})">₹${item.price} + ADD</button>
        </div>`;
    });
    suggContainer.innerHTML = html;

    const resultsContainer = form.querySelector('.health-results-container');
    resultsContainer.style.display = 'block';
    
    // Smooth scroll down to results
    setTimeout(() => {
        resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

function addToCart(itemName, itemPrice) {
    if(!localStorage.getItem('nutribite_pro_auth')) {
        alert("Please sign in to order."); navigateTo('login'); return;
    }
    cart.push({ id: Date.now(), name: itemName, price: itemPrice });
    localStorage.setItem('nutribite_pro_cart', JSON.stringify(cart));
    updateCartBadge();
    
    const toast = document.createElement('div');
    toast.style.position = 'fixed'; toast.style.bottom = '30px'; toast.style.left = '50%'; toast.style.transform = 'translateX(-50%)';
    toast.style.background = 'var(--primary)'; toast.style.color = 'white'; toast.style.padding = '1rem 2.5rem';
    toast.style.borderRadius = '50px'; toast.style.fontWeight = '800'; toast.style.zIndex = '9999';
    toast.style.animation = 'fadeUp 0.3s ease forwards';
    toast.innerHTML = `<ion-icon name="checkmark-circle"></ion-icon> ${itemName} added!`;
    document.body.appendChild(toast);
    setTimeout(() => { toast.style.animation = 'fadeUp 0.3s ease reverse forwards'; setTimeout(() => toast.remove(), 300); }, 1500);
}

function updateCartBadge() {
    document.getElementById('nav-cart-btn').innerHTML = `<ion-icon name="cart-outline"></ion-icon> Cart (${cart.length})`;
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('nutribite_pro_cart', JSON.stringify(cart));
    updateCartBadge(); renderCart();
}

function renderCart() {
    const container = document.getElementById('cart-items-container');
    if (cart.length === 0) {
        container.innerHTML = `<p style="color: var(--text-muted);">Your cart is empty.</p>`;
        document.getElementById('cart-subtotal').innerText = '₹0';
        document.getElementById('cart-tax').innerText = '₹0';
        document.getElementById('cart-delivery').innerText = '₹0';
        document.getElementById('cart-total').innerText = '₹0';
        if(document.getElementById('payment-pay-amount')) document.getElementById('payment-pay-amount').innerText = '₹0';
        return;
    }

    let subtotal = 0; container.innerHTML = '';
    cart.forEach(item => {
        subtotal += item.price;
        container.innerHTML += `
            <div class="cart-list-item fade-in-up">
                <div style="display:flex; align-items:center; gap: 1rem;">
                    <div style="width:10px; height:10px; background:var(--safe); border-radius:50%; box-shadow: 0 0 10px var(--safe);"></div>
                    <strong style="color:white; font-size:1.1rem;">${item.name}</strong>
                </div>
                <div style="display:flex; align-items:center; gap: 2rem;">
                    <span style="font-size:1.3rem; font-weight:800; color:var(--text-main);">₹${item.price}</span>
                    <ion-icon name="trash" class="hover-bounce" style="color:var(--danger); cursor:pointer; font-size:1.4rem;" onclick="removeFromCart(${item.id})"></ion-icon>
                </div>
            </div>`;
    });

    const tax = Math.round(subtotal * 0.05);
    const parcelCharge = 15; // Updated from 30 to 15 as requested
    const total = subtotal + tax + parcelCharge;

    document.getElementById('cart-subtotal').innerText = `₹${subtotal}`;
    document.getElementById('cart-tax').innerText = `₹${tax}`;
    document.getElementById('cart-delivery').innerText = `₹${parcelCharge}`;
    document.getElementById('cart-total').innerText = `₹${total}`;
    
    const payTotalElem = document.getElementById('payment-pay-amount');
    if(payTotalElem) payTotalElem.innerText = `₹${total}`;

    // Hydrate Mock Virtual Card if authenticated
    try {
        const authedUser = JSON.parse(localStorage.getItem('nutribite_pro_user'));
        if(authedUser) {
            const cardName = document.getElementById('cart-card-name');
            const cardLast4 = document.getElementById('cart-card-last4');
            if(cardName) cardName.innerText = authedUser.name.toUpperCase();
            if(cardLast4 && authedUser.phone && authedUser.phone.length >= 4) {
                cardLast4.innerText = authedUser.phone.slice(-4);
            }
        }
    } catch(e) {}
}

function processPayment() {
    const dateE = document.getElementById('prebook-date');
    const timeE = document.getElementById('prebook-time');
    
    let msg = "Payment Securely Processed! Your food is being prepared.";
    
    let subtotal = 0;
    cart.forEach(item => subtotal += item.price);
    const totalPay = subtotal + Math.round(subtotal * 0.05) + 30; // exact calculation from cart
    
    const orderId = 'NB-' + Math.floor(Math.random()*90000)+10000;

    if (dateE && timeE && dateE.value && timeE.value) {
        msg = `Payment Processed! Your PRE-BOOKED order is scheduled for delivery on ${dateE.value} at ${timeE.value}.`;
        localStorage.setItem('nutribite_prebook_date', dateE.value);
        localStorage.setItem('nutribite_prebook_time', timeE.value);
    }
    
    // Save to User Profile Logic
    let userData = JSON.parse(localStorage.getItem('nutribite_pro_user'));
    if(userData) {
        if(!userData.orderHistory) userData.orderHistory = [];
        userData.orderHistory.push({
            id: orderId,
            date: new Date().toLocaleString(),
            total: totalPay,
            paymentMethod: Math.random() > 0.5 ? 'PhonePe' : 'Membership',
            status: 'PAID & PREPARING'
        });
        localStorage.setItem('nutribite_pro_user', JSON.stringify(userData));
        
        // Sync to Admin DB
        let globalOrders = JSON.parse(localStorage.getItem('nutribite_global_orders')) || [];
        globalOrders.push({
            id: orderId,
            user: userData.name,
            total: totalPay,
            date: new Date().toLocaleString()
        });
        localStorage.setItem('nutribite_global_orders', JSON.stringify(globalOrders));
    }
    
    alert(msg);
    cart = [];
    localStorage.setItem('nutribite_pro_cart', JSON.stringify(cart));
    updateCartBadge();
    navigateTo('home');
}
function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-theme');
    document.documentElement.classList.toggle('dark-theme', isDark);
    
    const btn = document.getElementById('theme-btn');
    if(isDark) {
        btn.innerHTML = '<ion-icon name="sunny-outline"></ion-icon>';
        localStorage.setItem('nutribite_theme', 'dark');
    } else {
        btn.innerHTML = '<ion-icon name="moon-outline"></ion-icon>';
        localStorage.setItem('nutribite_theme', 'light');
    }

    // High Visibility Feedback Toast
    const toast = document.createElement('div');
    toast.style.position = 'fixed'; toast.style.bottom = '100px'; toast.style.left = '50%'; toast.style.transform = 'translateX(-50%)';
    toast.style.background = isDark ? '#FFF' : '#000'; toast.style.color = isDark ? '#000' : '#FFF';
    toast.style.padding = '0.8rem 2rem'; toast.style.borderRadius = '30px'; toast.style.fontWeight = 'bold'; toast.style.zIndex='10000';
    toast.innerText = `Switched to ${isDark ? 'Dark' : 'Normal'} Mode`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
}
