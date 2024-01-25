using MediatR;
using Domain;
using Persistence;
using Microsoft.EntityFrameworkCore;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<List<Activity>> { }

        public class Handler : IRequestHandler<Query, List<Activity>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                // We inject the datacontext as a depedancy 
                _context = context;
            }

            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                // This request comes from the API/Controller
                return await _context.Activities.ToListAsync();
            }
        }
    }
}
