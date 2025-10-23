// Photography Website - Access Control System
// This ensures only the website owner can modify images

class AccessControl {
    constructor() {
        this.isAdmin = false;
        this.adminKey = 'photography_admin_2024';
        this.init();
    }

    init() {
        // Check if user is already authenticated
        this.checkAuthStatus();
        
        // Add admin access button to main website
        this.addAdminButton();
        
        // Protect image uploads
        this.protectImageUploads();
    }
    
    // Public method to check if current user is the owner
    isOwner() {
        return this.isAdmin;
    }

    checkAuthStatus() {
        const authData = localStorage.getItem('photography_auth');
        if (authData) {
            const { username, timestamp } = JSON.parse(authData);
            // Check if session is still valid (24 hours)
            if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
                this.isAdmin = true;
                this.showAdminFeatures();
            } else {
                localStorage.removeItem('photography_auth');
            }
        }
    }

    addAdminButton() {
        // Create floating admin button
        const adminBtn = document.createElement('div');
        adminBtn.id = 'admin-access-btn';
        adminBtn.innerHTML = '🔧';
        adminBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            background: #e74c3c;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            transition: all 0.3s ease;
            font-size: 20px;
        `;
        
        adminBtn.addEventListener('click', () => {
            if (this.isAdmin) {
                window.open('admin.html', '_blank');
            } else {
                this.showLoginModal();
            }
        });
        
        adminBtn.addEventListener('mouseenter', () => {
            adminBtn.style.transform = 'scale(1.1)';
            adminBtn.style.background = '#c0392b';
        });
        
        adminBtn.addEventListener('mouseleave', () => {
            adminBtn.style.transform = 'scale(1)';
            adminBtn.style.background = '#e74c3c';
        });
        
        document.body.appendChild(adminBtn);
    }

    showLoginModal() {
        const modal = document.createElement('div');
        modal.id = 'admin-login-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
        `;
        
        modal.innerHTML = `
            <div style="
                background: white;
                padding: 30px;
                border-radius: 15px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                max-width: 400px;
                width: 90%;
            ">
                <h2 style="text-align: center; margin-bottom: 20px; color: #2c3e50;">🔐 Admin Access</h2>
                <p style="text-align: center; color: #666; margin-bottom: 20px;">
                    Enter admin credentials to manage images
                </p>
                <form id="admin-login-form">
                    <div style="margin-bottom: 15px;">
                        <label style="display: block; margin-bottom: 5px; color: #333;">Username:</label>
                        <input type="text" id="admin-username" required style="
                            width: 100%;
                            padding: 10px;
                            border: 2px solid #e1e8ed;
                            border-radius: 5px;
                            font-size: 16px;
                        ">
                    </div>
                    <div style="margin-bottom: 20px;">
                        <label style="display: block; margin-bottom: 5px; color: #333;">Password:</label>
                        <input type="password" id="admin-password" required style="
                            width: 100%;
                            padding: 10px;
                            border: 2px solid #e1e8ed;
                            border-radius: 5px;
                            font-size: 16px;
                        ">
                    </div>
                    <div style="display: flex; gap: 10px;">
                        <button type="submit" style="
                            flex: 1;
                            background: #e74c3c;
                            color: white;
                            padding: 12px;
                            border: none;
                            border-radius: 5px;
                            cursor: pointer;
                            font-size: 16px;
                        ">Login</button>
                        <button type="button" onclick="this.closest('#admin-login-modal').remove()" style="
                            flex: 1;
                            background: #95a5a6;
                            color: white;
                            padding: 12px;
                            border: none;
                            border-radius: 5px;
                            cursor: pointer;
                            font-size: 16px;
                        ">Cancel</button>
                    </div>
                </form>
                <div id="login-status" style="
                    margin-top: 15px;
                    padding: 10px;
                    border-radius: 5px;
                    display: none;
                "></div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Handle form submission
        document.getElementById('admin-login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('admin-username').value;
            const password = document.getElementById('admin-password').value;
            
            if (this.authenticate(username, password)) {
                this.isAdmin = true;
                this.saveAuthStatus(username);
                modal.remove();
                this.showAdminFeatures();
                this.showSuccessMessage('Admin access granted!');
            } else {
                this.showLoginError('Invalid credentials!');
            }
        });
    }

    authenticate(username, password) {
        // Simple authentication - in production, use proper backend
        const validCredentials = [
            { username: 'admin', password: 'photography2024' },
            { username: 'photographer', password: 'photos2024' },
            { username: 'owner', password: 'studio2024' }
        ];
        
        return validCredentials.some(cred => 
            cred.username === username && cred.password === password
        );
    }

    saveAuthStatus(username) {
        const authData = {
            username: username,
            timestamp: Date.now()
        };
        localStorage.setItem('photography_auth', JSON.stringify(authData));
    }

    showAdminFeatures() {
        // Add admin-only features to the main website
        const adminBtn = document.getElementById('admin-access-btn');
        if (adminBtn) {
            adminBtn.innerHTML = '⚙️';
            adminBtn.title = 'Admin Panel';
        }
        
        // Add image management features
        this.addImageManagementFeatures();
    }

    addImageManagementFeatures() {
        // Add edit buttons to portfolio images
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        portfolioItems.forEach((item, index) => {
            const editBtn = document.createElement('button');
            editBtn.innerHTML = '✏️';
            editBtn.style.cssText = `
                position: absolute;
                top: 5px;
                left: 5px;
                background: rgba(231, 76, 60, 0.9);
                color: white;
                border: none;
                border-radius: 50%;
                width: 30px;
                height: 30px;
                cursor: pointer;
                font-size: 12px;
                z-index: 10;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            item.addEventListener('mouseenter', () => {
                editBtn.style.opacity = '1';
            });
            
            item.addEventListener('mouseleave', () => {
                editBtn.style.opacity = '0';
            });
            
            editBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.editImage(index);
            });
            
            item.appendChild(editBtn);
        });
    }

    editImage(imageIndex) {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const img = document.querySelectorAll('.portfolio-item img')[imageIndex];
                    img.src = e.target.result;
                    this.showSuccessMessage('Image updated successfully!');
                };
                reader.readAsDataURL(file);
            }
        };
        input.click();
    }

    protectImageUploads() {
        // Prevent unauthorized image uploads
        document.addEventListener('dragover', (e) => {
            if (!this.isAdmin) {
                e.preventDefault();
                e.stopPropagation();
            }
        });
        
        document.addEventListener('drop', (e) => {
            if (!this.isAdmin) {
                e.preventDefault();
                e.stopPropagation();
                this.showAccessDeniedMessage();
            }
        });
    }

    showAccessDeniedMessage() {
        this.showMessage('Access denied! Only the website owner can modify images.', 'error');
    }

    showLoginError(message) {
        const status = document.getElementById('login-status');
        status.textContent = message;
        status.style.display = 'block';
        status.style.background = '#f8d7da';
        status.style.color = '#721c24';
        status.style.border = '1px solid #f5c6cb';
    }

    showSuccessMessage(message) {
        this.showMessage(message, 'success');
    }

    showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 5px;
            color: white;
            font-weight: 500;
            z-index: 3000;
            animation: slideInRight 0.3s ease;
            max-width: 300px;
        `;
        
        if (type === 'success') {
            messageDiv.style.background = '#27ae60';
        } else {
            messageDiv.style.background = '#e74c3c';
        }
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.parentNode.removeChild(messageDiv);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize access control when page loads
document.addEventListener('DOMContentLoaded', () => {
    new AccessControl();
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
