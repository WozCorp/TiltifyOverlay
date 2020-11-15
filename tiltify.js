const teamID = 816;
const parentCampaignID = 73502;

$(document).ready(function () {

   const reloadInfo = function() {

   const queryString = window.location.search;
   const urlParams = new URLSearchParams(queryString);
   var user = urlParams.get('user') ? urlParams.get('user').toLowerCase() : urlParams.get('user');

   $.ajax({
      url: `https://tiltify.com/api/v3/users/${user}`,
      data: {},
      method: 'GET',
      headers: {
         Authorization:
            'Bearer 0a1a5d1e492e622f10bbe2cbee1be5bca9706e92957f8da078b69e051a791552',
      },
   }).then(function (userIDResp) {
      if(userIDResp && userIDResp.data) user = userIDResp.data.username;
      $.ajax({
         url: `https://tiltify.com/api/v3/users/${userIDResp.data.id}/campaigns`,
         data: {},
         method: 'GET',
         headers: {
            Authorization:
               'Bearer 0a1a5d1e492e622f10bbe2cbee1be5bca9706e92957f8da078b69e051a791552',
         },
      }).then(function (userDataResp) {
         $.ajax({
            url: `https://tiltify.com/api/v3/teams/${teamID}/campaigns/${parentCampaignID}`,
            data: {},
            method: 'GET',
            headers: {
               Authorization:
                  'Bearer 0a1a5d1e492e622f10bbe2cbee1be5bca9706e92957f8da078b69e051a791552',
            },
         }).then(function (parentCauseResp) {
            // Get the index of the user's campaign for this cause
            let userCauseIndex = userDataResp.data
               .map((m) => m.supportingCampaignId)
               .indexOf(parentCampaignID);

            let ourUsersCause = userDataResp.data[userCauseIndex];

            if (!ourUsersCause) {
               ourUsersCause = { totalAmountRaised: '0', 
                                 fundraiserGoalAmount: '0' };
            }

            // console.log(ourUsersCause);
            console.log(parentCauseResp);

            var streamer = $('#streamer-name');
            $(streamer).html(user);

            var raised = $('#money-raised-number');
            $(raised).html(`$${parseFloat(ourUsersCause.totalAmountRaised).toFixed(2)}`);

            var userGoal = $('#user-goal');
            $(userGoal).html(`$${parseFloat(ourUsersCause.fundraiserGoalAmount).toFixed(2)}`);

            var total = $('#money-raised-total');
            $(total).html(`$${parseFloat(parentCauseResp.data.totalAmountRaised).toFixed(2)}`);

            var totalGoal = $('#total-goal');
            $(totalGoal).html(`$${parseFloat(parentCauseResp.data.fundraiserGoalAmount).toFixed(2)}`);
         });
      });
   });

   }

   reloadInfo();

   window.setInterval(function(){
      reloadInfo()
    }, 5000);



});
