Template.survey.currentSurvey = function () {
    return Surveys.findOne();
};

Template.survey.userName = function () {
    var user = Meteor.user();
    if (user && user.profile && user.profile.name)
        return user.profile.name;

    return "No Name in Github";
};

//store the last input on keyup
var lastInputId = null;
Template.survey.rendered = function () {
    //focus back on the input after re-render
    var lastInput = $(lastInputId);
    if (lastInput)
        lastInput.focus().val(lastInput.val());
};

var updateSurvey = _.debounce(function (callback) {
    var answers = [];

    $(".question").each(function () {
        answers.push($(this).val());
    });

    var survey = {answers: answers};

    Meteor.call('updateSurvey', survey, function (error, result) {
        //TODO save confirmation ui
        if (callback)
            callback();
    });
}, 500);

Template.survey.events({
    "keyup .question": function (event) {
        lastInputId = $(event.currentTarget).attr('id');
        updateSurvey();
    },
    "click #logout": function () {
        //update the survey a last time then logout
        updateSurvey(Meteor.logout);
    }
});