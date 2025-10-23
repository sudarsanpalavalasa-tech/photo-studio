# 🚀 Photography Website - Netlify Deployment Guide

## **Quick Fix for 404 Error**

If you're getting a "Page not found" error on Netlify, follow these steps:

### **Step 1: Check Your File Structure**
Make sure these files are in your project root:
```
photo studio e1/
├── index.html          ← Main website (REQUIRED)
├── styles.css          ← CSS styles (REQUIRED)
├── script.js           ← JavaScript (REQUIRED)
├── access-control.js   ← Admin system (REQUIRED)
├── admin.html          ← Admin panel (REQUIRED)
├── netlify.toml        ← Netlify config (REQUIRED)
├── _redirects          ← Redirect rules (REQUIRED)
└── images/             ← Your photos folder
```

### **Step 2: Redeploy to Netlify**

#### **Method 1: Drag & Drop (Easiest)**
1. **Zip your entire project folder**
2. **Go to Netlify dashboard**
3. **Drag the zip file** to the deploy area
4. **Wait for deployment** to complete

#### **Method 2: Git Repository**
1. **Push your code to GitHub**
2. **Connect Netlify to your GitHub repo**
3. **Set build settings:**
   - Build command: `echo "No build required"`
   - Publish directory: `.` (root)
4. **Deploy**

### **Step 3: Verify Deployment**
After deployment, your website should be accessible at:
- `https://your-site-name.netlify.app`
- `https://your-site-name.netlify.app/index.html`

## **🔧 Common Issues & Solutions**

### **Issue 1: 404 Error**
**Solution:** Make sure `index.html` is in the root directory and `netlify.toml` is configured.

### **Issue 2: CSS/JS Not Loading**
**Solution:** Check that all file paths are correct and files are uploaded.

### **Issue 3: Images Not Showing**
**Solution:** 
1. Add images to the `images/` folder
2. Make sure image paths in HTML are correct
3. Check file permissions

### **Issue 4: Admin Panel Not Working**
**Solution:** Ensure `admin.html` and `access-control.js` are uploaded.

## **📁 Required Files for Deployment**

### **Essential Files:**
- ✅ `index.html` - Main website
- ✅ `styles.css` - Website styling
- ✅ `script.js` - Website functionality
- ✅ `access-control.js` - Admin system
- ✅ `admin.html` - Admin panel
- ✅ `netlify.toml` - Netlify configuration
- ✅ `_redirects` - URL routing

### **Optional Files:**
- 📁 `images/` - Your photos
- 📄 `README.md` - Documentation
- 📄 `ADMIN-SETUP.md` - Admin guide

## **🚀 Deployment Steps**

### **Step 1: Prepare Files**
1. **Ensure all files are in the project root**
2. **Add your images to the `images/` folder**
3. **Test locally** (press F5 in VS Code)

### **Step 2: Deploy to Netlify**
1. **Go to [netlify.com](https://netlify.com)**
2. **Sign in to your account**
3. **Drag your project folder** to the deploy area
4. **Wait for deployment** (usually 1-2 minutes)

### **Step 3: Configure Custom Domain (Optional)**
1. **Go to Site Settings**
2. **Click "Domain Management"**
3. **Add your custom domain**

## **🔍 Testing Your Deployment**

### **Test Checklist:**
- ✅ **Main page loads** (`/`)
- ✅ **CSS styling works** (colors, fonts, layout)
- ✅ **JavaScript works** (navigation, lightbox, forms)
- ✅ **Images display** (portfolio gallery)
- ✅ **Admin panel accessible** (`/admin.html`)
- ✅ **Mobile responsive** (test on phone)

### **Admin Panel Test:**
1. **Go to:** `https://your-site.netlify.app/admin.html`
2. **Login with:** `admin` / `photography2024`
3. **Test image upload** and management

## **📞 Troubleshooting**

### **Still Getting 404?**
1. **Check file names** - must be exactly `index.html`
2. **Verify file location** - must be in root directory
3. **Clear browser cache** and try again
4. **Check Netlify build logs** for errors

### **Images Not Loading?**
1. **Check `images/` folder** is uploaded
2. **Verify image file names** match HTML
3. **Check file sizes** (should be under 2MB each)

### **Admin Panel Issues?**
1. **Ensure `admin.html` is uploaded**
2. **Check `access-control.js` is present**
3. **Test login credentials**

## **🎯 Final Checklist**

Before deploying, make sure:
- [ ] All files are in the project root
- [ ] `index.html` is the main file
- [ ] Images are in the `images/` folder
- [ ] Website works locally (F5 in VS Code)
- [ ] Admin panel is accessible
- [ ] All file names are correct (case-sensitive)

Your photography website should now deploy successfully on Netlify! 🎉
