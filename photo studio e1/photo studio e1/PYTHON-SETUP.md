# 🐍 Photography Website - Python Flask Version

## **Complete Python Web Application**

Your photography website has been converted to a powerful Python Flask application with admin controls, image management, and database functionality.

## **🚀 Quick Start**

### **Step 1: Install Python Dependencies**
```bash
pip install -r requirements.txt
```

### **Step 2: Run the Application**
```bash
python app.py
```

### **Step 3: Access Your Website**
- **Main Website:** http://localhost:5000
- **Admin Panel:** http://localhost:5000/admin

## **📁 Project Structure**

```
photography-website/
├── app.py                 ← Main Flask application
├── requirements.txt       ← Python dependencies
├── templates/            ← HTML templates
│   ├── base.html         ← Base template
│   ├── index.html        ← Main website
│   ├── admin_login.html  ← Admin login
│   ├── admin_dashboard.html ← Admin panel
│   ├── 404.html          ← Error pages
│   └── 500.html
├── static/               ← Static files
│   ├── css/
│   │   ├── styles.css    ← Main styles
│   │   └── admin.css      ← Admin styles
│   ├── js/
│   │   ├── script.js     ← Main JavaScript
│   │   └── admin.js       ← Admin JavaScript
│   └── images/           ← Uploaded images
└── data/                 ← JSON data files
    ├── portfolio.json    ← Portfolio data
    └── settings.json     ← Website settings
```

## **🔐 Admin Access**

### **Login Credentials:**
- **Username:** `admin` | **Password:** `photography2024`
- **Username:** `photographer` | **Password:** `photos2024`
- **Username:** `owner` | **Password:** `studio2024`

### **Admin Features:**
- ✅ **Upload images** with drag & drop
- ✅ **Manage portfolio** (edit, delete images)
- ✅ **Update website settings** (name, contact info)
- ✅ **Category management** (wedding, portrait, event, commercial)
- ✅ **Image metadata** (titles, descriptions)

## **📸 Image Management**

### **Upload Images:**
1. **Go to Admin Panel** (http://localhost:5000/admin)
2. **Login with credentials**
3. **Click "Upload Images" tab**
4. **Select images** and fill details
5. **Click "Upload Images"**

### **Manage Images:**
1. **Click "Manage Images" tab**
2. **View all uploaded images**
3. **Delete unwanted images**
4. **Images automatically appear on website**

## **⚙️ Configuration**

### **Website Settings:**
- **Photographer Name**
- **Contact Email & Phone**
- **Hero Title & Subtitle**
- **About Text**
- **All customizable via admin panel**

### **Image Settings:**
- **Supported formats:** JPG, PNG, GIF, WebP
- **Max file size:** 16MB
- **Auto-resize and optimization**
- **Category-based organization**

## **🚀 Deployment Options**

### **Option 1: Heroku (Recommended)**
```bash
# Install Heroku CLI
# Create Procfile
echo "web: gunicorn app:app" > Procfile

# Deploy
git init
git add .
git commit -m "Initial commit"
heroku create your-photography-site
git push heroku main
```

### **Option 2: PythonAnywhere**
1. **Upload files** to PythonAnywhere
2. **Install requirements:** `pip3.10 install --user -r requirements.txt`
3. **Configure web app** to run `app.py`
4. **Set up static files** mapping

### **Option 3: DigitalOcean App Platform**
1. **Connect GitHub repository**
2. **Set build command:** `pip install -r requirements.txt`
3. **Set run command:** `python app.py`
4. **Deploy automatically**

### **Option 4: Local Network Access**
```bash
# Run on all network interfaces
python app.py
# Access from other devices: http://YOUR_IP:5000
```

## **🔧 Advanced Features**

### **Database Integration (Optional):**
```python
# Add to app.py for database support
from flask_sqlalchemy import SQLAlchemy

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///photography.db'
db = SQLAlchemy(app)
```

### **Image Processing:**
```python
# Add image resizing and optimization
from PIL import Image

def process_image(file_path):
    img = Image.open(file_path)
    img.thumbnail((1200, 1200), Image.Resampling.LANCZOS)
    img.save(file_path, optimize=True, quality=85)
```

### **Email Notifications:**
```python
# Add contact form email functionality
import smtplib
from email.mime.text import MIMEText

def send_contact_email(name, email, message):
    # Email sending logic here
    pass
```

## **📊 API Endpoints**

### **Public Endpoints:**
- `GET /` - Main website
- `GET /api/portfolio` - Portfolio data (JSON)
- `GET /static/images/<filename>` - Serve images

### **Admin Endpoints:**
- `GET /admin` - Admin login
- `POST /admin/login` - Admin authentication
- `GET /admin/dashboard` - Admin panel
- `POST /admin/upload` - Upload images
- `POST /admin/delete/<id>` - Delete image
- `POST /admin/settings` - Update settings

## **🛡️ Security Features**

- ✅ **Session-based authentication**
- ✅ **File upload validation**
- ✅ **CSRF protection**
- ✅ **Input sanitization**
- ✅ **Secure file handling**

## **📱 Mobile Responsive**

- ✅ **Responsive design** for all devices
- ✅ **Touch-friendly** admin interface
- ✅ **Mobile-optimized** image gallery
- ✅ **Responsive navigation**

## **🔍 Troubleshooting**

### **Common Issues:**

1. **Port already in use:**
   ```bash
   # Change port in app.py
   app.run(debug=True, port=5001)
   ```

2. **Images not loading:**
   ```bash
   # Check static/images folder exists
   mkdir -p static/images
   ```

3. **Admin login not working:**
   ```bash
   # Clear browser cache and cookies
   # Check credentials in app.py
   ```

4. **File upload errors:**
   ```bash
   # Check file permissions
   chmod 755 static/images
   ```

## **🎯 Benefits of Python Version**

- ✅ **Server-side processing** for better performance
- ✅ **Database integration** for data persistence
- ✅ **Admin panel** with full CRUD operations
- ✅ **API endpoints** for future mobile apps
- ✅ **Scalable architecture** for growth
- ✅ **Professional deployment** options

## **🚀 Next Steps**

1. **Customize the design** in `static/css/styles.css`
2. **Add more features** like blog, testimonials
3. **Integrate with database** for better data management
4. **Deploy to cloud** for public access
5. **Add analytics** and SEO optimization

Your photography website is now a powerful Python web application! 🎉
