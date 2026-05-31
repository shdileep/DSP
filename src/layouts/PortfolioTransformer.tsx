import React from 'react';
import { usePortfolioTransformer } from '../state/portfolioTransformer';
import OriginalPortfolioLayout from './OriginalPortfolioLayout';
import AdvancedExecutivePortfolio from './AdvancedExecutivePortfolio';
import { ResumeData, ThemeStyle } from '../types';

interface PortfolioTransformerProps {
  resumeData: ResumeData;
  theme: ThemeStyle;
  customOverlayColor: string;
  onToggleMode: () => void;
}

export default function PortfolioTransformer({
  resumeData,
  theme,
  customOverlayColor,
  onToggleMode
}: PortfolioTransformerProps) {
  const [isAdvanced] = usePortfolioTransformer();

  if (isAdvanced) {
    return (
      <AdvancedExecutivePortfolio
        resumeData={resumeData}
        theme={theme}
        customOverlayColor={customOverlayColor}
        onToggleMode={onToggleMode}
      />
    );
  }

  return (
    <OriginalPortfolioLayout
      resumeData={resumeData}
      theme={theme}
      customOverlayColor={customOverlayColor}
      onOpenBuilder={onToggleMode}
    />
  );
}
