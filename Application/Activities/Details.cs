using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Application.Activities;
using Application.Interfaces;

namespace Application.Details
{
    public class Details
    {
        public class Query : IRequest<Result<ActivityDto>> 
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<ActivityDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                // We inject the datacontext as a depedancy 
                _context = context;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }

            public async Task<Result<ActivityDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                // This request comes from the API/Controller
                var activity = await _context.Activities
                    .ProjectTo<ActivityDto>(
                        _mapper.ConfigurationProvider, 
                        new { currentUsername = _userAccessor.GetUsername() 
                    })
                    .FirstOrDefaultAsync(x => x.Id == request.Id);

                return Result<ActivityDto>.Success(activity);
            }
        }
    }
}
