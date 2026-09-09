import React from 'react'
import { DainamoEmblem } from '../../components/brand/DainamoEmblem'

/**
 * Replaces the Payload emblem in the collapsed sidebar and browser affordances.
 */
export const Icon: React.FC = () => (
  <span className="dainamo-admin-icon" aria-label="Dainamo Holdings">
    <DainamoEmblem width={28} tone="auto" />
  </span>
)

export default Icon
