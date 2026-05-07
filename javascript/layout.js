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
            var linkClass = 'nav-link px-lg-3';
            var currentAttr = '';

            if (isActive) {
                linkClass += ' active';
                currentAttr = ' aria-current="page"';
            }

            return '<li class="nav-item"><a href="' + item.href + '" class="' + linkClass + '"' + currentAttr + '>' + item.label + '</a></li>';
        }).join('');
    }

    function renderSocialLinks(containerClass, linkClass, listLabel) {
        return '<ul class="' + containerClass + ' list-unstyled mb-0" aria-label="' + listLabel + '">' + socialItems.map(function (item) {
            return '<li class="nav-item"><a href="' + item.href + '" class="' + linkClass + '" target="_blank" rel="noopener noreferrer" aria-label="' + item.label + '">' +
                '<i class="bi bi-' + item.icon + '"></i></a></li>';
        }).join('') + '</ul>';
    }

    function renderHeader(config) {
        return '<nav class="navbar navbar-expand-lg py-2" aria-label="Primary">' +
            '<div class="container position-relative gap-3">' +
            '<a href="index.html" class="navbar-brand logo me-3 d-flex align-items-center"><img src="img/TWICE_LOGO.png" alt="TWICE Logo"></a>' +
            '<span class="navbar-text nav-title d-none d-lg-inline-flex" id="nav-title">' + config.navTitle + '</span>' +
            '<button class="navbar-toggler collapsed ms-auto border-0 shadow-none px-2" type="button" data-bs-toggle="collapse" data-bs-target="#siteNav" aria-controls="siteNav" aria-expanded="false" aria-label="Toggle navigation">' +
            '<span class="navbar-toggler-box" aria-hidden="true"><span class="navbar-toggler-inner"></span></span></button>' +
            '<div class="collapse navbar-collapse nav-shell mt-3 mt-lg-0" id="siteNav">' +
            '<ul class="navbar-nav nav-primary mb-3 mb-lg-0 me-lg-auto gap-lg-2 fw-medium">' + renderNavLinks(config.activeHref) + '</ul>' +
            renderSocialLinks('nav-socials navbar-nav flex-row justify-content-center justify-content-lg-end gap-2', 'nav-link fs-5 px-2 py-2 d-inline-flex align-items-center justify-content-center', 'TWICE social links') +
            '</div></div>' +
            '</nav>';
    }

    function renderFooter() {
        return '<div class="container py-4">' +
            '<div class="text-center mb-3">' +
            '<a href="index.html" class="logo d-inline-block"><img src="img/TWICE_LOGO.png" alt="TWICE Logo"></a>' +
            '</div>' +
            '<ul class="footer-nav nav justify-content-center gap-2 gap-sm-3 mb-3 small">' +
            navItems.map(function (item) {
                return '<li class="nav-item"><a href="' + item.href + '" class="nav-link px-2">' + item.label + '</a></li>';
            }).join('') +
            '</ul>' +
            renderSocialLinks('footer-socials nav justify-content-center gap-2 fs-5', 'nav-link px-2 py-2 d-inline-flex align-items-center justify-content-center', 'TWICE social links') +
            '</div>' +
            '<div class="container border-top border-light border-opacity-10 py-3">' +
            '<div class="row gy-2 align-items-center small">' +
            '<div class="col-md text-center text-md-start">Copyright &copy; 2025 <strong>Website</strong>. All rights reserved.</div>' +
            '<div class="col-md-auto">' +
            '<ul class="footer-meta nav justify-content-center justify-content-md-end column-gap-2 row-gap-1">' +
            '<li class="nav-item"><a href="#" class="nav-link px-0">Terms &amp; Conditions</a></li>' +
            '<li class="nav-item"><a href="#" class="nav-link px-0">Privacy Policy</a></li>' +
            '</ul></div></div>' +
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