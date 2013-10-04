/*
 * notification
 *
 *
 * Copyright (c) 2013 Frank Huffener
 * Licensed under the MIT license.
 */

(function ($) {

    // default settings
    var oDefaults = {
        style: 'toast',                 // message style (toast (default), inline, lightbox, console, debug, status)
        type: 'none',                   // type of message (none (default), info, warning, error, alert, debug)
        cssPrefix: 'fh',                // override the css prefix to match your projects prefix
        cssClass: 'notification',       // override the css class to use your own styling
        text: '',                       // text to display (should be empty by default)
        queue: true,                    // queue messages, opposed to overwriting old message
        autoHide: true,                 // wether or not the message hides automatically (default: true)
        autoHideDelay: 2000,            // time after which the message hides automatically (in milliseconds)
        animation: "default",           // animation style (fade, slide, appear, default (decide by matrix below))
        animationSpeed: 500             // speed of the animation (in milliseconds)
    };

    var oStyleDefaults = {
        "toast" : {
            queue: true,
            autoHide: true,
            autoHideDelay: 2000,
            animation: "fade",
            animationSpeed: 500
        },
        "inline" : {
            queue: true,
            autoHide: false,
            autoHideDelay: 0,
            animation: "slide",
            animationSpeed: 500
        },
        "lightbox": {
            queue: false,
            autoHide: false,
            autoHideDelay: 0,
            animation: "slide",
            animationSpeed: 500
        },
        "console": {},
        "debug": {},
        "status": {}
    };

    var self = {};

    /*
     * Generate Css Class
     * Concatenates a classname as {cssPrefix}-{cssClass}-sClass
     * e.g. fh-notification-queue or fh-notification-message
     *
     */
    self.generateCssClass = function(sClass, oData) {
        var theClass = "";
        if(oData.cssPrefix) {
            theClass = theClass.concat(oData.cssPrefix, "-");
        }
        if(oData.cssClass) {
            theClass = theClass.concat(oData.cssClass);
        }
        if(sClass) {
            theClass = theClass.concat("-", sClass);
        }
    };

    /*
     * Find an existing message queue in the DOM
     *
     */
    self.getQueue = function($elem, oData) {
        var cssSelector = "".concat( self.generateCssClass("queue", oData), "+", self.generateCssClass( oData.style, oData ));
        return $($elem).find( cssSelector );
    };


    /*
     * Create a message queue in the DOM of type oData.type
     *
     */
    self.createQueue = function($elem, oData) {
        return $("<div></div>").addClass( self.generateCssClass("queue", oData) ).addClass( self.generateCssClass( oData.style, oData ) ).appendTo($elem);
    };

    /*
     * showMessage - main function
     *
     */
    self.showMessage = function($elem, oData) {

        // find queue or create if not available
        var $queue = self.getQueue($elem, oData);
        if(!$queue) {
            $queue = self.createQueue($elem, oData);
        }

        // Create the message
        var $message = $("<div></div>").addClass( "".concat(oData.cssPrefix, "-", oData.cssClass) );
        var $text = $("<p></p>").text(oData.text);
        $text.appendTo($message);

        /*
         * Toast message
         * Yeah, it's awesome
         */
        if(oData.style === "toast") {
            $message.addClass("toast").appendTo($elem).fadeIn(oData.animationSpeed, function() {
                if(oData.autoHide) {
                    // hide the message
                    $(this).delay(oData.autoHideDelay).fadeOut(oData.animationSpeed, function() {
                        $(this).remove();
                    });

                } else {
                    // bind click to hide the message, etc, etc
                    $message.addClass("clickable").one("click", function() {
                        $(this).fadeOut(oData.animationSpeed, function() {
                            $(this).remove();
                        });
                    });
                }
            });
        }


    };

    // Collection method.
    $.fn.notification = function (oData) {
        oData = oData || {};
        // overwrite defaults with style specific
        if (oData.style) {
            oDefaults = $.extend(oDefaults, oStyleDefaults[oData.style]);
        }
        // extend detaults with settings from call
        oData = $.extend({}, oDefaults, oData);

        return this.each(function () {
            if (oData.text) {
                self.showMessage($(this), oData);
            }
        });
    };


}(jQuery));