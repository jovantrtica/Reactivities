

namespace Domain
{
    public class ActivityAttendee
    {
        public string AppUserId { get; set; } // to je foreign key na AppUser tablicu

        public AppUser AppUser { get; set; }

        public Guid ActivityId { get; set; } // to je foreign key na Activity tablicu

        public Activity Activity { get; set; }

        public bool IsHost { get; set; }
    }
}