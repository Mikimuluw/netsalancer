import SpendingPowerCalc from "./SpendingPowerCalc";
import EnterpriseReadinessCalc from "./EnterpriseReadinessCalc";
import VisaReadinessCalc from "./VisaReadinessCalc";

export default function CalculatorsSection() {
  return (
    <section id="calculators" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-et-green/10 text-et-green rounded-full px-4 py-2 text-sm font-semibold mb-4">
            <span className="w-2 h-2 rounded-full bg-et-green animate-pulse"></span>
            Interactive Calculators
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-et-dark mb-4">
            See Exactly What{" "}
            <span className="text-et-green">FXD/04/2026</span>{" "}
            Means for You
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Use your real numbers to understand the full impact of going formal
            with your FX earnings.
          </p>
        </div>

        {/* Calculator tabs/grid */}
        <div className="space-y-8">
          {/* Row 1: Spending Power */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-et-green text-white rounded-full flex items-center justify-center text-sm font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-et-dark">
                International Spending Power
              </h3>
            </div>
            <SpendingPowerCalc />
          </div>

          {/* Row 2: Enterprise Readiness */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-et-green text-white rounded-full flex items-center justify-center text-sm font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-et-dark">
                Enterprise Readiness Score
              </h3>
            </div>
            <EnterpriseReadinessCalc />
          </div>

          {/* Row 3: Visa Readiness */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-et-green text-white rounded-full flex items-center justify-center text-sm font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-et-dark">
                Visa Application Readiness
              </h3>
            </div>
            <VisaReadinessCalc />
          </div>
        </div>
      </div>
    </section>
  );
}
