import glob
import re

html_files = glob.glob("*.html")
logo_old = '<a href="index.html" class="nav-logo">Arijit<span>Pal</span></a>'
logo_new = '<a href="index.html" class="nav-logo">ARIJIT <span>PAL</span></a>'

footer_new = '''    <!-- FOOTER -->
    <footer class="footer">
        <div class="footer-container">
            <p>&copy; 2026 Arijit Pal — All Rights Reserved</p>
            <div class="footer-contact">
                <p>LinkedIn Profile : <a href="https://linkedin.com/in/arijit-pal-146320360" target="_blank" rel="noopener noreferrer">linkedin.com/in/arijit-pal-146320360</a></p>
                <p>Contact At : +91 8100610943</p>
                <p>Email : <a href="mailto:arijit.pal2024@uem.edu.in">arijit.pal2024@uem.edu.in</a> (Student Email)<br>
                <a href="mailto:ap2446961@gmail.com">ap2446961@gmail.com</a> (Private email)</p>
            </div>
        </div>
    </footer>'''

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    content = content.replace(logo_old, logo_new)
    
    # Replaces the old footer block
    content = re.sub(
        r'<!-- FOOTER -->\s*<footer class="footer">\s*<p>&copy; 2026 Arijit Pal — All Rights Reserved</p>\s*</footer>',
        footer_new,
        content
    )
        
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

with open('styles.css', 'a', encoding='utf-8') as f:
    f.write('''
/* ===================================
   FOOTER UPDATE
   =================================== */
.footer-container {
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    padding: 1rem 0;
}

.footer-contact {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    font-family: var(--font-body);
    font-size: 0.95rem;
    color: var(--text-secondary);
    line-height: 1.6;
}

.footer-contact a {
    color: var(--accent-gold);
    text-decoration: none;
    transition: color 0.3s ease;
}

.footer-contact a:hover {
    color: var(--accent-gold-light);
    text-decoration: underline;
    text-underline-offset: 4px;
}
''')

print("Update complete")
