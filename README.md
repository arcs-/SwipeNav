SwipeNav
=====================

![Example Picture](https://stillhart.biz/project/swipeNav/banner.jpg)

## Introduction
SwipeNav is a simple Javascriptthat that transforms your right navigationbar in a more mobile friendly version.

### Help
Please don't hesitate to contact me with any questions!

##Usage

###Including files
You need JQuerry and the plugin it self
```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script type=text/javascript src=js/swipeNav.min.js></script>
```

###Required HTML structure
You neeed a navigation something like this

```html
    <div id="navBar">
        <img src="drawer.svg" id="drawer"/>
        <div id="nav">

            <a class="active">Profile</a>
            <a href="devices.html">Devices</a>
            <a href="link.html">Link</a>

        </div>
    </div>
```

```css
#navBar {
    top:0;
    width: 320px;
    height: 100%;
    background: #333;
    position: fixed;
}

#drawer {
    display:none;
}


@media only screen
and (max-width : 1000px) {

    #navBar {
        width: 295px;
    }

    #drawer {
        display: inline;
        position: absolute;
        width: 45px;
        margin-top: -1px;
        margin-left: 295px;
    }
}
```


###Initialization
In the File
```javascript
  var navigation = '#navBar'; // Id from nav container
  var drawerIcon = '#drawer'; // Id from drawericon
  var width = 295;            // Width of nav container
  var threshold = 170;        // At which point should open

  // Do this to hide the navigationbar
  $(navigation).css("marginLeft",'-'+width+'px');
```

##License
The MIT License (MIT)

Copyright (c) 2014 Patrick Stillhart

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
