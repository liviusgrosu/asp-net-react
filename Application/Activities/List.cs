using MediatR;
using Domain;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Application.Core;
using Microsoft.AspNetCore.Http.HttpResults;
using AutoMapper;
using AutoMapper.QueryableExtensions;

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

            public Handler(DataContext context, 
                            ILogger<List> logger,
                            IMapper mapper)
            {
                // We inject the datacontext as a depedancy 
                _context = context;
                _logger = logger;
                _mapper = mapper;
            }

            public async Task<Result<List<ActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                try
                {
                    cancellationToken.ThrowIfCancellationRequested();
                }
                catch (System.Exception)
                {
                    _logger.LogInformation("Task was cancelled");
                    throw;
                }

                var activities = await _context.Activities
                    .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider)
                    .ToListAsync();

                // This request comes from the API/Controller
                return Result<List<ActivityDto>>.Success(activities);
            }
        }
    }
}
