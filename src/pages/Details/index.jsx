import React from 'react';
import * as BS from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

export default function Details() {
  const navigate = useNavigate();

  return (
    <div data-testid="go-back-btn" onClick={() => navigate(-1)}>
      <BS.BsArrowLeftSquare /> Buscar novamente
    </div>
  );
}
