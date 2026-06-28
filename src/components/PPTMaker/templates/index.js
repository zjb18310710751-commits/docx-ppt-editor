import { businessTemplates } from './business'
import { educationTemplates } from './education'
import { marketingTemplates } from './marketing'
import { technologyTemplates } from './technology'
import { creativeTemplates } from './creative'
import { minimalTemplates } from './minimal'
import { medicalTemplates } from './medical'
import { financeTemplates } from './finance'
import { scienceTemplates } from './science'
import { natureTemplates } from './nature'
import { cultureTemplates } from './culture'
import { competitionTemplates } from './competition'
import { internetTemplates } from './internet'
import { wpsPremiumTemplates } from './wps-premium'

export const allTemplates = [
  // WPS精选放在最前面
  ...wpsPremiumTemplates,
  ...businessTemplates,
  ...educationTemplates,
  ...marketingTemplates,
  ...technologyTemplates,
  ...creativeTemplates,
  ...minimalTemplates,
  ...medicalTemplates,
  ...financeTemplates,
  ...scienceTemplates,
  ...natureTemplates,
  ...cultureTemplates,
  ...competitionTemplates,
  ...internetTemplates,
]

export const categories = [
  { key: 'WPS精选', name: 'WPS精选', emoji: '⭐', count: wpsPremiumTemplates.length, templates: wpsPremiumTemplates },
  { key: '商务', name: '商务', emoji: '🏢', count: businessTemplates.length, templates: businessTemplates },
  { key: '教育', name: '教育', emoji: '📚', count: educationTemplates.length, templates: educationTemplates },
  { key: '营销', name: '营销', emoji: '📢', count: marketingTemplates.length, templates: marketingTemplates },
  { key: '科技', name: '科技', emoji: '💻', count: technologyTemplates.length, templates: technologyTemplates },
  { key: '创意', name: '创意', emoji: '🎨', count: creativeTemplates.length, templates: creativeTemplates },
  { key: '极简', name: '极简', emoji: '✨', count: minimalTemplates.length, templates: minimalTemplates },
  { key: '医疗', name: '医疗', emoji: '🏥', count: medicalTemplates.length, templates: medicalTemplates },
  { key: '金融', name: '金融', emoji: '💰', count: financeTemplates.length, templates: financeTemplates },
  { key: '科学研究', name: '科学研究', emoji: '🔬', count: scienceTemplates.length, templates: scienceTemplates },
  { key: '自然环保', name: '自然环保', emoji: '🌿', count: natureTemplates.length, templates: natureTemplates },
  { key: '文化艺术', name: '文化艺术', emoji: '🎵', count: cultureTemplates.length, templates: cultureTemplates },
  { key: '竞赛答辩', name: '竞赛答辩', emoji: '🏆', count: competitionTemplates.length, templates: competitionTemplates },
  { key: '互联网', name: '互联网', emoji: '📱', count: internetTemplates.length, templates: internetTemplates },
]

export const getTemplatesByCategory = (category) => {
  const cat = categories.find(c => c.key === category)
  return cat ? cat.templates : []
}

export const getTemplateById = (id) => {
  return allTemplates.find(t => t.id === id)
}
