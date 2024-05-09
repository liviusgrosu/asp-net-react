using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Application.Interfaces;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<Result<List<ActivityDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<ActivityDto>>>
        {
            private readonly DataContext _context;
            private readonly ILogger<List> _logger;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, 
                            ILogger<List> logger,
                            IMapper mapper,
                            IUserAccessor userAccessor)
            {
                // We inject the datacontext as a depedancy 
                _context = context;
                _logger = logger;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }

            public async Task<Result<List<ActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activities = await _context.Activities
                    .ProjectTo<ActivityDto>(
                        _mapper.ConfigurationProvider, 
                        new { currentUsername = _userAccessor.GetUsername() 
                    })
                    .ToListAsync();

                // This request comes from the API/Controller
                return Result<List<ActivityDto>>.Success(activities);
            }
        }
    }
}
