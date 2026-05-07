(function () {
    var pageConfig = {
        'index.html': {
            activeHref: 'index.html',
            navTitle: 'TwiceVault - Home'
        },
        'discography.html': {
            activeHref: 'discography.html',
            navTitle: 'TwiceVault - Discography'
        },
        'gallery.html': {
            activeHref: 'gallery.html',
            navTitle: 'TwiceVault - Gallery'
        }
    };

    var navItems = [
        { href: 'index.html', label: 'Home' },
        { href: 'discography.html', label: 'Discography' },
        { href: 'gallery.html', label: 'Gallery' }
    ];

    var socialItems = [
        {
            href: 'https://www.facebook.com/JYPETWICE',
            icon: 'facebook',
            label: 'Facebook (opens in new tab)'
        },
        {
            href: 'https://www.instagram.com/twicetagram/',
            icon: 'instagram',
            label: 'Instagram (opens in new tab)'
        },
        {
            href: 'https://www.tiktok.com/@twice_tiktok_official',
            icon: 'tiktok',
            label: 'TikTok (opens in new tab)'
        },
        {
            href: 'https://www.youtube.com/@TWICE',
            icon: 'youtube',
            label: 'YouTube (opens in new tab)'
        }
    ];

    function currentFileName() {
        var parts = window.location.pathname.split('/');
        return parts[parts.length - 1] || 'index.html';
    }

    function renderNavLinks(activeHref) {
        return navItems.map(function (item) {
            var isActive = item.href === activeHref;
            var activeAttrs = isActive ? ' class="active" aria-current="page"' : '';
            return '<li><a href="' + item.href + '"' + activeAttrs + '>' + item.label + '</a></li>';
        }).join('');
    }

    function renderSocialLinks(containerClass, listLabel) {
        return '<ul class="' + containerClass + ' list-unstyled mb-0" aria-label="' + listLabel + '">' + socialItems.map(function (item) {
            return '<li><a href="' + item.href + '" target="_blank" rel="noopener noreferrer" aria-label="' + item.label + '">' +
                '<i class="bi bi-' + item.icon + '"></i></a></li>';
        }).join('') + '</ul>';
    }

    function renderHeader(config) {
        return '<nav class="container d-flex align-items-center gap-4 py-2 position-relative">' +
            '<a href="index.html" class="logo d-flex align-items-center"><img src="img/TWICE_LOGO.png" alt="TWICE Logo"></a>' +
            '<ul class="nav-links list-unstyled d-flex gap-4 mb-0 fw-medium">' + renderNavLinks(config.activeHref) + '</ul>' +
            '<button class="nav-toggle ms-auto" aria-expanded="false" aria-label="Toggle navigation">' +
            '<span class="nav-toggle-bar"></span></button>' +
            '<span class="nav-title" id="nav-title">' + config.navTitle + '</span>' +
            renderSocialLinks('nav-socials d-flex gap-3 ms-auto fs-5', 'TWICE social links') +
            '</nav>';
    }

    function renderFooter() {
        return '<div class="footer-top text-center py-4">' +
            '<div class="mb-3">' +
            '<a href="index.html" class="logo d-inline-block"><img src="img/TWICE_LOGO.png" alt="TWICE Logo"></a>' +
            '</div>' +
            '<ul class="list-unstyled d-flex justify-content-center gap-4 mb-3 small">' +
            navItems.map(function (item) {
                return '<li><a href="' + item.href + '" class="footer-link">' + item.label + '</a></li>';
            }).join('') +
            '</ul>' +
            renderSocialLinks('footer-socials d-flex justify-content-center gap-3 fs-5', 'TWICE social links') +
            '</div>' +
            '<div class="footer-bottom d-flex justify-content-between align-items-center px-4 py-3 small">' +
            '<span>Copyright &copy; 2025 <strong>Website</strong>. All rights reserved.</span>' +
            '<span><a href="#" class="footer-link">Terms &amp; Conditions</a> | ' +
            '<a href="#" class="footer-link">Privacy Policy</a></span>' +
            '</div>';
    }

    var config = pageConfig[currentFileName()] || pageConfig['index.html'];
    var header = document.querySelector('[data-site-header]');
    var footer = document.querySelector('[data-site-footer]');

    if (header) {
        header.innerHTML = renderHeader(config);
    }

    if (footer) {
        footer.innerHTML = renderFooter();
    }
})();