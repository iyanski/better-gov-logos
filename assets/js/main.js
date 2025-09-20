// Tab functionality
document.addEventListener('DOMContentLoaded', function() {
    // Tab switching
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Add active class to clicked button and corresponding pane
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // Copy button functionality
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const codeBlock = this.closest('.code-block');
            const code = codeBlock.querySelector('code').textContent;

            // Use modern Clipboard API if available
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(code).then(() => {
                    showCopySuccess(this);
                }).catch(() => {
                    fallbackCopyTextToClipboard(code, this);
                });
            } else {
                fallbackCopyTextToClipboard(code, this);
            }
        });
    });

    // Icon filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const iconsGrid = document.getElementById('icons-grid');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter icons
            filterIcons(filter);
        });
    });

    // Load icons
    loadIcons();
});

// Copy functionality
function fallbackCopyTextToClipboard(text, button) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopySuccess(button);
        } else {
            showCopyError(button);
        }
    } catch (err) {
        showCopyError(button);
    }

    document.body.removeChild(textArea);
}

function showCopySuccess(button) {
    const originalText = button.textContent;
    button.textContent = 'Copied!';
    button.classList.add('copied');

    setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove('copied');
    }, 2000);
}

function showCopyError(button) {
    const originalText = button.textContent;
    button.textContent = 'Failed';
    button.style.background = '#dc3545';

    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '#0033A0';
    }, 2000);
}

// Icon data (this would normally come from an API or JSON file)
const iconData = [{
        name: 'ph-flag',
        displayName: 'Philippine Flag',
        acronym: 'PH',
        branch: 'national',
        category: 'symbols',
        description: 'Official flag of the Philippines'
    },
    {
        name: 'malacanang',
        displayName: 'Malacañang Palace',
        acronym: 'MAL',
        branch: 'executive',
        category: 'office-of-the-president',
        description: 'Official residence and workplace of the President'
    },
    {
        name: 'deped',
        displayName: 'Department of Education',
        acronym: 'DepEd',
        branch: 'executive',
        category: 'cabinet-departments',
        description: 'Department responsible for basic education'
    },
    {
        name: 'doh',
        displayName: 'Department of Health',
        acronym: 'DOH',
        branch: 'executive',
        category: 'cabinet-departments',
        description: 'Department responsible for public health'
    },
    {
        name: 'dti',
        displayName: 'Department of Trade and Industry',
        acronym: 'DTI',
        branch: 'executive',
        category: 'cabinet-departments',
        description: 'Department responsible for trade and industry'
    },
    {
        name: 'dpwh',
        displayName: 'Department of Public Works and Highways',
        acronym: 'DPWH',
        branch: 'executive',
        category: 'cabinet-departments',
        description: 'Department responsible for infrastructure'
    },
    {
        name: 'dotr',
        displayName: 'Department of Transportation',
        acronym: 'DOTr',
        branch: 'executive',
        category: 'cabinet-departments',
        description: 'Department responsible for transportation'
    },
    {
        name: 'dilg',
        displayName: 'Department of the Interior and Local Government',
        acronym: 'DILG',
        branch: 'executive',
        category: 'cabinet-departments',
        description: 'Department responsible for local government'
    },
    {
        name: 'dnd',
        displayName: 'Department of National Defense',
        acronym: 'DND',
        branch: 'executive',
        category: 'cabinet-departments',
        description: 'Department responsible for national defense'
    },
    {
        name: 'dof',
        displayName: 'Department of Finance',
        acronym: 'DOF',
        branch: 'executive',
        category: 'cabinet-departments',
        description: 'Department responsible for fiscal policy'
    },
    {
        name: 'doj',
        displayName: 'Department of Justice',
        acronym: 'DOJ',
        branch: 'executive',
        category: 'cabinet-departments',
        description: 'Department responsible for justice'
    },
    {
        name: 'denr',
        displayName: 'Department of Environment and Natural Resources',
        acronym: 'DENR',
        branch: 'executive',
        category: 'cabinet-departments',
        description: 'Department responsible for environment'
    },
    {
        name: 'senate',
        displayName: 'Senate of the Philippines',
        acronym: 'SEN',
        branch: 'legislative',
        category: 'chambers',
        description: 'Upper house of the Philippine Congress'
    },
    {
        name: 'house',
        displayName: 'House of Representatives',
        acronym: 'HOR',
        branch: 'legislative',
        category: 'chambers',
        description: 'Lower house of the Philippine Congress'
    },
    {
        name: 'supreme-court',
        displayName: 'Supreme Court of the Philippines',
        acronym: 'SC',
        branch: 'judicial',
        category: 'courts',
        description: 'Highest court in the Philippines'
    },
    {
        name: 'comelec',
        displayName: 'Commission on Elections',
        acronym: 'COMELEC',
        branch: 'constitutional',
        category: 'commissions',
        description: 'Constitutional commission for elections'
    },
    {
        name: 'csc',
        displayName: 'Civil Service Commission',
        acronym: 'CSC',
        branch: 'constitutional',
        category: 'commissions',
        description: 'Constitutional commission for civil service'
    },
    {
        name: 'coa',
        displayName: 'Commission on Audit',
        acronym: 'COA',
        branch: 'constitutional',
        category: 'commissions',
        description: 'Constitutional commission for audit'
    }
];

// Load and display icons
function loadIcons() {
    const iconsGrid = document.getElementById('icons-grid');
    iconsGrid.innerHTML = '';

    iconData.forEach(icon => {
        const iconCard = createIconCard(icon);
        iconsGrid.appendChild(iconCard);
    });
}

// Create icon card element
function createIconCard(icon) {
    const card = document.createElement('div');
    card.className = 'icon-card';
    card.setAttribute('data-branch', icon.branch);
    card.setAttribute('data-category', icon.category);

    card.innerHTML = `
        <div class="icon-preview">
            <span>🏛️</span>
        </div>
        <div class="icon-name">${icon.displayName}</div>
        <div class="icon-acronym">${icon.acronym}</div>
        <div class="icon-branch">${icon.branch}</div>
    `;

    return card;
}

// Filter icons based on selected filter
function filterIcons(filter) {
    const iconCards = document.querySelectorAll('.icon-card');

    iconCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-branch') === filter) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 51, 160, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'linear-gradient(135deg, #0033A0 0%, #1B5E20 100%)';
        header.style.backdropFilter = 'none';
    }
});

// Add loading animation
function showLoading() {
    const iconsGrid = document.getElementById('icons-grid');
    iconsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
            <div style="display: inline-block; width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #0033A0; border-radius: 50%; animation: spin 1s linear infinite;"></div>
            <p style="margin-top: 1rem; color: #666;">Loading icons...</p>
        </div>
    `;
}

// Add CSS for loading animation
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);