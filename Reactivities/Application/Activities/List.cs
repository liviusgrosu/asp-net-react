using MediatR;
using Domain;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Application.Core;
using Microsoft.AspNetCore.Http.HttpResults;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<Result<List<Activity>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Activity>>>
        {
            private readonly DataContext _context;
            private readonly ILogger<List> _logger;

            public Handler(DataContext context, ILogger<List> logger)
            {
                // We inject the datacontext as a depedancy 
                _context = context;
                _logger = logger;
            }

            public async Task<Result<List<Activity>>> Handle(Query request, CancellationToken cancellationToken)
            {
                try
                {
                    cancellationToken.ThrowIfCancellationRequested();
                }
                catch (Exception)
                {
                    _logger.LogInformation("Task was cancelled");
                    throw;
                }

                // This request comes from the API/Controller
                return Result<List<Activity>>.Success( await _context.Activities.ToListAsync());
            }
        }
    }
}
