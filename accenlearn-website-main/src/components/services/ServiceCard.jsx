const ServiceCard = ({ title, description, icon }) => {
  return (
    <article className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-2xl text-primary transition group-hover:bg-primary group-hover:text-white">
        {icon}
      </div>

      <h3 className="mb-3 text-xl font-bold text-gray-900">
        {title}
      </h3>

      <p className="text-sm leading-7 text-gray-600">
        {description}
      </p>
    </article>
  );
};

export default ServiceCard;