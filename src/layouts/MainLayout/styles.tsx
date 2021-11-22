import styled, { css } from 'styled-components';

export default styled.main((props) => {
  const {
    // eslint-disable-next-line no-empty-pattern
    theme: {}
  } = props;

  return css`
    transition: all 0.2s;
    display: grid;
    place-items: center;

    margin: 1.5rem calc(1.5rem + 5vw);
  `;
});
