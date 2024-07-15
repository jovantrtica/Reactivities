using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Comments;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace API.SignalR
{
    public class ChatHub : Hub
    {
        private readonly IMediator _meditator;
        public ChatHub(IMediator meditator)
        {
            _meditator = meditator;

        }

        public async Task SendComment(Create.Command command)
        {
            var comment = await _meditator.Send(command);

            await Clients.Group(command.ActivityId.ToString())
            .SendAsync("RecieveComment", comment.Value);
        }

        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var activityId = httpContext.Request.Query["activityId"];
            await Groups.AddToGroupAsync(Context.ConnectionId, activityId);
            var result = await _meditator.Send(new List.Query{ActivityId = Guid.Parse(activityId)});
            await Clients.Caller.SendAsync("LoadComments", result.Value);
        }
    }
}