using MediatR;
using Domain;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<List<Activity>> { }

        public class Handler : IRequestHandler<Query, List<Activity>>
        {
            private readonly DataContext _context;
            private readonly ILogger<List> _logger;

            public Handler(DataContext context, ILogger<List> logger)
            {
                // We inject the datacontext as a depedancy 
                _context = context;
                _logger = logger;
            }

            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
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
                return await _context.Activities.ToListAsync();
            }
        }
    }
}
