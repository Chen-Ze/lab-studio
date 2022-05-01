import {
  Routine,
  RoutineRenderer,
  ROUTINE_RENDERER_TYPES,
} from '@lab-studio/front/feature/experiment-tab/routine-renderer';
import { ExperimentScope } from '@lab-studio/shared/data/recipe/experiment-scope';
import { ExperimentMeasurement } from '@lab-studio/shared/data/recipe/recipe';
import { Box, IconButton } from '@mui/material';
import Container from '@mui/material/Container';
import { nanoid } from '@reduxjs/toolkit';
import { useInjection } from 'inversify-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addExperiment,
  removeExperiment,
  selectExperimentEntities,
  updateExperiment,
} from '../../app/experiments.slice';
import axios from 'axios';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridToolbar,
} from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { row } from 'mathjs';

export function ExperimentTab() {
  const renderer = useInjection<
    RoutineRenderer<
      string,
      ExperimentMeasurement<unknown>,
      ExperimentScope,
      unknown
    >
  >(ROUTINE_RENDERER_TYPES.RoutineRenderer);
  const dispatch = useDispatch();
  const experimentEntities = useSelector(selectExperimentEntities);

  const [rows, setRows] = useState<GridRowsProp>([]);

  const [columns, setColumns] = useState<GridColDef[]>([]);

  const [addresses, setAddresses] = useState<string[]>([]);

  useEffect(() => {
    const addressesEventSource = new EventSource(
      '/api/experiment/listen-addresses'
    );
    addressesEventSource.onmessage = (ev) => {
      setAddresses(JSON.parse(ev.data));
    };
  }, []);

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <IconButton
          color="success"
          onClick={(e) => {
            axios
              .post('/api/experiment/start-experiment', experimentEntities)
              .then((data) => {
                console.log(data.data);
                const id = data.data;
                const eventSource = new EventSource(
                  `/api/experiment/listen-experiment/${id}`
                );
                eventSource.onmessage = (ev) => {
                  console.log(ev.data);
                  const dataArray: Array<Record<string, number>> = JSON.parse(
                    ev.data
                  );
                  setColumns((columns) => {
                    const dataColumns = [
                      ...new Set(
                        dataArray
                          .map((row) => Object.keys(row))
                          .flat()
                          .filter(
                            (value) =>
                              !columns.find((column) => column.field === value)
                          )
                      ),
                    ];
                    return [
                      ...columns,
                      ...dataColumns.map((value) => ({
                        field: value,
                        headerName: value,
                        width: 150,
                      })),
                    ];
                  });
                  setRows((rows) => {
                    return [
                      ...rows,
                      ...dataArray.map((row) => ({ ...row, id: nanoid() })),
                    ];
                  });
                };
              });
          }}
        >
          <PlayArrowIcon fontSize="large" />
        </IconButton>
      </Box>
      <renderer.render
        parentEnvironment={{
          variables: {},
          columns: ['ia', 'ib', 'va', 'vb'],
          instruments: {},
          addresses,
        }}
        experimentLabel="Root"
        routineService={{
          add: (input) => {
            const id = nanoid();
            dispatch(
              addExperiment({
                id,
                routine: input as unknown as Routine<
                  ExperimentMeasurement<unknown>,
                  string
                >,
              })
            );
            return id;
          },
          find: <TInput,>(label: string) => {
            return (
              (experimentEntities[label]?.routine as unknown as Routine<
                TInput,
                string
              >) || null
            );
          },
          update: (id, input) => {
            dispatch(
              updateExperiment({
                id,
                changes: {
                  routine: input as unknown as Routine<
                    ExperimentMeasurement<unknown>,
                    string
                  >,
                },
              })
            );
          },
          remove: (label: string) => {
            dispatch(removeExperiment(label));
          },
        }}
      />
      <div style={{ height: 600, marginTop: '50px', width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </div>
    </Container>
  );
}
