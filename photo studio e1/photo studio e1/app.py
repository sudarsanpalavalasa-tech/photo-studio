from flask import Flask, render_template, request, redirect, url_for, flash, session, send_from_directory, jsonify
from werkzeug.utils import secure_filename
import os
import json
from datetime import datetime
import hashlib

app = Flask(__name__)
app.secret_key = 'photography_studio_secret_key_2024'

# Configuration
UPLOAD_FOLDER = 'static/images'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp'}
MAX_FILE_SIZE = 16 * 1024 * 1024  # 16MB

# Ensure upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Admin credentials
ADMIN_CREDENTIALS = {
    'admin': 'photography2024',
    'photographer': 'photos2024',
    'owner': 'studio2024'
}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def load_portfolio_data():
    """Load portfolio data from JSON file"""
    try:
        with open('data/portfolio.json', 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return {
            'images': [],
            'categories': ['wedding', 'portrait', 'event', 'commercial']
        }

def save_portfolio_data(data):
    """Save portfolio data to JSON file"""
    os.makedirs('data', exist_ok=True)
    with open('data/portfolio.json', 'w') as f:
        json.dump(data, f, indent=2)

def load_website_settings():
    """Load website settings from JSON file"""
    try:
        with open('data/settings.json', 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return {
            'photographer_name': 'PhotoStudio',
            'contact_email': 'hello@photostudio.com',
            'contact_phone': '+1 (555) 123-4567',
            'about_text': 'I\'m a passionate photographer with over 8 years of experience capturing life\'s most precious moments.',
            'hero_title': 'Capturing Life\'s Beautiful Moments',
            'hero_subtitle': 'Professional photography services for weddings, portraits, events, and more'
        }

def save_website_settings(settings):
    """Save website settings to JSON file"""
    os.makedirs('data', exist_ok=True)
    with open('data/settings.json', 'w') as f:
        json.dump(settings, f, indent=2)

@app.route('/')
def index():
    """Main photography website"""
    portfolio_data = load_portfolio_data()
    settings = load_website_settings()
    return render_template('index.html', portfolio=portfolio_data, settings=settings)

@app.route('/admin')
def admin():
    """Admin login page"""
    if 'admin_logged_in' in session:
        return redirect(url_for('admin_dashboard'))
    return render_template('admin_login.html')

@app.route('/admin/login', methods=['POST'])
def admin_login():
    """Handle admin login"""
    username = request.form.get('username')
    password = request.form.get('password')
    
    if username in ADMIN_CREDENTIALS and ADMIN_CREDENTIALS[username] == password:
        session['admin_logged_in'] = True
        session['admin_username'] = username
        flash('Login successful!', 'success')
        return redirect(url_for('admin_dashboard'))
    else:
        flash('Invalid credentials!', 'error')
        return redirect(url_for('admin'))

@app.route('/admin/logout')
def admin_logout():
    """Handle admin logout"""
    session.pop('admin_logged_in', None)
    session.pop('admin_username', None)
    flash('Logged out successfully!', 'info')
    return redirect(url_for('admin'))

@app.route('/admin/dashboard')
def admin_dashboard():
    """Admin dashboard"""
    if 'admin_logged_in' not in session:
        return redirect(url_for('admin'))
    
    portfolio_data = load_portfolio_data()
    settings = load_website_settings()
    return render_template('admin_dashboard.html', portfolio=portfolio_data, settings=settings)

@app.route('/admin/upload', methods=['POST'])
def upload_image():
    """Handle image upload"""
    if 'admin_logged_in' not in session:
        return jsonify({'error': 'Unauthorized'}), 401
    
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['file']
    category = request.form.get('category', 'general')
    title = request.form.get('title', '')
    description = request.form.get('description', '')
    
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        # Add timestamp to avoid filename conflicts
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S_')
        filename = timestamp + filename
        
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        file.save(filepath)
        
        # Add to portfolio data
        portfolio_data = load_portfolio_data()
        new_image = {
            'id': len(portfolio_data['images']) + 1,
            'filename': filename,
            'title': title,
            'description': description,
            'category': category,
            'upload_date': datetime.now().isoformat()
        }
        portfolio_data['images'].append(new_image)
        save_portfolio_data(portfolio_data)
        
        return jsonify({'success': True, 'message': 'Image uploaded successfully!'})
    
    return jsonify({'error': 'Invalid file type'}), 400

@app.route('/admin/delete/<int:image_id>', methods=['POST'])
def delete_image(image_id):
    """Delete an image"""
    if 'admin_logged_in' not in session:
        return jsonify({'error': 'Unauthorized'}), 401
    
    portfolio_data = load_portfolio_data()
    image_to_delete = None
    
    for image in portfolio_data['images']:
        if image['id'] == image_id:
            image_to_delete = image
            break
    
    if image_to_delete:
        # Delete file from filesystem
        filepath = os.path.join(UPLOAD_FOLDER, image_to_delete['filename'])
        if os.path.exists(filepath):
            os.remove(filepath)
        
        # Remove from portfolio data
        portfolio_data['images'] = [img for img in portfolio_data['images'] if img['id'] != image_id]
        save_portfolio_data(portfolio_data)
        
        return jsonify({'success': True, 'message': 'Image deleted successfully!'})
    
    return jsonify({'error': 'Image not found'}), 404

@app.route('/admin/settings', methods=['POST'])
def update_settings():
    """Update website settings"""
    if 'admin_logged_in' not in session:
        return jsonify({'error': 'Unauthorized'}), 401
    
    settings = {
        'photographer_name': request.form.get('photographer_name', 'PhotoStudio'),
        'contact_email': request.form.get('contact_email', 'hello@photostudio.com'),
        'contact_phone': request.form.get('contact_phone', '+1 (555) 123-4567'),
        'about_text': request.form.get('about_text', 'I\'m a passionate photographer...'),
        'hero_title': request.form.get('hero_title', 'Capturing Life\'s Beautiful Moments'),
        'hero_subtitle': request.form.get('hero_subtitle', 'Professional photography services...')
    }
    
    save_website_settings(settings)
    return jsonify({'success': True, 'message': 'Settings updated successfully!'})

@app.route('/api/portfolio')
def api_portfolio():
    """API endpoint for portfolio data"""
    portfolio_data = load_portfolio_data()
    return jsonify(portfolio_data)

@app.route('/static/images/<filename>')
def uploaded_file(filename):
    """Serve uploaded images"""
    return send_from_directory(UPLOAD_FOLDER, filename)

@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors"""
    return render_template('404.html'), 404

@app.errorhandler(500)
def internal_error(error):
    """Handle 500 errors"""
    return render_template('500.html'), 500

if __name__ == '__main__':
    # Initialize data files if they don't exist
    load_portfolio_data()
    load_website_settings()
    
    app.run(debug=True, host='0.0.0.0', port=5000)
