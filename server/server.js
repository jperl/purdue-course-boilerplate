(function () {
    Surveys = new Meteor.Collection("surveys");

    Meteor.publish("surveys", function () {
        //only return the current user's surveys
        return Surveys.find({user: this.userId}, {});
    });

    Surveys.allow({
        //use updateSurvey instead
        insert: function () {
            return false;
        },
        //use updateSurvey instead
        update: function () {
            return false;
        },
        remove: function () {
            return false;
        }
    });

    Meteor.methods({
        updateSurvey: function (survey) {
            if (!this.userId)
                throw new Meteor.Error(401, "Not logged in!");

            //associate the correct user
            survey.user = this.userId;

            Surveys.update({user: this.userId}, survey);

            return true;
        },
        //admin function to get all surveys
        //use Meteor.call('downloadSurveys', '123', function(error, val){ console.log(val) })
        downloadSurveys: function (secretKey) {
            if (secretKey !== Meteor.settings.SURVEYS_SECRET)
                throw new Meteor.Error(403, "Go away thief!");

            return Surveys.find().fetch();
        },
        //admin function to get all users
        //use Meteor.call('downloadUsers', '123', function(error, val){ console.log(val) })
        downloadUsers: function (secretKey) {
            if (secretKey !== Meteor.settings.SURVEYS_SECRET)
                throw new Meteor.Error(403, "Go away thief!");

            return Meteor.users.find().fetch();
        }
    });

    Meteor.users.find().observe({
        added: function (user) {
            //insert a survey for each user that does not have one
            if (!Surveys.findOne({user: user._id})) {
                console.log("Inserted " + Surveys.insert({user: user._id}));
            }
        },
        removed: function (oldDoc) {
            //not possible to remove accounts yet
        }
    });

//Setup Authentication Providers
//need to pass settings json with deploy http://docs.meteor.com/#meteor_settings ex: meteor deploy --settings deploySettings.json
    Accounts.loginServiceConfiguration.remove({
        service: "github"
    });

    Accounts.loginServiceConfiguration.insert({
        service: "github",
        clientId: Meteor.settings.GITHUB_CLIENT_ID,
        secret: Meteor.settings.GITHUB_SECRET
    });
})();