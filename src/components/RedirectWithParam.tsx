import { Navigate, useParams } from 'react-router-dom'

/** Client-side redirect that forwards the :id param, e.g. /products/:id → /forex/:id. */
export function RedirectWithParam({ to }: { to: (id: string) => string }) {
  const { id } = useParams()
  return <Navigate to={id ? to(id) : '/forex'} replace />
}
