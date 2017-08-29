var openPhotoSwipe = function() {
    var pswpElement = document.querySelectorAll('.pswp')[0];

    // build items array
    var items = [
        {
            src: '/assets/images/screenshots/01.png',
            w: 360,
            h: 640
        },
        {
            src: '/assets/images/screenshots/02.png',
            w: 360,
            h: 640
        },
        {
            src: '/assets/images/screenshots/03.png',
            w: 360,
            h: 640
        }
        ,
        {
            src: '/assets/images/screenshots/04.png',
            w: 360,
            h: 640
        }
        ,
        {
            src: '/assets/images/screenshots/05.png',
            w: 360,
            h: 640
        }
    ];

    // define options (if needed)
    var options = {
             // history & focus options are disabled on CodePen
        history: false,
        focus: false,
    };

    var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
};
