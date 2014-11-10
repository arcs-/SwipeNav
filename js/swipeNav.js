/**
 SwipeNav  1.0

 MIT License
 Copyright (c) 2014 Patrick Stillhart

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.
 **/
window.addEventListener('load', function(){
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        /* -- Setup -- */
        var navigation = '#navBar'; // Id from nav container
        var drawerIcon = '#drawer'; // Id from drawericon
        var width = 295;            // Width of nav container
        var threshold = 170;        // At which point should open

        $(navigation).css("marginLeft",'-'+width+'px');
        /* -- End Setup -- */
        var startX, startY = 0;
        var fingerDown, moved, isOpen = false;

        // Finger Down
        window.addEventListener('touchstart', function (event) {
            startX = event.changedTouches[0].pageX;
            startY = event.changedTouches[0].pageY;
            fingerDown = true;
        }, false)

        // Finger move
        window.addEventListener('touchmove', function (event) {
            if (fingerDown) {
                moved = true;
                var distanceX = Math.abs(event.changedTouches[0].pageX - startX);
                var distanceY = Math.abs(event.changedTouches[0].pageY - startY);
                if (distanceX < width && distanceX > 15 && distanceX > distanceY + 80 ) {
                    if (event.changedTouches[0].pageX - startX > 0) $(navigation).css('left', distanceX + 'px');
                    else if (!isOpen) $(navigation).css('left', width - startX + event.changedTouches[0].pageX + 'px');
                    event.preventDefault();
                }
            }
        }, false)

        // Finger up
        window.addEventListener('touchend', function (event) {
            if (moved && event.changedTouches[0].pageX - startX > threshold) open();
            else if(moved) close();
            moved = fingerDown = false;
        }, false)

        $(drawerIcon).click(function(e){
            if(isOpen)close();
            else open();
        });

        function close() {
            isOpen = false;
            $(navigation).animate({
                left: '0'
            });
        }

        function open() {
            isOpen = true;
            $(navigation).animate({
                left: width + 'px'
            });
        }
    }
}, false)
