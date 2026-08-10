import ServiceCard from "./ServiceCard";

const ServiceCategory = ({
  eyebrow,
  title,
  description,
  services,
  icons = [],
}) => {
  return (
    <section className="py-14 sm:py-18">
      <div className="mb-10 max-w-3xl">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-secondary">
          {eyebrow}
        </p>

        <h2 className="mb-4 text-3xl font-black text-primary sm:text-4xl">
          {title}
        </h2>

        <p className="text-base leading-8 text-gray-600">
          {description}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service, index) => (
          <ServiceCard
            key={service.title}
            title={service.title}
            description={service.description}
            icon={icons[index % icons.length]}
          />
        ))}
      </div>
    </section>
  );
};

export default ServiceCategory;