Meteor.subscribe("surveys");

Surveys = new Meteor.Collection("surveys");

Meteor.Router.add({
    '/front': function () {
        return "front";
    },
    '/survey': function () {
        return "survey";
    }
});

///////////////////////////////////////////////////////////////////////////////
// Initialization

Meteor.startup(function () {
    TOOLS.InitializeFoundation();

    Meteor.autorun(function () {
        //when the user is logged in: redirect from the front page to the survey
        //and update their image
        if (Meteor.userId()) {
            if (!Meteor.Router.page() || Meteor.Router.page() === "front") {
                Meteor.Router.to("/survey");
            }
        }
        //when logged out, switch to front
        else {
            Meteor.Router.to("/front");
        }
    });

    TOOLS.FixFirefoxCss();
});