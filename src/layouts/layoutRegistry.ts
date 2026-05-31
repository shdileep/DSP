import OriginalPortfolioLayout from './OriginalPortfolioLayout';
import DashboardLayout from './DashboardLayout';
import ExecutiveLayout from './ExecutiveLayout';
import ResearchLabLayout from './ResearchLabLayout';
import ProductStudioLayout from './ProductStudioLayout';
import { LayoutType } from '../state/layoutStore';
import React from 'react';

export const layoutRegistry: Record<LayoutType, React.ComponentType<any>> = {
  original: OriginalPortfolioLayout,
  dashboard: DashboardLayout,
  executive: ExecutiveLayout,
  research: ResearchLabLayout,
  product: ProductStudioLayout,
};
