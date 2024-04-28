using Domain;
using FluentValidation;

namespace Application.Profiles
{
    public class ProfileValidator : AbstractValidator<Profile>
    {
        public ProfileValidator() 
        {
            RuleFor(x => x.DisplayName).NotEmpty();
        }
    }
}
