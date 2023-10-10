import { Outlet } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'

// components
import ProfileErrorFallback from '../../components/error/fallbacks/ProfileErrorFallback'

const ProfilePage = () => {
  return (
    <main className="page__container">
      <ErrorBoundary FallbackComponent={ProfileErrorFallback}>
        <Outlet />
      </ErrorBoundary>
    </main>
  )
}

export default ProfilePage
