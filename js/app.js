// Project Jasmine Mobile App - Advanced JavaScript Functionality
// Author: AI Assistant
// Version: 1.0.0

class JasmineApp {
    constructor() {
        this.currentUser = null;
        this.currentScreen = 'welcome';
        this.screenHistory = ['welcome'];
        this.services = [];
        this.bookings = [];
        this.users = [];
        this.notifications = [];
        this.selectedDate = null;
        this.selectedTime = null;
        this.selectedService = null;
        this.currentCalendarMonth = new Date();
        this.searchHistory = [];
        
        this.init();
    }

    init() {
        this.updateTime();
        this.loadSampleData();
        this.setupEventListeners();
        this.setupFormValidation();
        this.setupCodeInputs();
        this.generateCalendar();
        this.loadServices();
        this.loadBookings();
        this.loadNotifications();
        this.setupCharts();
        
        // Update time every minute
        setInterval(() => this.updateTime(), 60000);
    }

    updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { 
            hour12: false, 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        document.getElementById('currentTime').textContent = timeString;
    }

    loadSampleData() {
        // Sample Services Data
        this.services = [
            {
                id: 1,
                title: 'Massage Therapy',
                category: 'health',
                price: '$75',
                rating: 4.8,
                reviews: 124,
                duration: '60 minutes',
                icon: 'fas fa-spa',
                description: 'Professional massage therapy services to help you relax and rejuvenate. Our certified therapists use various techniques including Swedish, deep tissue, and hot stone massage.',
                provider: 'Wellness Center',
                available: true
            },
            {
                id: 2,
                title: 'House Cleaning',
                category: 'home',
                price: '$120',
                rating: 4.9,
                reviews: 89,
                duration: '3 hours',
                icon: 'fas fa-broom',
                description: 'Professional home cleaning services. We offer regular maintenance cleaning, deep cleaning, and move-in/move-out cleaning with eco-friendly products.',
                provider: 'CleanPro Services',
                available: true
            },
            {
                id: 3,
                title: 'Personal Training',
                category: 'health',
                price: '$60/hr',
                rating: 4.7,
                reviews: 156,
                duration: '60 minutes',
                icon: 'fas fa-running',
                description: 'One-on-one personal training sessions tailored to your fitness goals. Our trainers create customized workout plans and provide motivation.',
                provider: 'FitLife Gym',
                available: true
            },
            {
                id: 4,
                title: 'Hair Styling',
                category: 'beauty',
                price: '$85',
                rating: 4.6,
                reviews: 203,
                duration: '90 minutes',
                icon: 'fas fa-cut',
                description: 'Professional hair styling services including cuts, colors, and treatments. Our stylists stay current with the latest trends.',
                provider: 'Glamour Salon',
                available: true
            },
            {
                id: 5,
                title: 'Car Detailing',
                category: 'automotive',
                price: '$150',
                rating: 4.5,
                reviews: 78,
                duration: '2 hours',
                icon: 'fas fa-car',
                description: 'Complete car detailing services including interior and exterior cleaning, waxing, and protection treatments.',
                provider: 'AutoShine Pro',
                available: false
            },
            {
                id: 6,
                title: 'Plumbing Repair',
                category: 'home',
                price: '$90/hr',
                rating: 4.4,
                reviews: 112,
                duration: 'Variable',
                icon: 'fas fa-wrench',
                description: 'Licensed plumbers available for repairs, installations, and maintenance. Emergency services also available 24/7.',
                provider: 'QuickFix Plumbing',
                available: true
            }
        ];

        // Sample Bookings Data
        this.bookings = [
            {
                id: 1,
                serviceTitle: 'Massage Therapy',
                date: '2024-03-20',
                time: '2:00 PM',
                status: 'confirmed',
                provider: 'Wellness Center',
                price: '$75',
                notes: 'Deep tissue massage requested'
            },
            {
                id: 2,
                serviceTitle: 'House Cleaning',
                date: '2024-03-25',
                time: '10:00 AM',
                status: 'pending',
                provider: 'CleanPro Services',
                price: '$120',
                notes: 'Include kitchen deep clean'
            },
            {
                id: 3,
                serviceTitle: 'Personal Training',
                date: '2024-03-22',
                time: '6:00 PM',
                status: 'confirmed',
                provider: 'FitLife Gym',
                price: '$60',
                notes: 'Focus on cardio workout'
            }
        ];

        // Sample Users Data (for admin)
        this.users = [
            {
                id: 1,
                name: 'Jasmine Smith',
                email: 'jasmine@example.com',
                status: 'active',
                joinDate: '2024-01-15',
                totalBookings: 12,
                totalSpent: 920
            },
            {
                id: 2,
                name: 'Michael Johnson',
                email: 'michael@example.com',
                status: 'active',
                joinDate: '2024-02-20',
                totalBookings: 8,
                totalSpent: 650
            },
            {
                id: 3,
                name: 'Sarah Davis',
                email: 'sarah@example.com',
                status: 'inactive',
                joinDate: '2024-01-08',
                totalBookings: 3,
                totalSpent: 225
            },
            {
                id: 4,
                name: 'David Wilson',
                email: 'david@example.com',
                status: 'active',
                joinDate: '2024-03-01',
                totalBookings: 15,
                totalSpent: 1200
            },
            {
                id: 5,
                name: 'Emma Brown',
                email: 'emma@example.com',
                status: 'active',
                joinDate: '2024-02-10',
                totalBookings: 6,
                totalSpent: 480
            }
        ];

        // Sample Notifications Data
        this.notifications = [
            {
                id: 1,
                title: 'Booking Confirmed',
                message: 'Your massage therapy appointment has been confirmed for March 20th at 2:00 PM',
                time: '2 hours ago',
                type: 'success',
                read: false,
                icon: 'fas fa-check-circle'
            },
            {
                id: 2,
                title: 'New Promotion',
                message: '20% off on all beauty services this week. Book now and save!',
                time: '1 day ago',
                type: 'info',
                read: false,
                icon: 'fas fa-tag'
            },
            {
                id: 3,
                title: 'Payment Processed',
                message: 'Payment of $75 for massage therapy has been processed successfully',
                time: '3 days ago',
                type: 'success',
                read: true,
                icon: 'fas fa-credit-card'
            },
            {
                id: 4,
                title: 'Reminder',
                message: 'Don\'t forget your personal training session tomorrow at 6:00 PM',
                time: '5 hours ago',
                type: 'warning',
                read: false,
                icon: 'fas fa-clock'
            }
        ];

        // Sample search history
        this.searchHistory = [
            'Massage therapy',
            'House cleaning',
            'Hair styling',
            'Personal trainer'
        ];

        // Set current user for demo
        this.currentUser = {
            name: 'Jasmine Smith',
            email: 'jasmine@example.com',
            phone: '+1 (555) 123-4567',
            avatar: 'JS',
            role: 'Premium Member',
            verified: true
        };
    }

    setupEventListeners() {
        // Form submissions
        document.getElementById('registerForm').addEventListener('submit', (e) => this.handleRegister(e));
        document.getElementById('loginForm').addEventListener('submit', (e) => this.handleLogin(e));
        document.getElementById('forgotPasswordForm').addEventListener('submit', (e) => this.handleForgotPassword(e));

        // Category chips
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('category-chip')) {
                this.filterServices(e.target.dataset.category);
            }
        });

        // Service cards
        document.addEventListener('click', (e) => {
            if (e.target.closest('.service-card')) {
                const serviceId = e.target.closest('.service-card').dataset.serviceId;
                this.showServiceDetail(serviceId);
            }
        });

        // Booking cards
        document.addEventListener('click', (e) => {
            if (e.target.closest('.booking-card')) {
                const bookingId = e.target.closest('.booking-card').dataset.bookingId;
                this.showBookingDetail(bookingId);
            }
        });

        // Calendar days
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('calendar-day') && !e.target.classList.contains('disabled')) {
                this.selectDate(e.target);
            }
        });

        // Time slots
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('time-slot') && !e.target.classList.contains('unavailable')) {
                this.selectTimeSlot(e.target);
            }
        });

        // Search inputs
        document.getElementById('searchServices').addEventListener('input', (e) => this.performSearch(e.target.value));
        document.getElementById('globalSearch').addEventListener('input', (e) => this.globalSearch(e.target.value));

        // Notification clicks
        document.addEventListener('click', (e) => {
            if (e.target.closest('.notification-item')) {
                const notificationId = e.target.closest('.notification-item').dataset.notificationId;
                this.markNotificationAsRead(notificationId);
            }
        });

        // User row actions
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-edit')) {
                const userId = e.target.closest('.user-row').dataset.userId;
                this.editUser(userId);
            }
            if (e.target.classList.contains('btn-delete')) {
                const userId = e.target.closest('.user-row').dataset.userId;
                this.deleteUser(userId);
            }
            if (e.target.classList.contains('btn-view')) {
                const userId = e.target.closest('.user-row').dataset.userId;
                this.viewUserDetails(userId);
            }
        });
    }

    setupFormValidation() {
        // Real-time validation for registration form
        const inputs = ['registerName', 'registerEmail', 'registerPhone', 'registerPassword', 'confirmPassword'];
        
        inputs.forEach(inputId => {
            const input = document.getElementById(inputId);
            if (input) {
                input.addEventListener('blur', () => this.validateField(inputId));
                input.addEventListener('input', () => this.clearFieldError(inputId));
            }
        });

        // Login form validation
        ['loginEmail', 'loginPassword'].forEach(inputId => {
            const input = document.getElementById(inputId);
            if (input) {
                input.addEventListener('blur', () => this.validateField(inputId));
                input.addEventListener('input', () => this.clearFieldError(inputId));
            }
        });
    }

    setupCodeInputs() {
        // Setup verification code inputs
        for (let i = 1; i <= 6; i++) {
            const input = document.getElementById(`code${i}`);
            if (input) {
                input.addEventListener('input', (e) => this.handleCodeInput(e, i));
                input.addEventListener('keydown', (e) => this.handleCodeKeydown(e, i));
            }
        }
    }

    validateField(fieldId) {
        const field = document.getElementById(fieldId);
        const value = field.value.trim();
        const errorElement = document.getElementById(fieldId.replace('register', '').replace('login', '').toLowerCase() + 'Error');
        
        let isValid = true;
        let errorMessage = '';

        switch(fieldId) {
            case 'registerName':
            case 'loginName':
                if (!value || value.length < 2) {
                    errorMessage = 'Please enter your full name';
                    isValid = false;
                }
                break;
            
            case 'registerEmail':
            case 'loginEmail':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value || !emailRegex.test(value)) {
                    errorMessage = 'Please enter a valid email address';
                    isValid = false;
                }
                break;
            
            case 'registerPhone':
                const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
                if (!value || !phoneRegex.test(value)) {
                    errorMessage = 'Please enter a valid phone number';
                    isValid = false;
                }
                break;
            
            case 'registerPassword':
            case 'loginPassword':
                if (!value || value.length < 8) {
                    errorMessage = 'Password must be at least 8 characters';
                    isValid = false;
                }
                break;
            
            case 'confirmPassword':
                const originalPassword = document.getElementById('registerPassword').value;
                if (!value || value !== originalPassword) {
                    errorMessage = 'Passwords do not match';
                    isValid = false;
                }
                break;
        }

        if (errorElement) {
            if (!isValid) {
                field.classList.add('error');
                errorElement.textContent = errorMessage;
                errorElement.style.display = 'block';
            } else {
                field.classList.remove('error');
                errorElement.style.display = 'none';
            }
        }

        return isValid;
    }

    clearFieldError(fieldId) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(fieldId.replace('register', '').replace('login', '').toLowerCase() + 'Error');
        
        if (field.classList.contains('error')) {
            field.classList.remove('error');
            if (errorElement) {
                errorElement.style.display = 'none';
            }
        }
    }

    handleCodeInput(e, position) {
        const input = e.target;
        const value = input.value;

        // Only allow numbers
        if (!/^\d$/.test(value)) {
            input.value = '';
            return;
        }

        // Move to next input
        if (value && position < 6) {
            const nextInput = document.getElementById(`code${position + 1}`);
            if (nextInput) {
                nextInput.focus();
            }
        }

        // Check if all codes are entered
        this.checkVerificationCode();
    }

    handleCodeKeydown(e, position) {
        // Handle backspace
        if (e.key === 'Backspace' && !e.target.value && position > 1) {
            const prevInput = document.getElementById(`code${position - 1}`);
            if (prevInput) {
                prevInput.focus();
                prevInput.value = '';
            }
        }
    }

    checkVerificationCode() {
        let code = '';
        for (let i = 1; i <= 6; i++) {
            const input = document.getElementById(`code${i}`);
            if (input && input.value) {
                code += input.value;
            }
        }

        if (code.length === 6) {
            // Enable verify button or auto-verify
            const verifyBtn = document.querySelector('#verification .btn');
            if (verifyBtn) {
                verifyBtn.disabled = false;
                verifyBtn.style.opacity = '1';
            }
        }
    }

    async handleRegister(e) {
        e.preventDefault();
        
        // Validate all fields
        const fields = ['registerName', 'registerEmail', 'registerPhone', 'registerPassword', 'confirmPassword'];
        let isFormValid = true;

        fields.forEach(fieldId => {
            if (!this.validateField(fieldId)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            this.showToast('Please correct the errors before submitting', 'error');
            return;
        }

        // Show loading state
        this.setButtonLoading('registerBtnText', 'registerLoading', true);

        try {
            // Simulate API call
            await this.delay(2000);
            
            // Store user data for verification
            this.pendingUser = {
                name: document.getElementById('registerName').value,
                email: document.getElementById('registerEmail').value,
                phone: document.getElementById('registerPhone').value
            };

            // Show verification screen
            this.showScreen('verification');
            this.showToast('Verification code sent to your email', 'success');
        } catch (error) {
            this.showToast('Registration failed. Please try again.', 'error');
        } finally {
            this.setButtonLoading('registerBtnText', 'registerLoading', false);
        }
    }

    async handleLogin(e) {
        e.preventDefault();

        const fields = ['loginEmail', 'loginPassword'];
        let isFormValid = true;

        fields.forEach(fieldId => {
            if (!this.validateField(fieldId)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            this.showToast('Please enter valid credentials', 'error');
            return;
        }

        this.setButtonLoading('loginBtnText', 'loginLoading', true);

        try {
            await this.delay(1500);
            
            // Simulate successful login
            this.currentUser = {
                name: 'Jasmine Smith',
                email: document.getElementById('loginEmail').value,
                phone: '+1 (555) 123-4567',
                avatar: 'JS',
                role: 'Premium Member',
                verified: true
            };

            this.showScreen('dashboard');
            this.updateUserInfo();
            this.showToast('Welcome back!', 'success');
        } catch (error) {
            this.showToast('Login failed. Please check your credentials.', 'error');
        } finally {
            this.setButtonLoading('loginBtnText', 'loginLoading', false);
        }
    }

    async handleForgotPassword(e) {
        e.preventDefault();

        const email = document.getElementById('forgotEmail').value;
        if (!this.validateField('forgotEmail')) {
            return;
        }

        this.setButtonLoading('forgotBtnText', 'forgotLoading', true);

        try {
            await this.delay(1500);
            
            const successElement = document.getElementById('forgotEmailSuccess');
            if (successElement) {
                successElement.style.display = 'block';
            }
            
            this.showToast('Password reset link sent to your email', 'success');
        } catch (error) {
            this.showToast('Failed to send reset link. Please try again.', 'error');
        } finally {
            this.setButtonLoading('forgotBtnText', 'forgotLoading', false);
        }
    }

    async verifyEmail() {
        let code = '';
        for (let i = 1; i <= 6; i++) {
            const input = document.getElementById(`code${i}`);
            if (input && input.value) {
                code += input.value;
            }
        }

        if (code.length !== 6) {
            this.showToast('Please enter the complete verification code', 'error');
            return;
        }

        this.setButtonLoading('verifyBtnText', 'verifyLoading', true);

        try {
            await this.delay(2000);
            
            // Simulate verification success
            if (this.pendingUser) {
                this.currentUser = {
                    ...this.pendingUser,
                    avatar: this.pendingUser.name.split(' ').map(n => n[0]).join(''),
                    role: 'Member',
                    verified: true
                };
            }

            this.showScreen('dashboard');
            this.updateUserInfo();
            this.showToast('Account verified successfully!', 'success');
        } catch (error) {
            this.showToast('Verification failed. Please try again.', 'error');
        } finally {
            this.setButtonLoading('verifyBtnText', 'verifyLoading', false);
        }
    }

    async resendCode() {
        try {
            await this.delay(1000);
            this.showToast('New verification code sent', 'success');
        } catch (error) {
            this.showToast('Failed to resend code', 'error');
        }
    }

    showScreen(screenId) {
        // Hide current screen
        const currentScreenEl = document.querySelector('.screen.active');
        if (currentScreenEl) {
            currentScreenEl.classList.remove('active');
        }

        // Show new screen
        const newScreenEl = document.getElementById(screenId);
        if (newScreenEl) {
            newScreenEl.classList.add('active');
            
            // Add slide animation class based on navigation direction
            if (this.screenHistory.length > 0 && this.screenHistory[this.screenHistory.length - 1] !== screenId) {
                newScreenEl.classList.add('slide-left');
                setTimeout(() => newScreenEl.classList.remove('slide-left'), 500);
            }
        }

        // Update navigation
        this.updateNavigation(screenId);
        
        // Update header
        this.updateHeader(screenId);
        
        // Update screen history
        if (this.currentScreen !== screenId) {
            this.screenHistory.push(screenId);
            this.currentScreen = screenId;
        }

        // Load screen-specific data
        this.loadScreenData(screenId);
    }

    updateNavigation(screenId) {
        // Update bottom navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });

        const activeNavItem = document.querySelector(`[data-screen="${screenId}"]`);
        if (activeNavItem) {
            activeNavItem.classList.add('active');
        }

        // Special handling for dashboard tabs
        if (screenId === 'dashboard') {
            const dashboardNav = document.querySelector('.nav-item[data-screen="dashboard"]');
            if (dashboardNav) {
                dashboardNav.classList.add('active');
            }
        }
    }

    updateHeader(screenId) {
        const backBtn = document.getElementById('backBtn');
        const headerTitle = document.getElementById('headerTitle');
        const headerSubtitle = document.getElementById('headerSubtitle');
        const notificationBtn = document.getElementById('notificationBtn');
        const searchBtn = document.getElementById('searchBtn');

        // Default state
        backBtn.style.display = 'none';
        notificationBtn.style.display = 'block';
        searchBtn.style.display = 'block';

        const screenConfigs = {
            welcome: {
                title: 'Project Jasmine',
                subtitle: 'Welcome to your app',
                showBack: false,
                showNotifications: false,
                showSearch: false
            },
            register: {
                title: 'Create Account',
                subtitle: 'Join our community',
                showBack: true,
                showNotifications: false,
                showSearch: false
            },
            verification: {
                title: 'Verify Email',
                subtitle: 'Check your inbox',
                showBack: true,
                showNotifications: false,
                showSearch: false
            },
            login: {
                title: 'Sign In',
                subtitle: 'Welcome back',
                showBack: true,
                showNotifications: false,
                showSearch: false
            },
            'forgot-password': {
                title: 'Reset Password',
                subtitle: 'Recover your account',
                showBack: true,
                showNotifications: false,
                showSearch: false
            },
            dashboard: {
                title: 'Project Jasmine',
                subtitle: this.currentUser ? `Welcome, ${this.currentUser.name.split(' ')[0]}` : 'Welcome',
                showBack: false,
                showNotifications: true,
                showSearch: true
            },
            'service-detail': {
                title: 'Service Details',
                subtitle: 'Book your appointment',
                showBack: true,
                showNotifications: true,
                showSearch: false
            },
            admin: {
                title: 'Admin Dashboard',
                subtitle: 'System Management',
                showBack: false,
                showNotifications: true,
                showSearch: false
            },
            'user-management': {
                title: 'User Management',
                subtitle: 'Manage user accounts',
                showBack: true,
                showNotifications: false,
                showSearch: false
            },
            analytics: {
                title: 'Analytics',
                subtitle: 'Performance insights',
                showBack: true,
                showNotifications: false,
                showSearch: false
            },
            notifications: {
                title: 'Notifications',
                subtitle: 'Stay updated',
                showBack: true,
                showNotifications: false,
                showSearch: false
            },
            search: {
                title: 'Search',
                subtitle: 'Find services',
                showBack: true,
                showNotifications: true,
                showSearch: false
            }
        };

        const config = screenConfigs[screenId] || screenConfigs.dashboard;
        
        headerTitle.textContent = config.title;
        headerSubtitle.textContent = config.subtitle;
        backBtn.style.display = config.showBack ? 'block' : 'none';
        notificationBtn.style.display = config.showNotifications ? 'block' : 'none';
        searchBtn.style.display = config.showSearch ? 'block' : 'none';
    }

    goBack() {
        if (this.screenHistory.length > 1) {
            this.screenHistory.pop(); // Remove current screen
            const previousScreen = this.screenHistory[this.screenHistory.length - 1];
            this.showScreen(previousScreen);
        } else {
            this.showScreen('welcome');
        }
    }

    switchTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');

        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        const targetTab = document.getElementById(`${tabName}-tab`);
        if (targetTab) {
            targetTab.classList.add('active');
        }

        // Load tab-specific data
        this.loadTabData(tabName);
    }

    loadTabData(tabName) {
        switch(tabName) {
            case 'services':
                this.loadServices();
                break;
            case 'bookings':
                this.loadBookings();
                break;
            case 'profile':
                this.updateUserProfile();
                break;
            case 'support':
                // Support data already loaded
                break;
        }
    }

    loadScreenData(screenId) {
        switch(screenId) {
            case 'dashboard':
                this.updateUserInfo();
                this.loadServices();
                this.loadBookings();
                break;
            case 'notifications':
                this.loadNotifications();
                break;
            case 'user-management':
                this.loadUsers();
                break;
            case 'analytics':
                this.setupCharts();
                break;
            case 'search':
                this.loadSearchHistory();
                this.loadPopularServices();
                break;
        }
    }

    updateUserInfo() {
        if (!this.currentUser) return;

        // Update user avatar and name in dashboard
        const userAvatar = document.getElementById('userAvatar');
        const userName = document.getElementById('userName');
        const userRole = document.getElementById('userRole');

        if (userAvatar) userAvatar.textContent = this.currentUser.avatar;
        if (userName) userName.textContent = this.currentUser.name;
        if (userRole) userRole.textContent = this.currentUser.role;

        // Update header subtitle
        const headerSubtitle = document.getElementById('headerSubtitle');
        if (headerSubtitle && this.currentScreen === 'dashboard') {
            headerSubtitle.textContent = `Welcome, ${this.currentUser.name.split(' ')[0]}`;
        }
    }

    updateUserProfile() {
        if (!this.currentUser) return;

        const profileFields = {
            profileName: this.currentUser.name,
            profileEmail: this.currentUser.email,
            profilePhone: this.currentUser.phone
        };

        Object.keys(profileFields).forEach(fieldId => {
            const element = document.getElementById(fieldId);
            if (element) {
                element.textContent = profileFields[fieldId];
            }
        });
    }

    loadServices() {
        const servicesGrid = document.getElementById('servicesGrid');
        if (!servicesGrid) return;

        servicesGrid.innerHTML = '';

        this.services.forEach(service => {
            const serviceCard = this.createServiceCard(service);
            servicesGrid.appendChild(serviceCard);
        });
    }

    createServiceCard(service) {
        const card = document.createElement('div');
        card.className = 'service-card';
        card.dataset.serviceId = service.id;
        
        card.innerHTML = `
            <div class="service-icon">
                <i class="${service.icon}"></i>
            </div>
            <h4 class="service-title">${service.title}</h4>
            <div class="service-price">${service.price}</div>
            <div class="service-rating">
                <span class="rating-stars">★★★★★</span>
                <span>${service.rating} (${service.reviews})</span>
            </div>
        `;

        return card;
    }

    filterServices(category) {
        // Update active category chip
        document.querySelectorAll('.category-chip').forEach(chip => {
            chip.classList.remove('active');
        });
        event.target.classList.add('active');

        // Filter services
        let filteredServices = this.services;
        if (category !== 'all') {
            filteredServices = this.services.filter(service => service.category === category);
        }

        // Update grid
        const servicesGrid = document.getElementById('servicesGrid');
        if (servicesGrid) {
            servicesGrid.innerHTML = '';
            filteredServices.forEach(service => {
                const serviceCard = this.createServiceCard(service);
                servicesGrid.appendChild(serviceCard);
            });
        }
    }

    showServiceDetail(serviceId) {
        const service = this.services.find(s => s.id == serviceId);
        if (!service) return;

        this.selectedService = service;

        // Update service detail screen
        document.getElementById('serviceDetailIcon').innerHTML = `<i class="${service.icon}"></i>`;
        document.getElementById('serviceDetailTitle').textContent = service.title;
        document.getElementById('serviceDetailCategory').textContent = service.category.charAt(0).toUpperCase() + service.category.slice(1);
        document.getElementById('serviceDetailDescription').textContent = service.description;
        document.getElementById('serviceDuration').textContent = service.duration;
        document.getElementById('serviceDetailPrice').textContent = service.price;

        // Generate available time slots
        this.generateTimeSlots();

        this.showScreen('service-detail');
    }

    loadBookings() {
        const bookingsList = document.getElementById('bookingsList');
        if (!bookingsList) return;

        bookingsList.innerHTML = '';

        this.bookings.forEach(booking => {
            const bookingCard = this.createBookingCard(booking);
            bookingsList.appendChild(bookingCard);
        });
    }

    createBookingCard(booking) {
        const card = document.createElement('div');
        card.className = 'booking-card';
        card.dataset.bookingId = booking.id;
        
        const statusClass = `status-${booking.status}`;
        
        card.innerHTML = `
            <div class="booking-header">
                <div>
                    <h4 class="booking-title">${booking.serviceTitle}</h4>
                    <p class="booking-date">${booking.date} at ${booking.time}</p>
                </div>
                <span class="booking-status ${statusClass}">${booking.status}</span>
            </div>
            <div class="booking-details">
                <span class="booking-provider">${booking.provider}</span>
                <span class="booking-price">${booking.price}</span>
            </div>
        `;

        return card;
    }

    showBookingDetail(bookingId) {
        const booking = this.bookings.find(b => b.id == bookingId);
        if (!booking) return;

        this.showModal('Booking Details', `
            <div class="profile-section">
                <h4>${booking.serviceTitle}</h4>
                <p><strong>Date:</strong> ${booking.date}</p>
                <p><strong>Time:</strong> ${booking.time}</p>
                <p><strong>Provider:</strong> ${booking.provider}</p>
                <p><strong>Status:</strong> ${booking.status}</p>
                <p><strong>Price:</strong> ${booking.price}</p>
                ${booking.notes ? `<p><strong>Notes:</strong> ${booking.notes}</p>` : ''}
            </div>
            <div class="btn-group">
                <button class="btn btn-secondary" onclick="app.rescheduleBooking(${bookingId})">Reschedule</button>
                <button class="btn btn-danger" onclick="app.cancelBooking(${bookingId})">Cancel</button>
            </div>
        `);
    }

    generateCalendar() {
        const calendarGrid = document.getElementById('calendarGrid');
        if (!calendarGrid) return;

        const month = this.currentCalendarMonth;
        const year = month.getFullYear();
        const monthIndex = month.getMonth();

        // Update month/year display
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                           'July', 'August', 'September', 'October', 'November', 'December'];
        const currentMonthEl = document.getElementById('currentMonth');
        if (currentMonthEl) {
            currentMonthEl.textContent = `${monthNames[monthIndex]} ${year}`;
        }

        calendarGrid.innerHTML = '';

        // Add day headers
        const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayHeaders.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'calendar-day-header';
            dayHeader.textContent = day;
            calendarGrid.appendChild(dayHeader);
        });

        // Get first day of month and number of days
        const firstDay = new Date(year, monthIndex, 1).getDay();
        const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
        const today = new Date();

        // Add empty cells for days before month starts
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day disabled';
            calendarGrid.appendChild(emptyDay);
        }

        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = day;
            
            const currentDate = new Date(year, monthIndex, day);
            
            // Mark today
            if (currentDate.toDateString() === today.toDateString()) {
                dayElement.classList.add('today');
            }
            
            // Disable past dates
            if (currentDate < today) {
                dayElement.classList.add('disabled');
            }

            dayElement.addEventListener('click', () => this.selectDate(dayElement, currentDate));
            calendarGrid.appendChild(dayElement);
        }
    }

    selectDate(element, date) {
        if (element.classList.contains('disabled')) return;

        // Remove previous selection
        document.querySelectorAll('.calendar-day.selected').forEach(day => {
            day.classList.remove('selected');
        });

        // Add selection to clicked day
        element.classList.add('selected');
        this.selectedDate = date;

        // Update time slots based on selected date
        this.generateTimeSlots();
    }

    generateTimeSlots() {
        const timeSlotsContainer = document.getElementById('timeSlots');
        if (!timeSlotsContainer) return;

        const timeSlots = [
            '9:00 AM', '10:00 AM', '11:00 AM',
            '1:00 PM', '2:00 PM', '3:00 PM',
            '4:00 PM', '5:00 PM', '6:00 PM'
        ];

        timeSlotsContainer.innerHTML = '';

        timeSlots.forEach(time => {
            const slot = document.createElement('div');
            slot.className = 'time-slot';
            slot.textContent = time;
            
            // Randomly make some slots unavailable for demo
            if (Math.random() > 0.7) {
                slot.classList.add('unavailable');
            }

            slot.addEventListener('click', () => this.selectTimeSlot(slot));
            timeSlotsContainer.appendChild(slot);
        });
    }

    selectTimeSlot(element) {
        if (element.classList.contains('unavailable')) return;

        // Remove previous selection
        document.querySelectorAll('.time-slot.selected').forEach(slot => {
            slot.classList.remove('selected');
        });

        // Add selection to clicked slot
        element.classList.add('selected');
        this.selectedTime = element.textContent;
    }

    previousMonth() {
        this.currentCalendarMonth.setMonth(this.currentCalendarMonth.getMonth() - 1);
        this.generateCalendar();
    }

    nextMonth() {
        this.currentCalendarMonth.setMonth(this.currentCalendarMonth.getMonth() + 1);
        this.generateCalendar();
    }

    async bookService() {
        if (!this.selectedDate || !this.selectedTime) {
            this.showToast('Please select a date and time', 'warning');
            return;
        }

        if (!this.selectedService) {
            this.showToast('No service selected', 'error');
            return;
        }

        const bookBtn = document.getElementById('bookServiceBtn');
        const originalText = bookBtn.innerHTML;
        bookBtn.innerHTML = '<div class="loading"></div> Booking...';
        bookBtn.disabled = true;

        try {
            await this.delay(2000);
            
            // Create new booking
            const newBooking = {
                id: this.bookings.length + 1,
                serviceTitle: this.selectedService.title,
                date: this.selectedDate.toLocaleDateString(),
                time: this.selectedTime,
                status: 'confirmed',
                provider: this.selectedService.provider,
                price: this.selectedService.price,
                notes: ''
            };

            this.bookings.unshift(newBooking);
            
            // Add notification
            const notification = {
                id: this.notifications.length + 1,
                title: 'Booking Confirmed',
                message: `Your ${this.selectedService.title} appointment has been booked for ${this.selectedDate.toLocaleDateString()} at ${this.selectedTime}`,
                time: 'Just now',
                type: 'success',
                read: false,
                icon: 'fas fa-check-circle'
            };
            this.notifications.unshift(notification);

            this.showToast('Booking confirmed successfully!', 'success');
            this.showScreen('dashboard');
            this.switchTab('bookings');
            this.updateNotificationBadge();
        } catch (error) {
            this.showToast('Booking failed. Please try again.', 'error');
        } finally {
            bookBtn.innerHTML = originalText;
            bookBtn.disabled = false;
        }
    }

    loadNotifications() {
        const notificationsList = document.getElementById('notificationsList');
        if (!notificationsList) return;

        notificationsList.innerHTML = '';

        if (this.notifications.length === 0) {
            notificationsList.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #6b7280;">
                    <i class="fas fa-bell" style="font-size: 48px; margin-bottom: 16px; opacity: 0.5;"></i>
                    <h3>No notifications</h3>
                    <p>You're all caught up!</p>
                </div>
            `;
            return;
        }

        this.notifications.forEach(notification => {
            const notificationCard = this.createNotificationCard(notification);
            notificationsList.appendChild(notificationCard);
        });
    }

    createNotificationCard(notification) {
        const card = document.createElement('div');
        card.className = `notification-item ${!notification.read ? 'unread' : ''}`;
        card.dataset.notificationId = notification.id;
        
        card.innerHTML = `
            <div class="notification-icon">
                <i class="${notification.icon}"></i>
            </div>
            <div class="notification-content">
                <h4 class="notification-title">${notification.title}</h4>
                <p class="notification-message">${notification.message}</p>
                <span class="notification-time">${notification.time}</span>
            </div>
        `;

        return card;
    }

    markNotificationAsRead(notificationId) {
        const notification = this.notifications.find(n => n.id == notificationId);
        if (notification) {
            notification.read = true;
            this.loadNotifications();
            this.updateNotificationBadge();
        }
    }

    updateNotificationBadge() {
        const unreadCount = this.notifications.filter(n => !n.read).length;
        const badge = document.getElementById('notificationBadge');
        if (badge) {
            if (unreadCount > 0) {
                badge.textContent = unreadCount > 9 ? '9+' : unreadCount;
                badge.style.display = 'flex';
            } else {
                badge.style.display = 'none';
            }
        }
    }

    performSearch(query) {
        if (!query || query.length < 2) return;

        const filteredServices = this.services.filter(service => 
            service.title.toLowerCase().includes(query.toLowerCase()) ||
            service.category.toLowerCase().includes(query.toLowerCase()) ||
            service.description.toLowerCase().includes(query.toLowerCase())
        );

        // Update services grid with search results
        const servicesGrid = document.getElementById('servicesGrid');
        if (servicesGrid) {
            servicesGrid.innerHTML = '';
            
            if (filteredServices.length === 0) {
                servicesGrid.innerHTML = `
                    <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #6b7280;">
                        <i class="fas fa-search" style="font-size: 48px; margin-bottom: 16px; opacity: 0.5;"></i>
                        <h3>No services found</h3>
                        <p>Try different keywords</p>
                    </div>
                `;
            } else {
                filteredServices.forEach(service => {
                    const serviceCard = this.createServiceCard(service);
                    servicesGrid.appendChild(serviceCard);
                });
            }
        }

        // Add to search history
        if (query.length > 2 && !this.searchHistory.includes(query)) {
            this.searchHistory.unshift(query);
            if (this.searchHistory.length > 10) {
                this.searchHistory = this.searchHistory.slice(0, 10);
            }
        }
    }

    globalSearch(query) {
        if (!query || query.length < 2) {
            this.loadPopularServices();
            return;
        }

        // Search across all services
        this.performSearch(query);
    }

    loadSearchHistory() {
        const searchHistoryContainer = document.getElementById('searchHistory');
        if (!searchHistoryContainer) return;

        searchHistoryContainer.innerHTML = '';

        if (this.searchHistory.length === 0) {
            searchHistoryContainer.innerHTML = '<p style="color: #6b7280;">No recent searches</p>';
            return;
        }

        this.searchHistory.forEach(query => {
            const historyItem = document.createElement('div');
            historyItem.className = 'admin-menu-item';
            historyItem.innerHTML = `
                <i class="fas fa-history"></i>
                <div class="menu-content">
                    <div class="menu-title">${query}</div>
                </div>
            `;
            historyItem.addEventListener('click', () => {
                document.getElementById('globalSearch').value = query;
                this.globalSearch(query);
            });
            searchHistoryContainer.appendChild(historyItem);
        });
    }

    loadPopularServices() {
        const popularServicesContainer = document.getElementById('popularServices');
        if (!popularServicesContainer) return;

        // Get top 4 services by rating
        const topServices = this.services
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 4);

        popularServicesContainer.innerHTML = '';
        topServices.forEach(service => {
            const serviceCard = this.createServiceCard(service);
            popularServicesContainer.appendChild(serviceCard);
        });
    }

    loadUsers() {
        const usersList = document.getElementById('usersList');
        if (!usersList) return;

        usersList.innerHTML = '';

        this.users.forEach(user => {
            const userRow = this.createUserRow(user);
            usersList.appendChild(userRow);
        });
    }

    createUserRow(user) {
        const row = document.createElement('div');
        row.className = 'user-row';
        row.dataset.userId = user.id;
        
        const statusClass = user.status === 'active' ? 'status-active' : 'status-inactive';
        
        row.innerHTML = `
            <div class="row-avatar">${user.name.split(' ').map(n => n[0]).join('')}</div>
            <div class="row-info">
                <div class="row-name">${user.name}</div>
                <div class="row-email">${user.email}</div>
            </div>
            <span class="row-status ${statusClass}">${user.status}</span>
            <div class="row-actions">
                <button class="action-btn btn-view" title="View Details">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="action-btn btn-edit" title="Edit User">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn btn-delete" title="Delete User">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;

        return row;
    }

    searchUsers() {
        const query = document.getElementById('userSearch').value.toLowerCase();
        const userRows = document.querySelectorAll('.user-row');

        userRows.forEach(row => {
            const name = row.querySelector('.row-name').textContent.toLowerCase();
            const email = row.querySelector('.row-email').textContent.toLowerCase();
            
            if (name.includes(query) || email.includes(query)) {
                row.style.display = 'flex';
            } else {
                row.style.display = 'none';
            }
        });
    }

    editUser(userId) {
        const user = this.users.find(u => u.id == userId);
        if (!user) return;

        this.showModal('Edit User', `
            <form id="editUserForm">
                <div class="form-group">
                    <label class="form-label">Full Name</label>
                    <input type="text" class="form-input" id="editUserName" value="${user.name}" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Email</label>
                    <input type="email" class="form-input" id="editUserEmail" value="${user.email}" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Status</label>
                    <select class="form-input" id="editUserStatus">
                        <option value="active" ${user.status === 'active' ? 'selected' : ''}>Active</option>
                        <option value="inactive" ${user.status === 'inactive' ? 'selected' : ''}>Inactive</option>
                    </select>
                </div>
                <div class="btn-group">
                    <button type="submit" class="btn">Save Changes</button>
                    <button type="button" class="btn btn-secondary" onclick="app.closeModal()">Cancel</button>
                </div>
            </form>
        `);

        document.getElementById('editUserForm').addEventListener('submit', (e) => {
            e.preventDefault();
            user.name = document.getElementById('editUserName').value;
            user.email = document.getElementById('editUserEmail').value;
            user.status = document.getElementById('editUserStatus').value;
            this.loadUsers();
            this.closeModal();
            this.showToast('User updated successfully', 'success');
        });
    }

    deleteUser(userId) {
        const user = this.users.find(u => u.id == userId);
        if (!user) return;

        if (confirm(`Are you sure you want to delete ${user.name}?`)) {
            this.users = this.users.filter(u => u.id != userId);
            this.loadUsers();
            this.showToast('User deleted successfully', 'success');
        }
    }

    viewUserDetails(userId) {
        const user = this.users.find(u => u.id == userId);
        if (!user) return;

        this.showModal('User Details', `
            <div class="profile-section">
                <div class="user-info">
                    <div class="user-avatar">${user.name.split(' ').map(n => n[0]).join('')}</div>
                    <div class="user-details">
                        <h3>${user.name}</h3>
                        <p>${user.email}</p>
                    </div>
                </div>
                <div style="margin-top: 20px;">
                    <div class="profile-field">
                        <span class="field-label">Status</span>
                        <span class="field-value">${user.status}</span>
                    </div>
                    <div class="profile-field">
                        <span class="field-label">Join Date</span>
                        <span class="field-value">${user.joinDate}</span>
                    </div>
                    <div class="profile-field">
                        <span class="field-label">Total Bookings</span>
                        <span class="field-value">${user.totalBookings}</span>
                    </div>
                    <div class="profile-field">
                        <span class="field-label">Total Spent</span>
                        <span class="field-value">$${user.totalSpent}</span>
                    </div>
                </div>
            </div>
        `);
    }

    setupCharts() {
        if (typeof Chart === 'undefined') return;

        // Revenue Chart
        this.setupRevenueChart();
        
        // User Growth Chart
        this.setupUserGrowthChart();
        
        // Service Popularity Chart
        this.setupServiceChart();
    }

    setupRevenueChart() {
        const ctx = document.getElementById('revenueChart');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Revenue ($)',
                    data: [12000, 19000, 15000, 25000, 22000, 30000],
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }

    setupUserGrowthChart() {
        const ctx = document.getElementById('userGrowthChart');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'New Users',
                    data: [45, 89, 67, 123, 98, 156],
                    backgroundColor: '#8b5cf6',
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    setupServiceChart() {
        const ctx = document.getElementById('serviceChart');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Health & Wellness', 'Home Services', 'Beauty', 'Automotive'],
                datasets: [{
                    data: [35, 28, 22, 15],
                    backgroundColor: [
                        '#6366f1',
                        '#8b5cf6',
                        '#06b6d4',
                        '#10b981'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    // Modal Functions
    showModal(title, content) {
        const modal = document.getElementById('modal');
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');

        modalTitle.textContent = title;
        modalBody.innerHTML = content;
        modal.classList.add('active');
    }

    closeModal() {
        const modal = document.getElementById('modal');
        modal.classList.remove('active');
    }

    // Utility Functions
    showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast show ${type}`;
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    setButtonLoading(textElementId, loadingElementId, isLoading) {
        const textElement = document.getElementById(textElementId);
        const loadingElement = document.getElementById(loadingElementId);
        
        if (textElement && loadingElement) {
            if (isLoading) {
                textElement.style.display = 'none';
                loadingElement.style.display = 'inline-block';
            } else {
                textElement.style.display = 'inline';
                loadingElement.style.display = 'none';
            }
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Profile Management Functions
    editProfile(field) {
        let currentValue = '';
        let label = '';
        let inputType = 'text';

        switch(field) {
            case 'name':
                currentValue = this.currentUser.name;
                label = 'Full Name';
                break;
            case 'email':
                currentValue = this.currentUser.email;
                label = 'Email Address';
                inputType = 'email';
                break;
            case 'phone':
                currentValue = this.currentUser.phone;
                label = 'Phone Number';
                inputType = 'tel';
                break;
        }

        this.showModal(`Edit ${label}`, `
            <form id="editProfileForm">
                <div class="form-group">
                    <label class="form-label">${label}</label>
                    <input type="${inputType}" class="form-input" id="editProfileValue" value="${currentValue}" required>
                </div>
                <div class="btn-group">
                    <button type="submit" class="btn">Save Changes</button>
                    <button type="button" class="btn btn-secondary" onclick="app.closeModal()">Cancel</button>
                </div>
            </form>
        `);

        document.getElementById('editProfileForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const newValue = document.getElementById('editProfileValue').value;
            this.currentUser[field] = newValue;
            this.updateUserProfile();
            this.updateUserInfo();
            this.closeModal();
            this.showToast(`${label} updated successfully`, 'success');
        });
    }

    editPayment() {
        this.showModal('Payment Methods', `
            <div class="profile-section">
                <h4>Current Payment Methods</h4>
                <div class="profile-field">
                    <span class="field-label">Primary Card</span>
                    <span class="field-value">•••• •••• •••• 1234</span>
                    <button class="edit-btn">Remove</button>
                </div>
                <div class="profile-field">
                    <span class="field-label">PayPal</span>
                    <span class="field-value">Connected</span>
                    <button class="edit-btn">Disconnect</button>
                </div>
            </div>
            <button class="btn" style="width: 100%; margin-top: 20px;">Add New Payment Method</button>
        `);
    }

    toggleNotifications() {
        this.showToast('Notification preferences updated', 'success');
    }

    changeLanguage() {
        this.showModal('Language Settings', `
            <div class="form-group">
                <label class="form-label">Select Language</label>
                <select class="form-input">
                    <option value="en" selected>English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                </select>
            </div>
            <div class="btn-group">
                <button class="btn">Save Changes</button>
                <button class="btn btn-secondary" onclick="app.closeModal()">Cancel</button>
            </div>
        `);
    }

    logout() {
        if (confirm('Are you sure you want to sign out?')) {
            this.currentUser = null;
            this.showScreen('welcome');
            this.showToast('Signed out successfully', 'success');
        }
    }

    // Support Functions
    contactSupport() {
        this.showModal('Contact Support', `
            <form id="supportForm">
                <div class="form-group">
                    <label class="form-label">Subject</label>
                    <input type="text" class="form-input" placeholder="What can we help you with?" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Message</label>
                    <textarea class="form-input" rows="5" placeholder="Describe your issue..." required></textarea>
                </div>
                <div class="btn-group">
                    <button type="submit" class="btn">Send Message</button>
                    <button type="button" class="btn btn-secondary" onclick="app.closeModal()">Cancel</button>
                </div>
            </form>
        `);

        document.getElementById('supportForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.closeModal();
            this.showToast('Support request submitted successfully', 'success');
        });
    }

    reportIssue() {
        this.showModal('Report Issue', `
            <form id="issueForm">
                <div class="form-group">
                    <label class="form-label">Issue Type</label>
                    <select class="form-input" required>
                        <option value="">Select issue type</option>
                        <option value="bug">Bug Report</option>
                        <option value="feature">Feature Request</option>
                        <option value="performance">Performance Issue</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Description</label>
                    <textarea class="form-input" rows="5" placeholder="Describe the issue..." required></textarea>
                </div>
                <div class="btn-group">
                    <button type="submit" class="btn">Submit Report</button>
                    <button type="button" class="btn btn-secondary" onclick="app.closeModal()">Cancel</button>
                </div>
            </form>
        `);

        document.getElementById('issueForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.closeModal();
            this.showToast('Issue report submitted successfully', 'success');
        });
    }

    // Booking Management
    rescheduleBooking(bookingId) {
        this.closeModal();
        this.showToast('Reschedule feature would open calendar', 'info');
    }

    cancelBooking(bookingId) {
        if (confirm('Are you sure you want to cancel this booking?')) {
            const booking = this.bookings.find(b => b.id == bookingId);
            if (booking) {
                booking.status = 'cancelled';
                this.loadBookings();
                this.closeModal();
                this.showToast('Booking cancelled successfully', 'success');
            }
        }
    }

    // Quick Actions
    quickBook() {
        this.showScreen('dashboard');
        this.switchTab('services');
        this.showToast('Select a service to book', 'info');
    }
}

// Global Functions (called from HTML onclick events)
function showScreen(screenId) {
    app.showScreen(screenId);
}

function goBack() {
    app.goBack();
}

function switchTab(tabName) {
    app.switchTab(tabName);
}

function verifyEmail() {
    app.verifyEmail();
}

function resendCode() {
    app.resendCode();
}

function performSearch() {
    const query = document.getElementById('searchServices').value;
    app.performSearch(query);
}

function globalSearch() {
    const query = document.getElementById('globalSearch').value;
    app.globalSearch(query);
}

function searchUsers() {
    app.searchUsers();
}

function bookService() {
    app.bookService();
}

function previousMonth() {
    app.previousMonth();
}

function nextMonth() {
    app.nextMonth();
}

function quickBook() {
    app.quickBook();
}

function closeModal() {
    app.closeModal();
}

function logout() {
    app.logout();
}

function contactSupport() {
    app.contactSupport();
}

function reportIssue() {
    app.reportIssue();
}

// Initialize the app when DOM is loaded
let app;
document.addEventListener('DOMContentLoaded', function() {
    app = new JasmineApp();
    
    // Close modal when clicking outside
    document.getElementById('modal').addEventListener('click', function(e) {
        if (e.target === this) {
            app.closeModal();
        }
    });

    // Close toast when clicked
    document.getElementById('toast').addEventListener('click', function() {
        this.classList.remove('show');
    });

    // Handle browser back button
    window.addEventListener('popstate', function(e) {
        app.goBack();
    });
});

// Export app instance for external access
if (typeof module !== 'undefined' && module.exports) {
    module.exports = JasmineApp;
}

// Handle service worker registration for PWA functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(error) {
                console.log('ServiceWorker registration failed');
            });
    });
}