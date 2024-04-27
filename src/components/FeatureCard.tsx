import { FeaturesType } from "@/types/feature";


export function FeatureCard({ feature }: { feature: FeaturesType }) {
    console.log('render')
  return (
    <div className="p-4 border rounded-lg shadow">
      <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2">
        {feature.title}
      </h3>
      <p className="text-xs md:text-sm lg:text-sm opacity-50">
        {feature.description}
      </p>
    </div>
  );
}
