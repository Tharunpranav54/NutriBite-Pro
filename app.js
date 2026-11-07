// NutriBite Pro - Supreme Unified Logic Engine

const INVENTORY = [
    // --- MEALS ---
    { id: 1, type: 'Meals', name: 'Margarita Pizza', price: 150, img: '3d_pizza.png', cals: 600, tag: 'Veg' },
    { id: 2, type: 'Meals', name: 'Chicken Biryani', price: 220, img: '3d_biryani.png', cals: 750, tag: 'Non-Veg' },
    { id: 3, type: 'Meals', name: 'Alfredo Pasta', price: 180, img: '3d_noodles.png', cals: 450, tag: 'Veg' },
    { id: 4, type: 'Meals', name: 'Classic Beef Burger', price: 195, img: '3d_burger.png', cals: 800, tag: 'Non-Veg' },
    { id: 5, type: 'Meals', name: 'Organic Keto Bowl', price: 240, img: '3d_salad.png', cals: 150, tag: 'Supra-Vegan' },
    { id: 6, type: 'Meals', name: 'Pepperoni Pizza', price: 210, img: '3d_pizza.png', cals: 650, tag: 'Non-Veg' },
    { id: 7, type: 'Meals', name: 'Mutton Specials', price: 280, img: '3d_biryani.png', cals: 820, tag: 'Non-Veg' },
    { id: 8, type: 'Meals', name: 'Ultimate Vegan Burger', price: 170, img: '3d_burger.png', cals: 250, tag: 'Vegan' },
    { id: 9, type: 'Meals', name: 'Spicy Hakka Noodle', price: 150, img: '3d_noodles.png', cals: 420, tag: 'Veg' },
    
    // --- SNACKS ---
    { id: 10, type: 'Snacks', name: 'Club Sandwich', price: 110, img: '3d_sandwich.png', cals: 300, tag: 'Non-Veg' },
    { id: 11, type: 'Snacks', name: 'Potato Fries', price: 60, img: '3d_fries.png', cals: 350, tag: 'Veg' },
    { id: 12, type: 'Snacks', name: 'Choco Lava', price: 85, img: '3d_dessert.png', cals: 420, tag: 'Sweet' },
    { id: 13, type: 'Snacks', name: 'Grilled Sandwich', price: 90, img: '3d_sandwich.png', cals: 280, tag: 'Veg' },
    { id: 14, type: 'Snacks', name: 'Loaded Nachos', price: 115, img: '3d_fries.png', cals: 450, tag: 'Veg' },
    { id: 15, type: 'Snacks', name: 'Organic Fruit Bowl', price: 130, img: '3d_dessert.png', cals: 90, tag: 'Vegan' },

    // --- JUICE ---
    { id: 16, type: 'Juice', name: 'Fresh Orange', price: 70, img: '3d_drink.png', cals: 90, tag: 'Vegan' },
    { id: 17, type: 'Juice', name: 'Cold Frappe', price: 110, img: '3d_drink.png', cals: 180, tag: 'Beverage' },
    { id: 18, type: 'Juice', name: 'Mango Blast', price: 95, img: '3d_drink.png', cals: 120, tag: 'Fresh' },
    { id: 19, type: 'Juice', name: 'Watermelon Detox', price: 60, img: '3d_drink.png', cals: 50, tag: 'Vegan' },
    { id: 20, type: 'Juice', name: 'Chocolate Shake', price: 120, img: '3d_drink.png', cals: 300, tag: 'Beverage' },
    
    // --- NEW PURE HEALTH ADDITIONS ---
    { id: 21, type: 'Meals', name: 'Quinoa Super-Bowl', price: 290, img: '3d_salad.png', cals: 210, tag: 'Supra-Vegan' },
    { id: 22, type: 'Snacks', name: 'Avocado Toast', price: 180, img: '3d_sandwich.png', cals: 180, tag: 'Supra-Vegan' },
    { id: 23, type: 'Juice', name: 'Green Kale Detox', price: 100, img: '3d_drink.png', cals: 40, tag: 'Supra-Vegan' }
];

const appHub = {
    state: { theme: 'dark', authMode: 'login', user: null, cart: [], userMap: null, adminMap: null },

    init() {
        this.initMockDB();
        this.state.theme = localStorage.getItem('nutribite_theme') || 'dark';
        this.applyTheme(this.state.theme);

        const sessionUser = localStorage.getItem('nb_pro_session');
        if (sessionUser) {
            this.state.user = JSON.parse(sessionUser);
            this.updateAuthUI(true);
            this.navigate('menu');
        } else {
            this.updateAuthUI(false);
            this.navigate('home');
        }

        const savedCart = localStorage.getItem('nb_cart');
        if (savedCart) this.state.cart = JSON.parse(savedCart);
        this.renderCartSync();
        this.filterMenu('All', null, 'menu-grid'); 
    },

    initMockDB() {
        let savedUsers = JSON.parse(localStorage.getItem('nb_db_users') || "[]");
        if(savedUsers.length < 5) {
            let mockUsers = []; let mockOrders = []; let mockPays = [];
            for(let i=1; i<=30; i++) {
                let m = i <= 10 ? 'GOLD' : (i <= 20 ? 'PREMIUM' : 'FREE');
                let userMail = `user${i}@demo.com`;
                mockUsers.push({ email: userMail, pass: '1234', name: `Demo User ${i}`, phone: `98000000${i.toString().padStart(2,'0')}`, addr: `Avenue ${i}`, age: 20 + (i%10), gen: i%2===0?'Male':'Female', memberId: `NB-${8000+i}`, role: 'Customer', memberType: m, vitals: { h:170, w:60+i, bmi: 22, status: 'NORMAL', deepMsg: 'All nominal' } });
                
                if(i <= 20) {
                    let ordId = `ORD-MOCK${i}`; let tnxId = `TXN-MOCK${i}`;
                    mockOrders.push({ id: ordId, date: new Date().toLocaleString(), prebook: 'ASAP', itemsCount: (i%3)+1, total: 200 + (i*10), user: userMail, status: i%2===0?'Delivered':'Preparing' });
                    mockPays.push({ id: tnxId, date: new Date().toLocaleString(), mode: 'GPay Gateway', ref: ordId, amt: 200 + (i*10), status: 'SUCCESS', user: userMail });
                }
            }
            localStorage.setItem('nb_db_users', JSON.stringify(mockUsers));
            localStorage.setItem('nb_db_orders', JSON.stringify(mockOrders));
            localStorage.setItem('nb_db_payments', JSON.stringify(mockPays));
        }
    },

    navigate(moduleId) {
        document.querySelectorAll('.module-view').forEach(m => m.classList.remove('active'));
        const target = document.getElementById(`module-${moduleId}`);
        if(target) { target.classList.add('active'); window.scrollTo({ top: 0, behavior: 'smooth' }); }
        
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        const navAnchor = document.getElementById(`nav-${moduleId}`);
        if(navAnchor) navAnchor.classList.add('active');

        if (moduleId === 'cart') this.renderCartSync();
        if (moduleId === 'profile') this.hydrateProfile();
        if (moduleId === 'admin-dash') this.hydrateAdminDash();
        if (moduleId === 'healthy-menu') this.renderHealthyMenu();
        
        if (moduleId === 'tracking') {
            if(typeof L !== 'undefined' && !this.state.userMap) {
                setTimeout(() => {
                    this.state.userMap = L.map('user-delivery-map').setView([10.7905, 78.7047], 15); 
                    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', { maxZoom: 19 }).addTo(this.state.userMap);
                    const agent = L.marker([10.7850, 78.7100]).addTo(this.state.userMap);
                    agent.bindPopup('<b style="color:var(--primary); font-size:1.1rem;">Sanjay R</b><br>Out for delivery.<br>ETA: 12 Mins').openPopup();
                    setInterval(() => { let latlng = agent.getLatLng(); agent.setLatLng([latlng.lat + 0.0001, latlng.lng - 0.0001]); }, 2000);
                }, 500);
            } else if (this.state.userMap) { setTimeout(() => this.state.userMap.invalidateSize(), 500); }
        }
    },

    toggleTheme() {
        this.state.theme = this.state.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('nutribite_theme', this.state.theme);
        this.applyTheme(this.state.theme);
    },
    
    applyTheme(theme) {
        if(theme === 'dark') {
            document.body.classList.add('dark-theme');
            document.getElementById('theme-btn').innerHTML = '<ion-icon name="sunny-outline"></ion-icon>';
        } else {
            document.body.classList.remove('dark-theme');
            document.getElementById('theme-btn').innerHTML = '<ion-icon name="moon-outline"></ion-icon>';
        }
    },

    togglePassword(inId, icId) {
        let input = document.getElementById(inId);
        let icon = document.getElementById(icId);
        if(input.type === 'password') { input.type = 'text'; icon.name = 'eye-off'; } 
        else { input.type = 'password'; icon.name = 'eye'; }
    },

    handleAIPress(e) { if(e.key === 'Enter') this.sendAIMessage(); },

    sendAIMessage() {
        const input = document.getElementById('ai-chat-input');
        const text = input.value.trim();
        if(!text) return;
        
        const chatBody = document.getElementById('ai-chat-body');
        chatBody.innerHTML += `<div class="ai-msg-bot" style="background:var(--primary); color:white; align-self:flex-end; border-radius: 12px 12px 0 12px;">${text}</div>`;
        input.value = '';
        chatBody.scrollTop = chatBody.scrollHeight;

        setTimeout(() => {
            let reply = "I'm currently running on a localized mock engine. Please check the master menu for items!";
            let ltext = text.toLowerCase();
            if(ltext.includes("hi") || ltext.includes("hello")) reply = "Hello Human! I'm active and ready to assist your diet protocols.";
            else if (ltext.includes("bmi") || ltext.includes("health") || ltext.includes("sugar")) reply = "I can analyze your BMI and suggest foods. Head over to the Deep Scanner module!";
            else if (ltext.includes("order") || ltext.includes("track")) reply = "I have located your GPS telemetry. Your current order is expected momentarily.";
            else if (ltext.includes("food") || ltext.includes("hungry") || ltext.includes("suggest")) reply = "I suggest the Organic Keto Bowl. It's optimal for your current telemetry.";
            else if (ltext.includes("thanks") || ltext.includes("good")) reply = "You're welcome! My algorithms are always at your service.";
            
            chatBody.innerHTML += `<div class="ai-msg-bot">${reply}</div>`;
            chatBody.scrollTop = chatBody.scrollHeight;
        }, 800);
    },

    switchAuthMode(mode) {
        this.state.authMode = mode;
        const e1 = document.getElementById('auth-step-1');
        const e2 = document.getElementById('auth-step-2');
        const pL = document.getElementById('pill-login');
        const pR = document.getElementById('pill-register');
        pL.classList.remove('active'); pR.classList.remove('active');

        if(mode === 'login') {
            pL.classList.add('active'); e1.style.display = 'block'; e2.style.display = 'none';
            document.getElementById('auth-submit-btn').innerText = 'Login Securely';
            document.getElementById('forgot-pass-link').style.display = 'block';
        } else {
            pR.classList.add('active'); e1.style.display = 'none'; e2.style.display = 'block';
            document.getElementById('forgot-pass-link').style.display = 'none';
        }
    },

    submitAuth() {
        if(this.state.authMode === 'register') {
            this.submitRegistration();
            return;
        }

        const email = document.getElementById('auth-email').value;
        const pass = document.getElementById('auth-pass').value;

        if(!email || !pass) { alert("Please compile credentials."); return; }

        let dbUsers = JSON.parse(localStorage.getItem('nb_db_users')) || [];
        const user = dbUsers.find(u => u.email === email && u.pass === pass);
        if(user) {
            this.state.user = user;
            localStorage.setItem('nb_pro_session', JSON.stringify(user));
            this.updateAuthUI(true);
            this.navigate('menu');
        } else { 
            if(dbUsers.length === 0 || email === 'admin@demo.com') {
                // Auto mock bypass for testing
                let mockUser = {
                    email: email, pass: pass, name: "Tharun Test", phone: "9876543210", addr: "Test Location", age: 20, gen: "Male",
                    memberId: 'NB-' + Math.floor(Math.random()*9000+1000), role: 'Customer', memberType: 'PREMIUM',
                    vitals: { h:175, w:70, bmi: 22.8, status: 'NORMAL', deepMsg: 'Vitals nominal.', sug:100, bp:120 }
                };
                dbUsers.push(mockUser);
                localStorage.setItem('nb_db_users', JSON.stringify(dbUsers));
                this.state.user = mockUser;
                localStorage.setItem('nb_pro_session', JSON.stringify(mockUser));
                this.updateAuthUI(true);
                this.navigate('menu');
            } else {
                alert("Account not found. Please click Create Profile pill above."); 
            }
        }
    },

    submitRegistration() {
        const email = document.getElementById('auth-email').value; // Get from first step
        const pass = document.getElementById('auth-pass').value;   // Get from first step

        const name = document.getElementById('auth-name').value;
        const phone = document.getElementById('auth-phone').value;
        const addr = document.getElementById('auth-address').value;
        const age = document.getElementById('auth-age').value;
        const gen = document.getElementById('auth-gender').value;

        if(!name || !phone || !age) { alert("Please compile all form fields."); return; }
        if(!email || !pass) { alert("Please fill Email & Password in Step 1 first."); this.switchAuthMode('login'); return; }

        const newUser = { 
            email, pass, name, phone, addr, age, gen, 
            memberId: 'NB-' + Math.floor(Math.random()*9000+1000),
            role: 'Customer', memberType: 'FREE', 
            vitals: { h:0, w:0, bmi: 0, status: 'UNKNOWN', deepMsg: 'N/A' }
        };

        let dbUsers = JSON.parse(localStorage.getItem('nb_db_users'));
        dbUsers.push(newUser);
        localStorage.setItem('nb_db_users', JSON.stringify(dbUsers));

        this.state.user = newUser;
        localStorage.setItem('nb_pro_session', JSON.stringify(newUser));
        this.updateAuthUI(true);
        this.navigate('profile');
    },

    logout() {
        if(confirm("Sign out?")) {
            localStorage.removeItem('nb_pro_session');
            this.state.user = null;
            this.updateAuthUI(false);
            this.navigate('home');
        }
    },

    updateAuthUI(isLoggedIn) {
        if(isLoggedIn) {
            document.querySelectorAll('.auth-req').forEach(el => el.style.display = 'flex');
            document.getElementById('nav-login-btn').style.display = 'none';
        } else {
            document.querySelectorAll('.auth-req').forEach(el => el.style.display = 'none');
            document.getElementById('nav-login-btn').style.display = 'block';
        }
    },

    // EXTENDED BMI LOGIC (SUGAR + BP)
    calculateBMI() {
        if(!this.state.user) { alert("Login required for saving vitals."); this.navigate('login'); return; }
        
        const hC = parseFloat(document.getElementById('bmi-h').value);
        const w = parseFloat(document.getElementById('bmi-w').value);
        const sug = parseFloat(document.getElementById('bmi-sugar').value);
        const bp = parseFloat(document.getElementById('bmi-bp').value);
        if(!hC || !w || !sug || !bp) return;
        
        const hM = hC / 100;
        const bmi = parseFloat((w / (hM * hM)).toFixed(1));
        
        let status = 'Normal'; let cssClass = 'normal'; let smartCat = 'All';
        if(bmi < 18.5) { status = "UNDERWEIGHT"; cssClass = "warn"; smartCat = "Meals"; }
        else if (bmi >= 25) { status = "OVERWEIGHT"; cssClass = "danger"; smartCat = "Juice"; }

        let extStatus = "Vitals Nominal.";
        if(sug > 140) extStatus = "ALERT: Hyperglycemic tendencies (Recommend Low-Sugar Vegan). ";
        else if (sug < 70) extStatus = "ALERT: Hypoglycemic tendencies (Recommend High Carb). ";

        if(bp > 130) extStatus += "ALERT: Elevated Systolic BP (Avoid high sodium / fried).";

        let rBox = document.getElementById('bmi-results-wrapper');
        rBox.style.display = 'block'; rBox.className = `bmi-result-box ${cssClass}`;
        document.getElementById('bmi-score').innerText = bmi + " BMI";
        document.getElementById('bmi-status').innerText = status;
        document.getElementById('ext-health-status').innerText = extStatus;

        this.state.user.vitals = { h: hC, w: w, bmi: bmi, status: status, deepMsg: extStatus, sug: sug, bp: bp };
        localStorage.setItem('nb_pro_session', JSON.stringify(this.state.user));
        
        let dbUsers = JSON.parse(localStorage.getItem('nb_db_users'));
        let ui = dbUsers.findIndex(u => u.email === this.state.user.email);
        if(ui > -1) { dbUsers[ui] = this.state.user; localStorage.setItem('nb_db_users', JSON.stringify(dbUsers)); }

        document.getElementById('smart-menu-container').style.display = 'block';
        let smartItems = INVENTORY;
        
        // Intelligent Diet Algorithm based on the advanced checks
        if(sug > 140 || bmi >= 25) {
            // Cut carbs, suggest light stuff
            smartItems = INVENTORY.filter(i => (i.tag === 'Vegan' || i.tag === 'Supra-Vegan' || i.type === 'Juice') && i.cals < 250); 
        } else if (bmi < 18.5) {
            // suggest heavy protein/carbs for underweight
            smartItems = INVENTORY.filter(i => i.type === 'Meals' && i.cals > 600);
        } else {
             // General healthy range
             smartItems = INVENTORY.filter(i => i.cals >= 200 && i.cals <= 500);
        }
        
        const g = document.getElementById('bmi-menu-grid'); g.innerHTML = '';
        smartItems.slice(0, 4).forEach(item => { g.innerHTML += this.createFoodCard(item); });
        setTimeout(()=> { document.getElementById('smart-menu-container').scrollIntoView({behavior:'smooth'})}, 500);
    },

    filterMenu(cat, btnElem = null, gridId) {
        if(btnElem) {
            btnElem.parentElement.querySelectorAll('.tab-link').forEach(t => t.classList.remove('active'));
            btnElem.classList.add('active');
        }
        const grid = document.getElementById(gridId);
        grid.innerHTML = '';
        let rendered = INVENTORY;
        if(cat !== 'All') rendered = INVENTORY.filter(i => i.type === cat);
        rendered.forEach(item => { grid.innerHTML += this.createFoodCard(item); });
    },

    searchMenu(query) {
        document.querySelectorAll('.tab-list .tab-link').forEach(t => t.classList.remove('active'));
        const grid = document.getElementById('menu-grid');
        grid.innerHTML = '';
        if(!query) { this.filterMenu('All', null, 'menu-grid'); return; }
        let rendered = INVENTORY.filter(i => i.name.toLowerCase().includes(query.toLowerCase()) || i.tag.toLowerCase().includes(query.toLowerCase()));
        if(rendered.length === 0) grid.innerHTML = '<p style="grid-column: 1/-1; text-align:center;">No AI matching results found.</p>';
        rendered.forEach(item => { grid.innerHTML += this.createFoodCard(item); });
    },

    startVoiceSearch() {
        const btn = document.getElementById('voice-search-btn');
        const input = document.getElementById('menu-search-input');
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if(!SpeechRecognition) { alert("Your browser doesn't support the Neural Voice API."); return; }
        
        const recognition = new SpeechRecognition();
        recognition.onstart = () => { btn.classList.add('listening'); input.placeholder = "Listening via AI..."; };
        recognition.onresult = (e) => {
            const transcript = e.results[0][0].transcript;
            input.value = transcript;
            this.searchMenu(transcript);
        };
        recognition.onerror = () => { alert("Voice signal lost."); };
        recognition.onend = () => { btn.classList.remove('listening'); input.placeholder = "Search foods or ask AI..."; };
        recognition.start();
    },

    renderHealthyMenu() {
        const grid = document.getElementById('healthy-menu-grid');
        grid.innerHTML = '';
        let healthy = INVENTORY.filter(i => i.tag === 'Vegan' || i.tag === 'Supra-Vegan' || (i.type === 'Juice' && i.cals < 100));
        healthy.forEach(item => { grid.innerHTML += this.createFoodCard(item); });
    },

    createFoodCard(item) {
        return `
            <div class="food-card glass-panel" style="background:var(--bg-surface);">
                <img src="${item.img}" onerror="this.src='https://via.placeholder.com/150'">
                <span class="food-tag">${item.tag}</span>
                <span class="food-tag" style="background:rgba(255,255,255,0.1); border:none; margin-left:0.5rem;"><ion-icon name="flame"></ion-icon> ${item.cals} Cal</span>
                <h3>${item.name}</h3><p>${item.desc || 'Premium Grade Setup'}</p>
                <div class="food-card-footer">
                    <span style="font-size:1.5rem; font-weight:800; color:var(--primary);">₹${item.price}</span>
                    <button class="add-cart-btn" onclick="appHub.addToCart(${item.id})"><ion-icon name="add"></ion-icon></button>
                </div>
                <button class="ar-btn" onclick="appHub.openARView('${item.img}')"><ion-icon name="scan"></ion-icon> Project AR View</button>
            </div>`;
    },

    openARView(imgSrc) {
        document.getElementById('ar-view').style.display = 'flex';
        document.getElementById('ar-food-model').src = imgSrc;
        
        // Boot camera
        const video = document.getElementById('ar-video-feed');
        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
            .then(stream => { video.srcObject = stream; this.state.arStream = stream; })
            .catch(err => { console.log('Camera blocked, mocking AR background.'); video.style.background = '#222'; });
        }
    },

    closeARView() {
        document.getElementById('ar-view').style.display = 'none';
        if(this.state.arStream) {
            this.state.arStream.getTracks().forEach(track => track.stop());
            this.state.arStream = null;
        }
    },

    addToCart(id) {
        if(!this.state.user) { alert("Please sign in first."); return this.navigate('login'); }
        const item = INVENTORY.find(i => i.id === id);
        this.state.cart.push(item);
        localStorage.setItem('nb_cart', JSON.stringify(this.state.cart));
        this.renderCartSync();
        alert(`Added ${item.name} to cart securely.`);
    },
    removeFromCart(index) {
        this.state.cart.splice(index, 1);
        localStorage.setItem('nb_cart', JSON.stringify(this.state.cart));
        this.renderCartSync();
    },

    renderCartSync() {
        document.getElementById('cart-count').innerText = this.state.cart.length;
        const cont = document.getElementById('cart-items-container');
        if(!cont) return;

        if(this.state.cart.length === 0) {
            cont.innerHTML = '<p class="text-secondary">Loadout is empty.</p>';
            document.getElementById('c-sub').innerText = '₹0';
            document.getElementById('c-tax').innerText = '₹0';
            document.getElementById('c-del').innerText = '₹17';
            document.getElementById('c-tot').innerText = '₹0';
            return;
        }

        let html = ''; let sub = 0;
        this.state.cart.forEach((item, idx) => {
            sub += item.price;
            html += `
                <div style="display:flex; justify-content:space-between; align-items:center; padding-bottom:1rem; margin-bottom:1rem; border-bottom:1px solid var(--border-color);">
                    <div style="display:flex; align-items:center; gap:1rem;"><img src="${item.img}" style="width:40px; height:40px; object-fit:cover;"> <span style="font-weight:700;">${item.name}</span></div>
                    <div style="display:flex; align-items:center; gap:1rem;"><span style="font-weight:800;">₹${item.price}</span> <ion-icon name="trash" style="color:var(--danger); cursor:pointer;" onclick="appHub.removeFromCart(${idx})"></ion-icon></div>
                </div>`;
        });
        cont.innerHTML = html;

        const tax = Math.round(sub * 0.05); const parcel = 17;
        document.getElementById('c-sub').innerText = `₹${sub}`;
        document.getElementById('c-tax').innerText = `₹${tax}`;
        document.getElementById('c-del').innerText = `₹${parcel}`;
        document.getElementById('c-tot').innerText = `₹${sub + tax + parcel}`;
    },

    checkout() {
        if(this.state.cart.length === 0) return alert("Cart is empty");
        
        let sum = this.state.cart.reduce((a, b) => a + b.price, 0); sum += Math.round(sum * 0.05) + 17;
        let paymentMethodInput = document.getElementById('checkout-payment-method');
        let mode = paymentMethodInput ? paymentMethodInput.value : 'GPay Gateway';

        if(mode.includes("GPay") || mode.includes("PhonePe")) {
            this.state.pendingPayment = sum;
            this.state.pendingMode = mode;
            this.openQRModal(mode);
        } else {
            this.finalizeCheckout(sum, mode);
            setTimeout(() => alert("Thanks for ordering! Internal Membership Deducted."), 300);
        }
    },

    openQRModal(mode) {
        document.getElementById('qr-checkout-view').style.display = 'flex';
        document.getElementById('qr-gateway-name').innerText = mode.split(' ')[0];
        document.getElementById('qr-timer-val').innerText = '60';
        let timeLeft = 60;
        
        this.qrInterval = setInterval(() => {
            timeLeft--;
            document.getElementById('qr-timer-val').innerText = timeLeft;
            if(timeLeft <= 0) {
                clearInterval(this.qrInterval);
                this.closeQRModal();
                alert("Payment timeout. Gateway aborted.");
            }
        }, 1000);
    },

    closeQRModal() {
        document.getElementById('qr-checkout-view').style.display = 'none';
        if(this.qrInterval) clearInterval(this.qrInterval);
    },

    confirmQRPayment() {
        clearInterval(this.qrInterval);
        document.getElementById('qr-checkout-view').style.display = 'none';
        this.finalizeCheckout(this.state.pendingPayment, this.state.pendingMode);
        setTimeout(() => {
            alert("Every step with you inspires us to go further – thanks for choosing us! Connecting to live telemetry...");
            this.navigate('profile'); 
            this.switchProfileTab('overview');
            setTimeout(() => {
                const mapEl = document.getElementById('user-delivery-map');
                if(mapEl) mapEl.scrollIntoView({behavior: 'smooth', block: 'center'});
            }, 600);
        }, 300);
    },

    finalizeCheckout(sum, mode) {
        let pd = document.getElementById('prebook-date').value; let pt = document.getElementById('prebook-time').value;
        let prebookInfo = (pd && pt) ? `PREBOOKED: ${pd} @ ${pt}` : 'ASAP';
        
        const orderId = 'ORD-' + Math.floor(Math.random()*90000); const tnxId = 'TXN-' + Math.floor(Math.random()*900000000);

        const order = { id: orderId, date: new Date().toLocaleString(), prebook: prebookInfo, itemsCount: this.state.cart.length, total: sum, user: this.state.user.email, status: 'Preparing' };
        const payment = { id: tnxId, date: new Date().toLocaleString(), mode: mode, ref: orderId, amt: sum, status: 'SUCCESS', user: this.state.user.email };
        
        let dbOrders = JSON.parse(localStorage.getItem('nb_db_orders') || "[]"); let dbPay = JSON.parse(localStorage.getItem('nb_db_payments') || "[]");
        dbOrders.push(order); dbPay.push(payment);
        localStorage.setItem('nb_db_orders', JSON.stringify(dbOrders)); localStorage.setItem('nb_db_payments', JSON.stringify(dbPay));

        this.state.cart = []; localStorage.setItem('nb_cart', JSON.stringify([]));
        
        // Only route to orders if it wasn't a QR payment (which handles its own route)
        if(mode !== this.state.pendingMode) {
            this.navigate('profile'); this.switchProfileTab('orders');
        }
    },

    switchProfileTab(tab, btn) {
        if(btn) {
            document.querySelectorAll('.tab-list-wrapper .tab-link').forEach(t => t.classList.remove('active'));
            btn.classList.add('active');
        }
        const panes = ['overview', 'orders', 'payments', 'college', 'health', 'security', 'notif'];
        panes.forEach(p => { const el = document.getElementById('prof-tab-'+p); if(el) el.style.display = 'none'; });
        const activePane = document.getElementById('prof-tab-'+tab);
        if(activePane) { activePane.style.display = 'block'; activePane.style.animation = 'none'; activePane.offsetHeight; activePane.style.animation = 'fadeIn 0.4s'; }

        if(tab === 'overview' && this.state.userMap) { setTimeout(()=> this.state.userMap.invalidateSize(), 200); }
    },

    upgradeMembership() {
        if(confirm("Deduct ₹999 to upgrade your Membership to GOLD?")) {
            this.state.user.memberType = "GOLD";
            localStorage.setItem('nb_pro_session', JSON.stringify(this.state.user));
            let dbUsers = JSON.parse(localStorage.getItem('nb_db_users'));
            let ui = dbUsers.findIndex(u => u.email === this.state.user.email);
            if(ui>-1) { dbUsers[ui] = this.state.user; localStorage.setItem('nb_db_users', JSON.stringify(dbUsers)); }
            alert("Upgrade Successful! Welcome to GOLD.");
            this.hydrateProfile();
        }
    },

    hydrateProfile() {
        document.getElementById('hub-name').innerText = this.state.user.name || 'User';
        document.getElementById('hub-email').innerText = this.state.user.email || 'Email';
        document.getElementById('hub-phone').innerText = this.state.user.phone || 'Phone';
        
        let vitString = this.state.user.vitals && this.state.user.vitals.bmi ? `${this.state.user.vitals.bmi} BMI [${this.state.user.vitals.status}]` : 'Needs Sync';
        document.getElementById('hub-vitals').innerText = vitString;
        
        document.getElementById('card-name').innerText = this.state.user.name || 'USER';
        document.getElementById('card-pin').innerText = this.state.user.memberId ? this.state.user.memberId.split('-')[1] : '0000';
        document.getElementById('mem-type-txt').innerText = this.state.user.memberType || 'FREE';
        document.getElementById('membership-3d').className = `membership-card-container flip-card ${(this.state.user.memberType || 'FREE').toLowerCase()}`;

        let dbOrders = JSON.parse(localStorage.getItem('nb_db_orders') || "[]");
        let myOrders = dbOrders.filter(o => o.user === this.state.user.email);
        let dbPay = JSON.parse(localStorage.getItem('nb_db_payments') || "[]");
        let myPay = dbPay.filter(p => p.user === this.state.user.email);

        // Natively force-inject orders/payments if the current user has none, so UI shows rich history
        if(myOrders.length === 0) {
            for(let i=1; i<=3; i++) {
                let mId = 'ORD-PAST' + Math.floor(Math.random()*9000);
                myOrders.push({ id: mId, date: new Date(Date.now() - i*86400000).toLocaleString(), prebook: 'ASAP', itemsCount: 2, total: 350, user: this.state.user.email, status: 'Delivered' });
                dbOrders.push(myOrders[i-1]);
                myPay.push({ id: 'TXN-PAST'+Math.floor(Math.random()*9000), date: new Date(Date.now() - i*86400000).toLocaleString(), mode: 'GPay Gateway', ref: mId, amt: 350, status: 'SUCCESS', user: this.state.user.email });
                dbPay.push(myPay[i-1]);
            }
            localStorage.setItem('nb_db_orders', JSON.stringify(dbOrders));
            localStorage.setItem('nb_db_payments', JSON.stringify(dbPay));
        }

        const oTbody = document.getElementById('user-orders-list'); oTbody.innerHTML = '';
        myOrders.reverse().forEach(o => { oTbody.innerHTML += `<tr><td>${o.id}</td><td>${o.date}</td><td>${o.itemsCount} Items</td><td style="font-weight:800; color:var(--primary);">₹${o.total}</td><td><span class="status-badge status-${o.status.toLowerCase()}">${o.status}</span></td><td><button class="app-btn-secondary app-btn" style="padding:0.4rem; border-radius:8px; font-size:0.8rem; width:auto;" onclick="alert('Quick Re-order Added to Cart!')">Re-Order</button></td></tr>`; });

        const pTbody = document.getElementById('user-payments-list'); pTbody.innerHTML = '';
        myPay.reverse().forEach(p => { pTbody.innerHTML += `<tr><td>${p.id}</td><td>${p.mode}</td><td>₹${p.amt}</td><td><span class="status-badge status-active">${p.status}</span></td><td><button class="app-btn-secondary app-btn" style="padding:0.4rem; width:auto; border:1px solid var(--info); color:var(--info);" onclick="alert('DOWNLOADING:\\n\\nInvoice Ref: INV-${p.id}\\nBill to: ${this.state.user.name}\\nTotal Paid: ₹${p.amt}')">Invoice</button></td></tr>`; });

    },

    adminLogin() {
        const id = document.getElementById('admin-id').value; const pass = document.getElementById('admin-pass').value;
        if(id === 'admin' && pass === '1234') { this.navigate('admin-dash'); this.switchAdminTab('users'); } 
        else { alert("Invalid Enterprise credentials."); }
    },
    adminLogout() { this.navigate('home'); },

    switchAdminTab(tab) {
        document.querySelectorAll('.admin-panel').forEach(p => p.style.display = 'none');
        document.querySelectorAll('.admin-sidebar .admin-tab').forEach(t => t.classList.remove('active'));
        document.getElementById(`admin-panel-${tab}`).style.display = 'block';
        document.getElementById(`tab-btn-${tab}`).classList.add('active');
        if(tab === 'users') this.hydrateAdminDash();
    },

    hydrateAdminDash() {
        let dbUsers = JSON.parse(localStorage.getItem('nb_db_users'));
        let dbOrders = JSON.parse(localStorage.getItem('nb_db_orders'));
        let dbPay = JSON.parse(localStorage.getItem('nb_db_payments'));

        const usList = document.getElementById('admin-users-list'); usList.innerHTML = '';
        dbUsers.forEach(u => {
            let vitData = u.vitals && u.vitals.bmi ? `${u.vitals.bmi} (${u.vitals.status})` : 'No Sync';
            usList.innerHTML += `<tr><td><strong>${u.name}</strong><br><span style="font-size:0.75rem;">${u.role} - ${u.memberType}</span></td><td>${u.age} yrs / ${u.gen}<br><strong style="color:var(--secondary);">${vitData}</strong></td><td>${u.email}<br><small>${u.phone}</small></td><td><button class="app-btn db-btn" style="padding:0.4rem; background:var(--danger); width:auto;" onclick="alert('Suspend Triggered.')">Suspend</button></td></tr>`;
        });
        
        const ordList = document.getElementById('admin-orders-list'); ordList.innerHTML = '';
        dbOrders.reverse().forEach(o => { ordList.innerHTML += `<tr><td>${o.id}</td><td>${o.user}</td><td style="color:var(--primary); font-weight:800;">₹${o.total}</td><td><select onchange="alert('Status Changed!')" class="app-input" style="padding:0.4rem; font-size:0.85rem;"><option>Preparing</option><option>Delivered</option></select></td></tr>`; });
        
        const fdList = document.getElementById('admin-food-list'); fdList.innerHTML = '';
        INVENTORY.forEach(f => { fdList.innerHTML += `<tr><td><img src="${f.img}" style="width:30px; border-radius:50%;"> ${f.name}</td><td>${f.type}</td><td>${f.cals} CAL</td><td>₹${f.price}</td><td>Edit | Del</td></tr>`; });
        
        const fnList = document.getElementById('admin-finance-list'); fnList.innerHTML = '';
        dbPay.reverse().forEach(p => { fnList.innerHTML += `<tr><td>${p.id}</td><td>${p.mode}</td><td>${p.ref}</td><td style="font-weight:800; color:var(--secondary);">₹${p.amt}</td><td>${p.status}</td></tr>`; });
    }
};

document.addEventListener('DOMContentLoaded', () => { appHub.init(); });
