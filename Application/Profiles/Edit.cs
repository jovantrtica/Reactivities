using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>> // klasa 
        {

            public required string Username { get; set; }
            public required string DisplayName { get; set; }
            public required string Bio { get; set; }


        }

        public class CommandValidator : AbstractValidator<Command>
        {

            public CommandValidator()
            {
                RuleFor(x => x.DisplayName).NotEmpty(); // ovo proverava nekakva pravila za klasi koju sam ja postavio
                RuleFor(x => x.Username).NotEmpty(); // ovo proverava nekakva pravila za klasi koju sam ja postavio

            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>

        {

            private readonly DataContext _context;



            public Handler(DataContext context)
            {

                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {

                AppUser appUser = await _context.Users.FirstOrDefaultAsync(user => user.UserName == request.Username); // ne instancirano AppUser klasu nego fetchamo i radimo sa vec posotjecom instancom AppUsera


                if (appUser == null) return null;

                appUser.DisplayName = request.DisplayName; // starom displayName-u smo dodelili novu vrednost preko request objekta

                appUser.Bio = request.Bio;

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update Bio or Name");

                return Result<Unit>.Success(Unit.Value);



            }


        }
    }


}