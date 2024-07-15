using MediatR;
using Persistence;
using Domain;
using AutoMapper;
using FluentValidation;
using Application.Core;
using Microsoft.AspNetCore.Http;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {

            public Activity Activity { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {

            public CommandValidator()
            {
                RuleFor(x => x.Activity).SetValidator(new ActivityValidator()); // ovo proverava nekakva pravila za klasi koju sam ja postavio
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>

        {

            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Activity.Id); // vraca activity po key value-u

                if (activity == null) return null; // ako je activity null vracamo null, jer ga nismo nasli u bazi


                _mapper.Map(request.Activity, activity); // rekli smo mu na koji activity da ode i preko mappera (pravila) da edituje stvari u bazi

                var result = await _context.SaveChangesAsync() > 0; // tek ovde save-a promene u bazi

                if (!result) return Result<Unit>.Failure("Failed to update activity"); 
                // handleuje error iako posalje stare vrednosti opet dobija error - ne valja

                return Result<Unit>.Success(Unit.Value);


            }


        }



    }
}