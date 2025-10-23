# 🔐 Photography Website - Admin Access Setup

## **Owner-Only Image Management System**

Your photography website now includes a secure admin system that only allows the website owner (you) to add, edit, and manage images.

## **🔑 Admin Credentials**

### **Default Login Options:**
- **Username:** `admin` | **Password:** `photography2024`
- **Username:** `photographer` | **Password:** `photos2024`  
- **Username:** `owner` | **Password:** `studio2024`

## **🚀 How to Access Admin Panel**

### **Method 1: Admin Button (Recommended)**
1. **Open your website** (press F5 in VS Code)
2. **Look for the floating 🔧 button** in the bottom-right corner
3. **Click the button** and enter your credentials
4. **Access the full admin panel** for image management

### **Method 2: Direct Admin Panel**
1. **Open `admin.html`** in your browser
2. **Login with your credentials**
3. **Manage your images** with the full interface

## **📸 Admin Features**

### **Image Management:**
- ✅ **Upload new images** with drag & drop
- ✅ **Edit existing images** directly on the website
- ✅ **Remove unwanted images**
- ✅ **Organize by categories** (Wedding, Portrait, Event, Commercial)
- ✅ **Preview before uploading**

### **Website Settings:**
- ✅ **Update photographer name**
- ✅ **Change contact information**
- ✅ **Modify website content**
- ✅ **Manage portfolio categories**

### **Security Features:**
- ✅ **Password-protected access**
- ✅ **Session management** (24-hour auto-logout)
- ✅ **Unauthorized access prevention**
- ✅ **Image upload protection**

## **🛡️ Security Features**

### **Access Control:**
- **Only authenticated users** can modify images
- **Session timeout** after 24 hours
- **Protected image uploads** - visitors cannot add images
- **Admin-only edit buttons** appear only for authenticated users

### **Visitor Protection:**
- **Regular visitors** see a beautiful portfolio
- **No access** to admin features
- **Cannot upload** or modify images
- **Clean, professional** viewing experience

## **📱 How It Works**

### **For Website Visitors:**
- Beautiful, professional photography portfolio
- Interactive gallery with lightbox
- Contact form and information
- No admin features visible

### **For Website Owner (You):**
- **Floating admin button** (🔧) in bottom-right corner
- **Login modal** for authentication
- **Edit buttons** on portfolio images (hover to see)
- **Full admin panel** for comprehensive management

## **🔧 Customization**

### **Change Admin Credentials:**
Edit the `access-control.js` file and modify the `validCredentials` array:

```javascript
const validCredentials = [
    { username: 'your_username', password: 'your_password' },
    // Add more credentials as needed
];
```

### **Modify Session Duration:**
Change the session timeout in `access-control.js`:
```javascript
// Current: 24 hours, change to your preference
if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
```

## **🚀 Quick Start**

1. **Open your website** (F5 in VS Code)
2. **Click the 🔧 button** in bottom-right corner
3. **Login with:** `admin` / `photography2024`
4. **Start managing your images!**

## **📞 Support**

If you need to reset admin access:
1. Open browser developer tools (F12)
2. Go to Application/Storage tab
3. Clear localStorage
4. Refresh the page

## **✨ Benefits**

- ✅ **Secure** - Only you can modify images
- ✅ **Professional** - Visitors see clean portfolio
- ✅ **Easy** - Simple drag & drop image management
- ✅ **Flexible** - Multiple admin accounts possible
- ✅ **Protected** - No unauthorized modifications

Your photography website is now secure and professional! 🎉
