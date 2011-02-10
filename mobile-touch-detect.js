TOUCH_NO = 0;
TOUCH_YES = 1;
TOUCH_MAYBE = 2;

ORIENTATION_PORTRAIT = 0;
ORIENTATION_LANDSCAPE = 1;

MOBILE_MAX_WIDTH_PORTRAIT = 640;
MOBILE_MAX_WIDTH_LANDSCAPE = 960;

TABLET_MAX_WIDTH_PORTRAIT = 768;
TABLET_MAX_WIDTH_LANDSCAPE = 1024;


function getScreenDimensions() {
    // may become a bit more complicated.
    return screen;
}

function isTouch() {
    if (window.Touch !== undefined) {
        // iPhone or iPad
        return TOUCH_YES;
    }
    if (document.ontouchstart !== undefined) {
        // some modern browsers have this but they
        // never fires the event.
        return TOUCH_MAYBE;
    }
    return TOUCH_NO;
}

function redirect(location_mobile, location_tablet) {
    var touch = isTouch();

    if (isMobileScreen()) {
        window.location = location_mobile;
        return true;
    }

    switch (touch) {
        case TOUCH_YES:
            if (isTabletScreen()) {
                window.location = location_tablet;
                return true;
            }
            break;
        case TOUCH_MAYBE:
            if (document.addEventListener !== undefined) {
                document.addEventListener('touchstart',
                    function(){window.location = location_tablet;},
                    true);
            } else {
                document.ontouchstart = function() {
                    window.location = location_tablet;
                };
            }
            break;
        default:
            return false;
    }
    return false;
}

function getOrientation() {
    var orientation = ORIENTATION_PORTRAIT;
    if (window.orientation !== undefined) {
        switch (window.orientation) {
            case 90:
                orientation = ORIENTATION_LANDSCAPE;
                break;
            case -90:
                orientation = ORIENTATION_LANDSCAPE;
                break;
            default:
                orientation = ORIENTATION_PORTRAIT;
        }
    }
    return orientation;
}

function isMobileScreen() {
    var dim = getScreenDimensions();
    var orientation = getOrientation();

    if (dim !== undefined) {
        if (orientation == ORIENTATION_PORTRAIT) {
            return dim.width <= MOBILE_MAX_WIDTH_PORTRAIT;
        } else {
            return dim.height <= MOBILE_MAX_WIDTH_LANDSCAPE;
        }
    }
    return false;
}

function isTabletScreen() {
    var dim = getScreenDimensions();
    var orientation = getOrientation();

    if (dim !== undefined) {
        if (orientation == ORIENTATION_PORTRAIT) {
            return dim.width <= TABLET_MAX_WIDTH_PORTRAIT;
        } else {
            return dim.height <= TABLET_MAX_WIDTH_LANDSCAPE;
        }
    }
    return false;
}
