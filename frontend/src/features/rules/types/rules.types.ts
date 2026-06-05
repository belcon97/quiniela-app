import type { ComponentProps } from 'react'
import Feather from '@expo/vector-icons/Feather'

type FeatherIconName = ComponentProps<typeof Feather>['name']

export interface RuleStep {
  id:             number
  badge:          string
  badgeColor:     string
  badgeTextColor: string
  title:          string
  description:    string
}

export interface RuleAccordionItem {
  id:          string
  icon:        FeatherIconName
  title:       string
  description: string
}