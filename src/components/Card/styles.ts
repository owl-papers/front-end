/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { Card as MUICard } from '@material-ui/core';

export const Card = styled(MUICard)`
  :hover {
    box-shadow: 0px 6px 6px -3px rgba(0, 0, 0, 0.2),
      0px 10px 14px 1px rgba(0, 0, 0, 0.14),
      0px 4px 18px 3px rgba(0, 0, 0, 0.12);
    transition: all 0.3s ease;
  }
`;
