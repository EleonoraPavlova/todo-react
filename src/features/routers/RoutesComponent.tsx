import { TodolistRender } from 'components/TodolistRender'
import { Login } from 'features/pages/Login'
import { NotFound } from 'features/pages/NotFound'
import { Navigate, Route, Routes } from 'react-router-dom'

type Props = {
  lightMode: boolean
}

export const RoutesComponent: React.FC<Props> = ({ lightMode }) => {
  return (
    <Routes>
      <Route path="/" element={<TodolistRender lightMode={lightMode} />} />
      <Route path="/login" element={<Login lightMode={lightMode} />} />
      <Route path="404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  )
}
