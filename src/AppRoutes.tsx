import { Routes, Route } from 'react-router-dom';
import AttendanceForm from './components/attendance/AttendanceForm';
import AttendanceList from './components/attendance/AttendanceList';
import Layout from './components/layout/Layout';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<AttendanceForm />} />
        <Route path="registros" element={<AttendanceList />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;