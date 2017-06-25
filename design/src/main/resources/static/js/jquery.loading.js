/**
 * Created by qupei on 9/2 2016.
 */
(function($) {
    $.fn.extend({
        loadingPics : {
            A : "data:image/gif;base64,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",
        },
        loadingShow : function(timeout,style) {
            var _style = this.loadingPics[style] || this.loadingPics['A'];
            var _this = this;

            var padding_right = $(_this).css('padding-right');
            var padding_left = $(_this).css('padding-left');

            if ($('.loading',_this).length <= 0 ) {
                this.prepend('<span class="loading"></span>');
                $('.loading', _this).css({
                    "display" : "none",
                    "background" : "rgba(214,214,214,0.7) url("+_style+") no-repeat 50% 25%",
                    "position" : "absolute",
                    "z-index" : "999",
                    "width" : "100%",
                    "height" : "100%",
                    "left" : "0",
                    "top" : "0"
                });
            }
            if ($(_this).css('position') != 'absolute' ) {
                $(_this).css('position','relative');
            }
            $('.loading',_this).show();

            // 自动关闭
            if ($.type(timeout) == 'number') {
                setTimeout(function () {
                    $('.loading',_this).hide().remove();
                },timeout)
            }
        },
        loadingHide : function () {
            $('.loading',this).hide().remove();
        }
    });
})(jQuery);
