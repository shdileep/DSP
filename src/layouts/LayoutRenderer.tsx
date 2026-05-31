import React from 'react';
import { useLayout } from '../state/layoutStore';
import { layoutRegistry } from './layoutRegistry';
import { ResumeData, ThemeStyle } from '../types';

interface LayoutRendererProps {
  resumeData: ResumeData;
  theme: ThemeStyle;
  customOverlayColor: string;
  onOpenBuilder: () => void;
}

export default function LayoutRenderer({
  resumeData,
  theme,
  customOverlayColor,
  onOpenBuilder
}: LayoutRendererProps) {
  const [activeLayout] = useLayout();
  const SelectedLayout = layoutRegistry[activeLayout] || layoutRegistry.original;

  return (
    <SelectedLayout
      resumeData={resumeData}
      theme={theme}
      customOverlayColor={customOverlayColor}
      onOpenBuilder={onOpenBuilder}
    />
  );
}
