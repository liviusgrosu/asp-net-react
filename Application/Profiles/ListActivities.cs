using Application.Activities;
using Application.Core;
using Application.Interfaces;
using Application.Photos;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Profiles
{
    public class ListActivities
    {
        public class Query : IRequest<Result<List<UserActivityDto>>>
        {
            public string Username { get; set; }
            public UserActivityParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<UserActivityDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _context = context;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }

            public async Task<Result<List<UserActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.ActivityAttendees
                    .Where(u => u.AppUser.UserName == request.Username)
                    .ProjectTo<UserActivityDto>(
                        _mapper.ConfigurationProvider,
                        new
                        {
                            currentUsername = _userAccessor.GetUsername()
                        })
                    .AsQueryable();

                switch(request.Params.Predicate)
                {
                    case "past":
                        query = query.Where(a => a.Date < DateTime.UtcNow);
                        break;
                    case "hosting":
                        query = query.Where(a => a.HostUsername == request.Username);
                        break;
                    default:
                        query = query.Where(a => a.Date >= DateTime.UtcNow);
                        break;
                }

                var result = await query.ToListAsync();

                return Result<List<UserActivityDto>>.Success(result);
            }
        }
    }
}
