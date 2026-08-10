import { useMemo, useState } from "react";
import {
  onlinePricing,
  offlinePricing,
} from "../../data/coursesData";

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const PricingSelector = ({ onSelectionChange }) => {
  const [mode, setMode] = useState("online");
  const [duration, setDuration] = useState("1 Month");

  const pricingData =
    mode === "online" ? onlinePricing : offlinePricing;

  const selectedPricing = useMemo(() => {
    return pricingData.find(
      (item) => item.duration === duration
    );
  }, [pricingData, duration]);

  const handleModeChange = (selectedMode) => {
    setMode(selectedMode);

    const updatedPricing =
      selectedMode === "online"
        ? onlinePricing
        : offlinePricing;

    const selected = updatedPricing.find(
      (item) => item.duration === duration
    );

    onSelectionChange?.({
      mode: selectedMode,
      ...selected,
    });
  };

  const handleDurationChange = (selectedDuration) => {
    setDuration(selectedDuration);

    const selected = pricingData.find(
      (item) => item.duration === selectedDuration
    );

    onSelectionChange?.({
      mode,
      ...selected,
    });
  };

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-black text-primary">
        Choose your learning plan
      </h2>

      <div className="mb-6 grid grid-cols-2 gap-3">
        {["online", "offline"].map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => handleModeChange(option)}
            className={`rounded-xl px-5 py-3 font-bold capitalize transition ${
              mode === option
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {pricingData.map((item) => (
          <button
            key={item.duration}
            type="button"
            onClick={() =>
              handleDurationChange(item.duration)
            }
            className={`rounded-xl border px-4 py-3 font-bold transition ${
              duration === item.duration
                ? "border-secondary bg-secondary/10 text-secondary"
                : "border-gray-200 text-gray-600 hover:border-primary"
            }`}
          >
            {item.duration}
          </button>
        ))}
      </div>

      {selectedPricing && (
        <div className="rounded-2xl bg-gray-50 p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-gray-500">MRP</span>

            <span className="text-lg font-semibold text-gray-400 line-through">
              {formatCurrency(selectedPricing.mrp)}
            </span>
          </div>

          <div className="mb-3 flex items-center justify-between">
            <span className="font-bold text-gray-700">
              Offer Price
            </span>

            <span className="text-2xl font-black text-primary">
              {formatCurrency(
                selectedPricing.offerPrice
              )}
            </span>
          </div>

          <div className="flex items-center justify-between border-t border-gray-200 pt-3">
            <span className="text-gray-600">
              Pre-registration
            </span>

            <span className="font-black text-secondary">
              {formatCurrency(
                selectedPricing.preRegistration
              )}
            </span>
          </div>
        </div>
      )}
    </section>
  );
};

export default PricingSelector;