using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreelancerHub.Core.DTO
{
    public class UpdateRateAvailabilityRequest
    {
        public decimal? HourlyRate { get; set; }
        public string Availability { get; set; }
    }
}
