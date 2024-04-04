import { loadTranslations as ni18nLoadTranslations } from 'ni18n'
import { ni18nConfig } from '../../../ni18n.config'
import {NamespacesNeeded} from 'ni18n/dist/esm'
import path from 'path'

export const loadTranslations = async (
  initialLocale?: string | undefined,
  namespacesNeeded?: NamespacesNeeded | undefined,
) => {
  const locales = path.resolve('./', './public/locales')

  return await ni18nLoadTranslations(
    ni18nConfig,
    initialLocale,
    namespacesNeeded,
  )
}
