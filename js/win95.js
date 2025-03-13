let activeWindow = null;

function showProject(id) {
    const win = document.getElementById(id);
    win.classList.remove('hidden');
    
    // Bring window to front
    if (activeWindow) {
        activeWindow.style.zIndex = "1000";
    }
    win.style.zIndex = "1001";
    activeWindow = win;
}

function closeProject(id) {
    document.getElementById(id).classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
    const windows = document.querySelectorAll('.project-window');
    
    windows.forEach(win => {
        const titlebar = win.querySelector('.window-titlebar');
        let isDragging = false;
        let startX, startY, initialX, initialY;

        // Mouse events
        titlebar.addEventListener('mousedown', startDragging);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', stopDragging);

        // Touch events
        titlebar.addEventListener('touchstart', startDragging);
        document.addEventListener('touchmove', drag);
        document.addEventListener('touchend', stopDragging);

        function startDragging(e) {
            if (e.type === 'mousedown') {
                startX = e.clientX;
                startY = e.clientY;
            } else if (e.type === 'touchstart') {
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
            }

            initialX = win.offsetLeft;
            initialY = win.offsetTop;
            isDragging = true;

            // Bring window to front
            if (activeWindow) {
                activeWindow.style.zIndex = "1000";
            }
            win.style.zIndex = "1001";
            activeWindow = win;
        }

        function drag(e) {
            if (!isDragging) return;
            e.preventDefault();

            let currentX, currentY;
            if (e.type === 'mousemove') {
                currentX = e.clientX;
                currentY = e.clientY;
            } else if (e.type === 'touchmove') {
                currentX = e.touches[0].clientX;
                currentY = e.touches[0].clientY;
            }

            const deltaX = currentX - startX;
            const deltaY = currentY - startY;

            win.style.left = `${initialX + deltaX}px`;
            win.style.top = `${initialY + deltaY}px`;
        }

        function stopDragging() {
            isDragging = false;
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && activeWindow) {
            activeWindow.classList.add('hidden');
        }
    });
});