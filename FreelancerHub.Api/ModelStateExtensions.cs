using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace FreelancerHub.Api
{
    public static class ModelStateExtensions
    {
        public static string GetValidationErrors(this ModelStateDictionary modelState)
        {
            return string.Join("; ", modelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage));
        }
    }
}
