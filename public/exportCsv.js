//run this in the console to download an answers csv

function formatData(input) {
    // replace " with â€œ
    var regexp = new RegExp(/["]/g);
    var output = input.replace(regexp, "â€œ");
    //HTML
    var regexp = new RegExp(/\<[^\<]+\>/g);
    var output = output.replace(regexp, "");
    if (output == "") return '';
    return '"' + output + '"';
};

Meteor.call('downloadSurveys', '123', function (error, surveys) {
    var csv = "";

    _.each(surveys, function (survey) {
        if (survey.answers) {
            var answers = _.map(survey.answers, function(answer){
                return formatData(answer);
            });

            csv += answers.join(",") + "\n";
        }
    });

    window.location.href = 'data:text/csv;charset=UTF-8,' + encodeURIComponent(csv);

    console.log(csv);
    console.log(surveys);
});