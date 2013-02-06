(function () {
    Template.front.rendered = function () {
        //setup responsive video
        $(".bannerVideo").fitVids();

        //setup login w github
        $("#apply").click(function () {
            Meteor.loginWithGithub({requestPermissions: ["user:email"]});
        });
    };
})();