// Admin Panel JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Tab switching
    window.showTab = function(tabName) {
        // Hide all tabs
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Remove active from all buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Show selected tab
        document.getElementById(tabName + '-tab').classList.add('active');
        event.target.classList.add('active');
    };

    // Image upload form
    const uploadForm = document.getElementById('uploadForm');
    if (uploadForm) {
        uploadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            uploadImages();
        });
    }

    // Settings form
    const settingsForm = document.getElementById('settingsForm');
    if (settingsForm) {
        settingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            updateSettings();
        });
    }
});

// Upload images function
async function uploadImages() {
    const form = document.getElementById('uploadForm');
    const formData = new FormData(form);
    
    try {
        showMessage('Uploading images...', 'info');
        
        const response = await fetch('/admin/upload', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
            showMessage(result.message, 'success');
            form.reset();
            // Refresh the manage tab
            setTimeout(() => {
                location.reload();
            }, 2000);
        } else {
            showMessage(result.error || 'Upload failed', 'error');
        }
    } catch (error) {
        showMessage('Upload failed: ' + error.message, 'error');
    }
}

// Delete image function
async function deleteImage(imageId) {
    if (!confirm('Are you sure you want to delete this image?')) {
        return;
    }
    
    try {
        const response = await fetch(`/admin/delete/${imageId}`, {
            method: 'POST'
        });
        
        const result = await response.json();
        
        if (result.success) {
            showMessage(result.message, 'success');
            // Remove image from DOM
            const imageCard = document.querySelector(`[data-id="${imageId}"]`);
            if (imageCard) {
                imageCard.remove();
            }
        } else {
            showMessage(result.error || 'Delete failed', 'error');
        }
    } catch (error) {
        showMessage('Delete failed: ' + error.message, 'error');
    }
}

// Update settings function
async function updateSettings() {
    const form = document.getElementById('settingsForm');
    const formData = new FormData(form);
    
    try {
        showMessage('Updating settings...', 'info');
        
        const response = await fetch('/admin/settings', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
            showMessage(result.message, 'success');
        } else {
            showMessage(result.error || 'Update failed', 'error');
        }
    } catch (error) {
        showMessage('Update failed: ' + error.message, 'error');
    }
}

// Show message function
function showMessage(message, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.textContent = message;
    
    // Insert at the top of the main content
    const main = document.querySelector('.admin-main');
    if (main) {
        main.insertBefore(messageDiv, main.firstChild);
    }
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.parentNode.removeChild(messageDiv);
        }
    }, 5000);
}

// File input preview
document.addEventListener('change', function(e) {
    if (e.target.type === 'file' && e.target.multiple) {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            showMessage(`Selected ${files.length} file(s) for upload`, 'info');
        }
    }
});

// Drag and drop for file input
const fileInput = document.getElementById('file');
if (fileInput) {
    const uploadSection = document.querySelector('.upload-section');
    
    uploadSection.addEventListener('dragover', function(e) {
        e.preventDefault();
        uploadSection.style.background = '#f0f8ff';
    });
    
    uploadSection.addEventListener('dragleave', function(e) {
        e.preventDefault();
        uploadSection.style.background = '';
    });
    
    uploadSection.addEventListener('drop', function(e) {
        e.preventDefault();
        uploadSection.style.background = '';
        
        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
            fileInput.files = e.dataTransfer.files;
            showMessage(`Selected ${files.length} file(s) for upload`, 'info');
        }
    });
}
