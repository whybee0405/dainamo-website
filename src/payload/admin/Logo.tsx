import React from 'react'
import { DainamoLockup } from '../../components/brand/DainamoLockup'

/**
 * Replaces the Payload wordmark on the login screen and in the studio nav.
 * Payload supports this through `admin.components.graphics.Logo`, so no
 * licensed Payload branding is being modified or misrepresented.
 */
export const Logo: React.FC = () => (
  <span className="dainamo-admin-logo">
    <DainamoLockup width={264} tone="dark" strapline />
  </span>
)

export default Logo
