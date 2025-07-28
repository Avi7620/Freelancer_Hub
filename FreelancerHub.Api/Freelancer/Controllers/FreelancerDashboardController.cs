using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FreelancerHub.Api.Freelancer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FreelancerDashboardController : Controller
    {
        [Authorize(Roles = "Freelancer")]
        [HttpGet("freelancer-dashboard")]
        public IActionResult FreelancerDashboard() {

            return Json("inside the freelancer Dashboard");
        }
    }
}
