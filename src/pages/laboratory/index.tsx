import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';
import { labMeasurementsMeta } from './LabMeasurement';

const Results = lazy(() => import('./Results'));
const LabMeasurement = lazy(() => import('./LabMeasurement'));

export const sideMenu = {
  title: 'Laboratorio',
  menu: [
    {
      name: 'Resultados',
      href: '/laboratory/results',
      subMenu: Object.values(labMeasurementsMeta).map(({ title, id }) => ({
        name: title,
        href: `/laboratory/results/${id}`,
      })),
    },
  ],
};

export default function Laboratory(): JSX.Element {
  return (
    <PageLayout sideMenu={sideMenu}>
      <Routes>
        <Route index element={<Navigate replace to={sideMenu.menu[0].href} />} />
        <Route path="results" element={<Results />} />
        <Route path="results/:measurementId" element={<LabMeasurement />} />
      </Routes>
    </PageLayout>
  );
}
