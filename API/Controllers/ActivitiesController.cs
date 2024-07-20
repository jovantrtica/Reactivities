using Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Domain;
using MediatR;
using Application.Activities;
using Application.Core;
using Microsoft.AspNetCore.Authorization;
using Application;



namespace API.Controllers
{


    public class ActivitiesController : BaseApiController
    {

        [HttpGet] // /api/activities
        public async Task<IActionResult> GetActivities([FromQuery]ActivityParams param)
        {

            return HandlePagedResult(await Mediator.Send(new List.Query{Params = param}));

        }

        // with authorise user needs to be authorized to get this endpoint
        // [Authorize]
        [HttpGet("{id}")] // /api/activities/fgfggf
        public async Task<IActionResult> GetActivity(Guid id)
        {

            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }


        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)

        {

            return HandleResult(await Mediator.Send(new Create.Command { Activity = activity }));
        }

        [Authorize(Policy = "IsActivityHost")]
        [HttpPut("{id}")]

        public async Task<IActionResult> EditActivity(Guid id, Activity activity)

        {

            activity.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Activity = activity }));


        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)

        {

            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));

        }

        [HttpPost("{id}/attend")]

        public async Task<IActionResult> Attend(Guid id)
        {
            return HandleResult(await Mediator.Send(new UpdateAttendance.Command { Id = id }));
        }

    }
}
