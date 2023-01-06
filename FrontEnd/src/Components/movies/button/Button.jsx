import React from 'react'
import { useState } from 'react';
import Addmovie from '../addmovie/AddMovie';

function Button() {
    const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
        <button 
            className="add-btn"
            onClick={() => {
              setModalOpen(true);
              console.log();
            }}
           // onClick={<a href='./EditMovie'></a>}
          >
           Edit
          </button >
          
          {modalOpen && (
            <Addmovie className="a"  setModalOpen={setModalOpen} ModalOpen={modalOpen} />
          )}
    </div>
  )
}

export default Button;