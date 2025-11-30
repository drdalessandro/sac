import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { createReference, getReferenceString } from '@medplum/core';
import { BundleEntry, Observation, Patient } from '@medplum/fhirtypes';
import { useMedplum } from '@medplum/react';
import React, { Suspense, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../components/Button';
import InfoSection from '../../components/InfoSection';
import LinkToPreviousPage from '../../components/LinkToPreviousPage';
import MeasurementModal from '../../components/MeasurementModal';
import getLocaleDate from '../../helpers/get-locale-date';
import renderValue from '../../helpers/get-render-value';
import NoData from '../../components/NoData';

const LineChart = React.lazy(() => import('../../components/LineChart'));

interface labMeasurementsMetaType {
  [key: string]: {
    id: string;
    code: string;
    title: string;
    description: string;
    chartDatasets: {
      label: string;
      backgroundColor: string;
      borderColor: string;
    }[];
  };
}

interface chartDataType {
  labels: (string | null | undefined)[];
  datasets: {
    label: string;
    data: (number | undefined)[];
    backgroundColor: string;
    borderColor?: string;
  }[];
}

export const backgroundColor = 'rgba(29, 112, 214, 0.7)';
export const borderColor = 'rgba(29, 112, 214, 1)';

export const labMeasurementsMeta: labMeasurementsMetaType = {
  glucose: {
    id: 'glucose',
    code: '2339-0',
    title: 'Glucemia',
    description:
      'La glucemia es la medición de la concentración de glucosa en sangre. Valores normales en ayunas: 70-100 mg/dL. Valores entre 100-125 mg/dL indican prediabetes. Valores ≥126 mg/dL en dos ocasiones indican diabetes.',
    chartDatasets: [
      {
        label: 'Glucemia',
        backgroundColor,
        borderColor,
      },
    ],
  },
  hba1c: {
    id: 'hba1c',
    code: '4548-4',
    title: 'Hemoglobina Glicosilada',
    description:
      'La Hemoglobina Glicosilada (HbA1c) refleja el promedio de glucemia de los últimos 2-3 meses. Valor normal: <5.7%. Prediabetes: 5.7-6.4%. Diabetes: ≥6.5%. Objetivo en personas con diabetes: <7%.',
    chartDatasets: [
      {
        label: 'HbA1c',
        backgroundColor,
        borderColor,
      },
    ],
  },
  hdl: {
    id: 'hdl',
    code: '2085-9',
    title: 'HDL Colesterol',
    description:
      'El colesterol HDL (lipoproteína de alta densidad) es conocido como "colesterol bueno". Valores deseables: >40 mg/dL en hombres y >50 mg/dL en mujeres. Valores más altos se asocian con menor riesgo cardiovascular.',
    chartDatasets: [
      {
        label: 'HDL Colesterol',
        backgroundColor,
        borderColor,
      },
    ],
  },
  'non-hdl': {
    id: 'non-hdl',
    code: '43396-1',
    title: 'No-HDL Colesterol',
    description:
      'El colesterol No-HDL representa todas las lipoproteínas aterogénicas (LDL, VLDL, IDL). Se calcula restando el HDL del colesterol total. Valor deseable: <130 mg/dL. Es un mejor predictor de riesgo cardiovascular que el LDL.',
    chartDatasets: [
      {
        label: 'No-HDL Colesterol',
        backgroundColor,
        borderColor,
      },
    ],
  },
  triglycerides: {
    id: 'triglycerides',
    code: '2571-8',
    title: 'Triglicéridos',
    description:
      'Los triglicéridos son un tipo de grasa en la sangre. Valores normales: <150 mg/dL. Valores altos aumentan el riesgo cardiovascular. Se recomienda medir en ayunas de 9-12 horas.',
    chartDatasets: [
      {
        label: 'Triglicéridos',
        backgroundColor,
        borderColor,
      },
    ],
  },
};

const LabMeasurement = (): JSX.Element | null => {
  const { measurementId } = useParams();
  const { code, title, description, chartDatasets } = labMeasurementsMeta[measurementId as string];
  const medplum = useMedplum();
  const patient = medplum.getProfile() as Patient;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [chartData, setChartData] = useState<chartDataType>();
  const measurements = medplum.search('Observation', `code=${code}&patient=${getReferenceString(patient)}`).read();

  useEffect(() => {
    if (measurements.entry) {
      const labels = measurements.entry.map(({ resource }) => {
        if (resource?.effectiveDateTime) {
          return getLocaleDate(resource?.effectiveDateTime);
        }
      });
      setChartData({
        labels,
        datasets: chartDatasets.map((item, i) => ({
          ...item,
          data: getDatasets(i, measurements.entry),
        })),
      });
    }
  }, [chartDatasets, measurements]);

  if (!measurementId) {
    return null;
  }

  const getDatasets = (index: number, measurements?: BundleEntry<Observation>[]): (number | undefined)[] => {
    if (measurements) {
      return measurements.map(({ resource }) =>
        resource?.component?.length ? resource?.component[index].valueQuantity?.value : resource?.valueQuantity?.value
      );
    }
    return [];
  };

  const handleAddMeasurement = (): void => {
    setIsModalOpen(true);
  };

  return (
    <>
      <LinkToPreviousPage url="/laboratory/results" label="Resultados" />
      <div className="mt-5 flex flex-col items-start space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <h1 className="text-3xl font-extrabold">{title}</h1>
        <Button marginsUtils="ml-0" label="Agregar Medición" action={handleAddMeasurement} />
      </div>
      {chartData && (
        <Suspense fallback={null}>
          <LineChart chartData={chartData} />
        </Suspense>
      )}
      {description && (
        <div className="mb-10 overflow-hidden border bg-white p-4 sm:rounded-md">
          <div className="mb-3 flex items-center text-gray-600">
            <InformationCircleIcon className="mr-2 h-6 w-6 flex-shrink-0" />
            <h3 className="text-lg font-bold">¿Qué estamos midiendo?</h3>
          </div>
          <p className="text-base text-gray-600">{description}</p>
        </div>
      )}
      {measurements.entry?.length ? (
        <InfoSection
          title={
            <div className="flex justify-between">
              <p>Mediciones</p>
              <p>Valores</p>
            </div>
          }
        >
          <div className="px-4 pt-4 pb-2">
            {measurements.entry &&
              [...measurements.entry].reverse().map(({ resource }) => {
                if (!resource) return null;
                const time = getLocaleDate(resource.effectiveDateTime, true);
                return (
                  <div className="mb-2 flex justify-between" key={resource.id}>
                    {time && <p>{time}</p>}
                    {renderValue(resource)}
                  </div>
                );
              })}
          </div>
        </InfoSection>
      ) : (
        <NoData title="Mediciones" />
      )}
      <MeasurementModal
        subject={createReference(patient)}
        type={title}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(!isModalOpen)}
      />
    </>
  );
};

export default LabMeasurement;
