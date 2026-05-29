"use client";

const testimonials = [
  {
    id: 1,
    videoId: "dQw4w9WgXcQ",
    title: "Sarah's $10,000 Win",
    name: "Sarah Johnson",
    location: "New York, NY",
  },
  {
    id: 2,
    videoId: "dQw4w9WgXcQ",
    title: "Mike's Challenge Journey",
    name: "Mike Anderson",
    location: "Los Angeles, CA",
  },
  {
    id: 3,
    videoId: "dQw4w9WgXcQ",
    title: "Emily's Reward Story",
    name: "Emily Roberts",
    location: "Chicago, IL",
  },
];

export default function TestimonialSection() {
  return (
    <div className="section-padding" style={{ background: "#0D1B2A" }}>
      <div className="container">
        <div className="text-center mb-5 animate-fade-in-up">
          <h2 className="fw-bold mb-3">
            <span className="neon-text">Previous Challenge</span>{" "}
            <span style={{ color: "#fff" }}>Winners</span>
          </h2>
          <p style={{ color: "#87DEFA", maxWidth: "500px", margin: "0 auto" }}>
            See what past winners have to say about their experience
          </p>
        </div>

        <div className="row g-4">
          {testimonials.map((testimonial, i) => (
            <div
              key={testimonial.id}
              className="col-md-6 col-lg-4 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div
                className="glass-card p-3 h-100"
                style={{
                  borderRadius: "20px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Glowing border effect */}
                <div
                  style={{
                    position: "absolute",
                    top: -1,
                    left: -1,
                    right: -1,
                    bottom: -1,
                    borderRadius: "21px",
                    background: "linear-gradient(135deg, #00BFFF 0%, #E91E78 100%)",
                    opacity: 0.3,
                    zIndex: -1,
                    filter: "blur(8px)",
                    animation: "pulse-glow 3s ease-in-out infinite",
                  }}
                />

                {/* Video */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    paddingBottom: "56.25%",
                    borderRadius: "12px",
                    overflow: "hidden",
                  }}
                >
                  <iframe
                    src={`https://www.youtube.com/embed/${testimonial.videoId}`}
                    title={testimonial.title}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      borderRadius: "12px",
                      border: "none",
                    }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                {/* Caption */}
                <div className="mt-3">
                  <h6 className="fw-bold mb-1" style={{ color: "#00BFFF", fontSize: "0.9rem" }}>
                    {testimonial.title}
                  </h6>
                  <p className="mb-0" style={{ color: "#87DEFA", fontSize: "0.85rem" }}>
                    {testimonial.name} &bull; {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}