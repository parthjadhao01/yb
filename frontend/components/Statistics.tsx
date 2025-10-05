const stats = [
  { value: "50L+", label: "Happy Customers" },
  { value: "10L+", label: "Properties Listed" },
  { value: "100+", label: "Cities Covered" },
  { value: "₹5000Cr+", label: "Brokerage Saved" },
];

const Statistics = () => {
  return (
    <section className="p-20 bg-primary text-primary-foreground">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2 text-accent">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-primary-foreground/80">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
