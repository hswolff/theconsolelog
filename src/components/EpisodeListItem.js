import React from 'react';
import Link from 'gatsby-link';
import { DateTime } from 'luxon';
import styled, { css } from 'react-emotion';

export default ({
  linked = true,
  fields: { slug, episodeNumber },
  title,
  date,
}) => {
  return (
    <Container>
      <Dates>
        {formatDate(date.start)} - {formatDate(date.end)}
      </Dates>
      {linked ? (
        <h3 className={titleCss}>
          <Link to={slug}>{title}</Link>
        </h3>
      ) : (
        <h1 className={titleCss}>{title}</h1>
      )}

      <Subtitle>Episode: {episodeNumber}</Subtitle>
    </Container>
  );
};

const Container = styled('div')`
  margin: 40px 0;
`;

const Dates = styled('div')`
  font-size: 0.88rem;
`;

const titleCss = css`
  margin: 0;
`;

const Subtitle = styled('span')`
  font-size: 0.8rem;
`;

function formatDate(date) {
  return DateTime.fromISO(date).toFormat('LLLL d');
}
