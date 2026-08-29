import React from 'react';
import HPLaptopMockup from './HPLaptopMockup';
import { ResumeData, ThemeStyle } from '../types';

interface ProjectsProps {
  resumeData: ResumeData;
  theme: ThemeStyle;
  customOverlayColor: string;
}

export default function Projects({ resumeData, theme, customOverlayColor }: ProjectsProps) {
  return (
    <HPLaptopMockup 
      resumeData={resumeData} 
      theme={theme} 
      customOverlayColor={customOverlayColor} 
    />
  );
}
