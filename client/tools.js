TOOLS = {};

//standard foundation initialization code, probably could cut some of it down
TOOLS.InitializeFoundation = function () {
    var $doc = $(document), Modernizr = window.Modernizr;

    $(document).ready(function () {
        $.fn.foundationAlerts ? $doc.foundationAlerts() : null;
        $.fn.foundationButtons ? $doc.foundationButtons() : null;
        $.fn.foundationAccordion ? $doc.foundationAccordion() : null;
        $.fn.foundationNavigation ? $doc.foundationNavigation() : null;
        $.fn.foundationTopBar ? $doc.foundationTopBar() : null;
        $.fn.foundationCustomForms ? $doc.foundationCustomForms() : null;
        $.fn.foundationMediaQueryViewer ? $doc.foundationMediaQueryViewer() : null;
        $.fn.foundationTabs ? $doc.foundationTabs({callback: $.foundation.customForms.appendCustomMarkup}) : null;
        $.fn.foundationTooltips ? $doc.foundationTooltips() : null;
        $.fn.foundationMagellan ? $doc.foundationMagellan() : null;
        $.fn.foundationClearing ? $doc.foundationClearing() : null;

        $.fn.placeholder ? $('input, textarea').placeholder() : null;
    });

// Hide address bar on mobile devices (except if #hash present, so we don't mess up deep linking).
    if (Modernizr.touch && !window.location.hash) {
        $(window).load(function () {
            setTimeout(function () {
                window.scrollTo(0, 1);
            }, 0);
        });
    }
};

//fixes a deploy bug on meteor for firefox https://github.com/meteor/meteor/issues/632
TOOLS.FixFirefoxCss = function () {
    if (navigator.userAgent.match(/firefox/i)) {
        //replace all encoded backslashes with nothing
        $("link").each(function () {
            var link = this;
            if (link.href.indexOf(".css") !== -1) {
                var newHref = link.href.replace(/%5C/g, '');
                link.href = newHref;
            }
        });
    }
};

/**
 * @return An empty string or the value at the array's index
 */
Handlebars.registerHelper('index', function (array, index) {
    if (array && array[index])
        return array[index];

    return "";
});