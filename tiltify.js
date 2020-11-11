const teamID = 816;
const parentCampaignID = 73502;

$(document).ready(function () {

   const reloadInfo = function() {

      const queryString = window.location.search;
   const urlParams = new URLSearchParams(queryString);

   $.ajax({
      url: `https://tiltify.com/api/v3/users/${urlParams.get('user')}`,
      data: {},
      method: 'GET',
      headers: {
         Authorization:
            'Bearer 0a1a5d1e492e622f10bbe2cbee1be5bca9706e92957f8da078b69e051a791552',
      },
   }).then(function (userIDResp) {
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
            $(streamer).html(`${urlParams.get('user')}`);

            var raised = $('#money-raised-number');
            $(raised).html(`$${ourUsersCause.totalAmountRaised}`);

            var userGoal = $('#user-goal');
            $(userGoal).html(`$${ourUsersCause.fundraiserGoalAmount}`);

            var total = $('#money-raised-total');
            $(total).html(`$${parentCauseResp.data.totalAmountRaised}`);

            var totalGoal = $('#total-goal');
            $(totalGoal).html(`$${parentCauseResp.data.fundraiserGoalAmount}`);
         });
      });
   });

   }

   reloadInfo();

   window.setInterval(function(){
      reloadInfo()
    }, 5000);



});
