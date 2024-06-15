(function ($) {
    // CSS kodlarını ekle
    var css = `
    .alert-group {
        position: relative;
        margin: 20px;
        min-height: 200px;
        display: flex;
    }

    .alert-group .alert {
        position: absolute;
        width: calc(100% - 20px);
        transition: all .4s ease;
        font-weight: 300;
        overflow: hidden;
        font-size:13px
    }

    .alert-group:not(.bsalert-group-init) .alert {
        visibility: hidden;
    }

    .alert-group .alert strong{
        font-weight: 600;
    }

    .alert-group .alert-hidden {
        height: 60px;
    }

    .alert-group .alert-count {
        position: absolute;
        top: -10px;
        left: -10px;
        background-color: red;
        color: white;
        border-radius: 50%;
        padding: 5px 10px;
        font-size: 12px;
        z-index: 1060;
    }

    .alert-group:empty::before {
        content: "Tüm Mesajlar Okunmuş";
        display: block;
        text-align: center;
        color: gray;
        font-size: 18px;
        line-height: 200px;
        background-color: #f6f6f6;
        border-radius: 6px;
        overflow: hidden;
    }

    .alert-group .alert.alert-success {
        background: none;
        border: none;
        border-left: 4px solid green;
        border-radius: 0;
        background: #fff;
        box-shadow: 1px 1px 4px rgba(0, 0, 0, .2);
    }

    .alert-group .alert.alert-danger{
        background: none;
        border: none;
        border-left: 4px solid #de0000;
        border-radius: 0;
        background: #fff;
        box-shadow: 1px 1px 4px rgba(0, 0, 0, .2);
    }

    .alert-group .alert.alert-warning{
        background: none;
        border: none;
        border-left: 4px solid #f0ad4e;
        border-radius: 0;
        background: #fff;
        box-shadow: 1px 1px 4px rgba(0, 0, 0, .2);
    }

    .alert-group .alert.alert-info {
        background: none;
        border: none;
        border-left: 4px solid #0ebeff;
        border-radius: 0;
        background: #fff;
        box-shadow: 1px 1px 4px rgba(0, 0, 0, .2);
    }

    .alert-group>.alert:nth-child(n+4) {
        display: none;
    }

    .alert-group .alert.hide {
        display: none !important
    }`;
    
    $('<style>').text(css).appendTo('head');

    // jQuery kontrolü
    if (typeof $ === 'undefined') {
        console.error('jQuery not loaded');
        return;
    }

    $.fn.StackedAlert = function (options) {
        // Default options
        var settings = $.extend({
            visibleAlert    : 3,
            startIndex      : 1040,
            appendClass     : '',
            stackRange      : 6
        }, options);

        this.each(function () {
            var $this = $(this);

            function updateAlertPositions($this) {
                var alerts = $this.find('.alert:visible').get();
                var zIndex = settings.startIndex;

                $this.find('.alert').css({
                    'z-index': zIndex,
                    'display': 'none'
                }).addClass('alert-hidden');

                alerts.forEach(function (alert, index) {
                    if (index < settings.visibleAlert) {
                        $(alert).css({
                            'z-index': zIndex + (settings.visibleAlert - index - 1),
                            'top': (index * settings.stackRange) + 'px',
                            'left': (index * settings.stackRange) + 'px',
                            'display': 'flex',
                            'flex-direction': 'column',
                            'height': 'auto'
                        }).removeClass('alert-hidden alert-fade-in').addClass(settings.appendClass);
                    }
                });

                var alertCount = $this.find('.alert').length;
                $this.find('.alert-count').remove();
                if (alertCount > 1) {
                    $this.append('<div class="alert-count">' + alertCount + '</div>');
                }

                // En alttaki hidden alert fade-in efektiyle gelsin
                var hiddenAlerts = $this.find('.alert-hidden');
                if (hiddenAlerts.length > 0) {
                    $(hiddenAlerts[0]).css('display', 'flex').removeClass('alert-hidden').addClass('alert-fade-in');
                }

                if ($this.find('.alert').length === 0) {
                    $this.empty();
                }
            }

            $this.find('.alert-dismissible').on('closed.bs.alert', function () {
                console.log('Closed Alert');
                updateAlertPositions($this);
            });

            updateAlertPositions($this);
            
            $this.addClass('bsalert-group-init');
        });

        return this;
    };
}(jQuery));

// Kullanım
// $(document).ready(function () {
//     $('.alert-group').StackedAlert({
//         visibleAlert    : 3,                // Number of alerts to show in a group
//         startIndex      : 1040,             // Initial index value of alerts in the group
//         appendClass     : 'custom-class',   // Extra class to be added to per alerts
//         stackRange      : 5                 // Spacing between the position of the stacked alerts
//     });
// });
