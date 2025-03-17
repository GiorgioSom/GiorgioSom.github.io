let zIndexCounter = 1000;

const projectData = {
    'hacko-window': {
        title: 'Hacko.exe',
        layout: 'game',
        description: 'A revolutionary approach to game development',
        mainColor: '#8DBFB3',
        technologies: ['Python', 'Unity 3D', 'C#'],
        preview: 'assets/Hacko_Hero.png',
        gallery: [
            'assets/project-previews/hacko-1.jpg',
            'assets/project-previews/hacko-2.jpg'
        ],
        github: 'https://github.com/afiocca99/GotaHUB',
        details: {
            overview: 'Your overview text here',
            features: [
                'Feature 1',
                'Feature 2',
                'Feature 3'
            ],
            impact: 'Project impact description'
        }
    },
    'luna-window': {
        title: 'Luna.exe',
        layout: 'design',
        description: '3D Visualization Project',
        mainColor: '#E43637',
        technologies: ['Three.js', 'WebGL'],
        preview: 'assets/Luna_Hero.png',
        designElements: {
            concept: 'Minimalist 3D approach',
            colors: ['#1084d0', '#ffffff', '#000000'],
            tools: ['Blender', 'Three.js']
        },
        github: 'https://github.com/GiorgioSom/TinyGuests_3ee'
    }
};

function showProject(id) {
    const win = document.getElementById(id);
    const data = projectData[id];
    if (!win || !data) return;

    win.innerHTML = `
    <div class="window-titlebar" style="background: linear-gradient(90deg, #000080, #1084d0)">
        <div class="titlebar-text">${data.title}</div>
        <button class="close-button" onclick="closeProject('${id}')">×</button>
    </div>
    <div class="window-content" style="background: ${data.mainColor}">
        <div class="window-scroll-content">
            <div class="project-layout">
                <h1 class="project-title rainbow-text">${data.title.replace('.exe', '')}</h1>
                
                <div class="project-preview">
                    <img src="${data.preview}" alt="${data.title}" class="hero-image">
                </div>
                
                <div class="project-info">
                    <div class="tech-stack">
                        ${data.technologies.map(tech => 
                            `<span class="tech-badge">${tech}</span>`
                        ).join('')}
                    </div>
                    
                    <div class="project-description">
                        <p>${data.description}</p>
                    </div>

                    ${data.details ? `
                        <div class="project-features">
                            ${data.details.features.map(feature => 
                                `<div class="feature-item">► ${feature}</div>`
                            ).join('')}
                        </div>
                    ` : ''}
                </div>
                
                <a href="${data.github}" class="github-link" target="_blank">
                    View Project on GitHub
                </a>
            </div>
        </div>
    </div>
`;

    const closeButton = win.querySelector('.close-button');
    closeButton.addEventListener('click', () => closeProject(id));

    win.classList.remove('hidden');
    win.style.zIndex = ++zIndexCounter;
    
    // Ensure scroll position starts at top
    const scrollContent = win.querySelector('.window-scroll-content');
    if (scrollContent) {
        scrollContent.scrollTop = 0;
    }
    
    makeWindowDraggable(win);
}

function makeWindowDraggable(win) {
    const titlebar = win.querySelector('.window-titlebar');
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    titlebar.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        if (e.target.classList.contains('close-button')) return;
        
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
        
        win.style.zIndex = ++zIndexCounter;
    }

    function elementDrag(e) {
        e.preventDefault();
        
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        
        win.style.top = (win.offsetTop - pos2) + "px";
        win.style.left = (win.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function closeProject(id) {
    const win = document.getElementById(id);
    if (win) {
        win.classList.add('hidden');
        // Only reset scroll position of content, keep window position
        const scrollContent = win.querySelector('.window-scroll-content');
        if (scrollContent) {
            scrollContent.scrollTop = 0;
        }
    }
}