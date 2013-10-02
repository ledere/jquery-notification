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
        style: 'toast',
        cssClass: 'fh-notification', // override the css class to use your own styling
        text: '',
        autoHide: true,
        autoHideDelay: 2000, // in milliseconds
        animationSpeed: 500 // in milliseconds
     };
    
    var self = {};
    
    self.show = function($elem, oData) {
    
        // Create the message
        var $message = $("<div></div>").addClass(oData.cssClass);
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
        // extend detauls options
        oData = $.extend({}, oDefaults, oData);
        return this.each(function () {
            if (oData.text) {
                self.show($(this), oData);
            }
        });
    };


}(jQuery));
