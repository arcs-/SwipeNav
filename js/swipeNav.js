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
/* -- Setup -- */
var enableDesktop = false; // Enables this also for desktop browser
var navigation = '#navBar'; // Id from nav container
var drawerIcon = '#drawer'; // Id from drawericon (to pull out the drawer)(optional)
var width = 295; // Width of nav container
var threshold = 170; // At which point should open
var maxDrawerScreenSize = 1000; // At which point is desktop vision
/* -- End Setup -- */

window.onload = function(event) {
	if(!enableDesktop) {
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		 onMobile = true;
		}
	} else {
		onMobile = true;
	}
	
    if(onMobile) checkSize();
};

window.onresize = function(event) {
    if(onMobile) checkSize();
};

/**
	Check if large screen or not
*/
function checkSize() {
    var width = $(window).width();
    if (maxDrawerScreenSize >= width)
        initSwipeNav();
    else
        destroySwipeNav();
}

/**
	set the listener (for small screen)
*/
function initSwipeNav() {
    $(navigation).css("marginLeft", '-' + width + 'px');

    window.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);

    window.addEventListener('mousedown', onTouchStart);
    window.addEventListener('mousemove', onTouchMove);
    window.addEventListener('mouseup', onTouchEnd);

    $(drawerIcon).bind("click", switchDrawerState);

}

/**
	Destroys the listener (for large screen)
*/
function destroySwipeNav() {
    $(navigation).css("marginLeft", '0');
	$(navigation).css('left', '0');

    window.removeEventListener('touchstart', onTouchStart);
    window.removeEventListener('touchmove', onTouchMove);
    window.removeEventListener('touchend', onTouchEnd);

    window.removeEventListener('mousedown', onTouchStart);
    window.removeEventListener('mousemove', onTouchMove);
    window.removeEventListener('mouseup', onTouchEnd);

    $(drawerIcon).unbind("click", switchDrawerState);
}

var startX, startY;
var fingerDown, moved, isOpen, tempState, onMobile;

/**
	Gets fired on finger down
*/
function onTouchStart(event) {
    startX = getX();
    startY = getY();
    fingerDown = true;
	tempState = isOpen;
}

/**
	Gets fired on finger move
*/
function onTouchMove(event) {
    if (fingerDown) {
        moved = true;
        var distanceX = Math.abs(getX() - startX);
        var distanceY = Math.abs(getY() - startY);
        if (distanceX < width && distanceX > 15 && distanceX > distanceY + 80) {
            if (getX() - startX > 0 ){ 
				$(navigation).css('left', distanceX + 'px'); 
				window.getSelection().removeAllRanges();
				event.preventDefault();
			} else if (isOpen){ 
				$(navigation).css('left', width - startX + getX() + 'px');
				window.getSelection().removeAllRanges();
				event.preventDefault();
			}
            
        }
    }
}

/**
	Gets fired on finger leave
*/
function onTouchEnd() {
    if (moved && getX() - startX > threshold){ 
		open();
		if(tempState != isOpen) window.getSelection().removeAllRanges()
    }else if (moved){ 
		close();
		if(tempState != isOpen) window.getSelection().removeAllRanges()
	}
    moved = fingerDown = false;
}

/**
	Open or closes the navigation
*/
function switchDrawerState() {
    if (isOpen) close();
    else open();
}

/**
	Closes the navigation
*/
function close() {
    isOpen = false;
    $(navigation).animate({
        left: '0'
    });
}

/**
	Opens the navigation
*/
function open() {
    isOpen = true;
    $(navigation).animate({
        left: width + 'px'
    });
}

/**
	Get X for touch and mouse device
*/
function getX() {
    return event.pageX || event.changedTouches[0].pageX;
}

/**
	Get Y for touch and mouse device
*/
function getY() {
    return event.pageY || event.changedTouches[0].pageY;
}
