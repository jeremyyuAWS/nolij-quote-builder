import { ConversationTopic } from '../../types';
import documentExtraction from './documentExtraction';
import configAnalysis from './configAnalysis';
import productAlternatives from './productAlternatives';
import productRoadmap from './productRoadmap';
import securityAnalysis from './securityAnalysis';
import costOptimization from './costOptimization';

// Export all conversation topics
export const conversations: Record<string, ConversationTopic> = {
  'document-extraction': documentExtraction,
  'config-analysis': configAnalysis,
  'product-alternatives': productAlternatives,
  'product-roadmap': productRoadmap,
  'security-analysis': securityAnalysis,
  'cost-optimization': costOptimization
};