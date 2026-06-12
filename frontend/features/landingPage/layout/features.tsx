"use client";
import { useState } from "react";

import CardGlass from "@/components/card-glass";
import FeatureOption from "../components/feature-option";
import { featureData } from "../feature-data";

export default function Features() {
  const [indexFeat, setIndexFeat] = useState(0);
  const currentFeature = featureData[indexFeat];

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-3/4 h-3/4  shadow-lg overflow-hidden lg:flex lg:flex-row">
        <div className="flex overlflow-x-auto  overflow-y-hidden h-16   text-center lg:flex-col lg:h-full lg:w-3/12 relative">
          {featureData.map((feature, idx) => (
            <FeatureOption
              key={idx}
              title={feature.title}
              handleClick={() => setIndexFeat(idx)}
              className={`relative ${indexFeat === idx ? "after:content-[''] after:h-48.25 after:w-2 after:bg-indigo-800 after:absolute after:left-0 after:top-0 after:bottom-0 " : "bg-transparent"} `}
            />
          ))}
        </div>
        <div className=" h-full w-full">
          {currentFeature && (
            <CardGlass
              title={currentFeature.title}
              description={currentFeature.description}
            />
          )}
        </div>
      </div>
    </div>
  );
}
