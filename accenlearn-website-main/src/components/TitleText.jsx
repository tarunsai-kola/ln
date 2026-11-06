const TitleText = ({
  title,
  description,
  underline = false,
  animate = true,
  align = "center",
  titleClassName = "",
  descriptionClass = ""
}) => {
  const alignment =
    align === "left"
      ? "items-start text-left"
      : align === "right"
        ? "items-end text-right"
        : "items-center text-center";

  const showUnderline = underline && !description;

  return (
    <div
      data-aos={animate ? "fade-up" : ""}
      className={`flex flex-col gap-2 sm:gap-3 md:gap-4 pt-6 sm:pt-8 md:pt-10 lg:pt-12 pb-3 sm:pb-4 px-4 sm:px-6 md:px-0 ${alignment}`}
    >
      <h1
        className={`text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold pb-2 sm:pb-3 md:pb-4 capitalize leading-tight line-clamp-3 ${titleClassName}`}
      >
        {title}
      </h1>

      {description && ( 
        <div
          className={`global_text text-sm sm:text-base md:text-lg max-w-full sm:max-w-[90%] md:max-w-[85%] lg:max-w-[80%]
          ${align === "center"
              ? "mx-auto text-center"
              : align === "left"
                ? "text-left"
                : "text-right"
            } leading-relaxed ${descriptionClass}`}
        >
          {description}
        </div>
      )}

      {showUnderline && (
        <div
          className={`w-[70%] sm:w-[60%] md:w-[50%] lg:w-[40%] ${align === "center" ? "mx-auto" : ""
            } h-1 bg-gradient-to-r from-primary to-secondary rounded-full mt-2`}
        ></div>
      )}
    </div>
  );
};

export default TitleText;
