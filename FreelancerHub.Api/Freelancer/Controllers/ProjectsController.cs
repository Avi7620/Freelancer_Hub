using Microsoft.AspNetCore.Mvc;

namespace FreelancerHub.Api.Freelancer.Controllers
{
    public class ProjectsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
